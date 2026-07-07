"use client";

import Link from "next/link";
import { portfolioItems } from "@/lib/portfolio-data";
import {
  EditorialImage,
  FadeIn,
  Rule,
  SectionHeading,
} from "@/components/editorial";
import { cn } from "@/lib/utils";

const Portfolio = () => {
  const featuredItems = portfolioItems.slice(0, 3);

  return (
    <section id="portfolio" className="bg-muted py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
        <FadeIn>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <SectionHeading
                eyebrow="Casos"
                title="Trabajo seleccionado"
                description="Una muestra de los proyectos que hemos construido para empresas de distintos sectores. Cada caso documenta el contexto, la intervención y el resultado."
              />
            </div>
          </div>
        </FadeIn>

        <Rule className="my-16" />

        <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-12">
          {featuredItems.map((item, index) => (
            <FadeIn
              key={item.id}
              delay={index * 0.1}
              className={cn(
                "md:col-span-5",
                index === 1 && "md:col-start-8 md:mt-32",
                index === 2 && "md:col-start-3"
              )}
            >
              <Link href={`/portafolio/${item.id}`} className="group block">
                <EditorialImage
                  src={item.image?.imageUrl ?? "/images/placeholder.png"}
                  alt={item.title}
                  ratio="4:5"
                  sizes="(max-width: 768px) 100vw, 42vw"
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
                  <h3 className="font-display text-2xl leading-snug text-foreground md:text-3xl">
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

        <FadeIn className="mt-24">
          <Link
            href="/portafolio"
            className="font-mono text-xs uppercase tracking-[0.25em] text-foreground"
          >
            <span className="border-b border-border pb-1 transition-colors duration-300 hover:border-foreground">
              Ver todos los casos
            </span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};

export default Portfolio;
