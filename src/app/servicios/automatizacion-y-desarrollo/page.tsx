import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DataAutomationCalculator from "@/components/data-automation-calculator";

const ServicePage = () => {
  return (
    <div className="bg-background">
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold">
              Automatización y Desarrollo
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/80">
              Conectamos tus sistemas y bases de datos para crear flujos de trabajo potentes y personalizados.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg max-w-none text-foreground/80">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">Tus Sistemas, Sincronizados.</h2>
              <p>
                Integramos tus herramientas y desarrollamos conectores a medida para que tus datos fluyan sin fricción.
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Automatización con n8n:</strong> Conectamos tus apps para crear flujos de trabajo complejos.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Conexión a Bases de Datos:</strong> Leemos y escribimos en tus bases de datos para una gestión centralizada.</span>
                </li>
              </ul>
            </div>
             <div className="relative aspect-[9/16] max-w-sm mx-auto w-full rounded-lg overflow-hidden shadow-xl">
               <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/UMw2F8fIvF4"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6">
           <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold">Diagnóstico de Automatización de Datos</h2>
            <p className="mt-4 text-lg text-foreground/80">
              Responde a este breve cuestionario para descubrir tu potencial de automatización y cómo podemos ayudarte.
            </p>
          </div>
          <DataAutomationCalculator />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold">¿Listo para que tus datos trabajen para ti?</h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Elimina el trabajo manual y obtén una visión unificada de tu negocio. Hablemos de tu proyecto.
            </p>
            <Button size="lg" className="mt-8" asChild>
                <Link href="/contacto">
                    Agendar una Consulta de Automatización <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
            </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
