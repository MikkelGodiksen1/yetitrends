import Image from "next/image";
import Link from "next/link";
import { formatPrice, type SupportedCurrency } from "@/lib/currency";

interface ProductCardProps {
  name: string;
  slug: string;
  imageUrl: string;
  alt: string;
  price: number;
  currency: SupportedCurrency;
}

export default function ProductCard({
  name,
  slug,
  imageUrl,
  alt,
  price,
  currency,
}: ProductCardProps) {
  return (
    <Link
      href={`/katalog/${slug}`}
      className="group block overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={imageUrl}
          alt={alt || name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 sm:text-base">
          {name}
        </h2>
        <p className="mt-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          {formatPrice(price, currency)}
        </p>
      </div>
    </Link>
  );
}
