import { FadeIn, Rule, SectionHeading } from "@/components/editorial";
import { cn } from "@/lib/utils";

const WHATSAPP_URL =
  "https://wa.me/5633774723?text=" +
  encodeURIComponent(
    "Hola, me interesa conversar sobre un desarrollo a la medida."
  );

type CaseLink = { label: string; url: string };

type CaseProject = {
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

const projects: CaseProject[] = [
  {
    id: "partybus",
    client: "Party Cantaritos Bus",
    discipline: "Plataforma web",
    title: "Reservaciones y logística de transporte",
    description:
      "Plataforma web enfocada en reservaciones, venta y logística de tickets de transporte.",
    videoUrl: "/videos/partybus.mp4",
    startTime: 4,
    links: [
      { label: "Visitar proyecto", url: "https://www.partycantaritosbus.com.mx/" },
    ],
  },
  {
    id: "peliculas",
    client: "Mente Abundante",
    discipline: "PWA de contenido",
    title: "Plataforma de películas interactivas",
    description:
      "Aplicación web progresiva para consumo de películas interactivas y exploración de catálogo.",
    videoUrl: "/videos/Mente abundante.mp4",
    startTime: 4,
    links: [
      { label: "Visitar proyecto", url: "https://mente-abundante-delta.vercel.app/" },
    ],
  },
  {
    id: "crm-maw",
    client: "MAW Soluciones",
    discipline: "Sistema interno",
    title: "CRM de operación",
    description:
      "Dashboard interno para administración de procesos y seguimiento metódico de tareas.",
    videoUrl: "/videos/crm maw.mp4",
    startTime: 5,
    links: [],
    internal: true,
  },
  {
    id: "crm-brooklyn",
    client: "Brooklyn",
    discipline: "Sistema de operaciones",
    title: "CRM a la medida",
    description:
      "Sistema de operaciones diseñado para reemplazar tareas repetitivas y reducir tiempos administrativos.",
    videoUrl: "/videos/brooklyn.mp4",
    startTime: 4,
    links: [],
    internal: true,
  },
  {
    id: "yaakob-id",
    client: "Yaakob",
    discipline: "App nativa iOS y Android",
    title: "Validación de identidad biométrica",
    description:
      "Aplicación móvil nativa enfocada en validación de identidad biométrica.",
    videoUrl: "/videos/yakob.mp4",
    startTime: 4,
    links: [
      { label: "App Store", url: "https://apps.apple.com/mx/app/yaakob/id6758861392" },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.fernandotrejo.consultora&hl=es_MX",
      },
    ],
  },
  {
    id: "yaakob-chat",
    client: "Yaakob",
    discipline: "Mensajería empresarial",
    title: "Comunicación interna y vinculación al SAT",
    description:
      "Plataforma empresarial que combina comunicación interna corporativa y vinculación al SAT.",
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
];

const queConstruimos = [
  "Aplicaciones web a la medida",
  "Apps nativas para Android e iOS",
  "CRMs y dashboards empresariales",
];

const entregables = [
  "Código fuente completo y documentado",
  "Documentación técnica y de usuario",
  "Despliegue y configuración en producción",
  "APIs conectadas y funcionales",
  "Soporte posterior a la entrega",
];

/**
 * Marco fijo con fotograma estático del proyecto: mismo tratamiento
 * desaturado de EditorialImage, sin autoplay ni chrome de dispositivo.
 */
function CaseFrame({ project }: { project: CaseProject }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-paper">
      <video
        src={`${project.videoUrl}#t=${project.startTime}`}
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        className="h-full w-full object-cover saturate-[0.75]"
      />
    </div>
  );
}

/**
 * Alcance y casos de desarrollo a la medida en registro editorial.
 * Los precios viven en el bloque de alcances de la landing (LandingPackages);
 * aquí solo método, entregables y trabajo documentado.
 */
export default function CustomDevShowcase() {
  return (
    <div className="w-full">
      {/* Alcance */}
      <section className="border-t border-border bg-background py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-6">
            <div className="md:col-span-5">
              <FadeIn>
                <SectionHeading
                  eyebrow="Desarrollo a la medida"
                  title="Software construido sobre la operación real"
                  description="Aplicaciones web, apps nativas y sistemas internos diseñados a partir del proceso de cada empresa. El alcance y la inversión se definen por escrito tras un diagnóstico técnico."
                />
              </FadeIn>
              <FadeIn className="mt-12 flex flex-col gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline w-fit text-sm font-medium text-foreground"
                >
                  Agendar conversación
                </a>
                <a
                  href="/brochures/apps-y-desarrollo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  Ver brochure (PDF)
                </a>
              </FadeIn>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <FadeIn>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Qué construimos
                </p>
                <ul className="mt-4">
                  {queConstruimos.map((item) => (
                    <li
                      key={item}
                      className="border-b border-border py-4 text-sm leading-relaxed text-foreground/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn className="mt-14">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Entregables
                </p>
                <ul className="mt-4">
                  {entregables.map((item) => (
                    <li
                      key={item}
                      className="border-b border-border py-4 text-sm leading-relaxed text-foreground/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Casos */}
      <section className="border-t border-border bg-muted py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
          <FadeIn>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <SectionHeading
                  eyebrow="Casos"
                  title="Trabajo seleccionado en software"
                  description="Proyectos de desarrollo a la medida documentados como casos de trabajo: plataformas web, apps nativas y sistemas internos."
                />
              </div>
            </div>
          </FadeIn>

          <Rule className="my-16" />

          <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 lg:gap-x-20">
            {projects.map((project, index) => (
              <FadeIn
                key={project.id}
                delay={Math.min((index % 2) * 0.08, 0.24)}
                className={cn("group", index % 2 === 1 && "md:mt-24")}
              >
                <CaseFrame project={project} />
                <div className="mt-6 space-y-3">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {project.client}
                    <span aria-hidden="true" className="mx-2 text-stone">
                      —
                    </span>
                    {project.discipline}
                  </p>
                  <h3 className="font-display text-2xl leading-snug text-foreground">
                    {project.title}
                  </h3>
                  <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  {project.links.length > 0 ? (
                    <p className="flex flex-wrap gap-x-8 gap-y-2 pt-2">
                      {project.links.map((link) => (
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
                  ) : project.internal ? (
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
    </div>
  );
}
