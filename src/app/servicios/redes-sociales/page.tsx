"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Megaphone, ArrowRight, CheckCircle2, Sparkles, Crown, Rocket, X as XIcon, FileText } from "lucide-react";
import { contentPortfolioItems } from "@/lib/portfolio-data";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import StudioShowcase from "@/components/studio-showcase";
import LandingStats from "@/components/landing/landing-stats";
import LandingProcess from "@/components/landing/landing-process";
import LandingFaq from "@/components/landing/landing-faq";
import LandingLeadForm from "@/components/landing/landing-lead-form";
import { getLandingData } from "@/lib/landing-data";

const landing = getLandingData("redes-sociales")!;

const socialReels = [
  {
    id: "ig-1",
    label: "Contenido Orgánico",
    title: "Reel para Marca Personal",
    embedUrl: "https://www.instagram.com/p/DWVBObok-eV/embed",
  },
  {
    id: "yt-1",
    label: "Campaña Pagada",
    title: "Anuncio para Conversión",
    embedUrl: "https://www.youtube.com/embed/-y87ZmqVozI",
  },
];

const plans = [
  { id: "emprendedor", icon: Sparkles, name: "Plan Emprendedor", tagline: "Arranca con presencia constante", highlight: false },
  { id: "negocios", icon: Rocket, name: "Plan Negocios", tagline: "Acelera tu crecimiento", highlight: true },
  { id: "empresa", icon: Crown, name: "Plan Empresa", tagline: "La solución integral premium", highlight: false },
];

type CellValue = string | boolean;
const features: { label: string; values: [CellValue, CellValue, CellValue] }[] = [
  { label: "Visitas de grabación al mes", values: ["1", "2", "2"] },
  { label: "Uso del estudio para grabar", values: [false, true, true] },
  { label: "Publicaciones mensuales", values: ["12", "16", "20"] },
  { label: "Videos mensuales", values: ["8", "12", "12"] },
  { label: "Posts / carruseles mensuales", values: ["4", "4", "8"] },
  { label: "Distribución semanal", values: ["2 videos + 1 post", "3 videos + 1 post", "3 videos + 2 posts"] },
  { label: "Meta Ads", values: [true, true, true] },
  { label: "TikTok Ads", values: [false, true, true] },
  { label: "YouTube Ads", values: [false, true, true] },
  { label: "LinkedIn Ads", values: [false, false, true] },
  { label: "Google Ads", values: [false, false, true] },
  { label: "Reseñas mensuales en Google My Business", values: [false, "4", "6"] },
  { label: "🛒 Alta y gestión de TikTok Shop (lives y stock a cargo del cliente)", values: [false, true, true] },
  { label: "🎙️ Video Podcast 30 min/mes (Spotify, FB, YT)", values: [false, false, true] },
  { label: "🌐 Landing Page con dominio (o menú digital si es restaurante)", values: [false, false, true] },
];

const condicionesGenerales = [
  "Todo el contenido se amplifica en Historias",
  "Videos publicados en FB, IG, TikTok y YouTube",
  "Posts y carruseles en FB e IG",
  "Grabación L-V de 10 am a 4 pm",
  "Estudio en Popocatépetl 474, Benito Juárez, CDMX",
  "Equipo: iPhone 16/17, cámara profesional, luces y micrófonos Rode/Hollyland",
];

