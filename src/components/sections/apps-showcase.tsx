import { FadeIn, Rule, SectionHeading } from "@/components/editorial";
import { cn } from "@/lib/utils";

type CaseLink = { label: string; url: string };

type AppCase = {
  id: string;
  client: string;
  discipline: string;
  title: string;
  description: string;
  videoUrl: string;
  startTime: number;
  links: CaseLink[];
  internal?: boolean;
};

const cases: AppCase[] = [
  {
    id: "partybus",
    client: "Party Cantaritos Bus",
    discipline: "Plataforma web",
    title: "Reservaciones y logística de transporte",
    description:
      "Plataforma web enfocada en reservaciones y logística de tickets de transporte.",
    videoUrl: "/videos/partybus.mp4",
    startTime: 4,
    links: [
      { label: "Visitar proyecto", url: "https://www.partycantaritosbus.com.mx/" },
    ],
  },
  {
    id: "yaakob",
    client: "Yaakob",
    discipline: "App nativa iOS y Android",
    title: "Mensajería y vinculación al SAT",
    description:
      "Aplicación móvil nativa para comunicación interna corporativa y operaciones con validación de identidad.",
    videoUrl: "/videos/mensajes.mp4",
    startTime: 3,
    links: [
      { label: "App Store", url: "https://apps.apple.com/mx/app/yaakob/id6758861392" },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.fernandotrejo.consultora&hl=es_MX",
      },
    ],
  },
  {
    id: "crm",
    client: "MAW Soluciones",
    discipline: "Sistema interno",
    title: "CRM y control financiero",
    description:
      "Sistema administrativo con dashboards financieros, control de pagos, reportes de ingresos y gastos, y seguimiento a saldos pendientes.",
    videoUrl: "/videos/crm maw.mp4",
    startTime: 5,
    links: [],
    internal: true,
  },
  {
    id: "mente-abundante",
    client: "Mente Abundante",
    discipline: "PWA de contenido",
    title: "Catálogo de contenido interactivo",
    description:
      "Aplicación web progresiva para consumo de contenido y exploración de catálogo interactivo.",
    videoUrl: "/videos/Mente abundante.mp4",
    startTime: 4,
    links: [
      { label: "Visitar proyecto", url: "https://mente-abundante-delta.vercel.app/" },
    ],
  },
];

/**
 * Casos de desarrollo de apps en registro editorial: fotograma estático del
 * producto con el tratamiento desaturado de EditorialImage, metadatos
 * cliente/disciplina en mono y título en serif, como en portfolio.tsx.
 */
export default function AppsShowcase() {
  return (
    <section className="border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
        <FadeIn>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <SectionHeading
                eyebrow="Casos"
                title="Desarrollos seleccionados"
                description="Ecosistemas digitales diseñados y desarrollados para nuestros clientes, documentados como casos de trabajo."
              />
            </div>
          </div>
        </FadeIn>

        <Rule className="my-16" />

        <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 lg:gap-x-20">
          {cases.map((item, index) => (
            <FadeIn
              key={item.id}
              delay={Math.min((index % 2) * 0.08, 0.24)}
              className={cn("group", index % 2 === 1 && "md:mt-24")}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-paper">
                <video
                  src={`${item.videoUrl}#t=${item.startTime}`}
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="h-full w-full object-cover saturate-[0.75]"
                />
              </div>
              <div className="mt-6 space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {item.client}
                  <span aria-hidden="true" className="mx-2 text-stone">
                    —
                  </span>
                  {item.discipline}
                </p>
                <h3 className="font-display text-2xl leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                {item.links.length > 0 ? (
                  <p className="flex flex-wrap gap-x-8 gap-y-2 pt-2">
                    {item.links.map((link) => (
                      <a
                        key={link.url + link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase tracking-[0.2em] text-primary"
                      >
                        <span className="border-b border-transparent pb-0.5 transition-colors duration-300 hover:border-primary">
                          {link.label}
                        </span>
                      </a>
                    ))}
                  </p>
                ) : item.internal ? (
                  <p className="pt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Sistema interno, sin acceso público
                  </p>
                ) : null}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
