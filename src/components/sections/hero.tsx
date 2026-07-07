import Link from 'next/link';
import { EditorialImage, Eyebrow, FadeIn, Rule } from '@/components/editorial';

/**
 * Hero editorial: spread asimétrico — afirmación en serif display a la
 * izquierda, fotografía de estudio propio a la derecha con pie de foto en
 * mono. Sin carrusel, sin slogans rotativos.
 */
const Hero = () => {
  return (
    <section id="home" className="bg-background">
      <div className="mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-center px-6 pb-16 pt-36 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 items-center gap-x-6 gap-y-16">
          <div className="col-span-12 lg:col-span-7">
            <FadeIn>
              <Eyebrow>Consultora digital — Ciudad de México</Eyebrow>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-10 font-display text-5xl leading-[1.02] tracking-[-0.02em] text-foreground sm:text-display-sm md:text-display-md">
                Ingeniería y diseño para empresas que operan{' '}
                <em className="italic">en serio</em>.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-10 max-w-lg text-lg leading-relaxed text-muted-foreground">
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

          <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <FadeIn delay={0.25}>
              <EditorialImage
                src="/images/studio/set-principal.jpg"
                alt="Sesión de podcast a dos cámaras en el estudio de MAW Soluciones"
                ratio="4:5"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                imgClassName="saturate-[0.6]"
              />
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Sesión en estudio propio — Del Valle
              </p>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.3} className="pt-20">
          <Rule />
          <div className="mt-6 flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:justify-between">
            <span>Oficina — Xoco, Benito Juárez</span>
            <span>Estrategia · Desarrollo · Producción</span>
            <span>Estudio — Del Valle, Benito Juárez</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
