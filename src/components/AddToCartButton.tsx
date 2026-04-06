"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { SupportedCurrency } from "@/lib/currency";

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  slug: string;
  sizes: string;
  price: number;
  currency: SupportedCurrency;
  imageUrl: string;
}

export default function AddToCartButton({
  productId,
  productName,
  slug,
  sizes,
  price,
  currency,
  imageUrl,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const sizeList = sizes
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const [selectedSize, setSelectedSize] = useState(sizeList[0] ?? "");
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      productId,
      productName,
      slug,
      size: selectedSize,
      unitPrice: price,
      currency,
      imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-3">
      {sizeList.length > 1 && (
        <div>
          <label
            htmlFor="size-select"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Størrelse
          </label>
          <select
            id="size-select"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {sizeList.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleAdd}
        disabled={!selectedSize && sizeList.length > 0}
        className="w-full rounded-md bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {added ? "Tilføjet!" : "Tilføj til kurv"}
      </button>
    </div>
  );
}
