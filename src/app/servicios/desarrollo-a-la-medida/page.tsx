import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Desarrollo de Software a la Medida en México',
  description: 'Desarrollamos software, sistemas y plataformas digitales 100% a la medida para tu empresa en México. Soluciones escalables, seguras y adaptadas a tus necesidades.',
  keywords: ['desarrollo software a la medida México', 'desarrollo sistemas empresariales', 'software personalizado México', 'plataforma digital a medida', 'desarrollo web a la medida'],
  alternates: { canonical: 'https://mawsoluciones.com/servicios/desarrollo-a-la-medida' },
  openGraph: { url: 'https://mawsoluciones.com/servicios/desarrollo-a-la-medida', title: 'Desarrollo de Software a la Medida México | MAW Soluciones', description: 'Tu visión, nuestra tecnología. Sistemas y plataformas digitales construidos específicamente para los procesos y objetivos de tu empresa en México.' },
};
import CustomDevShowcase from "@/components/sections/custom-dev-showcase";

const ServicePage = () => {
  return (
    <div className="bg-background">
      <CustomDevShowcase />
    </div>
  );
};

export default ServicePage;
