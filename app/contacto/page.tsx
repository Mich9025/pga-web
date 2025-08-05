import { Container, Section } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateMetadataFromContent } from "@/lib/metadata";
import { getAllProjects } from "@/lib/wordpress";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = generateMetadataFromContent({
  title: "Contacto",
  description: "Contacto de PGA",
  path: "/proyectos",
  keywords: ["proyectos", "PGA", "diseño", "arquitectura", "inmobiliaria"],
});

export default async function Page() {
  const wpProjects = await getAllProjects();

  // proyectos disponibles
  const proyectosDisponibles = wpProjects.filter((proyecto: any) => {
    const disponibilidad = proyecto.meta.disponibilidad;
    const split = disponibilidad.split(" ");
    const num = parseInt(split[0]);
    return num > 0;
  });

  const cta = {
    title: "Encuentra tu espacio ideal",
    description:
      // "Porque sabemos que la calidad de vida comienza en casa, nos aseguramos de que cada detalle, cada rincón y cada ambiente sean perfectos para que disfrutes de un hogar único, cómodo y lleno de bienestar.",
      // "Diseñamos cada rincón pensando en tu bienestar y estilo de vida. Contáctanos hoy y descubre cómo hacemos realidad el hogar que siempre has soñado."
      "Contáctanos para conocer nuestros proyectos exclusivos y ayudarte a encontrar tu espacio ideal, donde cada detalle refleja la calidad y el confort que mereces.",
    buttons: [
      // {
      //   label: "Contacto",
      //   href: "/contacto",
      // },
      {
        label: "Agenda con un asesor",
        href: "/contacto",
      },
    ],
  };
  return (
    <>
      <Section>
        <div className="lg:fixed lg:inset-0 lg:left-1/2 -z-10">
          <img
            alt=""
            src="https://api.pgaconstructores.co/wp-content/uploads/2025/04/17-scaled.jpg"
            className="h-64 w-full bg-foreground/20 object-cover sm:h-80 lg:absolute lg:h-full"
          />
        </div>
        <Container>
          <div className="px-4 sm:px-6 lg:px-8 w-full mt-8">
            <div className="mx-auto max-w-xl lg:mx-0 md:max-w-96 lg:max-w-100 w-full lg:w-1/2">
              <h2 className="text-pretty text-3xl sm:text-4xl font-semibold tracking-tight text-foreground lg:text-7xl mb-6 sm:mb-8 md:mb-12">
                {cta.title}
              </h2>
              <p className="mt-2 text-base sm:text-lg/8 text-foreground/70">
                {cta.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 sm:py-8">
                <div className="grid grid-cols-1 gap-4 sm:gap-5">
                  <h3 className="font-bold uppercase text-xs tracking-wider">
                    Contacto
                  </h3>
                  <p className="break-words">
                    <a
                      href="mailto:ventasycartera@pgaconstructores.com"
                      aria-label="Email Address"
                      className="link-underline inline-flex items-center"
                    >
                      <span className="sr-only">Email: </span>
                      <Mail
                        className="inline-block w-4 h-4 mr-2 opacity-60 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="break-all">ventasycartera@pgaconstructores.com</span>
                    </a>
                  </p>
                  <address className="not-prose not-italic flex items-start">
                    <MapPin
                      className="inline-block w-4 h-4 mr-2 opacity-60 flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div className="location" aria-label="Physical Address">
                      <p>Carrera 7 #84A - 29</p>
                      <p>Bogotá, D.C. Colombia</p>
                    </div>
                  </address>
                </div>
                <div className="contact space-y-4" aria-label="Contact Details">
                  <h3 className="font-bold uppercase text-xs tracking-wider">
                    Teléfonos
                  </h3>
                  {[
                    "+57 601 383 6269",
                    "+57 315 397 7603",
                    "+57 310 222 5636",
                  ].map((phone) => (
                    <p key={phone}>
                      <a
                        href={`tel:${phone.replace(" ", "")}`}
                        aria-label="Phone Number"
                        className="link-underline inline-flex items-center"
                      >
                        <span className="sr-only">Teléfono: </span>
                        <Phone
                          className="inline-block w-4 h-4 mr-2 opacity-60 flex-shrink-0"
                          aria-hidden="true"
                        />
                        {phone}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
              <hr className="mt-6" />
              <form action="#" method="POST" className="mt-12 sm:mt-16">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="font-bold uppercase text-xs tracking-wider"
                    >
                      Nombre
                    </label>
                    <div className="mt-2.5">
                      <Input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="font-bold uppercase text-xs tracking-wider"
                    >
                      Apellido
                    </label>
                    <div className="mt-2.5">
                      <Input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="email"
                      className="font-bold uppercase text-xs tracking-wider"
                    >
                      Correo electrónico
                    </label>
                    <div className="mt-2.5">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <div className="flex justify-between text-sm/6">
                      <label
                        htmlFor="phone"
                        className="font-bold uppercase text-xs tracking-wider"
                      >
                        Teléfono
                      </label>
                      <p id="phone-description" className="text-foreground/40 text-xs">
                        Opcional
                      </p>
                    </div>
                    <div className="mt-2.5">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        aria-describedby="phone-description"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between text-sm/6">
                      <label
                        htmlFor="help-type"
                        className="font-bold uppercase text-xs tracking-wider"
                      >
                        ¿Cómo podemos ayudarte?
                      </label>
                    </div>
                    <div className="mt-2.5">
                      <Select>
                        <SelectTrigger id="help-type">
                          <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Información de Proyectos</SelectLabel>
                            {proyectosDisponibles.map((project: any) => (
                              <SelectItem
                                value={project.id}
                                key={`option-${project.id}`}
                              >
                                {project.title.rendered}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Otras Consultas</SelectLabel>
                            <SelectItem value="general">
                              Consulta General
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between text-sm/6">
                      <label
                        htmlFor="message"
                        className="font-bold uppercase text-xs tracking-wider"
                      >
                        Mensaje
                      </label>
                      <p
                        id="message-description"
                        className="text-foreground/40 text-xs"
                      >
                        Máximo 500 caracteres
                      </p>
                    </div>
                    <div className="mt-2.5">
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        aria-describedby="message-description"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Enviar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
