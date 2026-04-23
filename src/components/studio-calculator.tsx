"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin, Info, Mic2, Video, CheckCircle2, AlertCircle, Check } from "lucide-react";
import WhatsappIcon from './icons/whatsapp-icon';

type Cameras = 0 | 1 | 2 | 3;

const oldAngles = [
  { id: "ang1", src: "/videos/horiznal.mov", title: "Principal" },
  { id: "ang4", src: "/videos/set3_main.mov", title: "Cálida Amplia" },
  { id: "ang2", src: "/videos/vertical.mov", title: "Vertical P1" },
  { id: "ang3", src: "/videos/vertical2.mov", title: "Vertical P2" },
  { id: "ang5", src: "/videos/set3_sub1.mov", title: "Cálida Frente" },
  { id: "ang6", src: "/videos/set3_sub2.mov", title: "Cálida Detalle" },
];

// Generate 15 WhatsApp video entries
const waAngles = Array.from({ length: 15 }, (_, i) => ({
  id: `wa${i + 1}`,
  src: `/videos/wa/ang${i + 1}.mp4`,
  title: `Opcion ${i + 7}`
}));

const availableAngles = [...oldAngles, ...waAngles];

export default function StudioCalculator() {
  const [isSeasonPlan, setIsSeasonPlan] = useState(false);
  const [selectedAngles, setSelectedAngles] = useState<string[]>([]);
  const [cameras, setCameras] = useState<Cameras>(0);
  const [hours, setHours] = useState(1);

  const baseRates = { 0: 450, 1: 650, 2: 750, 3: 850 };

  const toggleAngle = (id: string) => {
    if (selectedAngles.includes(id)) {
      setSelectedAngles(selectedAngles.filter(a => a !== id));
    } else {
      if (selectedAngles.length < 3) {
        setSelectedAngles([...selectedAngles, id]);
      }
    }
  };

  const getBreakdown = () => {
    let total = 0;
    const breakdown = [];
    const baseRate = baseRates[cameras];

    for (let i = 1; i <= hours; i++) {
        let rate = baseRate;
        let desc = "P. Normal";
        
        if (i === 2) {
            rate = baseRate * 0.85;
            desc = "-15% off";
        } else if (i === 3) {
            rate = baseRate * 0.75;
            desc = "-25% off";
        } else if (i >= 4) {
            rate = baseRate * 0.65;
            desc = "-35% off";
        }
        
        total += rate;
        breakdown.push({ hour: i, rate, desc });
    }
    
    return { total, breakdown, baseRate };
  }

  const handleWhatsapp = () => {
    let msg = "";
    if (isSeasonPlan) {
      msg = `Hola MAW, me interesa el *Plan Temporada Podcast* que incluye 6 capítulos, equipo profesional (3 cámaras) y edición.`;
    } else {
      const { total, breakdown, baseRate } = getBreakdown();
      const anglesNames = selectedAngles.length > 0 
        ? selectedAngles.map(id => availableAngles.find(a => a.id === id)?.title).join(', ') 
        : 'Ninguno seleccionado';
      const camName = cameras === 0 ? 'Solo Renta (sin grabación)' : `Grabación con ${cameras} cámara(s)`;
      
      msg = `Hola MAW, quiero reservar el estudio.\n\n*Ángulos Seleccionados:* ${anglesNames}\n*Equipo:* ${camName}\n*Duración:* ${hours} hora(s)\n\n*Desglose (Aplica Descuento Acumulativo):*`;
      
      breakdown.forEach(b => {
          msg += `\n- Hora ${b.hour} ${b.desc !== 'P. Normal' ? `(${b.desc})` : ''}: $${b.rate} MXN`;
      });
      msg += `\n\n*Total Estimado:* $${total} MXN`;
    }
    
    const whatsappUrl = `https://wa.me/525541314150?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  const { total, breakdown } = getBreakdown();

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Type Toggle */}
      <div className="flex flex-col sm:flex-row bg-muted rounded-xl p-1 mb-6">
        <button 
          onClick={() => setIsSeasonPlan(false)}
          className={`flex-1 py-3 px-6 text-sm font-semibold rounded-lg transition-all ${!isSeasonPlan ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:bg-background/50'}`}
        >
          Renta por Hora
        </button>
        <button 
          onClick={() => setIsSeasonPlan(true)}
          className={`flex-1 py-3 px-6 text-sm font-semibold rounded-lg transition-all ${isSeasonPlan ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50'}`}
        >
          Plan Temporada Podcast
        </button>
      </div>

      {!isSeasonPlan ? (
        <>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-8 space-y-8 order-2 md:order-1">
            <Card>
              <CardHeader>
                <CardTitle>Configura tu Renta</CardTitle>
                <CardDescription>Escoge tu escenario favorito y cantidad de cámaras. El descuento aplica entre más horas agregues a tu sesión.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Angle Selection */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">1. Elige hasta 3 ángulos:</h3>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary font-bold rounded-full">
                      {selectedAngles.length} / 3 Seleccionados
                    </span>
                  </div>
                  <div className="relative px-8 md:px-12 w-full">
                    <Carousel className="w-full">
                      <CarouselContent className="-ml-2 md:-ml-4">
                        {availableAngles.map((angle) => {
                          const isSelected = selectedAngles.includes(angle.id);
                          const isDisabled = !isSelected && selectedAngles.length >= 3;
                          
                          return (
                            <CarouselItem key={angle.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3">
                              <button 
                                onClick={() => toggleAngle(angle.id)}
                                disabled={isDisabled}
                                className={`w-full group text-left border-2 rounded-xl p-2 md:p-3 flex flex-col items-center transition-all min-h-[140px] 
                                  ${isSelected ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20' : 
                                    isDisabled ? 'border-zinc-800 opacity-40 cursor-not-allowed' : 'border-zinc-800 hover:border-primary/50'}`}
                              >
                                <div className="w-full relative aspect-video rounded overflow-hidden mb-3 border border-zinc-900 bg-black">
                                  <video src={angle.src} className="absolute inset-0 w-full h-full object-contain" autoPlay loop muted playsInline />
                                  {isSelected && (
                                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-lg">
                                      <Check className="w-4 h-4" />
                                    </div>
                                  )}
                                </div>
                                <span className={`font-semibold text-sm md:text-xs text-center ${isSelected ? 'text-primary' : 'text-zinc-300'}`}>{angle.title}</span>
                              </button>
                            </CarouselItem>
                          );
                        })}
                      </CarouselContent>
                      <CarouselPrevious className="-left-6 bg-zinc-900 border-zinc-700 hover:bg-primary" />
                      <CarouselNext className="-right-6 bg-zinc-900 border-zinc-700 hover:bg-primary" />
                    </Carousel>
                  </div>
                </div>

                {/* Cameras */}
                <div className="space-y-4">
                  <h3 className="font-medium">2. Cámaras de Grabación:</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((cam) => (
                      <button
                        key={cam}
                        onClick={() => setCameras(cam as Cameras)}
                        className={`border-2 rounded-xl p-3 flex flex-col items-center text-center transition-all ${cameras === cam ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      >
                        <span className="text-lg font-bold">{cam === 0 ? "0" : cam}</span>
                        <span className="text-xs mt-1">{cam === 0 ? "Solo Renta" : cam === 1 ? "Cámara" : "Cámaras"}</span>
                        {cam === 3 && <span className="text-[10px] text-muted-foreground">(iPhone/ZV-E10)</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div className="space-y-4">
                  <h3 className="font-medium flex justify-between">
                    <span>3. Horas de Renta:</span>
                    <span className="text-primary font-bold">{hours} {hours === 1 ? 'Hora' : 'Horas'}</span>
                  </h3>
                  <div className="pt-4">
                    <input 
                      type="range" 
                      min="1" max="10" 
                      value={hours} 
                      onChange={(e) => setHours(parseInt(e.target.value))}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" 
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>1h</span>
                      <span>5h</span>
                      <span>10h</span>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Info Logistics - moved below cards for mobile */}

          </div>

          <div className="md:col-span-4 sticky top-24 order-1 md:order-2">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="bg-primary/5 pb-6">
                <CardTitle className="text-center">Resumen de Renta</CardTitle>
                <div className="text-center pt-2">
                  <span className="text-4xl font-extrabold tracking-tight">${total}</span>
                  <span className="text-muted-foreground ml-1">MXN</span>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold mb-3">Desglose (Hora por hora):</p>
                  <ul className="space-y-2">
                    {breakdown.map((b, i) => (
                      <li key={i} className="flex justify-between items-center text-sm border-b border-border/40 pb-2 last:border-0">
                        <span className="text-muted-foreground">Hora {b.hour} {b.desc !== 'P. Normal' && <span className="text-green-500 font-medium text-xs ml-1">({b.desc})</span>}</span>
                        <span className="font-medium">${b.rate}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {hours > 1 && (
                  <div className="bg-green-500/10 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>¡Gran elección! Se están aplicando descuentos por renta prolongada.</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-primary/5 p-6 flex flex-col gap-3">
                <Button onClick={handleWhatsapp} size="lg" className="w-full text-base h-12 shadow-md">
                  <WhatsappIcon className="w-5 h-5 mr-3" />
                  Reservar Ahora
                </Button>
                <div className="flex items-start gap-2 text-xs text-muted-foreground pt-1">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-primary mt-0.5" />
                  <div>
                    <span>Cda. Félix Cuevas 13, Tlacoquemecatl del Valle, Benito Juárez, CDMX — </span>
                    <a
                      href="https://www.google.com/search?q=Cda.+Felix+Cuevas+13%2C+Tlacoquemecatl+del+Valle%2C+Benito+Ju%C3%A1rez%2C+03200+Ciudad+de+M%C3%A9xico%2C+CDMX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      Ver en Maps
                    </a>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>

        </div>

        {/* Info Logistics — aparece abajo del precio en móvil, abajo del formulario en desktop */}
        <Card className="bg-zinc-100 dark:bg-zinc-900 border-none mt-2">
          <CardContent className="p-6 text-sm text-zinc-600 dark:text-zinc-400 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
              <p><strong className="text-foreground">Ubicación:</strong> Cda. Félix Cuevas 13, Col. Tlacoquemecatl del Valle.</p>
            </div>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 flex-shrink-0 text-primary" />
              <p><strong className="text-foreground">Políticas:</strong> Llegar 15 min antes, cuidar equipo/mobiliario, agendar previamente. Incluye WiFi y 1 lugar de estacionamiento.</p>
            </div>
          </CardContent>
        </Card>
        </>
      ) : (
        <Card className="border-primary shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-xl text-sm font-bold shadow-sm">
            MÁS POPULAR
          </div>
          <CardHeader className="md:p-10 pb-6">
            <CardTitle className="text-3xl font-extrabold">Plan Temporada Podcast</CardTitle>
            <CardDescription className="text-lg">La solución completa para lanzar tu podcast profesional hoy mismo sin rodeos.</CardDescription>
          </CardHeader>
          <CardContent className="md:px-10 pb-10 space-y-8">
            
            {/* 2-col: Pricing + Instagram */}
            <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <span className="text-3xl font-extrabold tracking-tight text-primary">Cotiza ahora</span>
                <p className="text-muted-foreground mt-1 text-sm">Precio personalizado según tu proyecto</p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-foreground">6 Capítulos garantizados (30 min c/u).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-foreground">Grabación en 2 días (4 horas por día).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-foreground">Equipamiento Total: 3 Cámaras y Audio Profesional (Rode/Hollyland).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-foreground">Edición Multicámara con audio, supers y cortinillas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-foreground">5 Clips cortos verticales para Reels Listos (cortes directos).</span>
                </li>
                <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                   <span className="font-medium text-foreground">Incluye subida directa a Spotify y YouTube.</span>
                </li>
              </ul>
              
              <Button onClick={handleWhatsapp} size="lg" className="w-full md:w-auto mt-4 text-base shadow-md h-12 px-8">
                <WhatsappIcon className="w-5 h-5 mr-3" />
                Agendar Temporada
              </Button>
            </div>
            
            <div className="flex justify-center w-full">
              <div className="relative aspect-[9/16] w-full max-w-[220px] rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-black">
                <iframe
                  className="absolute top-[-68px] left-[-2%] w-[104%] h-[calc(100%+136px)]"
                  src="https://www.instagram.com/p/DXKjS14E0Nn/embed/?hidecaption=true"
                  title="Podcast Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            </div>

            {/* Full-width: Logística y Notas */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border/50">
              <h4 className="font-bold flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
                Logística y Notas
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Este paquete está estructurado para maximizar de forma agresiva tu inversión de tiempo y dinero. 
                Tendrás a nuestro equipo dirigiendo la grabación los 2 días acordados asegurando una calidad premium en imagen y audio.
                <br/><br/>
                Para reservar, recomendamos agendar con al menos 1 semana de anticipación para coordinar equipo humano y fechas de estudio.
              </p>
            </div>

          </CardContent>
        </Card>
      )}

    </div>
  );
}
