"use client";

// Reporte Google Ads — 2 páginas, réplica del formato de entrega MAW.

import React from "react";
import { GoogleReportData, GoogleTexts } from "@/lib/report/google";
import { fmtInt, fmtMoney, fmtPct } from "@/lib/report/csv";
import {
    ReportPage, ReportHeader, KpiStrip, SectionLabel, BarChart, Bar,
    HighlightCard, MiniStat, PriorityList, ReportFooter, ContactBlock, ReportBrand,
} from "./report-primitives";

interface Props {
    data: GoogleReportData;
    texts: GoogleTexts;
    brand: ReportBrand;
    period: string;
    email: string;
}

function GenderBar({ label, pct, tone }: { label: string; pct: number; tone: "brand" | "dark" }) {
    return (
        <div className="mb-5">
            <div className="flex items-baseline justify-between">
                <p className="text-[17px] font-bold text-neutral-900">{label}</p>
                <p className="text-[17px] font-extrabold text-neutral-900">{fmtPct(pct)}</p>
            </div>
            <div className="mt-2 h-4 w-full bg-neutral-200">
                <div className="h-full" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: tone === "brand" ? "var(--brand)" : "#171717" }} />
            </div>
        </div>
    );
}

export function GoogleReportPages({ data, texts, brand, period, email }: Props) {
    const maxClicks = Math.max(...data.days.map(d => d.clicks), 1);
    const bars: Bar[] = data.days.map(d => ({
        label: d.label,
        value: d.clicks,
        display: fmtInt(d.clicks),
        tone: d.clicks >= maxClicks * 0.5 ? "brand" : "muted",
    }));
    const kicker = `Reporte Google Ads · ${brand.clientName}`;
    const subtitle = [`Periodo ${period}`, data.campaignName ? `Campaña ${data.campaignName}` : ""].filter(Boolean).join(" · ");
    const sitelinks = texts.adSitelinks.split(",").map(s => s.trim()).filter(Boolean);
    const topSearches = data.searches.slice(0, 4);
    const topKeywords = data.keywords.slice(0, 3);

    return (
        <>
            {/* ============ PÁGINA 1 ============ */}
            <ReportPage brand={brand}>
                <ReportHeader brand={brand} kicker={kicker} title={texts.reportTitle} subtitle={subtitle} />
                <KpiStrip kpis={[
                    { value: fmtInt(data.totalClicks), label: "Clics" },
                    { value: fmtInt(data.totalImpressions), label: "Impresiones" },
                    { value: fmtPct(data.ctr), label: "CTR", accent: true },
                    { value: fmtMoney(data.avgCpc, 2), label: "CPC promedio" },
                    { value: fmtMoney(data.totalCost), label: "Inversión MXN" },
                    { value: fmtInt(data.conversions), label: "Conversiones", accent: true },
                ]} />

                <div className="mx-16 mt-8 grid flex-1 grid-cols-[1.15fr_1fr_1fr] gap-12">
                    <div className="flex flex-col">
                        <SectionLabel>Clics por día</SectionLabel>
                        <div className="mt-6 flex-1">
                            <BarChart bars={bars} height={360} />
                        </div>
                    </div>

                    <div className="border-l border-neutral-200 pl-10 pt-1">
                        <SectionLabel>Quién busca</SectionLabel>
                        <div className="mt-6">
                            <GenderBar label="Hombres" pct={data.malePct} tone="brand" />
                            <GenderBar label="Mujeres" pct={data.femalePct} tone="dark" />
                        </div>
                        <p className="mt-14 text-[76px] font-extrabold leading-none text-neutral-900">
                            {Math.round(data.corePct)}%
                        </p>
                        <p className="mt-4 text-[17px] leading-snug text-neutral-600">{texts.audienceNote}</p>
                    </div>

                    <div className="border-l border-neutral-200 pl-10 pt-1">
                        <HighlightCard big={fmtPct(data.mobileClicksPct)}>
                            de los clics desde <span className="font-bold">móvil</span> ({fmtInt(data.mobileClicks)} de {fmtInt(data.totalClicks)})
                        </HighlightCard>
                        <div className="mt-4 flex gap-4">
                            {data.peakHours && <MiniStat big={data.peakHours} label="pico horario" />}
                            {data.costChangePct !== null && (
                                <MiniStat
                                    big={`${data.costChangePct > 0 ? "+" : "−"}${Math.abs(Math.round(data.costChangePct))}%`}
                                    label="inversión vs. previo"
                                    accent
                                />
                            )}
                        </div>
                    </div>
                </div>

                <ReportFooter
                    left={<span className="border-t border-neutral-200 pt-3 inline-block">{texts.chartNote}</span>}
                    right={<span className="border-t border-neutral-200 pt-3 inline-block">{texts.investmentNote}</span>}
                />
            </ReportPage>

            {/* ============ PÁGINA 2 ============ */}
            <ReportPage brand={brand}>
                <ReportHeader brand={brand} kicker="Anuncios, búsquedas y próximos pasos" title="Cómo se ve el anuncio y qué sigue" subtitle="" />

                <div className="mx-16 mt-2 grid flex-1 grid-cols-[1.05fr_1fr_1fr] gap-12">
                    {/* Mock del anuncio de Google */}
                    <div className="flex flex-col">
                        <SectionLabel>Su anuncio en Google</SectionLabel>
                        <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3 rounded-full border border-neutral-300 px-5 py-3">
                                <span className="text-[15px] text-neutral-400">⌕</span>
                                <p className="text-[15px] text-neutral-700">{texts.adQuery}</p>
                            </div>
                            <p className="mt-5 text-[13px] font-bold text-neutral-800">Patrocinado</p>
                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white">
                                    {brand.logoUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={brand.logoUrl} alt="" className="h-full w-full object-contain p-0.5" />
                                    ) : (
                                        <div className="h-full w-full" style={{ backgroundColor: "var(--brand)" }} />
                                    )}
                                </div>
                                <div>
                                    <p className="text-[14px] font-semibold leading-tight text-neutral-900">{brand.clientName}</p>
                                    <p className="text-[12px] leading-tight text-neutral-500">{texts.adBusinessUrl}</p>
                                </div>
                            </div>
                            <p className="mt-3 text-[20px] leading-snug text-[#1a0dab]">{texts.adHeadline}</p>
                            <p className="mt-2 text-[14px] leading-snug text-neutral-600">{texts.adDescription}</p>
                            {sitelinks.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                                    {sitelinks.map((s, i) => (
                                        <p key={i} className="text-[14px] text-[#1a0dab]">{s}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mt-auto bg-neutral-900 px-7 py-5 text-white">
                            <p className="text-[13px] font-bold uppercase" style={{ letterSpacing: "0.25em", color: "color-mix(in srgb, var(--brand) 70%, white)" }}>
                                El anuncio más mostrado
                            </p>
                            <p className="mt-2 text-[15.5px] leading-snug text-neutral-100">{texts.topAdNote}</p>
                        </div>
                    </div>

                    {/* Búsquedas y palabras clave */}
                    <div className="flex flex-col pt-1">
                        <SectionLabel muted="· impresiones">Lo que buscó la gente</SectionLabel>
                        <div className="mt-1">
                            {topSearches.map((s, i) => (
                                <div key={i} className="flex items-baseline justify-between border-b border-neutral-200 py-3">
                                    <p className="text-[16.5px] font-semibold text-neutral-900">{s.term}</p>
                                    <p className="text-[16.5px] font-extrabold text-neutral-900">{fmtInt(s.impressions)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-7">
                            <SectionLabel>Palabras clave · Mayor inversión</SectionLabel>
                            <div className="mt-1">
                                {topKeywords.map((k, i) => (
                                    <div key={i} className="flex items-baseline justify-between border-b border-neutral-200 py-3">
                                        <div>
                                            <p className={`text-[16.5px] ${i === 0 ? "font-extrabold" : "font-semibold"} text-neutral-900`}>{k.keyword}</p>
                                            <p className="mt-0.5 text-[13px] text-neutral-400">{fmtInt(k.clicks)} clics · CTR {fmtPct(k.ctr)}</p>
                                        </div>
                                        <p className="text-[16.5px] font-extrabold text-neutral-900">{fmtMoney(k.cost, 1)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {data.conversions > 0 && (
                            <div className="mt-auto px-6 py-4 text-white" style={{ backgroundColor: "var(--brand)" }}>
                                <p className="text-[15px]">
                                    <span className="mr-2 text-[30px] font-extrabold align-middle">{fmtInt(data.conversions)}</span>
                                    conversiones · <span className="font-bold">{Math.round(data.mobileConvPct)}% móvil</span> · {fmtMoney(data.costPerConv, 1)} c/conv.
                                </p>
                            </div>
                        )}
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
