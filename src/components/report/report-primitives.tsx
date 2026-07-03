"use client";

// Primitivas visuales compartidas por los reportes Meta / Google Ads.
// Cada página mide 1584×891 px (16:9) y se imprime 1:1 vía @page.

import React from "react";

export const PAGE_W = 1584;
export const PAGE_H = 891;

export interface ReportBrand {
    color: string;      // color principal extraído del logo
    colorDark: string;  // variante oscura
    logoUrl: string | null;
    clientName: string;
}

export function ReportPage({ brand, children }: { brand: ReportBrand; children: React.ReactNode }) {
    return (
        <div
            className="report-page relative flex flex-col bg-white text-neutral-900 overflow-hidden"
            style={{
                width: PAGE_W,
                height: PAGE_H,
                ["--brand" as string]: brand.color,
                ["--brand-dark" as string]: brand.colorDark,
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
        >
            {children}
        </div>
    );
}

export function ReportHeader({ brand, kicker, title, subtitle }: {
    brand: ReportBrand; kicker: string; title: string; subtitle: string;
}) {
    return (
        <div className="flex items-start justify-between px-16 pt-12 pb-2">
            <div>
                <p className="text-[15px] font-bold uppercase" style={{ color: "var(--brand)", letterSpacing: "0.35em" }}>
                    {kicker}
                </p>
                <h1 className="mt-2 text-[52px] font-extrabold leading-none tracking-tight text-neutral-900">
                    {title}
                </h1>
                <p className="mt-3 text-[15px] font-semibold uppercase text-neutral-400" style={{ letterSpacing: "0.3em" }}>
                    {subtitle}
                </p>
            </div>
            {brand.logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={brand.logoUrl} alt={brand.clientName} className="mt-1 h-14 w-auto max-w-[220px] object-contain" />
            )}
        </div>
    );
}

export interface Kpi { value: string; label: string; accent?: boolean }

export function KpiStrip({ kpis }: { kpis: Kpi[] }) {
    return (
        <div className="mx-16 mt-4 grid border-y-2 border-neutral-900" style={{ gridTemplateColumns: `repeat(${kpis.length}, 1fr)` }}>
            {kpis.map((k, i) => (
                <div key={i} className={`py-6 px-6 ${i > 0 ? "border-l border-neutral-300" : ""}`}>
                    <p className="text-[44px] font-extrabold leading-none tracking-tight" style={{ color: k.accent ? "var(--brand)" : "#171717" }}>
                        {k.value}
                    </p>
                    <p className="mt-2 text-[15px] leading-snug text-neutral-500">{k.label}</p>
                </div>
            ))}
        </div>
    );
}

export function SectionLabel({ children, muted }: { children: React.ReactNode; muted?: string }) {
    return (
        <p className="text-[13px] font-bold uppercase text-neutral-400" style={{ letterSpacing: "0.28em" }}>
            {children}
            {muted && <span className="ml-2 normal-case font-medium text-neutral-300" style={{ letterSpacing: 0 }}>{muted}</span>}
        </p>
    );
}

export interface Bar { label: string; value: number; display: string; tone: "brand" | "soft" | "muted" }

/** Gráfica de barras en CSS puro — imprime nítida, sin librerías. */
export function BarChart({ bars, height = 330 }: { bars: Bar[]; height?: number }) {
    const max = Math.max(...bars.map(b => b.value), 1);
    return (
        <div className="flex items-end gap-5" style={{ height }}>
            {bars.map((b, i) => {
                const h = Math.max((b.value / max) * (height - 60), 6);
                const bg = b.tone === "brand" ? "var(--brand)" : b.tone === "soft" ? "color-mix(in srgb, var(--brand) 40%, white)" : "#e5e5e5";
                const valColor = b.tone === "brand" ? "#171717" : b.tone === "soft" ? "#a3a3a3" : "#c4c4c4";
                return (
                    <div key={i} className="flex flex-1 flex-col items-center justify-end self-stretch">
                        <p className="mb-2 text-[24px] font-extrabold" style={{ color: valColor }}>{b.display}</p>
                        <div className="w-full" style={{ height: h, backgroundColor: bg }} />
                        <p className={`mt-3 text-[14px] ${b.tone === "muted" ? "text-neutral-300" : "text-neutral-500"}`}>{b.label}</p>
                    </div>
                );
            })}
        </div>
    );
}

/** Tarjeta grande con fondo del color de marca. */
export function HighlightCard({ big, children }: { big: string; children: React.ReactNode }) {
    return (
        <div className="px-8 py-7 text-white" style={{ backgroundColor: "var(--brand)" }}>
            <p className="text-[46px] font-extrabold leading-none">{big}</p>
            <div className="mt-2 text-[17px] leading-snug">{children}</div>
        </div>
    );
}

export function MiniStat({ big, label, accent }: { big: string; label: string; accent?: boolean }) {
    return (
        <div className="flex-1 border border-neutral-300 px-6 py-4">
            <p className="text-[26px] font-extrabold leading-none" style={{ color: accent ? "var(--brand)" : "#171717" }}>{big}</p>
            <p className="mt-1.5 text-[14px] text-neutral-500">{label}</p>
        </div>
    );
}

export function PriorityList({ items }: { items: { title: string; detail: string }[] }) {
    return (
        <div>
            {items.map((p, i) => (
                <div key={i} className={`flex gap-4 py-4 ${i > 0 ? "border-t border-neutral-200" : ""}`}>
                    <p className="text-[17px] font-extrabold" style={{ color: "color-mix(in srgb, var(--brand) 55%, white)" }}>
                        {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-[15.5px] leading-snug text-neutral-600">
                        <span className="font-bold text-neutral-900">{p.title}</span> — {p.detail}
                    </p>
                </div>
            ))}
        </div>
    );
}

export function ReportFooter({ left, right }: { left?: React.ReactNode; right?: React.ReactNode }) {
    return (
        <div className="mt-auto flex items-end justify-between px-16 pb-10">
            <div className="max-w-[640px] text-[15px] leading-snug text-neutral-500">{left}</div>
            <div className="flex items-end gap-10">
                <div className="max-w-[520px] text-[15px] leading-snug text-neutral-500">{right}</div>
                <div className="text-right shrink-0">
                    <p className="text-[19px] font-extrabold leading-none text-neutral-900">MAW</p>
                    <p className="text-[9px] font-semibold uppercase text-neutral-400" style={{ letterSpacing: "0.4em" }}>Soluciones</p>
                </div>
            </div>
        </div>
    );
}

export function ContactBlock({ email }: { email: string }) {
    return (
        <div className="border-t-2 border-neutral-900 pt-4">
            <p className="text-[17px] font-extrabold text-neutral-900">Datos que impulsan decisiones.</p>
            <p className="mt-1 text-[15px] text-neutral-500">{email}</p>
        </div>
    );
}
