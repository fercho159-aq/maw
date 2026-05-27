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
import AnimatedDiv from "@/components/animated-div";
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
      title: "¡Solicitud enviada!",
      description: "Gracias por contactarnos. Te responderemos muy pronto.",
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
    <section id={anchorId} className="w-full py-20 md:py-28 bg-card border-t border-border scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <AnimatedDiv className="text-center mb-10">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Cotiza sin compromiso</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-foreground mb-3">
            {config.heading}
          </h2>
          {config.subheading && <p className="text-foreground/70 md:text-lg">{config.subheading}</p>}
        </AnimatedDiv>

        <AnimatedDiv className="rounded-3xl border border-border/60 bg-background p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" {...field} />
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
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de tu empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="tu@email.com" {...field} />
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
                      <FormLabel>Teléfono / WhatsApp</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Tu número" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servicio de interés</FormLabel>
                      <FormControl>
                        <Input placeholder="¿Qué te interesa?" {...field} />
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
                      <FormLabel>Presupuesto estimado</FormLabel>
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
                    <FormLabel>Cuéntanos sobre tu proyecto</FormLabel>
                    <FormControl>
                      <Textarea placeholder="¿Cómo podemos ayudarte?" className="resize-none min-h-24" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full font-semibold rounded-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Enviando..." : "Solicitar propuesta"}
              </Button>
            </form>
          </Form>
        </AnimatedDiv>
      </div>
    </section>
  );
}
