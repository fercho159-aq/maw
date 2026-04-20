const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('feedback_token') : null;

const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return res.json();
};

export const feedbackApi = {
  login: (data: { email: string; password: string; projectId: number }) =>
    authFetch('/api/client-auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => authFetch('/api/client-auth/me'),

  getComments: (params?: { pageUrl?: string; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.pageUrl) searchParams.set('pageUrl', params.pageUrl);
    if (params?.status) searchParams.set('status', params.status);
    const qs = searchParams.toString();
    return authFetch(`/api/feedback-comments${qs ? `?${qs}` : ''}`);
  },

  getResolvedComments: () =>
    authFetch('/api/feedback-comments-resolved'),

  createComment: (data: {
    content: string;
    pageUrl: string;
    positionX: number;
    positionY: number;
    scrollY: number;
    viewportWidth: number;
    viewportHeight: number;
    priority?: 'low' | 'medium' | 'high';
  }) =>
    authFetch('/api/feedback-comments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
