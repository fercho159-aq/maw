"use client";

import WhatsappIcon from "@/components/icons/whatsapp-icon";

const ChatBubble = () => {
  const whatsappUrl = "https://wa.me/5538359927?text=Hola%2C%20me%20interesa%20trabajar%20con%20ustedes.%20%C2%BFPor%20d%C3%B3nde%20empezamos%3F";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-scale-in">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar por WhatsApp"
        className="flex items-center justify-center w-16 h-16 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#20bd5a] transition-colors hover:scale-110"
      >
        <WhatsappIcon className="w-8 h-8 text-white" />
      </a>
    </div>
  );
};

export default ChatBubble;
