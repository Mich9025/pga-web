"use client";

import { Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { TaxonomyTerm } from "@/lib/wordpress.d";
import { InputMask } from "@react-input/mask";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiPurchaseTag } from "react-icons/bi";
import {
  LuArrowRight,
  LuBed,
  LuBuilding,
  LuLandPlot,
  LuMapPin,
  LuStore,
  LuWarehouse,
} from "react-icons/lu";
import { MdOutlineLocationSearching } from "react-icons/md";
import { TbDoorEnter } from "react-icons/tb";

interface SearchProps {
  locations: TaxonomyTerm[];
  propertyTypes: TaxonomyTerm[];
  modes: TaxonomyTerm[];
}
interface SearchFormState {
  mode: string;
  propertyType: string;
  location: string;
  priceRange: [number, number];
}

const PRICE_MAX_DEFAULT = 1000000000; // 10000M
const PRICE_STEP = 1000000;
export default function LandingSearchSection({
  locations,
  propertyTypes,
  modes,
}: SearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, PRICE_MAX_DEFAULT]);
  const [formState, setFormState] = useState<SearchFormState>({
    mode: "",
    propertyType: "",
    location: "",
    priceRange: [0, PRICE_MAX_DEFAULT],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/inmuebles?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();

    if (formState.mode) queryParams.set("modes", formState.mode);
    if (formState.propertyType)
      queryParams.set("types", formState.propertyType);
    if (formState.location) queryParams.set("locations", formState.location);
    if (formState.priceRange[0] > 0)
      queryParams.set("min_price", formState.priceRange[0].toString());
    if (formState.priceRange[1] < PRICE_MAX_DEFAULT)
      queryParams.set("max_price", formState.priceRange[1].toString());

    router.push(`/inmuebles?${queryParams.toString()}`);
  };

  const selectItemClasses = "flex items-center space-x-2 w-full";
  const selectItemIconClasses = "opacity-50 size-5";

  const modeIcons: Record<string, React.ReactNode> = {
    arriendo: <TbDoorEnter className={selectItemIconClasses} />,
    venta: <BiPurchaseTag className={selectItemIconClasses} />,
  };

  const propertyTypeIcons: Record<string, React.ReactNode> = {
    oficina: <LuBuilding className={selectItemIconClasses} />,
    local: <LuStore className={selectItemIconClasses} />,
    deposito: <LuWarehouse className={selectItemIconClasses} />,
    bodega: <LuWarehouse className={selectItemIconClasses} />,
    apartamento: <LuBed className={selectItemIconClasses} />,
    lote: <LuLandPlot className={selectItemIconClasses} />,
  };

  return (
    <Container className="py-4 md:py-24 lg:py-48 flex flex-col gap-y-6 max-w-md mx-auto">
      <h2 className="py-8 text-3xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem]">
        Encuentra el espacio ideal
      </h2>
      {/* <pre className="text-xs fixed bg-foreground text-background z-50 top-3 right-3 p-4 font-bold">
        {JSON.stringify(
          {
            locations,
            propertyTypes,
            modes,
          },
          null,
          2
        )}
      </pre> */}
      <div className="flex flex-col gap-3">
        <form onSubmit={handleSearch}>
          <div className="relative flex flex-col gap-3">
            <Select
              value={formState.mode}
              onValueChange={(value: string) =>
                setFormState((prev) => ({ ...prev, mode: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Venta o Arriendo" />
              </SelectTrigger>
              <SelectContent>
                {modes?.map((mode) => (
                  <SelectItem
                    key={`taxonomy-mode-${mode.name}`}
                    value={mode.slug}
                  >
                    <div className={selectItemClasses}>
                      {modeIcons[mode.slug]}
                      <span>{mode.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <Label className="mt-2">Tipo de inmueble</Label> */}

            <Select
              value={formState.propertyType}
              onValueChange={(value: string) =>
                setFormState((prev) => ({ ...prev, propertyType: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona el tipo de inmueble" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes?.map((type) => (
                  <SelectItem
                    key={`taxonomy-type-${type.name}`}
                    value={type.slug}
                  >
                    <div className={selectItemClasses}>
                      {propertyTypeIcons[type.slug]}
                      <span>{type.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <Label className="mt-2">Ubicación</Label> */}
            <Select
              value={formState.location}
              onValueChange={(value: string) =>
                setFormState((prev) => ({ ...prev, location: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Usar mi ubicación actual" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">
                  <div className={selectItemClasses}>
                    <MdOutlineLocationSearching
                      className={selectItemIconClasses}
                    />
                    <span>Usar mi ubicación actual</span>
                  </div>
                </SelectItem>
                <SelectGroup>
                  <SelectLabel>Localidades</SelectLabel>

                  {locations?.map((location) => (
                    <SelectItem
                      key={`taxonomy-location-${location.name}`}
                      value={location.slug}
                    >
                      <div className={selectItemClasses}>
                        <LuMapPin className={selectItemIconClasses} />
                        <span>{location.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="relative flex flex-col gap-4 mb-6">
              <Label className="mt-2">Rango de Precio</Label>
              <div className="grid grid-cols-2 items-center gap-2">
                {/* <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  placeholder="0"
                />
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  placeholder="1000+"
                  className="ml-2"
                  disabled={priceRange[0] === priceRange[1]}
                /> */}
                <InputMask
                  component="input"
                  className={cn(
                    "flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    formState.priceRange[0] < 1 && "!text-transparent"
                  )}
                  mask="$ ###,###,###,###"
                  replacement={{ "#": /\d/ }}
                  value={new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0,
                  }).format(formState.priceRange[0])}
                  onChange={(e: any) => {
                    const value = parseInt(e.target.value.replace(/\D/g, ""));
                    setFormState((prev) => ({
                      ...prev,
                      priceRange: [value || 0, prev.priceRange[1]],
                    }));
                  }}
                  placeholder="$ 0"
                />
                <InputMask
                  component="input"
                  className={cn(
                    "flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    formState.priceRange[1] >= PRICE_MAX_DEFAULT &&
                      "!text-transparent"
                  )}
                  mask="$ ###,###,###,###"
                  replacement={{ "#": /\d/ }}
                  value={new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0,
                  }).format(formState.priceRange[1])}
                  onChange={(e: any) => {
                    const value = parseInt(e.target.value.replace(/\D/g, ""));
                    setFormState((prev) => ({
                      ...prev,
                      priceRange: [
                        prev.priceRange[0],
                        value || PRICE_MAX_DEFAULT,
                      ],
                    }));
                  }}
                  placeholder="$ 10,000,000"
                  disabled={formState.priceRange[0] === formState.priceRange[1]}
                />
              </div>
              <div className="px-4">
                <Slider
                  value={formState.priceRange}
                  onValueChange={(value: any) =>
                    setFormState((prev) => ({
                      ...prev,
                      priceRange: value,
                    }))
                  }
                  min={0}
                  max={PRICE_MAX_DEFAULT}
                  step={PRICE_STEP}
                />
              </div>
            </div>

            {/* <div className="relative">
              <IoMdPin className="absolute left-4 top-3 mr-2 opacity-50 size-6" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ingresa una ubicación"
                className="pl-12 md:text-lg !rounded-full"
              />
            </div> */}
            <Button
              variant="outline"
              className="text-left justify-start md:text-lg !rounded-full group transition-all duration-150 ease-in-out relative"
              onClick={handleFormSubmit}
            >
              <span className="grow pl-1.5 mr-2">Buscar</span>
              <LuArrowRight className="mr-2 size-5 ml-auto transform duration-100 ease-in-out opacity-0 group-hover:opacity-50 -translate-x-2 group-hover:translate-x-0" />
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
