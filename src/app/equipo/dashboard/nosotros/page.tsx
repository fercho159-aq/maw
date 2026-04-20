"use client";

import { useState, useMemo, useEffect } from 'react';
import { nosotrosCourseData, type Topic } from '@/lib/nosotros-data';
import { CodeXml, PenSquare, Megaphone, Bot, Users, Briefcase, Crown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { teamMembers } from '@/lib/team-data';
import type { TeamMember, PendienteMaw } from '@/lib/db/schema';
import AnimatedDiv from '@/components/animated-div';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { getPendientes } from '../pendientes/_actions';


const sectionIcons: Record<number, React.ReactNode> = {
  1: <CodeXml className="w-5 h-5 mr-3 text-primary" />,
  2: <PenSquare className="w-5 h-5 mr-3 text-primary" />,
  3: <Megaphone className="w-5 h-5 mr-3 text-primary" />,
};

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <div className="flex flex-col items-center text-center">
         <Avatar className="w-20 h-20 border-4" style={{ borderColor: member.color || 'hsl(var(--border))' }}>
            <AvatarImage src={member.avatarUrl} alt={member.name} />
            <AvatarFallback style={{ backgroundColor: member.color || 'hsl(var(--primary))', color: 'white' }} className="text-xl font-bold">
                {member.name.charAt(0)}
            </AvatarFallback>
        </Avatar>
        <p className="mt-2 font-bold">{member.name}</p>
        <p className="text-sm text-muted-foreground capitalize">{member.role}</p>
    </div>
);


