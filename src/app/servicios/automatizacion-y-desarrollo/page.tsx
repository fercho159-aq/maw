import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/service-landing";
import { getLandingData, buildMetadata } from "@/lib/landing-data";
import AutomationDiagnosticSlot from "@/components/landing/slots/automation-diagnostic-slot";

export const metadata: Metadata = buildMetadata("automatizacion-y-desarrollo");

export default function Page() {
  return (
    <ServiceLanding
      data={getLandingData("automatizacion-y-desarrollo")!}
      slot={<AutomationDiagnosticSlot />}
    />
  );
}
