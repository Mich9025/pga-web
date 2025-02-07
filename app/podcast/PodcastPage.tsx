"use client";
import { Container, Section } from "@/components/craft";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePodcasts } from "@/hooks/usePodcasts";
import { PlayCircle } from "lucide-react";

export default function PodcastPage() {
  const { podcasts, isLoading, isError } = usePodcasts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading podcasts</div>;

  return (
    <>
      {/* New Episode Section */}
      <Section className="bg-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <h3 className="text-3xl font-medium">Nuevo Capítulo</h3>
            <div className="relative aspect-video bg-primary/10 rounded-lg flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-300" />
              <PlayCircle className="w-16 h-16 text-primary group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Previous Episodes */}
      <Section className="bg-secondary">
        <Container>
          <h3 className="text-3xl font-medium mb-12">Capítulos anteriores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((episode) => (
              <Card key={episode} className="bg-primary/5 border-none">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-primary/10 flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-300" />
                    <PlayCircle className="w-12 h-12 text-primary group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-2">Título {episode}</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Tabs defaultValue="youtube">
            <TabsList>
              <TabsTrigger value="youtube">YouTube</TabsTrigger>
              <TabsTrigger value="spotify">Spotify</TabsTrigger>
            </TabsList>

            <TabsContent value="youtube">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {podcasts?.youtube.map((episode: any) => (
                  <Card key={episode.id}>
                    <img
                      src={episode.snippet.thumbnails.high.url}
                      alt={episode.snippet.title}
                    />
                    <div className="p-4">
                      <h3>{episode.snippet.title}</h3>
                      <p>{episode.snippet.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="spotify">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {podcasts?.spotify.map((episode: any) => (
                  <Card key={episode.track.id}>
                    <img
                      src={episode.track.album.images[0].url}
                      alt={episode.track.name}
                    />
                    <div className="p-4">
                      <h3>{episode.track.name}</h3>
                      <p>{episode.track.artists[0].name}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Container>
      </Section>
    </>
  );
}
