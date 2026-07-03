import AnimatedDiv from "@/components/animated-div";
import AnimatedCounter from "@/components/animated-counter";
import type { ServiceLanding } from "@/lib/landing-data";

type StatsData = NonNullable<ServiceLanding["stats"]>;

export default function LandingStats({ data }: { data: StatsData }) {
  return (
    <section className="relative w-full py-16 md:py-24 bg-card border-y border-border/50 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-72 w-[700px] rounded-full bg-primary/10 blur-[130px]" />
      <div className="relative container mx-auto px-4 md:px-6">
        {data.heading && (
          <AnimatedDiv className="text-center mb-12">
            <h2 className="font-headline text-2xl md:text-4xl font-bold tracking-tighter text-foreground">
              {data.heading}
            </h2>
          </AnimatedDiv>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 max-w-5xl mx-auto lg:divide-x lg:divide-border/60">
          {data.items.map((stat, i) => (
            <AnimatedDiv key={stat.label} delay={i * 80} variant="scale" className="text-center px-3 lg:px-6">
              <AnimatedCounter
                value={stat.value}
                className="block font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-primary"
              />
              <p className="text-sm md:text-base text-foreground/60 mt-2">{stat.label}</p>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
