
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
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
  video?: string;
  image?: string;
  imageHint?: string;
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
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    
    const plugin = React.useRef(
      Autoplay({ delay: 5000, stopOnInteraction: true })
    )

    React.useEffect(() => {
        if (!api) {
        return
        }

        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])


  return (
    <section
      id="home"
      className="relative min-h-[70vh] md:min-h-screen bg-background overflow-hidden"
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
                <motion.div
                  className="absolute inset-0 z-0 bg-black"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  {slide.video ? (
                    <video
                      src={slide.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                  ) : (
                    <Image
                      src={slide.image!}
                      alt={slide.headline}
                      fill
                      priority={index === 0}
                      quality={85}
                      sizes="100vw"
                      className="object-cover opacity-50"
                      data-ai-hint={slide.imageHint}
                    />
                  )}
                </motion.div>
                <div className="absolute inset-0 z-10 bg-black/60" />
                <div className="relative z-20 container mx-auto px-4 md:px-6">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          staggerChildren: 0.2,
                          delayChildren: 0.2,
                          duration: 0.6,
                          ease: "easeOut",
                        },
                      },
                    }}
                    className="max-w-4xl text-center mx-auto"
                  >
                    <motion.h1
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.8, ease: "easeOut" },
                        },
                      }}
                      className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
                    >
                      {slide.headline}
                    </motion.h1>
                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.8, ease: "easeOut" },
                        },
                      }}
                      className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto"
                    >
                      {slide.subheadline}
                    </motion.p>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.8, ease: "easeOut" },
                        },
                      }}
                      className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
                    >
                      <Button size="lg" asChild>
                        <Link href="/contacto">Reserva tu Sesión Estratégica</Link>
                      </Button>
                      <Button size="lg" variant="whatsapp" asChild>
                        <a
                          href="https://wa.me/5633774723"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WhatsappIcon className="w-5 h-5 mr-2" />
                          Chatea con nosotros
                        </a>
                      </Button>
                    </motion.div>
                  </motion.div>
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
                        current === index + 1 ? 'w-6 bg-primary' : 'bg-white/50 hover:bg-white'
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
