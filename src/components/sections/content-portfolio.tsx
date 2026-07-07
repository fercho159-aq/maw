"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contentPortfolioItems } from "@/lib/portfolio-data";
import {
  EditorialImage,
  FadeIn,
  Rule,
  SectionHeading,
} from "@/components/editorial";

const PAGE_SIZE = 6;

export default function ContentPortfolioSection() {
  const [contentSectorFilter, setContentSectorFilter] = useState<string>("Todos");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const allContentSectors = Array.from(
    new Set(contentPortfolioItems.map((item) => item.sector))
  );

  const filteredContentItems = contentPortfolioItems.filter((item) => {
    return (
      contentSectorFilter === "Todos" || item.sector === contentSectorFilter
    );
  });

  const displayedContentItems = filteredContentItems.slice(0, visibleCount);

  return (
    <section
      className="scroll-m-28 border-t border-border bg-background py-24 md:py-32"
      id="casos"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
        <FadeIn>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <SectionHeading
                eyebrow="Casos"
                title="Contenido que sostiene marcas"
                description="Producción de contenido para redes sociales: piezas que construyen presencia y autoridad digital para nuestros clientes."
              />
            </div>
          </div>
        </FadeIn>

        <Rule className="my-16" />

        <FadeIn>
          <div className="w-full sm:max-w-xs">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Sector
            </p>
            <Select
              value={contentSectorFilter}
              onValueChange={setContentSectorFilter}
            >
              <SelectTrigger className="w-full rounded-none border-0 border-b border-border bg-transparent px-0 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                {allContentSectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FadeIn>

        {displayedContentItems.length > 0 ? (
          <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
            {displayedContentItems.map((item) => (
              <FadeIn key={item.id} className="group">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <EditorialImage
                    src={item.image?.imageUrl ?? "/images/placeholder.png"}
                    alt={item.title}
                    ratio="4:5"
                    sizes="(max-width: 768px) 100vw, 30vw"
                    imgClassName="transition-[filter] duration-500 group-hover:saturate-100"
                  />
                  <div className="mt-6 space-y-3">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {item.client}
                      <span aria-hidden="true" className="mx-2 text-stone">
                        —
                      </span>
                      {item.type}
                    </p>
                    <h3 className="font-display text-2xl leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                      <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-primary">
                        Ver contenido
                      </span>
                    </p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-base text-muted-foreground">
              No hay casos que correspondan a los filtros seleccionados.
            </p>
          </div>
        )}

        {visibleCount < filteredContentItems.length && (
          <div className="mt-20 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="border border-border px-10 py-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:border-foreground"
            >
              Ver más casos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
