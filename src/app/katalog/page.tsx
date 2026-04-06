import type { Metadata } from "next";
import { db } from "@/lib/db";
import { products, productImages, productPrices } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getActiveCurrency } from "@/lib/currency";
import ProductCard from "@/components/ProductCard";
import { T } from "@/components/TranslatedText";

export const metadata: Metadata = {
  title: "Katalog — Yetitrends",
  description:
    "Udforsk vores kollektion af afrikanske kjoler, ankara-mode og unikke afrikanske designs. Håndlavet kvalitet med moderne snit.",
};

export default async function KatalogPage() {
  const currency = await getActiveCurrency();

  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      imageUrl: productImages.url,
      imageAlt: productImages.alt,
      price: productPrices.amount,
    })
    .from(products)
    .leftJoin(
      productImages,
      and(
        eq(productImages.productId, products.id),
        eq(productImages.sortOrder, 0)
      )
    )
    .leftJoin(
      productPrices,
      and(
        eq(productPrices.productId, products.id),
        eq(productPrices.currency, currency)
      )
    )
    .where(eq(products.isActive, true));

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-text sm:text-3xl font-display">
        <T k="katalog.title" />
      </h1>

      {rows.length === 0 ? (
        <p className="text-muted">
          <T k="katalog.empty" />
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {rows.map((row) => (
            <ProductCard
              key={row.id}
              name={row.name}
              slug={row.slug}
              imageUrl={row.imageUrl ?? "/placeholder.png"}
              alt={row.imageAlt ?? row.name}
              price={row.price ?? 0}
              currency={currency}
            />
          ))}
        </div>
      )}
    </main>
  );
}
