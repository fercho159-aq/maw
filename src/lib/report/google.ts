// Parseo del ZIP "Tarjetas de descripción general" exportado desde Google Ads.
import { csvToObjects, parseNum, fmtInt, fmtMoney } from './csv';
import { slugify } from './meta';

export interface GoogleDay { label: string; date: string; clicks: number; impressions: number; cost: number; cpc: number; }
export interface GoogleSearch { term: string; impressions: number; clicks: number; cost: number; }
export interface GoogleKeyword { keyword: string; cost: number; clicks: number; ctr: number; }

export interface GoogleReportData {
    campaignName: string;
    periodStart: string; // yyyy.mm.dd si viene del nombre del archivo
    periodEnd: string;
    days: GoogleDay[];
    totalClicks: number;
    totalImpressions: number;
    totalCost: number;
    avgCpc: number;
    ctr: number; // %
    conversions: number;
    malePct: number;
    femalePct: number;
    corePct: number; // % 25–54 años
    mobileClicks: number;
    mobileClicksPct: number;
    mobileConvPct: number;
    peakHours: string; // ej. "9–2pm"
    prevCost: number | null;
    costChangePct: number | null;
    searches: GoogleSearch[];
    keywords: GoogleKeyword[];
    costPerConv: number;
    bestDay: GoogleDay | null;
}

type Kind =
    | 'campaigns' | 'series' | 'gender' | 'age' | 'genderAge' | 'devices'
    | 'day' | 'hour' | 'dayHour' | 'searches' | 'searchWords' | 'keywords'
    | 'changes' | 'optimization' | 'unknown';

function detectKind(text: string): Kind {
    const header = (text.split(/\r?\n/, 1)[0] || '').replace(/^﻿/, '').toLowerCase();
    if (header.includes('comparación')) return 'changes';
    if (header.includes('palabra clave')) return 'keywords';
    if (header.startsWith('buscar,')) return 'searches';
    if (header.startsWith('palabra,')) return 'searchWords';
    if (header.includes('nivel de optimización')) return 'optimization';
    if (header.includes('cpc prom') && header.includes('nombre de la campaña')) return 'campaigns';
    if (header.startsWith('fecha,')) return 'series';
    if ((header.includes('género') || header.includes('sexo')) && header.includes('edad')) return 'genderAge';
    if (header.includes('género') || header.startsWith('sexo,')) return 'gender';
    if (header.includes('edad')) return 'age';
    if (header.startsWith('dispositivo')) return 'devices';
    if (header.includes('día') && header.includes('hora')) return 'dayHour';
    if (header.includes('hora de inicio')) return 'hour';
    if (header.startsWith('día,')) return 'day';
    return 'unknown';
}

export function looksLikeGoogleCsv(text: string): boolean {
    return detectKind(text) !== 'unknown';
}

const DAY_SHORT: Record<string, string> = {
    lun: 'Lun', mar: 'Mar', 'mié': 'Mié', mie: 'Mié', jue: 'Jue', vie: 'Vie', 'sáb': 'Sáb', sab: 'Sáb', dom: 'Dom',
};

/** "1 a.m." → 1, "12 p.m." → 12, "3 p.m." → 15, "14" → 14 */
function parseHour(raw: string): number {
    const plain = raw.trim().match(/^(\d{1,2})$/);
    if (plain) {
        const h = parseInt(plain[1], 10);
        return h <= 23 ? h : -1;
    }
    const m = raw.toLowerCase().match(/(\d+)\s*(a|p)/);
    if (!m) return -1;
    let h = parseInt(m[1], 10);
    const pm = m[2] === 'p';
    if (h === 12) h = pm ? 12 : 0;
    else if (pm) h += 12;
    return h;
}

function fmtHour(h: number): string {
    if (h === 0) return '12am';
    if (h < 12) return `${h}am`;
    if (h === 12) return '12pm';
    return `${h - 12}pm`;
}

/** Primer valor no vacío entre variantes de encabezado (ES latino vs ES España). */
function col(r: Record<string, string>, ...names: string[]): string {
    for (const n of names) {
        const v = r[n];
        if (v !== undefined && v !== '') return v;
    }
    return '';
}

/** Extrae fechas del nombre de archivo tipo "...(2026.06.29-2026.07.03).csv" */
function periodFromName(name: string): { start: string; end: string } | null {
    const m = name.match(/(\d{4}\.\d{2}\.\d{2})-(\d{4}\.\d{2}\.\d{2})/);
    return m ? { start: m[1], end: m[2] } : null;
}

