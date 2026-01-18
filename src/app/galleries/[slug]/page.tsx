import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGalleryBySlug, getGalleryPhotos, getGalleries, getImageUrl, getGalleryCoverUrl } from "@/lib/pocketbase";
import { Gallery } from "@/components";
import type { GalleryImage } from "@/components";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const gallery = await getGalleryBySlug(slug);

  if (!gallery) {
    return { title: "Gallery Not Found" };
  }

  return {
    title: gallery.name + " | Gunnar Finkeldeh Photography",
    description: gallery.description || "View photos from " + gallery.name,
  };
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;
  const gallery = await getGalleryBySlug(slug);

  if (!gallery) {
    notFound();
  }

  // Get child galleries first to determine if this is a parent gallery
  const allGalleries = await getGalleries();
  const childGalleries = allGalleries.filter((g) => g.parent === gallery.id);

  // Get photos for this gallery (including from child galleries)
  // If this is a parent gallery with children, limit to 2 photos per sub-gallery for a preview
  const hasChildren = childGalleries.length > 0;
  const photos = await getGalleryPhotos(gallery.id, true, hasChildren ? 2 : undefined);

  // Get parent gallery for breadcrumb
  const parentGallery = gallery.parent
    ? allGalleries.find((g) => g.id === gallery.parent)
    : null;

  // Convert photos to gallery component format
  const galleryImages: GalleryImage[] = photos.map((photo) => ({
    id: photo.id,
    src: getImageUrl(photo.collectionId, photo.id, photo.image),
    alt: photo.title || "Photo",
    width: 1200,
    height: 800,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-[var(--muted)] mb-8">
        <Link href="/galleries" className="hover:text-[var(--accent)] transition-colors">
          Galleries
        </Link>
        {parentGallery && (
          <>
            <span>/</span>
            <Link
              href={"/galleries/" + parentGallery.slug}
              className="hover:text-[var(--accent)] transition-colors"
            >
              {parentGallery.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-[var(--foreground)]">{gallery.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">{gallery.name}</h1>
        {gallery.description && (
          <p className="text-[var(--muted)] max-w-2xl">{gallery.description}</p>
        )}
      </div>

      {/* Child galleries (if any) */}
      {childGalleries.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Sub-galleries</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {childGalleries.map((child) => {
              const coverUrl = getGalleryCoverUrl(child, "300x200")
                || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80";

              return (
                <Link
                  key={child.id}
                  href={"/galleries/" + child.slug}
                  className="group relative aspect-[3/2] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  <Image
                    src={coverUrl}
                    alt={child.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 text-lg font-medium text-white">
                    {child.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Photos */}
      {galleryImages.length > 0 ? (
        <Gallery images={galleryImages} columns={3} />
      ) : (
        <p className="text-[var(--muted)]">
          {childGalleries.length > 0
            ? "Browse the sub-galleries above to see photos."
            : "No photos in this gallery yet."}
        </p>
      )}
    </div>
  );
}
