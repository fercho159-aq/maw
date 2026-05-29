"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import StudioCalculator from "@/components/studio-calculator";
import StudioShowcase from "@/components/studio-showcase";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const podcastPortfolio = [
  { id: 1, title: "Podcast Media 1", quality: "Media", youtubeUrl: "https://www.youtube.com/embed/5zCCobJDZpA" },
  { id: 6, title: "Podcast Profesional 1", quality: "Profesional", youtubeUrl: "https://www.youtube.com/embed/S13NIPE0pds" },
  { id: 2, title: "Podcast Media 2", quality: "Media", youtubeUrl: "https://www.youtube.com/embed/6GOePvmHmDY" },
  { id: 7, title: "Podcast Profesional 2", quality: "Profesional", youtubeUrl: "https://www.youtube.com/embed/PCpC2HvWpD0" },
  { id: 3, title: "Podcast Media 3", quality: "Media", youtubeUrl: "https://www.youtube.com/embed/U4Bl7rNYexk" },
  { id: 8, title: "Podcast Profesional 3", quality: "Profesional", youtubeUrl: "https://www.youtube.com/embed/oBBEbKS9jvE" },
  { id: 4, title: "Podcast Media 4", quality: "Media", youtubeUrl: "https://www.youtube.com/embed/IvoOc_W5JSI" },
  { id: 9, title: "Podcast Profesional 4", quality: "Profesional", youtubeUrl: "https://www.youtube.com/embed/cd_MGBD3b-U" },
  { id: 5, title: "Podcast Media 5", quality: "Media", youtubeUrl: "https://www.youtube.com/embed/vtnC1IoCOTA" },
];

/**
 * Slot bespoke para la landing de podcast: showcase del estudio, cotizador de
 * estudio en tiempo real y carrusel filtrable de casos de éxito.
 * Self-contained.
 */
export default function PodcastSlot() {
  const [qualityFilter, setQualityFilter] = useState("Todas");

  const filteredPortfolio =
    qualityFilter === "Todas"
      ? podcastPortfolio
      : podcastPortfolio.filter((p) => p.quality === qualityFilter);

  return (
    <>
      {/* STUDIO CAROUSEL */}
      <StudioShowcase />

      {/* COTIZADOR */}
      <section className="w-full py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-border" id="cotizador">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">Cotizador de Estudio</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">Calcula el costo de tu proyecto y horario en tiempo real con nuestra herramienta.</p>
          </div>
          <StudioCalculator />
        </div>
      </section>

      {/* PORTAFOLIO */}
      <section className="py-20 md:py-28 bg-background border-t border-border scroll-m-28" id="casos">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4">Casos de Éxito Podcast</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">Explora nuestro trabajo categorizado por nivel de producción.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Todas", "Media", "Profesional"].map((category) => (
              <Button
                key={category}
                variant={qualityFilter === category ? "default" : "outline"}
                onClick={() => setQualityFilter(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="max-w-6xl mx-auto relative px-8 md:px-16">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {filteredPortfolio.map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/2">
                    <div className="p-2">
                      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                        <div className="aspect-video w-full bg-muted relative">
                          <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={item.youtubeUrl}
                            title={item.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div className="p-6 flex flex-col items-center text-center">
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-3">
                            {item.quality}
                          </div>
                          <h3 className="font-headline font-bold text-xl">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {filteredPortfolio.length > 2 && (
                <>
                  <CarouselPrevious className="left-0 bg-primary/10 hover:bg-primary text-primary hover:text-white" />
                  <CarouselNext className="right-0 bg-primary/10 hover:bg-primary text-primary hover:text-white" />
                </>
              )}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
}
