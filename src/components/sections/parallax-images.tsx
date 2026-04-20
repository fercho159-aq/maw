
"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImagesProps {
  laptopImage: string;
  phoneImage: string;
}

const ParallaxImages = ({ laptopImage, phoneImage }: ParallaxImagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Laptop Animation
  const laptopScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const laptopOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const laptopY = useTransform(scrollYProgress, [0, 0.5], ['10vh', '0vh']);
  
  // Phone Animation
  const phoneScale = useTransform(scrollYProgress, [0.1, 0.6], [0.5, 1]);
  const phoneOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const phoneY = useTransform(scrollYProgress, [0.1, 0.6], ['0vh', '5vh']);
  const phoneX = useTransform(scrollYProgress, [0.1, 0.6], ['-50vw', '-15vw']);


  return (
    <div ref={containerRef} className="relative h-full w-full">
      <div className="sticky top-1/4 h-full w-full flex items-center justify-center overflow-hidden">
        <motion.div 
            className="absolute w-[100vw] h-[100vh] max-w-[1300px] max-h-[800px]"
            style={{
                scale: laptopScale,
                opacity: laptopOpacity,
                y: laptopY,
                zIndex: 10
            }}
        >
          <Image
            src={laptopImage}
            alt="Laptop"
            fill
            className="object-contain"
            data-ai-hint="website design"
          />
        </motion.div>
        
        <motion.div 
            className="absolute w-[100vw] h-[100vh] max-w-[600px] max-h-[1100px]"
             style={{
                scale: phoneScale,
                opacity: phoneOpacity,
                y: phoneY,
                x: phoneX,
                zIndex: 20
            }}
        >
          <Image
             src={phoneImage}
            alt="Phone"
            fill
            className="object-contain"
            data-ai-hint="ecommerce website"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxImages;
