

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Bot, Target, Users, Camera, Clock, Calendar, BarChart, FileText, BadgeInfo } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsappIcon from './icons/whatsapp-icon';
import { addLead } from '@/app/leads/_actions';

// DATA FROM USER PLAN
const girosNegocioContenido = [ "Restaurante/Gastronomía", "Servicios Profesionales", "Retail/Ropa/Moda", "Salud/Medicina/Bienestar", "Bienes Raíces/Inmobiliario", "Educación/Cursos", "Entretenimiento/Eventos", "Turismo/Hospitalidad", "Automotriz", "Tecnología/Software", "Construcción/Industrial", "Beauty/Cosméticos", "Otro" ];
const objetivosContenido = [ "Generar ventas directas", "Construir marca/awareness", "Captar leads/clientes potenciales", "Fidelizar clientes actuales", "Posicionamiento de expertos", "Promocionar eventos/lanzamientos" ];
const publicoObjetivo = [ "Jóvenes 18-25 años", "Adultos jóvenes 26-35 años", "Adultos 36-50 años", "Ejecutivos/Profesionales", "Familias", "Empresas/B2B", "Amas de casa", "Estudiantes" ];
const situacionActual = [
    "No creo contenido actualmente",
    "Lo hago yo mismo, pero sin consistencia",
    "Tengo a alguien en mi equipo que me ayuda ocasionalmente",
    "Busco un equipo profesional que se encargue de todo"
];
const frecuenciaPlataformas = { "Instagram": { "Alta": "1-2 posts diarios + Stories cada 4-6 horas", "Media": "4-5 posts semanales + Stories diarias", "Baja": "2-3 posts semanales + Stories 3-4 veces/semana" }, "Facebook": { "Alta": "1-2 posts diarios", "Media": "3-4 posts semanales", "Baja": "1-2 posts semanales" }, "TikTok": { "Alta": "3-5 videos diarios", "Media": "1-2 videos diarios", "Baja": "4-5 videos semanales" }, "LinkedIn": { "Alta": "1 post diario + engagement constante", "Media": "3-4 posts semanales", "Baja": "1-2 posts semanales" }, "YouTube": { "Alta": "2-3 videos semanales", "Media": "1 video semanal", "Baja": "1-2 videos mensuales" }, "Twitter/X": { "Alta": "3-5 tweets diarios", "Media": "1-2 tweets diarios", "Baja": "3-4 tweets semanales" } };
const contenidoPorGiro: Record<string, Record<string, string[] | string>> = { "Restaurante/Gastronomía": { "Instagram": ["Reels de preparación", "Fotos de platillos", "Stories detrás de cámaras", "Tutoriales rápidos"], "TikTok": ["Videos de cocina speed-up", "Retos foodie", "Tendencias gastronómicas"], "Facebook": ["Fotos del menú", "Reseñas de clientes", "Eventos especiales"], "Recomendación": "Enfócate en contenido visual y emocional, muestra texturas y colores para antojar." }, "Servicios Profesionales": { "LinkedIn": ["Casos de éxito", "Artículos de expertise", "Testimonios clientes"], "Facebook": ["Tips del sector", "Infografías", "Webinars"], "Instagram": ["Carousel educativos", "Reels con consejos rápidos"], "Recomendación": "Genera contenido de valor que te posicione como un experto y construya confianza." }, "Retail/Ropa/Moda": { "Instagram": ["Outfit ideas", "Reels de styling", "User generated content"], "TikTok": ["Hauls", "Try-on hauls", "Tendencias moda"], "Facebook": ["Catálogos", "Ofertas especiales", "Fashion tips"], "Recomendación": "Crea contenido inspiracional y aspiracional que muestre tu producto en acción." }, "Bienes Raíces/Inmobiliario": { "Facebook": ["Tours virtuales", "Fotos de propiedades", "Tips de compra/venta"], "Instagram": ["Reels de propiedades", "Stories Q&A", "Carousel de consejos"], "LinkedIn": ["Análisis de mercado", "Artículos legales", "Casos de éxito"], "Recomendación": "El contenido debe generar confianza y mostrar tu expertise en el mercado." }, "Default": { "Instagram": ["Carruseles informativos", "Reels mostrando tu producto/servicio", "Stories interactivas (encuestas, Q&A)"], "TikTok": ["Videos cortos y entretenidos", "Tutoriales rápidos", "Únete a tendencias"], "Facebook": ["Comparte artículos de tu blog", "Publica testimonios", "Crea eventos"], "Recomendación": "Adapta el contenido a tu audiencia específica, sé auténtico y aporta valor." } };
const mejoresHorarios: Record<string, string> = { "Instagram": "7-9 AM, 12-2 PM, 5-9 PM", "Facebook": "9 AM-12 PM, 1-4 PM, 7-10 PM", "TikTok": "6-10 AM, 7-11 PM", "LinkedIn": "7-9 AM, 12-2 PM, 5-6 PM", "YouTube": "12-4 PM, 7-10 PM", "Twitter/X": "8-10 AM, 12-2 PM, 6-9 PM" };

