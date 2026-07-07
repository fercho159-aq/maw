import { FadeIn, Rule } from "@/components/editorial";
import type { ServiceLanding } from "@/lib/landing-data";

type StatsData = NonNullable<ServiceLanding["stats"]>;

/**
 * Cifras del servicio en registro editorial: valor en serif display y
 * etiqueta en mono, separadas por reglas. Sin contadores animados ni brillos.
 */
export default function LandingStats({ data }: { data: StatsData }) {
  return (
    <section className="w-full border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        {data.heading && (
          <FadeIn className="mb-14 max-w-3xl">
            <h2 className="font-display text-3xl leading-[1.1] tracking-[-0.01em] text-foreground md:text-display-xs">
              {data.heading}
            </h2>
          </FadeIn>
        )}
        <FadeIn>
          <Rule />
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {data.items.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-border px-1 py-10 md:px-2"
              >
                <span className="block font-display text-4xl leading-none tracking-[-0.01em] text-foreground md:text-5xl">
                  {stat.value}
                </span>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
