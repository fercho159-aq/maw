import { FadeIn, Rule, SectionHeading } from "@/components/editorial";
import type { ServiceLanding } from "@/lib/landing-data";

type ProcessData = NonNullable<ServiceLanding["process"]>;

/**
 * Método de trabajo como secuencia editorial numerada: 01, 02, 03 en mono,
 * pasos separados por reglas de 1px. Sin cards ni sombras.
 */
export default function LandingProcess({ data }: { data: ProcessData }) {
  return (
    <section className="w-full border-t border-border bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4">
            <SectionHeading
              eyebrow="Método"
              title={data.heading}
              description={data.subheading}
              titleClassName="md:text-display-xs lg:text-display-xs"
            />
          </FadeIn>

          <div className="lg:col-span-7 lg:col-start-6">
            <Rule />
            {data.steps.map((step, i) => (
              <FadeIn key={step.step} delay={Math.min(i * 0.06, 0.3)}>
                <div className="grid gap-3 py-10 md:grid-cols-12 md:gap-6">
                  <span className="font-mono text-xs tracking-[0.2em] text-primary md:col-span-2 md:pt-1">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-foreground md:col-span-4 md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6 md:text-base">
                    {step.description}
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
