
import { CheckCircle2 } from "lucide-react";

export default function GraciasRenovacionPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-8">
        ¡Gracias por tu Renovación!
      </h1>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-[9/16] max-w-sm mx-auto w-full rounded-lg overflow-hidden shadow-xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/pryEfO_hvN4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="prose prose-lg max-w-none text-foreground/80">
          <h2 className="font-headline text-2xl font-bold text-foreground">
            Continuamos Creciendo Juntos
          </h2>
          <p>
            Estamos encantados de seguir colaborando contigo. En esta nueva etapa, nos enfocaremos en optimizar y escalar los resultados que hemos conseguido hasta ahora.
          </p>
          <ul className="space-y-4 mt-6">
            <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Revisión Estratégica:</strong> Agendaremos una reunión para revisar los KPIs del periodo anterior y definir los nuevos objetivos.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Propuesta de Mejoras:</strong> Basado en el análisis, te presentaremos nuevas ideas y estrategias para implementar.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Acceso a Reportes:</strong> Recuerda que tienes acceso a tu dashboard personalizado para ver el rendimiento en tiempo real.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
