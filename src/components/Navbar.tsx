"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useLocale } from "@/lib/locale-context";
import { CartDrawer } from "./CartDrawer";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navLinks = [
  { href: "/katalog", key: "nav.katalog" },
  { href: "/blog", key: "nav.blog" },
  { href: "/om-os", key: "nav.about" },
  { href: "/kontakt", key: "nav.contact" },
];

export function Navbar() {
  const { cartCount, setIsOpen } = useCart();
  const { t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur border-b border-surface">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Yetitrends — African Fashion"
              width={240}
              height={75}
              className="h-14 sm:h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-text transition-colors hover:text-primary"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: language + cart + mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative text-text transition-colors hover:text-primary"
              aria-label={t("nav.cart")}
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden text-text transition-colors hover:text-primary"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-surface bg-bg px-4 pb-4">
            <ul className="flex flex-col gap-3 pt-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-medium text-text transition-colors hover:text-primary"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
