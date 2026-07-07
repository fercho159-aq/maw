import { EditorialImage, FadeIn, Rule, SectionHeading } from "@/components/editorial";

type SolutionCase = {
  title: string;
  description: string;
  steps: string[];
  tags: string[];
};

/** Flujo del caso destacado (autoservicio con IoT), como secuencia numerada. */
const flowSteps: string[] = [
  "Reserva",
  "Paga en línea",
  "Recibe su QR",
  "La puerta se abre",
  "Agua y shampoo",
  "Listo",
];

const cases: SolutionCase[] = [
  {
    title: "Reportes que se descargan solos",
    description:
      "Robots bajan a diario los reportes de cada portal de proveedor.",
    steps: [
      "El robot entra al portal con sus credenciales",
      "Descarga ventas e inventario en Excel",
      "Consolida y entrega la información cada mañana",
    ],
    tags: ["RPA", "Excel"],
  },
  {
    title: "Ventas ordenadas por WhatsApp",
    description:
      "Bandeja unificada, leads asignados de forma automática y KPIs por vendedor.",
    steps: [
      "Cada mensaje entra a una bandeja unificada",
      "El lead se asigna al vendedor que corresponde",
      "Pipeline y KPIs se actualizan en tiempo real",
    ],
    tags: ["WhatsApp", "Pipeline"],
  },
  {
    title: "Bot que da seguimiento a pendientes",
    description:
      "Telegram recuerda a cada encargado lo suyo y avisa los cortes.",
    steps: [
      "Cada encargado da de alta sus pendientes",
      "El bot recuerda cada mañana lo que vence",
      "Avisa los cortes por cliente con su checklist",
    ],
    tags: ["Telegram", "Recordatorios"],
  },
  {
    title: "IA que analiza documentos fiscales",
    description: "Lee oficios del SAT contra 46 leyes y jurisprudencias.",
    steps: [
      "Se sube el oficio o resolución (PDF)",
      "La IA lo cruza contra leyes y jurisprudencias",
      "Entrega plazos, montos y vías de defensa",
    ],
    tags: ["IA", "Fiscal MX"],
  },
  {
    title: "Logística con seguimiento",
    description:
      "Rutas, estados de envío y control de entregas desde un panel.",
    steps: [
      "Se registra la carga y su ruta",
      "Cada estado se actualiza desde el panel",
      "Entregas confirmadas y reportes por perfil",
    ],
    tags: ["Tracking", "Roles"],
  },
  {
    title: "Apps con identidad biométrica",
    description: "Apps iOS y Android publicadas en las tiendas.",
    steps: [
      "El usuario se registra en la app",
      "Valida su identidad con biometría",
      "Opera mensajería empresarial segura",
    ],
    tags: ["Apps nativas", "Biometría"],
  },
];

export default function ErpSolutionsSlot() {
  return (
    <section className="w-full border-y border-border bg-secondary py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
        <FadeIn>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <SectionHeading
                eyebrow="Casos"
                title="Sistemas a la medida de cada operación"
                description="Una muestra de soluciones que hoy están en producción. Cada una resuelve un proceso concreto de la operación que la usa."
              />
            </div>
          </div>
        </FadeIn>

        {/* CASO DESTACADO */}
        <FadeIn className="mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Caso destacado
            <span aria-hidden="true" className="mx-2 text-stone">
              —
            </span>
            Autoservicio con IoT
          </p>
          <h3 className="mt-4 font-display text-2xl leading-snug text-foreground md:text-3xl">
            Lavado de mascotas que opera sin personal
          </h3>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-6">
            {flowSteps.map((label, i) => (
              <div key={label} className="border-t border-stone/40 pt-4">
                <span className="font-mono text-xs tracking-[0.2em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm leading-snug text-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-prose text-sm leading-relaxed text-muted-foreground">
            Un QR de un solo uso controla puerta, agua, shampoo y toalla. El
            propietario administra la operación completa desde un panel.
          </p>
        </FadeIn>

        <Rule className="my-20" />

        {/* EL PRODUCTO EN PANTALLA */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
          <FadeIn>
            <EditorialImage
              src="/images/studio/crm-bandeja.png"
              alt="Bandeja unificada del CRM: conversaciones de WhatsApp por vendedor con asignación automática"
              ratio="16:9"
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="border border-border"
              imgClassName="saturate-100"
            />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              CRM de ventas — bandeja unificada de WhatsApp con asignación
              automática
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <EditorialImage
              src="/images/studio/reportes-cadenas.jpg"
              alt="Dashboard de reportes consolidados: ventas e inventario por cadena y top de productos por EAN"
              ratio="16:9"
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="border border-border"
              imgClassName="saturate-100"
            />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Consolidado multi-cadena — ventas, inventario y top de productos
              por EAN
            </p>
          </FadeIn>
        </div>

        <Rule className="my-20" />

        {/* GRILLA DE CASOS */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <FadeIn key={c.title} delay={Math.min(i * 0.05, 0.3)}>
              <div className="flex h-full flex-col border-t border-stone/40 pt-6">
                <span className="font-mono text-xs tracking-[0.2em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl text-foreground">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
                <ol className="mt-6 space-y-2.5">
                  {c.steps.map((step, j) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-sm leading-snug text-foreground/80"
                    >
                      <span className="shrink-0 pt-0.5 font-mono text-xs text-stone">
                        {j + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-auto pt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {c.tags.join(" · ")}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-20 text-center">
          <a
            href="#cotizar"
            className="inline-block border border-border px-10 py-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:border-foreground"
          >
            Cotizar una solución
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
