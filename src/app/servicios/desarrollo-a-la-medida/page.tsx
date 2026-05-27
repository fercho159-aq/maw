import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/service-landing";
import { getLandingData, buildMetadata } from "@/lib/landing-data";
import CustomDevShowcase from "@/components/sections/custom-dev-showcase";

export const metadata: Metadata = buildMetadata("desarrollo-a-la-medida");

export default function Page() {
  return <ServiceLanding data={getLandingData("desarrollo-a-la-medida")!} slot={<CustomDevShowcase />} />;
}
