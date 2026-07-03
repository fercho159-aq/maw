import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/app/blog/_actions';
import { portfolioItems } from '@/lib/portfolio-data';

const baseUrl = 'https://mawsoluciones.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const blogPostUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const portfolioUrls = portfolioItems.map(item => ({
    url: `${baseUrl}/portafolio/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // High priority — core pages
  const coreRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/servicios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/portafolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Service pages
  const serviceRoutes: MetadataRoute.Sitemap = [
    '/servicios/desarrollo-web',
    '/servicios/apps',
    '/servicios/redes-sociales',
    '/servicios/creacion-de-contenido',
    '/servicios/automatizacion',
    '/servicios/automatizacion-y-desarrollo',
    '/servicios/desarrollo-a-la-medida',
    '/servicios/produccion-foto-video',
    '/servicios/podcast',
    '/servicios/sitio-web',
    '/servicios/crm',
    '/servicios/erp',
    '/servicios/automatizacion/chatbot',
    '/servicios/automatizacion/cobranza-recurrente',
    '/servicios/automatizacion/analisis-tendencias',
    '/servicios/automatizacion/agendamiento-automatico',
    '/servicios/automatizacion/seguimiento-pendientes',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Course pages
  const courseRoutes: MetadataRoute.Sitemap = [
    '/cursos/facebook-ads',
    '/cursos/google-ads',
    '/cursos/tiktok-ads',
    '/cursos/n8n',
    '/cursos/ventas',
    '/cursos/finanzas-personales',
    '/cursos/firebase-web',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Tool pages
  const toolRoutes: MetadataRoute.Sitemap = [
    '/herramientas',
    '/herramientas/generador-qr',
    '/herramientas/extractor-maps',
    '/herramientas/diagnostico-web',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // Legal pages (low priority, no-index)
  const legalRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/politicas`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.1 },
    { url: `${baseUrl}/terminos`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.1 },
  ];

  return [
    ...coreRoutes,
    ...serviceRoutes,
    ...courseRoutes,
    ...toolRoutes,
    ...legalRoutes,
    ...blogPostUrls,
    ...portfolioUrls,
  ];
}
