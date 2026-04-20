"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Link as LinkIcon, Send, ShoppingCart, Briefcase, Building, Film, HeartHandshake, Utensils, Construction, Car, Flower, Hospital, Newspaper, Camera } from "lucide-react";
import Link from "next/link";
import AnimatedDiv from "@/components/animated-div";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { portfolioItems, portfolioCategories, portfolioSectors } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
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
    "Otros": <Briefcase className="w-4 h-4" />,
    "Automotriz": <Car className="w-4 h-4" />,
    "Software": <Bot className="w-4 h-4" />,
    "Influencers": <Camera className="w-4 h-4" />,
};

function Bot(props: any) { return <span {...props} /> } // placeholder fallback

function WebsitePortfolioContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || "Todos";
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory);
  const [sectorFilter, setSectorFilter] = useState<string>("Todos");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setCategoryFilter(cat);
    }
  }, [searchParams]);

  const filteredItems = portfolioItems.filter(item => {
    const categoryMatch = categoryFilter === "Todos" || item.category === categoryFilter;
    const sectorMatch = sectorFilter === "Todos" || item.sector === sectorFilter;
    return categoryMatch && sectorMatch;
  });

  const displayedItems = filteredItems.slice(0, visibleCount);

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border scroll-m-28" id="casos">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-5xl font-bold mb-4">Casos de Éxito en Sitios Web</h2>
            <p className="text-lg text-foreground/80">
              Explora una selección de nuestros proyectos de diseño y desarrollo web.
            </p>
        </div>

        <AnimatedDiv>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-4xl mx-auto">
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
                            {sectorIcons[sector] || <Briefcase className="w-4 h-4" />}
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
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {displayedItems.map(item => (
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
                            {categoryIcons[item.category] || null}
                            <span>{item.category}</span>
                        </div>
                    </Badge>
                    <h3 className="font-headline font-semibold text-md flex-grow flex items-center gap-2">
                        {sectorIcons[item.sector] || <Briefcase className="w-4 h-4" />}
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
        
        {visibleCount < filteredItems.length && (
            <AnimatedDiv className="text-center mt-12">
                <button 
                  onClick={() => setVisibleCount(v => v + 6)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 bg-background text-foreground hover:bg-muted border border-border h-11 rounded-md px-8"
                >
                  Ver más
                </button>
            </AnimatedDiv>
        )}
        
        {filteredItems.length === 0 && (
            <AnimatedDiv className="text-center py-16">
                <p className="text-lg text-foreground/80">No se encontraron proyectos con los filtros seleccionados.</p>
            </AnimatedDiv>
        )}
      </div>
    </section>
  );
}

export default function WebsitePortfolioSection() {
    return (
        <Suspense fallback={<div className="py-20 text-center">Cargando portafolio...</div>}>
            <WebsitePortfolioContent />
        </Suspense>
    )
}
