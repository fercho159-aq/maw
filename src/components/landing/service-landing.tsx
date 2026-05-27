import type { ReactNode } from "react";
import Testimonials from "@/components/sections/testimonials";
import LandingHero from "./landing-hero";
import LandingFeatures from "./landing-features";
import LandingStats from "./landing-stats";
import LandingPackages from "./landing-packages";
import LandingProcess from "./landing-process";
import LandingFaq from "./landing-faq";
import LandingLeadForm from "./landing-lead-form";
import type { ServiceLanding as ServiceLandingData } from "@/lib/landing-data";

/**
 * Orquesta una landing de servicio a partir de los datos.
 * `slot` permite inyectar componentes a la medida existentes
 * (showcases, calculadoras, etc.) entre las features y los stats.
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
      {data.features && <LandingFeatures data={data.features} />}
      {slot}
      {data.stats && <LandingStats data={data.stats} />}
      {data.packages && <LandingPackages data={data.packages} />}
      {data.process && <LandingProcess data={data.process} />}
      <Testimonials />
      {data.faq && <LandingFaq data={data.faq} />}
      <LandingLeadForm config={data.leadForm} anchorId="cotizar" />
    </div>
  );
}
