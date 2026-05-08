import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Diseño y Desarrollo Web Profesional en México',
  description: 'Creamos sitios web profesionales, rápidos y optimizados para SEO. Desarrollo web en México para empresas, pymes y emprendedores. Next.js, React y más.',
  keywords: ['desarrollo web México', 'diseño web profesional México', 'crear sitio web empresa México', 'agencia web México', 'desarrollo web Next.js México', 'páginas web para empresas'],
  alternates: { canonical: 'https://mawsoluciones.com/servicios/desarrollo-web' },
  openGraph: { url: 'https://mawsoluciones.com/servicios/desarrollo-web', title: 'Desarrollo Web Profesional México | MAW Soluciones', description: 'Sitios web modernos, rápidos y con alto rendimiento SEO para posicionar tu empresa en Google México. Tecnología de vanguardia.' },
};
import WebDevShowcase from "@/components/sections/web-dev-showcase";

const ServicePage = () => {
  return (
    <div className="bg-background">
      <WebDevShowcase />
    </div>
  );
};

export default ServicePage;
