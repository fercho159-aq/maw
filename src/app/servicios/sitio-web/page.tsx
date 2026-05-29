"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers, Search, ShieldCheck, Settings, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { portfolioItems, portfolioCategories, portfolioSectors } from "@/lib/portfolio-data";
import LandingStats from "@/components/landing/landing-stats";
import LandingProcess from "@/components/landing/landing-process";
import LandingFaq from "@/components/landing/landing-faq";
import LandingLeadForm from "@/components/landing/landing-lead-form";
import { getLandingData } from "@/lib/landing-data";

const landing = getLandingData("sitio-web")!;

type CellValue = string | boolean;

const webPlans = [
  { id: "landing", name: "Landing Page", tagline: "Presencia esencial", price: "Desde $7,900", highlight: false },
  { id: "empresarial", name: "Sitio Empresarial", tagline: "Crecimiento y autoridad", price: "Desde $24,900", highlight: true },
  { id: "ecommerce", name: "E-Commerce", tagline: "Tienda en línea completa", price: "Desde $44,900", highlight: false },
];

const sections: { title: string; icon: typeof Layers; rows: { label: string; values: [CellValue, CellValue, CellValue] }[] }[] = [
  {
    title: "Desarrollo",
    icon: Layers,
    rows: [
      { label: "Diseño Responsive (móvil + tablet + desktop)", values: [true, true, true] },
      { label: "Tecnología", values: ["WordPress", "WordPress o a la medida", "WooCommerce o a la medida"] },
    ],
  },
  {
    title: "SEO & Analítica",
    icon: Search,
    rows: [
      { label: "Google Analytics 4", values: [false, true, true] },
      { label: "Google Search Console", values: [false, true, true] },
      { label: "SEO On-Page", values: ["Básico", "Completo", "Avanzado e-commerce"] },
      { label: "Google My Business", values: [true, true, true] },
    ],
  },
  {
    title: "Seguridad & Hosting",
    icon: ShieldCheck,
    rows: [
      { label: "Dominio (1er año)", values: [true, true, true] },
      { label: "Hosting (1er año)", values: [true, true, true] },
      { label: "Certificado SSL", values: [true, true, true] },
      { label: "Respaldos automáticos", values: [false, true, true] },
    ],
  },
  {
    title: "Operaciones & E-Commerce",
    icon: Settings,
    rows: [
      { label: "Correos corporativos (10 cuentas)", values: [false, true, true] },
      { label: "Mantenimiento anual incluido", values: [false, true, true] },
      { label: "Pasarelas de pago", values: [false, false, "Mercado Pago y PayPal"] },
      { label: "Catálogo de productos", values: [false, false, "Alta de los primeros 20 productos"] },
    ],
  },
];

function Cell({ value, highlight }: { value: CellValue; highlight: boolean }) {
  return (
    <div className={`p-3 text-center text-sm border-l border-white/5 flex items-center justify-center ${highlight ? "bg-primary/10" : ""}`}>
      {typeof value === "boolean" ? (
        value ? (
          <CheckCircle2 className="w-5 h-5 text-primary" />
        ) : (
          <span className="text-white/30 text-lg">—</span>
        )
      ) : (
        <span className="font-medium text-white/90 text-xs md:text-sm">{value}</span>
      )}
    </div>
  );
}

