// Extrae el color de marca dominante de un logo (data URL) usando canvas.

export interface BrandColor {
    hex: string;
    dark: string;  // variante oscurecida para hovers/acentos
    isDark: boolean;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const dlt = max - min;
    const s = l > 0.5 ? dlt / (2 - max - min) : dlt / (max + min);
    let h = 0;
    if (max === r) h = ((g - b) / dlt + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / dlt + 2) / 6;
    else h = ((r - g) / dlt + 4) / 6;
    return [h, s, l];
}

function toHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
}

/**
 * Color dominante: cuantiza los píxeles y puntúa frecuencia × saturación,
 * ignorando blancos, negros, grises y píxeles transparentes.
 */
export function extractBrandColor(dataUrl: string): Promise<BrandColor> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const size = 96;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('canvas no disponible'));
            ctx.drawImage(img, 0, 0, size, size);
            const { data } = ctx.getImageData(0, 0, size, size);

            const buckets = new Map<string, { count: number; r: number; g: number; b: number; score: number }>();
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
                if (a < 200) continue;
                const [, s, l] = rgbToHsl(r, g, b);
                if (l > 0.92 || l < 0.08 || s < 0.25) continue; // blancos, negros, grises
                const key = `${r >> 4}-${g >> 4}-${b >> 4}`;
                const cur = buckets.get(key) || { count: 0, r: 0, g: 0, b: 0, score: 0 };
                cur.count++;
                cur.r += r; cur.g += g; cur.b += b;
                cur.score += s; // frecuencia ponderada por saturación
                buckets.set(key, cur);
            }

            let best: { count: number; r: number; g: number; b: number; score: number } | null = null;
            buckets.forEach(bkt => {
                if (!best || bkt.score > best.score) best = bkt;
            });

            if (!best) {
                // Logo monocromático: usar rojo MAW como respaldo
                resolve({ hex: '#e11d1d', dark: '#b91616', isDark: false });
                return;
            }
            const bb = best as { count: number; r: number; g: number; b: number };
            const r = bb.r / bb.count, g = bb.g / bb.count, b = bb.b / bb.count;
            const [, , l] = rgbToHsl(r, g, b);
            resolve({
                hex: toHex(r, g, b),
                dark: toHex(r * 0.78, g * 0.78, b * 0.78),
                isDark: l < 0.45,
            });
        };
        img.onerror = () => reject(new Error('no se pudo cargar el logo'));
        img.src = dataUrl;
    });
}
