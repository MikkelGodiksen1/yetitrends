import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// Price helper: base DKK price → all currencies
function prices(productId: number, dkk: number) {
  const sek = Math.round(dkk * 1.37);
  const nok = Math.round(dkk * 1.37);
  const eur = Math.round(dkk * 0.134);
  return [
    { productId, currency: "DKK", amount: dkk * 100, displayAmount: `${dkk} kr.` },
    { productId, currency: "SEK", amount: sek * 100, displayAmount: `${sek} kr` },
    { productId, currency: "NOK", amount: nok * 100, displayAmount: `${nok} kr` },
    { productId, currency: "EUR", amount: eur * 100, displayAmount: `${eur} €` },
  ];
}

const productData = [
  // === TWO-PIECE SETS ===
  {
    name: "African Print Cotton Two-Piece Set",
    slug: "african-print-cotton-two-piece-set",
    description: "Smukt håndlavet to-delt sæt i autentisk afrikansk print. Lavet af 100% bomuld i Nigeria. Perfekt til både hverdag og festlige lejligheder.",
    category: "two-piece-set",
    sizes: "S,M,L,XL",
    priceDKK: 400,
    images: [
      { url: "/images/products/two-piece-1.png", alt: "African Print Two-Piece Set - front" },
      { url: "/images/products/two-piece-2.png", alt: "African Print Two-Piece Set - detail" },
      { url: "/images/products/two-piece-3.png", alt: "African Print Two-Piece Set - side" },
      { url: "/images/products/two-piece-4.png", alt: "African Print Two-Piece Set - back" },
      { url: "/images/products/two-piece-5.png", alt: "African Print Two-Piece Set - styled" },
    ],
  },
  {
    name: "African Print Cotton Two-Piece Set – Mønster B",
    slug: "african-print-cotton-two-piece-set-b",
    description: "Elegant to-delt sæt med unikt afrikansk mønster. Håndlavet i Nigeria af premium bomuld.",
    category: "two-piece-set",
    sizes: "S,M,L,XL",
    priceDKK: 400,
    images: [
      { url: "/images/products/two-piece-b-1.png", alt: "African Print Two-Piece Set B - front" },
    ],
  },

  // === KIMONO JACKETS ===
  {
    name: "Patchwork Ankara Kimono Jacket",
    slug: "patchwork-ankara-kimono-jacket",
    description: "Unik patchwork kimono-jakke i autentiske ankara-stoffer. Med lommer og løs pasform. Et statement-piece til enhver garderobe.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 400,
    images: [
      { url: "/images/products/kimono-patchwork-1.png", alt: "Patchwork Ankara Kimono - front" },
      { url: "/images/products/kimono-patchwork-2.png", alt: "Patchwork Ankara Kimono - back" },
      { url: "/images/products/kimono-patchwork-3.png", alt: "Patchwork Ankara Kimono - styled" },
    ],
  },
  {
    name: "African-Inspired Patchwork Kimono – Blå/Rød",
    slug: "african-patchwork-kimono-blaa-roed",
    description: "Farverig patchwork kimono i blå og røde toner. Håndlavet med autentiske afrikanske stoffer.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 500,
    images: [
      { url: "/images/products/kimono-1.png", alt: "Patchwork Kimono Blå/Rød" },
    ],
  },
  {
    name: "African-Inspired Patchwork Kimono – Grøn/Guld",
    slug: "african-patchwork-kimono-groen-guld",
    description: "Elegant kimono i grønne og gyldne toner med afrikansk patchwork-design.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 500,
    images: [
      { url: "/images/products/kimono-b-1.png", alt: "Patchwork Kimono Grøn/Guld" },
    ],
  },
  {
    name: "African Patchwork Kimono – Turkis Mønster",
    slug: "african-patchwork-kimono-turkis",
    description: "Smuk kimono med turkise og blå ankara-mønstre. Løs pasform med praktiske lommer.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 500,
    images: [
      { url: "/images/products/kimono-c-1.png", alt: "Patchwork Kimono Turkis" },
    ],
  },
  {
    name: "African Patchwork Kimono – Jordfarvede toner",
    slug: "african-patchwork-kimono-jordfarver",
    description: "Varm kimono i jordfarvede toner med autentisk afrikansk patchwork. Perfekt til efteråret.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 500,
    images: [
      { url: "/images/products/kimono-d-1.png", alt: "Patchwork Kimono Jordfarver" },
    ],
  },
  {
    name: "African Patchwork Kimono – Blåt landskab",
    slug: "african-patchwork-kimono-blaat-landskab",
    description: "Unik kimono med blåt mønster inspireret af afrikanske landskaber. Et smukt statement-piece.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 500,
    images: [
      { url: "/images/products/kimono-e-1.png", alt: "Patchwork Kimono Blåt Landskab" },
    ],
  },
  {
    name: "African Patchwork Kimono – Regnbue",
    slug: "african-patchwork-kimono-regnbue",
    description: "Festlig kimono med et regnbue af afrikanske print-stoffer. Bær den og gør et statement.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 500,
    images: [
      { url: "/images/products/kimono-f-1.png", alt: "Patchwork Kimono Regnbue" },
    ],
  },
  {
    name: "African Patchwork Kimono – Bordeaux",
    slug: "african-patchwork-kimono-bordeaux",
    description: "Elegant kimono i varme bordeaux-toner med afrikansk patchwork-design.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 500,
    images: [
      { url: "/images/products/kimono-g-1.png", alt: "Patchwork Kimono Bordeaux" },
    ],
  },
  {
    name: "African Patchwork Kimono – Solnedgang",
    slug: "african-patchwork-kimono-solnedgang",
    description: "Varm kimono i orange og gyldne farver. Inspireret af den afrikanske solnedgang.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 500,
    images: [
      { url: "/images/products/kimono-h-1.png", alt: "Patchwork Kimono Solnedgang" },
    ],
  },
  {
    name: "African Patchwork Kimono – Havblå",
    slug: "african-patchwork-kimono-havblaa",
    description: "Frisk kimono i havblå nuancer med autentisk afrikansk patchwork-teknik.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 500,
    images: [
      { url: "/images/products/kimono-i-1.png", alt: "Patchwork Kimono Havblå" },
    ],
  },
  {
    name: "Patchwork Cotton Kimono – Naturlige toner",
    slug: "patchwork-cotton-kimono-naturlige",
    description: "Klassisk patchwork kimono i naturlige jordfarver. 100% bomuld, håndlavet i Nigeria.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 400,
    images: [
      { url: "/images/products/kimono-patchwork-2.png", alt: "Cotton Kimono Naturlige Toner" },
      { url: "/images/products/kimono-patchwork-3.png", alt: "Cotton Kimono Naturlige Toner - styled" },
    ],
  },
  {
    name: "Patchwork Cotton Kimono – Skovgrøn",
    slug: "patchwork-cotton-kimono-skovgroen",
    description: "Smuk patchwork kimono i dybe grønne toner. 100% bomuld fra Nigeria.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 300,
    images: [
      { url: "/images/products/kimono-cotton-1.png", alt: "Cotton Kimono Skovgrøn" },
    ],
  },

  // === MAXI DRESSES ===
  {
    name: "Luxury African Print Maxi Dress – Ankara Collection",
    slug: "luxury-african-print-maxi-dress-ankara",
    description: "Eksklusiv maxi-kjole fra Yetitrends' Ankara Collection. Syet i premium afrikansk print-stof med elegant snit.",
    category: "maxi-dress",
    sizes: "S,M,L,XL,XXL",
    priceDKK: 500,
    images: [
      { url: "/images/products/maxi-1.png", alt: "Luxury African Maxi Dress - front" },
      { url: "/images/products/maxi-2.png", alt: "Luxury African Maxi Dress - detail" },
      { url: "/images/products/maxi-3.png", alt: "Luxury African Maxi Dress - styled" },
      { url: "/images/products/maxi-4.png", alt: "Luxury African Maxi Dress - back" },
      { url: "/images/products/maxi-5.png", alt: "Luxury African Maxi Dress - side" },
    ],
  },
  {
    name: "Luxury Ankara Maxi Dress – Blå Blomster",
    slug: "luxury-ankara-maxi-dress-blaa-blomster",
    description: "Smuk maxi-kjole med blå blomstermønster i premium ankara-stof.",
    category: "maxi-dress",
    sizes: "S,M,L,XL",
    priceDKK: 500,
    images: [
      { url: "/images/products/maxi-ankara-a-1.png", alt: "Ankara Maxi Dress Blå Blomster" },
    ],
  },
  {
    name: "Luxury Ankara Maxi Dress – Gylden",
    slug: "luxury-ankara-maxi-dress-gylden",
    description: "Elegant maxi-kjole i gyldne og orange toner. Premium ankara-stof med detaljeret mønster.",
    category: "maxi-dress",
    sizes: "S,M,L,XL",
    priceDKK: 500,
    images: [
      { url: "/images/products/maxi-ankara-b-1.png", alt: "Ankara Maxi Dress Gylden" },
    ],
  },

  // === ELEGANT DRESSES ===
  {
    name: "Elegant African Print Dress – Blå Perler",
    slug: "elegant-african-dress-blaa-perler",
    description: "Elegant kjole med blåt afrikansk print og perledetaljer. Perfekt til festlige lejligheder.",
    category: "dress",
    sizes: "S,M,L,XL",
    priceDKK: 400,
    images: [
      { url: "/images/products/dress-a-1.png", alt: "Elegant African Dress Blå Perler" },
    ],
  },
  {
    name: "Elegant African Print Dress – Guld & Sort",
    slug: "elegant-african-dress-guld-sort",
    description: "Sofistikeret kjole i guld og sort afrikansk print. Et tidløst stykke tøj.",
    category: "dress",
    sizes: "S,M,L,XL",
    priceDKK: 400,
    images: [
      { url: "/images/products/dress-b-1.png", alt: "Elegant African Dress Guld & Sort" },
    ],
  },
  {
    name: "Elegant African Print Dress – Orange Ankara",
    slug: "elegant-african-dress-orange-ankara",
    description: "Livlig kjole i orange ankara-stof med moderne snit. Håndlavet kvalitet.",
    category: "dress",
    sizes: "S,M,L,XL",
    priceDKK: 500,
    images: [
      { url: "/images/products/dress-c-1.png", alt: "Elegant African Dress Orange" },
    ],
  },
  {
    name: "Elegant African Print Dress – Rød Glimmer",
    slug: "elegant-african-dress-roed-glimmer",
    description: "Glamourøs kjole i rødt afrikansk print med glimmerdetaljer. Perfekt til fester.",
    category: "dress",
    sizes: "S,M,L,XL",
    priceDKK: 500,
    images: [
      { url: "/images/products/dress-d-1.png", alt: "Elegant African Dress Rød Glimmer" },
    ],
  },
  {
    name: "Elegant African Print Dress – Lilla Batik",
    slug: "elegant-african-dress-lilla-batik",
    description: "Unik kjole i lilla batik-mønster. Traditionelt afrikansk håndværk i moderne design.",
    category: "dress",
    sizes: "S,M,L,XL",
    priceDKK: 500,
    images: [
      { url: "/images/products/dress-e-1.png", alt: "Elegant African Dress Lilla Batik" },
    ],
  },
  {
    name: "Patchwork African Print Kimono – 100% Cotton",
    slug: "patchwork-kimono-100-cotton",
    description: "Klassisk patchwork kimono i 100% bomuld. Håndlavet i Nigeria med autentiske afrikanske stoffer.",
    category: "kimono",
    sizes: "One Size",
    priceDKK: 300,
    images: [
      { url: "/images/products/kimono-cotton-1.png", alt: "100% Cotton Patchwork Kimono" },
    ],
  },
];

async function seedAllProducts() {
  console.log("Seeding all products...");

  // Clear existing
  await db.delete(schema.productPrices);
  await db.delete(schema.productImages);
  await db.delete(schema.products);

  for (const p of productData) {
    const [product] = await db
      .insert(schema.products)
      .values({
        name: p.name,
        slug: p.slug,
        description: p.description,
        descriptionHtml: `<p>${p.description}</p>`,
        category: p.category,
        sizes: p.sizes,
        stock: 15,
        isFeatured: productData.indexOf(p) < 6, // First 6 are featured
        isActive: true,
      })
      .returning();

    // Images
    await db.insert(schema.productImages).values(
      p.images.map((img, i) => ({
        productId: product.id,
        url: img.url,
        alt: img.alt,
        sortOrder: i,
      }))
    );

    // Prices
    await db.insert(schema.productPrices).values(prices(product.id, p.priceDKK));
  }

  console.log(`Seeded ${productData.length} products!`);
}

seedAllProducts().catch(console.error);
