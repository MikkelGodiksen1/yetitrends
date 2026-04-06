import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Om os | Yetitrends - Afrikansk mode i Skandinavien",
  description:
    "Lær Yetitrends at kende. Vi bringer autentisk afrikansk mode til Skandinavien med bæredygtige, håndlavede designs fra talentfulde afrikanske kunstnere.",
  keywords: [
    "afrikansk mode",
    "yetitrends",
    "afrikansk tøj",
    "bæredygtig mode",
    "afrikansk design",
    "skandinavisk mode",
    "håndlavet tøj",
  ],
};

export default function OmOsPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
          Om Yetitrends
        </h1>
        <p className="text-muted text-lg max-w-2xl">
          Vi er en bro mellem Afrikas rige modekultur og det skandinaviske marked.
          Hvert design bærer en historie om tradition, fællesskab og kreativitet.
        </p>
      </section>

      {/* ── Brand Story with Images ── */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src="/images/products/lifestyle-1.png"
              alt="Yetitrends afrikansk mode kollektion"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 font-display">
              Fra Afrika til Skandinavien
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Yetitrends blev grundlagt med en passion for at dele Afrikas unikke
              modetraditioner med resten af verden. Vi samarbejder direkte med
              talentfulde designere og håndværkere på tværs af det afrikanske kontinent.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Vores kollektioner er inspireret af de farverige stoffer, mønstre og
              teknikker, der har været en del af afrikansk kultur i generationer.
              Vi moderniserer disse traditioner til designs, der passer ind i den
              skandinaviske hverdag.
            </p>
            <p className="text-muted leading-relaxed">
              Hvert stykke tøj er mere end bare mode — det er en hyldest til det
              håndværk og den kultur, det stammer fra.
            </p>
          </div>
        </div>
      </section>

      {/* ── Second Image Section ── */}
      <section className="bg-surface">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold mb-4 font-display">
                Bæredygtighed og fællesskab
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Vi tror på, at mode skal være en kraft for det gode. Derfor
                prioriterer vi bæredygtige materialer, fair handel og
                gennemsigtige produktionsprocesser.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                Vores partnerskaber sikrer, at de kunstnere og håndværkere, der
                skaber vores designs, får en fair kompensation og anerkendes for
                deres arbejde.
              </p>
              <p className="text-muted leading-relaxed">
                Når du vælger Yetitrends, støtter du ikke bare unik mode — du
                støtter også de lokale fællesskaber bag vores produkter.
              </p>
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden order-1 md:order-2">
              <Image
                src="/images/products/lifestyle-2.png"
                alt="Yetitrends bæredygtig afrikansk mode"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission Statement ── */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-6 font-display">Vores mission</h2>
        <blockquote className="text-xl text-muted leading-relaxed italic">
          &ldquo;At gøre autentisk afrikansk mode tilgængelig for alle i
          Skandinavien, samtidig med at vi fejrer og støtter de kulturer og
          fællesskaber, der inspirerer vores designs.&rdquo;
        </blockquote>
      </section>
    </main>
  );
}
