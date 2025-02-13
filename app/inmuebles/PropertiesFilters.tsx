"use client";

import { Container, Section } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { TaxonomyTerm } from "@/lib/wordpress.d";
import { ChevronDown, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface PropertiesFilterProps {
  locations: TaxonomyTerm[];
  propertyTypes: TaxonomyTerm[];
  modes: TaxonomyTerm[];
}

const PRICE_MAX_DEFAULT = 10000000000; // 10000M
const PRICE_STEP = 1000000;

export function PropertiesFilter({
  locations,
  propertyTypes,
  modes,
}: PropertiesFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  // Main states
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    searchParams.get("locations")?.split(",") || []
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.get("types")?.split(",") || []
  );
  const [selectedMode, setSelectedMode] = useState<string[]>(
    searchParams.get("modes")?.split(",") || []
  );
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get("price_min") || "0"),
    parseInt(searchParams.get("price_max") || `${PRICE_MAX_DEFAULT}`),
  ]);
  const [area, setArea] = useState({
    min: searchParams.get("area_min") || "",
    max: searchParams.get("area_max") || "",
  });

  // Temporary states for each filter
  const [tempLocations, setTempLocations] =
    useState<string[]>(selectedLocations);
  const [tempTypes, setTempTypes] = useState<string[]>([]);
  const [tempModes, setTempModes] = useState<string[]>([]);
  const [tempPriceRange, setTempPriceRange] = useState([]);
  const [tempArea, setTempArea] = useState(area);

  const updateFilters = useCallback(() => {
    setIsLoading(true);
    const params = new URLSearchParams();

    // Only add params if they have values
    if (search) {
      params.set("search", search);
    }

    if (selectedLocations.length > 0) {
      params.set("locations", selectedLocations.join(","));
    }

    if (selectedTypes.length > 0) {
      params.set("types", selectedTypes.join(","));
    }

    if (selectedMode.length > 0) {
      params.set("modes", selectedMode.join(","));
    }

    if (priceRange[0] !== 0) {
      params.set("price_min", priceRange[0].toString());
    }

    if (priceRange[1] !== PRICE_MAX_DEFAULT) {
      params.set("price_max", priceRange[1].toString());
    }

    if (area.min) {
      params.set("area_min", area.min);
    }

    if (area.max) {
      params.set("area_max", area.max);
    }

    // If there are no params, just push the base URL
    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : "";

    console.log("url", url);

    router.push(url, { scroll: false });
  }, [
    search,
    selectedLocations,
    selectedTypes,
    selectedMode,
    priceRange,
    area,
    router,
  ]);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [searchParams]);

  return (
    <>
      {/* <pre className="text-xs fixed bg-foreground text-background z-50 top-3 right-3 p-4 font-bold max-w-screen-md">
        {JSON.stringify(
          {
            searchParams,
            isLoading,
            search,
            selectedLocations,
            selectedTypes,
            selectedMode,
            priceRange,
            area,
            tempLocations,
            tempTypes,
            tempModes,
            tempPriceRange,
            tempArea,
          },
          null,
          2
        )}
      </pre> */}
      <Section className="py-4 md:py-2 bg-primary/80 text-foreground">
        <Container>
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="w-fit relative">
                <Search
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 size-6 select-none pointer-events-none",
                    searchOpen
                      ? "text-muted-foreground"
                      : "text-primary-foreground"
                  )}
                />
                <Input
                  placeholder={!searchOpen ? "" : "Buscar inmuebles..."}
                  className={cn(
                    "pl-10 !text-base min-w-12 max-w-screen-sm transition-all duration-150 ease-in-out",
                    !searchOpen
                      ? "w-12 !p-0 text-transparent bg-primary border-primary/50"
                      : "w-full"
                  )}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => setSearchOpen(false)}
                />
                {searchOpen && search && (
                  <Button
                    size="xs"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={updateFilters}
                  >
                    Buscar
                  </Button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              {/* Modo */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="flex items-center gap-2" size="sm">
                    Modo
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    {modes.map((type) => (
                      <div
                        key={`filter-term-${type.id}`}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={type.slug}
                          checked={tempModes.includes(type.slug)}
                          onCheckedChange={(checked) =>
                            setTempModes(
                              checked
                                ? [...tempModes, type.slug]
                                : tempModes.filter((m) => m !== type.slug)
                            )
                          }
                        />
                        <Label htmlFor={type.slug}>{type.name}</Label>
                      </div>
                    ))}
                    <div className="flex justify-center gap-2 pt-4 border-t">
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => setTempModes(selectedMode)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => {
                          setSelectedMode(tempModes);
                          updateFilters();
                        }}
                      >
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Ubicaciones */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="flex items-center gap-2" size="sm">
                    Ubicaciones
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    {locations.map((location) => (
                      <div
                        key={location.slug}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={location.slug}
                          checked={tempLocations.includes(location.slug)}
                          onCheckedChange={(checked) =>
                            setTempLocations(
                              checked
                                ? [...tempLocations, location.slug]
                                : tempLocations.filter(
                                    (l) => l !== location.slug
                                  )
                            )
                          }
                        />
                        <Label htmlFor={location.slug}>{location.name}</Label>
                      </div>
                    ))}
                    <div className="flex justify-center gap-2 pt-4 border-t">
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => setTempLocations(selectedLocations)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => {
                          setSelectedLocations(tempLocations);
                          updateFilters();
                        }}
                      >
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Tipo de Inmueble */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="flex items-center gap-2" size="sm">
                    Tipo de Inmueble
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    {propertyTypes.map((type) => (
                      <div
                        key={`filter-term-${type.id}`}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={type.slug}
                          checked={tempTypes.includes(type.slug)}
                          onCheckedChange={(checked) =>
                            setTempTypes(
                              checked
                                ? [...tempTypes, type.slug]
                                : tempTypes.filter((t) => t !== type.slug)
                            )
                          }
                        />
                        <Label htmlFor={type.slug}>{type.name}</Label>
                      </div>
                    ))}
                    <div className="flex justify-center gap-2 pt-4 border-t">
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => setTempTypes(selectedTypes)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => {
                          setSelectedTypes(tempTypes);
                          updateFilters();
                        }}
                      >
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Presupuesto */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm">
                    Presupuesto
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <Slider
                      value={tempPriceRange}
                      onValueChange={setTempPriceRange}
                      min={0}
                      max={PRICE_MAX_DEFAULT}
                      step={PRICE_STEP}
                    />
                    <div className="flex justify-between text-sm">
                      <span>${(tempPriceRange[0] / 1000000).toFixed(1)}M</span>
                      <span>${(tempPriceRange[1] / 1000000).toFixed(1)}M+</span>
                    </div>
                    <div className="flex justify-center gap-2 pt-4 border-t">
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => setTempPriceRange(priceRange)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => {
                          setPriceRange(tempPriceRange);
                          updateFilters();
                        }}
                      >
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Tamaño */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="flex items-center gap-2" size="sm">
                    Tamaño
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label>Mínimo m²</Label>
                        <Input
                          type="number"
                          value={tempArea.min}
                          onChange={(e) =>
                            setTempArea({ ...tempArea, min: e.target.value })
                          }
                          placeholder="0"
                        />
                      </div>
                      <div className="flex-1">
                        <Label>Máximo m²</Label>
                        <Input
                          type="number"
                          value={tempArea.max}
                          onChange={(e) =>
                            setTempArea({ ...tempArea, max: e.target.value })
                          }
                          placeholder="1000+"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 pt-4 border-t">
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => setTempArea(area)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => {
                          setArea(tempArea);
                          updateFilters();
                        }}
                      >
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </Container>
      </Section>
      {isLoading && (
        <div
          className="fixed z-10 inset-0 bg-white/80 flex flex-col gap-4 text-center items-center justify-center"
          role="status"
        >
          <svg
            aria-hidden="true"
            className="size-8 text-muted-foreground/40 animate-spin fill-primary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="text-sm font-bold text-primary/70">
            Buscando propiedades
          </span>
        </div>
      )}
    </>
  );
}
