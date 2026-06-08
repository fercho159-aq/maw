
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"
import ChatBubble from '@/components/chat-bubble';
import SmoothScroll from '@/components/smooth-scroll';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/lib/auth-provider';
import Script from 'next/script';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const siteUrl = 'https://mawsoluciones.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MAW Soluciones | Agencia de Marketing Digital y Desarrollo Web en México',
    template: '%s | MAW Soluciones',
  },
  description: 'MAW Soluciones es la agencia líder de marketing digital, desarrollo web y desarrollo de apps en México. Estrategias creativas, tecnología de vanguardia y resultados comprobados para tu negocio.',
  keywords: [
    'agencia de marketing digital México',
    'desarrollo web México',
    'desarrollo de apps México',
    'diseño web profesional México',
    'agencia digital CDMX',
    'marketing digital para empresas',
    'creación de sitios web México',
    'automatización de marketing',
    'gestión de redes sociales México',
    'agencia de publicidad digital',
    'SEO México',
    'MAW Soluciones',
  ],
  authors: [{ name: 'MAW Soluciones', url: siteUrl }],
  creator: 'MAW Soluciones',
  publisher: 'MAW Soluciones',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteUrl,
    siteName: 'MAW Soluciones',
    title: 'MAW Soluciones | Agencia de Marketing Digital y Desarrollo Web en México',
    description: 'Agencia líder en marketing digital, desarrollo web y apps en México. Creatividad, tecnología y resultados reales para tu empresa.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'MAW Soluciones - Agencia de Marketing Digital México' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAW Soluciones | Agencia de Marketing Digital México',
    description: 'Marketing digital, desarrollo web y apps en México. Impulsamos tu marca al siguiente nivel.',
    images: ['/og-image.jpg'],
    creator: '@mawsoluciones',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Polyfill requestIdleCallback / cancelIdleCallback para Safari antiguo (iOS < 15.4) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){if(typeof window==='undefined')return;if(typeof window.requestIdleCallback!=='function'){window.requestIdleCallback=function(cb,opts){var start=Date.now();var timeout=opts&&opts.timeout?opts.timeout:1;return setTimeout(function(){cb({didTimeout:false,timeRemaining:function(){return Math.max(0,50-(Date.now()-start));}});},timeout);};}if(typeof window.cancelIdleCallback!=='function'){window.cancelIdleCallback=function(id){clearTimeout(id);};}})();",
          }}
        />

        {/* Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T9N39GJK');`}}></Script>

        {/* Hotjar */}
        <Script id="hotjar" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: `
            (function (c, s, q, u, a, r, e) {
                c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
                c._hjSettings = { hjid: a };
                r = s.getElementsByTagName('head')[0];
                e = s.createElement('script');
                e.async = true;
                e.src = q + c._hjSettings.hjid + u;
                r.appendChild(e);
            })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', 6583352);
        `}}></Script>

        {/* Google Analytics */}
        <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-RK806X2669"></Script>
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RK806X2669');
          `}
        </Script>

        {/* Google Ads */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-18144008689"></Script>
        <Script id="google-ads" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18144008689');
          `}
        </Script>

        {/* Event snippet for Descarga Brochure - Google Ads conversion */}
        <Script id="conversion-brochure" strategy="lazyOnload">
          {`
            gtag('event', 'conversion', {'send_to': 'AW-18144008689/wErWCN_4tqgcEPGz3stD'});
          `}
        </Script>

        {/* Event snippet for Clic WhatsApp - Google Ads conversion */}
        <Script id="conversion-whatsapp" strategy="lazyOnload">
          {`
            gtag('event', 'conversion', {'send_to': 'AW-18144008689/5h6uCPqgz6gcEPGz3stD'});
          `}
        </Script>

      </head>
      <body className={cn("font-sans antialiased", montserrat.variable)}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["Organization", "LocalBusiness"],
                "@id": `${siteUrl}/#organization`,
                "name": "MAW Soluciones",
                "url": siteUrl,
                "logo": { "@type": "ImageObject", "url": `${siteUrl}/images/logo.png` },
                "image": `${siteUrl}/og-image.jpg`,
                "description": "Agencia líder de marketing digital, desarrollo web y desarrollo de apps en México.",
                "telephone": "+5633774723",
                "email": "contacto@mawsoluciones.com",
                "areaServed": { "@type": "Country", "name": "México" },
                "address": { "@type": "PostalAddress", "addressCountry": "MX", "addressRegion": "México" },
                "priceRange": "$$",
                "sameAs": [
                  "https://www.instagram.com/mawsoluciones",
                  "https://www.facebook.com/mawsoluciones",
                  "https://www.youtube.com/@mawsoluciones",
                  "https://www.tiktok.com/@mawsoluciones"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Servicios de Agencia Digital",
                  "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Desarrollo Web Profesional" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Desarrollo de Apps" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Marketing en Redes Sociales" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Automatización de Marketing" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Producción de Contenido Digital" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Publicidad Digital (Google Ads & Meta Ads)" } }
                  ]
                }
              },
              {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                "url": siteUrl,
                "name": "MAW Soluciones",
                "publisher": { "@id": `${siteUrl}/#organization` },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": { "@type": "EntryPoint", "urlTemplate": `${siteUrl}/blog?q={search_term_string}` },
                  "query-input": "required name=search_term_string"
                }
              }
            ]
          }) }}
        />
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9N39GJK"
        height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>

        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
          <AuthProvider>
            <SmoothScroll />
            {children}
            <ChatBubble />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
