

"use client";

import { useState, useRef } from 'react';
import { courseData } from '@/lib/google-ads-course-data';
import type { Topic, Question } from '@/lib/course-data';
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, PlayCircle, Eye, Search, BarChart, Youtube, LineChart, Wrench, Calendar, ChevronRight, X, AlertTriangle, Frown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsappIcon from '@/components/icons/whatsapp-icon';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedProgress from '@/components/animated-progress';

const sectionIcons: Record<number, React.ReactNode> = {
  1: <Eye className="w-5 h-5 mr-3 text-primary" />,
  2: <Search className="w-5 h-5 mr-3 text-primary" />,
  3: <BarChart className="w-5 h-5 mr-3 text-primary" />,
  4: <LineChart className="w-5 h-5 mr-3 text-primary" />,
  5: <Wrench className="w-5 h-5 mr-3 text-primary" />,
};

interface LeadFormData {
    name: string;
    phone: string;
    company: string;
    reason: string;
}

const LeadCaptureDialog = ({ trigger, onWhatsappSubmit }: { trigger: React.ReactNode, onWhatsappSubmit: (data: LeadFormData) => void }) => {
    const [formData, setFormData] = useState<LeadFormData>({
        name: '',
        phone: '',
        company: '',
        reason: 'Quiero contratar sus servicios de implementación en mi empresa',
    });

    const handleSendToWhatsapp = () => {
        onWhatsappSubmit(formData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Agenda una Sesión</DialogTitle>
                    <DialogDescription>
                        Completa el formulario y un experto se pondrá en contacto contigo a la brevedad.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nombre
                        </Label>
                        <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Celular
                        </Label>
                        <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="company" className="text-right">
                            Empresa
                        </Label>
                        <Input id="company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Motivo</Label>
                        <RadioGroup value={formData.reason} onValueChange={(value) => setFormData({...formData, reason: value})} className="col-span-3 space-y-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Quiero aprender tomando clases" id="r1" />
                                <Label htmlFor="r1" className="font-normal">Quiero aprender tomando clases</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Quiero contratar sus servicios de implementación en mi empresa" id="r2" />
                                <Label htmlFor="r2" className="font-normal">Quiero contratar sus servicios para mi empresa</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Quiero saber más sobre su empresa" id="r3" />
                                <Label htmlFor="r3" className="font-normal">Quiero saber más sobre su empresa</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <Button onClick={handleSendToWhatsapp} type="submit" size="lg" className="w-full">
                    <WhatsappIcon className="w-5 h-5 mr-2" />
                    Enviar por WhatsApp
                </Button>
            </DialogContent>
        </Dialog>
    );
};

const QuizComponent = ({ topic, onComplete }: { topic: Topic; onComplete: (score: number, incorrect: Question[]) => void; }) => {
    const [answers, setAnswers] = useState<{[key: number]: number}>({});
    
    const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
        setAnswers(prev => ({...prev, [questionIndex]: optionIndex}));
    };

    const handleSubmit = () => {
        let score = 0;
        const incorrect: Question[] = [];
        topic.questions.forEach((q, index) => {
            if (answers[index] === q.correct) {
                score++;
            } else {
                incorrect.push(q);
            }
        });
        onComplete(score, incorrect);
    };

    return (
        <div className="prose prose-lg max-w-none text-foreground/80 prose-headings:font-headline prose-headings:text-foreground prose-strong:text-foreground">
            <h3 className="font-bold">Examen Final de Sección</h3>
            <p>Es hora de poner a prueba tus conocimientos. Responde las siguientes preguntas.</p>
            <div className="space-y-8 mt-8">
                {topic.questions.map((q, qIndex) => (
                    <div key={qIndex} className="p-4 border rounded-lg">
                        <p className="font-semibold">${qIndex + 1}. ${q.question}</p>
                        <RadioGroup onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))}>
                            <div className="space-y-2 mt-4">
                                {q.options.map((option, oIndex) => (
                                    <div key={oIndex} className="flex items-center">
                                        <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}o${oIndex}`} />
                                        <Label htmlFor={`q${qIndex}o${oIndex}`} className="ml-2 font-normal">{option}</Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>
                ))}
            </div>
             <Button onClick={handleSubmit} size="lg" className="mt-8" disabled={Object.keys(answers).length !== topic.questions.length}>
                Verificar Respuestas
            </Button>
        </div>
    );
};

const QuizResult = ({ result, incorrectAnswers, score, total }: { result: 'win' | 'lose', incorrectAnswers: Question[], score: number, total: number }) => {
    return (
        <div className="text-center py-10">
            {result === 'win' ? (
                <>
                    <h2 className="text-5xl font-bold text-green-500">YOU WIN</h2>
                    <p className="text-lg mt-4">¡Felicidades! Aprobaste la sección.</p>
                    <p className="font-bold text-2xl text-green-500">${score} / ${total}</p>
                </>
            ) : (
                <>
                    <h2 className="text-5xl font-bold text-destructive flex items-center justify-center gap-4">GAME OVER <Frown /></h2>
                    <p className="text-lg mt-4">¡No te rindas! Repasa los temas y vuelve a intentarlo.</p>
                    <p className="font-bold text-2xl text-destructive">${score} / ${total}</p>
                    
                    <div className="mt-8 text-left max-w-2xl mx-auto">
                        <h4 className="font-headline text-xl font-bold mb-4">Repasa estos puntos:</h4>
                        <Card className="bg-card/50">
                            <CardContent className="p-6">
                                <ul className="space-y-4">
                                    {incorrectAnswers.map((q, index) => (
                                        <li key={index} className="border-b pb-4 last:border-b-0">
                                            <p className="font-semibold">{q.question}</p>
                                            <p className="text-sm text-green-400 mt-2">
                                                <strong>Respuesta correcta:</strong> {q.options[q.correct]}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </>
            )}
        </div>
    )
}

interface QuizLeadFormData {
  name: string;
  phone: string;
  company: string;
}

const QuizLeadCaptureDialog = ({ open, onOpenChange, onWhatsappSubmit, score, total }: { open: boolean; onOpenChange: (open: boolean) => void; onWhatsappSubmit: (data: QuizLeadFormData) => void, score: number, total: number }) => {
    const [formData, setFormData] = useState<QuizLeadFormData>({ name: '', phone: '', company: '' });

    const handleSubmit = () => {
        onWhatsappSubmit(formData);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>¡Examen Terminado!</DialogTitle>
                    <DialogDescription>
                        Ingresa tus datos para ver tu calificación y que un experto se ponga en contacto contigo para los siguientes pasos.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quiz-name" className="text-right">Nombre</Label>
                        <Input id="quiz-name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quiz-phone" className="text-right">Celular</Label>
                        <Input id="quiz-phone" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quiz-company" className="text-right">Empresa</Label>
                        <Input id="quiz-company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="col-span-3" />
                    </div>
                </div>
                <Button onClick={handleSubmit} type="submit" size="lg" className="w-full">
                    <WhatsappIcon className="w-5 h-5 mr-2" />
                    Enviar y Ver Mi Calificación
                </Button>
            </DialogContent>
        </Dialog>
    )
}


export default function CoursePage() {
  const [currentTopic, setCurrentTopic] = useState<Topic>(courseData.sections[0].topics[0]);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const progress = (completedTopics.length / courseData.total_topics) * 100;
  
  const [quizScore, setQuizScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<Question[]>([]);
  const [quizResult, setQuizResult] = useState<'win' | 'lose' | null>(null);
  const [isQuizLeadModalOpen, setIsQuizLeadModalOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);


  const handleTopicClick = (topic: Topic) => {
    setCurrentTopic(topic);
    setQuizResult(null); 
    setIncorrectAnswers([]);
  };

  const handleCompleteTopic = () => {
    if (!completedTopics.includes(currentTopic.topic_id)) {
      setCompletedTopics([...completedTopics, currentTopic.topic_id]);
    }
  };

  const handleQuizComplete = (score: number, incorrect: Question[]) => {
      setQuizScore(score);
      setIncorrectAnswers(incorrect);
      setIsQuizLeadModalOpen(true);
  };
  
  const handleQuizLeadSubmit = (data: QuizLeadFormData) => {
      const message = `
*¡Hola! He completado un examen del curso de Google Ads.*

*Nombre:* ${data.name}
*Celular:* ${data.phone}
*Empresa:* ${data.company}
*Resultado:* ${quizScore} / ${currentTopic.questions.length} respuestas correctas.
      `.trim().replace(/\n\s*\n/g, '\n');
      
      const whatsappUrl = `https://wa.me/525541314150?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      const newLeads = JSON.parse(localStorage.getItem('newLeads') || '[]');
      const newLead = {
        cliente: data.company || 'Lead de Curso',
        origen: 'Sitio Web',
        telefono: data.phone,
        email: '',
      };
      newLeads.push(newLead);
      localStorage.setItem('newLeads', JSON.stringify(newLeads));

      setIsQuizLeadModalOpen(false);

      if (quizScore >= 3) {
          setQuizResult('win');
          handleCompleteTopic();
      } else {
          setQuizResult('lose');
      }

      setTimeout(() => {
        mainContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
  };


  const handleLeadFormSubmit = (formData: LeadFormData) => {
      const message = `
*¡Hola! Quiero agendar una sesión con un experto.*

*Nombre:* ${formData.name}
*Celular:* ${formData.phone}
*Empresa:* ${formData.company}
*Motivo de contacto:* ${formData.reason}
      `.trim().replace(/\n\s*\n/g, '\n');
      
      const whatsappUrl = `https://wa.me/525541314150?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
  };

  const isQuiz = currentTopic.questions && currentTopic.questions.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <div className="flex-grow">
            <header className="bg-card shadow-md sticky top-20 z-40">
                <div className="container mx-auto px-4 md:px-6 py-4">
                    <h1 className="text-xl md:text-2xl font-bold font-headline">{courseData.title}</h1>
                    <div className="flex items-center gap-4 mt-2">
                        <AnimatedProgress value={progress} />
                        <span className="text-sm font-semibold whitespace-nowrap">{Math.round(progress)}% Completado</span>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-1/3 lg:w-1/4">
                        <div className="sticky top-40">
                             <Accordion type="single" collapsible defaultValue={`section-${currentTopic.section_id}`} className="w-full">
                                {courseData.sections.map((section) => (
                                    <AccordionItem value={`section-${section.section_id}`} key={section.section_id}>
                                        <AccordionTrigger className="font-headline text-lg hover:no-underline">
                                           <div className="flex items-center">
                                                {sectionIcons[section.section_id as keyof typeof sectionIcons] || <Eye className="w-5 h-5 mr-3 text-primary" />}
                                                <span>{section.title}</span>
                                           </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col gap-1 pl-4 border-l-2 border-primary/20">
                                                {section.topics.map((topic) => {
                                                    const isCompleted = completedTopics.includes(topic.topic_id);
                                                    const isCurrent = currentTopic.topic_id === topic.topic_id;
                                                    return (
                                                        <button
                                                            key={topic.topic_id}
                                                            onClick={() => handleTopicClick(topic)}
                                                            className={cn(
                                                                "flex items-center gap-3 text-left p-2 rounded-md transition-colors text-sm",
                                                                isCurrent ? "bg-primary/20 text-primary-foreground font-semibold" : "hover:bg-accent",
                                                                isCompleted ? "text-muted-foreground line-through" : "text-foreground/80"
                                                            )}
                                                        >
                                                            {isCompleted ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> : <Circle className="w-4 h-4 flex-shrink-0" />}
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

                    <main ref={mainContentRef} className="w-full md:w-2/3 lg:w-3/4 scroll-mt-24">
                        <div className="bg-card p-6 rounded-lg shadow-lg">
                             <h2 className="font-headline text-2xl sm:text-3xl font-bold mb-4">{currentTopic.title}</h2>
                            
                             {isQuiz ? (
                                <>
                                    {quizResult ? (
                                        <QuizResult result={quizResult} incorrectAnswers={incorrectAnswers} score={quizScore} total={currentTopic.questions.length} />
                                    ) : (
                                        <QuizComponent topic={currentTopic} onComplete={handleQuizComplete} />
                                    )}
                                </>
                             ) : (
                                <>
                                    <div className="relative aspect-[9/16] max-w-sm mx-auto w-full rounded-lg overflow-hidden shadow-xl mb-6">
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full"
                                            src="https://www.youtube.com/embed/fnuCiuhV0WA"
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>

                                    <div className="prose prose-lg max-w-none text-foreground/80 prose-headings:font-headline prose-headings:text-foreground prose-strong:text-foreground mb-8">
                                        <h3 className="font-bold">Habilidades que ganarás:</h3>
                                        <ul className="list-disc list-inside space-y-2">
                                            {currentTopic.summary.map((point, index) => (
                                                <li key={index} dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                            ))}
                                        </ul>
                                    </div>
                                    
                                     <div className="flex flex-col sm:flex-row gap-4">
                                        <Button onClick={handleCompleteTopic} disabled={completedTopics.includes(currentTopic.topic_id)} size="lg">
                                            {completedTopics.includes(currentTopic.topic_id) ? 'Lección Completada' : 'Marcar como Completada'}
                                        </Button>
                                        <LeadCaptureDialog 
                                            trigger={
                                                <Button variant="outline" size="lg">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    Quiero Agendar una Sesión
                                                </Button>
                                            }
                                            onWhatsappSubmit={handleLeadFormSubmit}
                                        />
                                    </div>
                                </>
                             )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
        <Footer />
         <QuizLeadCaptureDialog 
            open={isQuizLeadModalOpen}
            onOpenChange={setIsQuizLeadModalOpen}
            onWhatsappSubmit={handleQuizLeadSubmit}
            score={quizScore}
            total={currentTopic.questions.length}
        />
    </div>
  );
}
