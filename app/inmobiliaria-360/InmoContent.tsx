"use client";

import { Container, Section } from "@/components/craft";
import { Metadata } from "next";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import Marquee from "@/components/ui/marquee";
import { Client, Inmo360 } from "@/lib/wordpress.d";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrUserAdmin } from "react-icons/gr";
import { LiaFileSignatureSolid } from "react-icons/lia";
import { LuConstruction, LuSearch } from "react-icons/lu";
import { MdOutlineBuild } from "react-icons/md";
import { PiBuildingOffice, PiCraneTower } from "react-icons/pi";

export const metadata: Metadata = {
  title: "All Pages",
  description: "Browse all pages of our blog posts",
  alternates: {
    canonical: "/posts/pages",
  },
};
const services = [
  {
    title: "Consultoría",
    image: "/consultoria.jpg",
    description: "Asesoría especializada en proyectos inmobiliarios",
  },
  {
    title: "Tecnología",
    image: "/tecnologia.jpg",
    description: "Soluciones digitales para el sector inmobiliario",
  },
  {
    title: "Eficiencia",
    image: "/eficiencia.jpg",
    description: "Optimización de procesos y recursos",
  },
];

const iconMap: Record<string, React.ElementType> = {
  "administracion-de-propiedades-horizontales": GrUserAdmin,
  "consigna-tu-inmueble": LiaFileSignatureSolid,
  "encuentra-tu-inmueble": LuSearch,
  "adecuacion-y-remodelacion": MdOutlineBuild,
  "construccion-de-proyectos": PiCraneTower,
  "operaciones-inmolbiliarias": PiBuildingOffice,
  "estructuracion-de-proyectos": LuConstruction,
};

export default function InmoContent({
  clients,
  immo,
}: {
  clients: Client[];
  immo: Inmo360[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get("s");

  const [selected, setSelected] = useState<Inmo360>(
    immo.find((item) => item.slug === selectedSlug) || immo[0]
  );

  useEffect(() => {
    setSelected(immo.find((item) => item.slug === selectedSlug) || immo[0]);
  }, [selectedSlug]);

  return (
    <>
      {/* Steps Section */}
      <Section className="bg-primary text-primary-foreground -my-12 md:-my-20 lg:-my-28">
        <Container>
          <div className="relative">
            {/* Steps Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/20" />

            <div className="flex flex-wrap justify-center gap-8 relative z-10">
              {immo.map((item: Inmo360) => {
                const Icon = iconMap[item.slug] || LuSearch;

                return (
                  <Link
                    key={`item-${item.id}`}
                    className="flex flex-col items-center text-center w-[calc(25%-2rem)]"
                    shallow
                    href={`?s=${item.slug}#inmo-content`}
                    onClick={(e) => {
                      e.preventDefault();
                      router.replace(`?s=${item.slug}#inmo-content`);
                    }}
                  >
                    <div className="size-32 rounded-full bg-primary-foreground ring-8 ring-primary ring-inset border-4 border-primary-foreground flex items-center justify-center text-2xl mb-4 text-primary">
                      <Icon className="size-16" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-medium">
                      {item.title.rendered}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section className="mt-12 relative">
        <div className="absolute bg-primary inset-x-0 top-0 h-[40vh] pointer-events-none select-none"></div>
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="p-4 md:p-20 lg:p-32 bg-secondary md:!pr-0">
              <div className="relative aspect-square ">
                <Image
                  src={String(selected.featured_image_url)}
                  alt="Agente Inmobiliario"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative flex items-center">
              <div className="absolute bg-secondary inset-y-0 left-0 hidden md:block w-20 lg:w-32 pointer-events-none select-none"></div>
              <div className="bg-white p-8 md:p-16 lg:p-24 relative z-10 border-l-0 border-8 border-secondary w-full">
                <h2 className="text-2xl font-bold mb-6 md:text-4xl md:mb-8 lg:mb-12">
                  Formulario
                </h2>
                <form className="space-y-4 md:space-y-8 lg:space-y-10">
                  <Input placeholder="Nombre" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Teléfono" type="tel" />
                  <Input placeholder="Asunto" />
                  <Button className="w-full">Enviar</Button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="inmo-content">
        <Container>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-2">
            <div className="relative min-h-[40vh]">
              <Image
                src={String(selected.featured_image_url)}
                alt={String(selected.title.rendered)}
                width={1200}
                height={800}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 md:col-span-2 py-6 md:py-12 md:px-12 lg:px-20">
              <h2 className="text-3xl lg:text-5xl tracking-tight text-primary font-bold mb-12">
                {selected.title.rendered}
              </h2>
              <div
                itemProp="description"
                dangerouslySetInnerHTML={{ __html: selected.content.rendered }}
                className="prose prose-xl"
              />
            </div>
          </div>
        </Container>
      </Section>

      <OtherServices inmo={immo} />

      {/* Clients Section */}
      <Section className="bg-background">
        <Container>
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-12">
            Nuestros Clientes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {/* Add client logos here */}
          </div>
          <div className="relative flex h-full max-h-96 min-h-28 w-full min-w-72 items-center justify-center overflow-hidden -mx-8">
            <div
              className="bg-gradient-to-r absolute left-0 inset-y-0 from-white via-white to-transparent w-24 z-10 pointer-events-none select-none"
              aria-hidden
            ></div>
            <div
              className="bg-gradient-to-l absolute right-0 inset-y-0 from-white via-white to-transparent w-24 z-10 pointer-events-none select-none"
              aria-hidden
            ></div>
            <Marquee pauseOnHover className=" [--duration:40s] gap-4 p-4">
              {clients.map((client: any) => (
                <div
                  key={`client-${client.id}`}
                  className="aspect-[3/2] relative grayscale hover:grayscale-0 transition-all min-w-52 flex items-center justify-center"
                >
                  <Image
                    src={String(client.featured_image_url)}
                    alt={String(client.title.rendered)}
                    fill
                    className="object-contain invert p-6"
                  />
                  <span className="sr-only">
                    {String(client.title.rendered)}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        </Container>
      </Section>
    </>
  );
}

const OtherServices = ({ inmo }: { inmo: Inmo360[] }) => {
  const router = useRouter();
  return (
    <Section className="!pt-0">
      <Container className="!pt-0 flex flex-col gap-y-6 md:gap-y-8 lg:gap-y-10">
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
                    <Link
                      shallow
                      href={`?s=${slug}#inmo-content`}
                      onClick={(e) => {
                        e.preventDefault();
                        router.replace(`?s=${slug}#inmo-content`);
                      }}
                    >
                      <Image
                        src={String(featured_image_url)}
                        alt={title.rendered}
                        className="absolute inset-0 transform scale-100 group-hover:scale-110 group-hover:opacity-40 opacity-70 object-cover w-full h-full transition-all duration-150 hover:duration-[10s] ease-in-out"
                        width={470}
                        height={688}
                      />
                      <CardContent className="flex flex-col  aspect-[4/5] items-start justify-center p-6 relative z-10 text-center">
                        <h2 className="text-lg md:text-2xl font-semibold flex-none">
                          {title.rendered}
                        </h2>
                        {/* <div className="flex grow flex-col items-center justify-center">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: content.rendered,
                            }}
                            className="text-sm md:text-xl font-semibold transform translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 hover:duration-75 ease-in-out"
                          />
                        </div> */}
                        {/* <span className="font-semibold flex-none">
                          Leer más
                        </span> */}
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
