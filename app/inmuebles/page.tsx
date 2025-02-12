import { Container } from "@/components/craft";
import { SectionHeader } from "@/components/header/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PropertyFilters as ApiParams,
  getAllProperties,
  getTaxonomyTerms,
} from "@/lib/wordpress";
import { PropertiesFilter } from "./PropertiesFilters";
import { PropertyCard } from "./PropertyCard";
import { SearchMap } from "./SearchMap";

import { generateMetadataFromContent } from "@/lib/metadata";

export const metadata = generateMetadataFromContent({
  title: "Buscador de Inmuebles",
  description: "Explora nuestra selección de propiedades disponibles",
  path: "/inmuebles",
  keywords: ["propiedades", "venta", "arriendo", "inmuebles"],
});
interface SearchProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Page({ searchParams }: SearchProps) {
  const {
    search,
    locations,
    types,
    modes,
    price_min,
    price_max,
    area_min,
    area_max,
  } = await searchParams;

  // Convert to your API parameters
  const apiParams: ApiParams = {
    search: search as string,
    locations: locations ? (locations as string)?.split(",") : undefined,
    types: types ? (types as string)?.split(",") : undefined,
    modes: modes ? (modes as string)?.split(",") : undefined,
    price_min: price_min ? parseInt(price_min as string) : undefined,
    price_max: price_max ? parseInt(price_max as string) : undefined,
    area_min: area_min ? parseInt(area_min as string) : undefined,
    area_max: area_max ? parseInt(area_max as string) : undefined,
  };

  const taxonomies_locations = await getTaxonomyTerms("location");
  const taxonomies_types = await getTaxonomyTerms("state_types");
  const taxonomies_modes = await getTaxonomyTerms("mode");

  const properties = await getAllProperties(apiParams);

  return (
    <>
      <SectionHeader
        title={"Inmuebles"}
        image={properties[0]?.featured_image_url as string}
        className="min-h-[30vh]"
      />
      <PropertiesFilter
        locations={taxonomies_locations}
        propertyTypes={taxonomies_types}
        modes={taxonomies_modes}
      />
      <Tabs defaultValue="list" className="w-full">
        <Container className="">
          <TabsList className="mt-2">
            <TabsTrigger value="list">Listado</TabsTrigger>
            <TabsTrigger value="map">Buscar en el mapa</TabsTrigger>
          </TabsList>
        </Container>
        <TabsContent value="list">
          <Container className="!pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </Container>
        </TabsContent>
        <TabsContent value="map">
          {" "}
          <SearchMap properties={properties} />
        </TabsContent>
      </Tabs>
      {/* <Section>
        <Container className="space-y-6 overflow-scroll bg-black text-gray-200 rounded-md">
          <pre>{JSON.stringify(properties, null, 2)}</pre>
          <BackButton />
        </Container>
      </Section> */}
    </>
  );
}
