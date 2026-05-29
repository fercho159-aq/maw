import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/service-landing";
import { getLandingData, buildMetadata } from "@/lib/landing-data";
import AdvertisingSlot from "@/components/landing/slots/advertising-slot";

export const metadata: Metadata = buildMetadata("redes-sociales");

export default function Page() {
  return <ServiceLanding data={getLandingData("redes-sociales")!} slot={<AdvertisingSlot />} />;
}
