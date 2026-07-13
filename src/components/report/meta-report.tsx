"use client";

// Reporte Meta Ads — 2 páginas, réplica del formato de entrega MAW.

import React from "react";
import { MetaReportData, MetaTexts, indicatorLabel } from "@/lib/report/meta";
import { fmtInt, fmtMoney } from "@/lib/report/csv";
import {
    ReportPage, ReportHeader, KpiStrip, SectionLabel, BarChart, Bar,
    HighlightCard, MiniStat, PriorityList, ReportFooter, ContactBlock, ReportBrand,
} from "./report-primitives";

const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

export function fmtPeriod(start: string, end: string): string {
    const p = (s: string) => {
        const m = s.match(/(\d{4})[.-](\d{2})[.-](\d{2})/);
        if (!m) return null;
        return { y: m[1], mo: MESES[parseInt(m[2], 10) - 1], d: parseInt(m[3], 10) };
    };
    const a = p(start), b = p(end);
    if (!a || !b) return "";
    return `${a.d} ${a.mo} – ${b.d} ${b.mo} ${b.y}`;
}

interface Props {
    data: MetaReportData;
    texts: MetaTexts;
    brand: ReportBrand;
    period: string;
    email: string;
    creativeUrl: string | null; // imagen del anuncio (opcional)
    periodDays: number;
}

