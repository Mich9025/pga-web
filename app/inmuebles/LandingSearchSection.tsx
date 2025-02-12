"use client";

import { Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdPin } from "react-icons/io";
import { MdOutlineLocationSearching } from "react-icons/md";

export default function LandingSearchSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/inmuebles?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Container className="py-4 md:py-24 lg:py-48 flex flex-col gap-y-6 max-w-md mx-auto">
      <h2 className="py-8 text-3xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem]">
        Encuentra el espacio ideal
      </h2>
      <div className="flex flex-col gap-3">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <IoMdPin className="absolute left-4 top-3 mr-2 opacity-50 size-6" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ingresa una ubicación"
              className="pl-12 md:text-lg !rounded-full"
            />
            <Button
              type="submit"
              className={cn(
                "absolute right-1 inset-y-1 !h-10 md:text-lg !rounded-full transition-all duration-150 ease-in-out",
                searchQuery.trim() ? "opacity-100" : "!opacity-0"
              )}
              disabled={!searchQuery.trim()}
            >
              <span className="sr-only">Buscar</span>
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </form>
        <Button
          variant="outline"
          className="text-left justify-start md:text-lg !rounded-full"
          onClick={() => router.push("/inmuebles?view=map")}
        >
          <MdOutlineLocationSearching className="mr-2 opacity-50 size-5" />
          Usa mi ubicación actual
        </Button>
      </div>
    </Container>
  );
}
