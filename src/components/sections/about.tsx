import { FadeIn, Rule, SectionHeading } from '@/components/editorial';

const method = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Antes de proponer, entendemos. Auditamos operación, canales y datos para identificar dónde está el margen real de crecimiento.',
  },
  {
    number: '02',
    title: 'Plan',
    description:
      'Definimos alcance, entregables y métricas de éxito por escrito. Cada proyecto arranca con un plan que se puede auditar.',
  },
  {
    number: '03',
    title: 'Ejecución y medición',
    description:
      'Equipos propios de estrategia, desarrollo y producción ejecutan el plan. Reportamos avances contra las métricas acordadas, no contra impresiones.',
  },
];

/**
 * Statement de método: asimetría 5/6 columnas, números de sección en mono,
 * sin embeds ni efectos.
 */
export default function AboutSection() {
  return (
    <section id="nosotros" className="bg-background py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <FadeIn>
          <Rule className="mb-16" />
        </FadeIn>
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <div className="col-span-12 lg:col-span-5">
            <FadeIn>
              <SectionHeading
                number="01"
                eyebrow="Método"
                title="El crecimiento no se improvisa. Se diseña."
              />
            </FadeIn>
          </div>
          <div className="col-span-12 md:col-span-10 lg:col-start-7 lg:col-span-6">
            <FadeIn delay={0.1}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                MAW Soluciones es una consultora digital con equipo propio de
                estrategia, ingeniería y producción audiovisual. Trabajamos con
                empresas que necesitan un socio capaz de sostener la operación
                completa: del sistema que administra el negocio al contenido
                que lo representa.
              </p>
            </FadeIn>
            <div className="mt-16 space-y-0">
              {method.map((step, index) => (
                <FadeIn key={step.number} delay={0.1 + index * 0.05}>
                  <div className="border-t border-stone/40 py-8">
                    <div className="grid grid-cols-12 gap-x-6">
                      <span className="col-span-2 font-mono text-xs tracking-[0.2em] text-primary">
                        {step.number}
                      </span>
                      <div className="col-span-10">
                        <h3 className="font-display text-2xl text-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.25}>
              <a
                href="/brochures/presentacion-corporativa.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-8 inline-block font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
              >
                Presentación corporativa (PDF)
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
