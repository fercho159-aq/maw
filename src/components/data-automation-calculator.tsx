"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, ArrowRight, Bot, Database, Repeat, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsappIcon from './icons/whatsapp-icon';
import { addLead } from '@/app/leads/_actions';

const dataSources = [
  { id: 'sheets', label: 'Hojas de Cálculo (Excel, Google Sheets)' },
  { id: 'crm', label: 'CRM (HubSpot, Salesforce, etc.)' },
  { id: 'erp', label: 'ERP o Sistema Interno' },
  { id: 'ecommerce', label: 'Plataforma de E-commerce (Shopify, etc.)' },
  { id: 'apis', label: 'APIs de Terceros' },
  { id: 'manual', label: 'Entrada Manual de Datos' },
];

const painPoints = [
  { id: 'errores', label: 'Errores por entrada manual de datos' },
  { id: 'tiempo', label: 'Pérdida de tiempo en copiar/pegar información' },
  { id: 'desactualizado', label: 'Reportes y datos siempre desactualizados' },
  { id: 'no-centralizado', label: 'Falta de una visión centralizada del negocio' },
  { id: 'procesos', label: 'Procesos lentos que dependen de varias personas' },
];

const steps = [
  { id: 1, title: 'Tus Datos', description: '¿De dónde viene y a dónde va tu información?' },
  { id: 2, title: 'Tus "Dolores"', description: '¿Qué problemas te causa tu flujo de datos actual?' },
  { id: 3, title: 'Resultados', description: 'Descubre tu potencial de automatización.' }
];

const DataAutomationCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    personName: '',
    sources: ['sheets', 'manual'],
    pains: ['tiempo', 'errores'],
  });
  const [error, setError] = useState('');

  const automationScore = useMemo(() => {
    let score = 0;
    score += formData.sources.length * 15;
    score += formData.pains.length * 20;
    return Math.min(100, score);
  }, [formData]);

  const handleNext = () => {
     if (currentStep === 1 && (formData.sources.length === 0)) {
      setError('Selecciona al menos una fuente de datos.');
      return;
    }
     if (currentStep === 2 && (formData.pains.length === 0)) {
      setError('Selecciona al menos un problema que enfrentas.');
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

  const handleCheckboxChange = (type: 'sources' | 'pains', id: string) => {
    setError('');
    setFormData(prev => {
      const currentValues = prev[type];
      const newValues = currentValues.includes(id)
        ? currentValues.filter(item => item !== id)
        : [...currentValues, id];
      return { ...prev, [type]: newValues };
    });
  }

  const handleSendToWhatsapp = () => {
    const sourcesText = formData.sources.map(id => dataSources.find(s => s.id === id)?.label).join(', ');
    const painsText = formData.pains.map(id => painPoints.find(p => p.id === id)?.label).join(', ');
    
    const message = `
*¡Hola! Quiero mi diagnóstico de automatización de datos!*
\n*Empresa:* ${formData.companyName}
*Nombre:* ${formData.personName}
*Fuentes de datos:* ${sourcesText}
*Problemas actuales:* ${painsText}
*Potencial de Automatización:* ${automationScore}%
\n*Mi número es:* ${whatsappNumber}
    `.trim().replace(/\n\s*\n/g, '\n');
    const whatsappUrl = `https://wa.me/5633774723?text=${encodeURIComponent(message.trim())}`;
    window.open(whatsappUrl, '_blank');
    
    addLead({
      name: formData.personName,
      company: formData.companyName,
      phone: whatsappNumber,
      source: 'Data Automation Calculator',
      data: formData
    });

    setIsResultModalOpen(false);
    setShowResults(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label>¿Con qué fuentes de datos trabajas principalmente?</Label>
              <p className="text-sm text-muted-foreground">Selecciona todas las que apliquen.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {dataSources.map(source => (
                  <div key={source.id} className="flex items-center space-x-2">
                    <Checkbox
                        id={source.id}
                        checked={formData.sources.includes(source.id)}
                        onCheckedChange={() => handleCheckboxChange('sources', source.id)}
                    />
                    <Label htmlFor={source.id} className="font-normal">{source.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>¿Cuáles de estos problemas te suenan familiares?</Label>
              <p className="text-sm text-muted-foreground">Selecciona los que más te afecten.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {painPoints.map(pain => (
                  <div key={pain.id} className="flex items-center space-x-2">
                     <Checkbox
                        id={pain.id}
                        checked={formData.pains.includes(pain.id)}
                        onCheckedChange={() => handleCheckboxChange('pains', pain.id)}
                    />
                    <Label htmlFor={pain.id} className="font-normal">{pain.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
            <div className="text-center py-8">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                    {showResults ? (
                        <>
                            <div className="inline-block bg-primary/10 p-6 rounded-full mb-4">
                                <Zap className="w-16 h-16 text-primary" />
                            </div>
                            <p className="text-xl text-muted-foreground">Tu potencial de automatización es de</p>
                            <p className="text-6xl sm:text-7xl font-bold text-primary my-2">
                                {automationScore}%
                            </p>
                            <p className="text-lg text-muted-foreground mb-6">Basado en tus respuestas.</p>
                            <Card>
                                <CardHeader>
                                    <CardTitle>¿Qué significa esto?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-left space-y-2 text-foreground/80">
                                   <p>Un puntaje alto indica que una gran parte de tus procesos manuales pueden ser automatizados, lo que se traduce en un ahorro significativo de tiempo y una reducción drástica de errores.</p>
                                   <p>Podemos ayudarte a conectar tus fuentes de datos como <strong>{formData.sources.map(id => dataSources.find(s => s.id === id)?.label).join(', ')}</strong> para solucionar problemas como la <strong>{painPoints.find(p => p.id === formData.pains[0])?.label.toLowerCase()}</strong>.</p>
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
        <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="min-h-[250px]"
        >
            {renderStep()}
        </motion.div>

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
                   {currentStep < steps.length ? 'Siguiente' : 'Quiero Automatizar'}
                   <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </CardContent>

      <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Bot className="w-6 h-6 text-primary"/>¡Diagnóstico Completo!</DialogTitle>
                <DialogDescription>
                    Completa tus datos para recibir tu diagnóstico detallado y que un experto en automatización se ponga en contacto contigo.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="companyName-modal">Nombre de tu Empresa</Label>
                    <Input id="companyName-modal" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="personName-modal">Tu Nombre</Label>
                    <Input id="personName-modal" value={formData.personName} onChange={(e) => setFormData({...formData, personName: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="whatsapp-number">Tu número de WhatsApp</Label>
                    <Input 
                        id="whatsapp-number" 
                        type="tel" 
                        placeholder="Ej. 55 1234 5678" 
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                </div>
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

export default DataAutomationCalculator;
