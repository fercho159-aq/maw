import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RuleProps extends React.HTMLAttributes<HTMLHRElement> {}

/**
 * Regla horizontal editorial: 1px, tono stone atenuado, estilo revista.
 */
export function Rule({ className, ...props }: RuleProps) {
  return (
    <hr
      className={cn('h-px w-full border-0 bg-stone/40', className)}
      {...props}
    />
  );
}
