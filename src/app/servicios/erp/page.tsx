import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/service-landing";
import ErpSolutionsSlot from "@/components/landing/slots/erp-solutions-slot";
import { getLandingData, buildMetadata } from "@/lib/landing-data";

export const metadata: Metadata = buildMetadata("erp");

export default function Page() {
  return <ServiceLanding data={getLandingData("erp")!} slot={<ErpSolutionsSlot />} />;
}
