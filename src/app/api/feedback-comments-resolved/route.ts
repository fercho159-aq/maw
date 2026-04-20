import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { feedbackCommentsResolved } from '@/lib/db/schema';
import { getClientFromRequest } from '@/lib/client-auth';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const client = await getClientFromRequest(req);
    if (!client) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const conditions = [
      eq(feedbackCommentsResolved.projectId, client.projectId),
      eq(feedbackCommentsResolved.clientAccessId, client.clientAccessId),
    ];

    const comments = await db
      .select()
      .from(feedbackCommentsResolved)
      .where(and(...conditions))
      .orderBy(desc(feedbackCommentsResolved.resolvedAt));

    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    console.error('List resolved comments error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
