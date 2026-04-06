import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { products, productPrices } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import type { CartItem } from "@/lib/cart";

export async function POST(request: Request) {
  try {
    const { items, currency } = (await request.json()) as {
      items: CartItem[];
      currency: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Kurven er tom." },
        { status: 400 },
      );
    }

    const cur = currency.toLowerCase();

    // Validate every item's price against the database — never trust client prices
    const lineItems: {
      price_data: {
        currency: string;
        unit_amount: number;
        product_data: { name: string; images?: string[] };
      };
      quantity: number;
    }[] = [];

    for (const item of items) {
      const [priceRow] = await db
        .select({
          amount: productPrices.amount,
          productName: products.name,
        })
        .from(productPrices)
        .innerJoin(products, eq(products.id, productPrices.productId))
        .where(
          and(
            eq(productPrices.productId, item.productId),
            eq(productPrices.currency, currency.toUpperCase()),
          ),
        )
        .limit(1);

      if (!priceRow) {
        return NextResponse.json(
          { error: `Produktet "${item.productName}" har ikke en gyldig pris.` },
          { status: 400 },
        );
      }

      const label =
        item.size
          ? `${priceRow.productName} (${item.size})`
          : priceRow.productName;

      lineItems.push({
        price_data: {
          currency: cur,
          unit_amount: priceRow.amount,
          product_data: {
            name: label,
            ...(item.imageUrl ? { images: [item.imageUrl] } : {}),
          },
        },
        quantity: item.quantity,
      });
    }

    // MobilePay is only available for DKK
    const paymentMethods: ("card" | "klarna" | "mobilepay")[] = [
      "card",
      "klarna",
    ];
    if (cur === "dkk") {
      paymentMethods.push("mobilepay");
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: cur,
      payment_method_types: paymentMethods,
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["DK", "SE", "NO", "FI"],
      },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/kurv`,
      metadata: {
        source: "yetitrends",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Der opstod en fejl. Prøv igen." },
      { status: 500 },
    );
  }
}
