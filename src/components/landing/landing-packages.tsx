import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedDiv from "@/components/animated-div";
import { cn } from "@/lib/utils";
import type { ServiceLanding } from "@/lib/landing-data";

type PackagesData = NonNullable<ServiceLanding["packages"]>;

export default function LandingPackages({ data }: { data: PackagesData }) {
  return (
    <section id="planes" className="w-full py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedDiv className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Planes</p>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">
            {data.heading}
          </h2>
          {data.subheading && <p className="text-foreground/70 md:text-lg">{data.subheading}</p>}
        </AnimatedDiv>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {data.tiers.map((tier, i) => (
            <AnimatedDiv
              key={tier.id}
              delay={i * 100}
              variant="scale"
              className={cn(
                "relative flex flex-col rounded-3xl border bg-card p-8 transition-all duration-300",
                tier.highlight
                  ? "border-primary/50 ring-1 ring-primary/30 shadow-2xl shadow-primary/20 lg:scale-[1.04] bg-gradient-to-b from-primary/[0.06] to-transparent"
                  : "border-border/60 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
              )}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.15em] font-bold px-3.5 py-1 rounded-full shadow-lg shadow-primary/30 whitespace-nowrap">
                  Más Popular
                </div>
              )}
              <h3 className="font-headline text-xl font-bold text-foreground">{tier.name}</h3>
              <p className="text-sm text-foreground/60 mt-1">{tier.tagline}</p>

              <div className="mt-6 mb-2 flex items-end gap-1.5">
                <span className="font-headline text-4xl font-extrabold text-foreground">{tier.price}</span>
                {tier.priceNote && <span className="text-sm text-foreground/50 mb-1">{tier.priceNote}</span>}
              </div>
              {data.pricesArePlaceholder && (
                <p className="text-[11px] text-foreground/40 mb-4">Precio sujeto a cotización</p>
              )}

              <ul className="space-y-3 my-6 flex-grow">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <span className="mt-0.5 flex-shrink-0 rounded-full bg-primary/10 p-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={tier.highlight ? "default" : "outline"}
                className={cn(
                  "group/cta w-full font-semibold rounded-full",
                  tier.highlight && "shadow-lg shadow-primary/25"
                )}
              >
                <a href={tier.ctaHref ?? "#cotizar"}>
                  {tier.ctaLabel}
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover/cta:translate-x-1" />
                </a>
              </Button>
            </AnimatedDiv>
          ))}
        </div>

        {data.note && (
          <p className="text-center text-sm text-foreground/60 mt-8 max-w-2xl mx-auto">{data.note}</p>
        )}
      </div>
    </section>
  );
}
