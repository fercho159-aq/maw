import { FadeIn, Rule, SectionHeading } from "@/components/editorial";
import type { ServiceLanding } from "@/lib/landing-data";

type PackagesData = NonNullable<ServiceLanding["packages"]>;

/**
 * Alcances de trabajo: columnas tipográficas separadas por reglas, sin
 * badges ni jerarquías de venta agresivas. El alcance recomendado se señala
 * con una nota discreta en mono.
 */
export default function LandingPackages({ data }: { data: PackagesData }) {
  return (
    <section
      id="planes"
      className="w-full border-t border-border bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <FadeIn className="max-w-3xl">
          <SectionHeading
            eyebrow="Alcances de trabajo"
            title={data.heading}
            description={data.subheading}
            titleClassName="md:text-display-xs lg:text-display-xs"
          />
        </FadeIn>

        <div className="mt-16 grid gap-14 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-border">
          {data.tiers.map((tier, i) => (
            <FadeIn
              key={tier.id}
              delay={Math.min(i * 0.08, 0.24)}
              className="flex flex-col lg:px-10 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="flex min-h-6 items-baseline justify-between gap-4">
                <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {tier.highlight && (
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                    Recomendado
                  </span>
                )}
              </div>

              <h3 className="mt-6 font-display text-2xl text-foreground md:text-3xl">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tier.tagline}
              </p>

              <div className="mt-8">
                <span className="font-display text-3xl tracking-[-0.01em] text-foreground">
                  {tier.price}
                </span>
                {tier.priceNote && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    {tier.priceNote}
                  </span>
                )}
                {data.pricesArePlaceholder && (
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Inversión sujeta a propuesta
                  </p>
                )}
              </div>

              <Rule className="mt-8" />
              <ul className="flex-grow">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="border-b border-border py-4 text-sm leading-relaxed text-foreground/80"
                  >
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <a
                  href={tier.ctaHref ?? "#cotizar"}
                  className="link-underline text-sm font-medium text-foreground"
                >
                  {tier.ctaLabel}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        {data.note && (
          <FadeIn>
            <p className="mt-16 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {data.note}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
