import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { qrCodesTracked, qrScans } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ shortId: string }> }
) {
    try {
        const { shortId } = await params;

        const [qr] = await db.select().from(qrCodesTracked)
            .where(eq(qrCodesTracked.shortId, shortId))
            .limit(1);

        if (!qr) {
            return NextResponse.json({ error: 'QR no encontrado' }, { status: 404 });
        }

        const scans = await db.select().from(qrScans)
            .where(eq(qrScans.qrCodeId, qr.id))
            .orderBy(desc(qrScans.scannedAt))
            .limit(100);

        return NextResponse.json({
            qr,
            scans,
            totalScans: qr.scanCount,
        });
    } catch (error) {
        console.error('Error fetching QR stats:', error);
        return NextResponse.json({ error: 'Error al obtener estadísticas' }, { status: 500 });
    }
}
