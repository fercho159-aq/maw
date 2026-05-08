import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Curso de Facebook Ads en México | Publicidad en Meta',
  description: 'Aprende a crear campañas rentables en Facebook e Instagram Ads con nuestro curso práctico en México. Estrategias avanzadas de segmentación y optimización de presupuesto.',
  keywords: ['curso Facebook Ads México', 'curso Meta Ads', 'publicidad Facebook México', 'aprender Facebook Ads', 'curso marketing digital México'],
  alternates: { canonical: 'https://mawsoluciones.com/cursos/facebook-ads' },
  openGraph: { url: 'https://mawsoluciones.com/cursos/facebook-ads', title: 'Curso de Facebook Ads México | MAW Soluciones', description: 'Domina la publicidad en Facebook e Instagram. Curso práctico para crear campañas que generan ventas reales en México.' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
