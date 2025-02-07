import { Container, Section } from "@/components/craft";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export const metadata: Metadata = {
  title: "All Pages",
  description: "Browse all pages of our blog posts",
  alternates: {
    canonical: "/posts/pages",
  },
};
const steps = [
  {
    id: 1,
    title: "Inmobiliaria",
    icon: "🏢",
  },
  {
    id: 2,
    title: "Asesoría",
    icon: "📋",
  },
  {
    id: 3,
    title: "Análisis PH",
    icon: "📊",
  },
  {
    id: 4,
    title: "Acompañamiento",
    icon: "🤝",
  },
];

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

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-primary text-secondary min-h-[70vh] flex items-center">
        <Container className="py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium mb-4">
              Soluciones Inmobiliarias 360
            </h1>
            <p className="text-xl md:text-2xl">
              Te acompañamos en cada paso de tu proceso inmobiliario
            </p>
          </div>
        </Container>
      </Section>

      {/* Steps Section */}
      <Section className="bg-secondary">
        <Container>
          <div className="relative">
            {/* Steps Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/20" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary text-secondary flex items-center justify-center text-2xl mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-medium">{step.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/agent-image.jpg"
                alt="Agente Inmobiliario"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium mb-6">Formulario</h2>
              <form className="space-y-4">
                <Input placeholder="Nombre" />
                <Input placeholder="Email" type="email" />
                <Input placeholder="Teléfono" type="tel" />
                <Input placeholder="Asunto" />
                <Button className="w-full">Enviar</Button>
              </form>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section className="bg-secondary">
        <Container>
          <h2 className="text-3xl font-medium mb-12">Estructura</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="group overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-center text-secondary p-6">
                        <h3 className="text-xl font-medium mb-2">
                          {service.title}
                        </h3>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Clients Section */}
      <Section className="bg-background">
        <Container>
          <h2 className="text-3xl font-medium mb-12">Nuestros Clientes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {/* Add client logos here */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/2] relative grayscale hover:grayscale-0 transition-all"
              >
                <Image
                  src={`/client-${i + 1}.png`}
                  alt={`Client ${i + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
