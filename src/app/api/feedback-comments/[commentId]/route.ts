import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { feedbackComments, feedbackCommentsResolved, feedbackProjects, clientAccesses } from '@/lib/db/schema';
import { updateCommentSchema } from '@/lib/validations/feedback';
import { sanitizeInput } from '@/lib/sanitize';
import { sendFeedbackConfirmation } from '@/lib/email';
import { eq } from 'drizzle-orm';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const { commentId } = await params;
    const id = parseInt(commentId, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'commentId inválido' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = updateCommentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date() };

    if (parsed.data.status !== undefined) {
      updateData.status = parsed.data.status;
      if (parsed.data.status === 'resolved') {
        updateData.resolvedAt = new Date();
      }
    }
    if (parsed.data.priority !== undefined) {
      updateData.priority = parsed.data.priority;
    }
    if (parsed.data.adminNotes !== undefined) {
      updateData.adminNotes = sanitizeInput(parsed.data.adminNotes);
    }

    const [updated] = await db
      .update(feedbackComments)
      .set(updateData)
      .where(eq(feedbackComments.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Comentario no encontrado' },
        { status: 404 }
      );
    }

    // Send confirmation email to client when status changes (non-blocking)
    if (parsed.data.status !== undefined) {
      try {
        const [project] = await db
          .select({ name: feedbackProjects.name })
          .from(feedbackProjects)
          .where(eq(feedbackProjects.id, updated.projectId));

        const [clientData] = await db
          .select({ email: clientAccesses.email, clientName: clientAccesses.clientName })
          .from(clientAccesses)
          .where(eq(clientAccesses.id, updated.clientAccessId));

        if (project && clientData) {
          sendFeedbackConfirmation({
            clientEmail: clientData.email,
            clientName: clientData.clientName,
            projectName: project.name,
            commentContent: updated.content,
            newStatus: updated.status,
            adminNotes: updated.adminNotes || undefined,
          }).catch((err) => console.error('Error sending feedback confirmation:', err));
        }
      } catch (emailErr) {
        console.error('Error preparing feedback confirmation:', emailErr);
      }

      // Move to resolved table and delete from active comments
      if (parsed.data.status === 'resolved') {
        try {
          await db.insert(feedbackCommentsResolved).values({
            originalId: updated.id,
            content: updated.content,
            pageUrl: updated.pageUrl,
            positionX: updated.positionX,
            positionY: updated.positionY,
            scrollY: updated.scrollY,
            viewportWidth: updated.viewportWidth,
            viewportHeight: updated.viewportHeight,
            priority: updated.priority,
            adminNotes: updated.adminNotes,
            projectId: updated.projectId,
            clientAccessId: updated.clientAccessId,
            resolvedAt: updated.resolvedAt,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
          });
          await db.delete(feedbackComments).where(eq(feedbackComments.id, updated.id));
        } catch (moveErr) {
          console.error('Error moving comment to resolved table:', moveErr);
        }
      }
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update comment error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const { commentId } = await params;
    const id = parseInt(commentId, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'commentId inválido' },
        { status: 400 }
      );
    }

    const [deleted] = await db
      .delete(feedbackComments)
      .where(eq(feedbackComments.id, id))
      .returning({ id: feedbackComments.id });

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Comentario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { id: deleted.id } });
  } catch (error) {
    console.error('Delete comment error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
