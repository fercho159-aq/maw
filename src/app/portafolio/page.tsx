"use client";

import Link from "next/link";
import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  contentPortfolioItems,
} from "@/lib/portfolio-data";
import { EditorialImage, Eyebrow, FadeIn, Rule } from "@/components/editorial";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

type CaseCardProps = {
  href: string;
  external?: boolean;
  imageUrl?: string;
  imageAlt: string;
  client: string;
  discipline: string;
  title: string;
  index: number;
};

function CaseCard({
  href,
  external,
  imageUrl,
  imageAlt,
  client,
  discipline,
  title,
  index,
}: CaseCardProps) {
  const inner = (
    <>
      {imageUrl ? (
        <EditorialImage
          src={imageUrl}
          alt={imageAlt}
          ratio="4:5"
          sizes="(max-width: 768px) 100vw, 45vw"
          imgClassName="transition-[filter] duration-500 group-hover:saturate-100"
        />
      ) : (
        <div className="aspect-[4/5] bg-muted" />
      )}
      <div className="mt-6 space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {client}
          <span aria-hidden="true" className="mx-2 text-stone">
            —
          </span>
          {discipline}
        </p>
        <h3 className="font-display text-2xl leading-snug text-foreground md:text-3xl">
          {title}
        </h3>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-primary">
            Ver caso
          </span>
        </p>
      </div>
    </>
  );

  const className = cn("group block", index % 2 === 1 && "md:mt-24");

  if (external) {
    return (
      <FadeIn className={className}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      </FadeIn>
    );
  }

  return (
    <FadeIn className={className}>
      <Link href={href}>{inner}</Link>
    </FadeIn>
  );
}

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

function ViewSwitch({
  view,
  onChange,
}: {
  view: "websites" | "content";
  onChange: (view: "websites" | "content") => void;
}) {
  const options: { value: "websites" | "content"; label: string }[] = [
    { value: "websites", label: "Sitios web" },
    { value: "content", label: "Contenido" },
  ];

  return (
    <div className="flex gap-10">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "border-b pb-2 font-mono text-xs uppercase tracking-[0.25em] transition-colors duration-300",
            view === option.value
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-24 text-center">
      <p className="text-base text-muted-foreground">
        No hay casos que correspondan a los filtros seleccionados.
      </p>
    </div>
  );
}

function LoadMore({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-20 text-center">
      <button
        type="button"
        onClick={onClick}
        className="border border-border px-10 py-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:border-foreground"
      >
        Ver más casos
      </button>
    </div>
  );
}

function CasesPageContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "content" ? "content" : "websites";
  const initialCategory = searchParams.get("category") || "Todos";

  const [view, setView] = useState<"websites" | "content">(defaultTab);
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory);
  const [sectorFilter, setSectorFilter] = useState<string>("Todos");
  const [contentSectorFilter, setContentSectorFilter] = useState<string>("Todos");
  const [websitesVisible, setWebsitesVisible] = useState<number>(PAGE_SIZE);
  const [contentVisible, setContentVisible] = useState<number>(PAGE_SIZE);

  const filteredItems = portfolioItems.filter((item) => {
    const categoryMatch =
      categoryFilter === "Todos" || item.category === categoryFilter;
    const sectorMatch = sectorFilter === "Todos" || item.sector === sectorFilter;
    return categoryMatch && sectorMatch;
  });

  const allContentSectors = Array.from(
    new Set(contentPortfolioItems.map((item) => item.sector))
  );

  const filteredContentItems = contentPortfolioItems.filter((item) => {
    return (
      contentSectorFilter === "Todos" || item.sector === contentSectorFilter
    );
  });

  const visibleItems = filteredItems.slice(0, websitesVisible);
  const visibleContentItems = filteredContentItems.slice(0, contentVisible);

  return (
    <>
      <FadeIn>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-8 lg:col-span-7">
            <Eyebrow number="01">Trabajo</Eyebrow>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-[-0.015em] text-foreground md:text-display-md">
              Casos
            </h1>
            <p className="mt-8 max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
              Una selección del trabajo que hemos realizado para empresas de
              distintos sectores: plataformas digitales, comercio electrónico y
              contenido que sostiene la presencia de cada marca.
            </p>
          </div>
        </div>
      </FadeIn>

      <Rule className="my-16" />

      <FadeIn>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <ViewSwitch view={view} onChange={setView} />
          {view === "websites" ? (
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
          ) : (
            <FilterField
              label="Sector"
              value={contentSectorFilter}
              onChange={setContentSectorFilter}
              options={allContentSectors}
            />
          )}
        </div>
      </FadeIn>

      <div className="mt-20">
        {view === "websites" ? (
          <>
            {visibleItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 lg:gap-x-20">
                {visibleItems.map((item, index) => (
                  <CaseCard
                    key={item.id}
                    href={`/portafolio/${item.id}`}
                    imageUrl={item.image?.imageUrl}
                    imageAlt={item.title}
                    client={item.client}
                    discipline={item.category}
                    title={item.title}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
            {websitesVisible < filteredItems.length && (
              <LoadMore
                onClick={() => setWebsitesVisible((v) => v + PAGE_SIZE)}
              />
            )}
          </>
        ) : (
          <>
            {visibleContentItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 lg:gap-x-20">
                {visibleContentItems.map((item, index) => (
                  <CaseCard
                    key={item.id}
                    href={item.url}
                    external
                    imageUrl={item.image?.imageUrl}
                    imageAlt={item.title}
                    client={item.client}
                    discipline={item.type}
                    title={item.title}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
            {contentVisible < filteredContentItems.length && (
              <LoadMore
                onClick={() => setContentVisible((v) => v + PAGE_SIZE)}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

const PortfolioPage = () => {
  return (
    <div className="bg-background">
      <section className="py-24 md:py-36">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
          <Suspense
            fallback={
              <p className="text-muted-foreground">Cargando casos…</p>
            }
          >
            <CasesPageContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
