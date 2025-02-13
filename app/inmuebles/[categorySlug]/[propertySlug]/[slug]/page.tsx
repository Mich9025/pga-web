import BackButton from "@/components/back";
import { Container, Prose, Section } from "@/components/craft";
import { SectionHeader } from "@/components/header/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateMetadataFromContent } from "@/lib/metadata";
import { getPropertyBySlug } from "@/lib/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cloneElement, JSXElementConstructor, ReactElement } from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import {
  LiaNetworkWiredSolid,
  LiaPlugSolid,
  LiaShowerSolid,
  LiaWarehouseSolid,
  LiaWaterSolid,
} from "react-icons/lia";
import {
  LuBanknote,
  LuBed,
  LuBuilding,
  LuClock,
  LuFactory,
  LuFlame,
  LuLandPlot,
  LuMapPin,
  LuSquareParking,
  LuStore,
  LuWarehouse,
  LuWind,
  LuWrench,
} from "react-icons/lu";
import { MdOutlineKitchen } from "react-icons/md";
import { TbBuildingCog, TbRulerMeasure, TbRulerMeasure2 } from "react-icons/tb";
import { PropertyMap } from "./PropertyMap";
import Slider from "./Slider";

interface PageParams {
  params: Promise<{
    categorySlug: string;
    propertySlug: string;
    slug: string;
  }>;
}

