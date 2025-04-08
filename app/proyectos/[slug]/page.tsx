import { Container, Section } from "@/components/craft";
import { generateMetadataFromContent } from "@/lib/metadata";
import { getProjectBySlug } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CgArrowLongLeft } from "react-icons/cg";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface PageParams {
  params: {
    slug: string;
    categorySlug?: string;
    projectSlug?: string;
  };
}

export async function generateMetadata({ params }: PageParams) {
  try {
    const slug = (await params).slug;
    const project = await getProjectBySlug(slug);

    if (!project) {
      return {
        title: "Proyecto no encontrado",
        description:
          "El proyecto que estás buscando no existe o ha sido removido.",
      };
    }

    return generateMetadataFromContent({
      title: project?.title?.rendered,
      description: project?.excerpt?.rendered.replace(/<\/?p>/g, ""),
      path: `/proyectos/${slug}`,
      keywords: [
        "proyectos",
        "PGA",
        "diseño",
        "arquitectura",
        "inmobiliaria",
        project?.title?.rendered,
      ],
    });
  } catch (error) {
    return {
      title: "Error",
      description: "Hubo un error al cargar el proyecto.",
    };
  }
}

export default async function projectPage({ params }: PageParams) {
  try {
    const slug = (await params).slug;
    const project = await getProjectBySlug(slug);

    if (!project) {
      notFound();
    }

    // Get status text from the estado_proyecto taxonomy
    let status = "";
    if (project.estado_proyecto?.includes(3)) {
      status =
        project?.meta?.disponibilidad === "0 unidades"
          ? "Construido"
          : `Construido - en ventas ${project?.meta?.disponibilidad}`;
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
      { label: "Desarrollador", value: project?.meta?.desarrollador },
      { label: "Arquitecto", value: project?.meta?.arquitecto },
      { label: "Estado", value: status },
      { label: "Disponibilidad", value: project?.meta?.disponibilidad },
      { label: "Total unidades", value: project?.meta?.total_unidades },
      { label: "Pisos", value: project?.meta?.niveles_pisos },
      { label: "Áreas comunes", value: project?.meta?.areas_comunes },
      { label: "Puntos de interés", value: project?.meta?.puntos_interes },
    ].filter((item) => item.value);

    return (
      <>
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
                  <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-6">
                    Galería
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.gallery_images.map((image: any, index: number) => (
                      <div
                        key={`gallery-${image.id}-${index}`}
                        className="aspect-square rounded-none group bg-muted"
                      >
                        {image.url && (
                          <Zoom>
                            <div
                              className="relative w-full h-full"
                              style={{ height: "100%", aspectRatio: "1/1" }}
                            >
                              <Image
                                src={image.url}
                                alt={`${project?.title?.rendered} - Imagen ${
                                  index + 1
                                }`}
                                fill
                                className="object-cover transition-transform duration-300 ease-in-out"
                              />
                            </div>
                          </Zoom>
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
  } catch (error) {
    console.error("Error in projectPage:", error);
    notFound();
  }
}
