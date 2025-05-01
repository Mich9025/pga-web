import { Container, Section } from "@/components/craft";

import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";
import { CgArrowLongRight } from "react-icons/cg";

export default async function Home() {
  const wpProjects = await getAllProjects();

  // top 3 projects
  const homeProjects = wpProjects.slice(0, 3);

  const bgImages = [
    "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/04/DSC1669_70_71-editada-scaled.jpg",
    "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/05/1.-FOTO-FACHADA-4_3-_-1080-x-1350px-scaled.jpg",
    "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/05/TEMPO-4_3-_-1080x1350px.jpg",
    "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/04/17-1-scaled.jpg",
  ];

  const heroSection = {
    mainText: "Transformando espacios, superando expectativas.",
    headline: "Tu espacio, tu refugio, tu vida.",
    subtext:
      "15 años edificando una oportunidad para crear un entorno único, funcional y lleno de innovación.",
    visualContent: {
      type: "Slideshow",
      description:
        "Imágenes de las zonas comunes de los proyectos recientes, ejemplo: Unique Tempo, Unique W, Unique Mine, Unique Park.",
    },
  };

  const intro = {
    content:
      "En PGA CONSTRUCTORES contamos con más de 15 años de experiencia creando espacios de alto nivel en los sectores más exclusivos de ciudades como Cali y Bogotá. Nuestra pasión por la arquitectura de calidad nos ha permitido desarrollar proyectos excepcionales que no solo cumplen con las más altas expectativas, sino que las superan, ofreciendo vistas espectaculares que transforman cada ventana en una obra de arte.",
    content_extra:
      "Nos especializamos en diseñar zonas comunes de lujo, perfectas para quienes buscan lo mejor para su calidad de vida. Desde elegantes áreas sociales hasta sofisticadas zonas de recreación, cada espacio está pensado para brindar el máximo confort y estilo. Sabemos que el hogar es más que un lugar, es un refugio. Por eso, cada uno de nuestros proyectos está diseñado para ofrecer ambientes familiares, ideales para compartir momentos especiales con amigos. En PGA CONSTRUCTORES, creemos que tu hogar debe ser un lugar al que siempre quieras regresar. Con nuestras propuestas arquitectónicas, no sólo ofrecemos un espacio físico, sino un estilo de vida. Porque sabemos que la calidad de vida comienza en casa, nos aseguramos de que cada detalle, cada rincón y cada ambiente sean perfectos para que disfrutes de un hogar único, cómodo y lleno de bienestar.",
    valueProposition:
      "Áreas diseñadas a la necesidad del cliente, Vistas inigualables, Cumplimiento en la entrega, respuesta de soporte familiar, zonas sociales exclusivas diseñadas especialmente para cada edificio, sin elementos que encuentres en el mercado.",
    services: [
      {
        headline: "Diseño Personalizado",
        image:
          "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/04/19-scaled.jpg",
        content:
          "Creamos espacios que reflejan su personalidad. Nuestro equipo de diseño trabaja con cada cliente para desarrollar ambientes adaptados a sus necesidades específicas como lo es la distribución de los espacios, queremos que su hogar sea una extensión auténtica de quién es usted.",
      },
      {
        headline: "Confort y Estilo",
        image:
          "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/04/FOTO-8.png",
        content:
          "Equilibramos funcionalidad con refinamiento estético, cada espacio está cuidadosamente creado para mejorar su experiencia diaria. Materiales premium, soluciones inteligentes y atención meticulosa a los detalles definen nuestro compromiso con su bienestar.<> Desde elegantes áreas sociales hasta sofisticadas zonas de recreación, cada espacio está pensado para brindar el máximo confort y estilo.",
      },
      // {
      //   headline: "Test",
      //   content:
      //     "Sabemos que el hogar es más que un lugar, es un refugio. Por eso, cada uno de nuestros proyectos está diseñado para ofrecer ambientes familiares, ideales para compartir momentos especiales con amigos.",
      // },
      // {
      //   headline: "Test",
      //   content:
      //     "En PGA CONSTRUCTORES, creemos que tu hogar debe ser un lugar al que siempre quieras regresar. Con nuestras propuestas arquitectónicas, no sólo ofrecemos un espacio físico, sino un estilo de vida.",
      // },
      {
        headline: "Experiencia",
        image:
          "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/04/portrait-of-an-engineer-designing-a-large-project-2025-03-09-12-32-31-utc.jpg",
        content:
          "Cumplimos rigurosamente nuestros plazos de entrega y ofrecemos soporte post-venta personalizado, respondiendo con la dedicación que merece tu inversión.",
        // "Porque sabemos que la calidad de vida comienza en casa, nos aseguramos de que cada detalle, cada rincón y cada ambiente sean perfectos para que disfrutes de un hogar único, cómodo y lleno de bienestar.",
      },
    ],
    cta: {
      title: "Encuentra tu espacio ideal",
      description:
        // "Porque sabemos que la calidad de vida comienza en casa, nos aseguramos de que cada detalle, cada rincón y cada ambiente sean perfectos para que disfrutes de un hogar único, cómodo y lleno de bienestar.",
        // "Diseñamos cada rincón pensando en tu bienestar y estilo de vida. Contáctanos hoy y descubre cómo hacemos realidad el hogar que siempre has soñado."
        "Contáctanos para conocer nuestros proyectos exclusivos y ayudarte a encontrar tu espacio ideal, donde cada detalle refleja la calidad y el confort que mereces.",
      buttons: [
        // {
        //   label: "Contacto",
        //   href: "/contacto",
        // },
        {
          label: "Agenda con un asesor",
          href: "/contacto",
        },
      ],
    },
  };

  const projectsSection = {
    title: "Proyectos",
    description:
      // "15 años edificando una oportunidad para crear un entorno único, funcional y lleno de innovación.",
      // "En PGA CONSTRUCTORES, creemos que tu hogar debe ser un lugar al que siempre quieras regresar. Con nuestras propuestas arquitectónicas, no sólo ofrecemos un espacio físico, sino un estilo de vida.",
      "En PGA CONSTRUCTORES, creemos que tu hogar debe ser un lugar al que siempre quieras regresar. Con nuestras propuestas arquitectónicas, no sólo ofrecemos un espacio físico, sino un estilo de vida.",
  };

  const servicesSection = {
    title: "Nuestra Visión",
    description:
      "Sabemos que el hogar es más que un lugar, es un refugio. Por eso, cada uno de nuestros proyectos está diseñado para ofrecer ambientes familiares, ideales para compartir momentos especiales con amigos.",
  };

  const projects = [
    {
      id: "4ea1eb06-24b7-4228-b03c-bd3a6d512fa3",
      title: "Unique Tempo",
      location: "Bogotá. Colombia",
      description:
        "Proyecto ubicado en una zona exclusiva de bogotá, en chapinero, cuenta con 8 pisos y apartamentos de grandes áreas y exclusivas zonas comunes.",
      status: "Construido - en ventas 2 aptos",
      image:
        "https://pgaconstructores.co/wp-content/uploads/2023/10/unique_tempo_apto_still.webp",
      logo: "https://pgaconstructores.co/wp-content/uploads/2023/10/tempo-1.svg",
      slug: "unique-tempo",
    },
    {
      id: "4ea1eb06-24b7-4228-b03c-bd3a6d512fa1",
      title: "Unique Me",
      location: "Cali. Colombia",
      description:
        "Edificio que quedará ubicado en el oeste de cali, frente a la librería nacional del oeste, contará con 13 pisos y 92 apartamentos de diferentes áreas que permiten encontrar el espacio ideal, con zonas sociales como piscinas, jacuzzis, teatrino, bar, senderos y juegos para niños.",
      status: "En venta",
      image:
        "https://pgaconstructores.co/wp-content/uploads/2024/08/Unique-Me-Room.png",
      logo: "https://pgaconstructores.co/wp-content/uploads/2024/08/Screenshot-2024-08-14-at-8.55.36%E2%80%AFAM.png",
      slug: "unique-me",
    },
    {
      id: "4ea1eb06-24b7-4228-b03c-bd3a6d512fa2",
      title: "Unique Qbico",
      location: "Bogotá. Colombia",
      description:
        "Unique Qbico estará ubicado en la zona de renovación urbana del 7 de agosto en Bogotá, apartamentos pequeños ideales con grandes zonas comunes que permitirán vivir con mucho confort.",
      status: "En construcción",
      image:
        "https://pgaconstructores.co/wp-content/uploads/2024/08/TERRAZA-2.png",
      logo: "https://pgaconstructores.co/wp-content/uploads/2024/08/Screenshot-2024-08-14-at-8.55.25%E2%80%AFAM.png",
      slug: "unique-qbico",
    },
  ];

  return (
    <>
      <div id="hero-section" className="relative -z-10">
        <Banner images={bgImages}>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-transparent to-transparent w-full h-1/2 z-10 select-none pointer-events-none"></div>
          <div className="flex-col space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8 relative z-10 px-4 sm:px-8 md:px-16 lg:px-36 max-w-screen-lg w-full mt-auto pointer-events-none select-none">
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              {heroSection.mainText}
            </h2>
          </div>
        </Banner>
      </div>
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
          <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-8xl font-light tracking-tight">
            {heroSection.headline}
          </h2>
          <p className="text-base sm:text-lg md:text-xl/8 max-w-screen-xl opacity-70 pt-2 sm:pt-4">
            {intro.content}
          </p>
        </Container>
      </Section>
      <Section className="bg-background">
        <Container className="w-full flex-col space-y-4 md:space-y-6 lg:space-y-8 relative z-10 md:px-16 lg:px-36">
          <div className="max-w-screen-md ml-auto flex flex-col gap-6 md:gap-8 lg:gap-10">
            <h2 className="text-3xl md:text-6xl lg:text-8xl font-light tracking-tight">
              {projectsSection.title}
            </h2>
            <p className="text-lg md:text-xl opacity-70">
              {projectsSection.description}
            </p>
          </div>
        </Container>
        <Container className="!pt-4">
          <div className="flex flex-col divide-y divide-foreground/10 grow">
            {homeProjects.map((project: any) => {
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
                project.featured_image_url 

              return (
                <div
                  key={`proyecto-${project.id}`}
                  className="flex md:flex-row flex-col items-center gap-6 md:gap-12 lg:gap-16 py-6 sticky top-0 z-10 bg-background group"
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
          <Button
            variant="outline"
            size="xl"
            className="w-full hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link href="/proyectos">Ver más proyectos</Link>
          </Button>
        </Container>
      </Section>
      <Section className="bg-background">
        <Container className="w-full flex-col space-y-4 md:space-y-6 lg:space-y-8 relative z-10 md:px-16 lg:px-36">
          <div className="max-w-screen-md mr-auto flex flex-col gap-6 md:gap-8 lg:gap-10">
            <h2 className="text-3xl md:text-6xl lg:text-8xl font-light tracking-tight">
              {servicesSection.title}
            </h2>
            <p className="text-lg md:text-xl opacity-70">
              {servicesSection.description}
            </p>
          </div>
        </Container>
        <Container className="flex lg:flex-row gap-6">
          <div className="hidden md:block border-r border-foreground/10 md:sticky top-0 z-10 mt-6 w-12">
            <h2 className="hidden md:block md:text-nowrap md:indent-3 md:rotate-90 transform tracking-tight sticky top-6 z-10 text-muted-foreground before:content-[''] before:bg-muted-foreground/50 before:w-4 before:h-px before:inline-block before:relative before:bottom-1 before:mr-3 before:rounded-full">
              Servicios
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-foreground/10 grow">
            {intro.services.map(({ headline, content, image }, i) => (
              <div
                key={`service-${i}-${headline}`}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-18 lg:gap-24 py-6 sticky top-0 z-10 bg-background group"
              >
                <div className="flex-shrink-0 aspect-[4/3] w-full md:w-1/2 lg:w-2/5 relative overflow-hidden">
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
                </div>
                <div className="flex-1 space-y-2 md:space-y-4 lg:space-y-8 text-sm md:text-base lg:text-lg pt-4 md:pt-0">
                  <span className="text-lg md:text-xl lg:text-2xl font-bold tracking-wide uppercase">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl md:text-4xl lg:text-8xl font-light tracking-tight max-w-md">
                    {headline}
                  </h3>
                  <p className="max-w-xl opacity-60">{content}</p>
                  {/* <Link
                    href="#"
                    className="link-underline text-primary group opacity-70 transition-opacity duration-300 hover:opacity-100 pb-2"
                  >
                    <span>Leer más</span>
                    <CgArrowLongRight className="inline-block size-6 ml-3 transform transition-transform duration-300 -translate-x-3 group-hover:translate-x-0 opacity-0 group-hover:opacity-100" />
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
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
          <h2 className="text-3xl md:text-7xl lg:text-9xl/[0.8] font-light tracking-tight max-w-screen-lg mb-6">
            {intro.cta.title}
          </h2>
          <p className="text-lg md:text-xl max-w-screen-md pb-4">
            {intro.cta.description}
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            {intro.cta.buttons.map(({ label, href }) => (
              <Button
                key={href}
                variant="outline"
                size="xl"
                className="w-full md:w-auto"
                asChild
              >
                <Link href={href}>{label}</Link>
              </Button>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
