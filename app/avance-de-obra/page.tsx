"use client";

import { Container, Section } from "@/components/craft";
import { getAllProjects } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ImageCarousel from "../proyectos/[slug]/components/ImageCarousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AvanceDeObraPage() {
  const [proyectosEnConstruccion, setProyectosEnConstruccion] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  const obras = {
    "Unique Qbico": "A la fecha, hemos finalizado con éxito la cimentación profunda del proyecto, la cual incluyó la ejecución de pantallas perimetrales, barretes, pilotes temporales y definitivos, así como la fase de pilotaje. Actualmente, nos encontramos en proceso de demolición de la placa de concreto existente, lo que permitirá dar inicio a la construcción de las vigas puntales y vigas andén. Esta etapa es fundamental para habilitar el inicio de la excavación de los dos sótanos, marcando un nuevo hito en el desarrollo estructural del proyecto. Seguimos avanzando con precisión y compromiso, cumpliendo cada fase según lo planificado.",
    "Unique Me": "",    
  }
  
  // Cargar proyectos al montar el componente
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const allProjects = await getAllProjects();
        
        console.log('🔍 Total de proyectos obtenidos:', allProjects.length);
        console.log('📊 Todos los proyectos:', allProjects);
        
        // Analizar los estados de los proyectos
        allProjects.forEach((project: any, index: number) => {
          console.log(`Proyecto ${index + 1}: ${project.title?.rendered}`);
          console.log('  - estado_proyecto:', project.estado_proyecto);
          console.log('  - tipo de estado_proyecto:', typeof project.estado_proyecto);
          console.log('  - es array:', Array.isArray(project.estado_proyecto));
          if (Array.isArray(project.estado_proyecto)) {
            console.log('  - primer elemento:', project.estado_proyecto[0]);
            console.log('  - tipo del primer elemento:', typeof project.estado_proyecto[0]);
          }
        });
        
        // Filtrar proyectos en construcción
        // Primero verificar si existe el campo estado_proyecto, si no, usar todos los proyectos
        const filteredProjects = allProjects.filter((project: any) => {
          // Si no existe estado_proyecto, considerar todos los proyectos como en construcción para debugging
          if (!project.estado_proyecto) {
            console.log(`Proyecto "${project.title?.rendered}" - No tiene campo estado_proyecto, incluyendo para debug`);
            return true; // Temporalmente incluir todos para debugging
          }
          
          const isInConstruction = Array.isArray(project.estado_proyecto) && 
            project.estado_proyecto[0] == 4;
          
          console.log(`Proyecto "${project.title?.rendered}" en construcción:`, isInConstruction);
          return isInConstruction;
        });
        
        console.log('🏗️ Proyectos en construcción encontrados:', filteredProjects.length);
        console.log('📋 Proyectos filtrados:', filteredProjects);
        
        setProyectosEnConstruccion(filteredProjects);
        
        // Si hay proyectos, seleccionar el primero por defecto
        if (filteredProjects.length > 0) {
          setSelectedProject(filteredProjects[0]);
        }
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // Función para manejar el clic en un proyecto
  const handleProjectClick = (project: any) => {
    // Ejecutar diagnóstico completo
    diagnosticarAvanceObra(project);
    
    // Validar y normalizar los datos de avance_obra
    if (project.avance_obra) {
      if (typeof project.avance_obra === 'string') {
        try {
          project.avance_obra = JSON.parse(project.avance_obra);
          console.log('avance_obra parseado desde string:', project.avance_obra);
        } catch (e) {
          console.error('Error parseando avance_obra:', e);
          project.avance_obra = [];
        }
      }
      
      // Asegurar que sea un array
      if (!Array.isArray(project.avance_obra)) {
        console.warn('avance_obra no es un array, convirtiendo...');
        project.avance_obra = project.avance_obra ? [project.avance_obra] : [];
      }
    } else {
      project.avance_obra = [];
    }
    
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Función para diagnosticar la estructura de datos de avance_obra
  const diagnosticarAvanceObra = (project: any) => {
    console.group(`🔍 Diagnóstico de avance_obra para: ${project.title?.rendered || 'Proyecto sin título'}`);
    console.log('📊 Datos completos del proyecto:', project);
    console.log('🏗️ Campo avance_obra:', project.avance_obra);
    console.log('📝 Tipo:', typeof project.avance_obra);
    console.log('📋 Es array:', Array.isArray(project.avance_obra));
    console.log('📏 Longitud:', project.avance_obra?.length);
    
    if (project.avance_obra) {
      console.log('🔍 Primeros 3 elementos:', project.avance_obra.slice(0, 3));
      
      // Verificar otros campos relacionados con imágenes
      console.log('🖼️ Otros campos de imágenes:');
      console.log('  - gallery_images:', project.gallery_images);
      console.log('  - featured_image_url:', project.featured_image_url);
      console.log('  - acf:', project.acf);
    }
    
    console.groupEnd();
  };

  return (
    <>
      <Section className="bg-primary text-primary-foreground min-h-[40vh] flex items-center relative">
        <div className="absolute inset-0 overflow-hidden ring-1 ring-gray-900/10">
          <svg
            aria-hidden="true"
            className="absolute inset-0 size-full stroke-primary [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] invert opacity-20"
          >
            <defs>
              <pattern
                x="100%"
                y={-1}
                id="avance-obra-pattern"
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
              fill="url(#avance-obra-pattern)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
        </div>
        <Container className="w-full flex-col space-y-6 relative z-10 p-6 md:p-16 md:pb-8 lg:p-36 lg:pb-16">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tight">
            Avance de Obra
          </h2>
          <p className="text-base/relaxed md:text-xl/8 max-w-screen-xl opacity-70">
            Conoce el progreso de nuestros proyectos en construcción y mantente al día con los avances.
          </p>
        </Container>
      </Section>
      
      <Section>
        <Container className="!pt-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-2xl font-light">Cargando proyectos...</h3>
              <p className="text-sm text-muted-foreground mt-2">Obteniendo información de proyectos en construcción</p>
            </div>
          ) : proyectosEnConstruccion.length === 0 ? (
             <div className="text-center py-12">
               <h3 className="text-2xl font-light">No hay proyectos en construcción en este momento.</h3>
               <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left max-w-2xl mx-auto">
                 <p className="text-sm font-medium mb-2">Información de Debug:</p>
                 <p className="text-xs text-muted-foreground">Estado de loading: {loading.toString()}</p>
                 <p className="text-xs text-muted-foreground">Proyectos filtrados: {proyectosEnConstruccion.length}</p>
                 <p className="text-xs text-muted-foreground mt-2">Revisa la consola del navegador para más detalles sobre los datos recibidos de la API.</p>
               </div>
             </div>
           ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {proyectosEnConstruccion.map((project: any) => {
                // Obtener la imagen destacada o usar una por defecto
                const featuredImage = project.featured_image_url || 
                  (project.gallery_images && project.gallery_images.length > 0 ? 
                    project.gallery_images[0].url : 
                    "https://pgaconstructores.co/wp-content/uploads/2024/08/TERRAZA-2.png");
                
                // Obtener la fecha de última actualización
                const formattedDate = formatDate(project.modified);
                
                return (
                  <div 
                    onClick={() => handleProjectClick(project)}
                    key={`proyecto-construccion-${project.id}`}
                    className="group flex flex-col h-full overflow-hidden bg-background border border-muted rounded-md transition-all duration-300 hover:shadow-md cursor-pointer"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {/* Imagen principal */}
                      <Image
                        src={featuredImage}
                        alt={project.title.rendered}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Overlay con el icono */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        {project.icon && (
                          <div className="relative w-2/5 h-2/5">
                            <Image
                              src={project.icon}
                              alt={project.title.rendered}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Información del proyecto */}
                    <div className="p-3 flex flex-col flex-grow">
                      <h3 className="text-lg font-medium mb-1">{project.title.rendered}</h3>
                      <div className="mt-auto pt-2 flex justify-between items-center text-xs text-muted-foreground">
                        <span>Actualizado: {formattedDate}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          En construcción
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </Section>
      {/* Sección de detalles del proyecto seleccionado */}
      {showProjectDetails && selectedProject && (
        <Section className="bg-gray-50 py-16">
          <Container>
            <div className="mb-8">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-6">
                Detalles de Avance: {selectedProject.title.rendered}
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
                    {obras[selectedProject.title.rendered as keyof typeof obras] ? (
                      <>
                        <h3 className="text-xl font-medium mb-4 flex items-center">
                          <span className="mr-2">Descripción del Avance</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Actualizado</span>
                        </h3>
                        <div className="space-y-4">
                          {obras[selectedProject.title.rendered as keyof typeof obras].split('. ').map((parrafo, index) => (
                            parrafo.trim() && (
                              <p key={index}>{parrafo.trim()}{parrafo.trim().endsWith('.') ? '' : '.'}</p>
                            )
                          ))}
                        </div>
                        <div className="mt-6 flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                          <p className="text-sm font-medium">
                            Última actualización: <span className="text-primary">{formatDate(selectedProject.modified)}</span>
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl font-medium mb-4 flex items-center">
                          <span className="mr-2">Descripción del Avance</span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Información General</span>
                        </h3>
                        <p>
                          El proyecto {selectedProject.title.rendered} se encuentra actualmente en fase de construcción.
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
                            Última actualización: <span className="text-primary">{formatDate(selectedProject.modified)}</span>
                          </p>
                        </div>
                      </>
                    )}
                    <p className="text-sm text-muted-foreground mt-4">
                      * La información mostrada es aproximada y puede variar según el avance real de la obra.
                    </p>
                  </div>
                </div>
                
                {/* Columna derecha: Carrusel de imágenes */}
                <div className="w-full">
                  {(() => {
                    console.log('selectedProject.avance_obra:', selectedProject.avance_obra);
                    console.log('Tipo de avance_obra:', typeof selectedProject.avance_obra);
                    console.log('Es array:', Array.isArray(selectedProject.avance_obra));
                    
                    if (selectedProject.avance_obra && selectedProject.avance_obra.length > 0) {
                       const mappedImages = selectedProject.avance_obra
                         .map((image: any, index: number) => {
                           console.log('Imagen original:', image);
                           
                           // Determinar la URL de la imagen
                           let imageUrl = '';
                           if (typeof image === 'string') {
                             imageUrl = image;
                           } else if (image && typeof image === 'object') {
                             imageUrl = image.url || image.source_url || image.guid?.rendered || '';
                           }
                           
                           // Validar que la URL sea válida
                           if (!imageUrl || (!imageUrl.startsWith('http') && !imageUrl.startsWith('data:'))) {
                             console.warn(`URL de imagen inválida en índice ${index}:`, imageUrl);
                             return null;
                           }
                           
                           const mappedImage = {
                             id: image.id || index,
                             url: imageUrl,
                             width: image.width || 800,
                             height: image.height || 600
                           };
                           console.log('Imagen mapeada:', mappedImage);
                           return mappedImage;
                         })
                         .filter(Boolean); // Filtrar imágenes nulas
                      
                      console.log('Imágenes finales para el carrusel:', mappedImages);
                       
                       if (mappedImages.length === 0) {
                         return (
                           <div className="bg-gray-100 rounded-lg p-8 text-center h-[400px] flex items-center justify-center">
                             <div className="space-y-2">
                               <p className="text-gray-500">Las imágenes de avance no están disponibles en este momento.</p>
                               <p className="text-xs text-gray-400">
                                 Debug: Se encontraron {selectedProject.avance_obra.length} elementos, pero ninguno tenía URLs válidas
                               </p>
                             </div>
                           </div>
                         );
                       }
                       
                       return (
                         <ImageCarousel 
                           images={mappedImages}
                           filterByDate={true}
                         />
                       );
                    } else {
                      return (
                        <div className="bg-gray-100 rounded-lg p-8 text-center h-[400px] flex items-center justify-center">
                          <div className="space-y-2">
                            <p className="text-gray-500">No hay imágenes de avance disponibles para este proyecto.</p>
                            <p className="text-xs text-gray-400">
                              Debug: avance_obra = {JSON.stringify(selectedProject.avance_obra)}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
              
              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={() => setShowProjectDetails(false)}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Volver a la lista de proyectos
                </button>
                <Link 
                  href={`/proyectos/${selectedProject.slug}`}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Ir a la página del proyecto
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}