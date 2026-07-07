import * as React from 'react';
import { cn } from '@/lib/utils';

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Número de sección en mono, ej. "01" — se renderiza como "01 — {children}" */
  number?: string;
}

/**
 * Etiqueta editorial en mono: uppercase, tracking amplio, color secundario.
 * Uso: <Eyebrow number="01">Estrategia</Eyebrow> → "01 — ESTRATEGIA"
 */
export function Eyebrow({ number, className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        'font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground',
        className
      )}
      {...props}
    >
      {number ? (
        <>
          <span className="text-primary">{number}</span>
          <span aria-hidden="true" className="mx-3 text-stone">
            —
          </span>
        </>
      ) : null}
      {children}
    </p>
  );
}
