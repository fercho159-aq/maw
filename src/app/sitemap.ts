import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/app/blog/_actions';
import { portfolioItems } from '@/lib/portfolio-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mawsoluciones.com';

  // Obtener posts del blog
  const posts = await getBlogPosts();
  const blogPostUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  // Obtener items del portafolio
  const portfolioUrls = portfolioItems.map(item => ({
    url: `${baseUrl}/portafolio/${item.id}`,
    lastModified: new Date(), // Asumiendo fecha actual si no hay una específica
  }));

  // Páginas estáticas y de servicios
  const staticRoutes = [
    '/',
    '/servicios',
    '/servicios/desarrollo-web',
    '/servicios/creacion-de-contenido',
    '/servicios/gestion-de-campanas',
    '/servicios/automatizacion',
    '/servicios/produccion-foto-video',
    '/servicios/desarrollo-a-la-medida',
    '/servicios/automatizacion-y-desarrollo',
    '/portafolio',
    '/blog',
    '/contacto',
    '/cursos/facebook-ads',
    '/cursos/google-ads',
    '/cursos/tiktok-ads',
    '/cursos/n8n',
    '/cursos/ventas',
    '/cursos/finanzas-personales',
    '/cursos/firebase-web',
    '/politicas',
    '/terminos',
  ];

  const staticUrls = staticRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...blogPostUrls, ...portfolioUrls];
}
