import Link from 'next/link';
import { Eyebrow, FadeIn, Rule } from '@/components/editorial';

/**
 * Hero editorial: una sola afirmación en serif display sobre fondo ivory,
 * sub-línea corta y CTA "Agendar conversación". Sin video, sin carrusel,
 * sin slogans rotativos.
 */
const Hero = () => {
  return (
    <section id="home" className="bg-background">
      <div className="mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-center px-6 pb-20 pt-40 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-10">
            <FadeIn>
              <Eyebrow>Consultora digital — Ciudad de México</Eyebrow>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-10 font-display text-5xl leading-[1.02] tracking-[-0.02em] text-foreground sm:text-display-sm md:text-display-md lg:text-display-lg">
                Ingeniería y diseño para empresas que operan en serio.
              </h1>
            </FadeIn>
          </div>
          <div className="col-span-12 mt-12 md:col-span-7 lg:col-start-6 lg:col-span-5">
            <FadeIn delay={0.2}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Estrategia, desarrollo de software y producción de contenido
                para compañías que exigen método, criterio y resultados
                medibles.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <Link
                  href="/contacto"
                  className="inline-flex items-center bg-ink px-8 py-4 text-sm font-medium tracking-wide text-ivory transition-colors duration-300 hover:bg-charcoal"
                >
                  Agendar conversación
                </Link>
                <Link
                  href="#servicios"
                  className="link-underline font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
                >
                  Ver servicios
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
        <FadeIn delay={0.3} className="mt-auto pt-24">
          <Rule />
          <div className="mt-6 flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:justify-between">
            <span>Oficina — Xoco, Benito Juárez</span>
            <span>Estudio — Del Valle, Benito Juárez</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