export default function NosotrosPage() {
  const [currentTopic, setCurrentTopic] = useState<Topic>(nosotrosCourseData.sections[0].topics[0]);
  const [pendientes, setPendientes] = useState<PendienteMaw[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        const data = await getPendientes();
        setPendientes(data);
        setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleTopicClick = (topic: Topic) => {
    setCurrentTopic(topic);
  };
  
  const { leadership, salesTeam, productionTeams } = useMemo(() => {
    const leadership = teamMembers.filter(m => ['admin', 'julio', 'fernando'].includes(m.role));
    const salesTeam = teamMembers.filter(m => ['alma'].includes(m.role));

    const productionTeamStructure: Record<string, TeamMember[]> = {};

    const encargados = teamMembers.filter(m => m.role === 'encargado');

    for (const p of pendientes) {
      const encargado = encargados.find(e => e.name === p.encargado);
      if (encargado) {
        if (!productionTeamStructure[encargado.name]) {
          productionTeamStructure[encargado.name] = [];
        }
        const ejecutor = teamMembers.find(e => e.name === p.ejecutor);
        if (ejecutor && !productionTeamStructure[encargado.name].some(e => e.id === ejecutor.id) && ejecutor.id !== encargado.id) {
          productionTeamStructure[encargado.name].push(ejecutor);
        }
      }
    }
    
    const productionTeams = Object.entries(productionTeamStructure).map(([encargadoName, ejecutores]) => ({
      encargado: teamMembers.find(m => m.name === encargadoName)!,
      ejecutores,
    }));
    
    return { leadership, salesTeam, productionTeams };
  }, [pendientes]);

  return (
    <div className="flex flex-col">
        <header className="bg-card shadow-md sticky top-0 z-10 mb-8">
            <div className="container mx-auto px-4 md:px-0 py-4">
                <h1 className="text-xl md:text-2xl font-bold font-headline">{nosotrosCourseData.title}</h1>
            </div>
        </header>

        <div className="container mx-auto px-4 md:px-0">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/3 lg:w-1/4">
                    <div className="sticky top-28">
                         <Accordion type="single" collapsible defaultValue={`section-${currentTopic.section_id}`} className="w-full">
                            {nosotrosCourseData.sections.map((section) => (
                                <AccordionItem value={`section-${section.section_id}`} key={section.section_id}>
                                    <AccordionTrigger className="font-headline text-lg hover:no-underline">
                                       <div className="flex items-center">
                                            {sectionIcons[section.section_id as keyof typeof sectionIcons] || <CodeXml className="w-5 h-5 mr-3 text-primary" />}
                                            <span>{section.title}</span>
                                       </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-4">
                                        <div className="flex flex-col gap-1">
                                            {section.topics.map((topic) => {
                                                const isCurrent = currentTopic.topic_id === topic.topic_id;
                                                return (
                                                    <button
                                                        key={topic.topic_id}
                                                        onClick={() => handleTopicClick(topic)}
                                                        className={cn(
                                                            "flex items-center gap-3 text-left p-2 rounded-md transition-colors text-sm",
                                                            isCurrent ? "bg-primary/20 text-primary-foreground font-semibold" : "hover:bg-accent",
                                                            "text-foreground/80"
                                                        )}
                                                    >
                                                        <div className={cn("w-2 h-2 rounded-full", isCurrent ? 'bg-primary' : 'bg-muted-foreground')}></div>
                                                        <span className="flex-1">{topic.title}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </aside>

                <main className="w-full md:w-2/3 lg:w-3/4">
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="font-headline text-2xl sm:text-3xl font-bold mb-4">{currentTopic.title}</h2>
                        <div 
                            className="prose prose-lg max-w-none text-foreground/80 prose-headings:font-headline prose-headings:text-foreground prose-strong:text-foreground mb-8"
                            dangerouslySetInnerHTML={{ __html: currentTopic.content }}
                        />
                      </CardContent>
                    </Card>
                </main>
            </div>

            <section className="mt-16 pt-8 border-t">
                <h2 className="text-2xl font-bold font-headline mb-12 text-center">Organigrama del Equipo</h2>
                 {isLoading ? (
                     <div className="text-center py-10">Cargando organigrama...</div>
                 ) : (
                    <div className="space-y-16">
                        <AnimatedDiv className="text-center">
                            <h3 className="text-xl font-bold font-headline mb-6 flex items-center justify-center gap-2 text-amber-500">
                                <Crown className="w-6 h-6" /> Liderazgo
                            </h3>
                            <div className="flex justify-center flex-wrap gap-8">
                                {leadership.map(member => <TeamMemberCard key={member.id} member={member} />)}
                            </div>
                        </AnimatedDiv>
                        
                        <AnimatedDiv className="text-center">
                            <h3 className="text-xl font-bold font-headline mb-6 flex items-center justify-center gap-2 text-blue-500">
                                <Briefcase className="w-6 h-6" /> Equipo de Ventas
                            </h3>
                            <div className="flex justify-center flex-wrap gap-8">
                                {salesTeam.map(member => <TeamMemberCard key={member.id} member={member} />)}
                            </div>
                        </AnimatedDiv>

                        <AnimatedDiv>
                             <h3 className="text-xl font-bold font-headline mb-10 flex items-center justify-center gap-2 text-green-500">
                                <Users className="w-6 h-6" /> Equipos de Producción
                            </h3>
                            <div className="flex flex-col items-center space-y-12">
                                {productionTeams.map(({ encargado, ejecutores }) => (
                                    <div key={encargado.id} className="flex flex-col items-center w-full">
                                        {/* Encargado */}
                                        <div className="relative">
                                            <TeamMemberCard member={encargado} />
                                        </div>
                                        
                                        {/* Líneas de conexión */}
                                        {ejecutores.length > 0 && (
                                            <>
                                                {/* Línea vertical hacia abajo */}
                                                <div className="w-px h-12 bg-border"></div>
                                                
                                                {/* Línea horizontal */}
                                                <div className="w-full max-w-4xl h-px bg-border"></div>

                                                {/* Contenedor para ejecutores y sus líneas */}
                                                <div className="flex justify-center w-full max-w-4xl pt-12 relative">
                                                    {ejecutores.map((ejecutor, index) => (
                                                        <div key={ejecutor.id} className="relative flex flex-col items-center px-4">
                                                             {/* Línea vertical hacia arriba */}
                                                            <div className="absolute top-0 left-1/2 w-px h-12 bg-border -translate-y-full"></div>
                                                            <TeamMemberCard member={ejecutor} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </AnimatedDiv>
                    </div>
                 )}
            </section>
        </div>
    </div>
  );
}
