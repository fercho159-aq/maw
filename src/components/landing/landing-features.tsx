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
                className="group rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{card.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{card.description}</p>
              </AnimatedDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
