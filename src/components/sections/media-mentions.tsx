
import AnimatedDiv from '@/components/animated-div';
import { Play, Youtube } from 'lucide-react';
import Image from 'next/image';

const interviews = [
  {
    id: "UiALcGee76A",
    title: "¿Cuáles son las mejores herramientas de IA?",
    channel: "Café Globo",
  },
  {
    id: "HkH3jPY8BLs",
    title: "¿Cómo es estudiar marketing en Argentina?",
    channel: "Los Dioses Responden",
  },
  {
    id: "wt_4tLvl0Nc",
    title: "Emprender a los 17 años",
    channel: "Los Dioses Responden",
  },
  {
    id: "12m1NqG_3Is",
    title: "Nizme Lleras en Marketing y Negocios",
    channel: "MAW Podcast",
  },
  {
    id: "8E7BLrAY3JQ",
    title: "Lucero Trejo en Marketing y Negocios",
    channel: "MAW Podcast",
  },
];

export default function MediaMentions() {
  return (
    <section className="py-16 md:py-24 bg-card border-y">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedDiv className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            En los medios
          </p>
          <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight mb-4 hover:text-[#ffe28a] hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] transition-colors duration-500 cursor-default">
            Hablan de Nosotros
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Entrevistas, podcasts y apariciones en medios donde compartimos nuestra visión del marketing digital y los negocios.
          </p>
        </AnimatedDiv>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {interviews.map((video, i) => (
            <AnimatedDiv key={video.id}>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden bg-background shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-video">
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-medium text-primary mb-1.5 flex items-center gap-1.5">
                    <Youtube className="w-3.5 h-3.5" />
                    {video.channel}
                  </p>
                  <p className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </p>
                </div>
              </a>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
