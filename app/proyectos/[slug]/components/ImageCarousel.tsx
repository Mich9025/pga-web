'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import FullScreenCarousel from './FullScreenCarousel';

interface ImageCarouselProps {
  images: {
    id: number;
    url: string;
    width?: number;
    height?: number;
  }[];
  filterByDate?: boolean;
  onImageClick?: (index: number) => void;
}

export default function ImageCarousel({ images, filterByDate = false, onImageClick }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [filteredImages, setFilteredImages] = useState(images);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Filtrar imágenes por fecha en el nombre si se solicita
  useEffect(() => {
    if (filterByDate && images.length > 0) {
      // Extraer fecha del nombre de la imagen (asumiendo formato como "imagen_20240601.jpg")
      const extractDateFromUrl = (url: string) => {
        const match = url.match(/_(\d{8})/);
        return match ? match[1] : null;
      };

      // Ordenar imágenes por fecha (más reciente primero)
      const sorted = [...images].sort((a, b) => {
        const dateA = extractDateFromUrl(a.url);
        const dateB = extractDateFromUrl(b.url);
        
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        
        return dateB.localeCompare(dateA);
      });

      setFilteredImages(sorted);
    } else {
      setFilteredImages(images);
    }
  }, [images, filterByDate]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const openFullScreen = useCallback(() => {
    setIsFullScreen(true);
  }, []);

  const closeFullScreen = useCallback(() => {
    setIsFullScreen(false);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (filteredImages.length === 0) {
    return null;
  }

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {filteredImages.map((image, index) => (
              <div 
                key={`carousel-image-${image.id}-${index}`} 
                className="relative flex-[0_0_100%] min-w-0 h-[50vh] md:h-[70vh] cursor-pointer"
                onClick={() => onImageClick ? onImageClick(index) : openFullScreen()}
              >
                <Image
                  src={image.url}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={true}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Botón de pantalla completa */}
        <button 
          onClick={() => onImageClick ? onImageClick(selectedIndex) : openFullScreen()}
          className="absolute right-16 top-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
          aria-label="Ver en pantalla completa"
        >
          <Maximize2 className="h-5 w-5" />
        </button>

        {/* Botones de navegación */}
        <button 
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {scrollSnaps.map((_, index) => (
            <button
              key={`dot-${index}`}
              className={`w-2 h-2 rounded-full transition-colors ${index === selectedIndex ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Ir a imagen ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>

      {/* Carrusel a pantalla completa (solo se muestra si no hay onImageClick) */}
      {!onImageClick && (
        <FullScreenCarousel 
          images={filteredImages} 
          initialIndex={selectedIndex}
          isOpen={isFullScreen}
          onClose={closeFullScreen}
        />
      )}
    </>
  );
}