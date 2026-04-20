import Link from "next/link";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("inline-flex flex-col items-center justify-center leading-none text-foreground", className)}>
      <span className="text-3xl md:text-4xl font-extrabold tracking-tighter" style={{ fontFamily: "serif" }}>MAW</span>
      <span className="text-[0.45rem] md:text-[0.55rem] tracking-[0.2em] font-medium mt-1 px-1 border-b border-t border-foreground py-[2px] mb-1 uppercase">
        Marketing Ads Web
      </span>
      <span className="text-[0.6rem] md:text-[0.7rem] tracking-[0.3em] font-light uppercase">
        Soluciones
      </span>
    </Link>
  );
};

export default Logo;
