import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import WhatsappIcon from "@/components/icons/whatsapp-icon";
import AnimatedDiv from "../animated-div";
import AnimatedChatInvitation from "../animated-chat-invitation";

const Contact = () => {
  return (
    <section id="contact" className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedDiv className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold flex items-center justify-center gap-4">
            Hablemos
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            ¿Listo para llevar tu marca al siguiente nivel? Contáctanos o reserva una sesión estratégica.
          </p>
        </AnimatedDiv>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <AnimatedDiv className="bg-card p-8 rounded-lg shadow-lg" transition={{ delay: 0.2 }}>
            <h3 className="font-headline text-2xl font-bold mb-6">Información de Contacto</h3>
            <div className="space-y-6 mb-8">
              <div>
                <h4 className="font-headline font-bold text-lg text-white">Oficina</h4>
                <p className="text-foreground/80 mt-1 text-sm md:text-base">Av. Popocatépetl 474, Xoco, Benito Juárez, 03330 Ciudad de México, CDMX</p>
              </div>
              <div>
                <h4 className="font-headline font-bold text-lg text-white">Estudio</h4>
                <p className="text-foreground/80 mt-1 text-sm md:text-base">Cda. Felix Cuevas 13, Tlacoquemecatl del Valle, Benito Juárez, 03200 Ciudad de México, CDMX</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:aldo@mawsoluciones.com" className="hover:text-primary transition-colors">aldo@mawsoluciones.com</a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+525538359927" className="hover:text-primary transition-colors">55 3835 9927</a>
              </div>
              <div className="flex items-center gap-4">
                <WhatsappIcon className="w-5 h-5 text-primary" />
                <a href="https://wa.me/525538359927" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">55 3835 9927</a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-primary font-bold text-lg w-5 text-center">@</span>
                <span className="text-foreground/80 font-medium">mawsoluciones</span>
              </div>
            </div>
            <AnimatedChatInvitation />
          </AnimatedDiv>
          <AnimatedDiv id="booking" className="bg-card p-8 rounded-lg shadow-lg" transition={{ delay: 0.4 }}>
            <h3 className="font-headline text-2xl font-bold mb-6">Envíanos un mensaje</h3>
            <ContactForm />
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
};

export default Contact;