export function parseGoogleFiles(files: { name: string; text: string }[]): GoogleReportData {
    const d: GoogleReportData = {
        campaignName: '', periodStart: '', periodEnd: '',
        days: [], totalClicks: 0, totalImpressions: 0, totalCost: 0, avgCpc: 0, ctr: 0,
        conversions: 0, malePct: 0, femalePct: 0, corePct: 0,
        mobileClicks: 0, mobileClicksPct: 0, mobileConvPct: 0, peakHours: '',
        prevCost: null, costChangePct: null, searches: [], keywords: [],
        costPerConv: 0, bestDay: null,
    };

    let totalDeviceClicks = 0;
    let totalConvs = 0;
    let mobileConvs = 0;
    let seriesConvs = 0;

    for (const f of files) {
        const kind = detectKind(f.text);
        const rows = csvToObjects(f.text);
        const p = periodFromName(f.name);
        if (p && !d.periodStart) { d.periodStart = p.start; d.periodEnd = p.end; }

        switch (kind) {
            case 'campaigns': {
                const r = rows[0];
                if (r) d.campaignName = r['Nombre de la campaña'] || '';
                break;
            }
            case 'series': {
                d.days = rows.map(r => {
                    const fecha = r['Fecha'] || '';
                    const dayKey = fecha.slice(0, 3).toLowerCase();
                    const clicks = parseNum(r['Clics']);
                    const cost = parseNum(col(r, 'Costo', 'Coste'));
                    return {
                        label: DAY_SHORT[dayKey] || fecha.slice(0, 3),
                        date: fecha,
                        clicks,
                        impressions: parseNum(r['Impresiones']),
                        cost,
                        cpc: parseNum(r['CPC prom.']) || (clicks > 0 ? cost / clicks : 0),
                    };
                });
                seriesConvs = rows.reduce((s, r) => s + parseNum(r['Conversiones']), 0);
                break;
            }
            case 'gender': {
                for (const r of rows) {
                    const g = col(r, 'Género', 'Sexo').toLowerCase();
                    const pct = parseNum(r['Porcentaje del total conocido']);
                    if (g.startsWith('hombre')) d.malePct = pct;
                    if (g.startsWith('mujer')) d.femalePct = pct;
                }
                break;
            }
            case 'age': {
                for (const r of rows) {
                    const range = col(r, 'Rango de edades', 'Intervalo de edad');
                    if (/25|35|45/.test(range) && !/18|55|65/.test(range)) {
                        d.corePct += parseNum(r['Porcentaje del total conocido']);
                    }
                }
                break;
            }
            case 'devices': {
                for (const r of rows) {
                    const dev = (r['Dispositivo'] || '').toLowerCase();
                    const clicks = parseNum(r['Clics']);
                    const convs = parseNum(r['Conversiones']);
                    totalDeviceClicks += clicks;
                    totalConvs += convs;
                    if (dev.includes('móvil') || dev.includes('movil')) {
                        d.mobileClicks = clicks;
                        mobileConvs = convs;
                    }
                }
                break;
            }
            case 'hour': {
                const hours = rows
                    .map(r => ({ h: parseHour(r['Hora de inicio'] || ''), imp: parseNum(r['Impresiones']) }))
                    .filter(x => x.h >= 0);
                if (hours.length) {
                    const max = Math.max(...hours.map(x => x.imp));
                    const strong = hours.filter(x => x.imp >= max * 0.6).map(x => x.h).sort((a, b) => a - b);
                    if (strong.length) {
                        d.peakHours = strong.length > 1
                            ? `${fmtHour(strong[0]).replace(/am|pm/, '')}–${fmtHour(strong[strong.length - 1])}`
                            : fmtHour(strong[0]);
                    }
                }
                break;
            }
            case 'changes': {
                const r = rows[0];
                if (r) {
                    const prev = parseNum(col(r, 'Costo (Comparación)', 'Coste (Comparación)'));
                    if (prev > 0) d.prevCost = prev;
                }
                break;
            }
            case 'searches': {
                d.searches = rows.map(r => ({
                    term: r['Buscar'] || '',
                    impressions: parseNum(r['Impresiones']),
                    clicks: parseNum(r['Clics']),
                    cost: parseNum(col(r, 'Costo', 'Coste')),
                })).sort((a, b) => b.impressions - a.impressions);
                break;
            }
            case 'keywords': {
                d.keywords = rows.map(r => ({
                    keyword: col(r, 'Palabra clave de la Búsqueda', 'Palabra clave de búsqueda'),
                    cost: parseNum(col(r, 'Costo', 'Coste')),
                    clicks: parseNum(r['Clics']),
                    ctr: parseNum(r['CTR']),
                })).sort((a, b) => b.cost - a.cost);
                break;
            }
            default:
                break;
        }
    }

    d.totalClicks = d.days.reduce((s, x) => s + x.clicks, 0);
    d.totalImpressions = d.days.reduce((s, x) => s + x.impressions, 0);
    d.totalCost = d.days.reduce((s, x) => s + x.cost, 0);
    if (!d.totalClicks) d.totalClicks = totalDeviceClicks;
    d.avgCpc = d.totalClicks > 0 ? d.totalCost / d.totalClicks : 0;
    d.ctr = d.totalImpressions > 0 ? (d.totalClicks / d.totalImpressions) * 100 : 0;
    if (!totalConvs) totalConvs = seriesConvs;
    d.conversions = totalConvs;
    d.mobileClicksPct = totalDeviceClicks > 0 ? (d.mobileClicks / totalDeviceClicks) * 100 : 0;
    d.mobileConvPct = totalConvs > 0 ? (mobileConvs / totalConvs) * 100 : 0;
    d.costPerConv = totalConvs > 0 ? d.totalCost / totalConvs : 0;
    d.costChangePct = d.prevCost ? ((d.totalCost - d.prevCost) / d.prevCost) * 100 : null;
    d.bestDay = d.days.length
        ? d.days.reduce((max, x) => (x.clicks > max.clicks ? x : max))
        : null;
    return d;
}

