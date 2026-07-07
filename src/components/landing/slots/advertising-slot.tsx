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
import AdCalculator from "@/components/ad-calculator";
import StudioShowcase from "@/components/studio-showcase";
import {
  EditorialImage,
  FadeIn,
  Rule,
  SectionHeading,
} from "@/components/editorial";

/**
 * Slot bespoke para la landing de publicidad/redes-sociales. Combina:
 *  - la calculadora de presupuesto publicitario
 *  - el estudio de grabación incluido en planes superiores
 *  - la grilla filtrable de contenido producido
 * Self-contained: importa sus propios datos.
 */
export default function AdvertisingSlot() {
  return (
    <>
      {/* CALCULADORA DE PRESUPUESTO */}
      <section
        className="w-full border-y border-border bg-secondary py-24 md:py-32"
        id="cotizador"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
          <FadeIn>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <SectionHeading
                  eyebrow="Herramienta"
                  title="Cuánto conviene invertir en anuncios"
                  description="Proyecte el presupuesto publicitario adecuado para su operación y los resultados que puede esperar de esa inversión."
                />
              </div>
            </div>
          </FadeIn>
          <div className="mt-16">
            <AdCalculator />
          </div>
        </div>
      </section>

      {/* ESTUDIO DE GRABACIÓN */}
      <section className="w-full border-t border-border bg-background">
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 pt-24 md:px-12 md:pb-20 md:pt-32 lg:px-16">
          <FadeIn>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <SectionHeading
                  eyebrow="Estudio"
                  title="Grabación en nuestro estudio"
                  description="La producción del contenido puede realizarse en nuestro set: iluminación, micrófonos Rode y Hollyland, cámaras y dos ambientaciones distintas."
                />
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Incluido en planes Negocios y Empresa
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
        <StudioShowcase />
      </section>

      {/* CASOS DE CONTENIDO */}
      <ContentCasesGrid />
    </>
  );
}

const PAGE_SIZE = 6;

function FilterField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="w-full sm:max-w-xs">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full rounded-none border-0 border-b border-border bg-transparent px-0 focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Todos">Todos</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function ContentCasesGrid() {
  const [typeFilter, setTypeFilter] = useState<string>("Todos");
  const [sectorFilter, setSectorFilter] = useState<string>("Todos");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const types = Array.from(new Set(contentPortfolioItems.map((i) => i.type)));
  const sectors = Array.from(
    new Set(contentPortfolioItems.map((i) => i.sector))
  );

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

  const displayed = filtered.slice(0, visibleCount);

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
                title="Contenido producido para clientes"
                description="Una selección de piezas para redes sociales, documentadas por tipo y sector."
              />
            </div>
          </div>
        </FadeIn>

        <Rule className="my-16" />

        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <FilterField
              label="Tipo"
              value={typeFilter}
              onChange={setTypeFilter}
              options={types}
            />
            <FilterField
              label="Sector"
              value={sectorFilter}
              onChange={setSectorFilter}
              options={sectors}
            />
          </div>
        </FadeIn>

        {displayed.length > 0 ? (
          <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
            {displayed.map((item) => (
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
                    ratio="1:1"
                    sizes="(max-width: 768px) 100vw, 45vw"
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

        {visibleCount < filtered.length && (
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
