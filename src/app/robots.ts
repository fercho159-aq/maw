import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/equipo/',
          '/api/',
          '/leads/',
          '/feedback/',
          '/recursos/',
        ],
      },
    ],
    sitemap: 'https://mawsoluciones.com/sitemap.xml',
    host: 'https://mawsoluciones.com',
  };
}
