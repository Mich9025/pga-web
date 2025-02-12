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
import debounce from "lodash/debounce";
import { ChevronDown, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

interface FilterOption {
  label: string;
  value: string;
}

const locations: FilterOption[] = [
  { label: "Chapinero", value: "chapinero" },
  { label: "Usaquén", value: "usaquen" },
  { label: "Suba", value: "suba" },
];

const propertyTypes: FilterOption[] = [
  { label: "Apartamentos", value: "apartamentos" },
  { label: "Casas", value: "casas" },
  { label: "Bodegas", value: "bodegas" },
  { label: "Locales", value: "locales" },
];

export function PropertiesFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize states from URL params
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    searchParams.get("locations")?.split(",") || []
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.get("types")?.split(",") || []
  );
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get("price_min") || "0"),
    parseInt(searchParams.get("price_max") || "100"),
  ]);
  const [area, setArea] = useState({
    min: searchParams.get("area_min") || "",
    max: searchParams.get("area_max") || "",
  });

  const updateFilters = useCallback(() => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (selectedLocations.length > 0)
      params.set("locations", selectedLocations.join(","));
    if (selectedTypes.length > 0) params.set("types", selectedTypes.join(","));

    if (priceRange[0] !== 0) params.set("price_min", priceRange[0].toString());
    if (priceRange[1] !== 100)
      params.set("price_max", priceRange[1].toString());

    if (area.min) params.set("area_min", area.min);
    if (area.max) params.set("area_max", area.max);

    router.push(`?${params.toString()}`, { scroll: false });
  }, [search, selectedLocations, selectedTypes, priceRange, area, router]);

  // Debounce the update for inputs that change frequently
  const debouncedUpdate = useMemo(
    () => debounce(() => updateFilters(), 500),
    [updateFilters]
  );
  // Use different update strategies for different inputs
  const handleSearchChange = (value: string) => {
    setSearch(value);
    debouncedUpdate();
  };

  const handleLocationChange = (checked: boolean, value: string) => {
    const newLocations = checked
      ? [...selectedLocations, value]
      : selectedLocations.filter((l) => l !== value);

    setSelectedLocations(newLocations);
    const params = new URLSearchParams(searchParams.toString());
    if (newLocations.length > 0) {
      params.set("locations", newLocations.join(","));
    } else {
      params.delete("locations");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleTypeChange = (checked: boolean, value: string) => {
    const newTypes = checked
      ? [...selectedTypes, value]
      : selectedTypes.filter((t) => t !== value);

    setSelectedTypes(newTypes);
    const params = new URLSearchParams(searchParams.toString());
    if (newTypes.length > 0) {
      params.set("types", newTypes.join(","));
    } else {
      params.delete("types");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    debouncedUpdate();
  };

  const handleAreaChange = (values: { min: string; max: string }) => {
    setArea(values);
    debouncedUpdate();
  };

  return (
    <Section className="py-4 md:py-2 bg-secondary text-foreground">
      <Container>
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar inmuebles..."
              className="pl-10"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            {/* Ubicaciones */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Ubicaciones
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  {locations.map((location) => (
                    <div
                      key={location.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={location.value}
                        checked={selectedLocations.includes(location.value)}
                        onCheckedChange={(checked) =>
                          handleLocationChange(
                            checked as boolean,
                            location.value
                          )
                        }
                      />
                      <Label htmlFor={location.value}>{location.label}</Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Tipo de Inmueble */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Tipo de Inmueble
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  {propertyTypes.map((type) => (
                    <div
                      key={type.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={type.value}
                        checked={selectedTypes.includes(type.value)}
                        onCheckedChange={(checked) =>
                          handleTypeChange(checked as boolean, type.value)
                        }
                      />

                      <Label htmlFor={type.value}>{type.label}</Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Presupuesto */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Presupuesto
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={(newValue) => {
                      setPriceRange(newValue);
                      handlePriceChange(newValue);
                    }}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}M</span>
                    <span>${priceRange[1]}M+</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Tamaño */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
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
                        value={area.min}
                        onChange={(e) => {
                          const newArea = { ...area, min: e.target.value };
                          setArea(newArea);
                          handleAreaChange(newArea); // Pass new value, not state
                        }}
                        placeholder="0"
                      />
                    </div>
                    <div className="flex-1">
                      <Label>Máximo m²</Label>
                      <Input
                        type="number"
                        value={area.max}
                        onChange={(e) => {
                          const newArea = { ...area, min: e.target.value };
                          setArea(newArea);
                          handleAreaChange(newArea); // Pass new value, not state
                        }}
                        placeholder="1000+"
                      />
                    </div>
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
