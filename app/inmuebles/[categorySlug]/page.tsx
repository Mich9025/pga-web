import BackButton from "@/components/back";
import { Container, Prose, Section } from "@/components/craft";
import {
  PropertyFilters as ApiParams,
  getAllProperties,
} from "@/lib/wordpress";
import { Metadata } from "next";
import { PropertiesFilter } from "../PropertiesFilters";
import { PropertyCard } from "../PropertyCard";

export const metadata: Metadata = {
  title: "Inmuebles",
  description: "Buscador de inmuebles",
  alternates: {
    canonical: "/inmuebles",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const {
    search,
    locations,
    types,
    price_min,
    price_max,
    area_min,
    area_max,
    tags,
  } = await searchParams;

  // Convert to your API parameters
  const apiParams: ApiParams = {
    // search: search as string,
    // category: locations ? (locations as string)?.split(",") : undefined,
    // tag_slug: tags ? (types as string)?.split(",") : undefined,
    // // tags: tags ? (tags as string)?.split(",") : undefined,
    // types: types ? (types as string)?.split(",") : undefined,
    // price_min: price_min ? parseInt(price_min as string) : undefined,
    // price_max: price_max ? parseInt(price_max as string) : undefined,
    // area_min: area_min ? parseInt(area_min as string) : undefined,
    // area_max: area_max ? parseInt(area_max as string) : undefined,
  };

  const properties = await getAllProperties(apiParams);

  return (
    <>
      <Section className="bg-primary text-primary-foreground">
        <Container className="space-y-6">
          <Prose className="mb-8">
            <h2>inmo 360...</h2>
          </Prose>
        </Container>
      </Section>
      <PropertiesFilter />
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="space-y-6 overflow-scroll bg-black text-gray-200 rounded-md">
          <pre>{JSON.stringify(properties, null, 2)}</pre>
          <BackButton />
        </Container>
      </Section>
    </>
  );
}
