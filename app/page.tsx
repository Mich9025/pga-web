import { Container, Section } from "@/components/craft";

import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CgArrowLongRight } from "react-icons/cg";

export default async function Home() {
  const bgImages = [
    "https://pgaconstructores.co/wp-content/uploads/2023/10/unique_tempo_fachada.webp",
    "https://pgaconstructores.co/wp-content/uploads/2023/07/Captura-de-pantalla-2023-06-15-a-las-11.05.30-a.m.png",
    "https://pgaconstructores.co/wp-content/uploads/2023/07/Captura-de-pantalla-2023-06-15-a-las-11.06.08-a.m.jpg",
  ];

  const projects = [
    {
      id: "4ea1eb06-24b7-4228-b03c-bd3a6d512fa1",
      title: "Unique Me",
      location: "Cali. Colombia",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum, nulla in tincidunt tincidunt, nisi risus lacinia nisl, sit amet auctor nisl nisl euismod.",
      image:
        "https://pgaconstructores.co/wp-content/uploads/2024/08/Unique-Me-Room.png",
      logo: "https://pgaconstructores.co/wp-content/uploads/2024/08/Screenshot-2024-08-14-at-8.55.36%E2%80%AFAM.png",
    },
    {
      id: "4ea1eb06-24b7-4228-b03c-bd3a6d512fa2",
      title: "Unique Qbico",
      location: "Bogotá. Colombia",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum, nulla in tincidunt tincidunt, nisi risus lacinia nisl, sit amet auctor nisl nisl euismod.",
      image:
        "https://pgaconstructores.co/wp-content/uploads/2024/08/TERRAZA-2.png",
      logo: "https://pgaconstructores.co/wp-content/uploads/2024/08/Screenshot-2024-08-14-at-8.55.25%E2%80%AFAM.png",
    },
    {
      id: "4ea1eb06-24b7-4228-b03c-bd3a6d512fa3",
      title: "Unique Tempo",
      location: "Bogotá. Colombia",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum, nulla in tincidunt tincidunt, nisi risus lacinia nisl, sit amet auctor nisl nisl euismod.",
      image:
        "https://pgaconstructores.co/wp-content/uploads/2023/10/unique_tempo_apto_still.webp",
      logo: "https://pgaconstructores.co/wp-content/uploads/2023/10/tempo-1.svg",
    },
  ];

  return (
    <>
      <div id="hero-section" className="">
        <Banner images={bgImages}>
          <div className="flex-col space-y-4 md:space-y-6 lg:space-y-8 relative z-10 md:p-16 lg:p-36 max-w-screen-xl w-full">
            <h2 className="mt-2 text-5xl font-semibold tracking-tight text-white sm:text-7xl md:text-8xl">
              Langing power phrase goes here
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
          <h2 className="text-3xl md:text-6xl lg:text-8xl font-light tracking-tight">
            Positioning statement
          </h2>
          <p className="text-lg md:text-xl max-w-screen-md opacity-70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            elementum, nulla in tincidunt tincidunt, nisi risus lacinia nisl,
            sit amet auctor nisl nisl euismod.
          </p>
        </Container>
      </Section>
      <Section>
        <Container className="w-full flex-col space-y-4 md:space-y-6 lg:space-y-8 relative z-10 md:px-16 lg:px-36">
          <div className="max-w-screen-md ml-auto flex flex-col gap-6 md:gap-8 lg:gap-10">
            <h2 className="text-3xl md:text-6xl lg:text-8xl font-light tracking-tight">
              Proyectos
            </h2>
            <p className="text-lg md:text-xl opacity-70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              elementum, nulla in tincidunt tincidunt, nisi risus lacinia nisl,
              sit amet auctor nisl nisl euismod.
            </p>
          </div>
        </Container>
        <Container className="!pt-4">
          <div className="flex flex-col divide-y divide-foreground/10 grow">
            {projects.map(
              ({ id, title, location, image, description, logo }, i) => (
                <div
                  key={`proyecto-${id}`}
                  className="flex items-center gap-6 md:gap-12 lg:gap-16 py-6 sticky top-0 z-10 bg-background group"
                >
                  <div className="flex-shrink-0 aspect-[16/12] w-full md:w-1/2 lg:w-4/5 relative overflow-hidden">
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
                  <div className="flex-1 space-y-2 md:space-y-4 lg:space-y-8 w-full md:w-1/2 lg:w-1/5 text-sm md:text-base lg:text-lg">
                    <span className="text-sm md:text-sm lg:text-base font-base tracking-wide uppercase">
                      Category 0{i + 1}
                    </span>
                    <div className="min-h-40 w-full relative !-mt-1 !-mb-6 -z-10">
                      <Image
                        src={logo}
                        alt={title}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold tracking-tight">
                      {title}
                    </h3>
                    <p className="max-w-md opacity-60">{description}</p>
                    <Link
                      href="#"
                      className="link-underline text-primary group opacity-70 transition-opacity duration-300 hover:opacity-100 pb-2"
                    >
                      <span>Conoce más</span>
                      <CgArrowLongRight className="inline-block size-6 ml-3 transform transition-transform duration-300 -translate-x-3 group-hover:translate-x-0 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
          <Button
            variant="outline"
            size="xl"
            className="w-full hover:bg-primary hover:text-primary-foreground"
          >
            Ver más proyectos
          </Button>
        </Container>
      </Section>
      <Section className="">
        <Container className="flex lg:flex-row gap-6">
          <div className="border-r border-foreground/10 md:sticky top-0 z-10 mt-6 w-12">
            <h2 className="md:text-nowrap md:indent-3 md:rotate-90 transform tracking-tight sticky top-6 z-10 text-muted-foreground before:content-[''] before:bg-muted-foreground/50 before:w-4 before:h-px before:inline-block before:relative before:bottom-1 before:mr-3 before:rounded-full">
              Servicios
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-foreground/10 grow">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-6 md:gap-18 lg:gap-24 py-6 sticky top-0 z-10 bg-background group"
              >
                <div className="flex-shrink-0 aspect-[4/3] w-full max-w-screen-sm relative overflow-hidden">
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
                <div className="flex-1 space-y-2 md:space-y-4 lg:space-y-8 text-sm md:text-base lg:text-lg">
                  <span className="text-lg md:text-xl lg:text-2xl font-bold tracking-wide uppercase">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl md:text-4xl lg:text-8xl font-light tracking-tight">
                    Servicio {i + 1}
                  </h3>
                  <p className="max-w-md opacity-60">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse potenti.
                  </p>
                  <Link
                    href="#"
                    className="link-underline text-primary group opacity-70 transition-opacity duration-300 hover:opacity-100 pb-2"
                  >
                    <span>Leer más</span>
                    <CgArrowLongRight className="inline-block size-6 ml-3 transform transition-transform duration-300 -translate-x-3 group-hover:translate-x-0 opacity-0 group-hover:opacity-100" />
                  </Link>
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
          <h2 className="text-3xl md:text-8xl lg:text-9xl font-light tracking-tight">
            Call to Act
          </h2>
          <p className="text-lg md:text-xl max-w-screen-md pb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            elementum, nulla in tincidunt tincidunt, nisi risus lacinia nisl,
            sit amet auctor nisl nisl euismod.
          </p>
          <Button variant="outline" size="xl">
            Contacto
          </Button>
        </Container>
      </Section>
    </>
  );
}
