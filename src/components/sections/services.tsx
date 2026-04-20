"use client";

import React from 'react';
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedDiv from "../animated-div";
import { Button } from '../ui/button';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const newServicesData = [
  {
    title: "Redes Sociales",
    description: "Creamos estrategias de contenido dinámicas que enamoran a tu audiencia y construyen una comunidad fiel alrededor de tu marca.",
    href: "/servicios/redes-sociales",
    videos: [
      { src: "https://www.instagram.com/p/DXKyGT3k8Ei/embed" }
    ]
  },
  {
    title: "Sitios Web",
    description: "Diseñamos y desarrollamos páginas rápidas, hermosas y optimizadas para convertir visitantes en clientes reales.",
    href: "/servicios/sitio-web",
    videos: [
      { src: "https://www.youtube.com/embed/eoFJnh7jFkA?autoplay=0&muted=1&loop=1" }
    ]
  },
  {
    title: "App's (Android e iOS)",
    description: "Llevamos tu negocio directamente al bolsillo de tus clientes con aplicaciones móviles nativas o híbridas de primer nivel.",
    href: "/servicios/desarrollo-a-la-medida",
    videos: [
      { src: "https://www.instagram.com/p/DWm0PTGAuMd/embed" }
    ]
  },
  {
    title: "Podcast",
    description: "Eleva tu voz como autoridad en la industria con nuestro servicio de producción y distribución de podcasts de alta calidad.",
    href: "/servicios/podcast",
    videos: [
      { src: "https://www.instagram.com/p/DXKjS14E0Nn/embed" }
    ]
  },
  {
    title: "Ads",
    description: "Maximiza tu inversión con campañas publicitarias hipersegmentadas en redes sociales y buscadores, impulsadas por datos.",
    href: "/servicios/ads",
    videos: [
      { src: "https://www.youtube.com/embed/-y87ZmqVozI?autoplay=0&muted=1&loop=1" }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ease: "easeOut"
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1]
    }
  },
};

const Services = () => {
  return (
    <>
      <section id="services" className="py-10 md:py-16 bg-card overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedDiv className="max-w-3xl mx-auto text-center mb-16 relative group cursor-default">
            <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight mb-4 transition-colors duration-500 hover:text-[#ffe28a] hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]">Servicios</h2>
            <p className="mt-4 text-xl text-foreground/80">
              Ofrecemos una gama completa de soluciones de marketing digital diseñadas para llevar tu negocio al siguiente nivel mediante contenido de impacto.
            </p>
          </AnimatedDiv>
          
          <div className="max-w-6xl mx-auto relative px-8 md:px-16">
            <Carousel opts={{ align: "center", loop: true }} className="w-full">
              <CarouselContent>
                {newServicesData.map((service, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <CarouselItem key={index} className="basis-full">
                      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center p-6 md:p-12 mb-8 bg-background/50 rounded-3xl border border-border/50 shadow-sm h-full`}>
                        
                        {/* Text Content */}
                        <div className="flex-1 space-y-6 flex flex-col justify-center">
                          <AnimatedDiv variants={containerVariants}>
                            <h3 className="font-headline text-3xl font-bold">{service.title}</h3>
                            <p className="text-lg text-foreground/70 mt-4 leading-relaxed">{service.description}</p>
                            <Button className="mt-6" asChild size="lg">
                              <Link href={service.href}>Saber más <ArrowRight className="w-4 h-4 ml-2" /></Link>
                            </Button>
                          </AnimatedDiv>
                        </div>

                        {/* Video Embeds */}
                        <div className="flex-1 flex justify-center w-full">
                          {service.videos.map((vid, vIndex) => (
                            <AnimatedDiv key={vIndex} className="relative aspect-[9/16] w-full max-w-[280px] rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-black/5" variants={itemVariants}>
                              <iframe
                                className={vid.src.includes('instagram') ? "absolute top-[-68px] left-[-2%] w-[104%] h-[calc(100%+136px)]" : "absolute top-0 left-0 w-full h-full"}
                                src={vid.src.includes('instagram') ? `${vid.src}/?hidecaption=true` : vid.src}
                                title={`${service.title} video`}
                                frameBorder="0"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </AnimatedDiv>
                          ))}
                        </div>

                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="left-0 xl:-left-12 bg-primary/10 hover:bg-primary text-primary hover:text-white border-primary/20 hover:scale-110 transition-all w-12 h-12" />
              <CarouselNext className="right-0 xl:-right-12 bg-primary/10 hover:bg-primary text-primary hover:text-white border-primary/20 hover:scale-110 transition-all w-12 h-12" />
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
