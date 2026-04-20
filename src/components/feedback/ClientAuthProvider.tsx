'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { feedbackApi } from '@/lib/feedback-api';

interface ClientData {
  id: number;
  clientName: string;
  email: string;
  projectId: number;
}

interface ProjectData {
  id: number;
  name: string;
  siteUrl: string;
  status: string;
}

interface ClientAuthContextType {
  token: string | null;
  client: ClientData | null;
  project: ProjectData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const ClientAuthContext = createContext<ClientAuthContextType>({
  token: null,
  client: null,
  project: null,
  isAuthenticated: false,
  isLoading: true,
  logout: () => {},
});

export function ClientAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [client, setClient] = useState<ClientData | null>(null);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    const savedClient = client;
    localStorage.removeItem('feedback_token');
    localStorage.removeItem('feedback_client');
    setToken(null);
    setClient(null);
    setProject(null);
    const projectParam = savedClient?.projectId ? `?project=${savedClient.projectId}` : '';
    router.push(`/feedback/login${projectParam}`);
  }, [router, client]);

  useEffect(() => {
    const storedToken = localStorage.getItem('feedback_token');

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    setToken(storedToken);

    feedbackApi
      .getMe()
      .then((res) => {
        if (!res.success || !res.data) {
          localStorage.removeItem('feedback_token');
          localStorage.removeItem('feedback_client');
          setIsLoading(false);
          return;
        }
        const d = res.data;
        setClient({ id: d.id, clientName: d.clientName, email: d.email, projectId: d.projectId });
        setProject(d.project);
        setIsLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('feedback_token');
        localStorage.removeItem('feedback_client');
        setIsLoading(false);
        router.push('/feedback/login');
      });
  }, [router]);

  return (
    <ClientAuthContext.Provider
      value={{
        token,
        client,
        project,
        isAuthenticated: !!token && !!client,
        isLoading,
        logout,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  const context = useContext(ClientAuthContext);
  if (!context) {
    throw new Error('useClientAuth must be used within a ClientAuthProvider');
  }
  return context;
}
