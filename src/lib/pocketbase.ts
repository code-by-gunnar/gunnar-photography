/**
 * Pocketbase Integration for Photography Portfolio
 */

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://gunnar-photography-pb.fly.dev";

export interface Photo {
  id: string;
  collectionId: string;
  title: string;
  description?: string;
  image: string;
  gallery?: string;
  featured?: boolean;
  order?: number;
  created: string;
  updated: string;
}

export interface Gallery {
  id: string;
  collectionId: string;
  name: string;
  slug: string;
  description?: string;
  cover_image?: string;
  parent?: string;
  created: string;
  updated: string;
  children?: Gallery[];
}

// Build image URL from Pocketbase
export function getImageUrl(
  collectionId: string,
  recordId: string,
  filename: string,
  thumb?: string
): string {
  const base = POCKETBASE_URL + "/api/files/" + collectionId + "/" + recordId + "/" + filename;
  return thumb ? base + "?thumb=" + thumb : base;
}

// Build a tree structure from flat galleries
export function buildGalleryTree(galleries: Gallery[]): Gallery[] {
  const map = new Map<string, Gallery>();
  const roots: Gallery[] = [];

  // First pass: create map with children array
  galleries.forEach((g) => {
    map.set(g.id, { ...g, children: [] });
  });

  // Second pass: build tree
  galleries.forEach((g) => {
    const gallery = map.get(g.id)!;
    if (g.parent && map.has(g.parent)) {
      map.get(g.parent)!.children!.push(gallery);
    } else {
      roots.push(gallery);
    }
  });

  return roots;
}

// Fetch all galleries (flat list)
export async function getGalleries(): Promise<Gallery[]> {
  try {
    const response = await fetch(
      POCKETBASE_URL + "/api/collections/galleries/records?sort=name&perPage=100",
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      console.error("Failed to fetch galleries:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return [];
  }
}

// Fetch galleries as a tree (with children populated)
export async function getGalleryTree(): Promise<Gallery[]> {
  const galleries = await getGalleries();
  return buildGalleryTree(galleries);
}

// Fetch a single gallery by slug
export async function getGalleryBySlug(slug: string): Promise<Gallery | null> {
  try {
    const response = await fetch(
      POCKETBASE_URL + "/api/collections/galleries/records?filter=slug='" + encodeURIComponent(slug) + "'",
      { next: { revalidate: 60 } }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.items?.[0] || null;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return null;
  }
}

// Fetch photos for a gallery (and optionally its children)
export async function getGalleryPhotos(galleryId: string, includeChildren = false): Promise<Photo[]> {
  try {
    let filter = "gallery='" + galleryId + "'";

    if (includeChildren) {
      // Get child gallery IDs first
      const allGalleries = await getGalleries();
      const childIds = allGalleries
        .filter((g) => g.parent === galleryId)
        .map((g) => g.id);

      if (childIds.length > 0) {
        const allIds = [galleryId, ...childIds];
        filter = allIds.map((id) => "gallery='" + id + "'").join(" || ");
      }
    }

    const url = POCKETBASE_URL + "/api/collections/photos/records?filter=" + encodeURIComponent(filter) + "&sort=order&perPage=200";
    console.log("Fetching photos from:", url);

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      console.error("Photos fetch failed:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    console.log("Photos fetched:", data.items?.length || 0);
    return data.items || [];
  } catch (error) {
    console.error("Error fetching gallery photos:", error);
    return [];
  }
}

// Fetch featured photos
export async function getFeaturedPhotos(limit = 10): Promise<Photo[]> {
  try {
    const response = await fetch(
      POCKETBASE_URL + "/api/collections/photos/records?filter=featured=true&sort=-created&perPage=" + limit,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching featured photos:", error);
    return [];
  }
}

// Fetch all photos
export async function getAllPhotos(limit = 50): Promise<Photo[]> {
  try {
    const response = await fetch(
      POCKETBASE_URL + "/api/collections/photos/records?sort=-created&perPage=" + limit,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
}
