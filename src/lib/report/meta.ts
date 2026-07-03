// Parseo y agregación del CSV de anuncios exportado desde Meta Ads.
import { csvToObjects, parseNum, fmtInt, fmtMoney } from './csv';

export interface MetaAd {
    name: string;
    active: boolean;
    results: number;
    costPerResult: number;
    spend: number;
    impressions: number;
    reach: number;
}

export interface MetaReportData {
    ads: MetaAd[];
    periodStart: string;
    periodEnd: string;
    totalResults: number;
    totalSpend: number;
    totalImpressions: number;
    totalReach: number;
    avgCostPerResult: number;
    adsCount: number;
    topAds: MetaAd[];       // ordenados por resultados desc
    top2Share: number;      // % de conversaciones de los 2 mejores
    top2SpendShare: number; // % de inversión de los 2 mejores
    cheapest: MetaAd | null;    // menor costo/resultado (con volumen mínimo)
    mostExpensive: MetaAd[];    // anuncios con el costo más alto
    priceRatio: number;         // caro/barato redondeado
}

function col(row: Record<string, string>, ...names: string[]): string {
    for (const n of names) {
        if (row[n] !== undefined && row[n] !== '') return row[n];
    }
    // búsqueda laxa por si Meta cambia mayúsculas/acentos
    const keys = Object.keys(row);
    for (const n of names) {
        const k = keys.find(key => key.toLowerCase().includes(n.toLowerCase()));
        if (k && row[k] !== '') return row[k];
    }
    return '';
}

export function looksLikeMetaCsv(text: string): boolean {
    const head = text.slice(0, 600).toLowerCase();
    return head.includes('nombre del anuncio') || head.includes('ad name');
}

export function parseMetaCsv(text: string): MetaReportData {
    const rows = csvToObjects(text);
    const ads: MetaAd[] = rows
        .filter(r => col(r, 'Nombre del anuncio', 'Ad name'))
        .map(r => ({
            name: col(r, 'Nombre del anuncio', 'Ad name'),
            active: col(r, 'Entrega del anuncio', 'Ad delivery').toLowerCase() === 'active',
            results: parseNum(col(r, 'Resultados', 'Results')),
            costPerResult: parseNum(col(r, 'Costo por resultados', 'Cost per results')),
            spend: parseNum(col(r, 'Importe gastado (MXN)', 'Importe gastado', 'Amount spent')),
            impressions: parseNum(col(r, 'Impresiones', 'Impressions')),
            reach: parseNum(col(r, 'Alcance', 'Reach')),
        }));

    const periodStart = rows.length ? col(rows[0], 'Inicio del informe', 'Reporting starts') : '';
    const periodEnd = rows.length ? col(rows[0], 'Fin del informe', 'Reporting ends') : '';

    const totalResults = ads.reduce((s, a) => s + a.results, 0);
    const totalSpend = ads.reduce((s, a) => s + a.spend, 0);
    const totalImpressions = ads.reduce((s, a) => s + a.impressions, 0);
    const totalReach = ads.reduce((s, a) => s + a.reach, 0);
    const avgCostPerResult = totalResults > 0 ? totalSpend / totalResults : 0;

    const topAds = [...ads].sort((a, b) => b.results - a.results);
    const top2 = topAds.slice(0, 2);
    const top2Results = top2.reduce((s, a) => s + a.results, 0);
    const top2Spend = top2.reduce((s, a) => s + a.spend, 0);

    const withResults = ads.filter(a => a.results > 0 && a.costPerResult > 0);
    // "más barato" solo entre anuncios con volumen real (≥10% del mejor, mínimo 3)
    const maxResults = withResults.length ? Math.max(...withResults.map(a => a.results)) : 0;
    const volumeFloor = Math.max(3, Math.ceil(maxResults * 0.1));
    const minVolume = withResults.filter(a => a.results >= volumeFloor);
    const cheapPool = minVolume.length ? minVolume : withResults;
    const cheapest = cheapPool.length
        ? cheapPool.reduce((min, a) => (a.costPerResult < min.costPerResult ? a : min))
        : null;
    const maxCost = withResults.length
        ? Math.max(...withResults.map(a => a.costPerResult))
        : 0;
    const mostExpensive = withResults.filter(a => a.costPerResult >= maxCost * 0.95);
    const priceRatio = cheapest && cheapest.costPerResult > 0
        ? Math.round(maxCost / cheapest.costPerResult)
        : 0;

    return {
        ads,
        periodStart,
        periodEnd,
        totalResults,
        totalSpend,
        totalImpressions,
        totalReach,
        avgCostPerResult,
        adsCount: ads.length,
        topAds,
        top2Share: totalResults > 0 ? (top2Results / totalResults) * 100 : 0,
        top2SpendShare: totalSpend > 0 ? (top2Spend / totalSpend) * 100 : 0,
        cheapest,
        mostExpensive,
        priceRatio,
    };
}

