import { getIcon } from "./icon-map";
import type { LandingTrustBar as LandingTrustBarData } from "@/lib/landing-data";

/**
 * Barra de confianza bajo el hero, en marquee infinito (se pausa al hover).
 * El movimiento constante mantiene la página "viva" e invita a seguir bajando.
 * Refuerza el message-match con el anuncio (garantías, números, partners).
 */
export default function LandingTrustBar({ data }: { data: LandingTrustBarData }) {
  const Item = ({ icon, label }: { icon?: string; label: string }) => {
    const Icon = icon ? getIcon(icon) : null;
    return (
      <div className="group flex items-center gap-2 px-6 md:px-9 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
        {Icon && (
          <Icon className="w-4 h-4 text-primary flex-shrink-0 transition-transform group-hover:scale-110" />
        )}
        <span className="whitespace-nowrap">{label}</span>
      </div>
    );
  };

  return (
    <section className="w-full bg-card border-b border-border overflow-hidden">
      <div
        className="maw-marquee relative py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        style={{ ["--marquee-duration" as string]: "36s" }}
      >
        <div className="maw-marquee-track">
          {/* Dos copias para loop continuo sin saltos */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {data.items.map((item) => (
                <Item key={`${copy}-${item.label}`} icon={item.icon} label={item.label} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