export function MetaReportPages({ data, texts, brand, period, email, creativeUrl, periodDays }: Props) {
    const top = data.topAds.filter(a => a.results > 0);
    const chartTop = top.slice(0, 4);
    const rest = data.ads.length - chartTop.length;
    const restResults = data.totalResults - chartTop.reduce((s, a) => s + a.results, 0);
    const bars: Bar[] = [
        ...chartTop.map((a, i) => ({
            label: a.name,
            value: a.results,
            display: fmtInt(a.results),
            tone: (i < 3 ? "brand" : "soft") as Bar["tone"],
        })),
        ...(rest > 0 ? [{ label: `Resto (${rest})`, value: restResults, display: fmtInt(restResults), tone: "muted" as Bar["tone"] }] : []),
    ];
    const maxExpensive = data.mostExpensive.length ? Math.max(...data.mostExpensive.map(a => a.costPerResult)) : 0;
    const expensiveLabel = data.mostExpensive.map(a => a.name.replace(/^Anuncio\s*/i, "")).join(" y ");
    const kicker = `Reporte Meta Ads · ${brand.clientName}`;
    const isCampaign = data.level === "campaign";
    const unit = isCampaign ? "resultados" : "conversaciones";
    const unitSing = isCampaign ? "resultado" : "conversación";

    return (
        <>
            {/* ============ PÁGINA 1 ============ */}
            <ReportPage brand={brand}>
                <ReportHeader brand={brand} kicker={kicker} title={texts.reportTitle} subtitle={`Facebook e Instagram · ${period}`} />
                <KpiStrip kpis={[
                    { value: fmtInt(data.totalResults), label: isCampaign ? "Resultados totales" : "Conversaciones iniciadas", accent: true },
                    { value: fmtMoney(data.avgCostPerResult, 1), label: `Costo por ${unitSing}` },
                    { value: fmtInt(data.totalImpressions), label: "Impresiones" },
                    { value: fmtInt(data.totalReach), label: "Personas alcanzadas" },
                    { value: fmtMoney(data.totalSpend), label: "Inversión MXN" },
                    { value: fmtInt(data.adsCount), label: isCampaign ? "Campañas activas" : "Anuncios probados", accent: true },
                ]} />
                <p className="mx-16 mt-4 border-b border-neutral-200 pb-4 text-[16px] text-neutral-600">
                    {isCampaign ? (
                        data.mixedIndicators ? (
                            <><span className="font-bold text-neutral-900">Resultado</span> = el objetivo de cada campaña ({[...new Set(data.ads.map(a => indicatorLabel(a.resultIndicator)))].join(", ")}); cada una se mide con su propio indicador.</>
                        ) : (
                            <><span className="font-bold text-neutral-900">Resultado</span> = {indicatorLabel(data.dominantIndicator)} — el objetivo de estas campañas.</>
                        )
                    ) : (
                        <><span className="font-bold text-neutral-900">Conversación</span> = un mensaje de un cliente potencial por WhatsApp o Messenger — el objetivo de esta campaña.</>
                    )}
                </p>

                <div className="mx-16 mt-6 grid flex-1 grid-cols-[1.15fr_1fr_1fr] gap-12">
                    <div className="flex flex-col">
                        <SectionLabel>{isCampaign ? "Resultados por campaña" : "Conversaciones por anuncio"}</SectionLabel>
                        <div className="mt-6 flex-1">
                            <BarChart bars={bars} height={340} />
                        </div>
                    </div>

                    <div className="border-l border-neutral-200 pl-10 pt-1">
                        <SectionLabel>Concentración</SectionLabel>
                        <p className="mt-5 text-[84px] font-extrabold leading-none" style={{ color: "var(--brand)" }}>
                            {Math.round(data.top2Share)}%
                        </p>
                        <p className="mt-5 text-[19px] font-semibold leading-snug text-neutral-900">
                            {texts.concentrationHeadline.split("solo").map((part, i, arr) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && <span style={{ color: "var(--brand)" }}>solo</span>}
                                </React.Fragment>
                            ))}
                        </p>
                        <p className="mt-4 text-[16px] leading-snug text-neutral-500">{texts.concentrationDetail}</p>
                    </div>

                    <div className="border-l border-neutral-200 pl-10 pt-1">
                        {data.cheapest && (
                            <HighlightCard big={fmtMoney(data.cheapest.costPerResult, 2)}>
                                costo más bajo por {unitSing} — <span className="font-bold">{data.cheapest.name}</span>
                                {data.cheapest.active ? " (activo)" : ""}
                            </HighlightCard>
                        )}
                        <div className="mt-4 flex gap-4">
                            <MiniStat big={fmtMoney(data.avgCostPerResult, 1)} label="promedio general" />
                            {maxExpensive > 0 && (
                                <MiniStat big={fmtMoney(maxExpensive)} label={isCampaign ? expensiveLabel : `Anuncios ${expensiveLabel}`} accent />
                            )}
                        </div>
                    </div>
                </div>

                <ReportFooter
                    left={<span className="border-t border-neutral-200 pt-3 inline-block">{texts.chartNote}</span>}
                    right={<span className="border-t border-neutral-200 pt-3 inline-block">{texts.expensiveNote}</span>}
                />
            </ReportPage>

            {/* ============ PÁGINA 2 ============ */}
            <ReportPage brand={brand}>
                <ReportHeader brand={brand} kicker="El anuncio y los próximos pasos" title="Cómo se ve el anuncio y qué sigue" subtitle="" />

                <div className="mx-16 mt-2 grid flex-1 grid-cols-[1fr_1.05fr_1.05fr] gap-12">
                    {/* Mock del anuncio de Facebook */}
                    <div>
                        <SectionLabel>Su anuncio en Facebook / Instagram</SectionLabel>
                        <div className="mt-5 rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
                            <div className="flex items-center gap-3 px-4 pt-4">
                                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white">
                                    {brand.logoUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={brand.logoUrl} alt="" className="h-full w-full object-contain p-0.5" />
                                    ) : (
                                        <div className="h-full w-full" style={{ backgroundColor: "var(--brand)" }} />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[15px] font-bold leading-tight text-neutral-900">{brand.clientName}</p>
                                    <p className="text-[12px] text-neutral-400">Publicidad · {texts.adLocation}</p>
                                </div>
                                <p className="pb-3 text-[18px] font-bold text-neutral-400">···</p>
                            </div>
                            <p className="px-4 py-3 text-[14px] leading-snug text-neutral-800">{texts.adCopy}</p>
                            <div className="relative flex h-[300px] items-center justify-center bg-neutral-100">
                                {creativeUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={creativeUrl} alt="creativo" className="h-full w-full object-cover" />
                                ) : brand.logoUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={brand.logoUrl} alt="" className="max-h-[40%] max-w-[45%] object-contain drop-shadow-md" />
                                ) : null}
                                {!creativeUrl && (
                                    <p className="absolute bottom-3 left-4 text-[11px] uppercase tracking-widest text-neutral-400">creativo del anuncio</p>
                                )}
                            </div>
                            <div className="flex items-center justify-between bg-neutral-50 px-4 py-3">
                                <div>
                                    <p className="text-[12px] text-neutral-400">{texts.adDomain}</p>
                                    <p className="text-[14px] font-bold text-neutral-900">{texts.adHeadline}</p>
                                </div>
                                <div className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-[13px] font-semibold text-neutral-800">
                                    Enviar mensaje
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-[13.5px] leading-snug text-neutral-400">
                            Reproducción del formato del anuncio con el mensaje de la campaña. El botón lleva la conversación a WhatsApp / Messenger.
                        </p>
                    </div>

                    {/* Anuncios ganadores */}
                    <div className="flex flex-col pt-1">
                        <SectionLabel>{isCampaign ? "Campañas ganadoras" : "Anuncios ganadores"}</SectionLabel>
                        <div className="mt-3">
                            {top.slice(0, 4).map((a, i) => (
                                <div key={i} className="flex items-baseline justify-between border-b border-neutral-200 py-4">
                                    <div>
                                        <p className={`text-[18px] ${i < 3 ? "font-extrabold text-neutral-900" : "font-semibold text-neutral-700"}`}>
                                            {a.name}
                                            {a.active && <span className="ml-2 align-middle text-[12px] font-bold" style={{ color: "#16a34a" }}>● activo</span>}
                                        </p>
                                        <p className="mt-1 text-[13.5px] text-neutral-400">
                                            {fmtMoney(a.costPerResult, 2)} c/{isCampaign ? "resultado" : "conv"} · {fmtInt(a.impressions)} impresiones
                                        </p>
                                    </div>
                                    <p className="text-[18px] font-extrabold text-neutral-900 whitespace-nowrap">
                                        {fmtInt(a.results)} {isCampaign ? indicatorLabel(a.resultIndicator) : "conv."}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto bg-neutral-900 px-7 py-6 text-white">
                            <p className="text-[40px] font-extrabold leading-none">
                                {fmtInt(data.totalResults)}
                                <span className="ml-3 align-middle text-[16px] font-normal leading-tight text-neutral-300">
                                    {unit}<br />en {periodDays} días
                                </span>
                            </p>
                            <p className="mt-3 text-[15px] leading-snug text-neutral-200">
                                <span className="font-bold" style={{ color: "color-mix(in srgb, var(--brand) 70%, white)" }}>
                                    {fmtMoney(data.avgCostPerResult, 1)} MXN
                                </span>{" "}
                                {isCampaign ? "costó, en promedio, cada resultado." : "costó, en promedio, cada mensaje de un cliente potencial."}
                            </p>
                        </div>
                    </div>

                    {/* Prioridades */}
                    <div className="flex flex-col pt-1">
                        <SectionLabel>5 Prioridades estratégicas</SectionLabel>
                        <div className="mt-2">
                            <PriorityList items={texts.priorities} />
                        </div>
                        <div className="mt-auto">
                            <ContactBlock email={email} />
                        </div>
                    </div>
                </div>

                <ReportFooter />
            </ReportPage>
        </>
    );
}
