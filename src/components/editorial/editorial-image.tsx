import * as React from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export type EditorialRatio = '4:5' | '3:2' | '1:1' | '16:9';

const RATIO_CLASSES: Record<EditorialRatio, string> = {
  '4:5': 'aspect-[4/5]',
  '3:2': 'aspect-[3/2]',
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
};

export interface EditorialImageProps
  extends Omit<ImageProps, 'fill' | 'width' | 'height'> {
  /** Ratio editorial del marco (default 3:2) */
  ratio?: EditorialRatio;
  /** Clases para el contenedor exterior */
  className?: string;
  /** Clases extra para el elemento img */
  imgClassName?: string;
}

/**
 * Imagen editorial: marco con ratio fijo, object-cover y tratamiento
 * desaturado sutil para homogeneizar material de calidad dispareja.
 */
export function EditorialImage({
  ratio = '3:2',
  className,
  imgClassName,
  alt,
  sizes = '(max-width: 768px) 100vw, 50vw',
  ...props
}: EditorialImageProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-paper',
        RATIO_CLASSES[ratio],
        className
      )}
    >
      <Image
        alt={alt}
        fill
        sizes={sizes}
        className={cn('object-cover saturate-[0.75]', imgClassName)}
        {...props}
      />
    </div>
  );
}
