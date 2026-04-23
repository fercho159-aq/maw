"use client";

import React from "react";
import { Star } from "lucide-react";
import AnimatedDiv from "../animated-div";
import { Button } from "../ui/button";
import WhatsappIcon from "../icons/whatsapp-icon";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
  {
    name: "Mariana Gutiérrez",
    initials: "MG",
    color: "bg-red-500",
    timeAgo: "hace 2 semanas",
    rating: 5,
    quote: "Grabé 6 capítulos de mi podcast en el estudio de MAW y la calidad del video y del audio quedó impecable. Las luces, los micrófonos y las 3 cámaras hacen toda la diferencia. El equipo súper atento, recomendadísimos.",
    photos: 2,
  },
  {
    name: "Ricardo Muñoz",
    initials: "RM",
    color: "bg-blue-600",
    timeAgo: "hace 1 mes",
    rating: 4,
    quote: "Me hicieron mi sitio web en tiempo récord y me ayudaron con la optimización SEO. Desde que lanzamos triplicamos las cotizaciones. El diseño podría tener un par de detalles más, pero en general muy buen servicio.",
    photos: 0,
  },
  {
    name: "Andrea Lozano",
    initials: "AL",
    color: "bg-emerald-600",
    timeAgo: "hace 3 semanas",
    rating: 5,
    quote: "Llevo 4 meses con ellos manejando mis redes sociales y el cambio ha sido brutal. El contenido que graban en su estudio se ve mucho más profesional que lo que hacía antes con mi celular. Notas la diferencia.",
    photos: 3,
  },
  {
    name: "Carlos Ibáñez",
    initials: "CI",
    color: "bg-amber-600",
    timeAgo: "hace 2 meses",
    rating: 3,
    quote: "Renté el estudio para una cápsula corporativa. El set está bien iluminado y el equipo Rode funciona bien, pero la entrega del editado tardó más de lo acordado. Buen resultado final, pero esperaba más puntualidad.",
    photos: 1,
  },
  {
    name: "Valeria Ortiz",
    initials: "VO",
    color: "bg-purple-600",
    timeAgo: "hace 5 días",
    rating: 5,
    quote: "Desarrollaron mi ecommerce con pasarela de pago y hosting propio. Migraron todos mis productos y capacitaron a mi equipo. Sitio rapidísimo y optimizado para mobile. MAW es súper serio y transparente.",
    photos: 0,
  },
  {
    name: "Jorge Reyes",
    initials: "JR",
    color: "bg-pink-600",
    timeAgo: "hace 1 mes",
    rating: 4,
    quote: "Contraté el plan de redes sociales y me mandan 4 videos por semana grabados en su set. La calidad de luz y encuadre muy bien. Me gustaría que respondieran un poco más rápido por WhatsApp, pero el resultado se nota.",
    photos: 2,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`}
        />
      ))}
    </div>
  );
}

function GoogleGLogo() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

const Testimonials = () => {
  const avgRating = 4.2;
  const totalReviews = reviews.length;
  const autoplay = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedDiv className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border mb-4">
            <GoogleGLogo />
            <span className="text-xs font-semibold text-foreground/80">Reseñas de Google</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Lo que dicen nuestros clientes</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="text-4xl font-bold text-foreground">{avgRating.toFixed(1)}</div>
            <div>
              <Stars count={4} />
              <p className="text-xs text-foreground/60 mt-1">Basado en {totalReviews}+ reseñas</p>
            </div>
          </div>
        </AnimatedDiv>

        <div className="relative px-10 max-w-6xl mx-auto">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {reviews.map((review, idx) => (
                <CarouselItem key={idx} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="bg-background rounded-xl border border-border/60 p-5 shadow-sm h-full flex flex-col hover:shadow-lg transition-shadow">
                    {/* Header: Avatar + Name + G icon */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full ${review.color} text-white font-bold flex items-center justify-center flex-shrink-0 text-sm`}>
                        {review.initials}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-sm text-foreground truncate">{review.name}</p>
                        </div>
                        <p className="text-[11px] text-foreground/50">Local Guide · {review.photos} fotos</p>
                      </div>
                      <GoogleGLogo />
                    </div>

                    {/* Stars + time */}
                    <div className="flex items-center gap-2 mb-3">
                      <Stars count={review.rating} />
                      <span className="text-xs text-foreground/50">{review.timeAgo}</span>
                    </div>

                    {/* Review text */}
                    <p className="text-sm text-foreground/80 leading-relaxed flex-grow">{review.quote}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -ml-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border-none h-10 w-10" />
            <CarouselNext className="right-0 -mr-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border-none h-10 w-10" />
          </Carousel>
        </div>

        <AnimatedDiv className="text-center mt-14">
          <h3 className="font-headline text-2xl sm:text-3xl font-bold">Conviértete en nuestro próximo caso de éxito</h3>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            ¿Listo para ver resultados reales? Hablemos de tu proyecto.
          </p>
          <Button size="lg" className="mt-8" variant="whatsapp" asChild>
            <a href="https://wa.me/525541314150" target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="w-5 h-5 mr-2" />
              Chatea con un experto
            </a>
          </Button>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default Testimonials;
