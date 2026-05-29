import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios de Marketing Digital, Desarrollo Web y Apps en México',
  description: 'Descubre todos los servicios de MAW Soluciones: desarrollo web, apps a medida, gestión de redes sociales, automatización, publicidad digital y más. Agencia líder en México.',
  keywords: ['servicios marketing digital México', 'desarrollo web México', 'apps a medida México', 'gestión redes sociales', 'automatización empresarial México'],
  alternates: { canonical: 'https://mawsoluciones.com/servicios' },
  openGraph: {
    url: 'https://mawsoluciones.com/servicios',
    title: 'Servicios Digitales para Empresas en México | MAW Soluciones',
    description: 'Desarrollo web, apps, marketing digital, automatización y más. Todo lo que tu empresa necesita para crecer en el mundo digital.',
  },
};

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import WhatsappIcon from '@/components/icons/whatsapp-icon';
import { cn } from '@/lib/utils';
import AnimatedDiv from '@/components/animated-div';

type Service = {
  title: string;
  description: string;
  href: string;
  image: ImagePlaceholder | undefined;
};

const services: Service[] = [
  {
    title: 'Creación de Contenido',
    description:
      'Creamos contenido atractivo, relevante y de alta calidad que resuena con tu audiencia. Desde artículos de blog optimizados para SEO y guiones para redes sociales hasta la gestión completa de tus perfiles, nuestro contenido está diseñado para fortalecer tu marca, construir una comunidad y generar resultados medibles que impulsen tu negocio.',
    href: '/servicios/creacion-de-contenido',
    image: PlaceHolderImages.find(img => img.id === 'service-content-creation'),
  },
  {
    title: 'Desarrollo Web',
    description:
      'Diseñamos y desarrollamos sitios web modernos, rápidos y optimizados para la conversión que actúan como el centro de tu ecosistema digital. Creamos experiencias de usuario intuitivas y atractivas que no solo se ven increíbles, sino que también funcionan como una poderosa herramienta de marketing y ventas para tu negocio.',
    href: '/servicios/desarrollo-web',
    image: PlaceHolderImages.find(img => img.id === 'service-web-development'),
  },
  {
    title: 'Gestión de Campañas',
    description:
      'Planificamos, ejecutamos y medimos campañas publicitarias en plataformas clave como Google Ads y redes sociales para maximizar tu retorno de inversión (ROI). A través de un enfoque basado en datos, atraemos a tu público objetivo y alcanzamos tus metas comerciales con estrategias precisas y optimizadas continuamente.',
    href: '/servicios/gestion-de-campanas',
    image: PlaceHolderImages.find(img => img.id === 'service-campaigns'),
  },
  {
    title: 'Automatización de Marketing',
    description:
      'Implementamos sistemas inteligentes y flujos de trabajo personalizados para nutrir leads, optimizar tus embudos de venta y fidelizar clientes de forma automática. Deja que la tecnología trabaje por ti 24/7, permitiéndote concentrarte en las áreas estratégicas para hacer crecer tu negocio de manera escalable.',
    href: '/servicios/automatizacion',
    image: PlaceHolderImages.find(img => img.id === 'service-automation'),
  },
];

const ServicesPage = () => {
  return (
    <div className="bg-background">
      <section className="py-24 sm:py-32 md:py-40 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <AnimatedDiv className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold">
              Nuestros Servicios
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/80">
              Ofrecemos una gama completa de soluciones de marketing digital
              diseñadas para llevar tu negocio al siguiente nivel. Explora
              nuestros servicios para encontrar el que mejor se adapte a tus
              necesidades.
            </p>
          </AnimatedDiv>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-20 md:gap-28">
            {services.map((service, index) => (
              <AnimatedDiv key={index} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div
                  className={cn(
                    'relative aspect-video rounded-lg overflow-hidden shadow-2xl group',
                    index % 2 !== 0 && 'md:order-2'
                  )}
                >
                  {service.image && (
                    <Image
                      src={service.image.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      data-ai-hint={service.image.imageHint}
                    />
                  )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                <div className={cn(index % 2 !== 0 && 'md:order-1')}>
                  <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-foreground/80 mb-8">
                    {service.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild className="w-full sm:w-auto">
                      <Link href={service.href}>
                        Ver más <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="whatsapp" size="lg" asChild className="w-full sm:w-auto">
                      <a href="https://wa.me/5538359927?text=Hola%2C%20estoy%20buscando%20servicios%20digitales%20para%20mi%20negocio.%20Siento%20que%20me%20estoy%20quedando%20atr%C3%A1s%20y%20necesito%20una%20soluci%C3%B3n.%20%C2%BFPodemos%20hablar%20hoy%3F" target="_blank" rel="noopener noreferrer">
                        <WhatsappIcon className="w-5 h-5 mr-2" />
                        Contactar
                      </a>
                    </Button>
                  </div>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
