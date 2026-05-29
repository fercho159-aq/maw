"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll con inercia (Lenis) para una sensación premium que invita a seguir
 * bajando. Intercepta anclas internas (#cotizar, #planes…) para hacer scroll
 * suave y respeta prefers-reduced-motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // lerp bajo = la página "alcanza" el scroll de forma continua y suave,
      // con glide largo tipo Apple (en vez de duration+easing por gesto).
      lerp: 0.07,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      syncTouch: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        offset: -80,
        duration: 1.6,
        easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
