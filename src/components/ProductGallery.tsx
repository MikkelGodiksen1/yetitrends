"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
  url: string;
  alt: string;
}

export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] w-full rounded-lg bg-surface" />
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-surface">
        <Image
          src={activeImage.url}
          alt={activeImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors sm:h-20 sm:w-20 ${
                index === activeIndex
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
