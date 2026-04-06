import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Yetitrends — Autentisk afrikansk mode",
  description:
    "Unikke afrikanske kjoler og mode til det nordiske marked. Autentisk håndværk, moderne design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${playfair.variable} ${geist.className}`}>
      <body className="min-h-screen flex flex-col bg-bg text-text antialiased">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
