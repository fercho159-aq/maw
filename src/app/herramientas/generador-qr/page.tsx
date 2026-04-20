"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download, Copy, Check, Link as LinkIcon, Phone, Mail, MessageSquare, Wifi, CreditCard, MapPin, ArrowLeft, Palette } from "lucide-react";
import { QRCodeCanvas } from 'qrcode.react';

type QRType = 'url' | 'text' | 'phone' | 'email' | 'sms' | 'wifi' | 'vcard' | 'location';

const qrColors = [
    { name: "Negro", fg: "#000000", bg: "#FFFFFF" },
    { name: "Azul", fg: "#1E40AF", bg: "#FFFFFF" },
    { name: "Morado", fg: "#7C3AED", bg: "#FFFFFF" },
    { name: "Verde", fg: "#059669", bg: "#FFFFFF" },
    { name: "Rojo", fg: "#DC2626", bg: "#FFFFFF" },
    { name: "Naranja", fg: "#EA580C", bg: "#FFFFFF" },
];

export default function GeneradorQRPage() {
    const [qrValue, setQrValue] = useState("");
    const [qrType, setQrType] = useState<QRType>("url");
    const [copied, setCopied] = useState(false);
    const [selectedColor, setSelectedColor] = useState(qrColors[0]);
    const [qrSize, setQrSize] = useState(200);

    // WiFi fields
    const [wifiSSID, setWifiSSID] = useState("");
    const [wifiPassword, setWifiPassword] = useState("");
    const [wifiEncryption, setWifiEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");

    // vCard fields
    const [vcardName, setVcardName] = useState("");
    const [vcardPhone, setVcardPhone] = useState("");
    const [vcardEmail, setVcardEmail] = useState("");
    const [vcardOrg, setVcardOrg] = useState("");

    // Location fields
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const generateQRContent = (): string => {
        switch (qrType) {
            case 'url':
                return qrValue.startsWith('http') ? qrValue : `https://${qrValue}`;
            case 'text':
                return qrValue;
            case 'phone':
                return `tel:${qrValue}`;
            case 'email':
                return `mailto:${qrValue}`;
            case 'sms':
                return `sms:${qrValue}`;
            case 'wifi':
                return `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;`;
            case 'vcard':
                return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nFN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nORG:${vcardOrg}\nEND:VCARD`;
            case 'location':
                return `geo:${latitude},${longitude}`;
            default:
                return qrValue;
        }
    };

    const hasContent = (): boolean => {
        switch (qrType) {
            case 'wifi':
                return wifiSSID.length > 0;
            case 'vcard':
                return vcardName.length > 0 || vcardPhone.length > 0 || vcardEmail.length > 0;
            case 'location':
                return latitude.length > 0 && longitude.length > 0;
            default:
                return qrValue.length > 0;
        }
    };

    const downloadQR = () => {
        const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `qr-code-${Date.now()}.png`;
            link.href = url;
            link.click();
        }
    };

    const copyQRImage = async () => {
        const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
        if (canvas) {
            canvas.toBlob(async (blob) => {
                if (blob) {
                    try {
                        await navigator.clipboard.write([
                            new ClipboardItem({ 'image/png': blob })
                        ]);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    } catch (err) {
                        console.error('Error copying image:', err);
                    }
                }
            });
        }
    };

    const qrTypes = [
        { value: 'url', label: 'URL', icon: <LinkIcon className="w-4 h-4" /> },
        { value: 'text', label: 'Texto', icon: <MessageSquare className="w-4 h-4" /> },
        { value: 'phone', label: 'Teléfono', icon: <Phone className="w-4 h-4" /> },
        { value: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
        { value: 'sms', label: 'SMS', icon: <MessageSquare className="w-4 h-4" /> },
        { value: 'wifi', label: 'WiFi', icon: <Wifi className="w-4 h-4" /> },
        { value: 'vcard', label: 'Contacto', icon: <CreditCard className="w-4 h-4" /> },
        { value: 'location', label: 'Ubicación', icon: <MapPin className="w-4 h-4" /> },
    ];

    const renderInputFields = () => {
        switch (qrType) {
            case 'wifi':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="wifi-ssid">Nombre de la red (SSID)</Label>
                            <Input
                                id="wifi-ssid"
                                placeholder="Mi Red WiFi"
                                value={wifiSSID}
                                onChange={(e) => setWifiSSID(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="wifi-password">Contraseña</Label>
                            <Input
                                id="wifi-password"
                                type="password"
                                placeholder="Contraseña de la red"
                                value={wifiPassword}
                                onChange={(e) => setWifiPassword(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Tipo de encriptación</Label>
                            <div className="flex gap-2">
                                {['WPA', 'WEP', 'nopass'].map((enc) => (
                                    <Button
                                        key={enc}
                                        type="button"
                                        variant={wifiEncryption === enc ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setWifiEncryption(enc as "WPA" | "WEP" | "nopass")}
                                    >
                                        {enc === 'nopass' ? 'Sin contraseña' : enc}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'vcard':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="vcard-name">Nombre completo</Label>
                            <Input
                                id="vcard-name"
                                placeholder="Juan Pérez"
                                value={vcardName}
                                onChange={(e) => setVcardName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="vcard-phone">Teléfono</Label>
                            <Input
                                id="vcard-phone"
                                placeholder="+52 123 456 7890"
                                value={vcardPhone}
                                onChange={(e) => setVcardPhone(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="vcard-email">Email</Label>
                            <Input
                                id="vcard-email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={vcardEmail}
                                onChange={(e) => setVcardEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="vcard-org">Organización</Label>
                            <Input
                                id="vcard-org"
                                placeholder="Nombre de la empresa"
                                value={vcardOrg}
                                onChange={(e) => setVcardOrg(e.target.value)}
                            />
                        </div>
                    </div>
                );
            case 'location':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="latitude">Latitud</Label>
                            <Input
                                id="latitude"
                                placeholder="19.4326"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="longitude">Longitud</Label>
                            <Input
                                id="longitude"
                                placeholder="-99.1332"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                            />
                        </div>
                    </div>
                );
            default:
                const placeholders: Record<string, string> = {
                    url: 'https://ejemplo.com',
                    text: 'Escribe tu mensaje aquí...',
                    phone: '+52 123 456 7890',
                    email: 'correo@ejemplo.com',
                    sms: '+52 123 456 7890',
                };
                return (
                    <div className="space-y-2">
                        <Label htmlFor="qr-input">{qrTypes.find(t => t.value === qrType)?.label || 'Contenido'}</Label>
                        <Input
                            id="qr-input"
                            placeholder={placeholders[qrType] || 'Ingresa el contenido...'}
                            value={qrValue}
                            onChange={(e) => setQrValue(e.target.value)}
                        />
                    </div>
                );
        }
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
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-foreground">
                        <QrCode className="w-7 h-7 text-background" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Generador de Códigos QR</h1>
                        <p className="text-muted-foreground">
                            Crea códigos QR personalizados de forma rápida y gratuita
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
                {/* Panel de Configuración */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <QrCode className="w-5 h-5" />
                            Configuración
                        </CardTitle>
                        <CardDescription>
                            Selecciona el tipo de QR y completa la información
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Tipo de QR */}
                        <div className="space-y-2">
                            <Label>Tipo de QR</Label>
                            <div className="grid grid-cols-4 gap-2">
                                {qrTypes.map((type) => (
                                    <Button
                                        key={type.value}
                                        type="button"
                                        variant={qrType === type.value ? "default" : "outline"}
                                        size="sm"
                                        className="flex flex-col items-center gap-1 h-auto py-3"
                                        onClick={() => {
                                            setQrType(type.value as QRType);
                                            setQrValue("");
                                        }}
                                    >
                                        {type.icon}
                                        <span className="text-xs">{type.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Campos de entrada dinámicos */}
                        {renderInputFields()}

                        {/* Color del QR */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Palette className="w-4 h-4" />
                                Color del QR
                            </Label>
                            <div className="flex gap-2 flex-wrap">
                                {qrColors.map((color) => (
                                    <button
                                        key={color.name}
                                        type="button"
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor.name === color.name ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                        style={{ backgroundColor: color.fg }}
                                        onClick={() => setSelectedColor(color)}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Tamaño del QR */}
                        <div className="space-y-2">
                            <Label>Tamaño: {qrSize}px</Label>
                            <input
                                type="range"
                                min="150"
                                max="400"
                                value={qrSize}
                                onChange={(e) => setQrSize(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Panel de Vista Previa */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Vista Previa</CardTitle>
                        <CardDescription>
                            Tu código QR listo para usar
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border" style={{ maxWidth: qrSize + 48 }}>
                            {hasContent() ? (
                                <QRCodeCanvas
                                    id="qr-code"
                                    value={generateQRContent()}
                                    size={qrSize}
                                    level="H"
                                    includeMargin={true}
                                    fgColor={selectedColor.fg}
                                    bgColor={selectedColor.bg}
                                />
                            ) : (
                                <div
                                    className="flex items-center justify-center bg-gray-50 rounded-xl"
                                    style={{ width: qrSize, height: qrSize }}
                                >
                                    <div className="text-center text-gray-400 p-4">
                                        <QrCode className="w-16 h-16 mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">Ingresa contenido para generar el QR</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {hasContent() && (
                            <div className="flex gap-3 flex-wrap justify-center">
                                <Button
                                    onClick={downloadQR}
                                    className="flex items-center gap-2"
                                    size="lg"
                                >
                                    <Download className="w-4 h-4" />
                                    Descargar PNG
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={copyQRImage}
                                    className="flex items-center gap-2"
                                    size="lg"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            ¡Copiado!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            Copiar
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Info Section */}
            <div className="max-w-3xl mx-auto mt-12 text-center">
                <h2 className="text-2xl font-bold mb-4">¿Qué puedes hacer con códigos QR?</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-left">
                    <div className="p-4 rounded-lg bg-muted/50">
                        <LinkIcon className="w-5 h-5 mb-2 text-foreground" />
                        <h3 className="font-semibold mb-1">Enlaces</h3>
                        <p className="text-sm text-muted-foreground">Redirige a tu sitio web, redes sociales o cualquier URL.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                        <Wifi className="w-5 h-5 mb-2 text-foreground" />
                        <h3 className="font-semibold mb-1">WiFi</h3>
                        <p className="text-sm text-muted-foreground">Comparte la conexión WiFi sin revelar la contraseña.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                        <CreditCard className="w-5 h-5 mb-2 text-foreground" />
                        <h3 className="font-semibold mb-1">Contactos</h3>
                        <p className="text-sm text-muted-foreground">Crea tarjetas de presentación digitales.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                        <MapPin className="w-5 h-5 mb-2 text-foreground" />
                        <h3 className="font-semibold mb-1">Ubicaciones</h3>
                        <p className="text-sm text-muted-foreground">Comparte coordenadas de tu negocio o evento.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
