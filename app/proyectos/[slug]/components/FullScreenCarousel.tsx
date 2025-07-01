'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface FullScreenCarouselProps {
  images: {
    id: number;
    url: string;
    width?: number;
    height?: number;
  }[];
  initialIndex?: number;
  isOpen?: boolean;
  onClose: () => void;
}

export default function FullScreenCarousel({ 
  images, 
  initialIndex = 0, 
  isOpen = true, 
  onClose 
}: FullScreenCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: initialIndex });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Bloquear el scroll del body cuando el carrusel está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Restaurar el scroll cuando se cierra
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Inicializar el carrusel en el índice correcto
  useEffect(() => {
    if (emblaApi && isOpen) {
      emblaApi.scrollTo(initialIndex);
    }
  }, [emblaApi, initialIndex, isOpen]);

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

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on('select', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Si isOpen está definido y es false, no mostrar el carrusel
  if (isOpen === false) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Botón de cierre */}
      <button 
        onClick={onClose}
        className="absolute right-4 top-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
        aria-label="Cerrar galería"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Contador de imágenes */}
      <div className="absolute left-4 top-4 bg-black/50 text-white px-3 py-1 rounded-full z-10">
        {selectedIndex + 1} / {images.length}
      </div>

      {/* Carrusel */}
      <div className="flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((image, index) => (
            <div 
              key={`fullscreen-image-${image.id}-${index}`} 
              className="relative flex-[0_0_100%] min-w-0 h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={image.url}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="object-contain"
                  unoptimized={true}
                  priority={index === initialIndex}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
}