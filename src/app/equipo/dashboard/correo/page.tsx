import { CheckCircle2 } from "lucide-react";

export default function GraciasCorreoPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-8">
        Configuración de Correo Electrónico
      </h1>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-[9/16] max-w-sm mx-auto w-full rounded-lg overflow-hidden shadow-xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/Nkhi6SzOPJc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="prose prose-lg max-w-none text-foreground/80">
          <h2 className="font-headline text-2xl font-bold text-foreground">
            Configura tu correo en cualquier dispositivo
          </h2>
          <p>
            A continuación, encontrarás los datos necesarios para configurar tu cuenta de correo electrónico en clientes como Outlook, Gmail, Apple Mail o cualquier otro, utilizando los protocolos IMAP y SMTP.
          </p>
          <h3 className="font-headline text-xl font-bold mt-6 mb-4">Datos para configuración IMAP (Recomendado para recibir correos)</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Servidor entrante (IMAP):</strong> imap.hostinger.com</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Puerto IMAP:</strong> 993</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Cifrado:</strong> SSL/TLS</span>
            </li>
          </ul>
          <h3 className="font-headline text-xl font-bold mt-6 mb-4">Datos para configuración SMTP (Para enviar correos)</h3>
           <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Servidor saliente (SMTP):</strong> smtp.hostinger.com</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Puerto SMTP:</strong> 465</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Cifrado:</strong> SSL/TLS</span>
            </li>
          </ul>
           <h3 className="font-headline text-xl font-bold mt-6 mb-4">Credenciales</h3>
           <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Usuario:</strong> Tu dirección de correo completa (ej. tu@dominio.com).</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <span><strong>Contraseña:</strong> La contraseña que estableciste para esta cuenta de correo.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
