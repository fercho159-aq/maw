"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudioShowcase() {
  const [currentSet, setCurrentSet] = useState(0);

  const sets = [
    {
      id: "set-1",
      title: "Set Principal a 2 Cámaras",
      mainVideo: "/videos/horiznal.mov",
      subTitle1: "Cámara 1 (Vertical)",
      subSrc1: "/videos/vertical.mov",
      subTitle2: "Cámara 2 (Vertical)",
      subSrc2: "/videos/vertical2.mov",
      subAspect: "aspect-video",
      subObjectPosition: "object-[50%_25%]"
    },
    {
      id: "set-2",
      title: "Set 2 Iluminación Cálida",
      mainVideo: "/videos/set3_main.mov",
      subTitle1: "Toma Amplia Cálida",
      subSrc1: "/videos/set3_sub1.mov",
      subTitle2: "Plano Mesa",
      subSrc2: "/videos/set3_sub2.mov",
      subAspect: "aspect-video",
      subObjectPosition: "object-center"
    }
  ];

  const handlePrev = () => {
    setCurrentSet((prev) => (prev === 0 ? sets.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSet((prev) => (prev === sets.length - 1 ? 0 : prev + 1));
  };

  const active = sets[currentSet];

  return (
    <section className="w-full py-20 md:py-32 bg-zinc-950 text-white border-t border-zinc-900 border-b overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 text-white">Graba tu Podcast con <span className="text-primary">Calidad Profesional</span></h2>
          <p className="text-zinc-400 md:text-lg max-w-2xl mx-auto">
            Renta nuestro estudio equipado por hora o delega toda la producción a nuestro equipo de expertos en video y audio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Column: Carousel */}
          <div className="relative w-full">
            <div className="overflow-hidden w-full rounded-2xl bg-zinc-900/40 border border-zinc-800/50 p-2 md:p-4 shadow-2xl relative">
              <div className="flex flex-col gap-4">
                {/* Top Row: Horizontal Video (Wide) */}
                <div key={active.mainVideo} className="w-full rounded-xl overflow-hidden group border border-zinc-800 relative aspect-video animate-in fade-in zoom-in-95 duration-500">
                  <video
                    src={active.mainVideo}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                     <h3 className="text-base md:text-lg font-bold text-white mb-1">{active.title}</h3>
                  </div>
                </div>

                {/* Bottom Row: 2 Sub Videos */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div key={active.subSrc1} className={`relative ${active.subAspect} rounded-xl overflow-hidden group border border-zinc-800 animate-in fade-in zoom-in-95 duration-500 delay-100`}>
                    <video
                      src={active.subSrc1}
                      className={`absolute inset-0 w-full h-full object-cover ${active.subObjectPosition}`}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex flex-col justify-end p-3">
                      <h3 className="text-xs md:text-sm font-bold text-white mb-1">{active.subTitle1}</h3>
                    </div>
                  </div>

                  <div key={active.subSrc2} className={`relative ${active.subAspect} rounded-xl overflow-hidden group border border-zinc-800 animate-in fade-in zoom-in-95 duration-500 delay-200`}>
                    <video
                      src={active.subSrc2}
                      className={`absolute inset-0 w-full h-full object-cover ${active.subObjectPosition}`}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex flex-col justify-end p-3">
                      <h3 className="text-xs md:text-sm font-bold text-white mb-1">{active.subTitle2}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={handlePrev} 
                className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 bg-zinc-800/80 hover:bg-primary text-white p-2 md:p-3 rounded-full hover:scale-110 transition-all z-10 shadow-xl border border-zinc-700" 
                aria-label="Previous Set"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              
              <button 
                onClick={handleNext} 
                className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 bg-zinc-800/80 hover:bg-primary text-white p-2 md:p-3 rounded-full hover:scale-110 transition-all z-10 shadow-xl border border-zinc-700"
                aria-label="Next Set"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Carousel Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {sets.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSet(idx)}
                    className={`h-2 rounded-full transition-all duration-300 shadow-md border border-zinc-700 ${
                      currentSet === idx ? "w-8 bg-primary border-primary" : "w-3 bg-zinc-800/60 hover:bg-zinc-600/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: CTA Texts */}
          <div className="text-left flex flex-col space-y-6 lg:pl-8">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary w-fit">
              Elige tu atmósfera ideal
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white leading-tight">
              Cotiza tu podcast y ve <br className="hidden xl:block"/><span className="text-primary">el mejor escenario</span>
            </h2>
            
            <p className="text-zinc-400 md:text-lg">
              Desplázate por nuestras opciones de set y descubre la configuración de cámaras que mejor se adapta al estilo visual de tu proyecto.
            </p>

            <div className="pt-4">
              <Button size="lg" className="w-full sm:w-auto h-14 bg-primary text-primary-foreground hover:opacity-90 font-bold px-8 shadow-xl hover:scale-105 transition-transform" asChild>
                <a href="https://wa.me/525538359927?text=Hola,%20quisiera%20reservar%20el%20estudio%20con%20el%20Set%20de%20mi%20preferencia.">
                  Reservar este Set vía WhatsApp
                </a>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
