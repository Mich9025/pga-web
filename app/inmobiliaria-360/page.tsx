import BackButton from "@/components/back";
import { Container, Prose, Section } from "@/components/craft";
import { getAllProperties } from "@/lib/wordpress";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Pages",
  description: "Browse all pages of our blog posts",
  alternates: {
    canonical: "/posts/pages",
  },
};

export default async function Page() {
  const properties = await getAllProperties();

  return (
    <Section>
      <Container className="space-y-6">
        <Prose className="mb-8">
          <h2>inmo 360...</h2>
        </Prose>
        {properties.map((property) => (
          <div key={property.id}>
            <Link href={`/inmobiliaria-360/${property.slug}`}>
              <h2>{property.name}</h2>
              <p>{property.price}</p>
              <div dangerouslySetInnerHTML={{ __html: property.description }} />
            </Link>
          </div>
        ))}
        <pre>{JSON.stringify(properties, null, 2)}</pre>
        <BackButton />
      </Container>
    </Section>
  );
}
