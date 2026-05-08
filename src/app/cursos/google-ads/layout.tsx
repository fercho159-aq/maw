import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Curso de Google Ads en México | Publicidad en Google',
  description: 'Aprende Google Ads desde cero hasta avanzado con expertos en México. Búsqueda, display, shopping y YouTube Ads para hacer crecer tu negocio.',
  keywords: ['curso Google Ads México', 'aprender Google Ads', 'publicidad Google México', 'SEM México', 'curso Google Ads para empresas'],
  alternates: { canonical: 'https://mawsoluciones.com/cursos/google-ads' },
  openGraph: { url: 'https://mawsoluciones.com/cursos/google-ads', title: 'Curso de Google Ads México | MAW Soluciones', description: 'Posiciona tu empresa en lo más alto de Google. Curso completo de Google Ads con expertos en publicidad digital de México.' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
