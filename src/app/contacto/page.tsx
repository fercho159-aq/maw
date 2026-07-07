import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto — MAW Soluciones',
  description: 'Contacto de MAW Soluciones. Oficina y estudio en Benito Juárez, Ciudad de México. Correo, teléfono y horario de atención.',
  keywords: ['contacto agencia marketing México', 'contratar agencia digital México', 'consultoría marketing digital', 'agencia desarrollo web contacto'],
  alternates: { canonical: 'https://mawsoluciones.com/contacto' },
  openGraph: {
    url: 'https://mawsoluciones.com/contacto',
    title: 'Contacto — MAW Soluciones',
    description: 'Oficina y estudio en Benito Juárez, Ciudad de México. Correo, teléfono y horario de atención.',
  },
};

import ContactForm from "@/components/contact-form";
import { Eyebrow, FadeIn, Rule } from "@/components/editorial";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";

const ContactPage = () => {
  return (
    <section id="contact" className="bg-background py-24 md:py-36">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
        <FadeIn>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-9 lg:col-span-8">
              <Eyebrow>Contacto</Eyebrow>
              <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-[-0.015em] text-foreground md:text-display-md">
                Hablemos de su operación
              </h1>
              <p className="mt-8 max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
                Cuéntenos qué necesita resolver. Revisamos cada mensaje con
                atención y respondemos con una propuesta de conversación, no con
                un discurso comercial.
              </p>
            </div>
          </div>
        </FadeIn>

        <Rule className="my-16 md:my-20" />

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 lg:gap-10">
          <FadeIn className="md:col-span-4" delay={0.1}>
            <div className="space-y-12">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Correo
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-3 inline-block text-lg text-foreground"
                >
                  <span className="border-b border-border pb-1 transition-colors duration-300 hover:border-foreground">
                    {CONTACT_EMAIL}
                  </span>
                </a>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Teléfono
                </p>
                <a
                  href={CONTACT_PHONE_TEL_HREF}
                  className="mt-3 inline-block text-lg text-foreground"
                >
                  <span className="border-b border-border pb-1 transition-colors duration-300 hover:border-foreground">
                    {CONTACT_PHONE_DISPLAY}
                  </span>
                </a>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  WhatsApp
                </p>
                <a
                  href={CONTACT_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-lg text-foreground"
                >
                  <span className="border-b border-border pb-1 transition-colors duration-300 hover:border-foreground">
                    {CONTACT_PHONE_DISPLAY}
                  </span>
                </a>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Horario
                </p>
                <p className="mt-3 text-lg text-foreground">
                  Lunes a viernes, 9:00 a 18:00
                </p>
              </div>
            </div>
          </FadeIn>

          <div id="booking" className="md:col-span-7 md:col-start-6">
            <FadeIn delay={0.2}>
              <Eyebrow className="mb-10">Escríbanos</Eyebrow>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
