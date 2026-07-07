"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Logo from "./logo";
import { ThemeToggle } from "./theme-toggle";

const services = [
  {
    number: "01",
    href: "/servicios/redes-sociales",
    label: "Contenido y Ads",
    description: "Contenido orgánico y campañas pagadas bajo un mismo plan.",
  },
  {
    number: "02",
    href: "/servicios/sitio-web",
    label: "Sitios web",
    description: "Diseño y desarrollo de plataformas web a la medida.",
  },
  {
    number: "03",
    href: "/servicios/podcast",
    label: "Podcast",
    description: "Producción, edición y distribución profesional.",
  },
  {
    number: "04",
    href: "/servicios/desarrollo-a-la-medida",
    label: "Aplicaciones móviles",
    description: "Desarrollo nativo para Android e iOS.",
  },
  {
    number: "05",
    href: "/servicios/erp",
    label: "ERP y sistemas de operación",
    description: "Inventario, facturación, IoT y hardware en un solo sistema.",
  },
];

const navLinks = [
  { href: "/portafolio", label: "Casos" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

const underlineLink =
  "relative text-sm text-foreground/70 transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-bronze after:transition-[width] after:duration-300 after:ease-out hover:after:w-full motion-reduce:after:transition-none";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone/30 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Logo />

        {/* Navegación de escritorio */}
        <div className="hidden items-center gap-10 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-10">
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "h-auto rounded-none bg-transparent p-0 text-sm font-normal text-foreground/70 hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground data-[active]:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground"
                  )}
                >
                  Servicios
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[480px] p-8">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Servicios
                    </p>
                    <div className="mt-4 h-px w-full bg-stone/30" />
                    <ul className="divide-y divide-stone/20">
                      {services.map((service) => (
                        <li key={service.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={service.href}
                              className="group flex items-baseline gap-4 py-4 outline-none"
                            >
                              <span className="font-mono text-xs text-bronze">
                                {service.number}
                              </span>
                              <span className="flex-1">
                                <span className="block font-display text-lg leading-snug text-foreground transition-colors group-hover:text-bronze group-focus-visible:text-bronze">
                                  {service.label}
                                </span>
                                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                                  {service.description}
                                </span>
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link href={link.href} className={underlineLink}>
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center border border-foreground/70 px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Agendar conversación
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Navegación móvil */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] border-l border-stone/30 bg-background"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-stone/30 pb-6">
                  <Logo />
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Cerrar menú</span>
                    </Button>
                  </SheetTrigger>
                </div>

                <nav className="mt-10 flex-1 overflow-y-auto">
                  <div className="flex flex-col gap-5">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="font-display text-2xl leading-none text-foreground"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-10 border-t border-stone/30 pt-8">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Servicios
                    </p>
                    <div className="mt-5 flex flex-col gap-4">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="flex items-baseline gap-3 text-sm text-foreground/80"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="font-mono text-[0.65rem] text-bronze">
                            {service.number}
                          </span>
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>

                <div className="mt-auto border-t border-stone/30 pt-6">
                  <Link
                    href="/contacto"
                    className="inline-flex w-full items-center justify-center border border-foreground/70 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Agendar conversación
                  </Link>
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
