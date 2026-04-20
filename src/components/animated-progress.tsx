
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedProgressProps {
  value: number;
}

const AnimatedProgress = ({ value }: AnimatedProgressProps) => {
  return (
    <div className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary")}>
      <motion.div
        className="h-full bg-primary"
        initial={{ x: "-100%" }}
        animate={{ x: `-${100 - (value || 0)}%` }}
        transition={{ ease: "linear", duration: 0.5 }}
      />
      {/* 
        The walking person animation is a great idea but requires more complex animation logic (sprite sheets or multiple svgs).
        This is a placeholder for now. We can iterate on this later.
      */}
      <motion.div
        className="absolute bottom-0 text-2xl"
        initial={{ x: 0 }}
        animate={{ x: `calc(${value}% - 10px)` }} // Adjust position to be centered
        transition={{ ease: "linear", duration: 0.5 }}
      >
        🏃
      </motion.div>
    </div>
  );
};

export default AnimatedProgress;
