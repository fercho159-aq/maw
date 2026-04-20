import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { feedbackCommentsResolved, clientAccesses } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const id = parseInt(projectId, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'projectId inválido' },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const priority = searchParams.get('priority');
    const clientId = searchParams.get('clientId');

    const conditions = [eq(feedbackCommentsResolved.projectId, id)];

    if (priority) {
      conditions.push(eq(feedbackCommentsResolved.priority, priority as 'low' | 'medium' | 'high'));
    }
    if (clientId) {
      const clientIdNum = parseInt(clientId, 10);
      if (!isNaN(clientIdNum)) {
        conditions.push(eq(feedbackCommentsResolved.clientAccessId, clientIdNum));
      }
    }

    const comments = await db
      .select({
        id: feedbackCommentsResolved.id,
        originalId: feedbackCommentsResolved.originalId,
        content: feedbackCommentsResolved.content,
        pageUrl: feedbackCommentsResolved.pageUrl,
        positionX: feedbackCommentsResolved.positionX,
        positionY: feedbackCommentsResolved.positionY,
        scrollY: feedbackCommentsResolved.scrollY,
        viewportWidth: feedbackCommentsResolved.viewportWidth,
        viewportHeight: feedbackCommentsResolved.viewportHeight,
        priority: feedbackCommentsResolved.priority,
        adminNotes: feedbackCommentsResolved.adminNotes,
        projectId: feedbackCommentsResolved.projectId,
        clientAccessId: feedbackCommentsResolved.clientAccessId,
        resolvedAt: feedbackCommentsResolved.resolvedAt,
        createdAt: feedbackCommentsResolved.createdAt,
        updatedAt: feedbackCommentsResolved.updatedAt,
        clientName: clientAccesses.clientName,
        clientEmail: clientAccesses.email,
      })
      .from(feedbackCommentsResolved)
      .innerJoin(clientAccesses, eq(feedbackCommentsResolved.clientAccessId, clientAccesses.id))
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
