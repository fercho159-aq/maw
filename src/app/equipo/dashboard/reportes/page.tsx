"use client";

// Generador de reportes de campañas (Meta Ads / Google Ads).
// Todo ocurre en el navegador: CSV/ZIP se parsean localmente y el PDF
// se genera con el diálogo de impresión (Guardar como PDF), 1:1 con el diseño.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import JSZip from "jszip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileUp, ImageIcon, Printer, RefreshCcw, Sparkles, Trash2 } from "lucide-react";
import { looksLikeMetaCsv, parseMetaCsv, defaultMetaTexts, MetaReportData, MetaTexts } from "@/lib/report/meta";
import { looksLikeGoogleCsv, parseGoogleFiles, defaultGoogleTexts, GoogleReportData, GoogleTexts } from "@/lib/report/google";
import { extractBrandColor } from "@/lib/report/logo-color";
import { MetaReportPages, fmtPeriod } from "@/components/report/meta-report";
import { GoogleReportPages } from "@/components/report/google-report";
import { PAGE_W, PAGE_H, ReportBrand } from "@/components/report/report-primitives";

const DEFAULT_EMAIL = "maestrosdelmediamdm@gmail.com";
const DEFAULT_COLOR = "#e11d1d";

type ReportKind = "meta" | "google";

function daysBetween(start: string, end: string): number {
    const a = new Date(start.replace(/\./g, "-"));
    const b = new Date(end.replace(/\./g, "-"));
    const diff = Math.round((b.getTime() - a.getTime()) / 86400000) + 1;
    return Number.isFinite(diff) && diff > 0 ? diff : 0;
}

