import { Container, Section } from "@/components/craft";
import { generateMetadataFromContent } from "@/lib/metadata";
import { getAllProjects } from "@/lib/wordpress";
import { PiArmchair, PiBuildings, PiCompassTool, PiPark } from "react-icons/pi";

import Image from "next/image";
import Link from "next/link";

export const metadata = generateMetadataFromContent({
  title: "Nosotros",
  description: "Nosotros de PGA",
  path: "/proyectos",
  keywords: ["proyectos", "PGA", "diseño", "arquitectura", "inmobiliaria"],
});

export default async function Page() {
  const projects = await getAllProjects();

  const title = "Nosotros";
  const subtitle =
    "No es solo una constructora; somos un aliado en el proceso de materializar los sueños de nuestros clientes.";
  const summary =
    "Con 15 años de trayectoria, PGA CONSTRUCTORES se distingue por crear relaciones de confianza. No solo vendemos apartamentos; ofrecemos una experiencia transformadora que impacta positivamente la vida de las personas. Creamos espacios que van más allá de lo funcional, convirtiéndo nuestros proyectos en la mejor opción de inversión.";
  const heading =
    // "En PGA CONSTRUCTORES somos más que una constructora; somos aliados en la materialización de los sueños de nuestros clientes.";
    // "Más que una constructora; somos aliados en la materialización de los sueños de nuestros clientes.";
    "Nuestro enfoque centrado en el cliente nos diferencia en el mercado.";
  const subheading =
    "Acompañamos personalmente cada etapa del proceso, desde la selección hasta el servicio posventa, respaldando cada decisión con nuestra experiencia y compromiso.";

  const keys = [
    {
      title: "Ubicaciones privilegiadas",
      icon: <PiPark className="size-12" aria-hidden />,
    },
    {
      title: "Diseño de vanguardia",
      icon: <PiCompassTool className="size-12" aria-hidden />,
    },
    {
      title: "Materiales innovadores",
      icon: <PiBuildings className="size-12" aria-hidden />,
    },
    {
      title: "Confort del cliente",
      icon: <PiArmchair className="size-12" aria-hidden />,
    },
  ];

  // const intro = [
  //   {
  //     title: "Trayectoria",
  //     content:
  //       "Con 15 años de trayectoria, PGA CONSTRUCTORES se distingue por crear relaciones de confianza con nuestros clientes. No solo vendemos apartamentos; ofrecemos una experiencia transformadora que impacta positivamente la vida de las personas.",
  //   },
  //   {
  //     title: "Enfoque",
  //     content:
  //       "Nuestro enfoque centrado en el cliente nos diferencia en el mercado. Acompañamos personalmente cada etapa del proceso, desde la selección hasta el servicio posventa, respaldando cada decisión con nuestra experiencia y compromiso.",
  //   },
  //   {
  //     title: "Visión",
  //     content:
  //       "La lealtad de nuestros clientes, quienes regresan y nos recomiendan, confirma la efectividad de nuestra filosofía. Creamos espacios que van más allá de lo funcional—son entornos donde las familias construyen recuerdos y futuros.",
  //   },
  // ];

  // const rows = [
  //   {
  //     title: "Title",
  //     content:
  //       "PGA CONSTRUCTORES es una empresa constructora que se distingue por la cercanía y confianza que hemos cultivado con nuestros clientes a lo largo de los 15 años que llevamos estado en el mercado. Más que simplemente ser un negocio, nuestra misión es ofrecer una experiencia única en la compra de un apartamento, que no solo se vea como una inversión económica, sino como una decisión que impacta positivamente en la vida de las personas. Sabemos que la compra de un hogar es una de las decisiones más importantes de la vida, por eso nos esforzamos en que cada cliente se sienta acompañado y seguro en todo momento.",
  //   },
  //   {
  //     title: "Title",
  //     content:
  //       "Cada proyecto que iniciamos es una oportunidad para reafirmar nuestro compromiso con la calidad, la transparencia y el servicio excepcional. A lo largo de los años, nuestros antiguos clientes continúan confiando en nosotros, recomendándonos a sus amigos y familiares, y repitiendo la experiencia de compra en nuestros nuevos desarrollos. Esto es una prueba clara de que nuestro enfoque no solo satisface, sino que supera las expectativas de quienes nos eligen.",
  //   },
  //   {
  //     title: "Title",
  //     content:
  //       "Lo que realmente nos diferencia de otras constructoras del país es nuestro enfoque genuinamente centrado en el cliente. Entendemos que detrás de cada transacción hay personas con sueños y aspiraciones, y por ello nos aseguramos de estar a su lado en cada paso del proceso. Desde el primer contacto hasta la entrega final, y la etapa de posventas ofrecemos una atención personalizada, resolviendo dudas, orientando en la toma de decisiones y garantizando que cada cliente sienta que está haciendo una elección respaldada por nuestra experiencia y compromiso.",
  //   },
  //   {
  //     title: "Title",
  //     content:
  //       "Nos enorgullece decir que no solo construimos viviendas, sino que construimos relaciones a largo plazo basadas en la confianza y el respeto. Cada proyecto que emprendemos está pensado para mejorar la calidad de vida de nuestros clientes, creando espacios no solo funcionales, sino también confortables y acogedores, en los que cada familia pueda construir recuerdos y un futuro lleno de posibilidades.",
  //   },
  // ];
  return (
    <>
      <Section className="bg-primary text-primary-foreground min-h-screen flex items-center relative">
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
        <Container className="w-full flex flex-col space-y-4 md:space-y-6 lg:space-y-8 relative z-10 md:p-16 md:pb-8 lg:p-36 lg:pb-16 gap-12">
          <div className=" pb-4 grow">
            <h2 className="text-3xl md:text-6xl lg:text-8xl font-light tracking-tight">
              {title}
            </h2>
            <h3 className="text-xl md:text-4xl/tight max-w-screen-lg opacity-70 py-4">
              {subtitle}
            </h3>
            <p className="text-lg md:text-xl/8 max-w-screen-md opacity-70 pt-4">
              {summary}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:flex md:gap-12">
            {keys.map(({ title, icon }, i) => (
              <div
                key={`key-${i}`}
                className="flex items-center justify-start gap-6 group"
              >
                {icon}
                <h3 className="text-xs md:text-sm font-bold tracking-widest uppercase">
                  {title}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="">
        <Container className="w-full flex flex-col space-y-4 md:space-y-6 lg:space-y-8 relative z-10 md:p-16 md:pb-8 lg:p-36 lg:py-16">
          <h3 className="text-xl md:text-4xl/tight lg:text-6xl/none max-w-screen-lg opacity-70 py-4">
            {heading}
          </h3>
          <p className="text-lg md:text-xl/8 max-w-screen-md opacity-70">
            {subheading}
          </p>
        </Container>
        <Container className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:p-16 md:pb-8 lg:px-36 lg:pb-16">
          {projects.map(
            (project: any) =>
              project.icon && (
                <Link
                  key={`proyecto-${project.id}`}
                  href={`/proyectos/${project.slug}`}
                  className="group flex items-center justify-center border boreder-foreground/5 h-52 p-6 px-8 opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out"
                >
                  <div className="relative w-full h-full flex items-center justify-center scale-100 group-hover:scale-105 transition-transform duration-300 ease-in-out">
                    <Image
                      src={project.icon}
                      alt={project.title.rendered}
                      fill
                      className="object-contain object-center"
                      unoptimized = {true}
                    />
                  </div>
                </Link>
              )
          )}
        </Container>
        {/* 
        <Container className="flex lg:flex-row gap-6 lg:px-36">
          <div className="flex flex-col md:grid grid-cols-3 gap-4 md:gap-8 lg:gap-24 pb-4">
            {intro.map((text, i) => (
              <div key={`intro-${i}`} className="flex flex-col gap-8">
                <h3 className="text-xl md:text-3xl lg:text-4xl font-light tracking-tight max-w-md">
                  {text.title}
                </h3>
                <p className="max-w-xl opacity-60">{text.content}</p>
              </div>
            ))}
          </div>
        </Container>
                  */}
      </Section>
      {/* 
      <hr />
      <Section className="">
        <Container className="flex lg:flex-row gap-6">
          <div className="flex flex-col grow">
            {rows.map(({ title, content }, i) => (
              <div
                key={`service-${i}-${title}`}
                className={cn(
                  "flex items-center gap-6 md:gap-18 lg:gap-24 py-3 z-10 bg-background group",
                  i % 2 === 0 && "flex-row-reverse"
                )}
              >
                <div className="flex-shrink-0 aspect-video w-full max-w-screen-lg relative overflow-hidden">
                  <Image
                    src="https://pgaconstructores.co/wp-content/uploads/2023/07/Captura-de-pantalla-2023-06-15-a-las-11.05.57-a.m.jpg"
                    alt=""
                    fill
                    className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                  <Image
                    src="https://pgaconstructores.co/wp-content/uploads/2023/07/Captura-de-pantalla-2023-06-15-a-las-11.05.57-a.m.jpg"
                    alt=""
                    fill
                    className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-300 ease-in-out grayscale opacity-50 group-hover:opacity-0"
                  />
                </div>
                <div
                  className={cn(
                    "flex-1 space-y-2 md:space-y-4 lg:space-y-8 text-sm md:text-base lg:text-lg",
                    i % 2 === 0 && "lg:pl-20"
                  )}
                >
                  {/* <span className="text-lg md:text-xl lg:text-2xl font-bold tracking-wide uppercase">
                    0{i + 1}
                  </span> /}
                  <h3 className="text-xl md:text-4xl lg:text-8xl font-light tracking-tight max-w-md">
                    {title}
                  </h3>
                  <p className="max-w-xl opacity-60">{content}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      */}
    </>
  );
}
