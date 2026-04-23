"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, CheckCircle2, Send, Link as LinkIcon, ShoppingCart, Gauge, Search, Smartphone, Palette, Rocket, Headphones, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AnimatedDiv from '../animated-div';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { portfolioItems, portfolioCategories, portfolioSectors } from "@/lib/portfolio-data";
import Autoplay from "embla-carousel-autoplay";

const webProjects: { id: string; title: string; description: string; videoUrl: string; startTime?: number; links: { label: string; url: string }[] }[] = [
  {
    id: "landing-1",
    title: "Landing Page",
    description: "Página de aterrizaje optimizada para campañas y conversión.",
    videoUrl: "/videos/web1.mp4",
    startTime: 3,
    links: []
  },
  {
    id: "conectivo-1",
    title: "Sitio Conectivo",
    description: "Sitio corporativo para presentar tu marca, servicios y contacto.",
    videoUrl: "/videos/web2.mp4",
    startTime: 3,
    links: []
  },
  {
    id: "ecommerce-1",
    title: "E-commerce",
    description: "Tienda en línea con carrito de compras y pasarela de pago.",
    videoUrl: "/videos/web3.mp4",
    startTime: 3,
    links: []
  },
  {
    id: "catalogo-1",
    title: "Catálogo Digital",
    description: "Vitrina digital para exhibir productos sin venta directa.",
    videoUrl: "/videos/en a la medida.mp4",
    startTime: 3,
    links: []
  }
];

const capabilities = [
  { icon: Send, label: "Landing Pages de Alta Conversión" },
  { icon: LinkIcon, label: "Sitios Corporativos y Conectivos" },
  { icon: ShoppingCart, label: "Tiendas E-commerce Completas" },
];

const entregables = [
  { icon: Gauge, label: "Optimización de velocidad y Core Web Vitals" },
  { icon: Search, label: "SEO técnico y metaetiquetas configuradas" },
  { icon: Smartphone, label: "Diseño responsivo para móvil, tablet y desktop" },
  { icon: Palette, label: "Diseño UI alineado a tu identidad de marca" },
  { icon: Rocket, label: "Despliegue y dominio configurado en producción" },
  { icon: Headphones, label: "Soporte post-entrega incluido" },
];

