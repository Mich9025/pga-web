import { Container, Section } from "@/components/craft";
import Image from "next/image";
import { IoMdPin } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

import { MdOutlineLocationSearching } from "react-icons/md";

import { Banner } from "@/components/ui/banner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { getAllFromCustomPostType } from "@/lib/wordpress";
import { Inmo360 } from "@/lib/wordpress.d";
import Link from "next/link";
// This page is using the craft.tsx component and design system
export default async function Home() {
  const inmo = await getAllFromCustomPostType<Inmo360>("inmo-360");

  const bgImages = [
    "https://isarco.com.co/wp-content/uploads/BANNER-OFICINAS-EQUIPADAS-scaled.jpg",
    "https://isarco.com.co/wp-content/uploads/coworking-2.jpg",
    "https://isarco.com.co/wp-content/uploads/new-home-scaled.jpg",
  ];

  return (
    <>
      <div id="hero-section">
        <Banner images={bgImages}>
          <Container className="relative z-10">
            <h2 className="mt-2 text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl">
              Conoce nuestros proyectos
            </h2>
          </Container>
        </Banner>
      </div>
      <SectionInmobiliario />
      <SectionAcompanamiento inmo={inmo} />
      <SectionSolutions />
    </>
  );
}

const SectionInmobiliario = () => {
  return (
    <Section className="!py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start items-center">
        <div className="bg-primary text-secondary">
          <Container className="py-4 md:py-24 lg:py-48 flex flex-col gap-y-6 md:gap-y-20 lg:gap-y-28 max-w-md mx-auto">
            <h2 className="py-8 text-3xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem]">
              Arrienda o vende en 5 días
            </h2>
            <p className="mt-6 text-lg md:text-2xl lg:text-3xl">Leer más</p>
          </Container>
        </div>
        <div className="bg-background text-foreground h-full flex items-center lg:items-start">
          <Container className="py-4 md:py-24 lg:py-48 flex flex-col gap-y-6 max-w-md mx-auto">
            <h2 className="py-8 text-3xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem]">
              Encuentra el espacio ideal
            </h2>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <IoMdPin className="absolute left-4 top-2.5 mr-2 opacity-50 size-5" />
                <Input
                  type="text"
                  placeholder="Ingresa una ubicación"
                  className="pl-12 md:text-lg !rounded-full"
                />
              </div>
              <Button
                variant="outline"
                className="text-left justify-start md:text-lg !rounded-full"
              >
                <MdOutlineLocationSearching className="mr-2 opacity-50 size-5" />
                Usa mi ubicación actual
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
};

const SectionAcompanamiento = ({ inmo }: { inmo: Inmo360[] }) => {
  return (
    <Section className="bg-secondary text-primary">
      <Container className="flex flex-col gap-y-6 md:gap-y-8 lg:gap-y-10">
        <h2 className="py-8 text-3xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem]">
          Te acompañamos en cada paso de tu camino inmobiliario
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="!m-0">
            {inmo.map(({ id, title, content, slug, featured_image_url }) => (
              <CarouselItem
                key={`carousel-acompanamiento-item-${id}`}
                className="md:basis-1/2 lg:basis-1/3 !p-0 relative"
              >
                <div className="p-1">
                  <Card className="group relative bg-primary text-primary-foreground overflow-hidden lg:p-6 border-none hover:shadow-lg">
                    <Link href={`/inmobiliaria-360?s=${slug}`}>
                      <Image
                        src={String(featured_image_url)}
                        alt={title.rendered}
                        className="absolute inset-0 transform scale-100 group-hover:scale-110 group-hover:opacity-40 opacity-70 object-cover w-full h-full transition-all duration-150 hover:duration-[10s] ease-in-out"
                        width={470}
                        height={688}
                      />
                      <CardContent className="flex flex-col  aspect-[6/10] items-start justify-center p-6 relative z-10">
                        <h2 className="text-lg md:text-2xl font-semibold flex-none">
                          {title.rendered}
                        </h2>
                        <div className="flex grow flex-col items-center justify-center">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: content.rendered,
                            }}
                            className="text-sm md:text-xl font-semibold transform translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 hover:duration-75 ease-in-out"
                          />
                        </div>
                        <span className="font-semibold flex-none">
                          Leer más
                        </span>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>
    </Section>
  );
};

const SectionSolutions = () => {
  const slides = [
    {
      title: "Locales",
      imageUrl: "https://isarco.com.co/wp-content/uploads/locales.jpg",
      href: "/inmuebles?t=locales-comerciales",
    },
    {
      title: "Apartamentos",
      imageUrl: "https://isarco.com.co/wp-content/uploads/apartamentos.jpg",
      href: "/inmuebles?t=apartamentos",
    },
    {
      title: "Bodegas",
      imageUrl: "https://isarco.com.co/wp-content/uploads/minibodegas.jpg",
      href: "/inmuebles?t=bodegas",
    },
    {
      title: "Oficinas",
      imageUrl: "https://isarco.com.co/wp-content/uploads/coworking-1.jpg",
      href: "/inmuebles?t=oficinas",
    },
    {
      title: "Co-working",
      imageUrl: "https://isarco.com.co/wp-content/uploads/coworking-2.jpg",
      href: "/inmuebles?t=oficinas",
    },
  ];
  return (
    <Section className="text-primary">
      <Container className="flex flex-col gap-y-6 md:gap-y-8 lg:gap-y-10">
        <h2 className="py-8 text-3xl max-w-screen-md font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[4.75rem]">
          Soluciones Inmobiliarias 360
        </h2>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="!m-0">
            {slides.map(({ title, imageUrl, href }) => (
              <CarouselItem
                key={`carousel-soluciones-item-${title}`}
                className="group md:basis-1/2 lg:basis-1/4 group-hover:lg:basis-1/5 hover:lg:!basis-2/5 !p-0 transition-all duration-75 ease-in-out"
              >
                <a className="p-1" href={href}>
                  <Card className="rounded-none border-secondary group relative bg-primary text-primary-foreground overflow-hidden lg:p-6">
                    <Image
                      src={imageUrl}
                      alt={title}
                      className="absolute inset-0 group-hover:opacity-80 opacity-40 object-cover w-full h-full transition-all duration-150 hover:duration-75 ease-in-out"
                      width={750}
                      height={500}
                    />
                    <CardContent className="flex flex-col h-[65vh] gap-6 items-center justify-center p-6 relative z-10">
                      <span className="text-3xl font-semibold pt-24">
                        {title}
                      </span>
                      <div className="rounded-full p-4 bg-slate-800/50 opacity-0 group-hover:opacity-100 transition-all duration-150 group-hover:duration-75 ease-in-out">
                        <div className="rounded-full p-6 bg-slate-800/50">
                          <IoSearch className="size-8 text-secondary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>
    </Section>
  );
};
