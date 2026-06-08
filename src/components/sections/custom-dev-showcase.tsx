import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, CheckCircle2, Smartphone, Globe, FileText, GitBranch, Palette, BookOpen, Rocket, Headphones } from "lucide-react";
import AnimatedDiv from '../animated-div';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const customApps = [
  {
    id: "partybus",
    title: "App de Transporte (Party Bus)",
    description: "Plataforma web ágil y eficiente enfocada en reservaciones, venta y logística de tickets de transporte.",
    videoUrl: "/videos/partybus.mp4",
    startTime: 4,
    links: [{ label: "Visitar Proyecto", url: "https://www.partycantaritosbus.com.mx/" }]
  },
  {
    id: "peliculas",
    title: "Mente Abundante",
    description: "Plataforma PWA para consumo de películas interactivas.",
    videoUrl: "/videos/Mente abundante.mp4",
    startTime: 4,
    links: [{ label: "Visitar Proyecto", url: "https://mente-abundante-delta.vercel.app/" }]
  },
  {
    id: "crm-maw",
    title: "CRM MAW",
    description: "Dashboard interno personalizado para administración de procesos y optimización de tareas metódicas.",
    videoUrl: "/videos/crm maw.mp4",
    startTime: 5,
    links: []
  },
  {
    id: "crm-brooklyn",
    title: "CRM Brooklyn",
    description: "Sistema a la medida de operaciones diseñado para reemplazar tareas repetitivas y ahorrar tiempo.",
    videoUrl: "/videos/brooklyn.mp4",
    startTime: 4,
    links: []
  },
  {
    id: "yaakob-id",
    title: "Yaakob (Check ID)",
    description: "Aplicación móvil nativa para Android e iOS enfocada en validación de identidad biométrica.",
    videoUrl: "/videos/yakob.mp4",
    startTime: 4,
    links: [
       { label: "App Store", url: "https://apps.apple.com/mx/app/yaakob/id6758861392" },
       { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.fernandotrejo.consultora&hl=es_MX" }
    ]
  },
  {
    id: "yaakob-chat",
    title: "Yaakob (Mensajería)",
    description: "Plataforma empresarial que combina comunicación interna corporativa y vinculación al SAT.",
    videoUrl: "/videos/mensajes.mp4",
    startTime: 3,
    links: [
       { label: "App Store", url: "https://apps.apple.com/mx/app/yaakob/id6758861392" },
       { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.fernandotrejo.consultora&hl=es_MX" }
    ]
  }
];

const capabilities = [
  { icon: Globe, label: "Web Apps a la Medida" },
  { icon: Smartphone, label: "Apps Nativas Android e iOS" },
  { icon: Code2, label: "CRMs y Dashboards Empresariales" },
];

const entregables = [
  { icon: GitBranch, label: "Código fuente completo y documentado" },
  { icon: BookOpen, label: "Documentación técnica y de usuario" },
  { icon: Rocket, label: "Despliegue y configuración en producción" },
  { icon: FileText, label: "APIs conectadas y funcionales" },
  { icon: Headphones, label: "Soporte post-entrega incluido" },
];

export default function CustomDevShowcase() {
  return (
    <div className="w-full">
      {/* Hero Banner Video */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center bg-zinc-950 text-white border-y border-border/50">
        <video
          src="/videos/Video_Generado_Listo_Para_Ver.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="z-10 container px-4 flex flex-col items-center text-center max-w-4xl">
           <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/60 px-3 py-1 text-xs md:text-sm font-medium text-zinc-300 mb-4 backdrop-blur-md shadow-sm">
             <Code2 className="mr-2 h-3 w-3 md:h-4 md:w-4 text-primary" />
             <span>Desarrollo de Software y Apps</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-white">Desarrollo a la Medida</h1>
           <p className="max-w-[700px] text-lg text-zinc-200 font-light mb-6">Creamos desde Aplicaciones Móviles Nativas hasta CRMs complejos diseñados exclusivamente para tu flujo operativo corporativo.</p>
           <div className="flex flex-col sm:flex-row gap-3">
             <Button size="lg" asChild className="font-semibold px-8 py-6 rounded-full shadow-lg">
                 <a href="https://wa.me/5633774723?text=Hola%2C%20tengo%20una%20idea%20de%20app%20para%20mi%20negocio%20y%20cada%20mes%20que%20pasa%20es%20dinero%20que%20estoy%20dejando%20ir.%20%C2%BFPueden%20ayudarme%3F%20%C2%BFCu%C3%A1ndo%20podemos%20hablar%3F">
                     Cotiza tu Solución <ArrowRight className="w-5 h-5 ml-2" />
                 </a>
             </Button>
             <Button size="lg" variant="outline" className="font-semibold px-6 py-6 rounded-full bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
               <a href="/brochures/apps-y-desarrollo.pdf" target="_blank" rel="noopener noreferrer">
                 <FileText className="w-4 h-4 mr-2" /> Ver Brochure
               </a>
             </Button>
           </div>
        </div>
      </section>

      {/* Two-column: Carousel (left) + CTA Info (right) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* LEFT: Carousel — sticky while right scrolls */}
            <div className="relative px-10 lg:sticky lg:top-24">
              <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent className="-ml-3">
                  {customApps.map((app) => (
                    <CarouselItem key={app.id} className="pl-3 basis-1/2">
                      <AnimatedDiv className="bg-card border border-border/50 rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                        
                        {/* iPhone Mockup */}
                        <div className="relative mx-auto w-full max-w-[200px] aspect-[9/19.5] border-[10px] border-zinc-950 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-xl bg-black mb-5">
                          <div className="absolute top-0 inset-x-0 h-5 bg-zinc-950 dark:bg-zinc-800 rounded-b-xl w-24 mx-auto z-10 flex justify-center items-end pb-1">
                             <div className="w-10 h-1 bg-black/50 rounded-full"></div>
                          </div>
                          
                          {app.videoUrl ? (
                            <video 
                              key={app.videoUrl}
                              src={`${app.videoUrl}#t=${app.startTime ?? 4}`} 
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
                          <h3 className="font-headline text-base font-bold mb-2">{app.title}</h3>
                          <p className="text-foreground/70 mb-4 text-xs leading-relaxed">{app.description}</p>
                          
                          <div className="mt-auto w-full">
                            {app.links.length > 0 ? (
                              <div className="flex flex-col gap-2 w-full">
                                {app.links.map((link, idx) => (
                                  <Button key={idx} variant={idx === 0 ? "default" : "outline"} asChild className="w-full justify-between text-xs h-8" size="sm">
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                      {link.label} <ArrowRight className="w-3 h-3 ml-2" />
                                    </a>
                                  </Button>
                                ))}
                              </div>
                            ) : (
                              <div className="text-[11px] text-primary/70 bg-primary/10 px-3 py-2 rounded-lg font-medium w-full">
                                Proyecto Interno
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

            {/* RIGHT: Video (top) + Capabilities + Pricing + Entregables */}
            <div className="flex flex-col gap-8">

              {/* TikTok Video */}
              <div className="relative aspect-[9/16] w-full max-w-[340px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.tiktok.com/player/v1/7623927808527502600?autoplay=1&loop=1&music_info=0&description=0"
                  title="Desarrollo a la medida"
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* What we build */}
              <div>
                <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">¿Qué construimos?</p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-4 text-foreground leading-tight">
                  Desarrollos a la Medida<br />
                  <span className="text-primary">desde $19,900 MXN</span>
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

                {/* Store Logos */}
                <div className="flex items-center gap-4 flex-wrap">
                  {/* Google Play */}
                  <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:opacity-80 transition-opacity">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.18 23.76c.3.17.64.24.98.2L15.54 12 11.9 8.36 3.18 23.76zm16.29-10.7L16.7 11.5l-3.07 3.07 3.08 3.08 2.77-1.57a1.75 1.75 0 0 0 0-3.02zM3.55.26A1.75 1.75 0 0 0 3 1.55V22.45c0 .48.2.9.53 1.2L15.2 12 3.55.26zm8.35 11.1L15.54 12 4.16.24c-.33-.19-.7-.24-1-.2L11.9 11.36z"/>
                    </svg>
                    <div>
                      <p className="text-[9px] opacity-70 leading-none">Disponible en</p>
                      <p className="text-xs font-bold leading-none">Google Play</p>
                    </div>
                  </a>

                  {/* App Store */}
                  <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:opacity-80 transition-opacity">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.19 1.29-2.17 3.84.03 3.05 2.66 4.06 2.69 4.07l-.07.21zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div>
                      <p className="text-[9px] opacity-70 leading-none">Descarga en</p>
                      <p className="text-xs font-bold leading-none">App Store</p>
                    </div>
                  </a>
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
                <a href="https://wa.me/5633774723?text=Hola%2C%20tengo%20una%20idea%20de%20app%20para%20mi%20negocio%20y%20cada%20mes%20que%20pasa%20es%20dinero%20que%20estoy%20dejando%20ir.%20%C2%BFPueden%20ayudarme%3F%20%C2%BFCu%C3%A1ndo%20podemos%20hablar%3F">
                  Cotizar mi Proyecto <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>

            </div>

          </div>
        </div>
      </section>


      {/* Full-width banner: ¿Ocupas un sitio web? */}
      <section className="w-full bg-primary/5 border-t border-primary/20">
        <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-foreground text-xl">¿Ocupas un sitio web?</p>
            <p className="text-foreground/70 mt-1">
              Hemos construido más de <span className="font-semibold text-foreground">200 sitios web</span> ecommerce e informativos. Cotiza ahora desde{" "}
              <span className="font-semibold text-primary">$9,800 MXN</span>.
            </p>
          </div>
          <Button size="lg" asChild className="flex-shrink-0 font-semibold px-8">
            <a href="/servicios/desarrollo-web">
              Ver Sitios Web <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
