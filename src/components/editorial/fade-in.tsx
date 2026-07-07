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
 * viewport (0.6s ease-out, una sola vez). Con prefers-reduced-motion
 * el contenido se muestra sin animación.
 */
export function FadeIn({ children, className, delay = 0, y = 24 }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}
