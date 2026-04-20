import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { feedbackProjects, feedbackComments, clientAccesses } from '@/lib/db/schema';
import { createProjectSchema } from '@/lib/validations/feedback';
import { eq, and, sql, count } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get('ownerId');

    if (!ownerId) {
      return NextResponse.json(
        { success: false, error: 'ownerId es requerido' },
        { status: 400 }
      );
    }

    const pendingCountSubquery = db
      .select({ count: count().as('pending_count') })
      .from(feedbackComments)
      .where(
        and(
          eq(feedbackComments.projectId, feedbackProjects.id),
          eq(feedbackComments.status, 'pending')
        )
      );

    const clientCountSubquery = db
      .select({ count: count().as('client_count') })
      .from(clientAccesses)
      .where(
        and(
          eq(clientAccesses.projectId, feedbackProjects.id),
          eq(clientAccesses.isActive, true)
        )
      );

    const projects = await db
      .select({
        id: feedbackProjects.id,
        name: feedbackProjects.name,
        siteUrl: feedbackProjects.siteUrl,
        status: feedbackProjects.status,
        ownerId: feedbackProjects.ownerId,
        createdAt: feedbackProjects.createdAt,
        updatedAt: feedbackProjects.updatedAt,
        pendingCount: sql<number>`(${pendingCountSubquery})`.as('pending_count'),
        clientCount: sql<number>`(${clientCountSubquery})`.as('client_count'),
      })
      .from(feedbackProjects)
      .where(eq(feedbackProjects.ownerId, ownerId));

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('List projects error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { ownerId, ...rest } = body;
    if (!ownerId) {
      return NextResponse.json(
        { success: false, error: 'ownerId es requerido' },
        { status: 400 }
      );
    }

    const parsed = createProjectSchema.safeParse(rest);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const [project] = await db
      .insert(feedbackProjects)
      .values({
        name: parsed.data.name,
        siteUrl: parsed.data.siteUrl,
        ownerId,
      })
      .returning();

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
