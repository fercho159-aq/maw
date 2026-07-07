import type { Metadata } from 'next';
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: 'MAW Soluciones — Consultora digital en Ciudad de México',
  description: 'Estrategia, desarrollo de software y producción de contenido para empresas que exigen método y resultados medibles.',
  keywords: [
    'agencia de marketing digital México',
    'consultora digital México',
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
    title: 'MAW Soluciones — Consultora digital en Ciudad de México',
    description: 'Estrategia, desarrollo de software y producción de contenido para empresas que exigen método y resultados medibles.',
  },
};
import Header from "@/components/header";
import Hero from "@/components/sections/hero";
import Footer from "@/components/footer";

// Below-fold sections loaded lazily — don't block initial paint
const AboutSection = dynamic(() => import("@/components/sections/about"), {
  ssr: true,
});
const Services = dynamic(() => import("@/components/sections/services"), {
  ssr: true,
});
const Testimonials = dynamic(() => import("@/components/sections/testimonials"), {
  ssr: true,
});
const MediaMentions = dynamic(() => import("@/components/sections/media-mentions"), {
  ssr: true,
});
const BlogSection = dynamic(() => import("@/components/sections/blog"), {
  ssr: true,
});
const Contact = dynamic(() => import("@/components/sections/contact"), {
  ssr: true,
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <Services />
        <Testimonials />
        <MediaMentions />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
