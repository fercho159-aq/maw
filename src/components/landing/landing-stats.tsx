import AnimatedDiv from "@/components/animated-div";
import type { ServiceLanding } from "@/lib/landing-data";

type StatsData = NonNullable<ServiceLanding["stats"]>;

export default function LandingStats({ data }: { data: StatsData }) {
  return (
    <section className="w-full py-16 md:py-20 bg-zinc-950 text-white border-y border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        {data.heading && (
          <AnimatedDiv className="text-center mb-12">
            <h2 className="font-headline text-2xl md:text-4xl font-bold tracking-tighter">
              {data.heading}
            </h2>
          </AnimatedDiv>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {data.items.map((stat, i) => (
            <AnimatedDiv key={stat.label} delay={i * 80} className="text-center">
              <div className="font-headline text-3xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
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
