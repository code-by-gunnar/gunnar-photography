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
          <img
            src="/about.jpg"
            alt="Gunnar Finkeldeh"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Bio */}
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">About Me</h1>
          <div className="space-y-4 text-[var(--muted)] leading-relaxed">
            <p>
              I&apos;m a London-based photographer with a passion for capturing the energy
              of the streets, the beauty of architecture, and the stories hidden in travel
              moments. Whether it&apos;s the dynamic movement of a bustling city, the symmetry
              of a historic landmark, or the quiet charm of an off-the-beaten-path destination,
              my work is all about finding art in the everyday.
            </p>
            <p>
              Through my lens, I aim to showcase the unique perspectives, patterns, and
              emotions that make each place and moment special.
            </p>
          </div>

          {/* Equipment */}
          <div className="mt-8 pt-8 border-t border-[var(--border)]">
            <h2 className="text-xl font-semibold mb-4">Equipment</h2>
            <ul className="space-y-2 text-[var(--muted)]">
              <li>Nikon D5100 with kit lens 18-55mm f/3.5-5.6</li>
              <li>Nikkor 35mm f/1.8</li>
              <li>Nikkor 55-200mm f/4-5.6</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
