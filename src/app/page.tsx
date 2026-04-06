import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  products,
  productImages,
  productPrices,
  blogPosts,
} from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { getActiveCurrency, formatPrice } from "@/lib/currency";
import { Truck, Heart, RotateCcw, Scissors, Leaf, Headphones, Star } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import { T } from "@/components/TranslatedText";

export default async function Home() {
  const currency = await getActiveCurrency();

  const [featuredProducts, latestProducts, latestPosts] = await Promise.all([
    db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        imageUrl: productImages.url,
        imageAlt: productImages.alt,
        priceAmount: productPrices.amount,
      })
      .from(products)
      .innerJoin(
        productImages,
        and(
          eq(productImages.productId, products.id),
          eq(productImages.sortOrder, 0)
        )
      )
      .innerJoin(
        productPrices,
        and(
          eq(productPrices.productId, products.id),
          eq(productPrices.currency, currency)
        )
      )
      .where(and(eq(products.isFeatured, true), eq(products.isActive, true)))
      .limit(6),
    db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        imageUrl: productImages.url,
        imageAlt: productImages.alt,
        priceAmount: productPrices.amount,
      })
      .from(products)
      .innerJoin(
        productImages,
        and(
          eq(productImages.productId, products.id),
          eq(productImages.sortOrder, 0)
        )
      )
      .innerJoin(
        productPrices,
        and(
          eq(productPrices.productId, products.id),
          eq(productPrices.currency, currency)
        )
      )
      .where(eq(products.isActive, true))
      .orderBy(desc(products.createdAt))
      .limit(8),
    db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.publishedAt))
      .limit(3),
  ]);

  return (
    <main>
      {/* ═══ 1. HERO ═══ */}
      <section className="relative h-[60vh] md:h-[80vh] min-h-[480px] w-full overflow-hidden">
        <Image
          src="/images/products/hero-1.jpg"
          alt="Yetitrends - Autentisk afrikansk mode"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-display">
            <T k="hero.title" />
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
            <T k="hero.subtitle" />
          </p>
          <Link
            href="/katalog"
            className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-light transition-colors text-lg"
          >
            <T k="hero.cta" />
          </Link>
        </div>
      </section>

      {/* ═══ 2. USP BANNER ═══ */}
      <section className="bg-surface border-b border-surface">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-text"><T k="usp.shipping" /></p>
                <p className="text-muted"><T k="usp.shipping.sub" /></p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-text"><T k="usp.handmade" /></p>
                <p className="text-muted"><T k="usp.handmade.sub" /></p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-primary" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-text"><T k="usp.returns" /></p>
                <p className="text-muted"><T k="usp.returns.sub" /></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. KATEGORI-SEKTIONER ═══ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-2 font-display">
          <T k="cat.title" />
        </h2>
        <p className="text-muted text-center mb-10">
          <T k="cat.subtitle" />
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              titleKey: "cat.dresses",
              image: "/images/products/dress-d-1.png",
              href: "/katalog",
            },
            {
              titleKey: "cat.kimonos",
              image: "/images/products/kimono-1.png",
              href: "/katalog",
            },
            {
              titleKey: "cat.twopiece",
              image: "/images/products/two-piece-1.png",
              href: "/katalog",
            },
          ].map((cat) => (
            <Link
              key={cat.titleKey}
              href={cat.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl"
            >
              <Image
                src={cat.image}
                alt={cat.titleKey}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white font-display">
                  <T k={cat.titleKey} />
                </h3>
                <span className="text-sm text-white/80 mt-1 inline-block group-hover:translate-x-1 transition-transform">
                  <T k="cat.cta" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ 4. FEATURED PRODUCTS ═══ */}
      <section className="bg-surface">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-2 font-display">
            <T k="featured.title" />
          </h2>
          <p className="text-muted text-center mb-10">
            <T k="featured.subtitle" />
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
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
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-text text-sm sm:text-base">
                    {product.name}
                  </h3>
                  <p className="text-primary font-semibold mt-1">
                    {formatPrice(product.priceAmount, currency)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/katalog"
              className="inline-block px-8 py-3 border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-colors"
            >
              <T k="featured.all" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 5. STOR BILLEDE-BANNER ═══ */}
      <section className="relative h-[50vh] min-h-[350px] w-full overflow-hidden">
        <Image
          src="/images/products/brand-2.png"
          alt="Yetitrends afrikansk mode"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <blockquote className="text-2xl md:text-4xl font-display font-bold text-white max-w-3xl leading-snug italic">
            &ldquo;<T k="quote.text" />&rdquo;
          </blockquote>
          <Link
            href="/om-os"
            className="mt-8 inline-block px-6 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-text transition-colors"
          >
            <T k="quote.cta" />
          </Link>
        </div>
      </section>

      {/* ═══ 6. NYESTE PRODUKTER (SCROLL) ═══ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-display"><T k="new.title" /></h2>
            <p className="text-muted mt-1"><T k="new.subtitle" /></p>
          </div>
          <Link
            href="/katalog"
            className="hidden sm:inline-block text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            <T k="new.all" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {latestProducts.map((product) => (
            <Link
              key={product.id}
              href={`/katalog/${product.slug}`}
              className="group flex-shrink-0 w-[220px] sm:w-[260px] snap-start"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-surface">
                <Image
                  src={product.imageUrl}
                  alt={product.imageAlt || product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="260px"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-text truncate">
                  {product.name}
                </h3>
                <p className="text-primary font-semibold text-sm mt-0.5">
                  {formatPrice(product.priceAmount, currency)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link href="/katalog" className="text-sm font-medium text-primary">
            <T k="featured.all" />
          </Link>
        </div>
      </section>

      {/* ═══ 7. TESTIMONIALS (scrolling carousel) ═══ */}
      <section className="bg-surface overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-6">
          <h2 className="text-3xl font-bold text-center mb-10 font-display">
            <T k="testimonials.title" />
          </h2>
        </div>

        {/* Infinite scroll marquee */}
        <div className="relative pb-16">
          <div className="flex animate-marquee gap-6 hover:[animation-play-state:paused]">
            {[
              { quoteKey: "review.1", name: "Amina K.", location: "København" },
              { quoteKey: "review.2", name: "Sara L.", location: "Stockholm" },
              { quoteKey: "review.3", name: "Fatima O.", location: "Oslo" },
              { quoteKey: "review.4", name: "Marie H.", location: "Aarhus" },
              { quoteKey: "review.5", name: "Lina B.", location: "Malmö" },
              { quoteKey: "review.6", name: "Nadia R.", location: "Helsinki" },
              { quoteKey: "review.7", name: "Ingrid T.", location: "Bergen" },
              { quoteKey: "review.8", name: "Chioma A.", location: "København" },
              // Duplicate for seamless loop
              { quoteKey: "review.1", name: "Amina K.", location: "København" },
              { quoteKey: "review.2", name: "Sara L.", location: "Stockholm" },
              { quoteKey: "review.3", name: "Fatima O.", location: "Oslo" },
              { quoteKey: "review.4", name: "Marie H.", location: "Aarhus" },
              { quoteKey: "review.5", name: "Lina B.", location: "Malmö" },
              { quoteKey: "review.6", name: "Nadia R.", location: "Helsinki" },
              { quoteKey: "review.7", name: "Ingrid T.", location: "Bergen" },
              { quoteKey: "review.8", name: "Chioma A.", location: "København" },
            ].map((t, idx) => (
              <div
                key={`${t.name}-${idx}`}
                className="flex-shrink-0 w-[300px] sm:w-[350px] bg-card rounded-xl p-6 shadow-sm"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-text leading-relaxed mb-4 italic text-sm">
                  &ldquo;<T k={t.quoteKey} />&rdquo;
                </p>
                <div className="text-sm">
                  <span className="font-semibold text-text">{t.name}</span>
                  <span className="text-muted"> — {t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. BRAND STORY ═══ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
            <Image
              src="/images/products/brand-1.png"
              alt="Yetitrends - Vores historie"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              <T k="story.label" />
            </span>
            <h2 className="text-3xl font-bold mt-2 mb-4 font-display">
              <T k="story.title" />
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              <T k="story.p1" />
            </p>
            <p className="text-muted leading-relaxed mb-6">
              <T k="story.p2" />
            </p>
            <Link
              href="/om-os"
              className="inline-block px-6 py-2.5 border-2 border-accent text-accent font-medium rounded-md hover:bg-accent hover:text-white transition-colors"
            >
              <T k="story.cta" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 9. INSTAGRAM ═══ */}
      <section className="bg-surface">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-2 font-display">
            <T k="instagram.title" />
          </h2>
          <a
            href="https://www.instagram.com/yetitrends_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:text-primary-light transition-colors"
          >
            @yetitrends_
          </a>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {[
              "/images/products/lifestyle-1.png",
              "/images/products/lifestyle-2.png",
              "/images/products/maxi-1.png",
              "/images/products/kimono-patchwork-1.png",
            ].map((src, i) => (
              <a
                key={i}
                href="https://www.instagram.com/yetitrends_/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={src}
                  alt={`Yetitrends Instagram ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. HVORFOR YETITRENDS ═══ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 font-display">
          <T k="why.title" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Scissors,
              titleKey: "why.craft.title",
              descKey: "why.craft.desc",
            },
            {
              icon: Leaf,
              titleKey: "why.cotton.title",
              descKey: "why.cotton.desc",
            },
            {
              icon: Heart,
              titleKey: "why.fairtrade.title",
              descKey: "why.fairtrade.desc",
            },
            {
              icon: Headphones,
              titleKey: "why.service.title",
              descKey: "why.service.desc",
            },
          ].map((f) => (
            <div key={f.titleKey} className="text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-text mb-2"><T k={f.titleKey} /></h3>
              <p className="text-sm text-muted leading-relaxed"><T k={f.descKey} /></p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 11. BLOG PREVIEW ═══ */}
      {latestPosts.length > 0 && (
        <section className="bg-surface">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold font-display"><T k="blog.title" /></h2>
                <p className="text-muted mt-1"><T k="blog.subtitle" /></p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-block text-sm font-medium text-primary hover:text-primary-light transition-colors"
              >
                <T k="blog.all" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {post.imageUrl && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <time className="text-xs text-muted">
                      {new Date(post.publishedAt).toLocaleDateString("da-DK", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h3 className="mt-2 font-display text-lg font-bold text-text group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link href="/blog" className="text-sm font-medium text-primary">
                <T k="blog.all" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 12. NEWSLETTER ═══ */}
      <section className="bg-accent text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-2 font-display">
            <T k="newsletter.title" />
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            <T k="newsletter.subtitle" />
          </p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
