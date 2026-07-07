import type { ReactNode } from "react";
import Testimonials from "@/components/sections/testimonials";
import LandingHero from "./landing-hero";
import LandingTrustBar from "./landing-trust-bar";
import LandingFeatures from "./landing-features";
import LandingQualification from "./landing-qualification";
import LandingStats from "./landing-stats";
import LandingPackages from "./landing-packages";
import LandingProcess from "./landing-process";
import LandingFaq from "./landing-faq";
import LandingLeadForm from "./landing-lead-form";
import LandingStickyCta from "./landing-sticky-cta";
import type { ServiceLanding as ServiceLandingData } from "@/lib/landing-data";

/**
 * Orquesta una landing de servicio a partir de los datos, en registro
 * editorial sobrio. `slot` permite inyectar componentes a la medida
 * existentes (calculadora de ads, showcases, etc.) entre las features y la
 * calificación.
 *
 * Orden: hero → trust bar → features → slot → calificación → stats →
 * alcances → proceso → testimonios → faq → formulario.
 */
export default function ServiceLanding({
  data,
  slot,
}: {
  data: ServiceLandingData;
  slot?: ReactNode;
}) {
  return (
    <div className="bg-background">
      {data.hero && <LandingHero data={data.hero} />}
      {data.trustBar && <LandingTrustBar data={data.trustBar} />}
      {data.features && <LandingFeatures data={data.features} />}
      {slot}
      {data.qualification && <LandingQualification data={data.qualification} />}
      {data.stats && <LandingStats data={data.stats} />}
      {data.packages && <LandingPackages data={data.packages} />}
      {data.process && <LandingProcess data={data.process} />}
      <Testimonials />
      {data.faq && <LandingFaq data={data.faq} />}
      <LandingLeadForm config={data.leadForm} anchorId="cotizar" />
      {data.stickyCta && <LandingStickyCta data={data.stickyCta} />}
    </div>
  );
}
