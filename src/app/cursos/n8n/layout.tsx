import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Curso de n8n en México | Automatización de Flujos de Trabajo',
  description: 'Aprende n8n para automatizar procesos de negocio sin código en México. Integraciones, flujos de trabajo y automatización avanzada para empresas y emprendedores.',
  keywords: ['curso n8n México', 'automatización n8n', 'n8n para empresas México', 'curso automatización sin código', 'workflows automatizados n8n'],
  alternates: { canonical: 'https://mawsoluciones.com/cursos/n8n' },
  openGraph: { url: 'https://mawsoluciones.com/cursos/n8n', title: 'Curso de n8n Automatización México | MAW Soluciones', description: 'Automatiza tu empresa con n8n. Aprende a crear flujos de trabajo inteligentes sin necesidad de programar, con expertos en México.' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
