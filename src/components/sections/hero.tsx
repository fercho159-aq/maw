
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import WhatsappIcon from "../icons/whatsapp-icon";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

interface Slide {
  video: string;
  headline: string;
  subheadline: string;
}

const slides: Slide[] = [
  {
    video: "/videos/podcast_bg.mov",
    headline: "Transformamos Ideas en Resultados Digitales",
    subheadline:
      "Somos MAW Soluciones, tu socio estratégico en marketing. Impulsamos tu marca al siguiente nivel con creatividad, tecnología y nuestro Estudio de Podcast interactivo.",
  },
  {
    video: "/videos/horiznal.mov",
    headline: "Creatividad que Conecta, Diseño que Convierte",
    subheadline:
      "Desde desarrollo web de vanguardia hasta estrategias de contenido que enamoran a tu audiencia. Creamos experiencias digitales memorables.",
  },
  {
    video: "/videos/set3_main.mov",
    headline: "Tu Socio Estratégico para el Crecimiento",
    subheadline:
      "Analizamos, planificamos y ejecutamos. Nos sumergimos en tus objetivos para construir juntos el camino hacia el éxito de tu negocio.",
  },
];

const Hero = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [videosReady, setVideosReady] = React.useState(false);
  // Tracks which slide indices have had their video loaded
  const [loadedSlides, setLoadedSlides] = React.useState<Set<number>>(new Set());

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  // Defer video loading until after first paint
  React.useEffect(() => {
    const id = requestIdleCallback
      ? requestIdleCallback(() => {
          setVideosReady(true);
          setLoadedSlides(new Set([0, 1]));
        }, { timeout: 2000 })
      : setTimeout(() => {
          setVideosReady(true);
          setLoadedSlides(new Set([0, 1]));
        }, 500);

    return () => {
      if (requestIdleCallback) cancelIdleCallback(id as number);
      else clearTimeout(id as ReturnType<typeof setTimeout>);
    };
  }, []);

  React.useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      const idx = api.selectedScrollSnap();
      setCurrent(idx + 1);
      // Pre-load next slide when navigating
      setLoadedSlides(prev => {
        const next = new Set(prev);
        next.add(idx);
        next.add((idx + 1) % slides.length);
        return next;
      });
    };

    updateCurrent();
    api.on("select", updateCurrent);
  }, [api]);

  const isActive = (index: number) =>
    current === 0 ? index === 0 : current === index + 1;

  return (
    <section
      id="home"
      className="relative min-h-[70vh] md:min-h-screen bg-black overflow-hidden"
    >
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative flex items-center justify-center min-h-[70vh] md:min-h-screen h-full py-24 sm:py-32 md:py-40">
                {/* Background: gradient shown instantly, video fades in when ready */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                  {videosReady && loadedSlides.has(index) && (
                    <video
                      src={slide.video}
                      autoPlay={isActive(index)}
                      loop
                      muted
                      playsInline
                      preload="none"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 animate-fade-in"
                    />
                  )}
                </div>

                <div className="absolute inset-0 z-10 bg-black/60" />

                <div className="relative z-20 container mx-auto px-4 md:px-6">
                  <div className="max-w-4xl text-center mx-auto">
                    <h1
                      className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white animate-slide-down"
                      style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
                    >
                      {slide.headline}
                    </h1>
                    <p
                      className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto animate-fade-in-up"
                      style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
                    >
                      {slide.subheadline}
                    </p>
                    <div
                      className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up"
                      style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}
                    >
                      <Button size="lg" asChild>
                        <Link href="/contacto">Reserva tu Sesión Estratégica</Link>
                      </Button>
                      <Button size="lg" variant="whatsapp" asChild>
                        <a
                          href="https://wa.me/5633774723?text=Hola%2C%20quiero%20hacer%20crecer%20mi%20negocio%20digitalmente%20pero%20siento%20que%20me%20estoy%20quedando%20atr%C3%A1s.%20%C2%BFPueden%20orientarme%20por%20d%C3%B3nde%20empezar%3F"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WhatsappIcon className="w-5 h-5 mr-2" />
                          Chatea con nosotros
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                isActive(index) ? "w-6 bg-primary" : "bg-white/50 hover:bg-white"
              )}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default Hero;
