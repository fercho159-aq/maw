"use client";

import { portfolioItems, type PortfolioItemType } from "@/lib/portfolio-data";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { addLead } from "@/app/leads/_actions";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";
import {
  EditorialImage,
  Eyebrow,
  FadeIn,
  Rule,
  SectionHeading,
} from "@/components/editorial";

interface QuoteFormData {
  name: string;
  company: string;
  phone: string;
  hasWebsite: "Sí" | "No" | "";
  currentWebsite: string;
}

const QuoteDialog = ({ itemTitle }: { itemTitle: string }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    company: "",
    phone: "",
    hasWebsite: "",
    currentWebsite: "",
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setStatus("idle");
      setFormData({
        name: "",
        company: "",
        phone: "",
        hasWebsite: "",
        currentWebsite: "",
      });
    }
  };

  const handleSubmit = async () => {
    if (status !== "idle") return;
    setStatus("sending");

    await addLead({
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      source: "Quote Form - Portafolio",
      notas: `Interesado en un sitio como: ${itemTitle}. Sitio actual: ${formData.hasWebsite === "Sí" ? formData.currentWebsite : "No"}.`,
      data: formData,
    });

    setStatus("sent");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-auto rounded-none border-foreground px-10 py-4 font-mono text-xs uppercase tracking-[0.25em]"
        >
          Agendar conversación
        </Button>
      </DialogTrigger>
      {status === "sent" ? (
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-normal">
              Mensaje recibido
            </DialogTitle>
            <DialogDescription>
              Le contactamos en menos de un día hábil para conversar sobre un
              proyecto como {itemTitle}.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <span className="border-b border-border pb-1 transition-colors duration-300 hover:border-foreground">
                Si lo prefiere, escríbanos por WhatsApp
              </span>
            </a>
            <Button
              onClick={() => handleOpenChange(false)}
              className="h-auto rounded-none px-10 py-4 font-mono text-xs uppercase tracking-[0.25em]"
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      ) : (
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-normal">
            Conversemos sobre su proyecto
          </DialogTitle>
          <DialogDescription>
            Comparta sus datos y le contactamos en menos de un día hábil para
            conversar sobre un proyecto como {itemTitle}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right font-mono text-xs uppercase tracking-[0.15em]">
              Nombre
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right font-mono text-xs uppercase tracking-[0.15em]">
              Empresa
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right font-mono text-xs uppercase tracking-[0.15em]">
              Celular
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-mono text-xs uppercase tracking-[0.15em]">
              Sitio actual
            </Label>
            <RadioGroup
              value={formData.hasWebsite}
              onValueChange={(value) =>
                setFormData({ ...formData, hasWebsite: value as "Sí" | "No" })
              }
              className="col-span-3 flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Sí" id="ws-yes" />
                <Label htmlFor="ws-yes">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="ws-no" />
                <Label htmlFor="ws-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <AnimatePresence>
            {formData.hasWebsite === "Sí" && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor="currentWebsite" className="text-right font-mono text-xs uppercase tracking-[0.15em]">
                  URL
                </Label>
                <Input
                  id="currentWebsite"
                  value={formData.currentWebsite}
                  onChange={(e) =>
                    setFormData({ ...formData, currentWebsite: e.target.value })
                  }
                  placeholder="www.misitio.com"
                  className="col-span-3"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleSubmit}
            type="submit"
            disabled={status === "sending"}
            className="h-auto w-full rounded-none px-10 py-4 font-mono text-xs uppercase tracking-[0.25em]"
          >
            {status === "sending" ? "Enviando" : "Enviar"}
          </Button>
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="self-center font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <span className="border-b border-border pb-1 transition-colors duration-300 hover:border-foreground">
              O escríbanos por WhatsApp
            </span>
          </a>
        </div>
      </DialogContent>
      )}
    </Dialog>
  );
};

