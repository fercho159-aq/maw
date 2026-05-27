import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/service-landing";
import { getLandingData, buildMetadata } from "@/lib/landing-data";
import AutomationCalculator from "@/components/automation-calculator";

export const metadata: Metadata = buildMetadata("automatizacion");

export default function Page() {
  return (
    <ServiceLanding
      data={getLandingData("automatizacion")!}
      slot={
        <section className="py-20 md:py-28 bg-card border-t border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold">Diagnóstico de Automatización</h2>
              <p className="mt-4 text-lg text-foreground/80">
                Responde unas breves preguntas y descubre el potencial de ahorro de tiempo para tu negocio.
              </p>
            </div>
            <AutomationCalculator />
          </div>
        </section>
      }
    />
  );
}
