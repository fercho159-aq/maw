
"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const services = ["Sitios Web", "Creación de Contenido", "Ads", "Automatización"];

const chatVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const AnimatedChatInvitation = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const serviceIndex = useTransform(rounded, (latest) => latest % services.length);
  const displayText = useTransform(serviceIndex, (latest) => services[latest]);

  useEffect(() => {
    const controls = animate(count, services.length, {
      duration: services.length * 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    });

    return controls.stop;
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 4,
          },
        },
      }}
      className="mt-10 mb-4 text-center"
    >
      <h3 className="font-headline text-2xl font-bold mb-6">
        Contáctanos por WhatsApp
      </h3>

      <div className="flex flex-col items-center gap-4 min-h-[220px]">
        <motion.div
          key="msg1"
          variants={chatVariants}
           className="bg-secondary text-secondary-foreground p-3 rounded-lg rounded-bl-none max-w-xs self-start shadow-md"
        >
          <p>Hola, quiero más informes</p>
        </motion.div>

        <motion.div
          key="msg2"
          variants={chatVariants}
          className="bg-primary text-primary-foreground p-3 rounded-lg rounded-br-none max-w-xs self-end shadow-md"
        >
          <p>¡Hola! Somos MAW Soluciones. ¿En qué podemos ayudarte hoy?</p>
        </motion.div>

        <motion.div
          key="msg3"
          variants={chatVariants}
          className="bg-secondary text-secondary-foreground p-3 rounded-lg rounded-bl-none max-w-xs self-start shadow-md"
        >
          <p>Quiero saber más sobre <motion.span className="font-bold text-primary">{displayText}</motion.span></p>
        </motion.div>

        <motion.div
          key="button"
          variants={chatVariants}
          className="w-full mt-4"
        >
          <Button
            onClick={() => {
              window.open("https://wa.me/5633774723?text=Hola%2C%20me%20interesa%20trabajar%20con%20ustedes.%20%C2%BFPor%20d%C3%B3nde%20empezamos%3F", "_blank");
            }}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white"
            size="lg"
          >
            Abrir Chat en WhatsApp
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimatedChatInvitation;
