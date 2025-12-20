"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export default function Gallery({ images, columns = 3 }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <>
      <div className={"grid grid-cols-1 " + gridCols[columns] + " gap-4"}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative aspect-[3/2] overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setLightboxIndex(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover img-hover group-hover:opacity-90"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          src={images[lightboxIndex].src}
          alt={images[lightboxIndex].alt}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null && prev < images.length - 1 ? prev + 1 : prev
            )
          }
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < images.length - 1}
        />
      )}
    </>
  );
}
