import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PropertyResponse } from "@/lib/wordpress.d";
import Image from "next/image";
import Link from "next/link";
import { cloneElement } from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LiaShowerSolid } from "react-icons/lia";
import {
  LuBed,
  LuBuilding,
  LuFactory,
  LuMapPin,
  LuSquareParking,
  LuWarehouse,
} from "react-icons/lu";
import { TbRulerMeasure, TbRulerMeasure2 } from "react-icons/tb";

interface PropertyCardProps {
  property: PropertyResponse;
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Extract metadata
  const title = property.frontend?.title;

  const propertyType = property.frontend?.propertyType;

  let propertyTypeIcon = <LuBuilding />;
  switch (property.type) {
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

  const image = property.featured_image_url as string;
  const precio = property.precio_lista;
  const area = property.area_cons;
  const habitaciones = property.habitaciones;
  const banos = property.banos;
  const parking = property.parqueaderos;
  const ubicacion = property.direccion;

  const overview = [
    {
      title: "Área",
      value: property.area_cons,
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
  const iconClassName = "size-8 stroke-primary/70 stroke-1";

  const propsClassName =
    "flex flex-col md:flex-row w-full justify-between [&>*]:grow [&>*]:p-4 [&>*]:-mr-px [&>*]:-mt-px [&>*]:border [&>*]:border-border [&>*]:flex  [&>*]:flex-col [&>*]:text-center  [&>*]:items-center [&>*]:gap-3";
  return (
    <Card className="group overflow-hidden">
      <Link href={`${property.frontend?.path}`}>
        <CardHeader className="p-0 relative aspect-square">
          {/* Main Image */}
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {/* Status Badge */}
          {/* <Badge className="absolute top-4 left-4 z-10" variant="secondary">
            {property.status === "publish" ? "Active" : property.status}
          </Badge> */}
          {/* Favorite Button */}
          {/* <button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // Add favorite functionality
            }}
          >
            <Heart className="w-4 h-4" />
          </button> */}
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <dl className="flex gap-2 items-center text-base [&>*]:flex [&>*]:items-center [&>dd]:pr-4">
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
                <address className="not-italic">{property.direccion}</address>
              </dd>
            </dl>
          </div>
          {/* Price */}
          <div className="text-lg">{precio || "Precio a consultar"}</div>

          {/* Location */}
          {/* <p className="text-sm text-muted-foreground line-clamp-1">
            {ubicacion || "Location not specified"}
          </p> */}
        </CardContent>

        <CardFooter className="p-0 -m-px text-xs text-muted-foreground">
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
                    <dt className="text-xs">
                      <span itemProp="name">{title}</span>
                    </dt>
                    <dd className="text-sm font-semibold text-foreground/60">
                      <span itemProp="value">{value}</span>
                      {unit && <span itemProp="unitText">{unit}</span>}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </CardFooter>
      </Link>
    </Card>
  );
}
