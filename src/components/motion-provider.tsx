"use client";

import { LazyMotion, domAnimation } from "framer-motion";

const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domAnimation);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
