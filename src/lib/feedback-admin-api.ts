export const feedbackAdminApi = {
  getProjects: (ownerId: string) =>
    fetch(`/api/feedback-projects?ownerId=${ownerId}`).then((r) => r.json()),

  createProject: (data: { name: string; siteUrl: string; ownerId: string }) =>
    fetch('/api/feedback-projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  getProject: (id: string) =>
    fetch(`/api/feedback-projects/${id}`).then((r) => r.json()),

  updateProject: (id: string, data: any) =>
    fetch(`/api/feedback-projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  deleteProject: (id: string) =>
    fetch(`/api/feedback-projects/${id}`, { method: 'DELETE' }).then((r) =>
      r.json()
    ),

  getClients: (projectId: string) =>
    fetch(`/api/feedback-projects/${projectId}/clients`).then((r) => r.json()),

  createClient: (projectId: string, data: any) =>
    fetch(`/api/feedback-projects/${projectId}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  updateClient: (projectId: string, clientId: string, data: any) =>
    fetch(`/api/feedback-projects/${projectId}/clients/${clientId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  getComments: (projectId: string, params?: Record<string, string>) =>
    fetch(
      `/api/feedback-projects/${projectId}/comments?${new URLSearchParams(params || {})}`
    ).then((r) => r.json()),

  updateComment: (commentId: string, data: any) =>
    fetch(`/api/feedback-comments/${commentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  deleteComment: (commentId: string) =>
    fetch(`/api/feedback-comments/${commentId}`, { method: 'DELETE' }).then(
      (r) => r.json()
    ),

  getResolvedComments: (projectId: string, params?: Record<string, string>) =>
    fetch(
      `/api/feedback-projects/${projectId}/comments-resolved?${new URLSearchParams(params || {})}`
    ).then((r) => r.json()),
};
