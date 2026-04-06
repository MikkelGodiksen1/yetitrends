"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";

function formatPriceClient(amount: number, currency: string) {
  const val = amount / 100;
  if (currency === "EUR") return `€${val}`;
  return `${val} kr.`;
}

export function CartDrawer() {
  const { items, updateQuantity, removeItem, cartTotal, isOpen, setIsOpen } =
    useCart();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Determine currency from first item or default
  const currency = items[0]?.currency ?? "DKK";

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-text">
            Indkobskurv
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-muted transition-colors hover:text-text"
            aria-label="Luk kurv"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-muted">
              Din kurv er tom.
            </p>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4"
                >
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-surface">
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium text-text">
                        {item.productName}
                      </p>
                      <p className="text-xs text-muted">
                        Str. {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded border border-surface text-muted transition-colors hover:border-primary hover:text-primary"
                          aria-label="Reducer antal"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[1.25rem] text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded border border-surface text-muted transition-colors hover:border-primary hover:text-primary"
                          aria-label="Forog antal"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-text">
                          {formatPriceClient(
                            item.unitPrice * item.quantity,
                            item.currency
                          )}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.productId, item.size)
                          }
                          className="text-muted transition-colors hover:text-red-600"
                          aria-label="Fjern produkt"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-surface px-5 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted">Subtotal</span>
              <span className="text-lg font-semibold text-text">
                {formatPriceClient(cartTotal, currency)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              Ga til betaling
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
