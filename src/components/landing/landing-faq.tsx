"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn, SectionHeading } from "@/components/editorial";
import type { ServiceLanding } from "@/lib/landing-data";

type FaqData = NonNullable<ServiceLanding["faq"]>;

/**
 * Preguntas frecuentes en acordeón minimal: solo reglas horizontales,
 * sin cards ni fondos.
 */
export default function LandingFaq({ data }: { data: FaqData }) {
  return (
    <section className="w-full border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4">
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              title={data.heading}
              titleClassName="md:text-display-xs lg:text-display-xs"
            />
          </FadeIn>

          <FadeIn className="lg:col-span-7 lg:col-start-6">
            <Accordion type="single" collapsible className="w-full border-t border-border">
              {data.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="py-6 text-left text-base font-medium text-foreground hover:no-underline md:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
