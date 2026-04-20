import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ContentRecommender from "@/components/content-recommender";

const ServicePage = () => {
  return (
    <div className="bg-background">
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold">
              Creación de Contenido
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/80">
              Creamos contenido atractivo que resuena con tu audiencia, fortalece tu marca y genera resultados.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg max-w-none text-foreground/80">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">Del Concepto a la Conexión.</h2>
              <p>
                El contenido es el corazón de la comunicación digital. Creamos valor para construir una relación sólida y duradera con tu público.
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Estrategia de Contenidos:</strong> Analizamos tu audiencia y objetivos para crear un plan a medida.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Gestión de Redes Sociales:</strong> Contenido visual y escrito para generar engagement.</span>
                </li>
              </ul>
            </div>
             <div className="relative aspect-[9/16] max-w-sm mx-auto w-full rounded-lg overflow-hidden shadow-xl">
               <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/t17eWu6lviA"
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
            <h2 className="font-headline text-3xl sm:text-4xl font-bold">Obtén tu Estrategia de Contenido Personalizada</h2>
            <p className="mt-4 text-lg text-foreground/80">
              Responde unas breves preguntas y recibe una recomendación estratégica de contenido para tus redes sociales.
            </p>
          </div>
          <ContentRecommender />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold">¿Listo para contar tu historia?</h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Permítenos ayudarte a crear contenido que conecte y convierta.
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
