import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { feedbackProjects, feedbackComments, clientAccesses } from '@/lib/db/schema';
import { updateProjectSchema } from '@/lib/validations/feedback';
import { eq, and, sql, count } from 'drizzle-orm';

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

    const [project] = await db
      .select()
      .from(feedbackProjects)
      .where(eq(feedbackProjects.id, id))
      .limit(1);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Proyecto no encontrado' },
        { status: 404 }
      );
    }

    const [commentStats] = await db
      .select({
        total: count(),
        pending: sql<number>`count(*) filter (where ${feedbackComments.status} = 'pending')`,
        inProgress: sql<number>`count(*) filter (where ${feedbackComments.status} = 'in_progress')`,
        resolved: sql<number>`count(*) filter (where ${feedbackComments.status} = 'resolved')`,
        dismissed: sql<number>`count(*) filter (where ${feedbackComments.status} = 'dismissed')`,
      })
      .from(feedbackComments)
      .where(eq(feedbackComments.projectId, id));

    const [clientStats] = await db
      .select({
        total: count(),
        active: sql<number>`count(*) filter (where ${clientAccesses.isActive} = true)`,
      })
      .from(clientAccesses)
      .where(eq(clientAccesses.projectId, id));

    return NextResponse.json({
      success: true,
      data: {
        ...project,
        stats: {
          comments: commentStats,
          clients: clientStats,
        },
      },
    });
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PATCH(
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

    const body = await req.json();
    const parsed = updateProjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(feedbackProjects)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(feedbackProjects.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Proyecto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const [deleted] = await db
      .delete(feedbackProjects)
      .where(eq(feedbackProjects.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Proyecto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { id: deleted.id } });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
