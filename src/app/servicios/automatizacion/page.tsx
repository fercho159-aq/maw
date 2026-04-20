import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AutomationCalculator from "@/components/automation-calculator";

const ServicePage = () => {
  return (
    <div className="bg-background">
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold">
              Automatización de Marketing
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/80">
              Implementamos sistemas inteligentes que trabajan para ti 24/7, nutriendo leads, optimizando tus embudos de venta y liberando tu tiempo para que te concentres en hacer crecer tu negocio.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="relative aspect-square">
               <Image
                src="https://images.unsplash.com/photo-1674049406295-86d11b33415c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc2MjA5MzU3NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Automatización de Marketing"
                fill
                className="rounded-lg object-cover shadow-xl"
                data-ai-hint="marketing automation"
              />
            </div>
            <div className="prose prose-lg max-w-none text-foreground/80">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">Trabaja de Forma Más Inteligente, no Más Dura</h2>
              <p>
                La automatización de marketing es la clave para escalar tus esfuerzos y obtener mejores resultados con menos trabajo manual. En MAW Soluciones, diseñamos y configuramos flujos de trabajo personalizados que se alinean con el viaje de tu cliente.
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Lead Nurturing:</strong> Secuencias de correo automatizadas para guiar a tus prospectos desde el interés inicial hasta la compra.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Segmentación y Personalización:</strong> Envía el mensaje correcto a la persona correcta en el momento adecuado, de forma automática.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Integración de CRM:</strong> Sincronizamos tu marketing con tus ventas para una visión 360° de tus clientes.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Chatbots e IA:</strong> Implementamos asistentes virtuales para calificar leads y ofrecer soporte instantáneo.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6">
           <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold">Diagnóstico de Automatización</h2>
            <p className="mt-4 text-lg text-foreground/80">
              Responde unas breves preguntas y descubre el potencial de ahorro de tiempo para tu negocio.
            </p>
          </div>
          <AutomationCalculator />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold">¿Listo para poner tu marketing en piloto automático?</h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Descubre cómo la automatización puede transformar tu eficiencia y tus resultados.
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