export default function RedesYAdsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      video: "/videos/redes-sociales.mp4",
      tag: "Contenido Orgánico",
      title: "Construye Comunidad y Autoridad",
      desc: "Planeamos, diseñamos y publicamos por ti. Visuales dinámicos, copy persuasivo y constancia para hacer crecer tu marca.",
    },
    {
      video: "/videos/redes-sociales.mp4",
      tag: "Campañas Pagadas",
      title: "Inversión Inteligente, Resultados Reales",
      desc: "Google, Meta, TikTok y LinkedIn Ads gestionadas con enfoque en datos y ROI. Cada peso invertido trabaja para ti.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="flex flex-col bg-background">
      {/* HERO */}
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
              className="absolute inset-0 w-full h-full object-cover object-top opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}

        <div className="z-10 container px-4 flex flex-col items-center text-center max-w-4xl transition-all duration-700 ease-in-out">
          <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/60 px-3 py-1 text-xs md:text-sm font-medium text-zinc-300 mb-4 backdrop-blur-md shadow-sm">
            <Megaphone className="mr-2 h-3 w-3 md:h-4 md:w-4 text-primary" />
            <span>{slides[currentSlide].tag}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-4 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            {slides[currentSlide].title}
          </h1>
          <p className="max-w-[700px] text-sm md:text-base lg:text-lg text-zinc-300 mb-6 font-light">
            {slides[currentSlide].desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2">
            <Button size="default" className="bg-primary text-primary-foreground hover:opacity-90 font-semibold" asChild>
              <a href="https://wa.me/5633774723?text=Hola%2C%20necesito%20ayuda%20con%20marketing%20en%20redes%20sociales.%20Mi%20negocio%20no%20est%C3%A1%20creciendo%20como%20deber%C3%ADa%20y%20ya%20no%20puedo%20seguirlo%20ignorando.%20%C2%BFPodemos%20hablar%20hoy%3F">
                Cotizar Estrategia
              </a>
            </Button>
            <Button size="default" variant="outline" className="font-semibold bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
              <a href="/brochures/contenido-y-ads.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-2" /> Ver Brochure
              </a>
            </Button>
          </div>

          <div className="absolute bottom-6 flex gap-2 justify-center w-full">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "w-6 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PLANES + SOCIAL REELS */}
      <section className="w-full py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-border">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">Elige tu Plan</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Tres niveles de inversión diseñados para acompañar el crecimiento de tu marca.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* LEFT: Comparison Table (75% on lg) */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-sm">
                {/* Header row with plans */}
                <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] bg-muted/50 border-b border-border/50">
                  <div className="p-4 text-xs font-semibold uppercase tracking-wider text-foreground/60 flex items-center">
                    Características
                  </div>
                  {plans.map((plan) => {
                    const Icon = plan.icon;
                    return (
                      <div
                        key={plan.id}
                        className={`relative p-4 text-center border-l border-border/50 ${plan.highlight ? "bg-primary/10" : ""}`}
                      >
                        {plan.highlight && (
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                            Más Popular
                          </div>
                        )}
                        <div className={`inline-flex w-9 h-9 rounded-full items-center justify-center mb-2 ${plan.highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-sm leading-tight">{plan.name.replace("Plan ", "")}</h3>
                        <p className="text-[10px] text-foreground/60 mt-0.5 leading-tight">{plan.tagline}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Feature rows */}
                <div>
                  {features.map((feature, rowIdx) => (
                    <div
                      key={feature.label}
                      className={`grid grid-cols-[1.4fr_repeat(3,1fr)] border-b border-border/30 last:border-b-0 ${rowIdx % 2 === 1 ? "bg-muted/20" : ""}`}
                    >
                      <div className="p-3 text-sm text-foreground/80 flex items-center">
                        {feature.label}
                      </div>
                      {feature.values.map((value, colIdx) => (
                        <div
                          key={colIdx}
                          className={`p-3 text-center text-sm border-l border-border/30 flex items-center justify-center ${plans[colIdx].highlight ? "bg-primary/5" : ""}`}
                        >
                          {typeof value === "boolean" ? (
                            value ? (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            ) : (
                              <XIcon className="w-4 h-4 text-foreground/30" />
                            )
                          ) : (
                            <span className="font-semibold text-foreground">{value}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* CTA row */}
                <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] bg-muted/50 border-t border-border/50">
                  <div className="p-4 text-sm font-semibold text-foreground/70 flex items-center">
                    Contratar
                  </div>
                  {plans.map((plan) => (
                    <div key={plan.id} className={`p-3 border-l border-border/50 ${plan.highlight ? "bg-primary/10" : ""}`}>
                      <Button
                        asChild
                        variant={plan.highlight ? "default" : "outline"}
                        size="sm"
                        className="w-full font-semibold text-xs"
                      >
                        <a href="https://wa.me/5633774723?text=Hola%2C%20necesito%20ayuda%20con%20marketing%20en%20redes%20sociales.%20Mi%20negocio%20no%20est%C3%A1%20creciendo%20como%20deber%C3%ADa%20y%20ya%20no%20puedo%20seguirlo%20ignorando.%20%C2%BFPodemos%20hablar%20hoy%3F">
                          Contratar <ArrowRight className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-center text-sm text-foreground/60 mt-4">
                ✓ En todos los planes incluimos <span className="font-semibold text-foreground">reporte mensual y junta de resultados</span>
              </p>
            </div>

            {/* RIGHT: Vertical scroll-snap reels (25% on lg) */}
            <div className="lg:col-span-1">
              <div className="text-center mb-3">
                <p className="text-xs text-primary font-semibold uppercase tracking-widest">Nuestro Trabajo</p>
                <p className="text-sm text-foreground/60 mt-1">Desliza para ver más</p>
              </div>
              <div
                className="relative h-[600px] overflow-y-scroll snap-y snap-mandatory rounded-2xl no-scrollbar"
              >
                {socialReels.map((reel) => (
                  <div key={reel.id} className="snap-start h-[600px] flex flex-col items-center justify-center pb-2">
                    <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-xl bg-black">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={reel.embedUrl}
                        title={reel.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="text-center mt-3">
                      <div className="inline-block rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-card">
                        {reel.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Condiciones generales */}
          <div className="mt-12 max-w-5xl mx-auto bg-card border border-border/50 rounded-2xl p-6">
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3 text-center">Aplica para todos los planes</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {condicionesGenerales.map((c) => (
                <div key={c} className="flex items-start gap-2 text-sm text-foreground/70">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BONO ESTUDIO - Planes Negocios y Empresa */}
      <section className="w-full bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-6 pt-16 md:pt-20">
          <div className="max-w-4xl mx-auto text-center mb-4">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
              Incluido en Plan Negocios y Plan Empresa
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-3 text-foreground">Graba tu contenido en nuestro Estudio</h2>
            <p className="text-foreground/70 md:text-lg max-w-2xl mx-auto">
              Al contratar el Plan Negocios o el Plan Empresa puedes grabar tu contenido en nuestro set profesional: luces, micrófonos Rode/Hollyland, cámaras y 2 sets con ambientación diferente.
            </p>
          </div>
        </div>
        <StudioShowcase />
      </section>

      {/* CASOS DE ÉXITO - CAROUSEL FILTRABLE */}
      <ContentSuccessCarousel />

      {landing.stats && <LandingStats data={landing.stats} />}
      {landing.process && <LandingProcess data={landing.process} />}
      {landing.faq && <LandingFaq data={landing.faq} />}
      <LandingLeadForm config={landing.leadForm} />
    </div>
  );
}

function ContentSuccessCarousel() {
  const [typeFilter, setTypeFilter] = useState<string>("Todos");
  const [sectorFilter, setSectorFilter] = useState<string>("Todos");

  const types = Array.from(new Set(contentPortfolioItems.map((i) => i.type)));
  const sectors = Array.from(new Set(contentPortfolioItems.map((i) => i.sector)));

  const filtered = contentPortfolioItems
    .filter((i) => {
      const typeMatch = typeFilter === "Todos" || i.type === typeFilter;
      const sectorMatch = sectorFilter === "Todos" || i.sector === sectorFilter;
      return typeMatch && sectorMatch && i.image;
    })
    .sort((a, b) => {
      const aReal = a.image?.imageUrl?.startsWith("/images/content/") ? 0 : 1;
      const bReal = b.image?.imageUrl?.startsWith("/images/content/") ? 0 : 1;
      return aReal - bReal;
    });

  const autoplay = React.useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border" id="casos">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Casos de Éxito</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-3 text-foreground">Contenido que Conecta</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Filtra por tipo o sector y explora el contenido que creamos para nuestros clientes.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["Todos", ...types].map((t) => (
            <Button
              key={t}
              variant={typeFilter === t ? "default" : "outline"}
              onClick={() => setTypeFilter(t)}
              size="sm"
              className="rounded-full"
            >
              {t}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["Todos", ...sectors].map((s) => (
            <Button
              key={s}
              variant={sectorFilter === s ? "default" : "outline"}
              onClick={() => setSectorFilter(s)}
              size="sm"
              className="rounded-full text-xs"
            >
              {s}
            </Button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="relative px-10 max-w-6xl mx-auto">
            <Carousel
              key={`${typeFilter}-${sectorFilter}`}
              opts={{ align: "start", loop: true }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-3">
                {filtered.map((item) => (
                  <CarouselItem key={item.id} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block group">
                      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                        <div className="relative aspect-square bg-muted overflow-hidden">
                          {item.image && (
                            <Image
                              src={item.image.imageUrl}
                              alt={item.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-sm truncate">{item.client}</h3>
                            <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">{item.type}</span>
                          </div>
                          <p className="text-xs text-foreground/60 mt-1 truncate">{item.sector}</p>
                        </div>
                      </div>
                    </a>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 -ml-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border-none h-10 w-10" />
              <CarouselNext className="right-0 -mr-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border-none h-10 w-10" />
            </Carousel>
          </div>
        ) : (
          <div className="text-center py-16 text-foreground/60">No hay casos con estos filtros.</div>
        )}
      </div>
    </section>
  );
}
