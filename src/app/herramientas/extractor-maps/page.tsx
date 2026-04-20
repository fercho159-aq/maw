"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    MapPin,
    Download,
    ArrowLeft,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Building2,
    Phone,
    Globe,
    Star,
    FileSpreadsheet,
    Search,
    Settings2
} from "lucide-react";

interface BusinessData {
    nombre: string;
    categoria: string;
    direccion: string;
    telefono: string;
    sitio_web: string;
    calificacion: string;
    num_resenas: string;
    url: string;
}

export default function ExtractorMapsPage() {
    const [url, setUrl] = useState("");
    const [maxResults, setMaxResults] = useState(50);
    const [scrolls, setScrolls] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState("");
    const [error, setError] = useState("");
    const [businesses, setBusinesses] = useState<BusinessData[]>([]);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const isValidUrl = (urlToCheck: string): boolean => {
        return urlToCheck.includes('google.com/maps') || urlToCheck.includes('maps.google.com');
    };

    const handleExtract = async () => {
        if (!url.trim()) {
            setError("Por favor ingresa una URL de Google Maps");
            return;
        }

        if (!isValidUrl(url)) {
            setError("La URL debe ser de Google Maps (google.com/maps)");
            return;
        }

        setIsLoading(true);
        setError("");
        setProgress("Iniciando extracción...");
        setBusinesses([]);

        abortControllerRef.current = new AbortController();

        try {
            setProgress("Conectando con Google Maps... (esto puede tomar varios minutos)");

            const response = await fetch('/api/scraper-maps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: url.trim(),
                    maxResults,
                    scrolls
                }),
                signal: abortControllerRef.current.signal
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al extraer datos');
            }

            setBusinesses(data.data);
            setProgress(`✓ Se encontraron ${data.total} negocios`);

        } catch (err) {
            if (err instanceof Error) {
                if (err.name === 'AbortError') {
                    setError("Extracción cancelada");
                } else if (err.message.includes('localOnly') || err.message.includes('Chrome no disponible') || err.message.includes('Servicio no disponible')) {
                    setError("⚠️ Esta herramienta funciona en desarrollo local. Para usarla en producción, contacta al administrador para configurar el servicio de navegador remoto.");
                } else {
                    setError(err.message);
                }
            } else {
                setError("Error desconocido");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const downloadCSV = () => {
        if (businesses.length === 0) return;

        const headers = ['Nombre', 'Categoría', 'Dirección', 'Teléfono', 'Sitio Web', 'Calificación', 'Num. Reseñas', 'URL'];
        const csvContent = [
            headers.join(','),
            ...businesses.map(b => [
                `"${(b.nombre || '').replace(/"/g, '""')}"`,
                `"${(b.categoria || '').replace(/"/g, '""')}"`,
                `"${(b.direccion || '').replace(/"/g, '""')}"`,
                `"${(b.telefono || '').replace(/"/g, '""')}"`,
                `"${(b.sitio_web || '').replace(/"/g, '""')}"`,
                `"${(b.calificacion || '').replace(/"/g, '""')}"`,
                `"${(b.num_resenas || '').replace(/"/g, '""')}"`,
                `"${(b.url || '').replace(/"/g, '""')}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `negocios-maps-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            {/* Back Button & Header */}
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/herramientas" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Volver a Herramientas
                    </Link>
                </Button>
                <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                        <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Extractor de Google Maps</h1>
                        <p className="text-muted-foreground">
                            Extrae información de negocios desde búsquedas de Google Maps
                        </p>
                    </div>
                </div>
            </div>

            {/* Beta Notice */}
            <div className="max-w-6xl mx-auto mb-6">
                <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div className="text-sm text-amber-700 dark:text-amber-400">
                        <span className="font-semibold">🧪 Beta:</span> Esta herramienta está en desarrollo.
                        Funciona mejor ejecutándola localmente. En producción, requiere configuración de servicio de navegador remoto (Browserless.io).
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
                {/* Panel de Configuración */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="w-5 h-5" />
                            Configuración
                        </CardTitle>
                        <CardDescription>
                            Pega la URL de búsqueda de Google Maps y configura la extracción
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* URL Input */}
                        <div className="space-y-2">
                            <Label htmlFor="maps-url">URL de Google Maps</Label>
                            <Input
                                id="maps-url"
                                placeholder="https://www.google.com/maps/search/restaurantes+cdmx"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="font-mono text-sm"
                            />
                            <p className="text-xs text-muted-foreground">
                                Busca en Google Maps el negocio o categoría que desees y copia la URL completa
                            </p>
                        </div>

                        {/* Advanced Options Toggle */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="flex items-center gap-2"
                        >
                            <Settings2 className="w-4 h-4" />
                            Opciones avanzadas
                        </Button>

                        {showAdvanced && (
                            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                                <div className="space-y-2">
                                    <Label htmlFor="max-results">Máximo de resultados: {maxResults}</Label>
                                    <input
                                        type="range"
                                        id="max-results"
                                        min="10"
                                        max="200"
                                        step="10"
                                        value={maxResults}
                                        onChange={(e) => setMaxResults(Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="scrolls">Scrolls de carga: {scrolls}</Label>
                                    <input
                                        type="range"
                                        id="scrolls"
                                        min="5"
                                        max="50"
                                        step="5"
                                        value={scrolls}
                                        onChange={(e) => setScrolls(Number(e.target.value))}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Más scrolls = más resultados pero mayor tiempo
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            {!isLoading ? (
                                <Button
                                    onClick={handleExtract}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                                    size="lg"
                                    disabled={!url.trim()}
                                >
                                    <Search className="w-4 h-4" />
                                    Iniciar Extracción
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleCancel}
                                    variant="destructive"
                                    className="flex-1 flex items-center justify-center gap-2"
                                    size="lg"
                                >
                                    Cancelar
                                </Button>
                            )}
                        </div>

                        {/* Status Messages */}
                        {isLoading && (
                            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                                <div>
                                    <p className="font-medium text-blue-700 dark:text-blue-400">Procesando...</p>
                                    <p className="text-sm text-blue-600 dark:text-blue-500">{progress}</p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                                <p className="text-red-700 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        {businesses.length > 0 && !isLoading && (
                            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <div className="flex-1">
                                    <p className="font-medium text-green-700 dark:text-green-400">
                                        ¡Extracción completada!
                                    </p>
                                    <p className="text-sm text-green-600 dark:text-green-500">
                                        {businesses.length} negocios encontrados
                                    </p>
                                </div>
                                <Button
                                    onClick={downloadCSV}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Descargar CSV
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Panel de Resultados */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileSpreadsheet className="w-5 h-5" />
                            Resultados
                            {businesses.length > 0 && (
                                <span className="ml-auto text-sm font-normal bg-foreground/10 px-2 py-1 rounded">
                                    {businesses.length} negocios
                                </span>
                            )}
                        </CardTitle>
                        <CardDescription>
                            Vista previa de los datos extraídos
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {businesses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                                <MapPin className="w-16 h-16 mb-4 opacity-20" />
                                <p className="text-lg font-medium mb-2">Sin resultados aún</p>
                                <p className="text-sm">Los negocios extraídos aparecerán aquí</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                                {businesses.slice(0, 20).map((business, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                                                <Building2 className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold truncate">{business.nombre}</h4>
                                                {business.categoria && (
                                                    <p className="text-sm text-muted-foreground">{business.categoria}</p>
                                                )}
                                                <div className="mt-2 space-y-1">
                                                    {business.direccion && (
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <MapPin className="w-3 h-3" />
                                                            <span className="truncate">{business.direccion}</span>
                                                        </div>
                                                    )}
                                                    {business.telefono && (
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <Phone className="w-3 h-3" />
                                                            <span>{business.telefono}</span>
                                                        </div>
                                                    )}
                                                    {business.sitio_web && (
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <Globe className="w-3 h-3" />
                                                            <a href={business.sitio_web} target="_blank" rel="noopener noreferrer" className="truncate hover:underline text-blue-600">
                                                                {business.sitio_web.replace(/^https?:\/\//, '').slice(0, 30)}...
                                                            </a>
                                                        </div>
                                                    )}
                                                    {business.calificacion && (
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <Star className="w-3 h-3 text-yellow-500" />
                                                            <span>{business.calificacion}</span>
                                                            {business.num_resenas && (
                                                                <span className="text-muted-foreground">({business.num_resenas} reseñas)</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {businesses.length > 20 && (
                                    <p className="text-center text-sm text-muted-foreground py-4">
                                        ... y {businesses.length - 20} negocios más. Descarga el CSV para ver todos.
                                    </p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Info Section */}
            <div className="max-w-4xl mx-auto mt-12">
                <h2 className="text-2xl font-bold mb-6 text-center">¿Cómo funciona?</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">1. Busca en Maps</h3>
                        <p className="text-sm text-muted-foreground">
                            Ve a Google Maps y busca la categoría o tipo de negocio que necesitas en tu zona
                        </p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 border border-green-200 dark:border-green-800">
                        <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center mb-4">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">2. Copia la URL</h3>
                        <p className="text-sm text-muted-foreground">
                            Copia la URL completa del navegador y pégala en esta herramienta
                        </p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 border border-purple-200 dark:border-purple-800">
                        <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center mb-4">
                            <Download className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">3. Descarga CSV</h3>
                        <p className="text-sm text-muted-foreground">
                            Obtén un archivo CSV con nombre, dirección, teléfono, sitio web y calificación
                        </p>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-yellow-700 dark:text-yellow-400">
                            <p className="font-medium mb-1">Nota importante</p>
                            <p>Esta herramienta está diseñada para uso con propósitos legítimos de investigación de mercado.
                                El uso excesivo puede resultar en bloqueos temporales por parte de Google.
                                Respeta los términos de servicio de Google Maps.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
