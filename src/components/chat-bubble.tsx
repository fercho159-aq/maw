"use client";

import WhatsappIcon from "@/components/icons/whatsapp-icon";

const ChatBubble = () => {
  const whatsappUrl = "https://wa.me/5633774723?text=Hola%2C%20me%20interesa%20trabajar%20con%20ustedes.%20%C2%BFPor%20d%C3%B3nde%20empezamos%3F";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/20 bg-ink text-ivory shadow-lg transition-colors duration-300 hover:bg-charcoal"
      >
        <WhatsappIcon className="h-6 w-6" />
      </a>
    </div>
  );
};

export default ChatBubble;