export default function WebDevShowcase() {
  const [categoryFilter, setCategoryFilter] = useState<string>("Todos");
  const [sectorFilter, setSectorFilter] = useState<string>("Todos");

  const filteredPortfolio = useMemo(() => {
    return portfolioItems.filter(item => {
      const categoryMatch = categoryFilter === "Todos" || item.category === categoryFilter;
      const sectorMatch = sectorFilter === "Todos" || item.sector === sectorFilter;
      return categoryMatch && sectorMatch && item.image;
    });
  }, [categoryFilter, sectorFilter]);

  const autoplayPlugin = React.useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));

  return (
    <div className="w-full">
      {/* Hero Banner Video */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center bg-zinc-950 text-white border-y border-border/50">
        <video
          src="/videos/Creación_de_Sitio_Web_con_Perro.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="z-10 container px-4 flex flex-col items-center text-center max-w-4xl">
           <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/60 px-3 py-1 text-xs md:text-sm font-medium text-zinc-300 mb-4 backdrop-blur-md shadow-sm">
             <Globe className="mr-2 h-3 w-3 md:h-4 md:w-4 text-primary" />
             <span>Desarrollo de Sitios Web</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-white">Sitios Web a la Medida</h1>
           <p className="max-w-[700px] text-lg text-zinc-200 font-light mb-6">Desde Landing Pages optimizadas para conversión hasta plataformas E-commerce robustas, diseñadas para impulsar tu negocio.</p>
           <div className="flex flex-col sm:flex-row gap-3">
             <Button size="lg" asChild className="font-semibold px-8 py-6 rounded-full shadow-lg">
                 <a href="https://wa.link/zxgh8j">
                     Cotiza tu Sitio Web <ArrowRight className="w-5 h-5 ml-2" />
                 </a>
             </Button>
             <Button size="lg" variant="outline" className="font-semibold px-6 py-6 rounded-full bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
               <a href="/brochures/sitio-web.pdf" target="_blank" rel="noopener noreferrer">
                 <FileText className="w-4 h-4 mr-2" /> Ver Brochure
               </a>
             </Button>
           </div>
        </div>
      </section>

      {/* Two-column: Carousel (left) + CTA Info (right) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT: Carousel — 2 projects visible at a time */}
            <div className="relative px-10">
              <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent className="-ml-3">
                  {webProjects.map((project) => (
                    <CarouselItem key={project.id} className="pl-3 basis-1/2">
                      <AnimatedDiv className="bg-card border border-border/50 rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">

                        {/* iPhone Mockup */}
                        <div className="relative mx-auto w-full max-w-[200px] aspect-[9/19.5] border-[10px] border-zinc-950 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-xl bg-black mb-5">
                          <div className="absolute top-0 inset-x-0 h-5 bg-zinc-950 dark:bg-zinc-800 rounded-b-xl w-24 mx-auto z-10 flex justify-center items-end pb-1">
                             <div className="w-10 h-1 bg-black/50 rounded-full"></div>
                          </div>

                          {project.videoUrl ? (
                            <video
                              key={project.videoUrl}
                              src={`${project.videoUrl}#t=${project.startTime ?? 0}`}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="text-center flex flex-col justify-center items-center h-full text-foreground/40 p-4">
                              <Smartphone className="w-12 h-12 mb-3 opacity-30" />
                              <p className="text-xs">Video pendiente</p>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-grow items-center text-center px-1">
                          <h3 className="font-headline text-base font-bold mb-2">{project.title}</h3>
                          <p className="text-foreground/70 mb-4 text-xs leading-relaxed">{project.description}</p>

                          <div className="mt-auto w-full">
                            {project.links.length > 0 ? (
                              <div className="flex flex-col gap-2 w-full">
                                {project.links.map((link, idx) => (
                                  <Button key={idx} variant={idx === 0 ? "default" : "outline"} asChild className="w-full justify-between text-xs h-8" size="sm">
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                      {link.label} <ArrowRight className="w-3 h-3 ml-2" />
                                    </a>
                                  </Button>
                                ))}
                              </div>
                            ) : (
                              <div className="text-[11px] text-primary/70 bg-primary/10 px-3 py-2 rounded-lg font-medium w-full">
                                Próximamente
                              </div>
                            )}
                          </div>
                        </div>
                      </AnimatedDiv>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 -ml-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border-none h-10 w-10" />
                <CarouselNext className="right-0 -mr-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border-none h-10 w-10" />
              </Carousel>
            </div>

            {/* RIGHT: Capabilities + Pricing + Entregables */}
            <div className="flex flex-col gap-8">

              {/* What we build */}
              <div>
                <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">¿Qué construimos?</p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-4 text-foreground leading-tight">
                  Sitios Web Profesionales<br />
                  <span className="text-primary">desde $9,800 MXN</span>
                </h2>
                <div className="flex flex-col gap-3 mb-6">
                  {capabilities.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entregables */}
              <div className="bg-card border border-border/50 rounded-2xl p-6">
                <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-4">Lo que recibes</p>
                <h3 className="font-bold text-lg mb-4">Entregables del Proyecto</h3>
                <div className="grid grid-cols-1 gap-3">
                  {entregables.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button size="lg" asChild className="w-full md:w-fit h-12 font-bold px-8 shadow-xl">
                <a href="https://wa.link/zxgh8j">
                  Cotizar mi Sitio Web <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>

            </div>

          </div>
        </div>
      </section>


      {/* Portfolio Carousel: Nuestros Sitios Web con filtros */}
      <section className="py-16 md:py-20 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Casos de Éxito</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-3 text-foreground">Nuestros Sitios Web</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">Filtra por categoría o sector y explora proyectos que hemos desarrollado.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {["Todos", ...portfolioCategories].map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                onClick={() => setCategoryFilter(category)}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["Todos", ...portfolioSectors].map((sector) => (
              <Button
                key={sector}
                variant={sectorFilter === sector ? "default" : "outline"}
                onClick={() => setSectorFilter(sector)}
                size="sm"
                className="rounded-full text-xs"
              >
                {sector}
              </Button>
            ))}
          </div>

          {filteredPortfolio.length > 0 ? (
            <div className="relative px-10 max-w-6xl mx-auto">
              <Carousel
                key={`${categoryFilter}-${sectorFilter}`}
                opts={{ align: "start", loop: true }}
                plugins={[autoplayPlugin.current]}
                className="w-full"
              >
                <CarouselContent className="-ml-3">
                  {filteredPortfolio.map((item) => (
                    <CarouselItem key={item.id} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                      <Link href={`/portafolio/${item.id}`} className="block group">
                        <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                          <div className="relative aspect-video bg-muted overflow-hidden">
                            {item.image && (
                              <Image
                                src={item.image.imageUrl}
                                alt={item.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                              />
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-semibold text-sm truncate">{item.client}</h3>
                              <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">{item.category}</span>
                            </div>
                            <p className="text-xs text-foreground/60 mt-1 truncate">{item.sector}</p>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 -ml-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border-none h-10 w-10" />
                <CarouselNext className="right-0 -mr-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border-none h-10 w-10" />
              </Carousel>
            </div>
          ) : (
            <div className="text-center py-16 text-foreground/60">No hay proyectos con estos filtros.</div>
          )}
        </div>
      </section>

      {/* Full-width banner: ¿Necesitas un CRM o App? */}
      <section className="w-full bg-primary/5 border-t border-primary/20">
        <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-foreground text-xl">¿Necesitas algo más complejo?</p>
            <p className="text-foreground/70 mt-1">
              También desarrollamos <span className="font-semibold text-foreground">CRMs, Apps Nativas y Dashboards</span> a la medida desde{" "}
              <span className="font-semibold text-primary">$19,900 MXN</span>.
            </p>
          </div>
          <Button size="lg" asChild className="flex-shrink-0 font-semibold px-8">
            <Link href="/servicios/desarrollo-a-la-medida">
              Ver Desarrollo a la Medida <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
