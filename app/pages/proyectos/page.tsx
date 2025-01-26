import BackButton from "@/components/back";
import { Container, Prose, Section } from "@/components/craft";
import { getAllPages } from "@/lib/wordpress";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Pages",
  description: "Browse all pages of our blog posts",
  alternates: {
    canonical: "/posts/pages",
  },
};

export default async function Page() {
  const pages = await getAllPages();

  return (
    <Section>
      <Container className="space-y-6">
        <Prose className="mb-8">
          <h2>Proyectos...</h2>
        </Prose>
        <BackButton />
      </Container>
    </Section>
  );
}
