
"use client"
import { Container, Section } from "@/components/craft";
import { generateMetadataFromContent } from "@/lib/metadata";
import { getProjectBySlug } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CgArrowLongLeft } from "react-icons/cg";
import { Maximize2 } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ImageCarousel from "./components/ImageCarousel";
import FullScreenCarousel from "./components/FullScreenCarousel";
import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PageParams {
  params: {
    slug: string;
    categorySlug?: string;
    projectSlug?: string;
  };
}

// export async function generateMetadata({ params }: any) {
//   try {
//     const slug = (await params).slug;
//     const project = await getProjectBySlug(slug);

//     if (!project) {
//       return {
//         title: "Proyecto no encontrado",
//         description:
//           "El proyecto que estás buscando no existe o ha sido removido.",
//       };
//     }

//     return generateMetadataFromContent({
//       title: project?.title?.rendered,
//       description: project?.excerpt?.rendered.replace(/<\/?p>/g, ""),
//       path: `/proyectos/${slug}`,
//       keywords: [
//         "proyectos",
//         "PGA",
//         "diseño",
//         "arquitectura",
//         "inmobiliaria",
//         project?.title?.rendered,
//       ],
//     });
//   } catch (error) {
//     return {
//       title: "Error",
//       description: "Hubo un error al cargar el proyecto.",
//     };
//   }
// }

