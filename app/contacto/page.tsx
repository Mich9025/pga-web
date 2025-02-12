import { Section } from "@/components/craft";
import { SectionHeader } from "@/components/header/SectionHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { HiBuildingOffice2, HiEnvelope, HiPhone } from "react-icons/hi2";

import { generateMetadataFromContent } from "@/lib/metadata";

// contact/page.tsx
export const metadata = generateMetadataFromContent({
  title: "Contacto",
  description: "Ponte en contacto con nuestro equipo de expertos inmobiliarios",
  path: "/contacto",
  keywords: ["contacto", "ubicación", "teléfono", "email"],
});

export default async function Page() {
  // const pages = await getAllPages();

  return (
    <>
      <SectionHeader title={"Contacto"} className="min-h-[400px]" />
      <Section className="!mb-0 !pb-0">
        <div className="relative isolate bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
            <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
              <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                  <svg
                    aria-hidden="true"
                    className="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
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
                    <rect
                      fill="white"
                      width="100%"
                      height="100%"
                      strokeWidth={0}
                    />
                    <svg
                      x="100%"
                      y={-1}
                      className="overflow-visible fill-gray-50"
                    >
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
                <h2 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
                  Contacto
                </h2>
                {/* <p className="mt-6 text-lg/8 text-gray-600">
                  Proin volutpat consequat porttitor cras nullam gravida at.
                  Orci molestie a eu arcu. Sed ut tincidunt integer elementum id
                  sem. Arcu sed malesuada et magna.
                </p> */}
                <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Dirección</span>
                      <HiBuildingOffice2
                        aria-hidden="true"
                        className="h-7 w-6 text-gray-400"
                      />
                    </dt>
                    <dd>
                      Calle 103 No. 19-60 Piso 4
                      <br />
                      Bogotá, D.C. Colombia
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Teléfono</span>
                      <HiPhone
                        aria-hidden="true"
                        className="h-7 w-6 text-gray-400"
                      />
                    </dt>
                    <dd>
                      <a
                        href="tel:+57 1 822 222 22"
                        className="hover:text-gray-900"
                      >
                        +57 1 822 222 22
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <HiEnvelope
                        aria-hidden="true"
                        className="h-7 w-6 text-gray-400"
                      />
                    </dt>
                    <dd>
                      <a
                        href="mailto:contacto@isarco.com.co"
                        className="hover:text-gray-900"
                      >
                        contacto@isarco.com.co
                      </a>
                    </dd>
                  </div>

                  <div className="flex gap-x-4 items-center pt-8">
                    <dt className="flex items-center w-[190px] gap-2">
                      <HiPhone
                        aria-hidden="true"
                        className="size-5 text-gray-400"
                      />
                      <span className="font-bold">Apartamentos</span>
                    </dt>
                    <dd>
                      <a
                        href="tel:+57 3214633905"
                        className="hover:text-gray-900"
                      >
                        +57 3214633905
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4 items-center">
                    <dt className="flex items-center w-[190px] gap-2">
                      <HiPhone
                        aria-hidden="true"
                        className="size-5 text-gray-400"
                      />
                      <span className="font-bold">Locales y Oficinas</span>
                    </dt>
                    <dd>
                      <a
                        href="tel:+57 3226285433"
                        className="hover:text-gray-900"
                      >
                        +57 3226285433
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4 items-center">
                    <dt className="flex items-center w-[190px] gap-2">
                      <HiPhone
                        aria-hidden="true"
                        className="size-5 text-gray-400"
                      />
                      <span className="font-bold">IsarcoWorking</span>
                    </dt>
                    <dd>
                      <a
                        href="tel:+57 13232235837"
                        className="hover:text-gray-900"
                      >
                        +57 13232235837
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <form
              action="#"
              method="POST"
              className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
            >
              <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm/6 font-semibold text-gray-900"
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
                      className="block text-sm/6 font-semibold text-gray-900"
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
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Correo Electrónico
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
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone-number"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Teléfono
                    </label>
                    <div className="mt-2.5">
                      <Input
                        id="phone-number"
                        name="phone-number"
                        type="tel"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="property-type"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Tipo de Inmueble
                    </label>
                    <div className="mt-2.5">
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipo de Inmueble</SelectLabel>
                            <SelectItem value="Apartamento">
                              Apartamento
                            </SelectItem>
                            <SelectItem value="Oficina">Oficina</SelectItem>
                            <SelectItem value="Locales Comerciales">
                              Locales Comerciales
                            </SelectItem>
                            <SelectItem value="Bodegas">Bodegas</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Message
                    </label>
                    <div className="mt-2.5">
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        He leído y acepto la política de privacidad
                      </label>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="subscribe" />
                      <label
                        htmlFor="subscribe"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Acepto recibir comunicaciones comerciales de LA EMPRESA
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button type="submit">Send message</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
