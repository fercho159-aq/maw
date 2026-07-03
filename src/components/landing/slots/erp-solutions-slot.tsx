"use client";

import AnimatedDiv from "@/components/animated-div";
import { Button } from "@/components/ui/button";
import {
  QrCode,
  FileSpreadsheet,
  MessageSquare,
  Bell,
  Scale,
  Truck,
  Fingerprint,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type SolutionCase = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
};

/**
 * Caso destacado: autoservicio operado 100% por el sistema (reservas, pagos,
 * QR e IoT). Los demás son soluciones reales construidas para operaciones
 * igual de específicas.
 */
const featured = {
  icon: QrCode,
  eyebrow: "Caso destacado · Autoservicio con IoT",
  title: "Lavado de mascotas que opera sin empleados",
  description:
    "El cliente reserva y paga en línea (tarjeta, OXXO o transferencia) y recibe un QR cifrado de un solo uso por WhatsApp. Ese QR abre la puerta del local, activa el agua y el shampoo según el tamaño del perro y libera la toalla del gabinete. El dueño lo administra todo desde un panel: reservas, inventario, apertura remota y varias sucursales.",
  tags: ["Reservas y pagos en línea", "QR de un solo uso", "Control IoT de puerta y máquinas", "Panel multi-sucursal"],
};

const cases: SolutionCase[] = [
  {
    icon: FileSpreadsheet,
    title: "Reportes de portales, descargados solos",
    description:
      "Un proveedor de tiendas departamentales bajaba a mano reportes de ventas e inventario de cada portal (Liverpool, Palacio, Chapur…). Ahora robots entran, descargan y entregan el Excel limpio todos los días, sin que nadie toque nada.",
    tags: ["RPA", "Cron en servidor", "Excel consolidado"],
  },
  {
    icon: MessageSquare,
    title: "Ventas ordenadas para una distribuidora",
    description:
      "Distribuidora de material eléctrico con leads regados en WhatsApp: bandeja unificada, asignación automática de leads a vendedores, pipeline visual, cotizaciones y KPIs por vendedor en un solo sistema.",
    tags: ["WhatsApp", "Pipeline", "KPIs por vendedor"],
  },
  {
    icon: Bell,
    title: "Bot que persigue los pendientes",
    description:
      "Bot de Telegram que administra pendientes por encargado: recordatorio diario a cada quien con lo suyo, avisos de corte por cliente con su checklist mensual y resumen sincronizado a Google Sheets.",
    tags: ["Telegram", "Recordatorios", "Google Sheets"],
  },
  {
    icon: Scale,
    title: "IA que analiza documentos fiscales",
    description:
      "Agente de inteligencia artificial que lee oficios del SAT y resoluciones del TFJA contra un corpus de 46 leyes y jurisprudencias: detecta plazos críticos, montos, fundamentos y vías de defensa en minutos.",
    tags: ["IA", "Análisis documental", "Fiscal MX"],
  },
  {
    icon: Truck,
    title: "Logística de mercancías con seguimiento",
    description:
      "Sistema de transporte de mercancías para tiendas departamentales: rutas, estados de envío y control de entregas desde un panel, con roles y permisos por perfil.",
    tags: ["Logística", "Tracking", "Roles y permisos"],
  },
  {
    icon: Fingerprint,
    title: "Apps con identidad y mensajería",
    description:
      "Plataforma con apps nativas iOS y Android: validación de identidad biométrica y mensajería empresarial vinculada al SAT, publicada en App Store y Google Play.",
    tags: ["Apps nativas", "Biometría", "App Store / Play"],
  },
];

export default function ErpSolutionsSlot() {
  const FeaturedIcon = featured.icon;
  return (
    <section className="w-full py-20 md:py-28 bg-card border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedDiv className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Casos reales</p>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">
            Soluciones así de específicas
          </h2>
          <p className="text-foreground/70 md:text-lg">
            No vendemos software genérico: construimos el sistema exacto que tu operación necesita. Estos son
            algunos que ya funcionan.
          </p>
        </AnimatedDiv>

        <div className="max-w-6xl mx-auto">
          <AnimatedDiv className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-background p-8 md:p-10 mb-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative grid md:grid-cols-[auto,1fr] gap-6 items-start">
              <div className="inline-flex w-14 h-14 items-center justify-center rounded-xl bg-primary text-primary-foreground ring-1 ring-inset ring-primary">
                <FeaturedIcon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-2">{featured.eyebrow}</p>
                <h3 className="font-headline text-2xl md:text-3xl font-bold mb-3 text-foreground">{featured.title}</h3>
                <p className="text-foreground/70 leading-relaxed mb-5">{featured.description}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium ring-1 ring-inset ring-primary/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => {
              const Icon = c.icon;
              return (
                <AnimatedDiv
                  key={c.title}
                  delay={i * 80}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-7 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5"
                >
                  <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative inline-flex w-12 h-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 ring-1 ring-inset ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="relative font-semibold text-lg mb-2 text-foreground">{c.title}</h3>
                  <p className="relative text-sm text-foreground/70 leading-relaxed mb-4">{c.description}</p>
                  <div className="relative flex flex-wrap gap-2">
                    {c.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-muted text-foreground/70 px-2.5 py-0.5 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </AnimatedDiv>
              );
            })}
          </div>

          <AnimatedDiv className="text-center mt-10">
            <p className="text-foreground/70 mb-4">¿Tu operación también es única? Cuéntanos qué necesita.</p>
            <Button size="lg" asChild className="font-semibold">
              <a href="#cotizar">
                Cotizar mi solución <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
}
