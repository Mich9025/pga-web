// Craft Imports
import { Container, Prose, Section } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Next.js Imports
import Link from "next/link";

// Icons
import { NextJsIcon } from "@/components/icons/nextjs";
import { WordPressIcon } from "@/components/icons/wordpress";
import { Banner } from "@/components/ui/banner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Diamond, File, Folder, Pen, Tag, User } from "lucide-react";

// This page is using the craft.tsx component and design system
export default function Home() {
  const bgImages = [
    "https://isarco.com.co/wp-content/uploads/BANNER-OFICINAS-EQUIPADAS-scaled.jpg",
    "https://isarco.com.co/wp-content/uploads/coworking-2.jpg",
    "https://isarco.com.co/wp-content/uploads/new-home-scaled.jpg",
  ];
  return (
    <>
      <Banner images={bgImages}>
        <Container className="relative z-10">
          <h2 className="mt-2 text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl">
            Conoce nuestros proyectos
          </h2>
        </Container>
      </Banner>
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
          <div className="bg-background text-foreground h-full flex items-center justify-center">
            <Container className="py-4 md:py-16 max-w-md mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Conoce nuestros proyectos
              </h2>
            </Container>
          </div>
        </div>
      </Section>
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
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 !p-0"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-[6/10] items-center justify-center p-6">
                        <span className="text-3xl font-semibold">
                          {index + 1}
                        </span>
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
      <Section>
        <Container>
          <ToDelete />
        </Container>
      </Section>
    </>
  );
}

// This is just some example TSX
const ToDelete = () => {
  return (
    <>
      <main className="space-y-6">
        <Prose>
          <h1>
            <Balancer>
              Hola Isarco! Headless WordPress built with the Next.js
            </Balancer>
          </h1>

          <p>
            This is <a href="https://github.com/9d8dev/next-wp">next-wp</a>,
            created as a way to build WordPress sites with Next.js at rapid
            speed. This starter is designed with{" "}
            <a href="https://ui.shadcn.com">shadcn/ui</a>,{" "}
            <a href="https://craft-ds.com">craft-ds</a>, and Tailwind CSS. Use{" "}
            <a href="https://components.work">brijr/components</a> to build your
            site with prebuilt components. The data fetching and typesafety is
            handled in <code>lib/wordpress.ts</code> and{" "}
            <code>lib/wordpress.d.ts</code>.
          </p>
        </Prose>

        <div className="flex justify-between items-center gap-4">
          {/* Vercel Clone Starter */}
          <div className="flex items-center gap-3">
            <a
              className="h-auto block"
              href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F9d8dev%2Fnext-wp&env=WORDPRESS_URL,WORDPRESS_HOSTNAME&envDescription=Add%20WordPress%20URL%20with%20Rest%20API%20enabled%20(ie.%20https%3A%2F%2Fwp.example.com)%20abd%20the%20hostname%20for%20Image%20rendering%20in%20Next%20JS%20(ie.%20wp.example.com)&project-name=next-wp&repository-name=next-wp&demo-title=Next%20JS%20and%20WordPress%20Starter&demo-url=https%3A%2F%2Fwp.9d8.dev"
            >
              {/* eslint-disable-next-line */}
              <img
                className="not-prose my-4"
                src="https://vercel.com/button"
                alt="Deploy with Vercel"
                width={105}
                height={32.62}
              />
            </a>
            <p className="!text-sm sr-only sm:not-sr-only text-muted-foreground">
              Deploy with Vercel in seconds.
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <WordPressIcon className="text-foreground" width={32} height={32} />
            <NextJsIcon className="text-foreground" width={32} height={32} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Link
            className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
            href="/posts"
          >
            <Pen size={32} />
            <span>
              Posts{" "}
              <span className="block text-sm text-muted-foreground">
                All posts from your WordPress
              </span>
            </span>
          </Link>
          <Link
            className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
            href="/pages"
          >
            <File size={32} />
            <span>
              Pages{" "}
              <span className="block text-sm text-muted-foreground">
                Custom pages from your WordPress
              </span>
            </span>
          </Link>
          <Link
            className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
            href="/posts/authors"
          >
            <User size={32} />
            <span>
              Authors{" "}
              <span className="block text-sm text-muted-foreground">
                List of the authors from your WordPress
              </span>
            </span>
          </Link>
          <Link
            className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
            href="/posts/tags"
          >
            <Tag size={32} />
            <span>
              Tags{" "}
              <span className="block text-sm text-muted-foreground">
                Content by tags from your WordPress
              </span>
            </span>
          </Link>
          <Link
            className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
            href="/posts/categories"
          >
            <Diamond size={32} />
            <span>
              Categories{" "}
              <span className="block text-sm text-muted-foreground">
                Categories from your WordPress
              </span>
            </span>
          </Link>
          <a
            className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
            href="https://github.com/9d8dev/next-wp/blob/main/README.md"
          >
            <Folder size={32} />
            <span>
              Documentation{" "}
              <span className="block text-sm text-muted-foreground">
                How to use `next-wp`
              </span>
            </span>
          </a>
        </div>
      </main>
    </>
  );
};
