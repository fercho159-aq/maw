"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Briefcase, Building, Film, HeartHandshake, Utensils, Construction, Car, Flower, Hospital, Newspaper, Camera } from "lucide-react";
import AnimatedDiv from "@/components/animated-div";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { contentPortfolioItems } from "@/lib/portfolio-data";
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

const sectorIcons: { [key: string]: React.ReactNode } = {
    "Servicios Profesionales": <Briefcase className="w-4 h-4" />,
    "Inmobiliaria": <Building className="w-4 h-4" />,
    "Eventos": <Film className="w-4 h-4" />,
    "Actividades Recreativas": <HeartHandshake className="w-4 h-4" />,
    "Restaurantes": <Utensils className="w-4 h-4" />,
    "Industrial": <Construction className="w-4 h-4" />,
    "Florería": <Flower className="w-4 h-4" />,
    "Salud": <Hospital className="w-4 h-4" />,
    "Noticias": <Newspaper className="w-4 h-4" />,
    "Otros": <Briefcase className="w-4 h-4" />,
    "Automotriz": <Car className="w-4 h-4" />,
    "Influencers": <Camera className="w-4 h-4" />,
};

export default function ContentPortfolioSection() {
  const [contentSectorFilter, setContentSectorFilter] = useState<string>("Todos");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const allContentSectors = Array.from(new Set(contentPortfolioItems.map(item => item.sector)));

  const filteredContentItems = contentPortfolioItems.filter(item => {
    const sectorMatch = contentSectorFilter === "Todos" || item.sector === contentSectorFilter;
    return sectorMatch;
  });

  const displayedContentItems = filteredContentItems.slice(0, visibleCount);

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border scroll-m-28" id="casos">
        <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto text-center mb-12">
                <h2 className="font-headline text-3xl sm:text-5xl font-bold mb-4">Casos de Éxito en Redes Sociales</h2>
                <p className="text-lg text-foreground/80">
                Explora el contenido que hemos creado para nuestros clientes, impulsando su presencia y autoridad digital.
                </p>
            </div>

            <AnimatedDiv>
                <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-xl mx-auto">
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
                {displayedContentItems.map(item => (
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

            {visibleCount < filteredContentItems.length && (
                <AnimatedDiv className="text-center mt-12">
                    <button 
                    onClick={() => setVisibleCount(v => v + 6)}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 bg-background text-foreground hover:bg-muted border border-border h-11 rounded-md px-8"
                    >
                    Ver más
                    </button>
                </AnimatedDiv>
            )}
            {filteredContentItems.length === 0 && (
                <AnimatedDiv className="text-center py-16">
                    <p className="text-lg text-foreground/80">No se encontraron proyectos con los filtros seleccionados.</p>
                </AnimatedDiv>
            )}
        </div>
    </section>
  );
}
