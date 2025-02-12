import { SectionHeader } from "@/components/header/SectionHeader";
import { generateMetadataFromContent } from "@/lib/metadata";
import { getAllFromCustomPostType } from "@/lib/wordpress";
import { Client, Inmo360 } from "@/lib/wordpress.d";
import { Suspense } from "react";
import InmoContent from "./InmoContent";

export const metadata = generateMetadataFromContent({
  title: "Inmobiliaria 360",
  description: "Soluciones inmobiliarias integrales para todas tus necesidades",
  path: "/inmo360",
  keywords: ["servicios inmobiliarios", "360", "soluciones", "gestión"],
});

export default async function Page() {
  const clients = await getAllFromCustomPostType<Client>("clients", 12);
  const immo = await getAllFromCustomPostType<Inmo360>("inmo-360");

  return (
    <>
      {/* Hero Section */}
      <SectionHeader
        title="Soluciones Inmobiliarias 360"
        description="Te acompañamos en cada paso de tu proceso inmobiliario"
        // image="/soluciones-inmobiliarias-360.jpg"
        className="min-h-[500px]"
      />

      <Suspense fallback={<div>Cargando...</div>}>
        <InmoContent immo={immo} clients={clients} />
      </Suspense>
    </>
  );
}
