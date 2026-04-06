import Link from "next/link";
import { Globe, Heart, Music2 } from "lucide-react";

const shopLinks = [
  { href: "/katalog", label: "Katalog" },
  { href: "/katalog?category=kjoler", label: "Kjoler" },
  { href: "/katalog?category=tilbehoer", label: "Tilbehor" },
  { href: "/katalog?category=nyheder", label: "Nyheder" },
];

const aboutLinks = [
  { href: "/om-os", label: "Vores historie" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/handelsbetingelser", label: "Handelsbetingelser" },
  { href: "/privatlivspolitik", label: "Privatlivspolitik" },
];

const socialLinks = [
  { href: "https://www.facebook.com/ytnds", label: "Facebook", icon: Globe },
  { href: "https://www.instagram.com/yetitrends_/", label: "Instagram", icon: Heart },
  { href: "https://tiktok.com/@yetitrends", label: "TikTok", icon: Music2 },
];

export function Footer() {
  return (
    <footer className="bg-accent text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Shop */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Om Yetitrends */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Om Yetitrends
            </h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Social</h3>
            <ul className="flex gap-4">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Nyhedsbrev
            </h3>
            <p className="mb-3 text-sm text-white/70">
              Tilmeld dig og vær den forste til at se nye kollektioner.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Din e-mail"
                className="w-full rounded-l-md bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="rounded-r-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
              >
                Tilmeld
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/50">
          &copy; 2026 Yetitrends. Alle rettigheder forbeholdes.
        </div>
      </div>
    </footer>
  );
}