export default async function PropertyPage({ params }: PageParams) {
  try {
    const slug = (await params).slug;
    const categorySlug = (await params).categorySlug;
    const propertySlug = (await params).propertySlug;

    console.log(
      "Attempting to fetch property with categorySlug, propertySlug, slug:",
      categorySlug,
      propertySlug,
      slug
    );
    const property = await getPropertyBySlug(slug);
    console.log("API Response:", property);

    if (!property) {
      notFound();
    }

    // if (slug) {
    //   return <pre>{JSON.stringify(property, null, 2)}</pre>;
    // };

    interface Item {
      title: string;
      value: string;
      icon: ReactElement<any, string | JSXElementConstructor<any>>;
      unit?: string;
    }

    const overview: Item[] = [
      {
        title: "Área Construida",
        value: property.area_cons,
        icon: <TbRulerMeasure />,
        unit: "m²",
      },
      {
        title: "Área Privada",
        value: property.area_priv,
        icon: <TbRulerMeasure />,
        unit: "m²",
      },
      {
        title: "Altura",
        value: property.altur,
        icon: <TbRulerMeasure2 />,
        unit: "m",
      },
      {
        title: "Habitaciones",
        value: property.habitaciones,
        icon: <LuBed />,
      },
      {
        title: "Banos",
        value: property.banos,
        icon: <LiaShowerSolid />,
      },
      {
        title: "Parqueadores",
        value: property.parqueaderos,
        icon: <LuSquareParking />,
      },
    ];

    const prices: Item[] = [
      {
        title: "Precio",
        value: property.precio_lista,
        icon: <LuBanknote />,
      },
      {
        title: "Precio M2",
        value: property.preciom2,
        icon: <LuBanknote />,
      },
      {
        title: "Administración",
        value: property.admon,
        icon: <LuBuilding />,
      },
    ];

    const other: Item[] = [
      {
        title: "Estado",
        value: property.state_status,
        icon: <LuBuilding />,
      },
      {
        title: "Estrato",
        value: property.estrato,
        icon: <TbBuildingCog />,
      },
      {
        title: "Antigüedad",
        value: property.antiguedad_edificio,
        icon: <LuClock />,
      },
      {
        title: "Cocina",
        value: property.cocineta,
        icon: <MdOutlineKitchen />,
      },
      {
        title: "Red Electrica",
        value: property.red_electrica,
        icon: <LiaPlugSolid />,
      },
      {
        title: "Red Hidraulica",
        value: property.red_hidraulica,
        icon: <LiaWaterSolid />,
      },
      {
        title: "Red Voz Datos",
        value: property.red_voz_datos,
        icon: <LiaNetworkWiredSolid />,
      },
      {
        title: "Cuarto Tecnico",
        value: property.cuarto_tecnico,
        icon: <LuWrench />,
      },
      {
        title: "Depositos",
        value: property.depositos,
        icon: <LiaWarehouseSolid />,
      },
      {
        title: "Punto de Extracción",
        value: property.punto_extraccion,
        icon: <LuWind />,
      },
      {
        title: "Red de Gas",
        value: property.red_gas,
        icon: <LuFlame />,
      },
    ];

    const title = property.frontend?.title;

    const propertyType = property.frontend?.propertyType;

    let propertyTypeIcon = <LuBuilding />;

    switch (property.type) {
      case "local":
        propertyTypeIcon = <LuStore />;
        break;
      case "deposito":
        propertyTypeIcon = <LuWarehouse />;
        break;
      case "apartamento":
        propertyTypeIcon = <LuBed />;
        break;
      case "lote":
        propertyTypeIcon = <LuLandPlot />;
        break;
      case "residencial":
        propertyTypeIcon = <LuBed />;
        break;
      case "comercial":
        propertyTypeIcon = <LuBuilding />;
        break;
      case "industrial":
        propertyTypeIcon = <LuFactory />;
        break;
      case "bodega":
        propertyTypeIcon = <LuWarehouse />;
        break;
      case "oficina":
        propertyTypeIcon = <HiOutlineBuildingOffice2 />;
        break;
      default:
        propertyTypeIcon = <LuBuilding />;
        break;
    }

    const content = property.content?.rendered;
    const excerpt = property.excerpt.rendered;

    const iconClassName = "size-8 stroke-primary/70 stroke-1";
    const propsClassName =
      "flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-0 [&>*]:p-4 [&>*]:-mr-px [&>*]:-mt-px [&>*]:border [&>*]:border-border [&>*]:flex [&>*]:items-center [&>*]:gap-3";

    const slides = [
      {
        id: 999999999,
        url: String(property?.featured_image_url),
        width: 800,
        height: 800,
      },
      ...property?.gallery_images,
    ];
    return (
      <>
        <SectionHeader
          title={title}
          descriptionHtml={excerpt}
          image={property.featured_image_url as string}
          className="min-h-[40vh]"
        />
        <Section>
          <Container>
            <div className="flex flex-col md:flex-row h-full md:grid md:grid-cols-2">
              <div className="flex flex-col gap-6">
                <div className="">
                  {/* <pre className="text-xs fixed bg-foreground text-background z-50 top-3 right-3 p-4 font-bold">
                    {JSON.stringify(
                      {
                        images: [
                          {
                            id: 999999999,
                            url: String(property?.featured_image_url),
                            width: 800,
                            height: 800,
                          },
                          ...property?.gallery_images,
                        ],
                      },
                      null,
                      2
                    )}
                  </pre> */}
                  {slides?.length > 0 && (
                    <Slider id="property-gallery" alt={title} images={slides} />
                  )}
                </div>
                <div className="flex flex-col gap-6 md:pr-12">
                  <PropertyMap property={property} />
                </div>
              </div>
              {/* Property Details Section */}
              <section
                className="py-6 flex flex-col gap-5"
                itemScope
                itemType="https://schema.org/RealEstateProperty"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-4xl font-semibold">{title}</h2>
                  <dl className="flex gap-2 items-center text-lg [&>*]:flex [&>*]:items-center [&>dd]:pr-4">
                    <dt>
                      <span className="sr-only">Tipo de inmueble</span>
                      {cloneElement(propertyTypeIcon, {
                        className: "size-6 stroke-primary/70 stroke-1",
                        "aria-hidden": "true",
                      })}
                    </dt>
                    <dd>{propertyType}</dd>
                    <dt>
                      <span className="sr-only">Dirección</span>
                      <LuMapPin
                        className="size-6 stroke-primary/70 stroke-1"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <address className="not-italic">
                        {property.direccion}
                      </address>
                    </dd>
                  </dl>
                </div>
                {/* General Features */}
                <h2 className="text-xl font-semibold">General</h2>
                <Card>
                  <dl className={propsClassName}>
                    {overview.map(({ title, value, icon, unit }, index) => {
                      if (!value) return null;
                      return (
                        <div
                          key={`general-${index}`}
                          className="feature-item"
                          itemProp="amenityFeature"
                          itemScope
                          itemType="https://schema.org/PropertyValue"
                        >
                          {cloneElement(icon, {
                            className: iconClassName,
                            "aria-hidden": "true",
                          })}
                          <div className="flex flex-col">
                            <dt className="text-base">
                              <span itemProp="name">{title}</span>
                            </dt>
                            <dd className="text-lg font-semibold text-foreground/60">
                              <span itemProp="value">{value}</span>
                              {unit && <span itemProp="unitText">{unit}</span>}
                            </dd>
                          </div>
                        </div>
                      );
                    })}
                  </dl>
                </Card>

                {/* Description */}
                <h2 className="text-xl font-semibold">Descripción</h2>
                <Prose>
                  <div
                    itemProp="description"
                    dangerouslySetInnerHTML={{ __html: content }}
                    className="prose"
                  />
                </Prose>

                {/* Pricing Information */}
                <h2 className="text-xl font-semibold">Precio</h2>
                <Card>
                  <dl className={propsClassName}>
                    {prices.map(({ title, value, icon, unit }, index) => {
                      if (!value) return null;
                      return (
                        <div
                          key={`price-${index}`}
                          className="feature-item"
                          itemScope
                          itemType="https://schema.org/PropertyValue"
                        >
                          {cloneElement(icon, {
                            className: iconClassName,
                            "aria-hidden": "true",
                          })}
                          <div className="flex flex-col">
                            <dt className="text-base">
                              <span itemProp="name">{title}</span>
                            </dt>
                            <dd className="text-lg font-semibold text-foreground/60">
                              <span itemProp="value">{value}</span>
                              {unit && <span itemProp="unitText">{unit}</span>}
                            </dd>
                          </div>
                        </div>
                      );
                    })}
                  </dl>
                </Card>

                {/* Additional Features */}
                <h2 className="text-xl font-semibold">Características</h2>
                <Card>
                  <dl className={propsClassName}>
                    {other.map(({ title, value, icon, unit }, index) => {
                      if (!value) return null;
                      return (
                        <div
                          key={`feature-${index}`}
                          className="feature-item"
                          itemScope
                          itemType="https://schema.org/PropertyValue"
                        >
                          {cloneElement(icon, {
                            className: iconClassName,
                            "aria-hidden": "true",
                          })}
                          <div className="flex flex-col">
                            <dt className="text-base">
                              <span itemProp="name">{title}</span>
                            </dt>
                            <dd className="text-lg font-semibold text-foreground/60">
                              <span itemProp="value">{value}</span>
                              {unit && <span itemProp="unitText">{unit}</span>}
                            </dd>
                          </div>
                        </div>
                      );
                    })}
                  </dl>
                </Card>
                <Card className="bg-muted">
                  <CardContent>
                    <CardTitle className="py-6 md:py-8">
                      Solicitar información
                    </CardTitle>
                    <form className="space-y-4 md:space-y-4 lg:space-y-10">
                      <Input placeholder="Nombre" />
                      <Input placeholder="Email" type="email" />
                      <Input placeholder="Teléfono" type="tel" />
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        defaultValue={"Mensaje"}
                      />
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
                            Acepto recibir comunicaciones comerciales de LA
                            EMPRESA
                          </label>
                        </div>
                      </div>
                      <Button className="w-full">Enviar</Button>
                    </form>
                  </CardContent>
                </Card>
              </section>
            </div>
          </Container>
          <Container className="space-y-6">
            {/* <pre>{JSON.stringify(property, null, 2)}</pre> */}
            <BackButton />
          </Container>
        </Section>
      </>
    );
  } catch (error) {
    console.error("Error:", error);
    notFound();
  }
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const slug = (await params).slug;
  const categorySlug = (await params).categorySlug;
  const propertySlug = (await params).propertySlug;

  const path = `/inmuebles/${categorySlug}/${propertySlug}/${slug}`;

  if (!slug) {
    return generateMetadataFromContent({
      title: "Inmueble No Disponible",
      description: "El inmueble que buscabas ya no se encuentra disponible",
      path,
    });
  }

  const property = await getPropertyBySlug(slug);

  if (!property) {
    return generateMetadataFromContent({
      title: "Inmueble No Disponible",
      description: "El inmueble que buscabas ya no se encuentra disponible",
      path,
    });
  }

  const propertyName =
    propertySlug.charAt(0).toUpperCase() +
    propertySlug.replace("-", " ").slice(1);

  const title = propertyName + " " + property.title.rendered;

  const propertyType =
    categorySlug.charAt(0).toUpperCase() +
    categorySlug.replace("-", " ").slice(1);

  const keywords = [
    propertyName,
    propertyType,
    property.title.rendered,
    // ...property.keywords,
  ];

  return generateMetadataFromContent({
    title: title,
    description: property.excerpt.rendered?.replace(/<[^>]*>/g, "") || "",
    path,
    image: property.featured_image_url as string,
    type: "article",
    publishedTime: property.date,
    modifiedTime: property.date,
    keywords,
  });
}
