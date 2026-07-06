// Utilidades compartidas para parsear CSVs exportados de Meta Ads y Google Ads.

/** Parser CSV con soporte de comillas, comas y saltos de línea dentro de campos. */
export function parseCsv(text: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = '';
    let inQuotes = false;
    // Quitar BOM
    const src = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;

    for (let i = 0; i < src.length; i++) {
        const c = src[i];
        if (inQuotes) {
            if (c === '"') {
                if (src[i + 1] === '"') {
                    field += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                field += c;
            }
        } else if (c === '"') {
            inQuotes = true;
        } else if (c === ',') {
            row.push(field);
            field = '';
        } else if (c === '\n' || c === '\r') {
            if (c === '\r' && src[i + 1] === '\n') i++;
            row.push(field);
            field = '';
            if (row.length > 1 || row[0] !== '') rows.push(row);
            row = [];
        } else {
            field += c;
        }
    }
    if (field !== '' || row.length > 0) {
        row.push(field);
        if (row.length > 1 || row[0] !== '') rows.push(row);
    }
    return rows;
}

/** Convierte filas CSV en objetos usando la primera fila como encabezados. */
export function csvToObjects(text: string): Record<string, string>[] {
    const rows = parseCsv(text);
    if (rows.length < 2) return [];
    const headers = rows[0].map(h => h.trim());
    return rows.slice(1).map(r => {
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => { obj[h] = (r[i] ?? '').trim(); });
        return obj;
    });
}

/**
 * Parsea números en formato EN ("1,202", "MXN22.64", "7.69%") y ES europeo
 * ("1.037,35 MXN", "12,38 %", "0,00"): si hay coma y punto, el último es el
 * decimal; coma sola solo es millar si agrupa de a 3 ("1,202").
 */
export function parseNum(raw: string | undefined | null): number {
    if (!raw) return 0;
    let s = String(raw).replace(/MXN|\$|%/g, '').replace(/[\s ]/g, '');
    const lastComma = s.lastIndexOf(',');
    const lastDot = s.lastIndexOf('.');
    if (lastComma > -1 && lastDot > -1) {
        if (lastComma > lastDot) s = s.replace(/\./g, '').replace(/,/g, '.');
        else s = s.replace(/,/g, '');
    } else if (lastComma > -1) {
        if (/^-?\d{1,3}(,\d{3})+$/.test(s)) s = s.replace(/,/g, '');
        else s = s.replace(/,/g, '.');
    }
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
}

export function fmtInt(n: number): string {
    return Math.round(n).toLocaleString('en-US');
}

export function fmtMoney(n: number, decimals = 0): string {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtPct(n: number, decimals = 1): string {
    return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: decimals }) + '%';
}
