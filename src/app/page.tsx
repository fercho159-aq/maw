import type { Metadata } from 'next';
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: 'MAW Soluciones | Agencia de Marketing Digital, Desarrollo Web y Apps en México',
  description: 'MAW Soluciones: la mejor agencia de marketing digital, desarrollo web y apps en México. Estrategias creativas, tecnología de vanguardia y resultados comprobados para pymes y empresas.',
  keywords: [
    'agencia de marketing digital México',
    'mejor agencia digital México',
    'desarrollo web profesional México',
    'desarrollo de aplicaciones México',
    'diseño web México',
    'marketing digital para empresas México',
    'agencia SEO México',
    'publicidad digital México',
    'creación de sitios web México',
    'automatización de procesos México',
  ],
  alternates: { canonical: 'https://mawsoluciones.com' },
  openGraph: {
    url: 'https://mawsoluciones.com',
    title: 'MAW Soluciones | Mejor Agencia de Marketing Digital y Desarrollo Web en México',
    description: 'Impulsamos tu marca con marketing digital, desarrollo web de vanguardia y apps a medida. Agencia líder en México con resultados comprobados.',
  },
};
import Header from "@/components/header";
import Hero from "@/components/sections/hero";
import Footer from "@/components/footer";

// Below-fold sections loaded lazily — don't block initial paint
const AboutSection = dynamic(() => import("@/components/sections/about"), {
  ssr: true,
});
const BlogSection = dynamic(() => import("@/components/sections/blog"), {
  ssr: true,
});
const Testimonials = dynamic(() => import("@/components/sections/testimonials"), {
  ssr: true,
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <BlogSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
