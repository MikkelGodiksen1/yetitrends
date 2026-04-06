import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt os | Yetitrends",
  description:
    "Kontakt Yetitrends for spørgsmål om afrikansk mode, bestillinger eller samarbejde. Vi hører gerne fra dig.",
  keywords: ["kontakt", "yetitrends", "afrikansk mode", "kundeservice"],
};

export default function KontaktPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2 font-display">Kontakt os</h1>
      <p className="text-muted mb-10">
        Har du spørgsmål, feedback eller ønsker du et samarbejde? Vi hører gerne fra dig.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* ── Contact Form ── */}
        <ContactForm />

        {/* ── Business Info ── */}
        <div>
          <h2 className="text-xl font-bold mb-4">Virksomhedsinfo</h2>
          <dl className="space-y-4 text-muted">
            <div>
              <dt className="font-medium text-text">Adresse</dt>
              <dd>København, Danmark</dd>
            </div>
            <div>
              <dt className="font-medium text-text">E-mail</dt>
              <dd>
                <a href="mailto:info@yetitrends.dk" className="text-accent hover:underline">
                  info@yetitrends.dk
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-text">Åbningstider</dt>
              <dd>Man-Fre: 9:00 - 17:00</dd>
            </div>
          </dl>

          <h2 className="text-xl font-bold mt-8 mb-4">Følg os</h2>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/yetitrends_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/ytnds"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://tiktok.com/@yetitrends"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── Client component for the contact form ── */
function ContactForm() {
  async function handleContact(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return;
    }

    // TODO: send email or store in database
    console.log("Contact form submitted:", { name, email, message });
  }

  return (
    <form action={handleContact} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Navn
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-2.5 rounded-md border border-muted/30 bg-card text-text focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-2.5 rounded-md border border-muted/30 bg-card text-text focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Besked
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-2.5 rounded-md border border-muted/30 bg-card text-text focus:outline-none focus:ring-2 focus:ring-accent resize-y"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-accent text-white font-medium rounded-md hover:bg-accent-light transition-colors"
      >
        Send besked
      </button>
    </form>
  );
}
