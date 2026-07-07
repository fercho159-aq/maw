import Link from 'next/link';
import { Eyebrow, FadeIn } from '@/components/editorial';

/**
 * Cierre de la home: invitación a conversar sobre fondo ink, datos de
 * contacto como colofón editorial. Sin formulario largo.
 */
const Contact = () => {
  return (
    <section id="contacto" className="bg-ink py-32 text-ivory md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-9">
            <FadeIn>
              <Eyebrow number="06" className="text-ivory/60">
                Contacto
              </Eyebrow>
              <h2 className="mt-10 font-display text-4xl leading-[1.05] tracking-[-0.015em] text-ivory md:text-display-sm lg:text-display-md">
                Los proyectos serios empiezan con una conversación.
              </h2>
              <p className="mt-8 max-w-prose text-lg leading-relaxed text-ivory/70">
                Cuéntenos qué necesita resolver su empresa. Respondemos con un
                diagnóstico honesto, no con una lista de precios.
              </p>
              <Link
                href="/contacto"
                className="mt-12 inline-flex items-center bg-ivory px-8 py-4 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:bg-paper"
              >
                Agendar conversación
              </Link>
            </FadeIn>
          </div>
        </div>
        <FadeIn delay={0.15}>
          <hr className="mt-28 h-px w-full border-0 bg-ivory/20" />
          <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ivory/50">
                Oficina
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ivory/80">
                Av. Popocatépetl 474, Xoco,
                <br />
                Benito Juárez, 03330, CDMX
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ivory/50">
                Estudio
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ivory/80">
                Cda. Felix Cuevas 13, Tlacoquemecatl del Valle,
                <br />
                Benito Juárez, 03200, CDMX
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ivory/50">
                Directo
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ivory/80">
                <a
                  href="mailto:aldo@mawsoluciones.com"
                  className="transition-colors duration-300 hover:text-ivory"
                >
                  aldo@mawsoluciones.com
                </a>
                <br />
                <a
                  href="tel:+525541314150"
                  className="transition-colors duration-300 hover:text-ivory"
                >
                  55 4131 4150
                </a>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Contact;
