import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CrmPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold">
              Implementación de CRM
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/80">
              Centraliza tus ventas, automatiza los seguimientos y no dejes escapar ninguna oportunidad con un sistema diseñado para ti.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Video Right */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Texto Izquierda */}
            <div className="prose prose-lg max-w-none text-foreground/80 order-2 md:order-1">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">
                Cierra Más Ventas, Con Menos Caos
              </h2>
              <p>
                Deja atrás las hojas de cálculo confusas, los seguimientos olvidados y las libretas llenas de números que no significan nada. Si tu equipo de ventas no cuenta con un sistema eficiente, estás dejando dinero sobre la mesa.
              </p>
              <p>
                Analizamos tus procesos actuales e implementamos un Customer Relationship Management (CRM) a la medida de tus necesidades, garantizando que cada prospecto reciba la atención precisa en el momento adecuado.
              </p>
              
              <ul className="mt-6 space-y-2 list-none">
                <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-primary" /> Visualización de embudos de ventas en tiempo real.</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-primary" /> Automatización de correos, recordatorios y tareas.</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-primary" /> Capacitación para tu equipo de ventas comercial.</li>
              </ul>
            </div>

            {/* Video Derecha */}
            <div className="relative aspect-[9/16] max-w-sm mx-auto w-full rounded-xl overflow-hidden shadow-xl order-1 md:order-2 bg-muted/10 border border-border">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.instagram.com/p/DWm0PTGAuMd/embed"
                frameBorder="0"
                scrolling="no"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold">Recupera el Control de tus Ventas</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Hablemos hoy y encontremos el sistema perfecto para que tu equipo comercial multiplique sus métricas.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contacto">
              Solicita tu Auditoría Inicial <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