export default function ReportesPage() {
    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState(DEFAULT_EMAIL);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [creativeUrl, setCreativeUrl] = useState<string | null>(null);
    const [brandColor, setBrandColor] = useState(DEFAULT_COLOR);
    const [brandColorDark, setBrandColorDark] = useState("#b91616");
    const [autoColor, setAutoColor] = useState(true);

    const [metaData, setMetaData] = useState<MetaReportData | null>(null);
    const [metaTexts, setMetaTexts] = useState<MetaTexts | null>(null);
    const [metaPeriod, setMetaPeriod] = useState("");

    const [googleData, setGoogleData] = useState<GoogleReportData | null>(null);
    const [googleTexts, setGoogleTexts] = useState<GoogleTexts | null>(null);
    const [googlePeriod, setGooglePeriod] = useState("");
    const googleFilesRef = useRef<{ name: string; text: string }[]>([]);

    const [activeReport, setActiveReport] = useState<ReportKind>("meta");
    const [message, setMessage] = useState("");
    const [mounted, setMounted] = useState(false);
    const [scale, setScale] = useState(0.5);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => setMounted(true), []);

    // Escala del preview según el ancho disponible
    useEffect(() => {
        const el = previewRef.current;
        if (!el) return;
        const update = () => setScale(Math.min(el.clientWidth / PAGE_W, 1));
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, [mounted]);

    const brand: ReportBrand = useMemo(() => ({
        color: brandColor,
        colorDark: brandColorDark,
        logoUrl,
        clientName: clientName || "Nombre del Cliente",
    }), [brandColor, brandColorDark, logoUrl, clientName]);

    const regenerateTexts = useCallback((kind?: ReportKind) => {
        if ((!kind || kind === "meta") && metaData) setMetaTexts(defaultMetaTexts(metaData, clientName));
        if ((!kind || kind === "google") && googleData) setGoogleTexts(defaultGoogleTexts(googleData, clientName));
    }, [metaData, googleData, clientName]);

    // ---------- carga de archivos ----------

    const handleDataFiles = async (files: FileList | null) => {
        if (!files?.length) return;
        setMessage("");
        const googleBatch: { name: string; text: string }[] = [];
        let loadedMeta = false;

        for (const file of Array.from(files)) {
            if (/\.zip$/i.test(file.name)) {
                try {
                    const zip = await JSZip.loadAsync(file);
                    for (const entry of Object.values(zip.files)) {
                        if (entry.dir || !/\.csv$/i.test(entry.name)) continue;
                        const text = await entry.async("text");
                        googleBatch.push({ name: entry.name, text });
                    }
                } catch {
                    setMessage(`No se pudo leer el ZIP "${file.name}".`);
                }
            } else if (/\.csv$/i.test(file.name)) {
                const text = await file.text();
                if (looksLikeMetaCsv(text)) {
                    try {
                        const parsed = parseMetaCsv(text);
                        setMetaData(parsed);
                        setMetaPeriod(fmtPeriod(parsed.periodStart, parsed.periodEnd));
                        loadedMeta = true;
                    } catch {
                        setMessage(`No se pudo interpretar "${file.name}" como reporte de Meta.`);
                    }
                } else if (looksLikeGoogleCsv(text)) {
                    googleBatch.push({ name: file.name, text });
                } else {
                    setMessage(`"${file.name}" no coincide con un export de Meta ni de Google Ads.`);
                }
            }
        }

        if (googleBatch.length) {
            googleFilesRef.current = [...googleFilesRef.current, ...googleBatch];
            try {
                const parsed = parseGoogleFiles(googleFilesRef.current);
                setGoogleData(parsed);
                setGooglePeriod(fmtPeriod(parsed.periodStart, parsed.periodEnd));
                if (!loadedMeta) setActiveReport("google");
            } catch {
                setMessage("No se pudieron interpretar los archivos de Google Ads.");
            }
        }
        if (loadedMeta) setActiveReport("meta");
    };

    // Regenerar textos automáticamente al cargar datos nuevos
    useEffect(() => {
        if (metaData) setMetaTexts(defaultMetaTexts(metaData, clientName));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaData]);
    useEffect(() => {
        if (googleData) setGoogleTexts(defaultGoogleTexts(googleData, clientName));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [googleData]);

    const handleLogo = async (files: FileList | null) => {
        const file = files?.[0];
        if (!file) return;
        const dataUrl = await new Promise<string>((res, rej) => {
            const reader = new FileReader();
            reader.onload = () => res(reader.result as string);
            reader.onerror = rej;
            reader.readAsDataURL(file);
        });
        setLogoUrl(dataUrl);
        if (autoColor) {
            try {
                const c = await extractBrandColor(dataUrl);
                setBrandColor(c.hex);
                setBrandColorDark(c.dark);
            } catch {
                setMessage("No se pudo extraer el color del logo; usa el selector manual.");
            }
        }
    };

    const handleCreative = async (files: FileList | null) => {
        const file = files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setCreativeUrl(reader.result as string);
        reader.readAsDataURL(file);
    };

    const clearAll = () => {
        setMetaData(null); setMetaTexts(null); setMetaPeriod("");
        setGoogleData(null); setGoogleTexts(null); setGooglePeriod("");
        googleFilesRef.current = [];
        setCreativeUrl(null);
        setMessage("");
    };

    const hasReport = (activeReport === "meta" && metaData && metaTexts) || (activeReport === "google" && googleData && googleTexts);

    const reportPages = (kind: ReportKind) => {
        if (kind === "meta" && metaData && metaTexts) {
            return (
                <MetaReportPages
                    data={metaData}
                    texts={metaTexts}
                    brand={brand}
                    period={metaPeriod}
                    email={email}
                    creativeUrl={creativeUrl}
                    periodDays={daysBetween(metaData.periodStart, metaData.periodEnd)}
                />
            );
        }
        if (kind === "google" && googleData && googleTexts) {
            return (
                <GoogleReportPages data={googleData} texts={googleTexts} brand={brand} period={googlePeriod} email={email} />
            );
        }
        return null;
    };

    const updatePriority = (kind: ReportKind, idx: number, field: "title" | "detail", value: string) => {
        if (kind === "meta" && metaTexts) {
            const priorities = metaTexts.priorities.map((p, i) => (i === idx ? { ...p, [field]: value } : p));
            setMetaTexts({ ...metaTexts, priorities });
        }
        if (kind === "google" && googleTexts) {
            const priorities = googleTexts.priorities.map((p, i) => (i === idx ? { ...p, [field]: value } : p));
            setGoogleTexts({ ...googleTexts, priorities });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reportes de Campañas</h1>
                    <p className="text-muted-foreground">
                        Sube los exports de Meta / Google Ads y el logo del cliente para generar el reporte en PDF.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={clearAll} disabled={!metaData && !googleData}>
                        <Trash2 className="mr-2 h-4 w-4" /> Limpiar
                    </Button>
                    <Button onClick={() => window.print()} disabled={!hasReport}>
                        <Printer className="mr-2 h-4 w-4" /> Descargar PDF
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
                {/* ---------- Panel de configuración ---------- */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <FileUp className="h-5 w-5" /> Datos de campaña
                            </CardTitle>
                            <CardDescription>
                                CSV de anuncios de Meta y/o ZIP «Tarjetas de descripción general» de Google Ads.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                type="file"
                                accept=".csv,.zip"
                                multiple
                                onChange={e => { handleDataFiles(e.target.files); e.target.value = ""; }}
                            />
                            <div className="flex flex-wrap gap-2">
                                <Badge variant={metaData ? "default" : "outline"}>
                                    Meta {metaData ? `· ${metaData.adsCount} ${metaData.level === "campaign" ? "campañas" : "anuncios"}` : "· sin datos"}
                                </Badge>
                                <Badge variant={googleData ? "default" : "outline"}>
                                    Google {googleData ? `· ${googleData.days.length} días` : "· sin datos"}
                                </Badge>
                            </div>
                            {message && <p className="text-sm text-destructive">{message}</p>}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <ImageIcon className="h-5 w-5" /> Marca del cliente
                            </CardTitle>
                            <CardDescription>El color se extrae automáticamente del logo.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="client-name">Nombre del cliente</Label>
                                <Input
                                    id="client-name"
                                    placeholder="Ej: Eléctrica San Miguel"
                                    value={clientName}
                                    onChange={e => setClientName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Logo (PNG con fondo transparente de preferencia)</Label>
                                <Input type="file" accept="image/*" onChange={e => handleLogo(e.target.files)} />
                            </div>
                            <div className="flex items-center gap-3">
                                {logoUrl && (
                                    <div className="flex h-14 w-28 items-center justify-center rounded border bg-white p-1">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={logoUrl} alt="logo" className="max-h-full max-w-full object-contain" />
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <Label htmlFor="brand-color" className="text-xs">Color de marca</Label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="brand-color"
                                            type="color"
                                            value={brandColor}
                                            onChange={e => {
                                                setAutoColor(false);
                                                setBrandColor(e.target.value);
                                                setBrandColorDark(e.target.value);
                                            }}
                                            className="h-9 w-14 cursor-pointer rounded border bg-transparent"
                                        />
                                        <span className="font-mono text-xs text-muted-foreground">{brandColor}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Imagen del anuncio (opcional, para el mock de Meta)</Label>
                                <Input type="file" accept="image/*" onChange={e => handleCreative(e.target.files)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="report-email">Correo de contacto</Label>
                                <Input id="report-email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <Button variant="secondary" className="w-full" onClick={() => regenerateTexts()} disabled={!metaData && !googleData}>
                                <RefreshCcw className="mr-2 h-4 w-4" /> Regenerar textos con estos datos
                            </Button>
                        </CardContent>
                    </Card>

                    {/* ---------- Textos editables ---------- */}
                    {((activeReport === "meta" && metaTexts) || (activeReport === "google" && googleTexts)) && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Sparkles className="h-5 w-5" /> Textos del reporte
                                </CardTitle>
                                <CardDescription>Sugeridos a partir de los datos; edítalos a gusto.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {activeReport === "meta" && metaTexts && metaData && (
                                    <>
                                        <div className="space-y-2">
                                            <Label>Título</Label>
                                            <Input value={metaTexts.reportTitle} onChange={e => setMetaTexts({ ...metaTexts, reportTitle: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Periodo</Label>
                                            <Input value={metaPeriod} onChange={e => setMetaPeriod(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Nota de la gráfica</Label>
                                            <Textarea rows={2} value={metaTexts.chartNote} onChange={e => setMetaTexts({ ...metaTexts, chartNote: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Concentración (detalle)</Label>
                                            <Textarea rows={3} value={metaTexts.concentrationDetail} onChange={e => setMetaTexts({ ...metaTexts, concentrationDetail: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Nota de costos</Label>
                                            <Textarea rows={2} value={metaTexts.expensiveNote} onChange={e => setMetaTexts({ ...metaTexts, expensiveNote: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Texto del anuncio (mock)</Label>
                                            <Textarea rows={3} value={metaTexts.adCopy} onChange={e => setMetaTexts({ ...metaTexts, adCopy: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <Label>Dominio</Label>
                                                <Input value={metaTexts.adDomain} onChange={e => setMetaTexts({ ...metaTexts, adDomain: e.target.value })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Ubicación</Label>
                                                <Input value={metaTexts.adLocation} onChange={e => setMetaTexts({ ...metaTexts, adLocation: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Titular del anuncio</Label>
                                            <Input value={metaTexts.adHeadline} onChange={e => setMetaTexts({ ...metaTexts, adHeadline: e.target.value })} />
                                        </div>
                                        <div className="space-y-3">
                                            <Label>5 prioridades estratégicas</Label>
                                            {metaTexts.priorities.map((p, i) => (
                                                <div key={i} className="space-y-1 rounded-md border p-2">
                                                    <Input value={p.title} onChange={e => updatePriority("meta", i, "title", e.target.value)} />
                                                    <Textarea rows={2} value={p.detail} onChange={e => updatePriority("meta", i, "detail", e.target.value)} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {activeReport === "google" && googleTexts && googleData && (
                                    <>
                                        <div className="space-y-2">
                                            <Label>Título</Label>
                                            <Input value={googleTexts.reportTitle} onChange={e => setGoogleTexts({ ...googleTexts, reportTitle: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Periodo</Label>
                                            <Input value={googlePeriod} onChange={e => setGooglePeriod(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Nota de la gráfica</Label>
                                            <Textarea rows={2} value={googleTexts.chartNote} onChange={e => setGoogleTexts({ ...googleTexts, chartNote: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Nota de audiencia</Label>
                                            <Textarea rows={2} value={googleTexts.audienceNote} onChange={e => setGoogleTexts({ ...googleTexts, audienceNote: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Nota de inversión</Label>
                                            <Textarea rows={2} value={googleTexts.investmentNote} onChange={e => setGoogleTexts({ ...googleTexts, investmentNote: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Anuncio más mostrado</Label>
                                            <Textarea rows={2} value={googleTexts.topAdNote} onChange={e => setGoogleTexts({ ...googleTexts, topAdNote: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Búsqueda del mock</Label>
                                            <Input value={googleTexts.adQuery} onChange={e => setGoogleTexts({ ...googleTexts, adQuery: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Titular azul del anuncio</Label>
                                            <Input value={googleTexts.adHeadline} onChange={e => setGoogleTexts({ ...googleTexts, adHeadline: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Descripción del anuncio</Label>
                                            <Textarea rows={3} value={googleTexts.adDescription} onChange={e => setGoogleTexts({ ...googleTexts, adDescription: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <Label>URL visible</Label>
                                                <Input value={googleTexts.adBusinessUrl} onChange={e => setGoogleTexts({ ...googleTexts, adBusinessUrl: e.target.value })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Sitelinks (coma)</Label>
                                                <Input value={googleTexts.adSitelinks} onChange={e => setGoogleTexts({ ...googleTexts, adSitelinks: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label>5 prioridades estratégicas</Label>
                                            {googleTexts.priorities.map((p, i) => (
                                                <div key={i} className="space-y-1 rounded-md border p-2">
                                                    <Input value={p.title} onChange={e => updatePriority("google", i, "title", e.target.value)} />
                                                    <Textarea rows={2} value={p.detail} onChange={e => updatePriority("google", i, "detail", e.target.value)} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* ---------- Vista previa ---------- */}
                <div className="min-w-0">
                    <Tabs value={activeReport} onValueChange={v => setActiveReport(v as ReportKind)}>
                        <TabsList>
                            <TabsTrigger value="meta" disabled={!metaData}>Reporte Meta</TabsTrigger>
                            <TabsTrigger value="google" disabled={!googleData}>Reporte Google</TabsTrigger>
                        </TabsList>
                        <TabsContent value={activeReport} className="mt-4">
                            <div ref={previewRef} className="w-full">
                                {hasReport ? (
                                    <div
                                        style={{ width: PAGE_W * scale, height: (PAGE_H * 2 + 24) * scale }}
                                        className="relative"
                                    >
                                        <div
                                            style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: PAGE_W }}
                                            className="absolute left-0 top-0 [&_.report-page]:mb-6 [&_.report-page]:shadow-lg [&_.report-page]:ring-1 [&_.report-page]:ring-border"
                                        >
                                            {reportPages(activeReport)}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-[420px] flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground">
                                        <FileUp className="mb-3 h-10 w-10 opacity-40" />
                                        <p className="font-medium">Sube los archivos de campaña para ver el reporte</p>
                                        <p className="text-sm">CSV de Meta Ads · ZIP o CSVs de Google Ads</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* ---------- Copia para impresión (tamaño real) ---------- */}
            {mounted && hasReport && createPortal(
                <div className="report-print-root">{reportPages(activeReport)}</div>,
                document.body
            )}

            <style jsx global>{`
                .report-print-root {
                    display: none;
                }
                .report-page {
                    print-color-adjust: exact;
                    -webkit-print-color-adjust: exact;
                }
                @media print {
                    @page {
                        size: 1584px 891px;
                        margin: 0;
                    }
                    body > *:not(.report-print-root) {
                        display: none !important;
                    }
                    .report-print-root {
                        display: block !important;
                    }
                    .report-print-root .report-page {
                        break-after: page;
                        page-break-after: always;
                    }
                    .report-print-root .report-page:last-child {
                        break-after: auto;
                        page-break-after: auto;
                    }
                }
            `}</style>
        </div>
    );
}