function NarrativeBlock({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <FadeIn>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow number={number}>{label}</Eyebrow>
        </div>
        <div className="md:col-span-8 md:col-start-5">{children}</div>
      </div>
    </FadeIn>
  );
}

export default function PortfolioItemPageContent({
  item,
}: {
  item: PortfolioItemType;
}) {
  const similarProjects = portfolioItems
    .filter((p) => p.id !== item.id && p.category === item.category)
    .slice(0, 3);

  return (
    <article className="bg-background">
      <section className="py-24 md:py-36">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
          <FadeIn>
            <Link
              href="/portafolio"
              className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              ← Todos los casos
            </Link>

            <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <Eyebrow>Caso</Eyebrow>
                <h1 className="mt-6 font-display text-4xl leading-[1.08] tracking-[-0.01em] text-foreground md:text-display-xs lg:text-display-sm">
                  {item.title}
                </h1>
              </div>
              <div className="md:col-span-3 md:col-start-10">
                <dl className="space-y-6">
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Cliente
                    </dt>
                    <dd className="mt-2 text-sm text-foreground">{item.client}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Sector
                    </dt>
                    <dd className="mt-2 text-sm text-foreground">{item.sector}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Disciplina
                    </dt>
                    <dd className="mt-2 text-sm text-foreground">
                      {item.category}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="mt-20">
            <EditorialImage
              src={item.image?.imageUrl ?? "/images/placeholder.png"}
              alt={item.title}
              ratio="3:2"
              sizes="(max-width: 768px) 100vw, 1400px"
              priority
            />
          </FadeIn>

          <Rule className="my-24" />

          <div className="space-y-24">
            <NarrativeBlock number="01" label="Contexto">
              <p className="max-w-prose text-lg leading-relaxed text-foreground">
                {item.challenge}
              </p>
            </NarrativeBlock>

            <NarrativeBlock number="02" label="Intervención">
              <div className="max-w-prose space-y-10">
                <p className="text-lg leading-relaxed text-foreground">
                  {item.solution}
                </p>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Alcance del trabajo
                  </p>
                  <ul className="mt-6">
                    {item.services.map((service) => (
                      <li
                        key={service}
                        className="border-t border-border py-3 text-sm text-muted-foreground last:border-b"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </NarrativeBlock>

            <NarrativeBlock number="03" label="Resultado">
              <div className="max-w-prose space-y-10">
                <p className="text-lg leading-relaxed text-foreground">
                  {item.description}
                </p>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  {item.website && (
                    <a
                      href={
                        item.website.startsWith("http")
                          ? item.website
                          : `https://${item.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-[0.25em] text-primary"
                    >
                      <span className="border-b border-primary/40 pb-1 transition-colors duration-300 hover:border-primary">
                        Visitar el sitio
                      </span>
                    </a>
                  )}
                  <QuoteDialog itemTitle={item.title} />
                </div>
              </div>
            </NarrativeBlock>
          </div>
        </div>
      </section>

      {similarProjects.length > 0 && (
        <section className="border-t border-border bg-muted py-24 md:py-32">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
            <FadeIn>
              <SectionHeading
                eyebrow="Casos relacionados"
                title="Trabajo en la misma disciplina"
                titleClassName="md:text-display-xs lg:text-display-xs"
              />
            </FadeIn>
            <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-3">
              {similarProjects.map((project, index) => (
                <FadeIn key={project.id} delay={index * 0.1}>
                  <Link href={`/portafolio/${project.id}`} className="group block">
                    <EditorialImage
                      src={project.image?.imageUrl ?? "/images/placeholder.png"}
                      alt={project.title}
                      ratio="4:5"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      imgClassName="transition-[filter] duration-500 group-hover:saturate-100"
                    />
                    <div className="mt-6 space-y-3">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {project.client}
                        <span aria-hidden="true" className="mx-2 text-stone">
                          —
                        </span>
                        {project.category}
                      </p>
                      <h3 className="font-display text-xl leading-snug text-foreground">
                        {project.title}
                      </h3>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
