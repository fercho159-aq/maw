import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ServicePage = () => {
  return (
    <div className="bg-background">
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold">
              Producción de Foto y Video
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/80">
              Producimos material audiovisual profesional y de alto impacto que captura la esencia de tu marca, cuenta tu historia y conecta emocionalmente con tu audiencia.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="prose prose-lg max-w-none text-foreground/80">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">Una Imagen Vale Más Que Mil Palabras</h2>
              <p>
                En el mundo visual de hoy, la calidad de tus fotos y videos habla directamente de la calidad de tu marca. En MAW Soluciones, convertimos tus ideas en producciones visuales impactantes que elevan tu presencia digital y comunican tu mensaje de manera efectiva.
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Fotografía de Producto:</strong> Imágenes nítidas y profesionales que hacen que tus productos destaquen y se vendan solos.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Videos Corporativos y de Marca:</strong> Contamos tu historia, mostramos tu cultura y destacamos tus valores a través de videos cinemáticos.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Contenido para Redes Sociales:</strong> Reels, stories y videos cortos diseñados para captar la atención y viralizarse.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Fotografía de Retrato y Lifestyle:</strong> Humanizamos tu marca con retratos profesionales y fotografía de estilo de vida.</span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-square">
               <Image
                src="https://images.unsplash.com/photo-1526656001222-41c7b74f686c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwaG90byUyMHByb2R1Y3Rpb258ZW58MHx8fHwxNzYyMDkzNTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Producción de Foto y Video"
                fill
                className="rounded-lg object-cover shadow-xl"
                data-ai-hint="photo production"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold">¿Listo para que tu marca brille?</h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Capturemos juntos la mejor versión de tu negocio.
            </p>
            <Button size="lg" className="mt-8" asChild>
                <Link href="/contacto">
                    Reserva tu Sesión Estratégica <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
            </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
