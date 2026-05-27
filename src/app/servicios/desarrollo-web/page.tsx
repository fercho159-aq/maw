import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/service-landing";
import { getLandingData, buildMetadata } from "@/lib/landing-data";
import WebDevShowcase from "@/components/sections/web-dev-showcase";

export const metadata: Metadata = buildMetadata("desarrollo-web");

export default function Page() {
  return <ServiceLanding data={getLandingData("desarrollo-web")!} slot={<WebDevShowcase />} />;
}
