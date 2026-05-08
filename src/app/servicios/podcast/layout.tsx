import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Producción de Podcast Profesional en México | Estudio Podcast',
  description: 'Estudio de podcast profesional en México. Grabación, edición y producción de podcasts para marcas, empresas y creadores de contenido. Equipos de última generación.',
  keywords: ['producción podcast México', 'estudio podcast México', 'grabar podcast empresa', 'podcast para marcas México', 'servicio podcast profesional'],
  alternates: { canonical: 'https://mawsoluciones.com/servicios/podcast' },
  openGraph: {
    url: 'https://mawsoluciones.com/servicios/podcast',
    title: 'Estudio de Podcast Profesional México | MAW Soluciones',
    description: 'Tu voz, nuestra producción. Estudio de podcast con equipos profesionales para crear contenido de audio de alta calidad en México.',
  },
};

export default function PodcastLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