export interface GoogleTexts {
    reportTitle: string;
    chartNote: string;
    audienceNote: string;
    investmentNote: string;
    topAdNote: string;
    adQuery: string;
    adBusinessUrl: string;
    adHeadline: string;
    adDescription: string;
    adSitelinks: string; // separados por coma
    priorities: { title: string; detail: string }[];
}

/** Limpia modificadores de concordancia: "+banda +ojillada" → "banda ojillada". */
function cleanKeyword(k: string): string {
    return k.replace(/[+"[\]]/g, '').replace(/\s+/g, ' ').trim();
}

function cap(s: string): string {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function defaultGoogleTexts(d: GoogleReportData, clientName: string): GoogleTexts {
    const topSearch = d.searches[0];
    const topKw = d.keywords[0];
    const secondKw = d.keywords[1];
    const domain = clientName ? slugify(clientName) + '.com' : 'tusitio.com';
    const kwNames = [...new Set(d.keywords.map(k => cleanKeyword(k.keyword)).filter(Boolean))];
    const product = cap(cleanKeyword(topSearch?.term || '') || kwNames[0] || 'Tu producto');
    return {
        reportTitle: 'Desempeño de campaña y audiencia',
        chartNote: d.bestDay
            ? `${d.bestDay.label === 'Jue' ? 'Jueves' : d.bestDay.date} fue el día más fuerte. El último día suele ser parcial (corte del reporte).`
            : 'Actividad de clics por día del periodo.',
        audienceNote: `tiene entre 25 y 54 años — el rango con mayor intención de compra.`,
        investmentNote: d.prevCost && d.costChangePct !== null
            ? `Inversión más eficiente: ${d.costChangePct < 0 ? 'bajó' : 'subió'} de ${fmtMoney(d.prevCost)} a ${fmtMoney(d.totalCost)} conservando el CPC en ${fmtMoney(d.avgCpc, 2)}.`
            : `CPC promedio de ${fmtMoney(d.avgCpc, 2)} en el periodo.`,
        topAdNote: topSearch
            ? `El de marca encabezó: ${fmtInt(topSearch.impressions)} impresiones en "${topSearch.term}" — el término #1, con ${fmtInt(topSearch.clicks)} clics.`
            : 'El anuncio de marca fue el más mostrado del periodo.',
        adQuery: topSearch ? `${topSearch.term} cerca de mí` : 'tu producto cerca de mí',
        adBusinessUrl: `https://${domain}`,
        adHeadline: `${clientName || 'Tu Negocio'} — ${product}`,
        adDescription: kwNames.length
            ? `${cap(kwNames[0])}${kwNames[1] ? `, ${kwNames[1]}` : ''} y más. Precios de mayoreo y menudeo. Envíos a todo México. Cotiza hoy.`
            : 'Describe aquí la oferta principal, cobertura y diferenciadores del negocio.',
        adSitelinks: kwNames.length
            ? [...kwNames.slice(0, 2).map(cap), 'Cómo llegar'].join(', ')
            : 'Catálogo, Promociones, Cómo llegar',
        priorities: [
            {
                title: 'Campaña de marca',
                detail: topSearch ? `proteger "${topSearch.term}" con CPC bajo.` : 'proteger las búsquedas de marca con CPC bajo.',
            },
            { title: 'SEO local', detail: 'reforzar Google Business y ubicación del negocio.' },
            { title: 'Medir conversiones', detail: 'seguimiento de llamadas y WhatsApp.' },
            {
                title: 'Programación horaria',
                detail: d.peakHours ? `concentrar puja ${d.peakHours} en días fuertes; pausar días sin actividad.` : 'concentrar puja en el horario pico.',
            },
            {
                title: 'Escalar ganadoras',
                detail: topKw && secondKw ? `más presupuesto a "${topKw.keyword}" y "${secondKw.keyword}".` : 'más presupuesto a las palabras clave con mejor CTR.',
            },
        ],
    };
}
