"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QrCode, Wrench, MapPin } from "lucide-react";

const tools = [
    {
        title: "Generador de Códigos QR",
        description: "Crea códigos QR para URLs, texto, contactos, WiFi, ubicaciones y más. Descarga en PNG o copia al portapapeles.",
        href: "/herramientas/generador-qr",
        icon: <QrCode className="w-8 h-8" />,
    },
    {
        title: "Extractor de Google Maps",
        description: "Extrae información de negocios desde búsquedas de Google Maps. Obtén nombre, dirección, teléfono, sitio web y calificaciones en CSV.",
        href: "/herramientas/extractor-maps",
        icon: <MapPin className="w-8 h-8" />,
        isNew: true,
    },
];

export default function HerramientasPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            {/* Header Section */}
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-foreground mb-6">
                    <Wrench className="w-8 h-8 text-background" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    Herramientas Gratuitas
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Utilidades prácticas para tu trabajo diario. Sin registro, sin complicaciones.
                </p>
            </div>

            {/* Tools Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {tools.map((tool) => (
                    <Link key={tool.href} href={tool.href} className="group">
                        <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-foreground/10 hover:-translate-y-1 border-2 hover:border-foreground/20 relative overflow-hidden">
                            {'isNew' in tool && tool.isNew && (
                                <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    NUEVO
                                </div>
                            )}
                            <CardHeader>
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-foreground mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <div className="text-background">
                                        {tool.icon}
                                    </div>
                                </div>
                                <CardTitle className="text-xl group-hover:text-foreground/80 transition-colors">
                                    {tool.title}
                                </CardTitle>
                                <CardDescription className="text-base">
                                    {tool.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <span className="text-sm font-medium text-foreground group-hover:underline">
                                    Usar herramienta →
                                </span>
                            </CardContent>
                        </Card>
                    </Link>
                ))}

                {/* Coming Soon Card */}
                <Card className="h-full border-dashed border-2 opacity-60">
                    <CardHeader>
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-muted mb-4">
                            <Wrench className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-xl text-muted-foreground">
                            Próximamente...
                        </CardTitle>
                        <CardDescription className="text-base">
                            Estamos trabajando en más herramientas útiles para ti.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}
