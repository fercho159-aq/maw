"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnimatedDiv from "@/components/animated-div";
import type { ServiceLanding } from "@/lib/landing-data";

type FaqData = NonNullable<ServiceLanding["faq"]>;

export default function LandingFaq({ data }: { data: FaqData }) {
  return (
    <section className="w-full py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <AnimatedDiv className="text-center mb-10">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            {data.heading}
          </h2>
        </AnimatedDiv>

        <AnimatedDiv>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {data.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b-0 rounded-2xl border border-border/60 bg-card px-5 transition-colors hover:border-primary/30 data-[state=open]:border-primary/40 data-[state=open]:bg-card/80"
              >
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline [&[data-state=open]>svg]:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedDiv>
      </div>
    </section>
  );
}
