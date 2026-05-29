import { getIcon } from "./icon-map";
import AnimatedDiv from "@/components/animated-div";
import type { LandingTrustBar as LandingTrustBarData } from "@/lib/landing-data";

/**
 * Barra de confianza justo debajo del hero. Refuerza el message-match con el
 * anuncio (garantías, números, partners) para subir la tasa de conversión.
 */
export default function LandingTrustBar({ data }: { data: LandingTrustBarData }) {
  return (
    <section className="w-full bg-card border-b border-border">
      <div className="container mx-auto px-4 md:px-6 py-5">
        <AnimatedDiv className="flex flex-wrap items-center justify-center gap-y-3 divide-x divide-border/70">
          {data.items.map((item) => {
            const Icon = item.icon ? getIcon(item.icon) : null;
            return (
              <div
                key={item.label}
                className="group flex items-center gap-2 px-5 md:px-7 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {Icon && <Icon className="w-4 h-4 text-primary flex-shrink-0 transition-transform group-hover:scale-110" />}
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
            );
          })}
        </AnimatedDiv>
      </div>
    </section>
  );
}
