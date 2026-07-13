// Parseo y agregación del CSV exportado desde Meta Ads (por anuncio o por campaña).
import { csvToObjects, parseNum, fmtInt, fmtMoney } from './csv';

export type MetaLevel = 'ad' | 'campaign';

export interface MetaAd {
    name: string;
    active: boolean;
    results: number;
    resultIndicator: string; // p. ej. "reach", "actions:like"; '' si el export no lo trae
    costPerResult: number;
    spend: number;
    impressions: number;
    reach: number;
}

export interface MetaReportData {
    level: MetaLevel;
    mixedIndicators: boolean; // campañas con objetivos distintos: no mezclar costos ni totales a la ligera
    dominantIndicator: string;
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
    return head.includes('nombre del anuncio') || head.includes('ad name')
        || head.includes('nombre de la campa') || head.includes('campaign name');
}

/** Etiqueta legible para el "Indicador de resultado" del export por campaña. */
export function indicatorLabel(indicator: string): string {
    const i = indicator.toLowerCase();
    if (!i) return 'resultados';
    if (i.includes('messaging')) return 'conversaciones';
    if (i === 'reach') return 'alcance';
    if (i.includes('like')) return 'me gusta';
    if (i.includes('follow')) return 'seguidores';
    if (i.includes('link_click') || i === 'clicks') return 'clics';
    if (i.includes('video')) return 'reproducciones';
    if (i.includes('landing')) return 'visitas';
    if (i.includes('lead')) return 'leads';
    if (i.includes('purchase')) return 'compras';
    return indicator;
}

