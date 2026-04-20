import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { qrCodesTracked, qrScans } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { createHash } from 'crypto';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ shortId: string }> }
) {
    try {
        const { shortId } = await params;

        const [qr] = await db.select().from(qrCodesTracked)
            .where(eq(qrCodesTracked.shortId, shortId))
            .limit(1);

        if (!qr || !qr.active) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Hash del IP para privacidad
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
        const ipHash = createHash('sha256').update(ip).digest('hex').substring(0, 16);

        const userAgent = request.headers.get('user-agent') || null;

        // Incrementar contador y registrar escaneo en paralelo
        await Promise.all([
            db.update(qrCodesTracked)
                .set({ scanCount: sql`${qrCodesTracked.scanCount} + 1` })
                .where(eq(qrCodesTracked.id, qr.id)),
            db.insert(qrScans).values({
                qrCodeId: qr.id,
                userAgent,
                ipHash,
            }),
        ]);

        // Redirigir al contenido original
        return NextResponse.redirect(new URL(qr.originalContent), 302);
    } catch (error) {
        console.error('Error in QR redirect:', error);
        return NextResponse.redirect(new URL('/', request.url));
    }
}
