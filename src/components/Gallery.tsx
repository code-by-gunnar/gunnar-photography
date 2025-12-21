"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface GalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export default function Gallery({ images, columns = 3 }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const columnClasses = {
    2: "columns-1 md:columns-2",
    3: "columns-1 md:columns-2 lg:columns-3",
    4: "columns-1 md:columns-2 lg:columns-3 xl:columns-4",
  };

  return (
    <>
      <div className={columnClasses[columns] + " gap-4"}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className="mb-4 break-inside-avoid overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setLightboxIndex(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover img-hover group-hover:opacity-90 transition-opacity"
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
