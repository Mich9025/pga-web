import { Container, Section } from "@/components/craft";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-4xl font-bold mb-4">
            404 - Página no encontrada
          </h1>
          <p className="mb-8">
            Lo sentimos, la página que estás buscando no existe.
          </p>
          <Button asChild className="not-prose mt-6">
            <Link href="/">Regresar al inicio</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
