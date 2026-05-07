
import dynamic from "next/dynamic";
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
