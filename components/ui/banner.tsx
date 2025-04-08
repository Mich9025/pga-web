"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export function Banner({
  images,
  arrows = false,
  children,
}: {
  images: string[];
  arrows?: boolean;
  children?: React.ReactNode;
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();

    carouselApi.on("select", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState); // Clean up on unmount
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  return (
    <div className="overflow-hidden relative bg-primary px-6 py-24 sm:py-32 lg:px-8 min-h-[99vh] flex items-center justify-left">
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true }}
        plugins={[Autoplay({ playOnInit: true, delay: 5000 })]}
        className="fixed inset-0 opacity-50"
      >
        <CarouselContent className="absolute inset-0 !m-0">
          {images.map((src) => (
            <CarouselItem key={`banner-carousel-item-${src}`} className="!p-0">
              <img
                src={src}
                alt="banner"
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* <div className="vignette"></div> */}

      {children}

      {/* Navigation Arrows */}
      {arrows && (
        <div className="absolute inset-0 z-20 flex items-center justify-between px-3 pointer-events-none">
          <Button
            onClick={() => scrollToIndex(currentIndex - 1)}
            className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
          >
            <ChevronLeft className="size-32" strokeWidth={0.5} />
          </Button>
          <Button
            onClick={() => scrollToIndex(currentIndex + 1)}
            className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
          >
            <ChevronRight className="size-32" strokeWidth={0.5} />
          </Button>
        </div>
      )}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 md:bottom-12 inset-x-0 flex justify-start space-x-2 z-40 px-4 md:px-24 lg:px-44">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`size-2 md:size-3 rounded-full border-2 border-white opacity-80 hover:opacity-100 ${
              currentIndex === index ? "bg-white" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
