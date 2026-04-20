import { CheckCircle2 } from "lucide-react";

export default function GraciasContenidoPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-8">
        ¡Gracias! Empecemos con tu Contenido
      </h1>
      <div className="grid md:grid-cols-2 gap-12 items-start">
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
        <div className="prose prose-lg max-w-none text-foreground/80">
          <h2 className="font-headline text-2xl font-bold text-foreground">
            Requisitos para Iniciar
          </h2>
          <p>
            Para poder comenzar a trabajar en la estrategia y creación de contenido para tus redes sociales, necesitamos que nos proporciones los siguientes elementos. Esto nos permitirá entender tu marca a fondo y crear contenido que realmente conecte con tu audiencia.
          </p>
          <ul className="space-y-4 mt-6">
            <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Accesos a Redes Sociales:</strong> Necesitaremos acceso como administradores o editores a tus perfiles de Facebook, Instagram, TikTok, etc.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Logotipo y Manual de Identidad:</strong> Tu logotipo en alta calidad (preferiblemente en formato vectorial .svg o .ai) y tu manual de marca si cuentas con uno.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Ideas de Competencia o Referentes:</strong> Una lista de 3 a 5 cuentas (competidores o no) cuyo contenido te guste o te inspire.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Información Clave del Negocio:</strong> Un documento con la historia de tu marca, valores, público objetivo y objetivos comerciales.</span>
            </li>
             <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Material Gráfico Existente:</strong> Cualquier foto, video o diseño que ya tengas y que podamos utilizar.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
