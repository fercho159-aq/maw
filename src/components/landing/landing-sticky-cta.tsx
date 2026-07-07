import type { LandingStickyCta as LandingStickyCtaData } from "@/lib/landing-data";

/**
 * Neutralizado en el rediseño editorial: la CTA persistente (barra inferior
 * y botón flotante) lee agresiva para el posicionamiento AAA. Se conserva el
 * export y la firma porque las páginas de servicio siguen pasando `data`;
 * la conversión se resuelve con los CTAs del hero y el formulario.
 */
export default function LandingStickyCta(_props: { data: LandingStickyCtaData }) {
  return null;
}
