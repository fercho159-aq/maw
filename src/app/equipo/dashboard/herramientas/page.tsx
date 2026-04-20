"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { QrCode, Download, Copy, Check, Link, Phone, Mail, MessageSquare, Wifi, CreditCard, MapPin, BarChart3, Trash2, Power, ExternalLink, Eye, Loader2 } from "lucide-react";
import { QRCodeCanvas } from 'qrcode.react';
import { useAuth } from "@/lib/auth-provider";

type QRType = 'url' | 'text' | 'phone' | 'email' | 'sms' | 'wifi' | 'vcard' | 'location';

interface TrackedQR {
    id: number;
    shortId: string;
    name: string;
    qrType: string;
    originalContent: string;
    scanCount: number;
    createdBy: string;
    createdAt: string;
    active: boolean;
}

interface QRScan {
    id: number;
    qrCodeId: number;
    scannedAt: string;
    userAgent: string | null;
    ipHash: string | null;
}

export default function HerramientasPage() {
    const { user } = useAuth();
    const [qrValue, setQrValue] = useState("");
    const [qrType, setQrType] = useState<QRType>("url");
    const [copied, setCopied] = useState(false);

    // Tracking state
    const [trackScans, setTrackScans] = useState(false);
    const [qrName, setQrName] = useState("");
    const [saving, setSaving] = useState(false);
    const [savedMessage, setSavedMessage] = useState("");
    const [trackingUrl, setTrackingUrl] = useState<string | null>(null);

    // Tracked QRs list
    const [trackedQRs, setTrackedQRs] = useState<TrackedQR[]>([]);
    const [loadingQRs, setLoadingQRs] = useState(false);

    // Stats dialog
    const [statsDialogOpen, setStatsDialogOpen] = useState(false);
    const [selectedQRStats, setSelectedQRStats] = useState<{ qr: TrackedQR; scans: QRScan[]; totalScans: number } | null>(null);
    const [loadingStats, setLoadingStats] = useState(false);

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

    const fetchTrackedQRs = useCallback(async () => {
        if (!user?.id) return;
        setLoadingQRs(true);
        try {
            const res = await fetch(`/api/qr?userId=${user.id}`);
            if (res.ok) {
                const data = await res.json();
                setTrackedQRs(data);
            }
        } catch (error) {
            console.error('Error fetching tracked QRs:', error);
        } finally {
            setLoadingQRs(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchTrackedQRs();
    }, [fetchTrackedQRs]);

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

    const getQRDisplayContent = (): string => {
        if (trackingUrl) return trackingUrl;
        return generateQRContent();
    };

    const handleSaveTrackedQR = async () => {
        if (!user?.id || !qrName.trim()) return;
        setSaving(true);
        setSavedMessage("");
        try {
            const res = await fetch('/api/qr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: qrName,
                    qrType,
                    originalContent: generateQRContent(),
                    createdBy: user.id,
                }),
            });
            if (res.ok) {
                const newQr = await res.json();
                const newTrackingUrl = `${window.location.origin}/api/qr/${newQr.shortId}`;
                setTrackingUrl(newTrackingUrl);
                setSavedMessage(`QR guardado. Ahora el QR apunta a la URL de rastreo. Descárgalo o cópialo.`);
                setQrName("");
                fetchTrackedQRs();
            } else {
                setSavedMessage("Error al guardar el QR");
            }
        } catch {
            setSavedMessage("Error al guardar el QR");
        } finally {
            setSaving(false);
        }
    };

    const handleToggleActive = async (qr: TrackedQR) => {
        try {
            const res = await fetch('/api/qr', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: qr.id, active: !qr.active }),
            });
            if (res.ok) {
                fetchTrackedQRs();
            }
        } catch (error) {
            console.error('Error toggling QR:', error);
        }
    };

    const handleDeleteQR = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este QR?')) return;
        try {
            const res = await fetch(`/api/qr?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchTrackedQRs();
            }
        } catch (error) {
            console.error('Error deleting QR:', error);
        }
    };

    const handleViewStats = async (qr: TrackedQR) => {
        setStatsDialogOpen(true);
        setLoadingStats(true);
        setSelectedQRStats(null);
        try {
            const res = await fetch(`/api/qr/${qr.shortId}/stats`);
            if (res.ok) {
                const data = await res.json();
                setSelectedQRStats(data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoadingStats(false);
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
        { value: 'url', label: 'URL', icon: <Link className="w-4 h-4" /> },
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

    const getTrackingUrl = (shortId: string) => {
        if (typeof window !== 'undefined') {
            return `${window.location.origin}/api/qr/${shortId}`;
        }
        return `/api/qr/${shortId}`;
    };

    const parseUserAgent = (ua: string | null): string => {
        if (!ua) return 'Desconocido';
        if (ua.includes('iPhone')) return 'iPhone';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iPad')) return 'iPad';
        if (ua.includes('Windows')) return 'Windows';
        if (ua.includes('Mac')) return 'Mac';
        if (ua.includes('Linux')) return 'Linux';
        return 'Otro';
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Herramientas</h1>
                <p className="text-muted-foreground">
                    Herramientas útiles para tu trabajo diario
                </p>
            </div>

            <Tabs defaultValue="qr" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
                    <TabsTrigger value="qr" className="flex items-center gap-2">
                        <QrCode className="w-4 h-4" />
                        Generador de QR
                    </TabsTrigger>
                    <TabsTrigger value="tracked" className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        QRs con Rastreo
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="qr" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Panel de Configuración */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <QrCode className="w-5 h-5" />
                                    Generador de Código QR
                                </CardTitle>
                                <CardDescription>
                                    Crea códigos QR para URLs, texto, contactos, WiFi y más
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
                                                className="flex flex-col items-center gap-1 h-auto py-2"
                                                onClick={() => {
                                                    setQrType(type.value as QRType);
                                                    setQrValue("");
                                                    setTrackingUrl(null);
                                                    setSavedMessage("");
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

                                {/* Toggle de rastreo - solo para URL */}
                                {qrType === 'url' && (
                                    <div className="space-y-4 border-t pt-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label htmlFor="track-scans">Rastrear escaneos</Label>
                                                <p className="text-xs text-muted-foreground">
                                                    Registra cuántas personas escanean este QR
                                                </p>
                                            </div>
                                            <Switch
                                                id="track-scans"
                                                checked={trackScans}
                                                onCheckedChange={(v) => {
                                                    setTrackScans(v);
                                                    if (!v) {
                                                        setTrackingUrl(null);
                                                        setSavedMessage("");
                                                    }
                                                }}
                                            />
                                        </div>

                                        {trackScans && (
                                            <>
                                                <div className="space-y-2">
                                                    <Label htmlFor="qr-name">Nombre del QR</Label>
                                                    <Input
                                                        id="qr-name"
                                                        placeholder="Ej: Flyer evento marzo"
                                                        value={qrName}
                                                        onChange={(e) => setQrName(e.target.value)}
                                                    />
                                                </div>
                                                <Button
                                                    onClick={handleSaveTrackedQR}
                                                    disabled={!hasContent() || !qrName.trim() || saving}
                                                    className="w-full"
                                                >
                                                    {saving ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                            Guardando...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <BarChart3 className="w-4 h-4 mr-2" />
                                                            Guardar QR con Rastreo
                                                        </>
                                                    )}
                                                </Button>
                                                {savedMessage && (
                                                    <p className="text-sm text-green-600 bg-green-50 p-2 rounded break-all">
                                                        {savedMessage}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Panel de Vista Previa */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Vista Previa</CardTitle>
                                <CardDescription>
                                    Vista previa de tu código QR
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center space-y-4">
                                <div className="bg-white p-6 rounded-lg shadow-inner border">
                                    {hasContent() ? (
                                        <QRCodeCanvas
                                            id="qr-code"
                                            value={getQRDisplayContent()}
                                            size={200}
                                            level="H"
                                            includeMargin={true}
                                        />
                                    ) : (
                                        <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-100 rounded">
                                            <div className="text-center text-gray-400">
                                                <QrCode className="w-16 h-16 mx-auto mb-2 opacity-30" />
                                                <p className="text-sm">Ingresa contenido para generar el QR</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {hasContent() && (
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={downloadQR}
                                            className="flex items-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Descargar PNG
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={copyQRImage}
                                            className="flex items-center gap-2"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Copiado
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
                </TabsContent>

                {/* Tab de QRs con Rastreo */}
                <TabsContent value="tracked" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                QRs con Rastreo
                            </CardTitle>
                            <CardDescription>
                                Códigos QR que están rastreando escaneos
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loadingQRs ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                                </div>
                            ) : trackedQRs.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <QrCode className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                    <p>No tienes QRs con rastreo aún.</p>
                                    <p className="text-sm">Activa &quot;Rastrear escaneos&quot; al crear un QR de tipo URL.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nombre</TableHead>
                                                <TableHead>URL Original</TableHead>
                                                <TableHead className="text-center">Escaneos</TableHead>
                                                <TableHead>Fecha</TableHead>
                                                <TableHead>Estado</TableHead>
                                                <TableHead className="text-right">Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {trackedQRs.map((qr) => (
                                                <TableRow key={qr.id}>
                                                    <TableCell className="font-medium">{qr.name}</TableCell>
                                                    <TableCell className="max-w-[200px] truncate">
                                                        <a
                                                            href={qr.originalContent}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline flex items-center gap-1"
                                                        >
                                                            {qr.originalContent.replace(/^https?:\/\//, '').substring(0, 30)}
                                                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                                        </a>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Badge variant="secondary" className="font-mono">
                                                            {qr.scanCount}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-sm text-muted-foreground">
                                                        {new Date(qr.createdAt).toLocaleDateString('es-MX')}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={qr.active ? "default" : "destructive"}>
                                                            {qr.active ? 'Activo' : 'Inactivo'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                title="Ver estadísticas"
                                                                onClick={() => handleViewStats(qr)}
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                title={qr.active ? 'Desactivar' : 'Activar'}
                                                                onClick={() => handleToggleActive(qr)}
                                                            >
                                                                <Power className={`w-4 h-4 ${qr.active ? 'text-green-600' : 'text-red-600'}`} />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                title="Eliminar"
                                                                onClick={() => handleDeleteQR(qr.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4 text-red-500" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Dialog de Estadísticas */}
            <Dialog open={statsDialogOpen} onOpenChange={setStatsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Estadísticas del QR</DialogTitle>
                        <DialogDescription>
                            {selectedQRStats?.qr.name}
                        </DialogDescription>
                    </DialogHeader>
                    {loadingStats ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : selectedQRStats ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold">{selectedQRStats.totalScans}</p>
                                            <p className="text-sm text-muted-foreground">Escaneos totales</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <p className="text-sm font-medium break-all">{getTrackingUrl(selectedQRStats.qr.shortId)}</p>
                                            <p className="text-sm text-muted-foreground mt-1">URL de rastreo</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {selectedQRStats.scans.length > 0 ? (
                                <div>
                                    <h4 className="font-medium mb-2">Últimos escaneos</h4>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Fecha</TableHead>
                                                <TableHead>Dispositivo</TableHead>
                                                <TableHead>IP (hash)</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {selectedQRStats.scans.map((scan) => (
                                                <TableRow key={scan.id}>
                                                    <TableCell className="text-sm">
                                                        {new Date(scan.scannedAt).toLocaleString('es-MX')}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">
                                                            {parseUserAgent(scan.userAgent)}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs">
                                                        {scan.ipHash?.substring(0, 8) || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-4">
                                    Aún no hay escaneos registrados.
                                </p>
                            )}
                        </div>
                    ) : null}
                </DialogContent>
            </Dialog>
        </div>
    );
}
