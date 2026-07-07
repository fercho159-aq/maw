import { FadeIn, SectionHeading } from '@/components/editorial';

// Atribuciones anonimizadas por confidencialidad (cargo + tipo de empresa).
// Al contar con autorización del cliente, sustituir por cargo y empresa
// reales ("Directora de Marketing, [Empresa]").
const testimonials = [
  {
    quote:
      'Grabamos seis capítulos de nuestro podcast en su estudio. La calidad de video y audio quedó impecable, y el proceso fue tan ordenado como esperábamos.',
    attribution: 'Dirección de Comunicación',
    context: 'Producción de podcast, firma de servicios',
  },
  {
    quote:
      'Desarrollaron nuestro ecommerce con pasarela de pago, migraron el catálogo completo y capacitaron al equipo. El sitio es rápido y la relación, transparente.',
    attribution: 'Dirección General',
    context: 'Desarrollo de ecommerce, comercio minorista',
  },
  {
    quote:
      'Llevan cuatro meses a cargo de nuestros canales. El contenido producido en su estudio elevó de forma visible la percepción de la marca.',
    attribution: 'Dirección de Marketing',
    context: 'Estrategia de contenido, marca de consumo',
  },
];

/**
 * Prueba social curada: tres citas en serif, atribución en mono.
 * Sin carrusel, sin estrellas, sin branding de terceros.
 *
 * Nota de sistema: el serif display en el blockquote es una excepción
 * editorial deliberada (pull-quote), igual que las cifras de landing-stats
 * y los precios de landing-packages; no es un heading pero sí un elemento
 * display de la retícula.
 */
const Testimonials = () => {
  return (
    <section id="clientes" className="bg-background py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-5">
            <FadeIn>
              <SectionHeading
                number="03"
                eyebrow="Clientes"
                title="Lo que dicen quienes ya trabajan con nosotros."
              />
            </FadeIn>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-16">
          {testimonials.map((testimonial, index) => (
            <FadeIn
              key={testimonial.context}
              delay={index * 0.08}
              className="col-span-12 md:col-span-4"
            >
              <figure className="flex h-full flex-col border-t border-stone/40 pt-8">
                <blockquote className="flex-grow font-display text-xl leading-snug text-foreground md:text-2xl">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {testimonial.attribution}
                  <span className="mt-1 block text-stone">
                    {testimonial.context}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
