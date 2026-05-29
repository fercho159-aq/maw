"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { contentPortfolioItems } from "@/lib/portfolio-data";
import AdCalculator from "@/components/ad-calculator";
import StudioShowcase from "@/components/studio-showcase";

/**
 * Slot bespoke para la landing de publicidad/redes-sociales. Combina:
 *  - la calculadora de anuncios (lead-magnet principal)
 *  - el showcase del estudio (bono incluido en planes superiores)
 *  - el carrusel filtrable de contenido producido
 * Self-contained: importa sus propios datos.
 */
export default function AdvertisingSlot() {
  return (
    <>
      {/* CALCULADORA DE ANUNCIOS - LEAD MAGNET */}
      <section className="w-full py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-border" id="cotizador">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Calculadora gratuita</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">¿Cuánto deberías invertir en Ads?</h2>
            <p className="text-muted-foreground md:text-lg">
              Calcula tu presupuesto ideal y proyecta tus resultados en segundos.
            </p>
          </div>
          <AdCalculator />
        </div>
      </section>

      {/* BONO ESTUDIO */}
      <section className="w-full bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-6 pt-16 md:pt-20">
          <div className="max-w-4xl mx-auto text-center mb-4">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
              Incluido en Plan Negocios y Plan Empresa
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-3 text-foreground">Graba tu contenido en nuestro Estudio</h2>
            <p className="text-foreground/70 md:text-lg max-w-2xl mx-auto">
              Al contratar el Plan Negocios o el Plan Empresa puedes grabar tu contenido en nuestro set profesional: luces, micrófonos Rode/Hollyland, cámaras y 2 sets con ambientación diferente.
            </p>
          </div>
        </div>
        <StudioShowcase />
      </section>

      {/* CASOS DE ÉXITO - CONTENIDO */}
      <ContentSuccessCarousel />
    </>
  );
}

function ContentSuccessCarousel() {
  const [typeFilter, setTypeFilter] = useState<string>("Todos");
  const [sectorFilter, setSectorFilter] = useState<string>("Todos");

  const types = Array.from(new Set(contentPortfolioItems.map((i) => i.type)));
  const sectors = Array.from(new Set(contentPortfolioItems.map((i) => i.sector)));

  const filtered = contentPortfolioItems
    .filter((i) => {
      const typeMatch = typeFilter === "Todos" || i.type === typeFilter;
      const sectorMatch = sectorFilter === "Todos" || i.sector === sectorFilter;
      return typeMatch && sectorMatch && i.image;
    })
    .sort((a, b) => {
      const aReal = a.image?.imageUrl?.startsWith("/images/content/") ? 0 : 1;
      const bReal = b.image?.imageUrl?.startsWith("/images/content/") ? 0 : 1;
      return aReal - bReal;
    });

  const autoplay = React.useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border" id="casos">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Casos de Éxito</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-3 text-foreground">Contenido que Conecta</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Filtra por tipo o sector y explora el contenido que creamos para nuestros clientes.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["Todos", ...types].map((t) => (
            <Button
              key={t}
              variant={typeFilter === t ? "default" : "outline"}
              onClick={() => setTypeFilter(t)}
              size="sm"
              className="rounded-full"
            >
              {t}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["Todos", ...sectors].map((s) => (
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
              key={`${typeFilter}-${sectorFilter}`}
              opts={{ align: "start", loop: true }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-3">
                {filtered.map((item) => (
                  <CarouselItem key={item.id} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block group">
                      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                        <div className="relative aspect-square bg-muted overflow-hidden">
                          {item.image && (
                            <Image
                              src={item.image.imageUrl}
                              alt={item.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-sm truncate">{item.client}</h3>
                            <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">{item.type}</span>
                          </div>
                          <p className="text-xs text-foreground/60 mt-1 truncate">{item.sector}</p>
                        </div>
                      </div>
                    </a>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 -ml-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border-none h-10 w-10" />
              <CarouselNext className="right-0 -mr-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border-none h-10 w-10" />
            </Carousel>
          </div>
        ) : (
          <div className="text-center py-16 text-foreground/60">No hay casos con estos filtros.</div>
        )}
      </div>
    </section>
  );
}
