"use client";

import { m } from "framer-motion";
import WhatsappIcon from "@/components/icons/whatsapp-icon";

const ChatBubble = () => {
  const whatsappUrl = "https://wa.me/5633774723";

  return (
    <m.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: "backOut" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar por WhatsApp"
        className="flex items-center justify-center w-16 h-16 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#20bd5a] transition-colors hover:scale-110"
      >
        <WhatsappIcon className="w-8 h-8 text-white" />
      </a>
    </m.div>
  );
};

export default ChatBubble;
