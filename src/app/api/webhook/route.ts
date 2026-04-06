import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import type Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Retrieve line items from the session
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 },
      );

      // Build the shipping address string
      const shipping =
        session.collected_information?.shipping_details?.address;
      const shippingAddress = shipping
        ? [
            shipping.line1,
            shipping.line2,
            `${shipping.postal_code} ${shipping.city}`,
            shipping.country,
          ]
            .filter(Boolean)
            .join(", ")
        : "";

      // Insert order
      const [order] = await db
        .insert(orders)
        .values({
          stripeSessionId: session.id,
          stripePaymentIntentId:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id ?? null,
          status: "paid",
          currency: (session.currency ?? "dkk").toUpperCase(),
          totalAmount: session.amount_total ?? 0,
          customerEmail: session.customer_details?.email ?? "",
          customerName: session.customer_details?.name ?? "",
          shippingAddress,
          country: shipping?.country ?? "DK",
        })
        .returning({ id: orders.id });

      // Insert order items
      if (order && lineItems.data.length > 0) {
        const items = lineItems.data.map((li) => {
          // Parse size from the product name — format "Name (Size)"
          const nameMatch = li.description?.match(/^(.+?)\s*\((.+)\)$/);
          const productName = nameMatch ? nameMatch[1] : (li.description ?? "");
          const size = nameMatch ? nameMatch[2] : "";

          return {
            orderId: order.id,
            productId: 0, // Line items don't carry our internal productId
            productName,
            size,
            quantity: li.quantity ?? 1,
            unitPrice: li.price?.unit_amount ?? 0,
            currency: (session.currency ?? "dkk").toUpperCase(),
          };
        });

        await db.insert(orderItems).values(items);
      }
    } catch (err) {
      console.error("Error processing checkout.session.completed:", err);
      return NextResponse.json(
        { error: "Webhook handler failed" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
