import { Eyebrow, FadeIn, EditorialImage } from "@/components/editorial";
import type { LandingHero as LandingHeroData } from "@/lib/landing-data";

/**
 * Hero editorial de landing de servicio: eyebrow mono con el nombre del
 * servicio, titular en serif display y CTAs sobrios. La media (si existe)
 * se muestra como pieza editorial bajo el texto, desaturada.
 */
export default function LandingHero({ data }: { data: LandingHeroData }) {
  const isExternal = (href: string) => href.startsWith("http");

  return (
    <section className="w-full border-b border-border bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-36 md:px-12 md:pb-32 md:pt-44 lg:px-16">
        <FadeIn>
          <Eyebrow>{data.eyebrow}</Eyebrow>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mt-8 max-w-5xl font-display text-4xl leading-[1.08] tracking-[-0.015em] sm:text-5xl md:text-display-sm lg:text-display-md">
            {/* "\n" en el título fuerza salto de línea (solo en pantallas anchas). */}
            {data.title.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br className="hidden md:block" />}
                {i > 0 && " "}
                {line}
              </span>
            ))}
          </h1>
        </FadeIn>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <FadeIn delay={0.2} className="md:col-span-7 lg:col-span-6">
            <p className="max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
              {data.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={data.primaryCta.href}
                className="inline-flex items-center bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-background transition-colors hover:bg-foreground/85"
              >
                {data.primaryCta.label}
              </a>
              {data.secondaryCta && (
                <a
                  href={data.secondaryCta.href}
                  {...(isExternal(data.secondaryCta.href)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="link-underline text-sm font-medium text-foreground"
                >
                  {data.secondaryCta.label}
                </a>
              )}
              {data.brochures?.map((b) => (
                <a
                  key={b.href}
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {b.label}
                </a>
              ))}
            </div>

            {data.ctaNote && (
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {data.ctaNote}
              </p>
            )}
          </FadeIn>
        </div>

        {data.media && (
          <FadeIn delay={0.3} className="mt-20 md:mt-24">
            {data.media.type === "video" ? (
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-secondary md:aspect-[21/9]">
                <video
                  src={data.media.src}
                  poster={data.media.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover saturate-[0.6]"
                />
              </div>
            ) : (
              <EditorialImage
                src={data.media.src}
                alt={data.eyebrow}
                ratio="3:2"
                sizes="(max-width: 768px) 100vw, 1400px"
                className="md:aspect-[21/9]"
              />
            )}
          </FadeIn>
        )}
      </div>
    </section>
  );
}
