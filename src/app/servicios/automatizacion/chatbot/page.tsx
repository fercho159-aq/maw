import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Bot } from "lucide-react";

const ServicePage = () => {
  return (
    <div className="bg-background">
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <Bot className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="font-headline text-4xl sm:text-5xl font-bold">
              Chatbot Inteligente
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/80">
              Atiende a tus clientes 24/7 con un chatbot que responde preguntas frecuentes, califica leads y agenda reuniones, todo de forma automática.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold">Página en Construcción</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Estamos trabajando en el contenido detallado para este servicio. ¡Vuelve pronto!
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contacto">
              Solicitar más información <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
