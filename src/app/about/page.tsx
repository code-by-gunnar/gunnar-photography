import Image from "next/image";

export const metadata = {
  title: "About | Gunnar Finkeldeh Photography",
  description: "Learn more about Gunnar Finkeldeh, a London-based photographer specializing in travel, street, and architectural photography.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Photo */}
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
            alt="Gunnar Finkeldeh"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Bio */}
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">About Me</h1>
          <div className="space-y-4 text-[var(--muted)] leading-relaxed">
            <p>
              I&apos;m a London-based photographer with a passion for capturing the energy
              of the streets, the beauty of architecture, and the wonder of travel.
            </p>
            <p>
              My journey with photography began over a decade ago when I picked up my
              first camera during a trip through Southeast Asia. Since then, the camera
              has become an extension of how I see and interact with the world.
            </p>
            <p>
              I believe that every place has a story to tell, and my goal is to capture
              those fleeting moments that reveal the character and soul of a location.
              Whether it&apos;s the geometric patterns of modern architecture, the candid
              interactions on busy streets, or the serene landscapes of remote destinations,
              I strive to create images that transport viewers to that moment in time.
            </p>
            <p>
              When I&apos;m not behind the camera, you can find me exploring new neighborhoods,
              planning my next adventure, or sharing stories with fellow photographers.
            </p>
          </div>

          {/* Equipment */}
          <div className="mt-8 pt-8 border-t border-[var(--border)]">
            <h2 className="text-xl font-semibold mb-4">Equipment</h2>
            <ul className="space-y-2 text-[var(--muted)]">
              <li>Sony A7IV</li>
              <li>Sony 24-70mm f/2.8 GM II</li>
              <li>Sony 70-200mm f/2.8 GM II</li>
              <li>Sony 16-35mm f/2.8 GM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
