"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbnails,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SliderProps {
  id: string;
  alt: string;
  images: {
    id: number;
    url: string;
    width: number;
    height: number;
  }[];
}

function Slider({ alt, id: altId, images }: SliderProps) {
  const [currentHeight, setCurrentHeight] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const updateHeight = () => {
      const container = api.containerNode();
      if (!container) return;

      const currentIndex = api.selectedScrollSnap();
      const currentSlide = container.children[currentIndex];

      if (currentSlide) {
        // Get the actual content height including any padding
        const slideContent = currentSlide.querySelector(".slide-content");
        if (slideContent) {
          const height = slideContent.getBoundingClientRect().height;
          setCurrentHeight(height);
        }
      }
    };

    // Update height on select and resize
    api.on("select", updateHeight);
    api.on("resize", updateHeight);

    // Initial height update
    setTimeout(updateHeight, 100); // Small delay to ensure images are loaded

    return () => {
      api.off("select", updateHeight);
      api.off("resize", updateHeight);
    };
  }, [api]);

  return (
    <div className="md:pr-12">
      <Carousel
        className="w-full max-w-3xl mx-auto"
        setApi={setApi}
        draggable={images?.length > 1}
      >
        <CarouselContent
          className="transition-[height] duration-300 ease-in-out"
          style={{ height: currentHeight }}
        >
          {images.map(({ id, url, width, height }, index) => (
            <CarouselItem key={`${altId}-${id}-${index}`}>
              <div className="slide-content p-1">
                <div className="relative w-full">
                  <Image
                    alt={`${alt} ${index + 1}`}
                    className="w-full h-auto object-contain rounded-xl shadow-md"
                    src={url}
                    width={width}
                    height={height}
                    priority={index === 0}
                    unoptimized = {true}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images?.length > 1 && (
          <>
            <div className="relative mt-2 flex items-center justify-center">
              <CarouselPrevious className="static translate-y-0 translate-x-0 mr-2" />
              <CarouselNext className="static translate-y-0 translate-x-0" />
            </div>

            <CarouselThumbnails className="mt-4">
              {images.map(({ id, url, width, height }, index) => (
                <div
                  key={`${altId}-thumb-${id}-${index}`}
                  className="relative min-w-[100px] aspect-square"
                >
                  <Image
                    src={url}
                    width={width}
                    height={height}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                    unoptimized = {true}
                  />
                </div>
              ))}
            </CarouselThumbnails>
          </>
        )}
      </Carousel>
    </div>
  );
}
export default Slider;
