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
import { useToast } from "@/hooks/use-toast";
import { addLead } from "@/app/leads/_actions";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  company: z.string().min(2, {
    message: "El nombre de la empresa debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Introduzca un correo válido.",
  }),
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
});

const inputClassName =
  "h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base text-foreground placeholder:text-muted-foreground/60 focus-visible:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0";

const labelClassName =
  "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground";

export function ContactForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await addLead({
      name: values.name,
      company: values.company,
      email: values.email,
      notas: values.message,
      source: 'Formulario de Contacto'
    });

    toast({
      title: "Mensaje enviado",
      description: "Gracias por escribirnos. Le responderemos en breve.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Su nombre"
                    className={inputClassName}
                    {...field}
                  />
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
                <FormLabel className={labelClassName}>Empresa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre de la empresa"
                    className={inputClassName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClassName}>Correo</FormLabel>
              <FormControl>
                <Input
                  placeholder="nombre@empresa.com"
                  className={inputClassName}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClassName}>Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntenos sobre su operación y qué necesita resolver"
                  className="min-h-[140px] resize-none rounded-none border-0 border-b border-border bg-transparent px-0 text-base text-foreground placeholder:text-muted-foreground/60 focus-visible:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-auto rounded-none px-10 py-4 font-mono text-xs uppercase tracking-[0.25em]"
        >
          Enviar mensaje
        </Button>
      </form>
    </Form>
  );
}

export default ContactForm;
