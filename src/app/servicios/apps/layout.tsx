import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desarrollo de Aplicaciones Móviles y Web en México',
  description: 'Desarrollamos apps móviles iOS y Android y aplicaciones web a medida para empresas en México. UX profesional, rendimiento óptimo y tecnología moderna.',
  keywords: ['desarrollo de apps México', 'aplicaciones móviles México', 'app iOS Android México', 'desarrollo app empresas México', 'app a medida México', 'aplicaciones web progresivas'],
  alternates: { canonical: 'https://mawsoluciones.com/servicios/apps' },
  openGraph: {
    url: 'https://mawsoluciones.com/servicios/apps',
    title: 'Desarrollo de Apps Móviles y Web México | MAW Soluciones',
    description: 'Transforma tu idea en una app profesional. Desarrollo de aplicaciones móviles y web para empresas en México con experiencia de usuario excepcional.',
  },
};

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
