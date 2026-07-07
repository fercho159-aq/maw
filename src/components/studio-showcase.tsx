"use client";

import React, { useState } from "react";

const SETS = [
  {
    id: "set-1",
    title: "Set principal a dos cámaras",
    mainVideo: "/videos/horiznal.mov",
    subTitle1: "Cámara 1 — vertical",
    subSrc1: "/videos/vertical.mov",
    subTitle2: "Cámara 2 — vertical",
    subSrc2: "/videos/vertical2.mov",
    subObjectPosition: "object-[50%_25%]",
  },
  {
    id: "set-2",
    title: "Set 2 — iluminación cálida",
    mainVideo: "/videos/set3_main.mov",
    subTitle1: "Toma amplia cálida",
    subSrc1: "/videos/set3_sub1.mov",
    subTitle2: "Plano mesa",
    subSrc2: "/videos/set3_sub2.mov",
    subObjectPosition: "object-center",
  },
];

function SetVideo({
  src,
  caption,
  className,
  objectPosition = "object-cover",
}: {
  src: string;
  caption: string;
  className?: string;
  objectPosition?: string;
}) {
  return (
    <figure className={className}>
      <div className="relative aspect-video w-full overflow-hidden border border-ivory/15">
        <video
          key={src}
          src={src}
          className={`absolute inset-0 h-full w-full object-cover ${objectPosition}`}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-ivory/50">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function StudioShowcase() {
  const [currentSet, setCurrentSet] = useState(0);
  const active = SETS[currentSet];

  const handlePrev = () =>
    setCurrentSet((prev) => (prev === 0 ? SETS.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentSet((prev) => (prev === SETS.length - 1 ? 0 : prev + 1));

  return (
    <section className="w-full bg-ink py-24 text-ivory md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Columna de texto */}
          <div className="flex flex-col justify-between lg:col-span-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ivory/50">
                Sets de grabación
              </p>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] md:text-5xl">
                Dos ambientaciones, un mismo estándar de producción.
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-ivory/70">
                Rente el estudio equipado por hora o delegue la producción
                completa a nuestro equipo de video y audio. Cada set está
                calibrado en iluminación, cámaras y microfonía.
              </p>
            </div>

            <div className="mt-12 lg:mt-0">
              <a
                href="https://wa.me/5633774723?text=Hola%2C%20me%20interesa%20agendar%20una%20sesi%C3%B3n%20en%20su%20estudio%20de%20grabaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-ivory/30 px-10 py-4 font-mono text-xs uppercase tracking-[0.25em] text-ivory transition-colors duration-300 hover:border-ivory"
              >
                Agendar sesión de estudio
              </a>
            </div>
          </div>

          {/* Columna de video */}
          <div className="lg:col-span-8">
            <div className="flex items-baseline justify-between border-b border-ivory/15 pb-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ivory/70">
                {active.title}
              </p>
              <div className="flex items-baseline gap-6 font-mono text-xs uppercase tracking-[0.2em]">
                <span className="text-ivory/50">
                  {String(currentSet + 1).padStart(2, "0")} —{" "}
                  {String(SETS.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Set anterior"
                  className="text-ivory/70 transition-colors duration-300 hover:text-ivory"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Set siguiente"
                  className="text-ivory/70 transition-colors duration-300 hover:text-ivory"
                >
                  Siguiente
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-8">
              <SetVideo src={active.mainVideo} caption="Cámara principal" />
              <div className="grid grid-cols-2 gap-8">
                <SetVideo
                  src={active.subSrc1}
                  caption={active.subTitle1}
                  objectPosition={active.subObjectPosition}
                />
                <SetVideo
                  src={active.subSrc2}
                  caption={active.subTitle2}
                  objectPosition={active.subObjectPosition}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
