"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Dirección/estilo de la animación de entrada al hacer scroll. */
export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur";

interface AnimatedDivProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Retraso en ms (para escalonar grupos: delay={i * 80}). */
  delay?: number;
  /** Variante de entrada. Default "up" (compatibilidad). */
  variant?: RevealVariant;
}

const AnimatedDiv: React.FC<AnimatedDivProps> = ({
  children,
  className,
  delay = 0,
  variant = "up",
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respeta la preferencia de movimiento reducido.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      className={cn("reveal", className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedDiv;
