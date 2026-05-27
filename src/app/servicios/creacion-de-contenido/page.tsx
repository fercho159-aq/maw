import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/service-landing";
import { getLandingData, buildMetadata } from "@/lib/landing-data";
import ContentRecommender from "@/components/content-recommender";

export const metadata: Metadata = buildMetadata("creacion-de-contenido");

export default function Page() {
  return (
    <ServiceLanding
      data={getLandingData("creacion-de-contenido")!}
      slot={
        <section className="py-20 md:py-28 bg-card border-t border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold">Obtén tu Estrategia de Contenido Personalizada</h2>
              <p className="mt-4 text-lg text-foreground/80">
                Responde unas breves preguntas y recibe una recomendación estratégica de contenido para tus redes sociales.
              </p>
            </div>
            <ContentRecommender />
          </div>
        </section>
      }
    />
  );
}
