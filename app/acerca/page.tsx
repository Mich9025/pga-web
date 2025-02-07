import { Container, Section } from "@/components/craft";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllPages } from "@/lib/wordpress";
import { PlayCircle } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

const timelineEvents = [
  {
    year: 1985,
    image: "/path-to-image.jpg",
    description: "Inicio de operaciones",
  },
  { year: 1986, image: "/path-to-image.jpg", description: "Primer proyecto" },
  { year: 1987, image: "/path-to-image.jpg", description: "Expansión" },
  { year: 1988, image: "/path-to-image.jpg", description: "Nuevas oficinas" },
  { year: 1989, image: "/path-to-image.jpg", description: "Crecimiento" },
];

export const metadata: Metadata = {
  title: "All Pages",
  description: "Browse all pages of our blog posts",
  alternates: {
    canonical: "/posts/pages",
  },
};

export default async function Page() {
  const pages = await getAllPages();

  return (
    <>
      {/* Hero Section */}
      <Section
        className="bg-primary text-secondary min-h-[70vh] flex items-center"
        id="hero-section"
      >
        <Container className="py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium">
              Nosotros
            </h1>
          </div>
        </Container>
      </Section>

      {/* History Section */}
      <Section className="bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-medium mb-8">Nuestra Historia</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Después de haberle sido fiel durante casi 30 años a la profesión
                como Gerente del Departamento de Crédito Constructor, Carmen y
                Presidente de la Constructora G&H, don Gabriel había
                experimentado plenamente las necesidades, problemas y
                limitaciones que tenían los proyectos de construcción...
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section className="bg-secondary">
        <Container>
          <h2 className="text-2xl font-medium mb-12">
            Nuestros primeros 5 años
            <span className="block text-xl font-normal mt-2">1985 - 1989</span>
          </h2>

          <Carousel className="w-full">
            <CarouselContent>
              {timelineEvents.map((event) => (
                <CarouselItem
                  key={event.year}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="border-none bg-transparent">
                    <CardContent className="p-1">
                      <div className="relative aspect-square rounded-full overflow-hidden mb-4">
                        <Image
                          src={event.image}
                          alt={`${event.year} - ${event.description}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">
                          {event.year}
                        </h3>
                        <p className="text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Container>
      </Section>

      {/* Video Section */}
      <Section className="bg-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-medium">Video Isarco</h2>
            <div className="relative aspect-video bg-primary/10 rounded-lg flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-300" />
              <PlayCircle className="w-16 h-16 text-primary group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
