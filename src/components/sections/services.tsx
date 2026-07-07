import Link from 'next/link';
import { FadeIn, SectionHeading } from '@/components/editorial';

const services = [
  {
    number: '01',
    title: 'Estrategia y contenido',
    description:
      'Dirección de canales, calendario editorial y piezas producidas en estudio propio. Contenido con criterio, no volumen.',
    href: '/servicios/redes-sociales',
  },
  {
    number: '02',
    title: 'Desarrollo web y aplicaciones',
    description:
      'Sitios, plataformas y aplicaciones móviles a la medida. Arquitectura sólida, rendimiento medible y mantenimiento continuo.',
    href: '/servicios/desarrollo-web',
  },
  {
    number: '03',
    title: 'ERP y automatización',
    description:
      'Sistemas de operación que ordenan inventario, ventas y administración. Menos hojas de cálculo, más control del negocio.',
    href: '/servicios/erp',
  },
  {
    number: '04',
    title: 'Producción audiovisual',
    description:
      'Podcast, video corporativo y fotografía en set profesional. Tres cámaras, audio de estudio y posproducción propia.',
    href: '/servicios/produccion-foto-video',
  },
];

/**
 * Servicios como lista editorial numerada con reglas horizontales.
 * Sin cards, sin carruseles, sin embeds.
 */
const Services = () => {
  return (
    <section id="servicios" className="bg-secondary py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-5">
            <FadeIn>
              <SectionHeading
                number="02"
                eyebrow="Servicios"
                title="Cuatro disciplinas, un mismo estándar."
                description="Cada servicio se contrata con alcance y entregables definidos. Sin paquetes genéricos."
              />
            </FadeIn>
          </div>
        </div>
        <div className="mt-20">
          {services.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.05}>
              <Link
                href={service.href}
                className="group block border-t border-stone/40 py-10 transition-colors duration-300 hover:bg-background/60 last:border-b last:border-stone/40"
              >
                <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-4 px-2 md:px-4">
                  <span className="col-span-12 font-mono text-xs tracking-[0.2em] text-primary md:col-span-1">
                    {service.number}
                  </span>
                  <h3 className="col-span-12 font-display text-3xl leading-tight text-foreground md:col-span-5 md:text-4xl">
                    {service.title}
                  </h3>
                  <p className="col-span-12 max-w-prose text-base leading-relaxed text-muted-foreground md:col-span-5">
                    {service.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="col-span-12 hidden text-right font-mono text-sm text-stone transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary md:col-span-1 md:block"
                  >
                    →
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
