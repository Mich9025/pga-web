import { Container, Section } from "@/components/craft";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";

import { Banner } from "@/components/ui/banner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { getAllFromCustomPostType } from "@/lib/wordpress";
import { Inmo360 } from "@/lib/wordpress.d";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImmoCard } from "./inmobiliaria-360/ImmoCard";
import LandingSearchSection from "./inmuebles/LandingSearchSection";
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
    <Section className="!py-0 bg-primary">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start items-center">
        <div className="bg-primary text-secondary">
          <Container className="py-4 md:py-24 lg:py-48 flex flex-col gap-y-6 md:gap-y-20 lg:gap-y-28 max-w-md mx-auto">
            <h2 className="py-8 text-3xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem]">
              Arrienda o vende
            </h2>
            <Link
              href={`inmobiliaria-360?s=consigna-tu-inmueble#inmo-360`}
              className="group flex items-center gap-2 mt-6 text-lg md:text-2xl lg:text-3xl hover:opacity-100 opacity-80 transition-all duration-150 ease-in-out"
            >
              <span>Leer más</span>
              <ArrowRight
                className="size-8 opacity-0 group-hover:opacity-100 transform -translate-x-3 group-hover:translate-x-0 transition-all duration-150 ease-in-out"
                strokeWidth={1}
              />
            </Link>
          </Container>
        </div>
        <div className="bg-background text-foreground h-full flex items-center lg:items-start">
          <LandingSearchSection />
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
          Te acompañamos en cada paso de tu proyecto inmobiliario
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="!m-0">
            {inmo.map((item) => (
              <CarouselItem
                key={`carousel-acompanamiento-item-${item.id}`}
                className="md:basis-1/2 lg:basis-1/3 !p-0 relative"
              >
                <div className="p-1">
                  <ImmoCard inmo={item} />
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
