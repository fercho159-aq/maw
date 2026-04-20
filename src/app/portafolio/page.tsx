

"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { portfolioItems, portfolioCategories, portfolioSectors, contentPortfolioItems } from "@/lib/portfolio-data";
import { ArrowRight, Link as LinkIcon, Send, ShoppingCart, Briefcase, Building, Film, HeartHandshake, Utensils, Construction, Car, Flower, Hospital, Newspaper, Bot, Camera } from "lucide-react";
import AnimatedDiv from "@/components/animated-div";
import React, { useState, Suspense } from "react";
import TypewriterTitle from "@/components/typewriter-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from 'next/navigation';


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const categoryIcons: { [key: string]: React.ReactNode } = {
  "E-commerce": <ShoppingCart className="w-4 h-4" />,
  "Connective": <LinkIcon className="w-4 h-4" />,
  "Landing": <Send className="w-4 h-4" />,
  "Catálogo": <Briefcase className="w-4 h-4" />,
  "Servicios": <HeartHandshake className="w-4 h-4" />,
};

const sectorIcons: { [key: string]: React.ReactNode } = {
    "Servicios Profesionales": <Briefcase className="w-4 h-4" />,
    "Inmobiliaria": <Building className="w-4 h-4" />,
    "Eventos": <Film className="w-4 h-4" />,
    "Actividades Recreativas": <HeartHandshake className="w-4 h-4" />,
    "Restaurantes": <Utensils className="w-4 h-4" />,
    "Industrial": <Construction className="w-4 h-4" />,
    "Ropa y Moda": <ShoppingCart className="w-4 h-4" />,
    "Florería": <Flower className="w-4 h-4" />,
    "Salud": <Hospital className="w-4 h-4" />,
    "Noticias": <Newspaper className="w-4 h-4" />,
    "Catálogo": <LinkIcon className="w-4 h-4" />,
    "Otros": <Briefcase className="w-4 h-4" />,
    "Automotriz": <Car className="w-4 h-4" />,
    "Software": <Bot className="w-4 h-4" />,
    "Influencers": <Camera className="w-4 h-4" />,
};

function PortfolioPageContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'websites';
  const initialCategory = searchParams.get('category') || 'Todos';

  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory);
  const [sectorFilter, setSectorFilter] = useState<string>("Todos");
  const [activeTab, setActiveTab] = useState(defaultTab === 'websites' ? 'Sitios Web' : 'Contenido');
  const [contentSectorFilter, setContentSectorFilter] = useState<string>("Todos");

  const filteredItems = portfolioItems.filter(item => {
    const categoryMatch = categoryFilter === "Todos" || item.category === categoryFilter;
    const sectorMatch = sectorFilter === "Todos" || item.sector === sectorFilter;
    return categoryMatch && sectorMatch;
  });

  const allContentSectors = Array.from(new Set(contentPortfolioItems.map(item => item.sector)));

  const filteredContentItems = contentPortfolioItems.filter(item => {
    const sectorMatch = contentSectorFilter === "Todos" || item.sector === contentSectorFilter;
    return sectorMatch;
  });

  return (
    <>
      <div className="mb-16 text-center">
        <TypewriterTitle key={activeTab} text={activeTab} />
      </div>

      <Tabs defaultValue={defaultTab} className="w-full" onValueChange={(value) => setActiveTab(value === 'websites' ? 'Sitios Web' : 'Contenido')}>
        <AnimatedDiv>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="websites">Sitios Web</TabsTrigger>
              <TabsTrigger value="content">Contenido</TabsTrigger>
            </TabsList>
          </div>
        </AnimatedDiv>
        
        <TabsContent value="websites" id="websites">
          <AnimatedDiv className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
              <div onClick={() => setCategoryFilter('E-commerce')} className="bg-card/50 p-6 rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <ShoppingCart className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-headline text-lg font-semibold mb-2">E-commerce</h3>
                <p className="text-sm text-foreground/70">Plataformas robustas para vender tus productos en línea.</p>
              </div>
              <div onClick={() => setCategoryFilter('Landing')} className="bg-card/50 p-6 rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <Send className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-headline text-lg font-semibold mb-2">Landing Page</h3>
                <p className="text-sm text-foreground/70">Páginas enfocadas en una sola acción para maximizar conversiones.</p>
              </div>
              <div onClick={() => setCategoryFilter('Connective')} className="bg-card/50 p-6 rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <LinkIcon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-headline text-lg font-semibold mb-2">Sitio Conectivo</h3>
                <p className="text-sm text-foreground/70">Sitios web para presentar tu marca, servicios o información.</p>
              </div>
            </div>
          </AnimatedDiv>

          <AnimatedDiv>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground/80 mb-2">Filtrar por Categoría</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    {portfolioCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground/80 mb-2">Filtrar por Sector</label>
                <Select value={sectorFilter} onValueChange={setSectorFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    {portfolioSectors.map(sector => (
                      <SelectItem key={sector} value={sector}>
                        <div className="flex items-center gap-2">
                            {sectorIcons[sector as keyof typeof sectorIcons] || <Briefcase className="w-4 h-4" />}
                            <span>{sector}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AnimatedDiv>

          <AnimatedDiv
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredItems.map(item => (
              <AnimatedDiv key={item.id} variants={itemVariants}>
                <Card className="overflow-hidden group flex flex-col h-full bg-card/50 hover:bg-card border-border/50 hover:border-border transition-all duration-300 ease-in-out transform hover:-translate-y-2 shadow-sm hover:shadow-2xl">
                  <Link href={`/portafolio/${item.id}`} className="flex flex-col flex-grow">
                    <CardContent className="p-0">
                      <div className="relative aspect-video bg-muted">
                        {item.image && (
                          <Image
                            src={item.image.imageUrl}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 flex flex-col items-start flex-grow">
                      <Badge variant="secondary" className="mb-2">
                        <div className="flex items-center gap-1.5">
                            {categoryIcons[item.category as keyof typeof categoryIcons] || null}
                            <span>{item.category}</span>
                        </div>
                      </Badge>
                      <h3 className="font-headline font-semibold text-md flex-grow flex items-center gap-2">
                         {sectorIcons[item.sector as keyof typeof sectorIcons] || <Briefcase className="w-4 h-4" />}
                        <span>{item.title}</span>
                      </h3>
                      <div className="flex items-center text-sm text-primary mt-4 self-start">
                        Ver Proyecto <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardFooter>
                  </Link>
                </Card>
              </AnimatedDiv>
            ))}
          </AnimatedDiv>
          
          {filteredItems.length === 0 && (
            <AnimatedDiv className="text-center py-16">
                <p className="text-lg text-foreground/80">No se encontraron proyectos con los filtros seleccionados.</p>
            </AnimatedDiv>
          )}
        </TabsContent>
        
        <TabsContent value="content" id="content">
             <AnimatedDiv>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Filtrar por Sector</label>
                    <Select value={contentSectorFilter} onValueChange={setContentSectorFilter}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar Sector" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Todos">Todos</SelectItem>
                        {allContentSectors.map(sector => (
                        <SelectItem key={sector} value={sector}>
                           <div className="flex items-center gap-2">
                            {sectorIcons[sector as keyof typeof sectorIcons] || <Briefcase className="w-4 h-4" />}
                            <span>{sector}</span>
                           </div>
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                </div>
            </AnimatedDiv>
          <AnimatedDiv
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredContentItems.map(item => (
                <AnimatedDiv key={item.id} variants={itemVariants}>
                  <Card className="overflow-hidden group flex flex-col h-full bg-card/50 hover:bg-card border-border/50 hover:border-border transition-all duration-300 ease-in-out transform hover:-translate-y-2 shadow-sm hover:shadow-2xl">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex flex-col flex-grow">
                      <CardContent className="p-0">
                        <div className="relative aspect-video bg-muted">
                          {item.image && (
                            <Image
                              src={item.image.imageUrl}
                              alt={item.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              data-ai-hint={item.image.imageHint}
                            />
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 flex flex-col items-start flex-grow">
                        <Badge variant="secondary" className="mb-2">
                          {item.sector}
                        </Badge>
                        <h3 className="font-headline font-semibold text-md flex-grow">
                          {item.title}
                        </h3>
                        <div className="flex items-center text-sm text-primary mt-4 self-start">
                          Ver Contenido <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </CardFooter>
                    </a>
                  </Card>
                </AnimatedDiv>
              ))}
            </AnimatedDiv>
            {filteredContentItems.length === 0 && (
               <AnimatedDiv className="text-center py-16">
                <p className="text-lg text-foreground/80">No se encontraron proyectos con los filtros seleccionados.</p>
              </AnimatedDiv>
            )}
        </TabsContent>
      </Tabs>
    </>
  );
}


const PortfolioPage = () => {
  return (
    <div className="bg-background">
       <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <Suspense fallback={<div>Cargando...</div>}>
            <PortfolioPageContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
