import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { products, productImages, productPrices } from "@/lib/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { getActiveCurrency, formatPrice } from "@/lib/currency";
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";
import JsonLd from "@/components/JsonLd";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProduct(slug: string) {
  const [product] = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.isActive, true)))
    .limit(1);

  return product ?? null;
}

export async function generateStaticParams() {
  const allProducts = await db
    .select({ slug: products.slug })
    .from(products)
    .where(eq(products.isActive, true));

  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Produkt ikke fundet — Yetitrends" };
  }

  return {
    title: `${product.name} — Yetitrends`,
    description:
      product.description ||
      `Køb ${product.name} hos Yetitrends. Unikke afrikanske designs og ankara-mode.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const currency = await getActiveCurrency();

  const [images, priceRows] = await Promise.all([
    db
      .select({ url: productImages.url, alt: productImages.alt })
      .from(productImages)
      .where(eq(productImages.productId, product.id))
      .orderBy(asc(productImages.sortOrder)),
    db
      .select({ amount: productPrices.amount })
      .from(productPrices)
      .where(
        and(
          eq(productPrices.productId, product.id),
          eq(productPrices.currency, currency)
        )
      )
      .limit(1),
  ]);

  const price = priceRows[0]?.amount ?? 0;
  const firstImage = images[0]?.url ?? "/placeholder.png";

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    image: images.map((img) => img.url),
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: (price / 100).toFixed(2),
      availability: product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={jsonLd} />

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {/* Gallery */}
        <ProductGallery
          images={images.map((img) => ({
            url: img.url,
            alt: img.alt || product.name,
          }))}
        />

        {/* Product info */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-2 text-xl font-semibold text-zinc-700 dark:text-zinc-300">
              {formatPrice(price, currency)}
            </p>
          </div>

          <AddToCartButton
            productId={product.id}
            productName={product.name}
            slug={product.slug}
            sizes={product.sizes}
            price={price}
            currency={currency}
            imageUrl={firstImage}
          />

          {product.descriptionHtml ? (
            <div
              className="prose prose-zinc dark:prose-invert max-w-none text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : product.description ? (
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {product.description}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
