'use client';

import { motion } from 'framer-motion';
import { X, MapPin, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Comment {
  id: number;
  content: string;
  status: string;
  priority: string;
  positionX: number;
  positionY: number;
  pageUrl: string;
  createdAt: string;
  adminNotes?: string | null;
}

interface CommentDetailProps {
  comment: Comment;
  onClose: () => void;
}

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  in_progress: 'En progreso',
  resolved: 'Resuelto',
  dismissed: 'Descartado',
};

const statusBadgeVariants: Record<string, string> = {
  pending: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  in_progress: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  resolved: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  dismissed: 'border-zinc-500/30 bg-zinc-500/10 text-zinc-400',
};

const priorityLabels: Record<string, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

const priorityBadgeVariants: Record<string, string> = {
  low: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  medium: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  high: 'border-red-500/30 bg-red-500/10 text-red-400',
};

export function CommentDetail({ comment, onClose }: CommentDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className="fixed bottom-4 left-4 z-50 w-80 rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <h3 className="text-sm font-semibold text-zinc-200">
          Detalle del comentario
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-100"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      <Separator className="bg-zinc-800" />

      <div className="space-y-3 p-4">
        {/* Comment content */}
        <p className="text-sm leading-relaxed text-zinc-300">
          {comment.content}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${statusBadgeVariants[comment.status] ?? ''}`}
          >
            {statusLabels[comment.status] ?? comment.status}
          </span>
          {comment.priority && (
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${priorityBadgeVariants[comment.priority] ?? ''}`}
            >
              {priorityLabels[comment.priority] ?? comment.priority}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="space-y-1.5 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{comment.pageUrl}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            <span>
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
                locale: es,
              })}
            </span>
          </div>
        </div>

        {/* Admin notes */}
        {comment.adminNotes && (
          <>
            <Separator className="bg-zinc-800" />
            <div>
              <p className="mb-1 text-xs font-medium text-zinc-400">
                Notas del equipo
              </p>
              <p className="text-sm text-zinc-300">{comment.adminNotes}</p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
