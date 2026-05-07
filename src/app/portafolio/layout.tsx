import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portafolio de Proyectos | Desarrollo Web, Apps y Marketing Digital México',
  description: 'Explora el portafolio de MAW Soluciones: sitios web, apps móviles, campañas de marketing y producción de contenido para empresas en México. Ver resultados reales.',
  keywords: ['portafolio agencia digital México', 'proyectos desarrollo web', 'casos de éxito marketing digital', 'apps desarrolladas México', 'trabajos diseño web'],
  alternates: { canonical: 'https://mawsoluciones.com/portafolio' },
  openGraph: {
    url: 'https://mawsoluciones.com/portafolio',
    title: 'Portafolio | Proyectos de Éxito en México - MAW Soluciones',
    description: 'Descubre cómo hemos transformado marcas en México con desarrollo web, apps y estrategias de marketing digital. Resultados reales, clientes satisfechos.',
  },
};

import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PortafolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
