import { Container, Section } from "@/components/craft";
import PodcastPage from "./PodcastPage";

import { generateMetadataFromContent } from "@/lib/metadata";

export const metadata = generateMetadataFromContent({
  title: "Podcast",
  description: "Escucha nuestro podcast sobre el mercado inmobiliario",
  path: "/podcast",
  keywords: ["podcast", "audio", "entrevistas", "mercado inmobiliario"],
});

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-primary text-secondary min-h-[70vh] flex items-center relative">
        <Container className="py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium mb-6">
              Podcast
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light">
              Entre Muros y Sueños
            </h2>
          </div>
        </Container>
      </Section>

      <PodcastPage />
    </>
  );
}
