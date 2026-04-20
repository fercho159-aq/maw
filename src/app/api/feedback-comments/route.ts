import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { feedbackComments, feedbackProjects, clientAccesses } from '@/lib/db/schema';
import { getClientFromRequest } from '@/lib/client-auth';
import { createCommentSchema } from '@/lib/validations/feedback';
import { sanitizeInput } from '@/lib/sanitize';
import { sendFeedbackNotification } from '@/lib/email';
import { eq, and, desc } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const client = await getClientFromRequest(req);
    if (!client) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = createCommentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { content, pageUrl, positionX, positionY, scrollY, viewportWidth, viewportHeight, priority } = parsed.data;

    const sanitizedContent = sanitizeInput(content);

    const [comment] = await db
      .insert(feedbackComments)
      .values({
        content: sanitizedContent,
        pageUrl,
        positionX,
        positionY,
        scrollY,
        viewportWidth,
        viewportHeight,
        priority: priority || 'medium',
        projectId: client.projectId,
        clientAccessId: client.clientAccessId,
      })
      .returning();

    // Send email notification to admins (non-blocking)
    try {
      const [project] = await db
        .select({ name: feedbackProjects.name, siteUrl: feedbackProjects.siteUrl })
        .from(feedbackProjects)
        .where(eq(feedbackProjects.id, client.projectId));

      const [clientData] = await db
        .select({ email: clientAccesses.email, clientName: clientAccesses.clientName })
        .from(clientAccesses)
        .where(eq(clientAccesses.id, client.clientAccessId));

      if (project && clientData) {
        sendFeedbackNotification({
          clientName: clientData.clientName,
          clientEmail: clientData.email,
          projectName: project.name,
          siteUrl: project.siteUrl,
          content: sanitizedContent,
          pageUrl,
          priority: priority || 'medium',
        }).catch((err) => console.error('Error sending feedback notification:', err));
      }
    } catch (emailErr) {
      console.error('Error preparing feedback notification:', emailErr);
    }

    return NextResponse.json({ success: true, data: comment }, { status: 201 });
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const client = await getClientFromRequest(req);
    if (!client) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const pageUrl = searchParams.get('pageUrl');
    const status = searchParams.get('status');

    const conditions = [eq(feedbackComments.projectId, client.projectId)];

    if (pageUrl) {
      conditions.push(eq(feedbackComments.pageUrl, pageUrl));
    }
    if (status) {
      conditions.push(eq(feedbackComments.status, status as 'pending' | 'in_progress' | 'resolved' | 'dismissed'));
    }

    const comments = await db
      .select()
      .from(feedbackComments)
      .where(and(...conditions))
      .orderBy(desc(feedbackComments.createdAt));

    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    console.error('List comments error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
