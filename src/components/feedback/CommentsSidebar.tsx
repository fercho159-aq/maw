'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

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

interface CommentsSidebarProps {
  comments: Comment[];
  isOpen: boolean;
  onClose: () => void;
  selectedCommentId: number | null;
  onSelectComment: (id: number) => void;
}

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  in_progress: 'En progreso',
  resolved: 'Resuelto',
  dismissed: 'Descartado',
};

const statusColors: Record<string, string> = {
  pending: 'bg-amber-500',
  in_progress: 'bg-blue-500',
  resolved: 'bg-emerald-500',
  dismissed: 'bg-zinc-500',
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

export function CommentsSidebar({
  comments,
  isOpen,
  onClose,
  selectedCommentId,
  onSelectComment,
}: CommentsSidebarProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved'>('all');

  const filtered =
    statusFilter === 'all'
      ? comments
      : statusFilter === 'pending'
        ? comments.filter((c) => c.status !== 'resolved')
        : comments.filter((c) => c.status === 'resolved');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-full flex-col overflow-hidden border-l border-zinc-800 bg-zinc-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-zinc-200">
                Comentarios
              </h2>
              <Badge
                variant="outline"
                className="border-zinc-700 bg-zinc-800 text-xs text-zinc-400"
              >
                {comments.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter tabs */}
          <div className="flex border-b border-zinc-800">
            {([
              { value: 'all', label: 'Todos' },
              { value: 'pending', label: 'Pendientes' },
              { value: 'resolved', label: 'Resueltos' },
            ] as const).map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`flex-1 py-2 text-xs font-medium transition-colors ${
                  statusFilter === tab.value
                    ? 'border-b-2 border-amber-500 text-amber-400'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Comments list */}
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <MessageSquare className="h-10 w-10 text-zinc-700" />
                  <p className="text-sm text-zinc-500">
                    No hay comentarios aun
                  </p>
                </div>
              ) : (
                filtered.map((comment, index) => {
                  const globalIndex = comments.findIndex(
                    (c) => c.id === comment.id
                  );
                  return (
                    <button
                      key={comment.id}
                      onClick={() => onSelectComment(comment.id)}
                      className={`w-full rounded-lg p-3 text-left transition-colors ${
                        selectedCommentId === comment.id
                          ? 'bg-zinc-800 ring-1 ring-amber-500/30'
                          : 'hover:bg-zinc-800/50'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {/* Pin number circle */}
                        <div
                          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${statusColors[comment.status] ?? 'bg-zinc-500'}`}
                        >
                          {globalIndex + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          {/* Comment text */}
                          <p className="line-clamp-2 text-sm text-zinc-300">
                            {comment.content}
                          </p>

                          {/* Badges */}
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            <span
                              className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${statusBadgeVariants[comment.status] ?? ''}`}
                            >
                              {statusLabels[comment.status] ?? comment.status}
                            </span>
                            {comment.priority && (
                              <span
                                className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${priorityBadgeVariants[comment.priority] ?? ''}`}
                              >
                                {priorityLabels[comment.priority] ??
                                  comment.priority}
                              </span>
                            )}
                          </div>

                          {/* Meta */}
                          <div className="mt-1.5 flex items-center gap-2 text-[10px] text-zinc-500">
                            <span className="truncate max-w-[120px]">
                              {comment.pageUrl}
                            </span>
                            <span>
                              {formatDistanceToNow(
                                new Date(comment.createdAt),
                                { addSuffix: true, locale: es }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
