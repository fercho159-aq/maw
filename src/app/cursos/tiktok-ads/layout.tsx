import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Curso de TikTok Ads en México | Publicidad en TikTok',
  description: 'Domina la publicidad en TikTok con nuestro curso especializado en México. Crea anuncios virales y campañas que impactan a millones de usuarios.',
  keywords: ['curso TikTok Ads México', 'publicidad TikTok México', 'TikTok para negocios México', 'anuncios TikTok empresas', 'curso TikTok marketing'],
  alternates: { canonical: 'https://mawsoluciones.com/cursos/tiktok-ads' },
  openGraph: { url: 'https://mawsoluciones.com/cursos/tiktok-ads', title: 'Curso TikTok Ads México | MAW Soluciones', description: 'Llega a millones en TikTok. Aprende a crear campañas de publicidad efectivas en la red social de mayor crecimiento en México.' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
