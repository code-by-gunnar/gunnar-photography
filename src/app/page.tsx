import Link from "next/link";
import { HeroCarousel } from "@/components";
import type { CarouselImage } from "@/components";

// Placeholder images - replace with your actual images or Pocketbase data
const heroImages: CarouselImage[] = [
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

export default function Home() {
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
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Travel", href: "/galleries/travel", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80" },
              { title: "Architecture", href: "/galleries/architecture", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80" },
              { title: "Street", href: "/galleries/street", image: "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=600&q=80" },
            ].map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover img-hover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                  {category.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
