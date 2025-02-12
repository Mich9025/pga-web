import { SectionHeader } from "@/components/header/SectionHeader";
import { generateMetadataFromContent } from "@/lib/metadata";
import { getAllFromCustomPostType } from "@/lib/wordpress";
import { Podcast } from "@/lib/wordpress.d";

import { Container, Section } from "@/components/craft";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import { FaSpotify, FaYoutube } from "react-icons/fa";
export const metadata = generateMetadataFromContent({
  title: "Podcast: Entre Muros y Sueños",
  description: "Escucha nuestro podcast sobre el mercado inmobiliario",
  path: "/podcast",
  keywords: ["podcast", "audio", "entrevistas", "mercado inmobiliario"],
});

export default async function Page() {
  const podcasts = await getAllFromCustomPostType<Podcast>("podcast");
  const latestPodcast = podcasts[0];
  return (
    <>
      <SectionHeader
        title="Podcast"
        description="Entre Muros y Sueños"
        // image="/soluciones-inmobiliarias-360.jpg"
      />

      {/* <PodcastPage /> */}

      <Section className="bg-background">
        <Container className="text-center">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h3 className="text-2xl font-bold md:text-4xl lg:text-5xl">
              Nuevo Capítulo
            </h3>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal">
              {latestPodcast.title.rendered}
            </h2>

            <div className="relative aspect-video bg-primary/10 rounded-lg flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-300" />
              <PlayCircle className="w-16 h-16 text-primary group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-12 mx-auto items-center justify-center">
            {" "}
            <div className="text-sm">
              {latestPodcast.youtube_url && (
                <Link
                  href={latestPodcast.youtube_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-bold"
                >
                  <FaYoutube className="size-6 text-primary" />
                  <span>Ver en YouTube</span>
                </Link>
              )}
              {latestPodcast.spotify_url && (
                <Link
                  href={latestPodcast.spotify_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-bold"
                >
                  <FaSpotify className="size-6 text-primary" />
                  <span>Escuchar en Spotify</span>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Previous Episodes */}
      <Section className="bg-secondary text-center">
        <Container>
          <h3 className="text-3xl font-bold md:text-4xl lg:text-5xl mb-12">
            Capítulos anteriores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((episode) => (
              <Card
                key={`podcast-${episode.id}`}
                className="bg-primary/5 border-none"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-primary/90 flex items-center justify-center group cursor-pointer rounded-t-lg">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-300" />
                    <PlayCircle className="w-12 h-12 text-primary-foreground group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-xl md:text-2xl mb-3">
                      {episode.title.rendered}
                    </h4>
                    <div className="text-base grid md:grid-cols-2 gap-2">
                      {episode.youtube_url && (
                        <Link
                          href={episode.youtube_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 font-bold"
                        >
                          <FaYoutube className="size-6 text-primary" />
                          <span>Ver en YouTube</span>
                        </Link>
                      )}
                      {episode.spotify_url && (
                        <Link
                          href={episode.spotify_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 font-bold"
                        >
                          <FaSpotify className="size-6 text-primary" />
                          <span>Escuchar en Spotify</span>
                        </Link>
                      )}
                    </div>
                    {/* <p className="text-sm text-muted-foreground">
                      {episode.content.rendered}
                    </p> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
