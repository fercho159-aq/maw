'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Retraso en segundos antes de iniciar la entrada */
  delay?: number;
  /** Desplazamiento vertical inicial en px (default 24) */
  y?: number;
}

/**
 * Entrada editorial única permitida: fade + rise sutil al entrar en
 * viewport (0.6s ease-out, una sola vez). La visibilidad se resuelve con
 * una medición síncrona al montar (los elementos above-the-fold aparecen
 * sin depender del primer scroll) y un IntersectionObserver propio para
 * el resto. Con prefers-reduced-motion el contenido se muestra estático.
 */
export function FadeIn({ children, className, delay = 0, y = 24 }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}
