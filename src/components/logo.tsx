import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Logotipo tipográfico editorial: "MAW" en serif display,
 * "Soluciones" como metadato en mono. Sin taglines.
 */
const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      aria-label="MAW Soluciones — inicio"
      className={cn(
        "group inline-flex items-baseline gap-3 text-foreground",
        className
      )}
    >
      <span className="font-display text-2xl font-medium leading-none tracking-tight md:text-[1.7rem]">
        MAW
      </span>
      <span
        aria-hidden="true"
        className="h-px w-5 self-center bg-stone/50 transition-colors group-hover:bg-bronze"
      />
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
        Soluciones
      </span>
    </Link>
  );
};

export default Logo;
