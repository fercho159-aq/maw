import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/service-landing";
import { getLandingData, buildMetadata } from "@/lib/landing-data";
import PodcastSlot from "@/components/landing/slots/podcast-slot";

export const metadata: Metadata = buildMetadata("podcast");

export default function Page() {
  return <ServiceLanding data={getLandingData("podcast")!} slot={<PodcastSlot />} />;
}
