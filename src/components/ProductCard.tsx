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
      className="group block overflow-hidden rounded-lg border border-surface bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        <Image
          src={imageUrl}
          alt={alt || name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h2 className="text-sm font-medium text-text sm:text-base">
          {name}
        </h2>
        <p className="mt-1 text-sm font-semibold text-primary">
          {formatPrice(price, currency)}
        </p>
      </div>
    </Link>
  );
}
