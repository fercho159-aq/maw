"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsappIcon from "@/components/icons/whatsapp-icon";
import type { LandingStickyCta as LandingStickyCtaData } from "@/lib/landing-data";

/**
 * CTA persistente para landings de Google Ads: barra inferior fija en móvil y
 * botón flotante de WhatsApp en escritorio. Aparece tras pasar el hero para
 * mantener la acción siempre a un toque.
 */
export default function LandingStickyCta({ data }: { data: LandingStickyCtaData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Barra inferior fija (móvil) */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 md:hidden border-t border-border bg-background/95 backdrop-blur-md transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-3">
          <Button asChild className="flex-1 font-semibold rounded-full">
            <a href={data.href}>
              {data.label} <ArrowRight className="w-4 h-4 ml-1.5" />
            </a>
          </Button>
          {data.whatsappHref && (
            <Button asChild variant="whatsapp" size="icon" className="rounded-full h-11 w-11 flex-shrink-0">
              <a href={data.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsappIcon className="w-5 h-5" />
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Botón flotante WhatsApp (escritorio) */}
      {data.whatsappHref && (
        <Button
          asChild
          variant="whatsapp"
          size="icon"
          className={`hidden md:flex fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-xl transition-all duration-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <a href={data.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <WhatsappIcon className="w-7 h-7" />
          </a>
        </Button>
      )}
    </>
  );
}
