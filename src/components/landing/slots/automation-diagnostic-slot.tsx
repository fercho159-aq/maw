import DataAutomationCalculator from "@/components/data-automation-calculator";
import { FadeIn, SectionHeading } from "@/components/editorial";

/**
 * Slot bespoke para la landing de automatización-y-desarrollo: diagnóstico
 * interactivo de automatización de datos. Self-contained.
 */
export default function AutomationDiagnosticSlot() {
  return (
    <section
      className="w-full border-y border-border bg-secondary py-24 md:py-32"
      id="cotizador"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
        <FadeIn>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <SectionHeading
                eyebrow="Diagnóstico"
                title="Diagnóstico de automatización de datos"
                description="Seis preguntas para dimensionar qué procesos de su operación conviene automatizar."
              />
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Sin costo · Sin compromiso
              </p>
            </div>
          </div>
        </FadeIn>
        <div className="mt-16">
          <DataAutomationCalculator />
        </div>
      </div>
    </section>
  );
}
