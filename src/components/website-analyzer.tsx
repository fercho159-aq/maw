
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Search, AlertTriangle, Zap, SearchCode, Smartphone, Accessibility, ChevronRight } from 'lucide-react';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

type ScoreCategory = "speed" | "seo" | "responsive" | "accessibility";

interface AnalysisResult {
    overallScore: number;
    scores: {
        speed: number;
        seo: number;
        responsive: number;
        accessibility: number;
    };
    recommendations: string[];
}

const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
};

const recommendationsBank = {
    speed: [
        "Optimizar imágenes para carga rápida.",
        "Minimizar el código CSS y JavaScript.",
        "Utilizar un servicio de CDN (Content Delivery Network).",
    ],
    seo: [
        "Añadir meta descripciones a todas las páginas.",
        "Mejorar la estructura de encabezados (H1, H2, H3).",
        "Generar un sitemap.xml y enviarlo a Google.",
    ],
    responsive: [
        "Asegurar que los botones sean fáciles de presionar en móviles.",
        "Verificar que el texto sea legible sin necesidad de hacer zoom.",
        "Probar el sitio en diferentes tamaños de pantalla.",
    ],
    accessibility: [
        "Añadir texto alternativo (alt text) a todas las imágenes.",
        "Asegurar un buen contraste de colores entre texto y fondo.",
        "Garantizar que el sitio sea navegable usando solo el teclado.",
    ],
}

const categoryDetails = {
    speed: { icon: <Zap />, title: "Velocidad" },
    seo: { icon: <SearchCode />, title: "SEO" },
    responsive: { icon: <Smartphone />, title: "Diseño Responsivo" },
    accessibility: { icon: <Accessibility />, title: "Accesibilidad" },
}

const WebsiteAnalyzer = () => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<AnalysisResult | null>(null);

    const handleAnalyze = () => {
        if (!url) {
            setError('Por favor, ingresa una URL válida.');
            return;
        }
        setError('');
        setIsLoading(true);
        setResults(null);

        // Simulate analysis
        setTimeout(() => {
            const scores = {
                speed: Math.floor(Math.random() * (95 - 70 + 1)) + 70,
                seo: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
                responsive: Math.floor(Math.random() * (100 - 80 + 1)) + 80,
                accessibility: Math.floor(Math.random() * (95 - 75 + 1)) + 75,
            };
            const overallScore = Math.round((scores.speed + scores.seo + scores.responsive + scores.accessibility) / 4);

            const recommendations: string[] = [];
            if (scores.speed < 85) recommendations.push(recommendationsBank.speed[0]);
            if (scores.seo < 80) recommendations.push(recommendationsBank.seo[0]);
            if (scores.responsive < 95) recommendations.push(recommendationsBank.responsive[0]);
            if (scores.accessibility < 90) recommendations.push(recommendationsBank.accessibility[0]);
             if (recommendations.length < 3) {
                 recommendations.push("Implementar un Caching de Navegador efectivo.");
             }


            setResults({ overallScore, scores, recommendations });
            setIsLoading(false);
        }, 2000);
    };

    return (
        <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <Input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Introduce la URL de tu sitio web (ej. misitio.com)"
                        className="flex-grow text-base"
                        disabled={isLoading}
                    />
                    <Button onClick={handleAnalyze} className="w-full sm:w-auto" disabled={isLoading}>
                        <Search className="w-4 h-4 mr-2" />
                        {isLoading ? 'Analizando...' : 'Analizar Sitio'}
                    </Button>
                </div>
                 {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <AnimatePresence>
                    {isLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10">
                            <div className="flex justify-center items-center gap-2">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                <p className="text-lg text-muted-foreground">Realizando análisis, por favor espera...</p>
                            </div>
                        </motion.div>
                    )}
                    {results && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-1 flex flex-col items-center justify-center bg-card/50 p-6 rounded-lg">
                                    <p className="text-muted-foreground">Puntuación General</p>
                                    <p className={`text-6xl font-bold ${getScoreColor(results.overallScore).replace('bg-', 'text-')}`}>
                                        {results.overallScore}
                                    </p>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                   {Object.entries(results.scores).map(([key, value]) => {
                                        const details = categoryDetails[key as ScoreCategory];
                                        return (
                                            <div key={key}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="font-medium flex items-center gap-2">
                                                        {React.cloneElement(details.icon, { className: "w-5 h-5 text-muted-foreground" })}
                                                        {details.title}
                                                    </p>
                                                    <p className={`font-semibold ${getScoreColor(value).replace('bg-', 'text-')}`}>{value}/100</p>
                                                </div>
                                                <Progress value={value} indicatorClassName={getScoreColor(value)} />
                                            </div>
                                        )
                                   })}
                                </div>
                            </div>
                             <Card className="mt-6 bg-card/50">
                                <CardHeader>
                                    <CardTitle>Recomendaciones Clave</CardTitle>
                                    <CardDescription>Aquí tienes algunas acciones para mejorar la salud de tu sitio web.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {results.recommendations.map((rec, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span className="text-foreground/80">{rec}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}

export default WebsiteAnalyzer;
