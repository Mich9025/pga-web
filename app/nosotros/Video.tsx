"use client";

import { Container, Section } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Link from "next/link";

import ReactPlayer from "react-player";

export const Video = () => {
  return (
    <Section className="bg-background">
      <Container className="flex flex-col justify-center items-center gap-6">
        {/* <h2 className="text-3xl font-medium">Video PGA</h2> */}
        <div className="relative aspect-video bg-primary/10 rounded-lg flex items-center justify-center group cursor-pointer max-w-6xl mx-auto w-full overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-300" />
          <PlayCircle className="w-16 h-16 text-primary group-hover:scale-110 transition-all duration-300" />
          <div className="absolute inset-0">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=hBwWUb3Q2xI"
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1, // Reduces but doesn't remove YouTube branding
                    controls: 0, // Hides controls
                    rel: 0, // Disables related videos
                    showinfo: 0, // Hides video title and uploader
                    iv_load_policy: 3, // Disables annotations
                  },
                },
              }}
            />
          </div>
        </div>
        <Link
          href="https://pga.com.co/wp-content/uploads/BROCHURE-ISARCO.pdf"
          target="_blank"
        >
          <Button className="w-fit">Descargar Brochure</Button>
        </Link>
      </Container>
    </Section>
  );
};
