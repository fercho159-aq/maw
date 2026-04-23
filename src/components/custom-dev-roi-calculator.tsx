"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, Bot, Clock, Users, CircleDollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import WhatsappIcon from './icons/whatsapp-icon';
import { addLead } from '@/app/leads/_actions';

const steps = [
  { id: 1, title: 'Tu Empresa', description: 'Información básica sobre tu negocio.' },
  { id: 2, title: 'Optimización de Tareas', description: 'Estima el tiempo que dedicas a tareas manuales.' },
  { id: 3, title: 'Costo del Equipo', description: 'Ayúdanos a calcular el costo de ese tiempo.' },
  { id: 4, title: 'Resultados: Tu Ahorro Potencial', description: 'Descubre el Retorno de Inversión (ROI).' }
];

const CustomDevRoiCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    personName: '',
    employeesInTask: 1,
    hoursPerWeek: 5,
    avgHourlyRate: 250,
  });
  const [error, setError] = useState('');

  const annualSavings = useMemo(() => {
    const weeklySavings = formData.employeesInTask * formData.hoursPerWeek * formData.avgHourlyRate;
    return weeklySavings * 52;
  }, [formData]);

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

  const handleBack = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSendToWhatsapp = () => {
    const message = `
*¡Hola! Quiero mi cálculo de ROI para un desarrollo a medida!*
\n*Empresa:* ${formData.companyName}
*Nombre:* ${formData.personName}
*Empleados involucrados:* ${formData.employeesInTask}
*Horas ahorradas por semana:* ${formData.hoursPerWeek}
*Costo/hora promedio:* ${formData.avgHourlyRate.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
*Ahorro anual estimado:* ${annualSavings.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
\n*Mi número es:* ${whatsappNumber}
    `.trim().replace(/\n\s*\n/g, '\n');
    const whatsappUrl = `https://wa.me/525541314150?text=${encodeURIComponent(message.trim())}`;
    window.open(whatsappUrl, '_blank');
    
    addLead({
      name: formData.personName,
      company: formData.companyName,
      phone: whatsappNumber,
      source: 'Custom Dev ROI Calculator',
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
              <Label htmlFor="companyName">Nombre de tu Empresa</Label>
              <Input id="companyName" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} placeholder="Ej. Mi Negocio" />
            </div>
            <div>
              <Label htmlFor="personName">Tu Nombre</Label>
              <Input id="personName" value={formData.personName} onChange={(e) => setFormData({...formData, personName: e.target.value})} placeholder="Ej. Alex" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 pt-4">
            <div>
                <div className='flex justify-between items-baseline'>
                  <Label htmlFor="employeesInTask">¿Cuántos empleados realizan esta tarea repetitiva?</Label>
                  <span className="text-2xl font-bold text-primary">{formData.employeesInTask}</span>
                </div>
                <Slider
                    id="employeesInTask"
                    min={1} max={50} step={1}
                    value={[formData.employeesInTask]}
                    onValueChange={(value) => setFormData({ ...formData, employeesInTask: value[0] })}
                />
            </div>
             <div>
                <div className='flex justify-between items-baseline'>
                  <Label htmlFor="hoursPerWeek">¿Cuántas horas a la semana dedica CADA empleado a esta tarea?</Label>
                  <span className="text-2xl font-bold text-primary">{formData.hoursPerWeek} hrs</span>
                </div>
                <Slider
                    id="hoursPerWeek"
                    min={1} max={40} step={1}
                    value={[formData.hoursPerWeek]}
                    onValueChange={(value) => setFormData({ ...formData, hoursPerWeek: value[0] })}
                />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 pt-4">
            <div>
                <div className='flex justify-between items-baseline'>
                  <Label htmlFor="avgHourlyRate">¿Cuál es el costo por hora promedio de estos empleados? (MXN)</Label>
                  <span className="text-2xl font-bold text-primary">{formData.avgHourlyRate.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
                </div>
                <Slider
                    id="avgHourlyRate"
                    min={50} max={1000} step={10}
                    value={[formData.avgHourlyRate]}
                    onValueChange={(value) => setFormData({ ...formData, avgHourlyRate: value[0] })}
                />
                 <p className="text-sm text-muted-foreground mt-1">Considera salario + prestaciones.</p>
            </div>
          </div>
        );
      case 4:
        return (
            <div className="text-center py-8">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                    {showResults && (
                        <>
                            <div className="inline-block bg-primary/10 p-6 rounded-full mb-4">
                                <CircleDollarSign className="w-16 h-16 text-primary" />
                            </div>
                            <p className="text-xl text-muted-foreground">Ahorro potencial anual</p>
                            <p className="text-6xl sm:text-7xl font-bold text-primary my-2">
                                {annualSavings.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                            </p>
                            <p className="text-lg text-muted-foreground mb-6">en costos operativos.</p>
                            <p className="text-foreground/80 max-w-md mx-auto">
                                Esto sin contar el aumento de productividad, la reducción de errores y la capacidad de enfocarte en tareas de mayor valor.
                            </p>
                        </>
                    )}
                </motion.div>
            </div>
        )
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
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
            className="min-h-[200px]"
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
                   {currentStep < steps.length ? 'Siguiente' : 'Quiero este ahorro'}
                   <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </CardContent>

      <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Bot className="w-6 h-6 text-primary"/>¡Cálculo Completo!</DialogTitle>
                <DialogDescription>
                    Ingresa tu número de WhatsApp para recibir tu análisis de ROI detallado y que un experto te contacte para explorar una solución.
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
                Enviar y Ver mi Resultado
            </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CustomDevRoiCalculator;
