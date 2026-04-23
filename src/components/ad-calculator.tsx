
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, BarChart, Users, AlertTriangle, MessageSquare, Building2, TrendingUp, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsappIcon from './icons/whatsapp-icon';
import { addLead } from '@/app/leads/_actions';

// Data from the user's plan
const girosNegocio = ["Restaurante", "Servicios Profesionales", "Retail/Ropa", "Salud/Medicina", "Bienes Raíces", "Educación", "Entretenimiento", "Turismo", "Automotriz", "Tecnología", "Otro"];
const estadosMexico: Record<string, string[]> = {
  "CDMX": ["Álvaro Obregón", "Benito Juárez", "Coyoacán", "Cuauhtémoc", "Miguel Hidalgo", "Tlalpan", "Azcapotzalco", "Coyoacán", "Cuajimalpa de Morelos", "Gustavo A. Madero", "Iztacalco", "Iztapalapa", "La Magdalena Contreras", "Milpa Alta", "Tláhuac", "Venustiano Carranza", "Xochimilco"],
  "Estado de México": ["Todos los municipios"], "Jalisco": ["Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá"], "Nuevo León": ["Monterrey", "San Pedro Garza García", "Guadalupe", "Apodaca"], "Puebla": ["Puebla", "Angelópolis", "Cholula"], "Querétaro": ["Querétaro", "Corregidora", "El Marqués"], "Guanajuato": ["León", "Irapuato", "Celaya", "Salamanca"], "Baja California": ["Tijuana", "Mexicali", "Ensenada"], "Yucatán": ["Mérida", "Progreso", "Umán"], "Otro estado": ["Especificar municipio"]
};
const plataformasPauta: Record<string, { minInversion: number }> = { "Facebook": { minInversion: 2000 }, "Instagram": { minInversion: 2000 }, "TikTok": { minInversion: 3000 }, "LinkedIn": { minInversion: 8000 }, "YouTube": { minInversion: 5000 }, "Google Ads": { minInversion: 3000 } };
const tabuladorAlcance: Record<string, Record<string, string>> = { "4000-8000": { "Facebook": "15,000 - 30,000 personas", "Instagram": "12,000 - 25,000 personas", "TikTok": "20,000 - 40,000 personas", "LinkedIn": "5,000 - 10,000 profesionales", "YouTube": "8,000 - 15,000 visualizaciones", "Google Ads": "500 - 1,200 clics" }, "8001-20000": { "Facebook": "30,000 - 80,000 personas", "Instagram": "25,000 - 60,000 personas", "TikTok": "40,000 - 100,000 personas", "LinkedIn": "10,000 - 25,000 profesionales", "YouTube": "15,000 - 40,000 visualizaciones", "Google Ads": "1,200 - 3,000 clics" }, "20001-150000": { "Facebook": "80,000 - 600,000 personas", "Instagram": "60,000 - 450,000 personas", "TikTok": "100,000 - 750,000 personas", "LinkedIn": "25,000 - 200,000 profesionales", "YouTube": "40,000 - 300,000 visualizaciones", "Google Ads": "3,000 - 22,500 clics" } };
const platformAdvantages: Record<string, Record<string, string>> = {
  "Restaurante": {
    "Instagram": "Es la plataforma visual por excelencia. Ideal para mostrar tus platillos con fotos y videos de alta calidad (Reels). El 62% de los usuarios se interesa más en una marca después de verla en Stories.",
    "Facebook": "Permite segmentar por intereses locales muy específicos (ej. 'gente que vive cerca de la Condesa'). Excelente para promociones, eventos y construir una comunidad local.",
    "TikTok": "Perfecto para contenido viral y mostrar el ambiente de tu restaurante. El 85% de los usuarios de TikTok descubren nuevos productos o servicios en la plataforma."
  },
  "Servicios Profesionales": {
    "LinkedIn": "Es la red profesional #1. Indispensable para generar leads B2B, conectar con tomadores de decisiones y posicionarte como un experto en tu industria.",
    "Google Ads": "Captura clientes que ya están buscando activamente tus servicios. Aparecer en los primeros resultados para búsquedas como 'abogado fiscal en CDMX' es crucial.",
    "Facebook": "Útil para retargeting y campañas de reconocimiento de marca, educando a una audiencia más amplia sobre la necesidad de tus servicios."
  },
  "Retail/Ropa": {
    "Instagram": "Tu catálogo visual. Las funciones de Instagram Shopping permiten una compra casi instantánea. El contenido generado por usuarios (UGC) es extremadamente poderoso aquí.",
    "TikTok": "El rey del 'descubrimiento'. Ideal para mostrar cómo se ven tus prendas en gente real, unirte a tendencias y generar compras por impulso.",
    "Facebook": "Potente para remarketing dinámico (mostrarle a un usuario exactamente la prenda que vio) y para construir una comunidad leal a través de grupos."
  },
  "Salud/Medicina": {
    "Google Ads": "Fundamental. Los pacientes buscan soluciones a problemas de salud con alta intención. Estar presente en búsquedas como 'mejor cardiólogo en Monterrey' es vital.",
    "Facebook": "Excelente para educar a la comunidad sobre padecimientos, prevención y nuevos tratamientos. Ayuda a construir confianza y autoridad.",
    "LinkedIn": "Muy útil si tus servicios se dirigen a otros profesionales de la salud o a empresas (B2B)."
  },
  "Bienes Raíces": {
    "Facebook": "La mejor plataforma para segmentación demográfica y geográfica. Los 'Lead Ads' son extremadamente efectivos para capturar datos de interesados en una propiedad.",
    "Instagram": "Perfecto para mostrar propiedades de lujo con recorridos en video (Reels) y fotos de alta calidad. Atrae a un público aspiracional.",
    "Google Ads": "Esencial para capturar leads de alta intención que buscan activamente 'departamentos en venta en la Roma Norte'."
  },
  "Default": {
    "Google Ads": "Te permite capturar la demanda existente, llegando a usuarios que buscan activamente tus productos o servicios, lo que se traduce en leads de alta calidad.",
    "Facebook": "Ideal para construir una comunidad, generar reconocimiento de marca (awareness) y para estrategias de retargeting muy efectivas.",
    "Instagram": "Es una plataforma altamente visual, perfecta para mostrar la estética de tu producto o servicio y conectar con audiencias más jóvenes a través de Reels y Stories.",
    "TikTok": "Su algoritmo de descubrimiento es inigualable para contenido creativo y viral, permitiendo un alcance masivo con una inversión inicial menor.",
    "LinkedIn": "Indispensable para negocios B2B, permite conectar directamente con tomadores de decisiones y establecer autoridad en tu industria.",
    "YouTube": "Excelente para contenido educativo y de formato largo que construye confianza y posiciona a tu marca como una experta en el tema."
  }
};


