"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cuenta el número de un stat de 0 a su valor al entrar en viewport.
 * Conserva prefijo/sufijo no numérico: "+90", "<2s", "x5", "-70%", "9,000".
 * Si no hay número (p. ej. "ROI", "24/7" se anima sólo el 24) cae a estático.
 */
export default function AnimatedCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/-?[\d.,]+/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const numStr = match[0];
    const target = parseFloat(numStr.replace(/,/g, ""));
    if (!Number.isFinite(target)) {
      setDisplay(value);
      return;
    }

    const idx = match.index ?? 0;
    const prefix = value.slice(0, idx);
    const suffix = value.slice(idx + numStr.length);
    const hasComma = numStr.includes(",");
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const body = hasComma
        ? Number(fixed).toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : fixed;
      return prefix + body + suffix;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    // Estado inicial: arranca en 0 antes de entrar a viewport.
    setDisplay(format(0));

    let raf = 0;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        const duration = 1500;
        let startTime = 0;
        const tick = (t: number) => {
          if (!startTime) startTime = t;
          const p = Math.min(1, (t - startTime) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          if (p < 1) {
            setDisplay(format(target * eased));
            raf = requestAnimationFrame(tick);
          } else {
            setDisplay(value); // valor exacto con su formato original
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
