
import Header from "@/components/header";
import Hero from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import Testimonials from "@/components/sections/testimonials";
import BlogSection from "@/components/sections/blog";
import Footer from "@/components/footer";

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
