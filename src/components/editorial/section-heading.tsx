import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow } from './eyebrow';

type HeadingLevel = 'h1' | 'h2' | 'h3';

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Texto de la etiqueta mono superior, ej. "Estrategia" */
  eyebrow?: string;
  /** Número de sección en mono, ej. "01" */
  number?: string;
  /** Titular en serif display */
  title: React.ReactNode;
  /** Elemento del titular (default h2) */
  as?: HeadingLevel;
  /** Párrafo introductorio opcional bajo el titular */
  description?: React.ReactNode;
  /** Clases extra para el titular */
  titleClassName?: string;
}

/**
 * Encabezado de sección editorial: eyebrow mono opcional + titular serif
 * display + descripción opcional en texto secundario.
 */
export function SectionHeading({
  eyebrow,
  number,
  title,
  as: HeadingTag = 'h2',
  description,
  className,
  titleClassName,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn('space-y-6', className)} {...props}>
      {eyebrow ? <Eyebrow number={number}>{eyebrow}</Eyebrow> : null}
      <HeadingTag
        className={cn(
          'font-display text-4xl leading-[1.08] tracking-[-0.01em] text-foreground md:text-display-xs lg:text-display-sm',
          titleClassName
        )}
      >
        {title}
      </HeadingTag>
      {description ? (
        <p className="max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