const SitioWebPage = () => {
  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center bg-zinc-950 text-white border-b border-border/50">
        <video
          src="/videos/Creaci%C3%B3n_de_Sitio_Web_con_Perro.mp4#t=2"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="z-10 container mx-auto px-4 md:px-6 text-center flex flex-col items-center">
          <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tighter drop-shadow-2xl">
            Desarrollo de Sitios Web
          </h1>
          <p className="text-lg md:text-xl text-zinc-100 font-medium max-w-[700px] drop-shadow-lg mb-6">
            Diseñamos sitios modernos, rápidos y optimizados para la conversión. El centro perfecto para tu ecosistema digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" asChild className="font-semibold px-8 rounded-full shadow-lg">
              <a href="https://wa.me/5538359927?text=Hola%2C%20quiero%20cotizar%20una%20p%C3%A1gina%20web%20profesional%20para%20mi%20negocio.%20Cada%20d%C3%ADa%20sin%20una%20web%20estoy%20perdiendo%20clientes%20frente%20a%20mi%20competencia.%20%C2%BFTienen%20disponibilidad%20esta%20semana%3F">
                Cotizar mi Sitio <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-6 rounded-full bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
              <a href="/brochures/sitio-web.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-2" /> Ver Brochure
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* PRICING COMPARISON TABLE + VIDEO */}
      <section className="py-20 md:py-28 bg-zinc-950 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Planes</p>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
              Elige el plan correcto para tu marca
            </h2>
            <p className="text-white/60 md:text-lg">
              Transparencia total. Compara feature por feature y elige el nivel que se ajusta a tu operación.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start max-w-7xl mx-auto mb-10">
            <div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl">
              {/* Plan Header Row */}
              <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] bg-white/[0.03] border-b border-white/10">
                <div className="p-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 flex items-center">
                  Comparativa
                </div>
                {webPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative p-5 text-center border-l border-white/10 ${
                      plan.highlight
                        ? "bg-gradient-to-b from-primary/15 to-transparent ring-1 ring-inset ring-primary/40 shadow-[0_0_40px_-10px] shadow-primary/40"
                        : ""
                    }`}
                  >
                    <h3 className="font-bold text-base md:text-lg leading-tight text-white">{plan.name}</h3>
                    <p className="text-[11px] text-white/50 mt-1 tracking-wide">{plan.tagline}</p>
                    <p className="text-base md:text-lg font-extrabold text-white mt-2">{plan.price}</p>
                  </div>
                ))}
              </div>

              {/* Sections */}
              {sections.map((section) => {
                const SIcon = section.icon;
                return (
                  <div key={section.title}>
                    {/* Section label */}
                    <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] bg-white/[0.015] border-b border-white/5">
                      <div className="px-5 py-3 flex items-center gap-2.5">
                        <SIcon className="w-4 h-4 text-primary/80" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">{section.title}</span>
                      </div>
                      {webPlans.map((plan) => (
                        <div key={plan.id} className={`border-l border-white/5 ${plan.highlight ? "bg-primary/5" : ""}`} />
                      ))}
                    </div>

                    {/* Feature rows */}
                    {section.rows.map((row) => (
                      <div key={row.label} className="grid grid-cols-[1.6fr_repeat(3,1fr)] border-b border-white/5 hover:bg-white/[0.015] transition-colors">
                        <div className="px-5 py-3.5 text-sm text-white/80 flex items-center">
                          {row.label}
                        </div>
                        {row.values.map((value, idx) => (
                          <Cell key={idx} value={value} highlight={webPlans[idx].highlight} />
                        ))}
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* CTA row */}
              <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] bg-white/[0.03] border-t border-white/10">
                <div className="p-5 text-sm font-semibold text-white/60 flex items-center">
                  Contratar
                </div>
                {webPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-4 border-l border-white/10 ${
                      plan.highlight ? "bg-primary/10 ring-1 ring-inset ring-primary/30" : ""
                    }`}
                  >
                    <Button
                      asChild
                      variant={plan.highlight ? "default" : "outline"}
                      size="sm"
                      className={`w-full font-semibold text-xs ${!plan.highlight ? "bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white" : ""}`}
                    >
                      <a href="https://wa.me/5538359927?text=Hola%2C%20quiero%20cotizar%20una%20p%C3%A1gina%20web%20profesional%20para%20mi%20negocio.%20Cada%20d%C3%ADa%20sin%20una%20web%20estoy%20perdiendo%20clientes%20frente%20a%20mi%20competencia.%20%C2%BFTienen%20disponibilidad%20esta%20semana%3F">
                        Cotizar <ArrowRight className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-white/40 mt-5 tracking-wide">
              Todos los planes incluyen configuración de dominio, capacitación y soporte post-entrega.
            </p>
            </div>

            {/* Instagram video column */}
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-[9/16] w-full max-w-[340px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.tiktok.com/player/v1/7622062804270370055?autoplay=1&loop=1&music_info=0&description=0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WebsitesPortfolioCarousel />

      {landing.stats && <LandingStats data={landing.stats} />}
      {landing.process && <LandingProcess data={landing.process} />}
      {landing.faq && <LandingFaq data={landing.faq} />}
      <LandingLeadForm config={landing.leadForm} />
    </div>
  );
};

function WebsitesPortfolioCarousel() {
  const [categoryFilter, setCategoryFilter] = useState<string>("Todos");
  const [sectorFilter, setSectorFilter] = useState<string>("Todos");

  const filtered = useMemo(() => {
    return portfolioItems.filter((item) => {
      const categoryMatch = categoryFilter === "Todos" || item.category === categoryFilter;
      const sectorMatch = sectorFilter === "Todos" || item.sector === sectorFilter;
      return categoryMatch && sectorMatch && item.image;
    });
  }, [categoryFilter, sectorFilter]);

  const autoplay = React.useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border" id="casos">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Casos de Éxito</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-3 text-foreground">Nuestros Sitios Web</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Filtra por categoría o sector y explora proyectos que hemos desarrollado.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["Todos", ...portfolioCategories].map((c) => (
            <Button
              key={c}
              variant={categoryFilter === c ? "default" : "outline"}
              onClick={() => setCategoryFilter(c)}
              size="sm"
              className="rounded-full"
            >
              {c}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["Todos", ...portfolioSectors].map((s) => (
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
              key={`${categoryFilter}-${sectorFilter}`}
              opts={{ align: "start", loop: true }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-3">
                {filtered.map((item) => (
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
  );
}

export default SitioWebPage;
