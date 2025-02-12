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
import { useCallback, useState } from "react";

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
  const [tempTypes, setTempTypes] = useState<string[]>(selectedTypes);
  const [tempModes, setTempModes] = useState<string[]>(selectedMode);
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);
  const [tempArea, setTempArea] = useState(area);

  const updateFilters = useCallback(() => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (selectedLocations.length > 0)
      params.set("locations", selectedLocations.join(","));
    if (selectedTypes.length > 0) params.set("types", selectedTypes.join(","));
    if (selectedMode.length > 0) params.set("modes", selectedMode.join(","));
    if (priceRange[0] !== 0) params.set("price_min", priceRange[0].toString());
    if (priceRange[1] !== PRICE_MAX_DEFAULT)
      params.set("price_max", priceRange[1].toString());
    if (area.min) params.set("area_min", area.min);
    if (area.max) params.set("area_max", area.max);

    router.push(`?${params.toString()}`, { scroll: false });
  }, [
    search,
    selectedLocations,
    selectedTypes,
    selectedMode,
    priceRange,
    area,
    router,
  ]);

  return (
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
                              : tempLocations.filter((l) => l !== location.slug)
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
  );
}