const steps = [
  { id: 1, title: 'Tu Negocio', description: 'Cuéntanos sobre tu empresa.' },
  { id: 2, title: 'Tu Audiencia y Metas', description: '¿A quién le hablas y qué quieres lograr?' },
  { id: 3, title: 'Tu Situación Actual', description: 'Ayúdanos a entender tu capacidad de creación.' },
  { id: 4, title: 'Resultados', description: 'Tu estrategia de contenido inicial.' }
];

const ContentRecommender = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    personName: '',
    giro: '',
    objetivo: '',
    publico: '',
    situacion: '',
    plataformas: ['Instagram'],
  });
  const [error, setError] = useState('');

  const handleNext = () => {
    if (currentStep === 1 && (!formData.companyName || !formData.personName || !formData.giro)) {
      setError('Por favor, completa todos los campos.');
      return;
    }
     if (currentStep === 2 && (!formData.objetivo || !formData.publico)) {
      setError('Por favor, completa todos los campos.');
      return;
    }
     if (currentStep === 3 && (!formData.situacion || formData.plataformas.length === 0)) {
      setError('Por favor, selecciona tu situación y al menos una plataforma.');
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
  
  const handlePlatformChange = (platform: string) => {
    setError('');
    const newPlataformas = formData.plataformas.includes(platform)
      ? formData.plataformas.filter(p => p !== platform)
      : [...formData.plataformas, platform];
    
    if (newPlataformas.length > 3) {
        setError('Puedes seleccionar un máximo de 3 plataformas.');
        return;
    }

    setFormData(prev => ({ ...prev, plataformas: newPlataformas }));
  }

  const generateRecommendation = () => {
    let intensidad = "Media";
    if (formData.situacion.includes("sin consistencia")) intensidad = "Baja";
    if (formData.situacion.includes("profesional")) intensidad = "Alta";

    const recomendacion = {
        frecuencia: formData.plataformas.reduce((acc, p) => ({ ...acc, [p]: frecuenciaPlataformas[p as keyof typeof frecuenciaPlataformas][intensidad as keyof typeof frecuenciaPlataformas[keyof typeof frecuenciaPlataformas]] }), {}),
        tipoContenido: formData.plataformas.reduce((acc, p) => ({ ...acc, [p]: contenidoPorGiro[formData.giro]?.[p] || contenidoPorGiro['Default'][p] }), {}),
        mejoresHorarios: formData.plataformas.reduce((acc, p) => ({ ...acc, [p]: mejoresHorarios[p] }), {}),
        consejoPrincipal: contenidoPorGiro[formData.giro]?.Recomendación || contenidoPorGiro['Default'].Recomendación,
    };
    return recomendacion;
  }
  
  const handleSendToWhatsapp = () => {
    const recomendacion = generateRecommendation();
    let recomendacionTexto = `
*Estrategia de Contenido para ${formData.companyName}*
\n*Objetivo:* ${formData.objetivo}
*Público:* ${formData.publico}
*Situación Actual:* ${formData.situacion}
*Plataformas:* ${formData.plataformas.join(', ')}
`;

    recomendacionTexto += "\n\n*RECOMENDACIONES:*"
    formData.plataformas.forEach(p => {
        recomendacionTexto += `
\n*Plataforma: ${p}*
- *Frecuencia Sugerida:* ${recomendacion.frecuencia[p as keyof typeof recomendacion.frecuencia]}
- *Contenido Sugerido:* ${(recomendacion.tipoContenido[p as keyof typeof recomendacion.tipoContenido] as string[]).slice(0,2).join(', ')}...
- *Mejores Horarios:* ${recomendacion.mejoresHorarios[p as keyof typeof recomendacion.mejoresHorarios]}
        `;
    });
     recomendacionTexto += `\n\n*Consejo Clave:* ${recomendacion.consejoPrincipal}`

    const message = `
¡Hola! Quiero mi Estrategia de Contenido Personalizada.

*Nombre:* ${formData.personName}
*Empresa:* ${formData.companyName}
*Giro:* ${formData.giro}
${recomendacionTexto}
\n*Mi número es:* ${whatsappNumber}
    `.trim().replace(/\n\s*\n/g, '\n');
    const whatsappUrl = `https://wa.me/525538359927?text=${encodeURIComponent(message.trim())}`;
    window.open(whatsappUrl, '_blank');
    
    addLead({
        name: formData.personName,
        company: formData.companyName,
        phone: whatsappNumber,
        source: 'Content Recommender',
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
                  {girosNegocioContenido.map(giro => <SelectItem key={giro} value={giro}>{giro}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>¿Cuál es tu objetivo principal con el contenido?</Label>
              <Select value={formData.objetivo} onValueChange={(value) => setFormData({ ...formData, objetivo: value })}>
                <SelectTrigger><SelectValue placeholder="Selecciona un objetivo..." /></SelectTrigger>
                <SelectContent>
                  {objetivosContenido.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>¿A qué público te quieres dirigir principalemente?</Label>
              <Select value={formData.publico} onValueChange={(value) => setFormData({ ...formData, publico: value })}>
                <SelectTrigger><SelectValue placeholder="Selecciona tu audiencia..." /></SelectTrigger>
                <SelectContent>
                  {publicoObjetivo.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 3:
        return (
            <div className="space-y-6">
                 <div>
                    <Label>¿En qué plataformas quieres tener presencia? (Máximo 3)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                        {Object.keys(frecuenciaPlataformas).map(p => (
                            <div key={p} className="flex items-center space-x-2">
                                <Checkbox id={p} checked={formData.plataformas.includes(p)} onCheckedChange={() => handlePlatformChange(p)} />
                                <Label htmlFor={p} className="font-normal">{p}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <Label>¿Cuál es tu situación actual con la creación de contenido?</Label>
                    <RadioGroup value={formData.situacion} onValueChange={(value) => setFormData({...formData, situacion: value})} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {situacionActual.map(r => (
                             <div key={r}>
                                <RadioGroupItem value={r} id={r} className="peer sr-only" />
                                <Label htmlFor={r} className="flex items-center justify-center text-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                    <span className="font-semibold">{r}</span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>
        );
      case 4:
        if (!showResults) return <div className="min-h-[300px] flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg"><p className="text-muted-foreground">Completa los pasos para ver tu recomendación...</p></div>;
        
        const recomendacion = generateRecommendation();
        return (
            <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            >
                <div className="text-center">
                    <h3 className="text-xl font-semibold">¡Hola, {formData.personName} de {formData.companyName}!</h3>
                    <p className="text-muted-foreground">Gracias a tu información, aquí tienes tu estrategia de contenido inicial.</p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'><BadgeInfo className="w-5 h-5 text-primary"/> Resumen de tu Estrategia</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong className="text-primary">Objetivo Principal:</strong> {formData.objetivo}</p>
                        <p><strong className="text-primary">Público Objetivo:</strong> {formData.publico}</p>
                        <p><strong className="text-primary">Consejo Estratégico:</strong> {recomendacion.consejoPrincipal}</p>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                    {formData.plataformas.map(p => (
                        <Card key={p}>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    {React.createElement(BarChart, {className: "w-5 h-5 text-primary"})}
                                    {p}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-foreground/80">
                                <p><strong className='text-foreground'>Frecuencia:</strong> {recomendacion.frecuencia[p as keyof typeof recomendacion.frecuencia]}</p>
                                <p><strong className='text-foreground'>Contenido:</strong> {(recomendacion.tipoContenido[p as keyof typeof recomendacion.tipoContenido] as string[]).slice(0, 2).join(', ')}...</p>
                                <p><strong className='text-foreground'>Horarios:</strong> {recomendacion.mejoresHorarios[p as keyof typeof recomendacion.mejoresHorarios]}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </motion.div>
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
                   {currentStep < steps.length ? 'Siguiente' : 'Generar Estrategia'}
                   <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </CardContent>

      <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Bot className="w-6 h-6 text-primary"/>¡Estrategia Lista!</DialogTitle>
                <DialogDescription>
                    Ingresa tu número de WhatsApp para enviarte tu estrategia personalizada y que un experto se ponga en contacto contigo.
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
                Enviar y Ver mi Estrategia
            </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ContentRecommender;



    
