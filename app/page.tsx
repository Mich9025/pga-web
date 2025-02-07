"use client";

// Craft Imports
import { Container, Section } from "@/components/craft";

// Next.js Imports
import Image from "next/image";

// Icons
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
import {
  default as Step1,
  default as Step4,
} from "@/public/images/steps/1.png";
import Step2 from "@/public/images/steps/2.png";
import Step3 from "@/public/images/steps/3.png";
import { useContext, useEffect } from "react";
import { NavContext } from "./context/NavContext";

// This page is using the craft.tsx component and design system
export default function Home() {
  const { setIsTransparent } = useContext(NavContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsTransparent(entry.isIntersecting),
      { threshold: 0 }
    );

    const banner = document.querySelector("#banner");
    if (banner) observer.observe(banner);

    return () => observer.disconnect();
  }, []);

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
      <SectionAcompanamiento />
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

const SectionAcompanamiento = () => {
  const slides = [
    {
      title: "Construcción",
      description:
        "Planificamos, coordinamos y ejecutamos todas las etapas de un proyecto inmobiliario.",
      imageUrl: "public/images/steps/1.png",
      image: Step1,
      href: "/inmobiliaria-360",
    },
    {
      title: "Administración PH",
      description:
        "Gestionamos y manejamos todo el proceso de inmobiliario, desde la contratación hasta la ejecución.",
      imageUrl: "public/images/steps/2.png",
      image: Step2,
      href: "/inmobiliaria-360",
    },
    {
      title: "Arriendos",
      description:
        "Conocemos nuestros arrendamientos y nuestro proceso de arrendamiento.",
      imageUrl: "public/images/steps/3.png",
      image: Step3,
      href: "/inmobiliaria-360",
    },
    {
      title: "Otros",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "public/images/steps/1.png",
      image: Step4,
      href: "/inmobiliaria-360",
    },
  ];
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
            {slides.map(({ title, description, href, image }) => (
              <CarouselItem
                key={`carousel-acompanamiento-item-${title}`}
                className="md:basis-1/2 lg:basis-1/3 !p-0 relative"
              >
                <div className="p-1">
                  <Card className="group relative bg-primary text-primary-foreground overflow-hidden lg:p-6">
                    <Image
                      src={image}
                      alt={title}
                      className="absolute inset-0 transform scale-100 group-hover:scale-110 group-hover:opacity-40 opacity-70 object-cover w-full h-full transition-all duration-150 hover:duration-[10s] ease-in-out"
                      width={470}
                      height={688}
                    />
                    <CardContent className="flex flex-col  aspect-[6/10] items-start justify-center p-6 relative z-10">
                      <h2 className="text-lg md:text-2xl font-semibold flex-none">
                        {title}
                      </h2>
                      <div className="flex grow flex-col items-center justify-center">
                        <p className="text-sm md:text-xl font-semibold transform translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 hover:duration-75 ease-in-out">
                          {description}
                        </p>
                      </div>
                      <a href={href} className="font-semibold flex-none">
                        Leer más
                      </a>
                    </CardContent>
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
      href: "/inmuebles?tags=locales-comerciales",
    },
    {
      title: "Apartamentos",
      imageUrl: "https://isarco.com.co/wp-content/uploads/apartamentos.jpg",
      href: "/inmuebles?tags=apartamentos",
    },
    {
      title: "Bodegas",
      imageUrl: "https://isarco.com.co/wp-content/uploads/minibodegas.jpg",
      href: "/inmuebles?tags=bodegas",
    },
    {
      title: "Oficinas",
      imageUrl: "https://isarco.com.co/wp-content/uploads/coworking-1.jpg",
      href: "/inmuebles?tags=oficinas",
    },
    {
      title: "Co-working",
      imageUrl: "https://isarco.com.co/wp-content/uploads/coworking-2.jpg",
      href: "/inmuebles?tags=oficinas",
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
                  <Card className="rounded-none border-secondary bg-slate-800 group relative bg-primary text-primary-foreground overflow-hidden lg:p-6">
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
