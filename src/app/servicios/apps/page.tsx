"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Globe, MonitorSmartphone, Database, LayoutDashboard, Ticket } from "lucide-react";
import Link from "next/link";
import AnimatedDiv from "@/components/animated-div";
import React from "react";

export default function AppsPage() {
  return (
    <div className="bg-background min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <AnimatedDiv className="max-w-4xl mx-auto">
            <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-8">
              Desarrollo de <span className="text-primary">App's</span>
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed mb-10">
              Transformamos tus ideas en plataformas móviles y web robustas. Ya sea para Android, iOS o sistemas internos a la medida.
            </p>
            <Button size="lg" asChild className="h-14 px-8 text-lg">
              <Link href="/contacto">
                Comenzar Proyecto <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </AnimatedDiv>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl sm:text-5xl font-bold mb-6">Nuestros Desarrollos</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Conoce algunos de los ecosistemas que hemos diseñado e implementado con éxito para nuestros clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            
            {/* 1. App de Transporte */}
            <AnimatedDiv className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-lg group hover:border-primary/50 transition-colors">
              <div className="aspect-video bg-muted p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
                <Ticket className="w-24 h-24 text-primary/20 absolute -right-4 -bottom-4 rotate-12" />
                <div className="text-center relative z-10 w-full h-full flex items-center justify-center">
                    <iframe src="https://www.partycantaritosbus.com.mx/" className="w-[150%] h-[150%] origin-top-left scale-[0.66] pointer-events-none rounded-xl border border-border opacity-90 group-hover:opacity-100 transition-opacity" title="Party Cantaritos Bus"></iframe>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                  <h3 className="font-headline text-2xl font-bold">App de Transporte</h3>
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed">Plataforma web enfocada en reservaciones y logística de tickets de transporte (Party Cantaritos Bus).</p>
                <Button variant="outline" asChild>
                   <a href="https://www.partycantaritosbus.com.mx/" target="_blank" rel="noopener noreferrer">Visitar Proyecto <ArrowRight className="w-4 h-4 ml-2" /></a>
                </Button>
              </div>
            </AnimatedDiv>

            {/* 2. Mensajeria Yaakob */}
            <AnimatedDiv className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-lg group hover:border-primary/50 transition-colors">
              <div className="aspect-video bg-[#1e293b] p-8 flex flex-col items-center justify-center relative overflow-hidden text-center">
                <Smartphone className="w-48 h-48 text-white/5 absolute -left-8 -top-8 -rotate-12" />
                <h4 className="text-5xl font-black text-white mb-3 relative z-10 tracking-widest uppercase">YAAKOB</h4>
                <p className="text-white/60 relative z-10 font-mono tracking-widest text-sm">IOS / ANDROID</p>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <MonitorSmartphone className="w-6 h-6 text-primary" />
                  <h3 className="font-headline text-2xl font-bold">Mensajería y Vinculación SAT</h3>
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed">Aplicación móvil nativa para Android e iOS enfocada en comunicación interna y operaciones corporativas con validaciones satelitales.</p>
                <div className="flex flex-wrap gap-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://apps.apple.com/mx/app/yaakob/id6758861392" target="_blank" rel="noopener noreferrer">App Store (iOS)</a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://play.google.com/store/apps/details?id=com.fernandotrejo.consultora&hl=es_MX" target="_blank" rel="noopener noreferrer">Google Play (Android)</a>
                    </Button>
                </div>
              </div>
            </AnimatedDiv>

            {/* 3. CRM a la Medida */}
            <AnimatedDiv className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-lg group hover:border-primary/50 transition-colors">
              <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden border-b border-border/50 relative">
                 <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center text-white/50 p-6 text-center">
                     <LayoutDashboard className="w-16 h-16 mb-4 opacity-50 text-primary" />
                     <p className="font-medium text-lg">Dashboard y Control Financiero</p>
                     <p className="text-sm opacity-50 mt-2 max-w-xs">(Espacio reservado para las las capturas de pantalla de la plataforma)</p>
                 </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-primary" />
                  <h3 className="font-headline text-2xl font-bold">CRM a la Medida</h3>
                </div>
                <p className="text-foreground/70 leading-relaxed">Sistemas administrativos potentes con dashboards financieros, control de pagos, reportes de ingresos/gastos e impuestos, y seguimiento a saldos pendientes.</p>
              </div>
            </AnimatedDiv>

            {/* 4. App Peliculas */}
            <AnimatedDiv className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-lg group hover:border-primary/50 transition-colors">
              <div className="aspect-video bg-black flex items-center justify-center relative overflow-hidden">
                <iframe src="https://mente-abundante-delta.vercel.app/" className="w-[150%] h-[150%] origin-top-left scale-[0.66] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" title="Películas Online"></iframe>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                  <h3 className="font-headline text-2xl font-bold">Catálogo de Contenido</h3>
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed">Plataforma PWA para consumo de contenido, exploración de catálogo interactivo y estructuración de información (Mente Abundante).</p>
                <Button variant="outline" asChild>
                   <a href="https://mente-abundante-delta.vercel.app/" target="_blank" rel="noopener noreferrer">Visitar Proyecto <ArrowRight className="w-4 h-4 ml-2" /></a>
                </Button>
              </div>
            </AnimatedDiv>

          </div>
        </div>
      </section>
    </div>
  );
}
