import { Metadata } from 'next';
import AnimatedDiv from '@/components/animated-div';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Términos del Servicio | MAW Soluciones',
  description: 'Consulta nuestros términos y condiciones del servicio.',
  robots: {
    index: false,
    follow: false,
  }
};

const TermsOfServicePage = () => {
  return (
    <div className="bg-background">
      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <AnimatedDiv className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold">
              Términos y Condiciones del Servicio
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/80">
              Al utilizar nuestros servicios, aceptas nuestros términos y condiciones.
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
                
                <h2>1. Aceptación de los Términos</h2>
                <p>Al acceder y utilizar los servicios de MAW Soluciones, usted acepta y se compromete a cumplir con los términos y condiciones descritos en este documento. Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestros servicios.</p>
                
                <h2>2. Descripción de los Servicios</h2>
                <p>MAW Soluciones ofrece una gama de servicios de marketing digital, incluyendo pero no limitado a: creación de contenido, desarrollo web, gestión de campañas publicitarias y automatización de marketing. Los detalles específicos de los servicios contratados se detallarán en una propuesta o contrato individual.</p>

                <h2>3. Obligaciones del Cliente</h2>
                <p>El cliente se compromete a proporcionar toda la información, accesos y materiales necesarios para la correcta ejecución de los servicios contratados en tiempo y forma. El cliente es responsable de la veracidad y los derechos de autor del material proporcionado.</p>

                <h2>4. Pagos y Facturación</h2>
                <p>Los términos de pago se establecerán en la propuesta o contrato. Los pagos deben realizarse en las fechas acordadas. MAW Soluciones se reserva el derecho de suspender los servicios en caso de retraso en los pagos.</p>
                
                <h2>5. Propiedad Intelectual</h2>
                <p>Una vez liquidados todos los pagos correspondientes, la propiedad intelectual de los entregables finales (diseños, código del sitio web, contenido final) se transferirá al cliente. MAW Soluciones se reserva el derecho de mostrar el trabajo en su portafolio, a menos que se acuerde lo contrario por escrito.</p>

                <h2>6. Confidencialidad</h2>
                <p>Ambas partes se comprometen a mantener la confidencialidad de toda la información compartida durante la prestación del servicio que no sea de dominio público.</p>
                
                <h2>7. Limitación de Responsabilidad</h2>
                <p>MAW Soluciones se compromete a realizar los servicios con el máximo profesionalismo. Sin embargo, no garantiza resultados específicos, ya que el éxito de las campañas de marketing depende de múltiples factores fuera de nuestro control (mercado, competencia, etc.). Nuestra responsabilidad se limita al monto total pagado por el servicio en cuestión.</p>

                <h2>8. Modificación de los Términos</h2>
                <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Se notificará a los clientes activos de cualquier cambio significativo. El uso continuado del servicio después de dichas modificaciones constituirá su aceptación.</p>

                <h2>9. Ley Aplicable</h2>
                <p>Estos términos se regirán e interpretarán de acuerdo con las leyes de México, y cualquier disputa será sometida a la jurisdicción de los tribunales de la Ciudad de México.</p>

            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
