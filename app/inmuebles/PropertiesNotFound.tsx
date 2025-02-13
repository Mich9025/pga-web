"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LuArrowRight, LuHouse } from "react-icons/lu";

export function PropertiesNotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center mx-auto py-24">
      <LuHouse className="size-24 text-primary/70 stroke-1" />
      <span className="text-xl font-semibold">
        No encontramos propiedades con los criterios de búsqueda
      </span>
      <Button
        variant="outline"
        className="text-left justify-start md:text-lg !rounded-full group transition-all duration-150 ease-in-out relative"
        onClick={() => router.push("/inmuebles")}
        size="sm"
      >
        <span className="grow pl-1.5 mr-2">Remover filtros</span>
        <LuArrowRight className="mr-2 size-5 ml-auto transform duration-100 ease-in-out opacity-0 group-hover:opacity-50 -translate-x-2 group-hover:translate-x-0" />
      </Button>
    </div>
  );
}
