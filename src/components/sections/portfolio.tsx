
"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { portfolioItems } from "@/lib/portfolio-data";
import { ArrowRight } from "lucide-react";
import AnimatedDiv from "../animated-div";
import { Button } from "../ui/button";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

const Portfolio = () => {
    const featuredItems = portfolioItems.slice(0, 3);
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedDiv className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold">Nuestros Clientes</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Explora algunos de nuestros proyectos más exitosos y ve el impacto de nuestro trabajo.
          </p>
        </AnimatedDiv>

        <AnimatedDiv 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
        >
            {featuredItems.map(item => (
                <AnimatedDiv key={item.id} variants={itemVariants}>
                    <Card className="overflow-hidden group flex flex-col h-full bg-card/50 hover:bg-card border-border/50 hover:border-border transition-all duration-300 ease-in-out transform hover:-translate-y-2 shadow-sm hover:shadow-2xl">
                    <Link href={`/portafolio/${item.id}`} className="flex flex-col flex-grow">
                        <CardContent className="p-0">
                        <div className="relative aspect-video">
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
                        <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                        <h3 className="font-headline font-semibold text-lg flex-grow">{item.title}</h3>
                        <div className="flex items-center text-sm text-primary mt-4 self-start">
                            Ver Proyecto <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                        </CardFooter>
                    </Link>
                    </Card>
                </AnimatedDiv>
                ))}
        </AnimatedDiv>
        <AnimatedDiv className="text-center mt-16">
            <Button asChild size="lg">
                <Link href="/portafolio">
                    Ver todos los proyectos
                    <ArrowRight className="w-4 h-4 ml-2"/>
                </Link>
            </Button>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default Portfolio;
