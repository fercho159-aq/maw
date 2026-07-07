import { FadeIn, SectionHeading } from '@/components/editorial';

const appearances = [
  {
    id: 'UiALcGee76A',
    title: 'Cuáles son las mejores herramientas de IA',
    channel: 'Café Globo',
  },
  {
    id: 'HkH3jPY8BLs',
    title: 'Cómo es estudiar marketing en Argentina',
    channel: 'Los Dioses Responden',
  },
  {
    id: 'wt_4tLvl0Nc',
    title: 'Emprender a los 17 años',
    channel: 'Los Dioses Responden',
  },
  {
    id: '12m1NqG_3Is',
    title: 'Nizme Lleras en Marketing y Negocios',
    channel: 'MAW Podcast',
  },
  {
    id: '8E7BLrAY3JQ',
    title: 'Lucero Trejo en Marketing y Negocios',
    channel: 'MAW Podcast',
  },
];

/**
 * Apariciones en medios como índice editorial: canal en mono, título en
 * serif, enlace directo. Sin thumbnails ni botones de reproducción.
 */
export default function MediaMentions() {
  return (
    <section id="medios" className="bg-secondary py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <div className="col-span-12 lg:col-span-4">
            <FadeIn>
              <SectionHeading
                number="04"
                eyebrow="En los medios"
                title="Conversaciones públicas."
                description="Entrevistas y episodios donde compartimos cómo entendemos el marketing y los negocios."
              />
            </FadeIn>
          </div>
          <div className="col-span-12 lg:col-start-6 lg:col-span-7">
            {appearances.map((item, index) => (
              <FadeIn key={item.id} delay={index * 0.05}>
                <a
                  href={`https://www.youtube.com/watch?v=${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 border-t border-stone/40 py-7 md:flex-row md:items-baseline md:justify-between md:gap-8 last:border-b last:border-stone/40"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:w-56 md:shrink-0">
                    {item.channel}
                  </span>
                  <span className="flex-grow font-display text-xl text-foreground transition-colors duration-300 group-hover:text-primary md:text-2xl">
                    {item.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden font-mono text-sm text-stone transition-colors duration-300 group-hover:text-primary md:block"
                  >
                    ↗
                  </span>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
