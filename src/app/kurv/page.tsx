"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function KurvPage() {
  const { items, updateQuantity, removeItem, cartTotal, cartCount } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currency = items[0]?.currency ?? "DKK";

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, currency }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Der opstod en fejl.");
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Der opstod en fejl. Prøv igen.");
      setLoading(false);
    }
  }

  function formatPrice(amount: number) {
    const value = amount / 100;
    switch (currency) {
      case "SEK":
        return `${value.toLocaleString("sv-SE")} kr`;
      case "NOK":
        return `${value.toLocaleString("nb-NO")} kr`;
      case "EUR":
        return `€${value.toLocaleString("de-DE")}`;
      default:
        return `${value.toLocaleString("da-DK")} kr.`;
    }
  }

  if (cartCount === 0) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="mb-4 font-display text-3xl font-bold">Din kurv er tom</h1>
        <p className="mb-8 text-muted">
          Du har ikke tilf&oslash;jet nogen produkter endnu.
        </p>
        <Link
          href="/katalog"
          className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
        >
          Se vores katalog
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 font-display text-3xl font-bold">Din kurv</h1>

      <ul className="divide-y divide-surface">
        {items.map((item) => (
          <li
            key={`${item.productId}-${item.size}`}
            className="flex gap-4 py-6"
          >
            {/* Product image */}
            <Link
              href={`/katalog/${item.slug}`}
              className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-surface"
            >
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.productName}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                  Intet billede
                </div>
              )}
            </Link>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link
                  href={`/katalog/${item.slug}`}
                  className="font-medium hover:underline"
                >
                  {item.productName}
                </Link>
                {item.size && (
                  <p className="mt-0.5 text-sm text-muted">
                    Str. {item.size}
                  </p>
                )}
              </div>

              {/* Quantity controls */}
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.size, item.quantity - 1)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded border border-surface text-sm transition-colors hover:bg-surface"
                  aria-label="Fjern en"
                >
                  &minus;
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.size, item.quantity + 1)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded border border-surface text-sm transition-colors hover:bg-surface"
                  aria-label="Tilf&oslash;j en"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.productId, item.size)}
                  className="ml-4 text-sm text-muted hover:text-primary"
                  aria-label="Fjern fra kurv"
                >
                  Fjern
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-right text-sm font-medium">
              {formatPrice(item.unitPrice * item.quantity)}
            </div>
          </li>
        ))}
      </ul>

      {/* Subtotal + actions */}
      <div className="mt-8 border-t border-surface pt-6">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-6 w-full rounded-md bg-primary px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Omdirigerer..." : "Gå til betaling"}
        </button>

        <Link
          href="/katalog"
          className="mt-4 block text-center text-sm text-muted hover:text-text"
        >
          &larr; Forts&aelig;t med at handle
        </Link>
      </div>
    </section>
  );
}
