import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Curso de Ventas Digitales en México | Técnicas de Cierre',
  description: 'Domina las técnicas de ventas digitales más efectivas del mercado mexicano. Curso práctico para vendedores, emprendedores y equipos comerciales.',
  keywords: ['curso ventas México', 'técnicas de ventas digitales', 'curso ventas online México', 'cierre de ventas México', 'ventas para empresas México'],
  alternates: { canonical: 'https://mawsoluciones.com/cursos/ventas' },
  openGraph: { url: 'https://mawsoluciones.com/cursos/ventas', title: 'Curso de Ventas Digitales México | MAW Soluciones', description: 'Convierte más clientes con técnicas de ventas probadas. Curso intensivo para equipos comerciales y emprendedores en México.' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