const steps = [
  { id: 1, title: 'Tu Negocio', description: 'Cuéntanos sobre tu empresa.' },
  { id: 2, title: 'Ubicación', description: '¿Dónde se encuentran tus clientes?' },
  { id: 3, title: 'Objetivos y Plataformas', description: 'Define qué quieres lograr y dónde.' },
  { id: 4, title: 'Presupuesto', description: 'Define tu inversión mensual para pauta.' },
  { id: 5, title: 'Resultados', description: 'Tu alcance estimado.' }
];

const AdCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    personName: '',
    giro: '',
    estado: 'CDMX',
    municipios: ['Benito Juárez'],
    otroMunicipio: '',
    plataformas: ['Facebook', 'Instagram'],
    prevInvestment: 'No',
    prevInvestmentAmount: '',
    campaignType: 'Performance',
    presupuesto: 4000
  });
  const [error, setError] = useState('');
  const [tiktokError, setTiktokError] = useState('');

  const minInversion = useMemo(() => {
    if (formData.plataformas.length === 0) return 4000;
    const min = Math.max(...formData.plataformas.map(p => plataformasPauta[p]?.minInversion || 0));
    return Math.max(4000, min);
  }, [formData.plataformas]);

  const handleNext = () => {
    if (currentStep === 1 && (!formData.companyName || !formData.personName)) {
        setError('Por favor, completa todos los campos.');
        return;
    }
    if (currentStep === 3 && formData.plataformas.length === 0) {
      setError('Debes seleccionar al menos una plataforma.');
      return;
    }
    setError('');
    setTiktokError('');
    if (currentStep < steps.length) {
      if (currentStep === 4) {
          setIsResultModalOpen(true);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
   useEffect(() => {
    if (currentStep === 4 && !isResultModalOpen) {
      setIsResultModalOpen(true);
    }
  }, [currentStep, isResultModalOpen]);

  const handleBack = () => {
    setError('');
    setTiktokError('');
    if (isResultModalOpen) {
        setIsResultModalOpen(false);
    }
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setShowResults(false);
    setFormData({
        companyName: '',
        personName: '',
        giro: '',
        estado: 'CDMX',
        municipios: ['Benito Juárez'],
        otroMunicipio: '',
        plataformas: ['Facebook', 'Instagram'],
        prevInvestment: 'No',
        prevInvestmentAmount: '',
        campaignType: 'Performance',
        presupuesto: 4000
    });
  }
  
  const handlePlatformChange = (platform: string) => {
    setError('');
    setTiktokError('');

    if (platform === 'TikTok' && formData.giro === 'Salud/Medicina' && !formData.plataformas.includes('TikTok')) {
      setTiktokError('Por el momento no es posible hacer pautas médicas en TikTok.');
      return;
    }

    setFormData(prev => {
      const newPlataformas = prev.plataformas.includes(platform)
        ? prev.plataformas.filter(p => p !== platform)
        : [...prev.plataformas, platform];
      const newMinInversion = Math.max(4000, ...newPlataformas.map(p => plataformasPauta[p]?.minInversion || 0));
      return { 
          ...prev, 
          plataformas: newPlataformas,
          presupuesto: Math.max(prev.presupuesto, newMinInversion)
      };
    });
  };

  const handleMunicipioChange = (municipio: string) => {
     setFormData(prev => {
      const newMunicipios = prev.municipios.includes(municipio)
        ? prev.municipios.filter(m => m !== municipio)
        : [...prev.municipios, municipio];
      return { ...prev, municipios: newMunicipios };
    });
  }

  const getBudgetRangeKey = (budget: number) => {
    if (budget <= 8000) return "4000-8000";
    if (budget <= 20000) return "8001-20000";
    return "20001-150000";
  }

  const handleSendToWhatsapp = () => {
    const message = `
*¡Hola! Quiero mi cotización de publicidad!*
\n*Empresa:* ${formData.companyName}
*Nombre:* ${formData.personName}
*Giro:* ${formData.giro}
*Ubicación:* ${formData.estado} - ${formData.municipios.join(', ')}${formData.otroMunicipio ? `, ${formData.otroMunicipio}`: ''}
*Plataformas:* ${formData.plataformas.join(', ')}
*Tipo de Campaña:* ${formData.campaignType}
*Inversión previa:* ${formData.prevInvestment}${formData.prevInvestment === 'Sí' ? ` - ${formData.prevInvestmentAmount}` : ''}
*Presupuesto mensual estimado:* ${formData.presupuesto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
\n*Mi número es:* ${whatsappNumber}
    `.trim();
    const whatsappUrl = `https://wa.me/525541314150?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    addLead({
        name: formData.personName,
        company: formData.companyName,
        phone: whatsappNumber,
        source: 'Ad Calculator',
        data: formData
    });

    setIsResultModalOpen(false);
    setShowResults(true); // Show results after sending
    setCurrentStep(currentStep + 1); // Move to final step
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
            <div>
                <Label>¿Has invertido antes en publicidad digital?</Label>
                <RadioGroup value={formData.prevInvestment} onValueChange={(value) => setFormData({...formData, prevInvestment: value})} className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sí" id="inv-si" />
                        <Label htmlFor="inv-si" className='font-normal'>Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="inv-no" />
                        <Label htmlFor="inv-no" className='font-normal'>No</Label>
                    </div>
                </RadioGroup>
            </div>
            <AnimatePresence>
              {formData.prevInvestment === 'Sí' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="prevInvestmentAmount">¿Cuánto invertías mensualmente? (MXN)</Label>
                    <Input id="prevInvestmentAmount" type="text" value={formData.prevInvestmentAmount} onChange={(e) => setFormData({...formData, prevInvestmentAmount: e.target.value})} placeholder="Ej. $10,000" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
                <Label>Estado</Label>
                <Select value={formData.estado} onValueChange={(value) => setFormData({ ...formData, estado: value, municipios: [] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    {Object.keys(estadosMexico).map(estado => <SelectItem key={estado} value={estado}>{estado}</SelectItem>)}
                </SelectContent>
                </Select>
            </div>
            {formData.estado && estadosMexico[formData.estado] && estadosMexico[formData.estado][0] !== 'Todos los municipios' && formData.estado !== 'Otro estado' && (
            <div>
                <Label>Alcaldías / Municipios</Label>
                 <p className="text-sm text-muted-foreground">Selecciona tus principales zonas de interés.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 max-h-48 overflow-y-auto pr-2">
                    {estadosMexico[formData.estado].map(m => (
                        <div key={m} className="flex items-center space-x-2">
                        <Checkbox id={m} checked={formData.municipios.includes(m)} onCheckedChange={() => handleMunicipioChange(m)} />
                        <Label htmlFor={m} className="font-normal">{m}</Label>
                        </div>
                    ))}
                </div>
            </div>
            )}
             {formData.estado === 'Otro estado' && (
                <div>
                    <Label htmlFor="otro-municipio">Especificar Municipio(s)</Label>
                    <Input id="otro-municipio" value={formData.otroMunicipio} onChange={(e) => setFormData({...formData, otroMunicipio: e.target.value})} placeholder="Ej. San Miguel de Allende" />
                </div>
            )}
          </div>
        );
      case 3:
        return (
            <div className="space-y-6">
                 <div>
                    <Label>¿Cuál es tu objetivo principal?</Label>
                    <RadioGroup defaultValue="Performance" value={formData.campaignType} onValueChange={(v) => setFormData({...formData, campaignType: v as string})} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <RadioGroupItem value="Performance" id="r1" className="peer sr-only" />
                            <Label htmlFor="r1" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                <TrendingUp className="mb-3 h-6 w-6" />
                                Performance
                                <span className="text-xs font-normal text-center text-muted-foreground mt-2">Ideal para generar acciones directas como ventas, leads o registros. Nos enfocamos en el Retorno de Inversión (ROI).</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="Awareness" id="r2" className="peer sr-only" />
                            <Label htmlFor="r2" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                <Megaphone className="mb-3 h-6 w-6" />
                                Awareness
                                <span className="text-xs font-normal text-center text-muted-foreground mt-2">Ideal para dar a conocer tu marca, producto o servicio a una audiencia amplia y construir reconocimiento.</span>
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
                <div>
                    <Label>Plataformas para Anuncios</Label>
                    <p className="text-sm text-muted-foreground">Selecciona una o más opciones.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                    {Object.keys(plataformasPauta).map(p => (
                        <div key={p} className="flex items-center space-x-2">
                        <Checkbox id={p} checked={formData.plataformas.includes(p)} onCheckedChange={() => handlePlatformChange(p)} />
                        <Label htmlFor={p} className="font-normal">{p}</Label>
                        </div>
                    ))}
                    </div>
                    {tiktokError && (
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-2">
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>{tiktokError}</AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </div>
            </div>
        );
      case 4:
        return (
            <div className="space-y-4 pt-4">
                <div className='flex justify-between items-baseline'>
                  <Label htmlFor="presupuesto">Inversión Mensual (MXN)</Label>
                  <span className="text-2xl font-bold text-primary">{formData.presupuesto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
                </div>
                <Slider
                    id="presupuesto"
                    min={minInversion}
                    max={150000}
                    step={500}
                    value={[formData.presupuesto]}
                    onValueChange={(value) => setFormData({ ...formData, presupuesto: value[0] })}
                />
                 <p className="text-sm text-muted-foreground">Recomendado: al menos {minInversion.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}.</p>
            </div>
        )
      case 5:
        const budgetKey = getBudgetRangeKey(formData.presupuesto);
        const estimatedReach = tabuladorAlcance[budgetKey] || {};
        const giro = formData.giro || 'Default';
        const advantages = platformAdvantages[giro] || platformAdvantages['Default'];

        return (
            <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center">
                    <h3 className="text-xl font-semibold">¡Hola, {formData.personName} de {formData.companyName}!</h3>
                    <p className="text-muted-foreground">Gracias a tu información, aquí tienes tu estimación personalizada.</p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Resumen de tu Cotización</CardTitle>
                        <CardDescription>Basado en una inversión de ${formData.presupuesto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} mensuales.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold flex items-center gap-2"><BarChart className="w-5 h-5 text-primary" /> Alcance Estimado por Plataforma</h4>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-foreground/80 pl-2">
                                {formData.plataformas.map(p => (
                                    <li key={p}><strong>{p}:</strong> {estimatedReach[p] || 'No disponible'}</li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Promedio General</h4>
                            <p className="text-sm text-foreground/80 mt-1 pl-2">Entre <strong>25,000 - 75,000</strong> personas mensuales aproximadamente.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                    <CardTitle>Recomendaciones Personalizadas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                    <p>Para un negocio de <strong>{formData.giro}</strong> como el tuyo, las plataformas que elegiste son una excelente opción. Aquí te explicamos por qué:</p>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                        {formData.plataformas.map(p => (
                            <li key={p}><strong>{p}:</strong> {advantages[p] || platformAdvantages['Default'][p]}</li>
                        ))}
                    </ul>
                    </CardContent>
                </Card>
                
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Nota Importante</AlertTitle>
                    <AlertDescription>
                        Estos números son estimaciones. El alcance real puede variar según la segmentación, la calidad del anuncio y la competencia.
                    </AlertDescription>
                </Alert>

                <Button onClick={resetForm} className="w-full">
                    Realizar otra cotización
                </Button>
            </motion.div>
        )
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
      <CardHeader>
        <div className="space-y-2 text-center">
            <Progress value={(currentStep / steps.length) * 100} className="mb-4" />
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
                className="min-h-[250px]"
            >
                {renderStep()}
            </motion.div>
        </AnimatePresence>

         {error && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-4">
                <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            </motion.div>
        )}

        <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
            </Button>
            {currentStep < 4 ? (
                <Button onClick={handleNext}>
                   Siguiente
                   <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            ) : currentStep === 4 ? (
                <Button onClick={handleNext}>
                    Calcular Estimación
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            ) : null}
        </div>
      </CardContent>

      <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><MessageSquare className="w-6 h-6 text-primary"/>¡Casi listo!</DialogTitle>
                <DialogDescription>
                    Ingresa tu número de WhatsApp para enviarte la cotización detallada y que un experto se ponga en contacto contigo.
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
                Enviar y Ver Mi Cotización
            </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdCalculator;

