import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/service-landing";
import { getLandingData, buildMetadata } from "@/lib/landing-data";
import WebsitesPortfolioSlot from "@/components/landing/slots/websites-portfolio-slot";

export const metadata: Metadata = buildMetadata("sitio-web");

export default function Page() {
  return <ServiceLanding data={getLandingData("sitio-web")!} slot={<WebsitesPortfolioSlot />} />;
}
