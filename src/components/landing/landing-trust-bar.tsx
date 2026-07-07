import type { LandingTrustBar as LandingTrustBarData } from "@/lib/landing-data";

/**
 * Línea de compromisos bajo el hero: fila estática en mono, sin marquee ni
 * iconos. Mantiene el message-match con el anuncio en un registro sobrio.
 */
export default function LandingTrustBar({ data }: { data: LandingTrustBarData }) {
  return (
    <section className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-8 md:px-12 lg:px-16">
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {data.items.map((item) => (
            <li
              key={item.label}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
