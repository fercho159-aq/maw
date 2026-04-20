'use client';

import { useState } from 'react';

export default function PositionPreview({
  positionX,
  positionY,
  scrollY,
  viewportHeight,
  siteUrl,
}: {
  positionX: number;
  positionY: number; // absolute px from document top
  scrollY?: number;
  viewportHeight?: number;
  siteUrl?: string;
}) {
  const [iframeError, setIframeError] = useState(false);

  // The preview is a scaled-down 16:9 representation of the full page.
  // positionY is in absolute pixels from the document top.
  // We need to convert it to a percentage of the preview container.
  // The preview iframe is 400% wide/tall (then scaled to 25%), so it
  // shows roughly the page at a small scale.
  // For a rough positioning: use a fixed estimated page height (e.g., 5000px)
  // and convert positionY px to percentage of that.
  const estimatedPageHeight = 5000;
  const yPct = Math.min((positionY / estimatedPageHeight) * 100, 100);

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700"
      style={{ aspectRatio: '16/9' }}
    >
      {siteUrl && !iframeError ? (
        <iframe
          src={siteUrl}
          className="absolute inset-0 w-[400%] h-[400%] origin-top-left pointer-events-none"
          style={{ transform: 'scale(0.25)' }}
          tabIndex={-1}
          loading="lazy"
          onError={() => setIframeError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-500">
          Vista previa no disponible
        </div>
      )}
      {/* Pin indicator */}
      <div
        className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 border-2 border-white shadow-lg z-10"
        style={{ left: `${positionX}%`, top: `${yPct}%` }}
      />
      {/* Pulse ring */}
      <div
        className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/30 animate-ping z-[9]"
        style={{ left: `${positionX}%`, top: `${yPct}%` }}
      />
    </div>
  );
}
