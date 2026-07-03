"use client";

import AnimatedDiv from "@/components/animated-div";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  QrCode,
  FileSpreadsheet,
  MessageSquare,
  Bell,
  Scale,
  Truck,
  Fingerprint,
  ArrowRight,
  CalendarCheck,
  CreditCard,
  DoorOpen,
  ShowerHead,
  CheckCircle2,
  ChevronRight,
  Weight,
  type LucideIcon,
} from "lucide-react";

type SolutionCase = {
  icon: LucideIcon;
  title: string;
  description: string;
  steps: string[];
  tags: string[];
};

/** Flujo del caso destacado (autoservicio con IoT): visual, sin párrafos. */
const flowSteps: { icon: LucideIcon; label: string }[] = [
  { icon: CalendarCheck, label: "Reserva" },
  { icon: CreditCard, label: "Paga en línea" },
  { icon: QrCode, label: "Recibe su QR" },
  { icon: DoorOpen, label: "La puerta se abre" },
  { icon: ShowerHead, label: "Agua y shampoo" },
  { icon: CheckCircle2, label: "Listo" },
];

const cases: SolutionCase[] = [
  {
    icon: Weight,
    title: "Pesaje y formulación industrial",
    description: "Básculas y terminales de pesaje conectados al sistema, con recetas y trazabilidad.",
    steps: [
      "La báscula o terminal se conecta al sistema",
      "El operador pesa guiado por la receta",
      "Lote trazable, etiquetado e inventario al día",
    ],
    tags: ["Básculas", "Trazabilidad", "Industria regulada"],
  },
  {
    icon: FileSpreadsheet,
    title: "Reportes que se descargan solos",
    description: "Robots bajan a diario los reportes de cada portal de proveedor.",
    steps: [
      "El robot entra al portal con tus credenciales",
      "Descarga ventas e inventario en Excel",
      "Consolida y te lo entrega limpio cada mañana",
    ],
    tags: ["RPA", "Excel"],
  },
  {
    icon: MessageSquare,
    title: "Ventas ordenadas por WhatsApp",
    description: "Bandeja unificada, leads asignados solos y KPIs por vendedor.",
    steps: [
      "Cada mensaje entra a una bandeja unificada",
      "El lead se asigna solo al vendedor que toca",
      "Pipeline y KPIs se actualizan en tiempo real",
    ],
    tags: ["WhatsApp", "Pipeline"],
  },
  {
    icon: Bell,
    title: "Bot que persigue pendientes",
    description: "Telegram recuerda a cada encargado lo suyo y avisa los cortes.",
    steps: [
      "Cada encargado da de alta sus pendientes",
      "El bot recuerda cada mañana lo que vence",
      "Avisa los cortes por cliente con su checklist",
    ],
    tags: ["Telegram", "Recordatorios"],
  },
  {
    icon: Scale,
    title: "IA que analiza documentos fiscales",
    description: "Lee oficios del SAT contra 46 leyes y jurisprudencias.",
    steps: [
      "Subes el oficio o resolución (PDF)",
      "La IA lo cruza contra leyes y jurisprudencias",
      "Recibes plazos, montos y vías de defensa",
    ],
    tags: ["IA", "Fiscal MX"],
  },
  {
    icon: Truck,
    title: "Logística con seguimiento",
    description: "Rutas, estados de envío y control de entregas desde un panel.",
    steps: [
      "Se registra la carga y su ruta",
      "Cada estado se actualiza desde el panel",
      "Entregas confirmadas y reportes por perfil",
    ],
    tags: ["Tracking", "Roles"],
  },
  {
    icon: Fingerprint,
    title: "Apps con identidad biométrica",
    description: "Apps iOS y Android publicadas en las tiendas.",
    steps: [
      "El usuario se registra en la app",
      "Valida su identidad con biometría",
      "Opera mensajería empresarial segura",
    ],
    tags: ["Apps nativas", "Biometría"],
  },
];

export default function ErpSolutionsSlot() {
  return (
    <section className="w-full py-20 md:py-28 bg-card border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedDiv className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Casos reales</p>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">
            Soluciones así de específicas
          </h2>
          <p className="text-foreground/70 md:text-lg">
            El sistema exacto para cada operación. Estos ya funcionan.
          </p>
        </AnimatedDiv>

        <div className="max-w-6xl mx-auto">
          <AnimatedDiv className="relative overflow-hidden rounded-2xl border border-primary/30 bg-background p-8 md:p-10 mb-10">
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative text-center mb-8">
              <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-2">
                Caso destacado · Autoservicio con IoT
              </p>
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-foreground">
                Lavado de mascotas que opera sin empleados
              </h3>
            </div>
            <div className="relative flex flex-wrap items-center justify-center gap-y-6 gap-x-1 md:gap-x-2">
              {flowSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-center gap-2 w-[88px] md:w-[104px]">
                      <div className="inline-flex w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                        <Icon className="w-6 h-6 md:w-7 md:h-7" />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-foreground/80 text-center leading-tight">
                        {step.label}
                      </span>
                    </div>
                    {i < flowSteps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-primary/50 flex-shrink-0 -mt-6" />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="relative text-center text-sm text-foreground/60 mt-8">
              QR de un solo uso controla puerta, agua, shampoo y toalla. El dueño administra todo desde un panel.
            </p>
          </AnimatedDiv>

          <AnimatedDiv className="relative px-10 md:px-14">
            <Carousel opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {cases.map((c) => {
                  const Icon = c.icon;
                  return (
                    <CarouselItem key={c.title} className="md:basis-1/2 lg:basis-1/3">
                      <div className="h-full flex flex-col rounded-2xl border border-border/60 bg-background p-6 transition-colors hover:border-primary/40">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex-shrink-0 inline-flex w-11 h-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/15">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-semibold text-base text-foreground leading-snug">{c.title}</h3>
                        </div>
                        <p className="text-sm text-foreground/60 leading-snug mb-4">{c.description}</p>
                        <div className="mb-5">
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-3">
                            Cómo funciona
                          </p>
                          <ol className="space-y-2.5">
                            {c.steps.map((step, i) => (
                              <li key={step} className="flex items-start gap-2.5 text-sm text-foreground/75">
                                <span className="mt-0.5 flex-shrink-0 inline-flex w-5 h-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-bold">
                                  {i + 1}
                                </span>
                                <span className="leading-snug">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="mt-auto flex flex-wrap gap-1.5">
                          {c.tags.map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-muted text-foreground/60 px-2.5 py-0.5 text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </AnimatedDiv>

          <AnimatedDiv className="text-center mt-10">
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
