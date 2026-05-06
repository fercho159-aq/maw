"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic2, PlayCircle, FileText } from "lucide-react";
import StudioCalculator from "@/components/studio-calculator";
import StudioShowcase from "@/components/studio-showcase";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function PodcastPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [qualityFilter, setQualityFilter] = useState("Todas");

  const slides = [
    {
      video: "/videos/set3_main.mov",
      tag: "Estudio Creativo MAW",
      title: "Graba tu Podcast con Calidad Profesional",
      desc: "Renta nuestro estudio equipado por hora o delega toda la producción a nuestro equipo de expertos en video y audio."
    },
    {
      video: "/videos/horiznal.mov",
      tag: "Plan Especial",
      title: "Promo de Temporada Podcast",
      desc: "Delega toda la producción técnica. Adquiere una temporada completa grabada en nuestro set multiescenario, ideal para destacar en todas las plataformas."
    }
  ];

  const podcastPortfolio = [
    { id: 1, title: "Podcast Media 1", quality: "Media", youtubeUrl: "https://www.youtube.com/embed/5zCCobJDZpA" },
    { id: 6, title: "Podcast Profesional 1", quality: "Profesional", youtubeUrl: "https://www.youtube.com/embed/S13NIPE0pds" },
    { id: 2, title: "Podcast Media 2", quality: "Media", youtubeUrl: "https://www.youtube.com/embed/6GOePvmHmDY" },
    { id: 7, title: "Podcast Profesional 2", quality: "Profesional", youtubeUrl: "https://www.youtube.com/embed/PCpC2HvWpD0" },
    { id: 3, title: "Podcast Media 3", quality: "Media", youtubeUrl: "https://www.youtube.com/embed/U4Bl7rNYexk" },
    { id: 8, title: "Podcast Profesional 3", quality: "Profesional", youtubeUrl: "https://www.youtube.com/embed/oBBEbKS9jvE" },
    { id: 4, title: "Podcast Media 4", quality: "Media", youtubeUrl: "https://www.youtube.com/embed/IvoOc_W5JSI" },
    { id: 9, title: "Podcast Profesional 4", quality: "Profesional", youtubeUrl: "https://www.youtube.com/embed/cd_MGBD3b-U" },
    { id: 5, title: "Podcast Media 5", quality: "Media", youtubeUrl: "https://www.youtube.com/embed/vtnC1IoCOTA" }
  ];

  const filteredPortfolio = qualityFilter === "Todas" ? podcastPortfolio : podcastPortfolio.filter(p => p.quality === qualityFilter);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="flex flex-col bg-background">
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center bg-zinc-950 text-white border-y border-border/50">
        
        {slides.map((slide, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
              currentSlide === idx ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <video
              src={slide.video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-[50%_30%] opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}

        <div className="z-10 container px-4 flex flex-col items-center text-center max-w-4xl transition-all duration-700 ease-in-out">
          <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/60 px-3 py-1 text-xs md:text-sm font-medium text-zinc-300 mb-4 backdrop-blur-md shadow-sm">
            <Mic2 className="mr-2 h-3 w-3 md:h-4 md:w-4 text-primary" />
            <span>{slides[currentSlide].tag}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold tracking-tighter mb-4 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            {slides[currentSlide].title}
          </h1>
          <p className="max-w-[700px] text-sm md:text-base lg:text-lg text-zinc-300 mb-6 font-light">
            {slides[currentSlide].desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2">
            <Button size="default" className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-semibold" asChild>
              <a href="https://wa.me/5633774723">
                Cotizar y Reservar
              </a>
            </Button>
            <Button size="default" variant="outline" className="font-semibold bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
              <a href="/brochures/podcast-produccion.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-2" /> Ver Brochure
              </a>
            </Button>
          </div>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-6 flex gap-2 justify-center w-full">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "w-6 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO CAROUSEL */}
      <StudioShowcase />

      <section className="w-full py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-border" id="cotizador">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-10">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">Cotizador de Estudio</h2>
             <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">Calcula el costo de tu proyecto y horario en tiempo real con nuestra herramienta.</p>
          </div>
          <StudioCalculator />
        </div>
      </section>

      {/* PORTAFOLIO Y CAROUSEL */}
      <section className="py-20 md:py-28 bg-background border-t border-border scroll-m-28" id="casos">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
             <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4">Casos de Éxito Podcast</h2>
             <p className="text-foreground/70 max-w-2xl mx-auto">Explora nuestro trabajo categorizado por nivel de producción.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Todas", "Media", "Profesional"].map((category) => (
              <Button
                key={category}
                variant={qualityFilter === category ? "default" : "outline"}
                onClick={() => setQualityFilter(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="max-w-6xl mx-auto relative px-8 md:px-16">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {filteredPortfolio.map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/2">
                    <div className="p-2">
                       <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                         <div className="aspect-video w-full bg-muted relative">
                           <iframe
                             className="absolute top-0 left-0 w-full h-full"
                             src={item.youtubeUrl}
                             title={item.title}
                             frameBorder="0"
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                             allowFullScreen
                           ></iframe>
                         </div>
                         <div className="p-6 flex flex-col items-center text-center">
                           <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-3">
                             {item.quality}
                           </div>
                           <h3 className="font-headline font-bold text-xl">{item.title}</h3>
                         </div>
                       </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {filteredPortfolio.length > 2 && (
                <>
                  <CarouselPrevious className="left-0 bg-primary/10 hover:bg-primary text-primary hover:text-white" />
                  <CarouselNext className="right-0 bg-primary/10 hover:bg-primary text-primary hover:text-white" />
                </>
              )}
            </Carousel>
          </div>

        </div>
      </section>

    </div>
  );
}
