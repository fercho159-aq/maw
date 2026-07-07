import { Eyebrow, FadeIn, Rule, SectionHeading } from "@/components/editorial";
import type { LandingQualification as LandingQualificationData } from "@/lib/landing-data";

/**
 * Bloque de calificación: "para ti / no es para ti". Filtra prospectos no
 * ideales antes del formulario. Presentado como dos columnas tipográficas
 * con reglas, sin cards ni iconos de color.
 */
export default function LandingQualification({
  data,
}: {
  data: LandingQualificationData;
}) {
  const Column = ({
    label,
    items,
    muted,
  }: {
    label: string;
    items: string[];
    muted?: boolean;
  }) => (
    <div>
      <Eyebrow>{label}</Eyebrow>
      <Rule className="mt-4" />
      <ul>
        {items.map((item) => (
          <li
            key={item}
            className={`border-b border-border py-5 text-sm leading-relaxed md:text-base ${
              muted ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="w-full border-t border-border bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <FadeIn className="max-w-3xl">
          <SectionHeading
            eyebrow="Encaje"
            title={data.heading}
            description={data.subheading}
            titleClassName="md:text-display-xs lg:text-display-xs"
          />
        </FadeIn>

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-20">
          <FadeIn>
            <Column label="Es para ti si" items={data.forYou} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <Column label="No es para ti si" items={data.notForYou} muted />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
