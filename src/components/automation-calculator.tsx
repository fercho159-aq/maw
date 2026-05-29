
"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, Bot, Calendar, ChevronRight, Clock, Mail, MessageCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsappIcon from './icons/whatsapp-icon';
import { addLead } from '@/app/leads/_actions';

const girosNegocio = [
  "Restaurante", "Servicios Profesionales", "Retail/Ropa", "Salud/Medicina", 
  "Bienes Raíces", "Educación", "Entretenimiento", "Turismo", "Automotriz", 
  "Tecnología", "Otro"
];

const automationGoals = [
    { id: 'chatbot', label: 'Chatbots para Ventas y Soporte', icon: <MessageCircle /> },
    { id: 'agendamiento', label: 'Agendamiento Inteligente de Citas', icon: <Calendar /> },
    { id: 'email', label: 'Campañas de Email y SMS Marketing', icon: <Mail /> },
    { id: 'procesos', label: 'Optimización de Procesos Internos', icon: <Zap /> },
];

const steps = [
  { id: 1, title: 'Tu Negocio', description: 'Cuéntanos sobre tu empresa.' },
  { id: 2, title: 'Diagnóstico Actual', description: 'Ayúdanos a entender tu operación diaria.' },
  { id: 3, title: 'Tus Objetivos', description: '¿Qué te gustaría automatizar?' },
  { id: 4, title: 'Resultados Potenciales', description: 'Descubre el tiempo que podrías ahorrar.' }
];

const AutomationCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    personName: '',
    giro: '',
    dailyMessages: 50,
    repetitiveHours: 4,
    goals: ['chatbot']
  });
  const [error, setError] = useState('');

  const estimatedHoursSaved = useMemo(() => {
    const hoursFromMessages = (formData.dailyMessages * 1 * 30) / 60; // 1 min/msg
    const hoursFromTasks = (formData.repetitiveHours * 0.5 * 30);
    let goalsMultiplier = 1 + (formData.goals.length * 0.1);
    
    return Math.round((hoursFromMessages + hoursFromTasks) * goalsMultiplier);
  }, [formData]);

  const handleNext = () => {
    if (currentStep === 1 && (!formData.companyName || !formData.personName || !formData.giro)) {
        setError('Por favor, completa todos los campos.');
        return;
    }
     if (currentStep === 3 && formData.goals.length === 0) {
      setError('Debes seleccionar al menos un objetivo.');
      return;
    }
    setError('');
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsResultModalOpen(true);
    }
  };

  const handleBack = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoalChange = (goalId: string) => {
    setError('');
    setFormData(prev => {
      const newGoals = prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId];
      return { ...prev, goals: newGoals };
    });
  }

  const handleSendToWhatsapp = () => {
    const selectedGoalsText = formData.goals.map(goalId => {
        const goal = automationGoals.find(g => g.id === goalId);
        return `- ${goal?.label || goalId}`;
    }).join('\n');

    const message = `
*¡Hola! Quiero mi diagnóstico de automatización!*
\n*Empresa:* ${formData.companyName}
*Nombre:* ${formData.personName}
*Giro:* ${formData.giro}
*Mensajes diarios:* ${formData.dailyMessages}
*Horas en tareas repetitivas:* ${formData.repetitiveHours}
*Objetivos de automatización:*
${selectedGoalsText}
*Ahorro de tiempo estimado:* ${estimatedHoursSaved} horas/mes
\n*Mi número es:* ${whatsappNumber}
    `.trim().replace(/\n\s*\n/g, '\n');
    const whatsappUrl = `https://wa.me/5538359927?text=${encodeURIComponent(message.trim())}`;
    window.open(whatsappUrl, '_blank');
    
    addLead({
        name: formData.personName,
        company: formData.companyName,
        phone: whatsappNumber,
        source: 'Automation Calculator',
        data: formData
    });

    setIsResultModalOpen(false);
    setShowResults(true);
    setCurrentStep(steps.length);
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName">Nombre de tu Empresa</Label>
                  <Input id="companyName" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} placeholder="Ej. Mi Negocio Increíble" />
                </div>
                <div>
                  <Label htmlFor="personName">Tu Nombre</Label>
                  <Input id="personName" value={formData.personName} onChange={(e) => setFormData({...formData, personName: e.target.value})} placeholder="Ej. Juan Pérez" />
                </div>
            </div>
            <div>
              <Label>Giro del Negocio</Label>
              <Select value={formData.giro} onValueChange={(value) => setFormData({ ...formData, giro: value })}>
                <SelectTrigger><SelectValue placeholder="Ej. Restaurante, Servicios, etc." /></SelectTrigger>
                <SelectContent>
                  {girosNegocio.map(giro => <SelectItem key={giro} value={giro}>{giro}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 pt-4">
            <div>
                <div className='flex justify-between items-baseline'>
                  <Label htmlFor="dailyMessages">¿Cuántos mensajes de clientes recibes al día?</Label>
                  <span className="text-2xl font-bold text-primary">{formData.dailyMessages}</span>
                </div>
                <Slider
                    id="dailyMessages"
                    min={0} max={200} step={5}
                    value={[formData.dailyMessages]}
                    onValueChange={(value) => setFormData({ ...formData, dailyMessages: value[0] })}
                />
                <p className="text-sm text-muted-foreground mt-1">En todas las plataformas (WhatsApp, Instagram, Facebook, etc.)</p>
            </div>
             <div>
                <div className='flex justify-between items-baseline'>
                  <Label htmlFor="repetitiveHours">¿Cuántas horas diarias dedicas a tareas repetitivas?</Label>
                  <span className="text-2xl font-bold text-primary">{formData.repetitiveHours} hrs</span>
                </div>
                <Slider
                    id="repetitiveHours"
                    min={0} max={12} step={1}
                    value={[formData.repetitiveHours]}
                    onValueChange={(value) => setFormData({ ...formData, repetitiveHours: value[0] })}
                />
                 <p className="text-sm text-muted-foreground mt-1">Ej: agendar citas, responder preguntas frecuentes, enviar recordatorios.</p>
            </div>
          </div>
        );
      case 3:
        return (
            <div className="space-y-4">
                <Label>¿Qué áreas te gustaría automatizar?</Label>
                <p className="text-sm text-muted-foreground">Selecciona una o más opciones para ver tu potencial de ahorro.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {automationGoals.map(goal => (
                        <div key={goal.id} className="relative">
                            <Checkbox 
                                id={goal.id} 
                                className="peer absolute top-4 left-4 z-10"
                                checked={formData.goals.includes(goal.id)} 
                                onCheckedChange={() => handleGoalChange(goal.id)} 
                            />
                            <Label 
                                htmlFor={goal.id}
                                className="flex items-center gap-4 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                                {React.cloneElement(goal.icon, { className: "w-6 h-6 text-primary" })}
                                <span className="font-semibold">{goal.label}</span>
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        );
      case 4:
        return (
            <div className="text-center py-8">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                    {showResults ? (
                        <>
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-semibold">¡Hola, {formData.personName} de {formData.companyName}!</h3>
                                <p className="text-muted-foreground">Gracias a tu información, aquí tienes tu diagnóstico personalizado.</p>
                            </div>
                            <div className="inline-block bg-primary/10 p-6 rounded-full mb-4">
                                <Clock className="w-16 h-16 text-primary" />
                            </div>
                            <p className="text-xl text-muted-foreground">Podrías ahorrar un estimado de</p>
                            <p className="text-6xl sm:text-7xl font-bold text-primary my-2">{estimatedHoursSaved}</p>
                            <p className="text-xl text-muted-foreground mb-6">horas al mes.</p>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Soluciones Recomendadas</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="text-left space-y-2">
                                        {formData.goals.map(goalId => {
                                            const goal = automationGoals.find(g => g.id === goalId);
                                            return (
                                                <li key={goalId} className="flex items-center gap-2">
                                                    <ChevronRight className="w-5 h-5 text-primary"/> 
                                                    <span className='text-foreground/80'>{goal?.label}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </CardContent>
                            </Card>
                        </>
                    ) : <div className="min-h-[300px] bg-background/50 backdrop-blur-sm" />}
                </motion.div>
            </div>
        )
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
      <CardHeader>
        <Progress value={(currentStep / steps.length) * 100} className="mb-4" />
        <div className="space-y-2 text-center">
            <CardTitle>{steps[currentStep-1].title}</CardTitle>
            <CardDescription>{steps[currentStep-1].description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="min-h-[300px]"
            >
                {renderStep()}
            </motion.div>
        </AnimatePresence>

         {error && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-4 text-center">
                 <p className="text-sm font-medium text-destructive">{error}</p>
            </motion.div>
        )}

        <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
            </Button>
            <Button onClick={handleNext}>
                   {currentStep < steps.length ? 'Siguiente' : 'Recibir Diagnóstico'}
                   <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </CardContent>

      <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Bot className="w-6 h-6 text-primary"/>¡Diagnóstico listo!</DialogTitle>
                <DialogDescription>
                    Ingresa tu número de WhatsApp para enviarte el diagnóstico detallado y que un experto te explique cómo lograr este ahorro de tiempo.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <Label htmlFor="whatsapp-number">Tu número de WhatsApp</Label>
                <Input 
                    id="whatsapp-number" 
                    type="tel" 
                    placeholder="Ej. 55 1234 5678" 
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                />
            </div>
            <Button onClick={handleSendToWhatsapp} size="lg" className="w-full">
                <WhatsappIcon className="w-5 h-5 mr-2" />
                Enviar y Ver mi Diagnóstico
            </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AutomationCalculator;

    
