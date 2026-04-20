'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: 'Pendiente',
    className: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
  },
  in_progress: {
    label: 'En progreso',
    className: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30',
  },
  resolved: {
    label: 'Resuelto',
    className: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
  },
  dismissed: {
    label: 'Descartado',
    className: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-400 border-zinc-500/30',
  },
};

export default function StatusBadge({
  status,
}: {
  status: 'pending' | 'in_progress' | 'resolved' | 'dismissed';
}) {
  const config = statusConfig[status] ?? statusConfig.pending;
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}
