'use client';

import { useState, useCallback, useRef, type MouseEvent } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CommentPin } from './CommentPin';
import { CommentForm } from './CommentForm';

interface Comment {
  id: number;
  content: string;
  status: string;
  priority: string;
  positionX: number;
  positionY: number; // absolute px from document top
  pageUrl: string;
  scrollY: number;
  viewportWidth: number;
  viewportHeight: number;
  createdAt: string;
}

interface AnnotationOverlayProps {
  mode: 'navigate' | 'annotate';
  comments: Comment[];
  onCreateComment: (data: {
    content: string;
    priority: 'low' | 'medium' | 'high';
    positionX: number;
    positionY: number;
  }) => void;
  onSelectComment: (id: number) => void;
  selectedCommentId: number | null;
  /** Current iframe scroll Y in pixels (from postMessage) */
  iframeScrollY: number;
}

export function AnnotationOverlay({
  mode,
  comments,
  onCreateComment,
  onSelectComment,
  selectedCommentId,
  iframeScrollY,
}: AnnotationOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [tempPin, setTempPin] = useState<{
    x: number;
    y: number;
    absoluteY: number;
    viewportPctY: number;
  } | null>(null);

  const handleOverlayClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (mode !== 'annotate') return;

      const rect = e.currentTarget.getBoundingClientRect();

      // X = percentage of overlay width
      const x = ((e.clientX - rect.left) / rect.width) * 100;

      // Y in viewport pixels (for display)
      const viewportY = e.clientY - rect.top;

      // Absolute document Y = viewport position + current scroll
      const absoluteY = viewportY + iframeScrollY;

      // Viewport percentage for smart form positioning
      const viewportPctY = (e.clientY / window.innerHeight) * 100;

      setTempPin({ x, y: viewportY, absoluteY, viewportPctY });
    },
    [mode, iframeScrollY]
  );

  const handleFormSubmit = useCallback(
    (data: { content: string; priority: 'low' | 'medium' | 'high' }) => {
      if (!tempPin) return;
      onCreateComment({
        ...data,
        positionX: tempPin.x,
        positionY: tempPin.absoluteY, // Store absolute document position
      });
      setTempPin(null);
    },
    [tempPin, onCreateComment]
  );

  const handleFormCancel = useCallback(() => {
    setTempPin(null);
  }, []);

  // Calculate viewport-relative Y position for a saved pin
  const getDisplayY = useCallback(
    (comment: Comment) => {
      const overlayHeight = overlayRef.current?.offsetHeight ?? window.innerHeight;

      // Pin's viewport-relative Y = absolute position minus current scroll
      const viewportY = comment.positionY - iframeScrollY;

      // Visible if within viewport bounds (with margin for partial visibility)
      const visible = viewportY >= -20 && viewportY <= overlayHeight + 20;

      return { viewportY, visible };
    },
    [iframeScrollY]
  );

  return (
    <div
      ref={overlayRef}
      className={`absolute inset-0 z-10 ${
        mode === 'annotate'
          ? 'pointer-events-auto cursor-crosshair bg-blue-500/5'
          : 'pointer-events-none'
      }`}
      onClick={handleOverlayClick}
    >
      {/* Saved comment pins — positioned relative to current scroll */}
      <AnimatePresence>
        {comments.map((comment, index) => {
          const { viewportY, visible } = getDisplayY(comment);
          if (!visible) return null;

          return (
            <CommentPin
              key={comment.id}
              comment={comment}
              index={index}
              isSelected={selectedCommentId === comment.id}
              onClick={() => onSelectComment(comment.id)}
              displayY={viewportY}
            />
          );
        })}
      </AnimatePresence>

      {/* Temporary pin while creating */}
      <AnimatePresence>
        {tempPin && (
          <>
            <div
              className="absolute z-20 h-7 w-7 rounded-full border-2 border-white bg-amber-500 shadow-lg"
              style={{
                left: `${tempPin.x}%`,
                top: `${tempPin.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span className="flex h-full items-center justify-center text-xs font-bold text-white">
                +
              </span>
            </div>

            <CommentForm
              position={{ x: tempPin.x, y: tempPin.y, viewportPctY: tempPin.viewportPctY }}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
