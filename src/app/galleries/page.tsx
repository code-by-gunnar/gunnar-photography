import Link from "next/link";
import Image from "next/image";
import { getGalleryTree, getGalleryCoverUrl } from "@/lib/pocketbase";
import type { Gallery } from "@/lib/pocketbase";

export const metadata = {
  title: "Galleries | Gunnar Finkeldeh Photography",
  description: "Browse photography galleries featuring travel, architecture, and street photography.",
};

function GalleryCard({ gallery }: { gallery: Gallery }) {
  const coverUrl = getGalleryCoverUrl(gallery, "400x300")
    || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80";

  return (
    <Link
      href={"/galleries/" + gallery.slug}
      className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
    >
      <Image
        src={coverUrl}
        alt={gallery.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
        {gallery.name}
      </h3>
    </Link>
  );
}

function GallerySection({ gallery }: { gallery: Gallery }) {
  const hasChildren = gallery.children && gallery.children.length > 0;

  if (!hasChildren) {
    return <GalleryCard gallery={gallery} />;
  }

  return (
    <div className="col-span-full">
      <div className="mb-6">
        <Link
          href={"/galleries/" + gallery.slug}
          className="text-2xl font-semibold hover:text-[var(--accent)] transition-colors"
        >
          {gallery.name}
        </Link>
        {gallery.description && (
          <p className="text-[var(--muted)] mt-1">{gallery.description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gallery.children!.map((child) => (
          <GalleryCard key={child.id} gallery={child} />
        ))}
      </div>
    </div>
  );
}

export default async function GalleriesPage() {
  const galleryTree = await getGalleryTree();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Galleries</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Explore my photography collections organized by theme and destination.
        </p>
      </div>

      {galleryTree.length === 0 ? (
        <p className="text-[var(--muted)]">No galleries yet. Add some in Pocketbase!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryTree.map((gallery) => (
            <GallerySection key={gallery.id} gallery={gallery} />
          ))}
        </div>
      )}
    </div>
  );
}
