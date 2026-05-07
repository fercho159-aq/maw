import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Curso de Finanzas Personales en México | Control de Dinero',
  description: 'Aprende a manejar tus finanzas personales, ahorrar e invertir inteligentemente en México. Curso práctico para emprendedores y profesionales que quieren libertad financiera.',
  keywords: ['curso finanzas personales México', 'educación financiera México', 'inversión para principiantes México', 'manejo de dinero México', 'ahorro e inversión México'],
  alternates: { canonical: 'https://mawsoluciones.com/cursos/finanzas-personales' },
  openGraph: { url: 'https://mawsoluciones.com/cursos/finanzas-personales', title: 'Curso Finanzas Personales México | MAW Soluciones', description: 'Toma el control de tu dinero. Aprende finanzas personales, ahorro e inversión con expertos en México.' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
