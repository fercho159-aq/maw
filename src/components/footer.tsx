
import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { TikTokIcon } from "./icons/tiktok-icon";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Logo />
            <div className="mt-4">
                <Button variant="link" asChild>
                <Link href="/equipo">admin interna</Link>
                </Button>
            </div>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-lg mb-4 text-center">Nuestros Servicios</h4>
            <div className="grid grid-cols-2 gap-8">
                <ul className="space-y-2">
                    <li><Link href="/servicios/redes-sociales" className="hover:text-primary transition-colors">Contenido y Ads</Link></li>
                    <li><Link href="/servicios/sitio-web" className="hover:text-primary transition-colors">Sitios Web</Link></li>
                </ul>
                 <ul className="space-y-2">
                    <li><Link href="/servicios/podcast" className="hover:text-primary transition-colors">Podcast</Link></li>
                    <li><Link href="/servicios/apps" className="hover:text-primary transition-colors">App's</Link></li>
                </ul>
            </div>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-lg mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.youtube.com/@solucionesmaw" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.instagram.com/mawsoluciones/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.facebook.com/profile.php?id=61574705492838" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.tiktok.com/@solucionesmaw" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <TikTokIcon className="h-5 w-5 fill-current" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-foreground/60 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          <p>&copy; {new Date().getFullYear()} MAW Soluciones. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/politicas" className="hover:text-primary transition-colors">Política de Privacidad</Link>
            <Link href="/terminos" className="hover:text-primary transition-colors">Términos del Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
