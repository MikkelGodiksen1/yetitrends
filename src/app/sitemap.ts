import { db } from "@/lib/db";
import { products, blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { MetadataRoute } from "next";

const BASE_URL = "https://yetitrends.dk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProducts = await db
    .select({ slug: products.slug })
    .from(products)
    .where(eq(products.isActive, true));

  const allPosts = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts);

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/katalog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/om-os`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/kontakt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...allProducts.map((p) => ({
      url: `${BASE_URL}/katalog/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...allPosts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
