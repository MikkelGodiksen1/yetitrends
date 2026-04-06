import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { products, productImages, productPrices } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getActiveCurrency, formatPrice } from "@/lib/currency";
import NewsletterForm from "@/components/NewsletterForm";

export default async function Home() {
  const currency = await getActiveCurrency();

  const featuredProducts = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      imageUrl: productImages.url,
      imageAlt: productImages.alt,
      priceAmount: productPrices.amount,
    })
    .from(products)
    .innerJoin(productImages, and(eq(productImages.productId, products.id), eq(productImages.sortOrder, 0)))
    .innerJoin(productPrices, and(eq(productPrices.productId, products.id), eq(productPrices.currency, currency)))
    .where(and(eq(products.isFeatured, true), eq(products.isActive, true)))
    .limit(4);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <Image
          src="/images/products/hero-1.png"
          alt="Yetitrends - Autentisk afrikansk mode"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-display">
            Autentisk afrikansk mode
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
            Unikke designs inspireret af Afrikas rige kulturarv
          </p>
          <Link
            href="/katalog"
            className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-light transition-colors text-lg"
          >
            Se kollektion
          </Link>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-2 font-display">
          Udvalgte produkter
        </h2>
        <p className="text-muted text-center mb-10">
          Håndplukkede favoritter fra vores kollektion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/katalog/${product.slug}`}
              className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.imageAlt || product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-text">{product.name}</h3>
                <p className="text-primary font-semibold mt-1">
                  {formatPrice(product.priceAmount, currency)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {featuredProducts.length === 0 && (
          <p className="text-center text-muted py-12">
            Ingen udvalgte produkter endnu.
          </p>
        )}
      </section>

      {/* ── Brand Story ── */}
      <section className="bg-surface">
        <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src="/images/products/brand-1.png"
              alt="Yetitrends - Vores historie"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 font-display">
              Vores historie
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Yetitrends fejrer skønheden i afrikansk mode og kultur. Vi bringer autentiske,
              håndlavede designs fra talentfulde afrikanske kunstnere direkte til Skandinavien.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Hvert stykke tøj fortæller en historie om tradition, håndværk og kreativitet.
              Vi tror på bæredygtig mode, der respekterer både mennesker og planeten.
            </p>
            <Link
              href="/om-os"
              className="inline-block px-6 py-2.5 border-2 border-accent text-accent font-medium rounded-md hover:bg-accent hover:text-white transition-colors"
            >
              Læs mere om os
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lifestyle Images ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/products/lifestyle-1.png"
              alt="Yetitrends lifestyle"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/products/lifestyle-2.png"
              alt="Yetitrends lifestyle"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-accent text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-2 font-display">
            Bliv en del af fællesskabet
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Tilmeld dig vores nyhedsbrev og vær den første til at se nye kollektioner og eksklusive tilbud.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