/** "Eléctrica San Miguel" → "electrica-san-miguel" */
export function slugify(name: string): string {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

export interface MetaTexts {
    reportTitle: string;
    chartNote: string;
    concentrationHeadline: string;
    concentrationDetail: string;
    expensiveNote: string;
    adCopy: string;
    adDomain: string;
    adHeadline: string;
    adLocation: string;
    priorities: { title: string; detail: string }[];
}

/** Textos sugeridos calculados a partir de los datos; el usuario los puede editar. */
export function defaultMetaTexts(d: MetaReportData, clientName: string): MetaTexts {
    const top2 = d.topAds.slice(0, 2);
    const top2Results = top2.reduce((s, a) => s + a.results, 0);
    const expensiveNames = d.mostExpensive.map(a => a.name.replace(/^Anuncio\s*/i, '')).join(' y ');
    return {
        reportTitle: 'Campaña de Mensajes en números',
        chartNote: 'Pocos anuncios hacen casi todo el trabajo — el resto aporta muy poco.',
        concentrationHeadline: `de las conversaciones vinieron de solo ${top2.length} anuncios`,
        concentrationDetail: top2.length >= 2
            ? `El ${top2[0].name} y el ${top2[1].name.replace(/^Anuncio\s*/i, '')} sumaron ${fmtInt(top2Results)} de ${fmtInt(d.totalResults)} conversaciones y el ${Math.round(d.top2SpendShare)}% de la inversión.`
            : '',
        expensiveNote: d.priceRatio > 1
            ? `Hay anuncios hasta ${d.priceRatio}× más caros que otros: reasignar presupuesto a los eficientes.`
            : 'Revisar el costo por conversación de cada anuncio para reasignar presupuesto.',
        adCopy: `Todo en material eléctrico e iluminación LED 💡 Cables, focos y luminarias. Mayoreo y menudeo. ¡Escríbenos y cotiza hoy!`,
        adDomain: clientName ? slugify(clientName) + '.com' : 'tusitio.com',
        adHeadline: 'Material eléctrico e iluminación',
        adLocation: 'Iztapalapa, CDMX',
        priorities: [
            {
                title: 'Escalar ganadores',
                detail: top2.length >= 2
                    ? `más presupuesto al ${top2[0].name} y al ${d.cheapest ? d.cheapest.name.replace(/^Anuncio\s*/i, '') : top2[1].name.replace(/^Anuncio\s*/i, '')} (mejor costo).`
                    : 'más presupuesto a los anuncios con mejor costo por conversación.',
            },
            {
                title: 'Pausar los caros',
                detail: d.mostExpensive.length
                    ? `apagar Anuncios ${expensiveNames} (${fmtMoney(Math.max(...d.mostExpensive.map(a => a.costPerResult)))} por conversación).`
                    : 'apagar los anuncios con costo por conversación muy por encima del promedio.',
            },
            { title: 'Refrescar creativos', detail: 'nuevas imágenes/videos partiendo de lo que ya funciona.' },
            { title: 'Responder rápido', detail: 'atender los mensajes al momento para convertirlos en ventas.' },
            { title: 'Retargeting', detail: 'volver a impactar a quienes escribieron y crear públicos similares.' },
        ],
    };
}
