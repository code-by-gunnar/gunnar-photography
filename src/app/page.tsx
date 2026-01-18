import Link from "next/link";
import { HeroCarousel } from "@/components";
import type { CarouselImage } from "@/components";
import { getFeaturedPhotos, getGalleryTree, getImageUrl, getGalleryCoverUrl } from "@/lib/pocketbase";

// Fallback images if no featured photos exist
const fallbackHeroImages: CarouselImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=80",
    alt: "Paris cityscape",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80",
    alt: "London skyline",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=80",
    alt: "Paris Eiffel Tower",
  },
];

export default async function Home() {
  // Fetch featured photos for hero carousel
  const featuredPhotos = await getFeaturedPhotos(6);
  const heroImages: CarouselImage[] = featuredPhotos.length > 0
    ? featuredPhotos.map((photo) => ({
        id: photo.id,
        src: getImageUrl(photo.collectionId, photo.id, photo.image),
        alt: photo.title || "Featured photo",
      }))
    : fallbackHeroImages;

  // Fetch top-level galleries for Featured Work
  const galleryTree = await getGalleryTree();
  const topGalleries = galleryTree.slice(0, 3).map((gallery) => ({
    title: gallery.name,
    href: "/galleries/" + gallery.slug,
    image: getGalleryCoverUrl(gallery)
      || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
  }));

  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel images={heroImages} interval={6000} />

      {/* Introduction Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Welcome
        </h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed mb-8">
          I&apos;m a London-based photographer with a passion for capturing the energy of the streets,
          the beauty of architecture, and the wonder of travel. Through my lens, I seek to find
          extraordinary moments in ordinary places.
        </p>
        <Link
          href="/galleries"
          className="inline-flex items-center px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
        >
          View Galleries
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* Featured Work Preview */}
      {topGalleries.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">Featured Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topGalleries.map((gallery) => (
                <Link
                  key={gallery.title}
                  href={gallery.href}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <img
                    src={gallery.image}
                    alt={gallery.title}
                    className="w-full h-full object-cover img-hover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                    {gallery.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
