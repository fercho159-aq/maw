import AnimatedDiv from "@/components/animated-div";
import type { ServiceLanding } from "@/lib/landing-data";

type StatsData = NonNullable<ServiceLanding["stats"]>;

export default function LandingStats({ data }: { data: StatsData }) {
  return (
    <section className="relative w-full py-16 md:py-24 bg-zinc-950 text-white border-y border-white/10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-72 w-[700px] rounded-full bg-primary/15 blur-[130px]" />
      <div className="relative container mx-auto px-4 md:px-6">
        {data.heading && (
          <AnimatedDiv className="text-center mb-12">
            <h2 className="font-headline text-2xl md:text-4xl font-bold tracking-tighter">
              {data.heading}
            </h2>
          </AnimatedDiv>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto divide-y divide-x divide-white/10 sm:divide-y-0 lg:[&>*]:px-6">
          {data.items.map((stat, i) => (
            <AnimatedDiv key={stat.label} delay={i * 80} className="text-center py-6 sm:py-4">
              <div className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-sm md:text-base text-white/60 mt-2">{stat.label}</p>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
