import { generateMetadataFromContent } from "@/lib/metadata";

export const metadata = generateMetadataFromContent({
  title: "Servicios",
  description: "Servicios de PGA",
  path: "/proyectos",
  keywords: ["proyectos", "PGA", "diseño", "arquitectura", "inmobiliaria"],
});

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h1>Servicios</h1>
    </div>
  );
}
