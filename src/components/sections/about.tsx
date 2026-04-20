"use client";

import React from "react";
import AnimatedDiv from "../animated-div";
import { Button } from "../ui/button";
import { FileText } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-10 md:py-16 bg-background border-t border-border/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text block */}
          <div className="space-y-6">
            <AnimatedDiv>
              <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight mb-8 transition-colors duration-500 hover:text-[#ffe28a] hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] cursor-default">Nosotros</h2>
              <p className="text-xl text-foreground/80 leading-relaxed">
                MAW Soluciones nació de la visión de un equipo apasionado por la tecnología y el marketing, con el objetivo de ayudar a las empresas a navegar el complejo mundo digital.
              </p>
              <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
                Nuestra misión es simple: ser el socio estratégico que impulsa el crecimiento de nuestros clientes a través de soluciones innovadoras, creativas y basadas en datos. Creemos que cada negocio tiene una historia que contar.
              </p>
              <div className="mt-6">
                <Button variant="outline" asChild className="font-semibold">
                  <a href="/brochures/presentacion-corporativa.pdf" target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" /> Ver Presentación Corporativa
                  </a>
                </Button>
              </div>
            </AnimatedDiv>
          </div>
          {/* Video embed */}
          <div className="flex justify-center w-full">
            <AnimatedDiv className="relative aspect-[9/16] w-full max-w-[300px] rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.tiktok.com/player/v1/7623929156471950600?autoplay=1&loop=1&music_info=0&description=0"
                title="MAW Soluciones Nosotros"
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
            </AnimatedDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
