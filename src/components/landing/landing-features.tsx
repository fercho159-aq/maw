"use client";

import AnimatedDiv from "@/components/animated-div";
import { getIcon } from "./icon-map";
import type { ServiceLanding } from "@/lib/landing-data";

type FeaturesData = NonNullable<ServiceLanding["features"]>;

export default function LandingFeatures({ data }: { data: FeaturesData }) {
  return (
    <section className="w-full py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedDiv className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Lo que incluye</p>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="text-foreground/70 md:text-lg">{data.subheading}</p>
          )}
        </AnimatedDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.cards.map((card, i) => {
            const Icon = getIcon(card.icon);
            return (
              <AnimatedDiv
                key={card.title}
                delay={i * 80}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5"
              >
                <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative inline-flex w-12 h-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 ring-1 ring-inset ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="relative font-semibold text-lg mb-2 text-foreground">{card.title}</h3>
                <p className="relative text-sm text-foreground/70 leading-relaxed">{card.description}</p>
              </AnimatedDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
