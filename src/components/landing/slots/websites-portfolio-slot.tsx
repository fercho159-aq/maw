"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { portfolioItems, portfolioCategories, portfolioSectors } from "@/lib/portfolio-data";

/**
 * Carrusel filtrable de sitios web desarrollados. Slot bespoke para la landing
 * de "sitio-web". Self-contained: importa sus propios datos de portafolio.
 */
export default function WebsitesPortfolioSlot() {
  const [categoryFilter, setCategoryFilter] = useState<string>("Todos");
  const [sectorFilter, setSectorFilter] = useState<string>("Todos");

  const filtered = useMemo(() => {
    return portfolioItems.filter((item) => {
      const categoryMatch = categoryFilter === "Todos" || item.category === categoryFilter;
      const sectorMatch = sectorFilter === "Todos" || item.sector === sectorFilter;
      return categoryMatch && sectorMatch && item.image;
    });
  }, [categoryFilter, sectorFilter]);

  const autoplay = React.useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border" id="casos">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Casos de Éxito</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-3 text-foreground">Nuestros Sitios Web</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Filtra por categoría o sector y explora proyectos que hemos desarrollado.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["Todos", ...portfolioCategories].map((c) => (
            <Button
              key={c}
              variant={categoryFilter === c ? "default" : "outline"}
              onClick={() => setCategoryFilter(c)}
              size="sm"
              className="rounded-full"
            >
              {c}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["Todos", ...portfolioSectors].map((s) => (
            <Button
              key={s}
              variant={sectorFilter === s ? "default" : "outline"}
              onClick={() => setSectorFilter(s)}
              size="sm"
              className="rounded-full text-xs"
            >
              {s}
            </Button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="relative px-10 max-w-6xl mx-auto">
            <Carousel
              key={`${categoryFilter}-${sectorFilter}`}
              opts={{ align: "start", loop: true }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-3">
                {filtered.map((item) => (
                  <CarouselItem key={item.id} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                    <Link href={`/portafolio/${item.id}`} className="block group">
                      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                        <div className="relative aspect-video bg-muted overflow-hidden">
                          {item.image && (
                            <Image
                              src={item.image.imageUrl}
                              alt={item.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-sm truncate">{item.client}</h3>
                            <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">{item.category}</span>
                          </div>
                          <p className="text-xs text-foreground/60 mt-1 truncate">{item.sector}</p>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 -ml-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border-none h-10 w-10" />
              <CarouselNext className="right-0 -mr-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border-none h-10 w-10" />
            </Carousel>
          </div>
        ) : (
          <div className="text-center py-16 text-foreground/60">No hay proyectos con estos filtros.</div>
        )}
      </div>
    </section>
  );
}
