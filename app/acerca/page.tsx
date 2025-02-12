import { Container, Section } from "@/components/craft";
import { SectionHeader } from "@/components/header/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllFromCustomPostType } from "@/lib/wordpress";
import { History } from "@/lib/wordpress.d";
import Image from "next/image";

import Link from "next/link";
import { Video } from "./Video";

import { generateMetadataFromContent } from "@/lib/metadata";

// about/page.tsx
export const metadata = generateMetadataFromContent({
  title: "Nosotros",
  description:
    "Conoce nuestra trayectoria y experiencia en el sector inmobiliario",
  path: "/nosotros",
  keywords: ["inmobiliaria", "experiencia", "trayectoria", "equipo"],
});

export default async function Page() {
  const history = await getAllFromCustomPostType<History>("history");

  return (
    <>
      <SectionHeader title={"Nosotros"} className="min-h-[400px]" />

      <Section className="bg-background !pb-0">
        <Container className="text-center">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl lg:text-6xl font-bold py-6">
              Quienes Somos
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Somos un Grupo Empresarial con más de 38 años de trayectoria en
                la Estructuración, Gerencia, Diseño, Construcción, Venta,
                Arrendamiento, Administración, Mantenimiento y Operación de
                Proyectos Inmobiliarios. Somos reconocidos por nuestra solidez,
                por nuestros valores, organización, eficiencia, cumplimiento,
                por la calidad de nuestros productos y servicios y por la
                creación de valor a nuestros accionistas, clientes,
                colaboradores y a la sociedad.
              </p>
            </div>
            <Link
              href="https://isarco.com.co/wp-content/uploads/BROCHURE-ISARCO.pdf"
              target="_blank"
            >
              <Button className="w-fit">Descargar Brochure</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* History Section */}
      <Section className="bg-background !pb-0">
        <Container className="text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-6xl font-bold py-6">
              Nuestra Historia
            </h2>
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
      <Section className="bg-white !py-0">
        <Container>
          <Carousel className="w-full relative px-6">
            <div className="absolute -inset-x-2 h-6 rounded-full bg-secondary top-1/2 transform -translate-y-1/2 select-none pointer-events-none"></div>

            <CarouselContent>
              {history.map((event) => (
                <CarouselItem
                  key={event.year}
                  className="group md:basis-1/2 lg:basis-1/5 transform hover:scale-105 scale-90 transition-all duration-300 pt-10"
                >
                  <Card className="border-none bg-transparent border-0 shadow-none">
                    <CardContent className="p-1 text-center overflow-hidden">
                      <h3 className="text-2xl font-bold mb-2 bg-primary text-secondary px-12 py-2 rounded-xl inline-block mx-auto">
                        {event.year}
                      </h3>
                      <div className="relative p-2 border-4 border-primary rounded-full before:absolute before:size-32 before:bg-white before:-left-12 before:top-1/2 before:-translate-y-1/2 before:rotate-45">
                        <div className="relative aspect-square rounded-full overflow-hidden ">
                          <Image
                            src={event.featured_image_url}
                            alt={`${event.year} - ${event.title.rendered}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="text-center pt-4 text-base opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div
                          className="text-foreground"
                          dangerouslySetInnerHTML={{
                            __html: event.content.rendered,
                          }}
                        ></div>
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
      <Section className="bg-secondary -mt-12">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-6xl font-bold py-6">
            Nuestros primeros 5 años
            <span className="block font-normal mt-2">1985 - 1989</span>
          </h2>
        </Container>
      </Section>

      {/* Video Section */}
      <Video />
    </>
  );
}
