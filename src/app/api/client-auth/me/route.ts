import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { clientAccesses, feedbackProjects } from '@/lib/db/schema';
import { getClientFromRequest } from '@/lib/client-auth';
import { eq, and } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const client = await getClientFromRequest(req);
    if (!client) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const [clientAccess] = await db
      .select({
        id: clientAccesses.id,
        clientName: clientAccesses.clientName,
        email: clientAccesses.email,
        projectId: clientAccesses.projectId,
        isActive: clientAccesses.isActive,
        lastLoginAt: clientAccesses.lastLoginAt,
        createdAt: clientAccesses.createdAt,
        project: {
          id: feedbackProjects.id,
          name: feedbackProjects.name,
          siteUrl: feedbackProjects.siteUrl,
          status: feedbackProjects.status,
        },
      })
      .from(clientAccesses)
      .innerJoin(feedbackProjects, eq(clientAccesses.projectId, feedbackProjects.id))
      .where(
        and(
          eq(clientAccesses.id, client.clientAccessId),
          eq(clientAccesses.isActive, true)
        )
      )
      .limit(1);

    if (!clientAccess) {
      return NextResponse.json(
        { success: false, error: 'Acceso no encontrado o desactivado' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: clientAccess,
    });
  } catch (error) {
    console.error('Me error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
