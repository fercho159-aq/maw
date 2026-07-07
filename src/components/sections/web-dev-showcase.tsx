import { FadeIn, SectionHeading } from "@/components/editorial";
import WebsitePortfolioSection from "./website-portfolio";

const WHATSAPP_URL =
  "https://wa.me/5633774723?text=" +
  encodeURIComponent(
    "Hola, me interesa conversar sobre el desarrollo de un sitio web."
  );

const tiposDeProyecto = [
  "Landing pages orientadas a conversión",
  "Sitios corporativos e institucionales",
  "Tiendas de comercio electrónico",
  "Catálogos digitales de producto",
];

const entregables = [
  "Optimización de velocidad y Core Web Vitals",
  "SEO técnico y metaetiquetas configuradas",
  "Diseño responsivo para móvil, tablet y escritorio",
  "Interfaz alineada a la identidad de la marca",
  "Despliegue y dominio configurados en producción",
  "Soporte posterior a la entrega",
];

/**
 * Alcance de desarrollo web en registro editorial: listas tipográficas con
 * reglas finas y una grilla de casos reutilizada de website-portfolio.
 * Sin precios en titulares, sin carruseles autoplay ni banners de venta.
 */
export default function WebDevShowcase() {
  return (
    <div className="w-full">
      <section className="border-t border-border bg-background py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-6">
            <div className="md:col-span-5">
              <FadeIn>
                <SectionHeading
                  eyebrow="Desarrollo web"
                  title="Qué construimos y qué entregamos"
                  description="Sitios diseñados y desarrollados a la medida, con estándares técnicos verificables y un alcance definido por escrito antes de comenzar."
                />
              </FadeIn>
              <FadeIn className="mt-12 flex flex-col gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline w-fit text-sm font-medium text-foreground"
                >
                  Agendar conversación
                </a>
                <a
                  href="/brochures/sitio-web.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  Ver brochure (PDF)
                </a>
              </FadeIn>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <FadeIn>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Tipos de proyecto
                </p>
                <ul className="mt-4">
                  {tiposDeProyecto.map((item) => (
                    <li
                      key={item}
                      className="border-b border-border py-4 text-sm leading-relaxed text-foreground/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn className="mt-14">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Entregables
                </p>
                <ul className="mt-4">
                  {entregables.map((item) => (
                    <li
                      key={item}
                      className="border-b border-border py-4 text-sm leading-relaxed text-foreground/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <WebsitePortfolioSection />
    </div>
  );
}