export function parseMetaCsv(text: string): MetaReportData {
    const rows = csvToObjects(text);
    // Export por anuncio trae "Nombre del anuncio"; el resumen por campaña solo "Nombre de la campaña".
    const isCampaign = rows.length > 0
        && !col(rows[0], 'Nombre del anuncio', 'Ad name')
        && !!col(rows[0], 'Nombre de la campaña', 'Campaign name');
    const level: MetaLevel = isCampaign ? 'campaign' : 'ad';
    const nameOf = (r: Record<string, string>) => isCampaign
        ? col(r, 'Nombre de la campaña', 'Campaign name')
        : col(r, 'Nombre del anuncio', 'Ad name');
    const deliveryOf = (r: Record<string, string>) => isCampaign
        ? col(r, 'Entrega de la campaña', 'Campaign delivery')
        : col(r, 'Entrega del anuncio', 'Ad delivery');

    const ads: MetaAd[] = rows
        .filter(r => nameOf(r))
        .map(r => ({
            name: nameOf(r),
            active: deliveryOf(r).toLowerCase() === 'active',
            results: parseNum(col(r, 'Resultados', 'Results')),
            resultIndicator: col(r, 'Indicador de resultado', 'Result indicator', 'Result type'),
            costPerResult: parseNum(col(r, 'Costo por resultados', 'Cost per results')),
            spend: parseNum(col(r, 'Importe gastado (MXN)', 'Importe gastado', 'Amount spent')),
            impressions: parseNum(col(r, 'Impresiones', 'Impressions')),
            reach: parseNum(col(r, 'Alcance', 'Reach')),
        }));

    const indicators = ads.map(a => a.resultIndicator).filter(Boolean);
    const uniqueIndicators = [...new Set(indicators)];
    const mixedIndicators = uniqueIndicators.length > 1;
    // Indicador con más resultados acumulados: sirve de base para comparar costos.
    const dominantIndicator = uniqueIndicators.length
        ? uniqueIndicators.reduce((best, ind) => {
            const sum = (x: string) => ads.filter(a => a.resultIndicator === x).reduce((s, a) => s + a.results, 0);
            return sum(ind) > sum(best) ? ind : best;
        })
        : '';

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

    // Con objetivos mezclados, los costos solo se comparan dentro del indicador dominante
    // (un costo por alcance no es comparable con un costo por "me gusta").
    const withResults = ads.filter(a => a.results > 0 && a.costPerResult > 0
        && (!mixedIndicators || a.resultIndicator === dominantIndicator));
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
    // Con un solo elemento comparable no hay "caro vs barato": sería el mismo.
    const mostExpensive = withResults.length > 1
        ? withResults.filter(a => a.costPerResult >= maxCost * 0.95 && a !== cheapest)
        : [];
    const priceRatio = cheapest && cheapest.costPerResult > 0
        ? Math.round(maxCost / cheapest.costPerResult)
        : 0;

    return {
        level,
        mixedIndicators,
        dominantIndicator,
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
    const isCampaign = d.level === 'campaign';
    const noun = isCampaign ? 'campañas' : 'anuncios';
    const nounSing = isCampaign ? 'campaña' : 'anuncio';
    const unit = isCampaign ? 'resultados' : 'conversaciones';
    const unitSing = isCampaign ? 'resultado' : 'conversación';
    return {
        reportTitle: isCampaign ? 'Campañas de Meta en números' : 'Campaña de Mensajes en números',
        chartNote: isCampaign
            ? 'Pocas campañas hacen casi todo el trabajo — el resto aporta muy poco.'
            : 'Pocos anuncios hacen casi todo el trabajo — el resto aporta muy poco.',
        concentrationHeadline: `de ${isCampaign ? 'los resultados' : 'las conversaciones'} vinieron de solo ${top2.length} ${noun}`,
        concentrationDetail: top2.length >= 2
            ? `${top2[0].name} y ${top2[1].name.replace(/^Anuncio\s*/i, '')} sumaron ${fmtInt(top2Results)} de ${fmtInt(d.totalResults)} ${unit} y el ${Math.round(d.top2SpendShare)}% de la inversión.`
            : '',
        expensiveNote: d.priceRatio > 1
            ? `Hay ${noun} hasta ${d.priceRatio}× más caros que otros: reasignar presupuesto a los eficientes.`
            : `Revisar el costo por ${unitSing} de cada ${nounSing} para reasignar presupuesto.`,
        adCopy: `Todo en material eléctrico e iluminación LED 💡 Cables, focos y luminarias. Mayoreo y menudeo. ¡Escríbenos y cotiza hoy!`,
        adDomain: clientName ? slugify(clientName) + '.com' : 'tusitio.com',
        adHeadline: 'Material eléctrico e iluminación',
        adLocation: 'Iztapalapa, CDMX',
        priorities: [
            {
                title: 'Escalar ganadores',
                detail: top2.length >= 2
                    ? `más presupuesto a ${top2[0].name} y a ${(d.cheapest && d.cheapest.name !== top2[0].name ? d.cheapest.name : top2[1].name).replace(/^Anuncio\s*/i, '')} (mejor costo).`
                    : `más presupuesto a ${isCampaign ? 'las campañas' : 'los anuncios'} con mejor costo por ${unitSing}.`,
            },
            {
                title: isCampaign ? 'Pausar las caras' : 'Pausar los caros',
                detail: d.mostExpensive.length
                    ? `apagar ${isCampaign ? '' : 'Anuncios '}${expensiveNames} (${fmtMoney(Math.max(...d.mostExpensive.map(a => a.costPerResult)))} por ${unitSing}).`
                    : `apagar ${isCampaign ? 'las campañas' : 'los anuncios'} con costo por ${unitSing} muy por encima del promedio.`,
            },
            { title: 'Refrescar creativos', detail: 'nuevas imágenes/videos partiendo de lo que ya funciona.' },
            d.mixedIndicators
                ? { title: 'Unificar objetivos', detail: 'concentrar la inversión en el objetivo que más aporta al negocio y medirlo con un solo indicador.' }
                : { title: 'Responder rápido', detail: 'atender los mensajes al momento para convertirlos en ventas.' },
            { title: 'Retargeting', detail: isCampaign
                ? 'volver a impactar a quienes ya interactuaron y crear públicos similares.'
                : 'volver a impactar a quienes escribieron y crear públicos similares.' },
        ],
    };
}
