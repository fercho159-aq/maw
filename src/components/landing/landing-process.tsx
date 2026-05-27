"use client";

import AnimatedDiv from "@/components/animated-div";
import type { ServiceLanding } from "@/lib/landing-data";

type ProcessData = NonNullable<ServiceLanding["process"]>;

export default function LandingProcess({ data }: { data: ProcessData }) {
  return (
    <section className="w-full py-20 md:py-28 bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedDiv className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Proceso</p>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">
            {data.heading}
          </h2>
          {data.subheading && <p className="text-foreground/70 md:text-lg">{data.subheading}</p>}
        </AnimatedDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {data.steps.map((step, i) => (
            <AnimatedDiv key={step.step} delay={i * 100} className="relative">
              <div className="rounded-2xl border border-border/60 bg-background p-7 h-full">
                <div className="font-headline text-5xl font-extrabold text-primary/20 mb-3">
                  {String(step.step).padStart(2, "0")}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{step.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{step.description}</p>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
