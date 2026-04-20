import type { Metadata } from 'next';
import { ClientAuthProvider } from '@/components/feedback/ClientAuthProvider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'MAW Feedback | Revisión de Proyecto',
  description: 'Panel de retroalimentación visual para clientes de MAW Soluciones.',
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <ClientAuthProvider>
        {children}
      </ClientAuthProvider>
      <Toaster />
    </div>
  );
}
