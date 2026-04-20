'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const priorityConfig: Record<string, { label: string; className: string }> = {
  low: {
    label: 'Baja',
    className: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
  },
  medium: {
    label: 'Media',
    className: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
  },
  high: {
    label: 'Alta',
    className: 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30',
  },
};

export default function PriorityBadge({
  priority,
}: {
  priority: 'low' | 'medium' | 'high';
}) {
  const config = priorityConfig[priority] ?? priorityConfig.medium;
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}
