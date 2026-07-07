import StudioCalculator from "@/components/studio-calculator";
import StudioShowcase from "@/components/studio-showcase";
import { FadeIn, SectionHeading } from "@/components/editorial";

type PodcastCase = {
  id: string;
  title: string;
  channel: string;
  production: "Media" | "Profesional";
};

/** Episodios reales producidos o grabados en el estudio. */
const podcastPortfolio: PodcastCase[] = [
  {
    id: "cd_MGBD3b-U",
    title: "Marketing médico digital, con Aldo Trejo de MAW",
    channel: "Los Dioses del Marketing",
    production: "Profesional",
  },
  {
    id: "S13NIPE0pds",
    title: "Cómo quitar manchas sin dañar la piel, con la Dra. Karen Carrillo",
    channel: "Marco Antonio Regil",
    production: "Profesional",
  },
  {
    id: "PCpC2HvWpD0",
    title: "Mi secreto de cuidado con la tecnología",
    channel: "The K Effect",
    production: "Profesional",
  },
  {
    id: "oBBEbKS9jvE",
    title: "Esmeralda Pimentel: haciendo y deshaciendo personajes",
    channel: "Alfonso Pineda Ulloa",
    production: "Profesional",
  },
  {
    id: "5zCCobJDZpA",
    title: "Planes privados de retiro, con Hablemos de Finanzas",
    channel: "Martin Bursátil",
    production: "Media",
  },
  {
    id: "6GOePvmHmDY",
    title: "Diablos Rojos del México, con su presidente Othón Díaz",
    channel: "Martin Bursátil",
    production: "Media",
  },
  {
    id: "U4Bl7rNYexk",
    title: "Infonavit y Cofinavit: cómo aprovechar el crédito",
    channel: "Compra Fácil",
    production: "Media",
  },
  {
    id: "IvoOc_W5JSI",
    title: "Todos me miran, pero nadie se me acerca",
    channel: "Speakeasy",
    production: "Media",
  },
  {
    id: "vtnC1IoCOTA",
    title: "Giovanna Venegas en Marketing y Negocios",
    channel: "MAW Podcast",
    production: "Media",
  },
];

/**
 * Slot bespoke para la landing de podcast: showcase del estudio, cotizador
 * en tiempo real e índice editorial de episodios producidos. Self-contained.
 */
export default function PodcastSlot() {
  return (
    <>
      {/* ESTUDIO */}
      <StudioShowcase />

      {/* COTIZADOR */}
      <section
        className="w-full border-y border-border bg-secondary py-24 md:py-32"
        id="cotizador"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
          <FadeIn>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <SectionHeading
                  eyebrow="Herramienta"
                  title="Cotizador de estudio"
                  description="Calcule el costo de su producción según formato, duración y horario, en tiempo real."
                />
              </div>
            </div>
          </FadeIn>
          <div className="mt-16">
            <StudioCalculator />
          </div>
        </div>
      </section>

      {/* EPISODIOS PRODUCIDOS */}
      <section
        className="scroll-m-28 border-t border-border bg-background py-24 md:py-32"
        id="casos"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-12 gap-x-6 gap-y-16">
            <div className="col-span-12 lg:col-span-4">
              <FadeIn>
                <SectionHeading
                  eyebrow="Casos"
                  title="Episodios producidos en el estudio."
                  description="Programas y entrevistas grabados con nuestros dos niveles de producción."
                />
              </FadeIn>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              {podcastPortfolio.map((item, index) => (
                <FadeIn key={item.id} delay={Math.min(index * 0.05, 0.3)}>
                  <a
                    href={`https://www.youtube.com/watch?v=${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-2 border-t border-stone/40 py-7 last:border-b last:border-stone/40 md:flex-row md:items-baseline md:justify-between md:gap-8"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:w-52 md:shrink-0">
                      {item.channel}
                    </span>
                    <span className="flex-grow font-display text-xl text-foreground transition-colors duration-300 group-hover:text-primary md:text-2xl">
                      {item.title}
                    </span>
                    <span className="flex shrink-0 items-baseline gap-4 font-mono text-xs uppercase tracking-[0.2em] text-stone">
                      Producción {item.production}
                      <span
                        aria-hidden="true"
                        className="hidden text-sm transition-colors duration-300 group-hover:text-primary md:inline"
                      >
                        ↗
                      </span>
                    </span>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
