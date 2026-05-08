import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creación de Sitios Web Profesionales para Empresas en México',
  description: 'Diseñamos y creamos sitios web profesionales, optimizados para SEO y conversiones para tu empresa en México. Sitios rápidos, modernos y con alto rendimiento.',
  keywords: ['crear sitio web empresa México', 'diseño sitio web profesional', 'página web para negocio México', 'sitio web SEO México', 'web corporativa México', 'landing page México'],
  alternates: { canonical: 'https://mawsoluciones.com/servicios/sitio-web' },
  openGraph: {
    url: 'https://mawsoluciones.com/servicios/sitio-web',
    title: 'Creación de Sitios Web Profesionales México | MAW Soluciones',
    description: 'Tu empresa merece una presencia web impecable. Sitios web modernos, rápidos y diseñados para convertir visitantes en clientes en México.',
  },
};

export default function SitioWebLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
