import { CheckCircle2 } from "lucide-react";

export default function GraciasSitioWebPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-8">
        ¡Gracias! Empecemos con tu Sitio Web
      </h1>
      <div className="grid md:grid-cols-2 gap-12 items-start">
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
        <div className="prose prose-lg max-w-none text-foreground/80">
          <h2 className="font-headline text-2xl font-bold text-foreground">
            Requisitos para Arrancar tu Proyecto Web
          </h2>
          <p>
            Estamos emocionados de empezar a construir tu presencia digital. Para asegurar un inicio rápido y eficiente, por favor ayúdanos a recopilar los siguientes elementos.
          </p>
          <ul className="space-y-4 mt-6">
            <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Manual de Identidad de Marca:</strong> Incluye tu logotipo en alta resolución (formatos .svg, .ai, .png), paleta de colores, tipografías y cualquier guía de estilo que tengas.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Accesos a Hosting y Dominio:</strong> Si ya has contratado estos servicios, necesitaremos las credenciales para poder configurar el sitio. Si no, ¡no te preocupes!, nosotros te asesoramos.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Contenido Inicial:</strong> Textos para las secciones principales (Quiénes Somos, Servicios, Contacto), así como imágenes y videos que quieras incluir.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Lista de Servicios/Productos:</strong> Un desglose detallado de lo que ofreces, incluyendo descripciones y precios si aplica.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Información de Contacto:</strong> Dirección, teléfonos, correos electrónicos y enlaces a redes sociales que quieres que aparezcan en el sitio.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
