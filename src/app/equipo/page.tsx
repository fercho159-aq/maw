
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-provider';
import { useRouter } from 'next/navigation';

export default function EquipoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/equipo/dashboard');
      } else {
        router.replace('/equipo/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
    </div>
  );
}
