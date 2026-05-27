import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/service-landing";
import { getLandingData, buildMetadata } from "@/lib/landing-data";
import AppsShowcase from "@/components/sections/apps-showcase";

export const metadata: Metadata = buildMetadata("apps");

export default function Page() {
  return <ServiceLanding data={getLandingData("apps")!} slot={<AppsShowcase />} />;
}
