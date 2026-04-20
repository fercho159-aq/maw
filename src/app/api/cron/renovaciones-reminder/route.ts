import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { dominios_hostinger, renovacion_notificaciones } from '@/lib/db/schema';
import { sendRenewalReminder } from '@/lib/email';
import { eq, and } from 'drizzle-orm';

type ReminderType = '7_dias' | '3_dias' | 'mismo_dia';

const THRESHOLDS: { days: number; tipo: ReminderType }[] = [
    { days: 7, tipo: '7_dias' },
    { days: 3, tipo: '3_dias' },
    { days: 0, tipo: 'mismo_dia' },
];

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const expectedToken = `Bearer ${process.env.CRON_SECRET}`;

    if (!authHeader || authHeader !== expectedToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const allDominios = await db.select().from(dominios_hostinger);
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const results: { tipo: ReminderType; enviados: number }[] = [];

        for (const { days, tipo } of THRESHOLDS) {
            // Filter domains that match this threshold
            const matching = allDominios.filter((d) => {
                const exp = new Date(d.fecha_expiracion);
                exp.setHours(0, 0, 0, 0);
                const diffMs = exp.getTime() - now.getTime();
                const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
                return diffDays === days;
            });

            if (matching.length === 0) {
                results.push({ tipo, enviados: 0 });
                continue;
            }

            // Check which ones haven't been notified yet for this tipo
            const pendientes = [];
            for (const dominio of matching) {
                const existing = await db
                    .select()
                    .from(renovacion_notificaciones)
                    .where(
                        and(
                            eq(renovacion_notificaciones.dominio_id, dominio.id),
                            eq(renovacion_notificaciones.tipo, tipo)
                        )
                    );

                if (existing.length === 0) {
                    pendientes.push(dominio);
                }
            }

            if (pendientes.length === 0) {
                results.push({ tipo, enviados: 0 });
                continue;
            }

            // Send one grouped email for this threshold
            await sendRenewalReminder(pendientes, tipo);

            // Log each domain as notified
            for (const dominio of pendientes) {
                await db.insert(renovacion_notificaciones).values({
                    dominio_id: dominio.id,
                    tipo,
                });
            }

            results.push({ tipo, enviados: pendientes.length });
        }

        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            results,
        });
    } catch (error) {
        console.error('Error en cron renovaciones-reminder:', error);
        return NextResponse.json(
            { error: 'Error interno', details: String(error) },
            { status: 500 }
        );
    }
}
