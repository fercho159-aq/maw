import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestión de Redes Sociales para Empresas en México',
  description: 'Manejo profesional de redes sociales: Instagram, Facebook, TikTok y LinkedIn para empresas en México. Estrategia, contenido, crecimiento y publicidad paga.',
  keywords: ['gestión redes sociales México', 'manejo redes sociales empresas', 'community manager México', 'estrategia redes sociales', 'Instagram para empresas México', 'TikTok empresas México'],
  alternates: { canonical: 'https://mawsoluciones.com/servicios/redes-sociales' },
  openGraph: {
    url: 'https://mawsoluciones.com/servicios/redes-sociales',
    title: 'Gestión de Redes Sociales para Empresas México | MAW Soluciones',
    description: 'Crece en Instagram, Facebook, TikTok y LinkedIn. Gestionamos tus redes sociales con estrategia, creatividad y resultados medibles para tu empresa en México.',
  },
};

export default function RedesSocialesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
