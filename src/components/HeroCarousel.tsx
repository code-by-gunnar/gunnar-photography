"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  images: CarouselImage[];
  interval?: number;
  showControls?: boolean;
}

export default function HeroCarousel({
  images,
  interval = 5000,
  showControls = true,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [isAutoPlaying, interval, goToNext, images.length]);

  if (images.length === 0) return null;

  return (
    <div
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {images.map((image, index) => (
        <div
          key={image.id}
          className={
            "absolute inset-0 transition-opacity duration-1000 " +
            (index === currentIndex ? "opacity-100" : "opacity-0")
          }
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover carousel-slide"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {showControls && images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
            aria-label="Next slide"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={
                  "rounded-full transition-all " +
                  (index === currentIndex
                    ? "bg-white w-6 h-2"
                    : "bg-white/50 hover:bg-white/75 w-2 h-2")
                }
                aria-label={"Go to slide " + (index + 1)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
