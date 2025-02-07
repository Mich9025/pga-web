import BackButton from "@/components/back";
import { Container, Prose, Section } from "@/components/craft";
import { generateMetadataFromContent } from "@/lib/metadata";
import { getPropertyBySlug } from "@/lib/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function PropertyPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { slug } = await params;
    console.log("Attempting to fetch property with slug:", slug);
    const property = await getPropertyBySlug(slug);
    console.log("API Response:", property);

    if (!property) {
      notFound();
    }

    return (
      <Section>
        <Container className="space-y-6">
          <Prose className="mb-8">
            <h1>{property.name}</h1>
            <p className="text-xl font-bold">${property.price}</p>
            <div dangerouslySetInnerHTML={{ __html: property.description }} />
            {/* Add more property details here */}
          </Prose>
          <BackButton />
        </Container>
      </Section>
    );
  } catch (error) {
    console.error("Error:", error);
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    return generateMetadataFromContent({
      title: "Property Not Found",
      description: "The requested property could not be found",
      path: `/inmobiliaria-360/${params.slug}`,
    });
  }

  return generateMetadataFromContent({
    title: property.name,
    description: property.short_description?.replace(/<[^>]*>/g, "") || "",
    path: `/inmobiliaria-360/${property.slug}`,
    image: property.images?.[0]?.src,
    type: "article",
    publishedTime: property.date_created,
    modifiedTime: property.date_modified,
  });
}
