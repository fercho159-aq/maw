"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  portfolioItems,
  portfolioCategories,
  portfolioSectors,
} from "@/lib/portfolio-data";
import {
  EditorialImage,
  FadeIn,
  Rule,
  SectionHeading,
} from "@/components/editorial";
import { cn } from "@/lib/utils";

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

function WebsitePortfolioContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "Todos";
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory);
  const [sectorFilter, setSectorFilter] = useState<string>("Todos");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setCategoryFilter(cat);
    }
  }, [searchParams]);

  const filteredItems = portfolioItems.filter((item) => {
    const categoryMatch =
      categoryFilter === "Todos" || item.category === categoryFilter;
    const sectorMatch = sectorFilter === "Todos" || item.sector === sectorFilter;
    return categoryMatch && sectorMatch;
  });

  const displayedItems = filteredItems.slice(0, visibleCount);

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
                title="Sitios web que hemos construido"
                description="Una selección de proyectos de diseño y desarrollo web, documentados como casos de trabajo."
              />
            </div>
          </div>
        </FadeIn>

        <Rule className="my-16" />

        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <FilterField
              label="Disciplina"
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={portfolioCategories}
            />
            <FilterField
              label="Sector"
              value={sectorFilter}
              onChange={setSectorFilter}
              options={portfolioSectors}
            />
          </div>
        </FadeIn>

        {displayedItems.length > 0 ? (
          <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 lg:gap-x-20">
            {displayedItems.map((item, index) => (
              <FadeIn
                key={item.id}
                className={cn("group", index % 2 === 1 && "md:mt-24")}
              >
                <Link href={`/portafolio/${item.id}`} className="block">
                  <EditorialImage
                    src={item.image?.imageUrl ?? "/images/placeholder.png"}
                    alt={item.title}
                    ratio="4:5"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    imgClassName="transition-[filter] duration-500 group-hover:saturate-100"
                  />
                  <div className="mt-6 space-y-3">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {item.client}
                      <span aria-hidden="true" className="mx-2 text-stone">
                        —
                      </span>
                      {item.category}
                    </p>
                    <h3 className="font-display text-2xl leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                      <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-primary">
                        Ver caso
                      </span>
                    </p>
                  </div>
                </Link>
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

        {visibleCount < filteredItems.length && (
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

export default function WebsitePortfolioSection() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-muted-foreground">
          Cargando casos…
        </div>
      }
    >
      <WebsitePortfolioContent />
    </Suspense>
  );
}
