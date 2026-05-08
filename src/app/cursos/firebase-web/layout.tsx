import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Curso de Firebase y Desarrollo Web en México',
  description: 'Aprende Firebase y desarrollo web moderno con React y Next.js en México. Autenticación, base de datos en tiempo real, hosting y funciones cloud.',
  keywords: ['curso Firebase México', 'desarrollo web Firebase', 'curso Next.js México', 'curso React México', 'Firebase para principiantes', 'desarrollo web moderno México'],
  alternates: { canonical: 'https://mawsoluciones.com/cursos/firebase-web' },
  openGraph: { url: 'https://mawsoluciones.com/cursos/firebase-web', title: 'Curso Firebase y Desarrollo Web México | MAW Soluciones', description: 'Construye aplicaciones web modernas con Firebase. Curso completo con React, Next.js y Google Cloud en México.' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
