
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Briefcase, Bot, ShoppingCart, Send, Link as LinkIcon, Building, Palette, Sparkles, Circle, CircleDollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsappIcon from './icons/whatsapp-icon';
import { cn } from '@/lib/utils';
import { Checkbox } from './ui/checkbox';
import { addLead } from '@/app/leads/_actions';

const webGoals = [
    { id: 'ecommerce', label: 'Vender productos directamente', icon: <ShoppingCart />, recommendation: 'Sitio E-commerce' },
    { id: 'connective', label: 'Presentar mi empresa y servicios', icon: <Building />, recommendation: 'Sitio Conectivo' },
    { id: 'landing', label: 'Promocionar un producto o evento', icon: <Send />, recommendation: 'Landing Page' },
    { id: 'catalog', label: 'Mostrar un catálogo (sin venta directa)', icon: <Briefcase />, recommendation: 'Sitio de Catálogo' },
];

const designStyles = [
    { id: 'minimalist', label: 'Minimalista', icon: <Circle /> },
    { id: 'bold', label: 'Colores Fuertes / Gen Z', icon: <Palette /> },
    { id: 'animated', label: 'Animado', icon: <Sparkles /> },
];

const productRanges = [
    { id: '1-20', label: '1 - 20 productos', price: 15000 },
    { id: '21-50', label: '21 - 50 productos', price: 18000 },
    { id: '51-200', label: '51 - 200 productos', price: 22000 },
];

const basePrices = {
    'Sitio E-commerce': 15000,
    'Sitio Conectivo': 12000,
    'Landing Page': 8000,
    'Sitio de Catálogo': 12000,
};

const WebCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    personName: '',
    mainGoal: 'connective',
    competitors: '',
    noInspiration: false,
    designStyle: 'minimalist',
    isRedesign: 'No',
    currentWebsite: '',
    productRange: '1-20',
  });
  const [error, setError] = useState('');

  const steps = [
    { id: 1, title: 'Tu Proyecto', description: 'Cuéntanos sobre tu empresa y objetivo web.' },
    ...(formData.mainGoal === 'ecommerce' ? [{ id: 2, title: 'Tamaño de tu Tienda', description: '¿Cuántos productos planeas vender?' }] : []),
    { id: formData.mainGoal === 'ecommerce' ? 3 : 2, title: 'Estilo y Diseño', description: 'Define la apariencia que buscas.' },
    { id: formData.mainGoal === 'ecommerce' ? 4 : 3, title: 'Inspiración', description: 'Ayúdanos a entender tu visión.' },
    { id: formData.mainGoal === 'ecommerce' ? 5 : 4, title: 'Recomendación', description: 'Tu tipo de sitio web ideal y costo estimado.' }
  ];

  const recommendation = useMemo(() => {
    const goal = webGoals.find(g => g.id === formData.mainGoal);
    return goal?.recommendation || 'Sitio Web';
  }, [formData.mainGoal]);

  const price = useMemo(() => {
      if (recommendation === 'Sitio E-commerce') {
          return productRanges.find(r => r.id === formData.productRange)?.price || basePrices['Sitio E-commerce'];
      }
      return basePrices[recommendation as keyof typeof basePrices] || 0;
  }, [recommendation, formData.productRange]);

  const handleNext = () => {
    if (currentStep === 1 && (!formData.companyName || !formData.personName)) {
        setError('Por favor, completa todos los campos.');
        return;
    }
    setError('');
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsResultModalOpen(true);
    }
  };

  useEffect(() => {
    const lastRegularStepId = formData.mainGoal === 'ecommerce' ? 4 : 3;
    if (currentStep === lastRegularStepId && (formData.competitors !== '' || formData.noInspiration)) {
        handleNext();
    }
  }, [formData.competitors, formData.noInspiration, currentStep]);

  const handleBack = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNoInspirationChange = (checked: boolean) => {
    setFormData(prev => ({
        ...prev,
        noInspiration: checked,
        competitors: checked ? '' : prev.competitors
    }));
  }

  const handleSendToWhatsapp = () => {
    const designStyleLabel = designStyles.find(d => d.id === formData.designStyle)?.label || 'No especificado';
    const productRangeLabel = productRanges.find(r => r.id === formData.productRange)?.label || '';
    
    let inspirationText = formData.noInspiration ? 'No se proporcionaron sitios de inspiración.' : (formData.competitors || 'No especificados');

    const message = `
*¡Hola! Quiero una cotización para mi sitio web!*
\n*Empresa:* ${formData.companyName}
*Nombre:* ${formData.personName}
*Tipo de Sitio Recomendado:* ${recommendation}
${formData.mainGoal === 'ecommerce' ? `*Cantidad de Productos:* ${productRangeLabel}\n` : ''}*Precio Estimado Mostrado:* ${price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
*¿Busca rediseño?:* ${formData.isRedesign}
${formData.isRedesign === 'Sí' ? `*Sitio Actual:* ${formData.currentWebsite}\n` : ''}*Estilo de diseño preferido:* ${designStyleLabel}
*Sitios de referencia:* 
${inspirationText}
\n*Mi número es:* ${whatsappNumber}
    `.trim().replace(/\n\s*\n/g, '\n'); // Remove empty lines
    const whatsappUrl = `https://wa.me/525541314150?text=${encodeURIComponent(message.trim())}`;
    window.open(whatsappUrl, '_blank');

    addLead({
      name: formData.personName,
      company: formData.companyName,
      phone: whatsappNumber,
      source: 'Web Calculator',
      data: formData
    });

    setIsResultModalOpen(false);
    setShowResults(true);
    setCurrentStep(steps.length);
  };

  const renderStep = () => {
    const stepConfig = steps[currentStep-1];
    
    switch (stepConfig.id) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName" className="mb-2 block">Nombre de tu Empresa</Label>
                  <Input id="companyName" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} placeholder="Ej. Mi Marca Increíble" />
                </div>
                <div>
                  <Label htmlFor="personName" className="mb-2 block">Tu Nombre</Label>
                  <Input id="personName" value={formData.personName} onChange={(e) => setFormData({...formData, personName: e.target.value})} placeholder="Ej. Alex Smith" />
                </div>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-border/40">
                <Label className="text-base font-medium">¿Cuál es el objetivo principal de tu nuevo sitio web?</Label>
                <RadioGroup value={formData.mainGoal} onValueChange={(value) => setFormData({...formData, mainGoal: value})} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {webGoals.map(goal => (
                        <div key={goal.id}>
                            <RadioGroupItem value={goal.id} id={goal.id} className="peer sr-only" />
                            <Label 
                                htmlFor={goal.id}
                                className="flex items-center gap-4 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
                            >
                                {React.cloneElement(goal.icon, { className: "w-5 h-5 text-primary shrink-0" })}
                                <span className="font-semibold text-sm">{goal.label}</span>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
          </div>
        );
       case 2:
        if (formData.mainGoal === 'ecommerce') {
            return (
                <div className="space-y-4">
                    <Label>¿Cuántos productos diferentes planeas vender inicialmente?</Label>
                    <RadioGroup value={formData.productRange} onValueChange={(value) => setFormData({...formData, productRange: value})} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        {productRanges.map(range => (
                            <div key={range.id}>
                                <RadioGroupItem value={range.id} id={range.id} className="peer sr-only" />
                                <Label htmlFor={range.id} className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-28 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors">
                                    <span className="font-semibold text-center">{range.label}</span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            );
        }
        // Fallthrough for non-ecommerce
      case formData.mainGoal === 'ecommerce' ? 3 : 2:
        return (
            <div className="space-y-8">
                <div>
                    <Label>¿Qué estilo de diseño visual prefieres?</Label>
                    <RadioGroup value={formData.designStyle} onValueChange={(value) => setFormData({...formData, designStyle: value})} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        {designStyles.map(style => (
                            <div key={style.id}>
                                <RadioGroupItem value={style.id} id={style.id} className="peer sr-only" />
                                <Label htmlFor={style.id} className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-28 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                    {React.cloneElement(style.icon, { className: "w-6 h-6 text-primary mb-2" })}
                                    <span className="font-semibold text-center">{style.label}</span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                <div>
                    <Label>¿Ya tienes un sitio web y buscas un rediseño?</Label>
                    <RadioGroup value={formData.isRedesign} onValueChange={(value) => setFormData({...formData, isRedesign: value})} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Sí" id="redesign-yes" />
                            <Label htmlFor="redesign-yes" className='font-normal'>Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="redesign-no" />
                            <Label htmlFor="redesign-no" className='font-normal'>No</Label>
                        </div>
                    </RadioGroup>
                </div>

                <AnimatePresence>
                {formData.isRedesign === 'Sí' && (
                    <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Label htmlFor="currentWebsite">URL de tu sitio web actual</Label>
                        <Input 
                            id="currentWebsite" 
                            value={formData.currentWebsite} 
                            onChange={(e) => setFormData({...formData, currentWebsite: e.target.value})} 
                            placeholder="Ej. www.mi-sitio-actual.com" 
                        />
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        );
      case formData.mainGoal === 'ecommerce' ? 4 : 3:
        return (
            <div className="space-y-4">
                <Label htmlFor="competitors">Inspiración y Competencia</Label>
                <p className="text-sm text-muted-foreground">Menciona algunos sitios web que te gusten (pueden ser de tu competencia o no).</p>
                <Textarea 
                    id="competitors"
                    value={formData.competitors}
                    onChange={(e) => setFormData({...formData, competitors: e.target.value})}
                    placeholder="Ej: www.competidor1.com, www.marcafavorita.com"
                    className="h-32"
                    disabled={formData.noInspiration}
                />
                 <div className="flex items-center space-x-2">
                    <Checkbox
                        id="no-inspiration"
                        checked={formData.noInspiration}
                        onCheckedChange={(checked) => handleNoInspirationChange(Boolean(checked))}
                    />
                    <label
                        htmlFor="no-inspiration"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        No tengo sitios web de inspiración en mente
                    </label>
                </div>
            </div>
        );
      case formData.mainGoal === 'ecommerce' ? 5 : 4:
        const recommendedGoal = webGoals.find(g => g.id === formData.mainGoal);
        return (
            <div className="text-center py-8">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                    {showResults ? (
                        <>
                         <div className="text-center mb-6">
                            <h3 className="text-xl font-semibold">¡Hola, {formData.personName} de {formData.companyName}!</h3>
                            <p className="text-muted-foreground">Gracias a tu información, aquí tienes tu recomendación personalizada.</p>
                         </div>
                        <div className="inline-block bg-primary/10 p-6 rounded-full mb-4">
                            {recommendedGoal?.icon && React.cloneElement(recommendedGoal.icon, { className: "w-16 h-16 text-primary" })}
                        </div>
                        <p className="text-lg text-muted-foreground">Basado en tus respuestas, tu sitio ideal es un</p>
                        <p className="text-2xl font-bold text-primary my-2">{recommendation}</p>
                        <Card className="mt-6 text-left">
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'><CircleDollarSign /> Inversión Estimada</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">
                                    {price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                                    {recommendation !== 'Sitio E-commerce' && <span className="text-lg font-normal text-muted-foreground ml-2">(desde)</span>}
                                </p>
                                <p className="text-foreground/80 mt-2">
                                    Un <strong>{recommendation}</strong> está diseñado específicamente para <strong>{recommendedGoal?.label.toLowerCase()}</strong>. Es la herramienta perfecta para alcanzar tus objetivos porque se centra en funcionalidades clave para ello.
                                </p>
                                <p className="text-xs text-muted-foreground mt-4">*Este es un precio estimado y puede variar según la complejidad final del proyecto.</p>
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
                   {currentStep < steps.length ? 'Siguiente' : 'Recibir Recomendación'}
                   <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </CardContent>

      <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Bot className="w-6 h-6 text-primary"/>¡Recomendación Lista!</DialogTitle>
                <DialogDescription>
                    Ingresa tu número de WhatsApp para enviarte el resultado detallado y que un experto se ponga en contacto contigo para una cotización.
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
                Enviar y Ver mi Recomendación
            </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default WebCalculator;

