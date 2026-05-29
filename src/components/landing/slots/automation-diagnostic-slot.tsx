"use client";

import DataAutomationCalculator from "@/components/data-automation-calculator";

/**
 * Slot bespoke para la landing de automatización-y-desarrollo: diagnóstico
 * interactivo de automatización de datos (lead-magnet). Self-contained.
 */
export default function AutomationDiagnosticSlot() {
  return (
    <section className="py-20 md:py-28 bg-card border-y border-border" id="cotizador">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Diagnóstico gratuito</p>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">Diagnóstico de Automatización de Datos</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Responde a este breve cuestionario para descubrir tu potencial de automatización y cómo podemos ayudarte.
          </p>
        </div>
        <DataAutomationCalculator />
      </div>
    </section>
  );
}
