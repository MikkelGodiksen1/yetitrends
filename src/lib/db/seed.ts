import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(schema.productPrices);
  await db.delete(schema.productImages);
  await db.delete(schema.products);

  // ─── Product 1: African Print Cotton Two-Piece Set (variant A) ───
  const [product1] = await db
    .insert(schema.products)
    .values({
      name: "African Print Cotton Two-Piece Set",
      slug: "african-print-cotton-two-piece-set",
      description:
        "Smukt håndlavet to-delt sæt i autentisk afrikansk print. Lavet af 100% bomuld i Nigeria. Perfekt til både hverdag og festlige lejligheder.",
      descriptionHtml:
        "<p>Smukt håndlavet to-delt sæt i autentisk afrikansk print. Lavet af 100% bomuld i Nigeria.</p><p>Perfekt til både hverdag og festlige lejligheder.</p>",
      category: "two-piece-set",
      sizes: "S,M,L,XL",
      stock: 20,
      isFeatured: true,
      isActive: true,
    })
    .returning();

  // ─── Product 2: African Print Cotton Two-Piece Set (variant B) ───
  const [product2] = await db
    .insert(schema.products)
    .values({
      name: "African Print Cotton Two-Piece Set – Mønster B",
      slug: "african-print-cotton-two-piece-set-b",
      description:
        "Elegant to-delt sæt med unikt afrikansk mønster. Håndlavet i Nigeria af premium bomuld. Fås i flere størrelser.",
      descriptionHtml:
        "<p>Elegant to-delt sæt med unikt afrikansk mønster. Håndlavet i Nigeria af premium bomuld.</p><p>Fås i flere størrelser.</p>",
      category: "two-piece-set",
      sizes: "S,M,L,XL",
      stock: 15,
      isFeatured: true,
      isActive: true,
    })
    .returning();

  // ─── Product 3: Patchwork Kimono Jacket (variant A) ───
  const [product3] = await db
    .insert(schema.products)
    .values({
      name: "African-Inspired Patchwork Kimono Jacket",
      slug: "african-patchwork-kimono-jacket",
      description:
        "Unik kimono-jakke inspireret af afrikansk patchwork-tradition. Med praktiske lommer og løs pasform. Et statement-piece til enhver garderobe.",
      descriptionHtml:
        "<p>Unik kimono-jakke inspireret af afrikansk patchwork-tradition.</p><p>Med praktiske lommer og løs pasform. Et statement-piece til enhver garderobe.</p>",
      category: "kimono",
      sizes: "One Size,S/M,L/XL",
      stock: 10,
      isFeatured: true,
      isActive: true,
    })
    .returning();

  // ─── Product 4: Luxury African Print Maxi Dresses ───
  const [product4] = await db
    .insert(schema.products)
    .values({
      name: "Luxury African Print Maxi Dress – Ankara Collection",
      slug: "luxury-african-print-maxi-dress-ankara",
      description:
        "Eksklusiv maxi-kjole fra Yetitrends' Ankara Collection. Syet i premium afrikansk print-stof med elegant snit. Perfekt til særlige lejligheder.",
      descriptionHtml:
        "<p>Eksklusiv maxi-kjole fra Yetitrends' Ankara Collection.</p><p>Syet i premium afrikansk print-stof med elegant snit. Perfekt til særlige lejligheder.</p>",
      category: "maxi-dress",
      sizes: "S,M,L,XL,XXL",
      stock: 12,
      isFeatured: true,
      isActive: true,
    })
    .returning();

  // ─── Product Images ───
  const imageData = [
    // Product 1 images
    { productId: product1.id, url: "/images/products/two-piece-1.png", alt: "African Print Cotton Two-Piece Set - front", sortOrder: 0 },
    { productId: product1.id, url: "/images/products/two-piece-2.png", alt: "African Print Cotton Two-Piece Set - detail", sortOrder: 1 },
    { productId: product1.id, url: "/images/products/two-piece-3.png", alt: "African Print Cotton Two-Piece Set - side", sortOrder: 2 },
    { productId: product1.id, url: "/images/products/two-piece-4.png", alt: "African Print Cotton Two-Piece Set - back", sortOrder: 3 },
    { productId: product1.id, url: "/images/products/two-piece-5.png", alt: "African Print Cotton Two-Piece Set - styled", sortOrder: 4 },
    // Product 2 images
    { productId: product2.id, url: "/images/products/two-piece-b-1.png", alt: "African Print Cotton Two-Piece Set B - front", sortOrder: 0 },
    // Product 3 images
    { productId: product3.id, url: "/images/products/kimono-1.png", alt: "Patchwork Kimono Jacket - front", sortOrder: 0 },
    // Product 4 (kimono variant B) - reuse kimono-b image
    { productId: product3.id, url: "/images/products/kimono-b-1.png", alt: "Patchwork Kimono Jacket - alternate", sortOrder: 1 },
    // Product 4 images (maxi dresses)
    { productId: product4.id, url: "/images/products/maxi-1.png", alt: "Luxury African Maxi Dress - front", sortOrder: 0 },
    { productId: product4.id, url: "/images/products/maxi-2.png", alt: "Luxury African Maxi Dress - detail", sortOrder: 1 },
    { productId: product4.id, url: "/images/products/maxi-3.png", alt: "Luxury African Maxi Dress - styled", sortOrder: 2 },
    { productId: product4.id, url: "/images/products/maxi-4.png", alt: "Luxury African Maxi Dress - back", sortOrder: 3 },
    { productId: product4.id, url: "/images/products/maxi-5.png", alt: "Luxury African Maxi Dress - side", sortOrder: 4 },
  ];

  await db.insert(schema.productImages).values(imageData);

  // ─── Product Prices (4 currencies x 4 products) ───
  const priceData = [
    // Product 1: 400 DKK
    { productId: product1.id, currency: "DKK", amount: 40000, displayAmount: "400 kr." },
    { productId: product1.id, currency: "SEK", amount: 54900, displayAmount: "549 kr" },
    { productId: product1.id, currency: "NOK", amount: 54900, displayAmount: "549 kr" },
    { productId: product1.id, currency: "EUR", amount: 5400, displayAmount: "54 €" },
    // Product 2: 400 DKK
    { productId: product2.id, currency: "DKK", amount: 40000, displayAmount: "400 kr." },
    { productId: product2.id, currency: "SEK", amount: 54900, displayAmount: "549 kr" },
    { productId: product2.id, currency: "NOK", amount: 54900, displayAmount: "549 kr" },
    { productId: product2.id, currency: "EUR", amount: 5400, displayAmount: "54 €" },
    // Product 3: 500 DKK
    { productId: product3.id, currency: "DKK", amount: 50000, displayAmount: "500 kr." },
    { productId: product3.id, currency: "SEK", amount: 68900, displayAmount: "689 kr" },
    { productId: product3.id, currency: "NOK", amount: 68900, displayAmount: "689 kr" },
    { productId: product3.id, currency: "EUR", amount: 6700, displayAmount: "67 €" },
    // Product 4: 500 DKK
    { productId: product4.id, currency: "DKK", amount: 50000, displayAmount: "500 kr." },
    { productId: product4.id, currency: "SEK", amount: 68900, displayAmount: "689 kr" },
    { productId: product4.id, currency: "NOK", amount: 68900, displayAmount: "689 kr" },
    { productId: product4.id, currency: "EUR", amount: 6700, displayAmount: "67 €" },
  ];

  await db.insert(schema.productPrices).values(priceData);

  console.log("Seeded 4 products with images and prices!");
}

seed().catch(console.error);
