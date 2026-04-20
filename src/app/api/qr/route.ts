import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { qrCodesTracked } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';

// POST: Crear QR con tracking
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, qrType, originalContent, createdBy } = body;

        if (!name || !qrType || !originalContent || !createdBy) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }

        const shortId = nanoid(8);

        const [newQr] = await db.insert(qrCodesTracked).values({
            shortId,
            name,
            qrType,
            originalContent,
            createdBy,
        }).returning();

        return NextResponse.json(newQr);
    } catch (error) {
        console.error('Error creating tracked QR:', error);
        return NextResponse.json({ error: 'Error al crear QR' }, { status: 500 });
    }
}

// GET: Listar QRs del usuario
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'userId requerido' }, { status: 400 });
        }

        const qrs = await db.select().from(qrCodesTracked)
            .where(eq(qrCodesTracked.createdBy, userId))
            .orderBy(desc(qrCodesTracked.createdAt));

        return NextResponse.json(qrs);
    } catch (error) {
        console.error('Error fetching tracked QRs:', error);
        return NextResponse.json({ error: 'Error al obtener QRs' }, { status: 500 });
    }
}

// PATCH: Actualizar QR (activar/desactivar)
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, active } = body;

        if (id === undefined || active === undefined) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }

        const [updated] = await db.update(qrCodesTracked)
            .set({ active })
            .where(eq(qrCodesTracked.id, id))
            .returning();

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating tracked QR:', error);
        return NextResponse.json({ error: 'Error al actualizar QR' }, { status: 500 });
    }
}

// DELETE: Eliminar QR
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'id requerido' }, { status: 400 });
        }

        await db.delete(qrCodesTracked).where(eq(qrCodesTracked.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting tracked QR:', error);
        return NextResponse.json({ error: 'Error al eliminar QR' }, { status: 500 });
    }
}