export default function ProjectPage({ params }: any) {
  const { slug } = params;
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState<string>("");
  const [statusClass, setStatusClass] = useState<string>("");
  const [currentGalleryType, setCurrentGalleryType] = useState<'main' | 'avance'>('main');
  
// Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  // Función para abrir el carrusel a pantalla completa para la galería principal
  const openFullScreen = (index: number) => {
    setCurrentImageIndex(index);
    setCurrentGalleryType('main');
    setIsFullScreenOpen(true);
  };
  
  // Función para abrir el carrusel a pantalla completa para avance de obra
  const openAvanceFullScreen = (index: number) => {
    setCurrentImageIndex(index);
    setCurrentGalleryType('avance');
    setIsFullScreenOpen(true);
  };
  
  // Función para cerrar el carrusel a pantalla completa
  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
  };
  
  // Cargar los datos del proyecto
  React.useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await getProjectBySlug(slug);
        if (!project) {
          notFound();
        }
        setProjectData(project);
        
        // Get status text from the estado_proyecto taxonomy
        let statusText = "";
        let statusClass = "";
        
        if (project.class_list?.estado_proyecto?.length > 0) {
          statusText = project.class_list.estado_proyecto[0].name;
          
          // Set status class based on status text
          switch (statusText.toLowerCase()) {
            case "en construcción":
              statusClass = "bg-yellow-500 text-white";
              break;
            case "terminado":
              statusClass = "bg-green-500 text-white";
              break;
            case "próximamente":
              statusClass = "bg-blue-500 text-white";
              break;
            default:
              statusClass = "bg-gray-500 text-white";
          }
        }
        
        setStatusText(statusText);
        setStatusClass(statusClass);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
         // Ahora que todo está listo, verifica si hay hash en la URL
      setTimeout(() => {
        if (typeof window !== "undefined") {
          const hash = window.location.hash;
          if (hash) {
            const target = document.querySelector(hash);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      }, 200);
      }
    };
    
    fetchProject();
  }, [slug]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  if (!projectData) {
    notFound();
  }
  
  const project = projectData;
  let status = "";
  if (project.estado_proyecto?.includes(3)) {
    status =
      project?.meta?.disponibilidad === "0 unidades"
        ? "Construido"
        : `Construido`;
  } else if (project.estado_proyecto?.includes(4)) {
    status = "En construcción";
  } else if (project.estado_proyecto?.includes(5)) {
    status = "En venta";
  }

  // Get featured image
  const featuredImage =
    project.featured_image_url ||
    (project.gallery_images && project.gallery_images.length > 0
      ? project.gallery_images[0].url
      : "");

  // Format project details
  const detailsItems = [
    { label: "Ubicación", value: project?.meta?.ubicacion_exacta },
    { label: "Entrega", value: project?.meta?.fecha_entrega },
    { label: "Constructora", value: project?.meta?.desarrollador },
    { label: "Diseño", value: project?.meta?.arquitecto },
    { label: "Estado", value: status },
    { label: "Disponibilidad", value: project?.meta?.disponibilidad },
    { label: "Total unidades", value: project?.meta?.total_unidades },
    { label: "Pisos", value: project?.meta?.niveles_pisos },
    { label: "Áreas comunes", value: project?.meta?.areas_comunes },
    { label: "Puntos de interés", value: project?.meta?.puntos_interes },
  ].filter((item) => item.value);

    // Determinar qué imágenes mostrar en el carrusel a pantalla completa
  const getImagesForFullScreen = () => {
    // Usar el tipo de galería actual para determinar qué imágenes mostrar
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
        
        {/* <pre className="text-xs p-4 bg-black text-white fixed top-0 right-0 h-90 z-50 max-w-screen-sm">
          {JSON.stringify(project, null, 2)}
        </pre> */}
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
                  unoptimized = {true}
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
                        unoptimized = {true}
                      />
                    </div>
                  </Zoom>
                )}
              </div>

              <div className="prose prose-lg max-w-none">
                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: project?.content?.rendered,
                  }}
                /> */}
              </div>

              {project.gallery_images && project.gallery_images.length > 0 && (
                <div className="mt-10">                                                     
                  
                  {/* Miniaturas de la galería */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.gallery_images.map((image: any, index: number) => (
                      <div
                        key={`gallery-${image.id}-${index}`}
                        className="aspect-square rounded-none group bg-muted relative overflow-hidden"
                        onClick={() => openFullScreen(index)}
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
                              unoptimized = {true}
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
              {/* seccion avances de obra por proyecto */}
                    {/* {project.estado_proyecto[0] == 4 && (
                    <div id="avance" className="mt-24" >
                    <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-6">
                      Avance de Obra
                    </h2>
                    
                    <div className="w-full mb-8">
                      <ImageCarousel 
                        images={project.avance_obra} 
                        filterByDate={true} 
                        onImageClick={(index) => openAvanceFullScreen(index)}
                      />
                    </div>  
                    </div>
                    )} */}

                    {/* Sección de detalles del proyecto seleccionado */}      
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
{project.estado_proyecto[0] == 4 && (
        <Section className="bg-gray-50 py-16">
          <Container>
            <div className="mb-8">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-6">
                Detalles de Avance: {project.title.rendered}
              </h2>
              
              {/* Selector de contenido */}
              <Select 
                defaultValue="general" 
                onValueChange={(value) => console.log(`Seleccionado: ${value}`)}
              >
                <SelectTrigger className="w-full md:w-[300px] mb-6">
                  <SelectValue placeholder="Selecciona una vista" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Vista General</SelectItem>
                  <SelectItem value="mensual">Avance Mensual</SelectItem>                  
                </SelectContent>
              </Select>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Columna izquierda: Texto */}
                <div className="flex items-center justify-center">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-xl font-medium mb-4">Descripción del Avance</h3>
                    <p>
                      El proyecto {project.title.rendered} se encuentra actualmente en fase de construcción.
                      Los avances más recientes incluyen:
                    </p>
                    <ul>
                      <li>Estructura principal completada al 75%</li>
                      <li>Instalaciones eléctricas en proceso</li>
                      <li>Acabados interiores iniciados en primeros niveles</li>
                    </ul>
                    <p>
                      Última actualización: {formatDate(project.modified)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      * La información mostrada es aproximada y puede variar según el avance real de la obra.
                    </p>
                  </div>
                </div>
                
                {/* Columna derecha: Carrusel de imágenes */}
                <div className="w-full">
                  {project.avance_obra && project.avance_obra.length > 0 ? (
                    <ImageCarousel 
                      images={project.avance_obra} 
                      filterByDate={true}
                    />
                  ) : (
                    <div className="bg-gray-100 rounded-lg p-8 text-center h-[400px] flex items-center justify-center">
                      <p className="text-gray-500">No hay imágenes de avance disponibles para este proyecto.</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 text-center">
                {/* <button 
                  onClick={() => setShowProjectDetails(false)}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Volver a la lista de proyectos
                </button> */}
              </div>
            </div>
          </Container>
        </Section>
      )}
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
