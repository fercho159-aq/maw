
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"
import ChatBubble from '@/components/chat-bubble';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/lib/auth-provider';
import Script from 'next/script';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MAW Soluciones | Agencia de Marketing Digital',
  description: 'Potenciamos tu marca con estrategias de marketing digital innovadoras. Creación de contenido, desarrollo web, y más.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
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

      </head>
      <body className={cn("font-sans antialiased", montserrat.variable)}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9N39GJK"
        height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>

        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <ChatBubble />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
