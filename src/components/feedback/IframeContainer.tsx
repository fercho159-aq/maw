'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface IframeContainerProps {
  siteUrl: string;
  children?: ReactNode;
  onScrollYChange?: (scrollY: number) => void;
  onNavigate?: (url: string) => void;
}

export function IframeContainer({
  siteUrl,
  children,
  onScrollYChange,
  onNavigate,
}: IframeContainerProps) {
  const [loadError, setLoadError] = useState(false);

  // Build the proxied URL to inject scroll-reporting + history patches
  const proxiedUrl = siteUrl
    ? `/api/site-proxy?url=${encodeURIComponent(siteUrl)}`
    : '';

  // Listen for scroll messages from the injected script inside the iframe
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (event.data?.type === 'feedback-scroll') {
        onScrollYChange?.(event.data.scrollY ?? 0);
      } else if (event.data?.type === 'feedback-navigate') {
        onNavigate?.(event.data.url);
      }
    },
    [onScrollYChange, onNavigate]
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  if (loadError) {
    return (
      <div className="flex flex-1 items-center justify-center bg-zinc-950 p-8">
        <Card className="max-w-md border-zinc-800 bg-zinc-900">
          <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
              <AlertTriangle className="h-7 w-7 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-200">
              No se pudo cargar el sitio
            </h3>
            <p className="text-sm text-zinc-400">
              Este sitio no permite ser visualizado en esta herramienta. Contacta
              a tu agencia para mas informacion.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative flex-1 overflow-hidden">
      <iframe
        src={proxiedUrl}
        className="h-full w-full border-none bg-white"
        title="Vista previa del sitio"
        onError={() => setLoadError(true)}
      />
      {/* Overlay sits on top of the iframe viewport area */}
      {children}
    </div>
  );
}
