import { Container, Section } from "@/components/craft";

import Image from "next/image";
import Link from "next/link";
import { CgArrowLongRight } from "react-icons/cg";

import { generateMetadataFromContent } from "@/lib/metadata";
import { getAllProjects } from "@/lib/wordpress";

export const metadata = generateMetadataFromContent({
  title: "Proyectos",
  description: "Proyectos de PGA",
  path: "/proyectos",
  keywords: ["proyectos", "PGA", "diseño", "arquitectura", "inmobiliaria"],
});

export default async function Page() {
  const wpProjects = await getAllProjects();

  const projectsSection = {
    title: "Proyectos",
    description:
      // "15 años edificando una oportunidad para crear un entorno único, funcional y lleno de innovación.",
      // "En PGA CONSTRUCTORES, creemos que tu hogar debe ser un lugar al que siempre quieras regresar. Con nuestras propuestas arquitectónicas, no sólo ofrecemos un espacio físico, sino un estilo de vida.",
      "En PGA CONSTRUCTORES, creemos que tu hogar debe ser un lugar al que siempre quieras regresar. Con nuestras propuestas arquitectónicas, no sólo ofrecemos un espacio físico, sino un estilo de vida.",
  };

  // const servicesSection = {
  //   title: "Nuestra Visión",
  //   description:
  //     "Sabemos que el hogar es más que un lugar, es un refugio. Por eso, cada uno de nuestros proyectos está diseñado para ofrecer ambientes familiares, ideales para compartir momentos especiales con amigos.",
  // };

  // const projects = [
  //   {
  //     id: "4ea1eb06-24b7-4228-b03c-bd3a6d512fa3",
  //     slug: "unique-tempo",
  //     title: "Unique Tempo",
  //     location: "Bogotá. Colombia",
  //     description:
  //       "Proyecto ubicado en una zona exclusiva de bogotá, en chapinero, cuenta con 8 pisos y apartamentos de grandes áreas y exclusivas zonas comunes.",
  //     status: "Construido - en ventas 2 aptos",
  //     image:
  //       "https://pgaconstructores.co/wp-content/uploads/2023/10/unique_tempo_apto_still.webp",
  //     logo: "https://pgaconstructores.co/wp-content/uploads/2023/10/tempo-1.svg",
  //   },
  //   {
  //     id: "4ea1eb06-24b7-4228-b03c-bd3a6d512fa1",
  //     slug: "unique-me",
  //     title: "Unique Me",
  //     location: "Cali. Colombia",
  //     description:
  //       "Edificio que quedará ubicado en el oeste de cali, frente a la librería nacional del oeste, contará con 13 pisos y 92 apartamentos de diferentes áreas que permiten encontrar el espacio ideal, con zonas sociales como piscinas, jacuzzis, teatrino, bar, senderos y juegos para niños.",
  //     status: "En venta",
  //     image:
  //       "https://pgaconstructores.co/wp-content/uploads/2024/08/Unique-Me-Room.png",
  //     logo: "https://pgaconstructores.co/wp-content/uploads/2024/08/Screenshot-2024-08-14-at-8.55.36%E2%80%AFAM.png",
  //   },
  //   {
  //     id: "4ea1eb06-24b7-4228-b03c-bd3a6d512fa2",
  //     slug: "unique-qbico",
  //     title: "Unique Qbico",
  //     location: "Bogotá. Colombia",
  //     description:
  //       "Unique Qbico estará ubicado en la zona de renovación urbana del 7 de agosto en Bogotá, apartamentos pequeños ideales con grandes zonas comunes que permitirán vivir con mucho confort.",
  //     status: "En construcción",
  //     image:
  //       "https://pgaconstructores.co/wp-content/uploads/2024/08/TERRAZA-2.png",
  //     logo: "https://pgaconstructores.co/wp-content/uploads/2024/08/Screenshot-2024-08-14-at-8.55.25%E2%80%AFAM.png",
  //   },
  // ];

  return (
    <>
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
        {/* <pre className="text-xs">{JSON.stringify(wpProjects, null, 2)}</pre> */}
        <Container className="w-full flex-col space-y-4 md:space-y-6 lg:space-y-8 relative z-10 md:p-16 md:pb-8 lg:p-36 lg:pb-16">
          <h2 className="text-3xl md:text-6xl lg:text-8xl font-light tracking-tight">
            {projectsSection.title}
          </h2>
          <p className="text-lg md:text-xl/8 max-w-screen-xl opacity-70 py-4">
            {projectsSection.description}
          </p>
        </Container>
      </Section>
      <Section>
        <Container className="!pt-4">
          <div className="flex flex-col divide-y divide-foreground/10 grow">
            {wpProjects.map((project: any) => {
              // Get status text from the estado_proyecto taxonomy
              let status = "";
              if (project.estado_proyecto?.includes(3)) {
                status =
                  project.meta.disponibilidad === "0 unidades"
                    ? "Construido"
                    : `Construido - en ventas ${project.meta.disponibilidad}`;
              } else if (project.estado_proyecto?.includes(4)) {
                status = "En construcción";
              } else if (project.estado_proyecto?.includes(5)) {
                status = "En venta";
              }

              // Get featured image
              const image =
                project.featured_image_url ||
                // project.gallery_images?.[0]?.url ||
                "https://pgaconstructores.co/wp-content/uploads/2024/08/TERRAZA-2.png";
              // project.gallery_images && project.gallery_images.length > 0
              //   ? project.gallery_images[0].url
              //   : "";

              return (
                <div
                  key={`proyecto-${project.id}`}
                  className="flex items-center gap-6 md:gap-12 lg:gap-16 py-6 sticky top-0 z-10 bg-background group"
                >
                  <Link
                    className="flex-shrink-0 aspect-[16/12] w-full md:w-1/2 lg:w-4/5 relative overflow-hidden"
                    href={`/proyectos/${project.slug}`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-300 ease-in-out grayscale opacity-50 group-hover:opacity-0"
                    />
                  </Link>
                  <div className="flex-1 space-y-2 md:space-y-4 lg:space-y-6 w-full md:w-1/2 lg:w-1/5 text-sm md:text-base lg:text-lg pb-10 lg:pb-20">
                    {project.icon ? (
                      <div className="max-w-64 min-h-40 w-full relative -z-10">
                        <Image
                          src={project.icon}
                          alt={project.title.rendered}
                          fill
                          className="object-contain object-left-bottom"
                        />
                      </div>
                    ) : (
                      <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold tracking-tight">
                        {project.title.rendered}
                      </h3>
                    )}
                    <p className="text-xs/6 font-semibold tracking-wide uppercase opacity-60">
                      {status}
                    </p>
                    {/* <h1>{project.featured_image_url}</h1> */}
                    {/* <pre className="text-xs">
                      {JSON.stringify(project, null, 2)}
                      </pre> */}
                    <p className="max-w-md text-sm opacity-60">
                      {project.content?.rendered.replace(/<\/?p>/g, "")}
                    </p>
                    <Link
                      href={`/proyectos/${project.slug}`}
                      className="link-underline text-sm text-primary group opacity-70 transition-opacity duration-300 hover:opacity-100 pb-2"
                    >
                      <span>Conoce más</span>
                      <CgArrowLongRight className="inline-block size-6 ml-3 transform transition-transform duration-300 -translate-x-3 group-hover:translate-x-0 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
