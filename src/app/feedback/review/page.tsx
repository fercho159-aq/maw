'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useClientAuth } from '@/components/feedback/ClientAuthProvider';
import { feedbackApi } from '@/lib/feedback-api';
import { useToast } from '@/hooks/use-toast';
import { AnnotationToolbar } from '@/components/feedback/AnnotationToolbar';
import { IframeContainer } from '@/components/feedback/IframeContainer';
import { AnnotationOverlay } from '@/components/feedback/AnnotationOverlay';
import { CommentsSidebar } from '@/components/feedback/CommentsSidebar';
import { CommentDetail } from '@/components/feedback/CommentDetail';

interface Comment {
  id: number;
  content: string;
  status: string;
  priority: string;
  positionX: number;
  positionY: number;
  pageUrl: string;
  scrollY: number;
  viewportWidth: number;
  viewportHeight: number;
  createdAt: string;
  adminNotes?: string | null;
}

export default function FeedbackReviewPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { client, project, isAuthenticated, isLoading, logout } =
    useClientAuth();

  const [mode, setMode] = useState<'navigate' | 'annotate'>('navigate');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [iframeScrollY, setIframeScrollY] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/feedback/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Set initial URL once project loads
  useEffect(() => {
    if (project?.siteUrl && !currentUrl) {
      setCurrentUrl(project.siteUrl);
    }
  }, [project, currentUrl]);

  // Fetch comments (active + resolved)
  const fetchComments = useCallback(async () => {
    try {
      const [activeRes, resolvedRes] = await Promise.all([
        feedbackApi.getComments(),
        feedbackApi.getResolvedComments(),
      ]);

      const active = activeRes.success && activeRes.data ? activeRes.data : [];
      const resolved =
        resolvedRes.success && resolvedRes.data
          ? resolvedRes.data.map((c: Comment & { originalId?: number }) => ({
              ...c,
              id: c.originalId ?? c.id,
              status: 'resolved' as const,
            }))
          : [];

      setComments([...active, ...resolved]);
    } catch {
      // Silently fail, user can retry
    } finally {
      setCommentsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchComments();
    }
  }, [isAuthenticated, fetchComments]);

  // Create comment handler
  const handleCreateComment = useCallback(
    async (data: {
      content: string;
      priority: 'low' | 'medium' | 'high';
      positionX: number;
      positionY: number;
    }) => {
      try {
        const result = await feedbackApi.createComment({
          content: data.content,
          priority: data.priority,
          positionX: Math.round(data.positionX * 100) / 100,
          positionY: Math.round(data.positionY * 100) / 100,
          pageUrl: currentUrl || project?.siteUrl || '/',
          scrollY: iframeScrollY,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
        });

        if (!result.success) {
          toast({
            title: 'Error',
            description: result.error || 'No se pudo enviar el comentario',
            variant: 'destructive',
          });
          return;
        }

        toast({
          title: 'Comentario enviado',
          description: 'Tu comentario ha sido registrado exitosamente.',
        });

        // Refresh comments
        fetchComments();
        setMode('navigate');
      } catch {
        toast({
          title: 'Error',
          description: 'No se pudo enviar el comentario. Intenta de nuevo.',
          variant: 'destructive',
        });
      }
    },
    [project, currentUrl, toast, fetchComments, iframeScrollY]
  );

  const handleSelectComment = useCallback((id: number) => {
    setSelectedCommentId((prev) => (prev === id ? null : id));
  }, []);

  const pendingCount = comments.filter((c) => c.status === 'pending').length;

  const selectedComment = comments.find((c) => c.id === selectedCommentId);

  // Filter comments for the current page to display as pins
  const currentPageComments = comments.filter((c) => {
    // If we have a currentUrl, strictly match it. (e.g. https://ficc.vercel.app/el-festival vs https://ficc.vercel.app/).
    if (currentUrl) {
      // Clean up trailing slashes for loose comparison just in case
      const normalizeUrl = (u: string) => u.replace(/\/$/, '').trim();
      return normalizeUrl(c.pageUrl) === normalizeUrl(currentUrl);
    }
    return true;
  });

  // Loading state
  if (isLoading || (!isAuthenticated && !isLoading)) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-zinc-950">
      {/* Toolbar */}
      <AnnotationToolbar
        mode={mode}
        onModeChange={setMode}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen((prev) => !prev)}
        pendingCount={pendingCount}
        clientName={client?.clientName ?? 'Cliente'}
        projectUrl={currentUrl || project?.siteUrl}
        onLogout={logout}
      />

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Iframe + overlay */}
        <IframeContainer
          siteUrl={currentUrl || project?.siteUrl || ''}
          onScrollYChange={setIframeScrollY}
          onNavigate={setCurrentUrl}
        >
          <AnnotationOverlay
            mode={mode}
            comments={currentPageComments}
            onCreateComment={handleCreateComment}
            onSelectComment={handleSelectComment}
            selectedCommentId={selectedCommentId}
            iframeScrollY={iframeScrollY}
          />

          {/* Comment detail popover */}
          <AnimatePresence>
            {selectedComment && (
              <CommentDetail
                comment={selectedComment}
                onClose={() => setSelectedCommentId(null)}
              />
            )}
          </AnimatePresence>
        </IframeContainer>

        {/* Sidebar */}
        <CommentsSidebar
          comments={comments}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedCommentId={selectedCommentId}
          onSelectComment={handleSelectComment}
        />
      </div>
    </div>
  );
}
