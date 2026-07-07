import { FadeIn, Rule, SectionHeading } from "@/components/editorial";
import type { ServiceLanding } from "@/lib/landing-data";

type FeaturesData = NonNullable<ServiceLanding["features"]>;

/**
 * Alcance del servicio como lista tipográfica editorial: número en mono,
 * título y descripción separados por reglas de 1px. Sin cards ni iconos.
 */
export default function LandingFeatures({ data }: { data: FeaturesData }) {
  return (
    <section className="w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4">
            <SectionHeading
              eyebrow="Qué incluye"
              title={data.heading}
              description={data.subheading}
              titleClassName="md:text-display-xs lg:text-display-xs"
            />
          </FadeIn>

          <div className="lg:col-span-7 lg:col-start-6">
            <Rule />
            {data.cards.map((card, i) => (
              <FadeIn key={card.title} delay={Math.min(i * 0.06, 0.3)}>
                <div className="grid gap-3 py-8 md:grid-cols-12 md:gap-6">
                  <span className="font-mono text-xs tracking-[0.2em] text-primary md:col-span-2 md:pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-foreground md:col-span-4 md:text-2xl">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6 md:text-base">
                    {card.description}
                  </p>
                </div>
                <Rule />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
