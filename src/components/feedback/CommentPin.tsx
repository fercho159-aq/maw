'use client';

import { motion } from 'framer-motion';

interface Comment {
  id: number;
  status: string;
  positionX: number;
  positionY: number;
}

interface CommentPinProps {
  comment: Comment;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  /** Viewport-relative Y position in pixels (adjusted for scroll) */
  displayY: number;
}

const statusColors: Record<string, { bg: string; ring: string }> = {
  pending: { bg: 'bg-amber-500', ring: 'ring-amber-500/30' },
  in_progress: { bg: 'bg-blue-500', ring: 'ring-blue-500/30' },
  resolved: { bg: 'bg-emerald-500', ring: 'ring-emerald-500/30' },
  dismissed: { bg: 'bg-zinc-500', ring: 'ring-zinc-500/30' },
};

export function CommentPin({ comment, index, isSelected, onClick, displayY }: CommentPinProps) {
  const colors = statusColors[comment.status] ?? statusColors.pending;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      whileHover={{ scale: 1.15 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-lg pointer-events-auto ${colors.bg} ${isSelected ? `ring-4 ${colors.ring}` : ''}`}
      style={{
        left: `${comment.positionX}%`,
        top: `${displayY}px`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-label={`Comentario ${index + 1}`}
    >
      {index + 1}
    </motion.button>
  );
}
