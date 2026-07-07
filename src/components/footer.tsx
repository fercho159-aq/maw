import Link from "next/link";
import Logo from "./logo";

const serviceLinks = [
  { href: "/servicios/redes-sociales", label: "Contenido y Ads" },
  { href: "/servicios/sitio-web", label: "Sitios web" },
  { href: "/servicios/podcast", label: "Podcast" },
  { href: "/servicios/desarrollo-a-la-medida", label: "Aplicaciones móviles" },
  { href: "/servicios/erp", label: "ERP y sistemas de operación" },
];

const studioLinks = [
  { href: "/portafolio", label: "Casos" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

const socialLinks = [
  { href: "https://www.youtube.com/@solucionesmaw", label: "YouTube" },
  { href: "https://www.instagram.com/mawsoluciones/", label: "Instagram" },
  {
    href: "https://www.facebook.com/profile.php?id=61574705492838",
    label: "Facebook",
  },
  { href: "https://www.tiktok.com/@solucionesmaw", label: "TikTok" },
];

const columnHeading =
  "font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground";
const columnLink =
  "text-sm text-foreground/70 transition-colors hover:text-foreground";

const Footer = () => {
  return (
    <footer className="border-t border-stone/30 bg-secondary">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Estrategia, ingeniería y contenido digital para empresas que
              operan en serio.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className={columnHeading}>Servicios</p>
            <ul className="mt-6 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={columnLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className={columnHeading}>Estudio</p>
            <ul className="mt-6 space-y-3">
              {studioLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={columnLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className={columnHeading}>Redes</p>
            <ul className="mt-6 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={columnLink}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-stone/30 pt-8 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} MAW Soluciones — Todos los derechos
            reservados
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/politicas"
              className="transition-colors hover:text-foreground"
            >
              Política de privacidad
            </Link>
            <Link
              href="/terminos"
              className="transition-colors hover:text-foreground"
            >
              Términos del servicio
            </Link>
            <Link
              href="/equipo"
              className="transition-colors hover:text-foreground"
            >
              Acceso interno
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
