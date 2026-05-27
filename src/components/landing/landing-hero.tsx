import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsappIcon from "@/components/icons/whatsapp-icon";
import AnimatedDiv from "@/components/animated-div";
import type { LandingHero as LandingHeroData } from "@/lib/landing-data";

export default function LandingHero({ data }: { data: LandingHeroData }) {
  const isWhatsapp = data.secondaryCta?.href.includes("wa.me");

  return (
    <section className="relative w-full min-h-[68vh] flex items-center justify-center overflow-hidden bg-zinc-950 text-white border-b border-border/50">
      {data.media?.type === "video" && (
        <video
          src={data.media.src}
          poster={data.media.poster}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />

      <AnimatedDiv className="z-10 container mx-auto px-4 md:px-6 py-24 flex flex-col items-center text-center max-w-4xl">
        <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs md:text-sm font-medium text-white/80 mb-6 backdrop-blur-md">
          {data.eyebrow}
        </div>
        <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 bg-gradient-to-br from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
          {data.title}
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-zinc-300 mb-9 font-light leading-relaxed">
          {data.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Button size="lg" asChild className="font-semibold rounded-full px-8">
            <a href={data.primaryCta.href}>
              {data.primaryCta.label} <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
          {data.secondaryCta &&
            (isWhatsapp ? (
              <Button size="lg" variant="whatsapp" asChild className="font-semibold rounded-full px-6">
                <a href={data.secondaryCta.href} target="_blank" rel="noopener noreferrer">
                  <WhatsappIcon className="w-5 h-5 mr-2" /> {data.secondaryCta.label}
                </a>
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                asChild
                className="font-semibold rounded-full px-6 bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                <a href={data.secondaryCta.href}>{data.secondaryCta.label}</a>
              </Button>
            ))}
        </div>
      </AnimatedDiv>
    </section>
  );
}
