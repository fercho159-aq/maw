
"use client";

import { portfolioItems, type PortfolioItemType } from "@/lib/portfolio-data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ExternalLink, ArrowRight, Frown } from "lucide-react";
import Link from "next/link";
import WhatsappIcon from "@/components/icons/whatsapp-icon";
import AnimatedDiv from "@/components/animated-div";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/back-button";
import { addLead } from '@/app/leads/_actions';

interface QuoteFormData {
  name: string;
  company: string;
  phone: string;
  hasWebsite: "Sí" | "No" | "";
  currentWebsite: string;
}

const QuoteDialog = ({ itemTitle }: { itemTitle: string }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    company: '',
    phone: '',
    hasWebsite: '',
    currentWebsite: ''
  });

  const handleSendToWhatsapp = () => {
    let message = `
*¡Hola! Quiero cotizar un sitio como '${itemTitle}'.*

*Nombre:* ${formData.name}
*Empresa:* ${formData.company}
*Celular:* ${formData.phone}
*¿Tiene sitio web actual?:* ${formData.hasWebsite}
    `.trim();

    if (formData.hasWebsite === 'Sí') {
      message += `\n*Sitio web actual:* ${formData.currentWebsite}`;
    }

    addLead({
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        source: 'Quote Form - Portafolio',
        notas: `Interesado en un sitio como: ${itemTitle}. Sitio actual: ${formData.hasWebsite === 'Sí' ? formData.currentWebsite : 'No'}.`,
        data: formData
    });

    const whatsappUrl = `https://wa.me/5633774723?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="whatsapp">
          <WhatsappIcon className="w-5 h-5 mr-2" />
          Cotizar un sitio como este
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Cotizar un Sitio Similar a {itemTitle}</DialogTitle>
          <DialogDescription>
            Completa el formulario para que uno de nuestros expertos te contacte a la brevedad.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nombre</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">Empresa</Label>
            <Input id="company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">Celular</Label>
            <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">¿Sitio web actual?</Label>
            <RadioGroup
              value={formData.hasWebsite}
              onValueChange={(value) => setFormData({ ...formData, hasWebsite: value as "Sí" | "No" })}
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
            {formData.hasWebsite === 'Sí' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor="currentWebsite" className="text-right">URL</Label>
                <Input
                  id="currentWebsite"
                  value={formData.currentWebsite}
                  onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                  placeholder="www.misitio.com"
                  className="col-span-3"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Button onClick={handleSendToWhatsapp} type="submit" size="lg" className="w-full">
          <WhatsappIcon className="w-5 h-5 mr-2" />
          Enviar por WhatsApp
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default function PortfolioItemPageContent({ item }: { item: PortfolioItemType }) {

  const similarProjects = portfolioItems
    .filter(p => p.id !== item.id && p.category === item.category)
    .slice(0, 4);

  return (
    <div className="bg-background">
      <section className="relative py-24 sm:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-6 md:sticky top-28">
              <div className="relative aspect-video rounded-lg shadow-2xl overflow-hidden mb-8">
                <Image
                  src={item.image?.imageUrl ?? '/images/placeholder.png'}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <BackButton />
            </div>
            
            <div className="md:col-span-6">
                <Badge variant="secondary" className="mb-4">{item.category}</Badge>
                <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-4">
                  {item.title}
                </h1>
                <p className="text-lg text-foreground/80">
                  {item.description}
                </p>

                <div className="my-8">
                  <h3 className="font-headline text-xl font-bold mb-4">El Reto</h3>
                  <p className="text-foreground/80">{item.challenge}</p>
                </div>

                <div className="my-8">
                  <h3 className="font-headline text-xl font-bold mb-4">Nuestra Solución</h3>
                  <p className="text-foreground/80">{item.solution}</p>
                </div>
                
                <div className="my-8">
                  <h3 className="font-headline text-xl font-bold mb-4">Servicios Incluidos</h3>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {item.services.map(service => (
                      <li key={service} className="flex items-center gap-2 text-foreground/80">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 my-8">
                  {item.website && (
                      <Button asChild>
                          <a href={item.website} target="_blank" rel="noopener noreferrer">
                              Visitar Sitio Web <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                      </Button>
                  )}
                  <QuoteDialog itemTitle={item.title} />
                </div>
              </div>
          </div>
        </div>
      </section>

      {similarProjects.length > 0 && (
        <section className="py-20 md:py-28 border-t bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedDiv className="text-center mb-16">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold">Más proyectos similares</h2>
            </AnimatedDiv>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {similarProjects.map((project) => (
                  <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                       <Card className="overflow-hidden group flex flex-col h-full bg-card/50 hover:bg-card border-border/50 hover:border-border transition-all duration-300 ease-in-out transform hover:-translate-y-2 shadow-sm hover:shadow-2xl">
                          <Link href={`/portafolio/${project.id}`} className="flex flex-col flex-grow">
                              <CardContent className="p-0">
                              <div className="relative aspect-video">
                                  {project.image && (
                                  <Image
                                      src={project.image.imageUrl}
                                      alt={project.title}
                                      fill
                                      sizes="(max-width: 640px) 100vw, 50vw"
                                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                  )}
                              </div>
                              </CardContent>
                              <CardFooter className="p-4 flex flex-col items-start flex-grow">
                              <Badge variant="secondary" className="mb-2">{project.category}</Badge>
                              <h3 className="font-headline font-semibold text-lg flex-grow">{project.title}</h3>
                              <div className="flex items-center text-sm text-primary mt-4 self-start">
                                  Ver Proyecto <ArrowRight className="w-4 h-4 ml-2" />
                              </div>
                              </CardFooter>
                          </Link>
                        </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>
      )}
    </div>
  );
}
