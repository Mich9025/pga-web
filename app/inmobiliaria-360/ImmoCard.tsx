"use client";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import { Inmo360 } from "@/lib/wordpress.d";
import Link from "next/link";

export const ImmoCard = ({ inmo }: { inmo: Inmo360 }) => {
  const { slug, featured_image_url, title, content } = inmo;

  return (
    <Card className="group relative bg-primary text-primary-foreground overflow-hidden lg:p-6 border-none hover:shadow-lg">
      <Link
        href={`/inmobiliaria-360?s=${slug}#inmo-360`}
        scroll={false}
        onClick={() => {
          setTimeout(() => {
            document
              .getElementById("inmo-360")
              ?.scrollIntoView({ behavior: "instant" });
          }, 2000);
        }}
      >
        <Image
          src={String(featured_image_url)}
          alt={title.rendered}
          className="absolute inset-0 transform scale-100 group-hover:scale-110 group-hover:opacity-40 opacity-70 object-cover w-full h-full transition-all duration-150 ease-in-out"
          width={470}
          height={688}
        />
        <CardContent className="flex flex-col  aspect-[6/10] items-start justify-center p-6 relative z-10">
          <h2 className="text-lg md:text-2xl font-semibold flex-none">
            {title.rendered}
          </h2>
          <div className="flex grow flex-col items-center justify-center">
            <div
              dangerouslySetInnerHTML={{
                __html: content.rendered,
              }}
              className="text-sm md:text-xl font-semibold transform translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 hover:duration-75 ease-in-out"
            />
          </div>
          <span className="font-semibold flex-none">Leer más</span>
        </CardContent>
      </Link>
    </Card>
  );
};
