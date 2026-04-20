import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { feedbackComments, clientAccesses } from '@/lib/db/schema';
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
    const status = searchParams.get('status');
    const pageUrl = searchParams.get('pageUrl');
    const priority = searchParams.get('priority');
    const clientId = searchParams.get('clientId');

    const conditions = [eq(feedbackComments.projectId, id)];

    if (status) {
      conditions.push(eq(feedbackComments.status, status as 'pending' | 'in_progress' | 'resolved' | 'dismissed'));
    }
    if (pageUrl) {
      conditions.push(eq(feedbackComments.pageUrl, pageUrl));
    }
    if (priority) {
      conditions.push(eq(feedbackComments.priority, priority as 'low' | 'medium' | 'high'));
    }
    if (clientId) {
      const clientIdNum = parseInt(clientId, 10);
      if (!isNaN(clientIdNum)) {
        conditions.push(eq(feedbackComments.clientAccessId, clientIdNum));
      }
    }

    const comments = await db
      .select({
        id: feedbackComments.id,
        content: feedbackComments.content,
        pageUrl: feedbackComments.pageUrl,
        positionX: feedbackComments.positionX,
        positionY: feedbackComments.positionY,
        scrollY: feedbackComments.scrollY,
        viewportWidth: feedbackComments.viewportWidth,
        viewportHeight: feedbackComments.viewportHeight,
        status: feedbackComments.status,
        priority: feedbackComments.priority,
        adminNotes: feedbackComments.adminNotes,
        projectId: feedbackComments.projectId,
        clientAccessId: feedbackComments.clientAccessId,
        resolvedAt: feedbackComments.resolvedAt,
        createdAt: feedbackComments.createdAt,
        updatedAt: feedbackComments.updatedAt,
        clientName: clientAccesses.clientName,
        clientEmail: clientAccesses.email,
      })
      .from(feedbackComments)
      .innerJoin(clientAccesses, eq(feedbackComments.clientAccessId, clientAccesses.id))
      .where(and(...conditions))
      .orderBy(desc(feedbackComments.createdAt));

    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    console.error('List project comments error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
