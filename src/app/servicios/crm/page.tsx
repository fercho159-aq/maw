import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/service-landing";
import { getLandingData, buildMetadata } from "@/lib/landing-data";

export const metadata: Metadata = buildMetadata("crm");

export default function Page() {
  return <ServiceLanding data={getLandingData("crm")!} />;
}
