export const metadata = {
  title: "Contact | Gunnar Finkeldeh Photography",
  description: "Get in touch for photography inquiries, collaborations, or print purchases.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">Get in Touch</h1>
      <p className="text-[var(--muted)] mb-8">
        Have a question, interested in a collaboration, or want to purchase prints?
        I&apos;d love to hear from you.
      </p>

      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow"
          >
            <option value="general">General Inquiry</option>
            <option value="collaboration">Collaboration</option>
            <option value="prints">Print Purchase</option>
            <option value="licensing">Licensing</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow resize-none"
            placeholder="Tell me about your project or inquiry..."
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors font-medium"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-[var(--border)]">
        <h2 className="text-xl font-semibold mb-4">Other Ways to Connect</h2>
        <div className="space-y-3 text-[var(--muted)]">
          <p>
            <strong className="text-[var(--foreground)]">Email:</strong>{" "}
            <a href="mailto:hello@gunnarfinkeldeh.com" className="hover:text-[var(--accent)] transition-colors">
              hello@gunnarfinkeldeh.com
            </a>
          </p>
          <p>
            <strong className="text-[var(--foreground)]">Instagram:</strong>{" "}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
              @gunnarfinkeldeh
            </a>
          </p>
          <p>
            <strong className="text-[var(--foreground)]">Location:</strong> London, UK
          </p>
        </div>
      </div>
    </div>
  );
}
