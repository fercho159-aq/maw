
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, CodeXml, PenSquare, Megaphone, Bot, Newspaper, Mic2, LayoutGrid, FileText, GraduationCap, Target, Wallet, BarChart4, DollarSign, Database, Users, Archive, Combine, Zap, Wrench, QrCode, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ThemeToggle } from "./theme-toggle";

const servicesLinks = [
  {
    href: "/servicios/redes-sociales",
    label: "Contenido y Ads",
    description: "Contenido orgánico + campañas pagadas en un solo plan.",
    icon: <Megaphone className="w-5 h-5" />
  },
  {
    href: "/servicios/sitio-web",
    label: "Sitios Web",
    description: "Diseño y desarrollo de sitios web modernos.",
    icon: <CodeXml className="w-5 h-5" />
  },
  {
    href: "/servicios/podcast",
    label: "Podcast",
    description: "Producción, edición y distribución profesional.",
    icon: <Mic2 className="w-5 h-5" />
  },
  {
    href: "/servicios/desarrollo-a-la-medida",
    label: "App's (Android e iOS)",
    description: "Desarrollo de aplicaciones móviles personalizadas.",
    icon: <Bot className="w-5 h-5" />
  },
];

const blogLinks = [
  {
    href: "/blog?tab=news",
    label: "Noticias",
    description: "Análisis y guías sobre las últimas tendencias del marketing digital en México y el mundo.",
    icon: <Newspaper className="w-5 h-5" />
  },
  {
    href: "/blog?tab=interviews",
    label: "Entrevistas",
    description: "Conversaciones con líderes de opinión, emprendedores y creativos que están redefiniendo sus industrias.",
    icon: <Mic2 className="w-5 h-5" />
  },
];

const portfolioLinks = [
  {
    href: "/servicios/sitio-web#casos",
    label: "Sitios Web",
    description: "Explora los increíbles sitios web que hemos diseñado y desarrollado.",
    icon: <CodeXml className="w-5 h-5" />
  },
  {
    href: "/servicios/redes-sociales#casos",
    label: "Redes Sociales",
    description: "Casos de éxito sobre gestión de contenido e impacto digital.",
    icon: <Users className="w-5 h-5" />
  },
  {
    href: "/servicios/podcast#casos",
    label: "Podcast",
    description: "Nuestras mejores producciones de audio y video podcast.",
    icon: <Mic2 className="w-5 h-5" />
  },
];





const toolsLinks = [
  {
    href: "/herramientas/generador-qr",
    label: "Generador de Códigos QR",
    description: "Crea códigos QR para URLs, texto, WiFi, contactos y más.",
    icon: <QrCode className="w-5 h-5" />,
  },
  {
    href: "/herramientas/extractor-maps",
    label: "Extractor de Google Maps",
    description: "Extrae información de negocios desde búsquedas de Maps.",
    icon: <MapPin className="w-5 h-5" />,
  },
];

const navLinks = [
  { href: "/contacto", label: "Contacto" },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300 ease-in-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/20 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {servicesLinks.map((service) => (
                    <ListItem
                      key={service.label}
                      title={service.label}
                      href={service.href}
                      icon={service.icon}
                    >
                      {service.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>


            <NavigationMenuItem>
              <NavigationMenuTrigger>Casos de Éxito</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]">
                  {portfolioLinks.map((link) => (
                    <ListItem
                      key={link.label}
                      title={link.label}
                      href={link.href}
                      icon={link.icon}
                    >
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>



            <NavigationMenuItem>
              <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]">
                  {blogLinks.map((link) => (
                    <ListItem
                      key={link.label}
                      title={link.label}
                      href={link.href}
                      icon={link.icon}
                    >
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>



            <NavigationMenuItem>
              <NavigationMenuTrigger>Herramientas</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]">
                  {toolsLinks.map((link) => (
                    <ListItem
                      key={link.label}
                      title={link.label}
                      href={link.href}
                      icon={link.icon}
                    >
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link href={link.href} className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Logo />
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Cerrar menú</span>
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="mt-8 flex-1 flex-col gap-2 overflow-y-auto">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="text-lg font-medium py-2 hover:no-underline">
                        Servicios
                      </AccordionTrigger>
                      <AccordionContent className="pl-4">
                        <div className="flex flex-col gap-4 pt-2">
                          {servicesLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="text-base font-medium text-foreground/80"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-b-0">
                      <AccordionTrigger className="text-lg font-medium py-2 hover:no-underline">
                        Casos de Éxito
                      </AccordionTrigger>
                      <AccordionContent className="pl-4">
                        <div className="flex flex-col gap-4 pt-2">
                          {portfolioLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="text-base font-medium text-foreground/80"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-b-0">
                      <AccordionTrigger className="text-lg font-medium py-2 hover:no-underline">
                        Blog
                      </AccordionTrigger>
                      <AccordionContent className="pl-4">
                        <div className="flex flex-col gap-4 pt-2">
                          {blogLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="text-base font-medium text-foreground/80"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-7" className="border-b-0">
                      <AccordionTrigger className="text-lg font-medium py-2 hover:no-underline">
                        Herramientas
                      </AccordionTrigger>
                      <AccordionContent className="pl-4">
                        <div className="flex flex-col gap-4 pt-2">
                          {toolsLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="text-base font-medium text-foreground/80"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-lg font-medium px-4 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/equipo"
                    className="block text-lg font-medium px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Equipo
                  </Link>
                </nav>
                <div className="mt-auto pt-4">
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

