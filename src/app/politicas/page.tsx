import { Metadata } from 'next';
import AnimatedDiv from '@/components/animated-div';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Política de Privacidad | MAW Soluciones',
  description: 'Consulta nuestra política de privacidad para entender cómo manejamos tus datos.',
  robots: {
    index: false,
    follow: false,
  }
};

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-background">
      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <AnimatedDiv className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold">
              Política de Privacidad
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/80">
              Tu privacidad es importante para nosotros. Aquí te explicamos cómo recopilamos, usamos y protegemos tu información.
            </p>
          </AnimatedDiv>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-headline prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-strong:text-foreground
              prose-a:text-primary hover:prose-a:text-primary/80
              prose-ul:list-disc prose-ol:list-decimal 
              prose-li:text-foreground/80">
                
                <p><strong>Fecha de última actualización:</strong> 1 de Agosto de 2024</p>
                
                <h2>1. Introducción</h2>
                <p>En MAW Soluciones ("nosotros", "nuestro"), respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política de privacidad te informará sobre cómo cuidamos tus datos personales cuando visitas nuestro sitio web (independientemente de dónde lo visites) o cuando nos proporcionas datos a través de formularios (como los de TikTok Leads), y te informará sobre tus derechos de privacidad y cómo la ley te protege.</p>
                
                <h2>2. Datos que recopilamos sobre ti</h2>
                <p>Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre ti, que hemos agrupado de la siguiente manera:</p>
                <ul>
                    <li><strong>Datos de Identidad:</strong> Incluyen nombre, apellido, nombre de usuario o identificador similar.</li>
                    <li><strong>Datos de Contacto:</strong> Incluyen dirección de correo electrónico y números de teléfono.</li>
                    <li><strong>Datos Técnicos:</strong> Incluyen la dirección del protocolo de Internet (IP), tus datos de inicio de sesión, tipo y versión del navegador, configuración y ubicación de la zona horaria, tipos y versiones de plug-in del navegador, sistema operativo y plataforma, y otra tecnología en los dispositivos que utilizas para acceder a este sitio web.</li>
                    <li><strong>Datos de Uso:</strong> Incluye información sobre cómo utilizas nuestro sitio web, productos y servicios.</li>
                    <li><strong>Datos de Marketing y Comunicaciones:</strong> Incluyen tus preferencias para recibir marketing de nuestra parte y tus preferencias de comunicación.</li>
                </ul>

                <h2>3. ¿Cómo usamos tus datos personales?</h2>
                <p>Usaremos tus datos personales en las siguientes circunstancias:</p>
                <ul>
                    <li>Para ponernos en contacto contigo después de que hayas llenado un formulario de solicitud de información.</li>
                    <li>Donde necesitemos cumplir con el contrato que estamos a punto de celebrar o hemos celebrado contigo.</li>
                    <li>Donde sea necesario para nuestros intereses legítimos (o los de un tercero) y tus intereses y derechos fundamentales no anulen esos intereses.</li>
                    <li>Donde necesitemos cumplir con una obligación legal.</li>
                </ul>
                <p>Principalmente, utilizamos tus datos para responder a tus consultas, proporcionarte la información sobre los servicios que has solicitado y mejorar nuestros servicios.</p>

                <h2>4. Divulgación de tus datos personales</h2>
                <p>No compartiremos tus datos personales con ninguna empresa fuera de MAW Soluciones para fines de marketing. Es posible que tengamos que compartir tus datos personales con proveedores de servicios que actúan como procesadores que nos brindan servicios de TI y administración de sistemas.</p>
                
                <h2>5. Seguridad de los datos</h2>
                <p>Hemos implementado medidas de seguridad apropiadas para evitar que tus datos personales se pierdan, usen o accedan de forma accidental de manera no autorizada, se alteren o se divulguen. </p>

                <h2>6. Tus derechos legales</h2>
                <p>Bajo ciertas circunstancias, tienes derechos bajo las leyes de protección de datos en relación con tus datos personales. Estos incluyen el derecho a:</p>
                <ul>
                    <li>Solicitar acceso a tus datos personales.</li>
                    <li>Solicitar la corrección de tus datos personales.</li>
                    <li>Solicitar la eliminación de tus datos personales.</li>
                    <li>Oponerte al procesamiento de tus datos personales.</li>
                    <li>Solicitar la restricción del procesamiento de tus datos personales.</li>
                    <li>Solicitar la transferencia de tus datos personales.</li>
                    <li>Derecho a retirar el consentimiento.</li>
                </ul>

                <h2>7. Contacto</h2>
                <p>Si tienes alguna pregunta sobre esta política de privacidad, incluidas las solicitudes para ejercer tus derechos legales, por favor contáctanos a través de:</p>
                <p><strong>Email:</strong> aldo@mawsoluciones.com</p>

            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
