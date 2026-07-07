"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn, SectionHeading } from "@/components/editorial";
import { useToast } from "@/hooks/use-toast";
import { addLead } from "@/app/leads/_actions";
import type { LeadFormConfig } from "@/lib/landing-data";

/** Rangos de presupuesto (valor → etiqueta legible para ventas). */
const BUDGETS = {
  "menos-10k": "Menos de $10,000 MXN",
  "10k-25k": "$10,000 - $25,000 MXN",
  "25k-50k": "$25,000 - $50,000 MXN",
  "50k-100k": "$50,000 - $100,000 MXN",
  "mas-100k": "Más de $100,000 MXN",
  "no-seguro": "Aún no lo sé / Quiero asesoría",
} as const;

const budgetEnum = z.enum([
  "menos-10k",
  "10k-25k",
  "25k-50k",
  "50k-100k",
  "mas-100k",
  "no-seguro",
]);

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  company: z.string().min(2, { message: "El nombre de la empresa debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  phone: z.string().min(10, { message: "Por favor, introduce un número de teléfono válido." }),
  interest: z.string().min(2, { message: "Indica el servicio de interés." }),
  budget: budgetEnum,
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LandingLeadForm({
  config,
  anchorId = "cotizar",
}: {
  config: LeadFormConfig;
  anchorId?: string;
}) {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      interest: config.defaultInterest,
      budget: "no-seguro",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    await addLead({
      name: values.name,
      company: values.company,
      email: values.email,
      phone: values.phone,
      notas: values.message,
      source: config.source,
      data: {
        budget: values.budget,
        budgetLabel: BUDGETS[values.budget],
        interest: values.interest,
        landingSource: config.source,
      },
    });

    toast({
      title: "Solicitud enviada",
      description: "Gracias por escribirnos. Te respondemos en menos de un día hábil.",
    });
    form.reset({
      name: "",
      company: "",
      email: "",
      phone: "",
      interest: config.defaultInterest,
      budget: "no-seguro",
      message: "",
    });
  }

  return (
    <section
      id={anchorId}
      className="w-full scroll-mt-20 border-t border-border bg-secondary py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4">
            <SectionHeading
              eyebrow="Conversación"
              title={config.heading}
              description={config.subheading}
              titleClassName="md:text-display-xs lg:text-display-xs"
            />
          </FadeIn>

          <FadeIn className="lg:col-span-7 lg:col-start-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          Nombre
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          Empresa
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre de la empresa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="nombre@empresa.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          Teléfono / WhatsApp
                        </FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Número con WhatsApp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          Servicio de interés
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Qué necesitas" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          Presupuesto estimado
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un rango" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(BUDGETS).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        Sobre el proyecto
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Contexto, objetivos y plazos"
                          className="min-h-28 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="h-12 rounded-none bg-foreground px-10 text-sm font-medium tracking-wide text-background hover:bg-foreground/85"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Enviando…" : "Solicitar propuesta"}
                </Button>
              </form>
            </Form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
