import { Check, X } from "lucide-react";
import AnimatedDiv from "@/components/animated-div";
import type { LandingQualification as LandingQualificationData } from "@/lib/landing-data";

/**
 * Bloque de calificación: "para ti / no es para ti". Filtra prospectos no
 * ideales antes del formulario, mejorando la calidad del lead en campañas de
 * Google Ads (baja el CPL efectivo).
 */
export default function LandingQualification({
  data,
}: {
  data: LandingQualificationData;
}) {
  return (
    <section className="w-full py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedDiv className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">
            ¿Es para ti?
          </p>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="text-foreground/70 md:text-lg">{data.subheading}</p>
          )}
        </AnimatedDiv>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <AnimatedDiv variant="left" className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-b from-primary/[0.07] to-card p-8 shadow-lg shadow-primary/5">
            <div className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
            <h3 className="relative font-headline text-lg font-bold text-foreground mb-5">
              Esto es para ti si…
            </h3>
            <ul className="relative space-y-3.5">
              {data.forYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm md:text-base text-foreground/80">
                  <span className="mt-0.5 flex-shrink-0 rounded-full bg-primary/10 p-1">
                    <Check className="w-4 h-4 text-primary" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedDiv>

          <AnimatedDiv variant="right" delay={100} className="rounded-3xl border border-border/60 bg-card p-8">
            <h3 className="font-headline text-lg font-bold text-foreground mb-5">
              Quizá no es para ti si…
            </h3>
            <ul className="space-y-3.5">
              {data.notForYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm md:text-base text-foreground/60">
                  <span className="mt-0.5 flex-shrink-0 rounded-full bg-muted p-1">
                    <X className="w-4 h-4 text-foreground/40" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
}
