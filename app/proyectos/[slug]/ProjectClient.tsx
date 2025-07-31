"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CgArrowLongLeft } from "react-icons/cg";
import { Maximize2 } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Section } from "@/components/craft"
import { Container } from "@/components/craft"
import FullScreenCarousel from "./components/FullScreenCarousel";
import ImageCarousel from "./components/ImageCarousel";

interface ProjectClientProps {
  project: any;
}

const obras = {
  "Unique Qbico": {
    "2025-6": {
      descripcion: "A la fecha, hemos finalizado con éxito la cimentación profunda del proyecto, la cual incluyó la ejecución de pantallas perimetrales, barretes, pilotes temporales y definitivos, así como la fase de pilotaje. Actualmente, nos encontramos en proceso de demolición de la placa de concreto existente, lo que permitirá dar inicio a la construcción de las vigas puntales y vigas andén.",
      fecha: "2025-06-26",
      videos: [
        { id: 1, url: "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/AVANCE-DE-OBRA-QBICO.mov", titulo: "Cimentación profunda" },          
      ]
    },    
  },
  "Unique Me": {
     "2025-6": {
       descripcion: "Inicio de la etapa de obra preliminares: trabajos de demolición de construcciones existentes y descapote de terreno. Se ha completado el 60% de la demolición programada.",
       fecha: "2025-06-26",
       videos: [
         { id: 4, url: "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/AVANCE-JUNIO-UNIQUE-ME.mp4", titulo: "Demolición inicial" }
       ]
     },       
   }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function ProjectClient({ project }: ProjectClientProps) {
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGalleryType, setCurrentGalleryType] = useState<'gallery' | 'avance'>('gallery');
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  const openFullScreen = (index: number, galleryType: 'gallery' | 'avance' = 'gallery') => {
    setCurrentImageIndex(index);
    setCurrentGalleryType(galleryType);
    setIsFullScreenOpen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
  };

  // Funciones para el lightbox
  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    if (project?.avance_obra && project.avance_obra.length > 0) {
      setLightboxImageIndex((prev) => 
        prev === project.avance_obra.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevLightboxImage = () => {
    if (project?.avance_obra && project.avance_obra.length > 0) {
      setLightboxImageIndex((prev) => 
        prev === 0 ? project.avance_obra.length - 1 : prev - 1
      );
    }
  };

  // Manejar teclas del teclado para navegación del lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          nextLightboxImage();
        } else if (e.key === 'ArrowLeft') {
          prevLightboxImage();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, project]);

  // Inicializar el mes seleccionado cuando se carga el proyecto
  useEffect(() => {
    if (project && project.title && project.title.rendered) {
      const projectData = obras[project.title.rendered as keyof typeof obras];
      if (projectData && typeof projectData === 'object') {
        const availableMonths = Object.keys(projectData).sort().reverse();
        if (availableMonths.length > 0) {
          setSelectedMonth(availableMonths[0]);
        }
      }
    }
  }, [project]);

  // Determinar el estado del proyecto
  const getProjectStatus = () => {
    if (!project?.estado_proyecto || project.estado_proyecto.length === 0) {
      return "En desarrollo";
    }
    
    const statusId = project.estado_proyecto[0];
    switch (statusId) {
      case 1: return "Planeación";
      case 2: return "Preventa";
      case 3: return "En venta";
      case 4: return "En construcción";
      case 5: return "Entregado";
      default: return "En desarrollo";
    }
  };

  const status = getProjectStatus();

  // Obtener la imagen destacada
  const featuredImage = project?.featured_media_url || 
    (project?.gallery_images && project.gallery_images.length > 0 ? project.gallery_images[0].url : null);

  // Preparar los elementos de detalles
  const detailsItems = [
    { label: "Estado", value: status },
    { label: "Ubicación", value: project?.meta?.ubicacion_exacta },
    { label: "Área construida", value: project?.meta?.area_construida },
    { label: "Área privada", value: project?.meta?.area_privada },
    { label: "Habitaciones", value: project?.meta?.habitaciones },
    { label: "Baños", value: project?.meta?.banos },
    { label: "Parqueaderos", value: project?.meta?.parqueaderos },
    { label: "Pisos", value: project?.meta?.niveles_pisos },
    { label: "Áreas comunes", value: project?.meta?.areas_comunes },
    { label: "Puntos de interés", value: project?.meta?.puntos_interes },
  ].filter((item) => item.value);

  // Determinar qué imágenes mostrar en el carrusel a pantalla completa
  const getImagesForFullScreen = () => {
    return currentGalleryType === 'avance' ? project.avance_obra : project.gallery_images;
  };

  return (
    <>
      {/* Carrusel a pantalla completa */}
      {isFullScreenOpen && (
        <FullScreenCarousel
          images={getImagesForFullScreen()}
          initialIndex={currentImageIndex}
          onClose={closeFullScreen}
        />
      )}
      
      <Section className="bg-primary text-primary-foreground min-h-[50vh] flex items-center relative">
        <div className="absolute inset-0 overflow-hidden ring-1 ring-gray-900/10">
          <svg
            aria-hidden="true"
            className="absolute inset-0 size-full stroke-primary [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] invert opacity-20"
          >
            <defs>
              <pattern
                x="100%"
                y={-1}
                id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M130 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect fill="white" width="100%" height="100%" strokeWidth={0} />
            <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
              <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
            </svg>
            <rect
              fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
        </div>
        <Container className="w-full flex-col space-y-4 md:space-y-6 lg:space-y-8 relative z-10 md:p-16 lg:p-36">
          <Link
            href="/proyectos"
            className="link-underline text-primary-foreground group opacity-70 transition-opacity duration-300 hover:opacity-100 pb-2 flex items-center"
          >
            <CgArrowLongLeft className="inline-block size-6 mr-3 transform transition-transform duration-300 translate-x-0 group-hover:-translate-x-3" />
            <span>Volver a proyectos</span>
          </Link>
          {project?.icon ? (
            <div className="relative w-full max-w-screen-sm h-48">
              <Image
                src={project?.icon}
                alt={project?.title?.rendered}
                fill
                className="object-contain object-left-bottom invert"
                unoptimized={true}
              />
            </div>
          ) : (
            <h1 className="text-3xl md:text-6xl lg:text-8xl font-light tracking-tight">
              {project?.title?.rendered}
            </h1>
          )}
          <p className="text-lg lg:text-2xl max-w-screen-sm opacity-60">
            {project.content?.rendered.replace(/<\/?p>/g, "")}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-block px-3 py-1 bg-primary-foreground/10 rounded-full text-sm">
              {status}
            </span>
            {project?.meta?.ubicacion_exacta && (
              <span className="inline-block px-3 py-1 bg-primary-foreground/10 rounded-full text-sm">
                {project?.meta?.ubicacion_exacta}
              </span>
            )}
          </div>
        </Container>
      </Section>

      <Section className="bg-background">
        <Container className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          <div className="md:col-span-2">
            <div className="aspect-video relative mb-8 overflow-hidden rounded-none">
              {featuredImage && (
                <Zoom>
                  <div className="aspect-video relative mb-8 overflow-hidden rounded-none w-full h-full">
                    <Image
                      src={featuredImage}
                      alt={project?.title?.rendered}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                </Zoom>
              )}
            </div>

            {project.gallery_images && project.gallery_images.length > 0 && (
              <div className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.gallery_images.map((image: any, index: number) => (
                    <div
                      key={`gallery-${image.id}-${index}`}
                      className="aspect-square rounded-none group bg-muted relative overflow-hidden"
                      onClick={() => openFullScreen(index, 'gallery')}
                    >
                      {image.url && (
                        <div
                          className="relative w-full h-full cursor-pointer"
                          style={{ height: "100%", aspectRatio: "1/1" }}
                        >
                          <Image
                            src={image.url}
                            alt={`${project?.title?.rendered} - Imagen ${
                              index + 1
                            }`}
                            fill
                            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            unoptimized={true}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-muted p-6 lg:p-10 rounded-none">
              <h2 className="text-2xl font-normal tracking-tight mb-6">
                Detalles del proyecto
              </h2>
              <dl className="space-y-4">
                {detailsItems.map((item, index) => (
                  <div
                    key={`detail-${index}`}
                    className="border-b border-foreground/10 pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-base">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {project?.meta?.tour_virtual && (
              <div className="bg-muted p-6 rounded-none">
                <h2 className="text-2xl font-light tracking-tight mb-4">
                  Tour Virtual
                </h2>
                <div className="aspect-video relative overflow-hidden rounded-none">
                  <iframe
                    src={project?.meta?.tour_virtual}
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {project?.meta?.video_recorrido && (
              <div className="bg-muted p-6 rounded-none">
                <h2 className="text-2xl font-light tracking-tight mb-4">
                  Video
                </h2>
                <div className="aspect-video relative overflow-hidden rounded-none">
                  <iframe
                    src={project?.meta?.video_recorrido}
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            <div className="bg-primary text-primary-foreground p-6 rounded-none">
              <h2 className="text-2xl font-light tracking-tight mb-4">
                Contáctanos
              </h2>
              <p className="mb-6">
                Estamos aquí para resolver todas tus dudas sobre{" "}
                {project?.title?.rendered}.
              </p>
              <Link
                href="/contacto"
                className="inline-block w-full text-center bg-primary-foreground text-primary px-6 py-3 rounded-none font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                Agenda una cita
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/*AVANCE DE OBRA*/}
      {project.estado_proyecto[0] == 4 && (
        <Section className="bg-gray-50 py-16">
          <Container>
            <div className="mb-8">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-6">
                Detalles de Avance: {project.title.rendered}
              </h2>
              
              {/* Selector de mes */}
              <Select 
                value={selectedMonth}
                onValueChange={(value) => setSelectedMonth(value)}
              >
                <SelectTrigger className="w-full md:w-[300px] mb-6">
                  <SelectValue placeholder="Selecciona un mes" />
                </SelectTrigger>
                <SelectContent>
                  {(() => {
                    const projectData = obras[project.title.rendered as keyof typeof obras];
                    if (projectData && typeof projectData === 'object') {
                      return Object.keys(projectData).sort().reverse().map((month) => (
                        <SelectItem key={month} value={month}>
                          {new Date(month + '-01').toLocaleDateString('es-ES', { 
                            year: 'numeric', 
                            month: 'long' 
                          })}
                        </SelectItem>
                      ));
                    }
                    return <SelectItem value="no-data">No hay datos disponibles</SelectItem>;
                  })()}
                </SelectContent>
              </Select>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Columna izquierda: Texto */}
                <div className="flex items-center justify-center">
                  <div className="prose prose-lg max-w-none">
                    {(() => {
                      const projectData = obras[project.title.rendered as keyof typeof obras];
                      const monthData = projectData && typeof projectData === 'object' && selectedMonth ? 
                        projectData[selectedMonth as keyof typeof projectData] : null;
                      
                      if (monthData && typeof monthData === 'object' && 'descripcion' in monthData) {
                        return (
                          <>
                            <h3 className="text-xl font-medium mb-4 flex items-center">
                              <span className="mr-2">Avance de {new Date(selectedMonth + '-01').toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</span>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Actualizado</span>
                            </h3>
                            <div className="space-y-4">
                              {(monthData as {descripcion: string}).descripcion.split('. ').map((parrafo: string, index: number) => (
                                parrafo.trim() && (
                                  <p key={index}>{parrafo.trim()}{parrafo.trim().endsWith('.') ? '' : '.'}</p>
                                )
                              ))}
                            </div>
                            <div className="mt-6 flex items-center space-x-2">
                              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                              <p className="text-sm font-medium">
                                Última actualización: <span className="text-primary">{formatDate((monthData as {fecha: string}).fecha)}</span>
                              </p>
                            </div>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <h3 className="text-xl font-medium mb-4 flex items-center">
                              <span className="mr-2">Descripción del Avance</span>
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Información General</span>
                            </h3>
                            <p>
                              El proyecto {project.title.rendered} se encuentra actualmente en fase de construcción.
                              Los avances más recientes incluyen:
                            </p>
                            <ul>
                              <li>Estructura principal completada al 75%</li>
                              <li>Instalaciones eléctricas en proceso</li>
                              <li>Acabados interiores iniciados en primeros niveles</li>
                            </ul>
                            <div className="mt-6 flex items-center space-x-2">
                              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                              <p className="text-sm font-medium">
                                Última actualización: <span className="text-primary">{formatDate(project.modified)}</span>
                              </p>
                            </div>
                             
                             {/* Galería de imágenes de WordPress */}
                          </>
                        );
                      }
                    })()}
                    
                    {/* Galería de imágenes de WordPress */}
                    {project.avance_obra && project.avance_obra.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-lg font-medium mb-4">Galería de Imágenes</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {project.avance_obra.slice(0, 6).map((image: any, index: number) => (
                            <div 
                              key={index} 
                              className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                              onClick={() => openLightbox(index)}
                            >
                              <Image
                                src={image.url || image}
                                alt={`Avance ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </div>
                          ))}
                          {project.avance_obra.length > 6 && (
                            <div className="relative aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm text-gray-600">+{project.avance_obra.length - 6} más</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-sm text-muted-foreground mt-4">
                      * La información mostrada es aproximada y puede variar según el avance real de la obra.
                    </p>
                  </div>
                </div>
                
                {/* Columna derecha: Videos de avance */}
                <div className="w-full">
                  {(() => {
                    const projectData = obras[project.title.rendered as keyof typeof obras];
                    const monthData = projectData && typeof projectData === 'object' && selectedMonth ? 
                      projectData[selectedMonth as keyof typeof projectData] : null;
                    const videos = monthData && typeof monthData === 'object' && 'videos' in monthData ? 
                      (monthData as {videos: any[]}).videos : [];
                    
                    if (videos && videos.length > 0) {
                      return (
                        <div className="space-y-4">
                          {/* Video player */}
                          <div className="relative w-full aspect-[3/4] bg-black rounded-lg overflow-hidden">
                            <video 
                              controls 
                              className="w-full h-full object-cover"
                              poster={project.featured_image_url || "https://pgaconstructores.co/wp-content/uploads/2024/08/TERRAZA-2.png"}
                            >
                              <source src={videos[0].url} type="video/mp4" />
                              <source src={videos[0].url} type="video/mov" />
                              Tu navegador no soporta el elemento de video.
                            </video>
                          </div>

                        </div>
                      );
                    } else {
                      return (
                        <div className="space-y-4">
                          <div className="bg-gray-100 rounded-lg p-8 text-center h-[400px] flex items-center justify-center">
                            <p className="text-gray-500">No hay contenido de avance disponible para este mes.</p>
                          </div>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
            
            {/* Lightbox Modal */}
            {lightboxOpen && project.avance_obra && project.avance_obra.length > 0 && (
              <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
                  {/* Imagen principal */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={project.avance_obra[lightboxImageIndex]?.url || project.avance_obra[lightboxImageIndex]}
                      alt={`Avance ${lightboxImageIndex + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Botón cerrar */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Navegación anterior */}
                  {project.avance_obra.length > 1 && (
                    <button
                      onClick={prevLightboxImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  
                  {/* Navegación siguiente */}
                  {project.avance_obra.length > 1 && (
                    <button
                      onClick={nextLightboxImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                  
                  {/* Contador de imágenes */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                    {lightboxImageIndex + 1} / {project.avance_obra.length}
                  </div>
                </div>
              </div>
            )}
          </Container>
        </Section>
      )}
      {/*FIN AVANCE DE OBRA*/}
      <Section className="bg-primary text-primary-foreground">
        <Container className="text-center py-16">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
            Encuentra tu espacio ideal
          </h2>
          <p className="text-lg md:text-xl max-w-screen-md mx-auto mb-10">
            Contáctanos para conocer nuestros proyectos exclusivos y ayudarte
            a encontrar tu espacio ideal, donde cada detalle refleja la
            calidad y el confort que mereces.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-primary-foreground text-primary px-8 py-4 rounded-none font-medium hover:bg-primary-foreground/90 transition-colors"
          >
            Agenda con un asesor
          </Link>
        </Container>
      </Section>
    </>
  );
}