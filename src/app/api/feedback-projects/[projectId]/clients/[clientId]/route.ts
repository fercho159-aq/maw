import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { clientAccesses } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ projectId: string; clientId: string }> }
) {
  try {
    const { projectId, clientId } = await params;
    const projectIdNum = parseInt(projectId, 10);
    const clientIdNum = parseInt(clientId, 10);
    if (isNaN(projectIdNum) || isNaN(clientIdNum)) {
      return NextResponse.json(
        { success: false, error: 'Parámetros inválidos' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const updateData: Record<string, unknown> = { updatedAt: new Date() };

    if (body.clientName !== undefined) {
      updateData.clientName = body.clientName;
    }
    if (body.email !== undefined) {
      updateData.email = body.email;
    }
    if (body.isActive !== undefined) {
      updateData.isActive = body.isActive;
    }
    if (body.resetPassword) {
      if (typeof body.resetPassword !== 'string' || body.resetPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: 'La nueva contraseña debe tener al menos 6 caracteres' },
          { status: 400 }
        );
      }
      updateData.passwordHash = await bcrypt.hash(body.resetPassword, 12);
    }

    const [updated] = await db
      .update(clientAccesses)
      .set(updateData)
      .where(
        and(
          eq(clientAccesses.id, clientIdNum),
          eq(clientAccesses.projectId, projectIdNum)
        )
      )
      .returning({
        id: clientAccesses.id,
        clientName: clientAccesses.clientName,
        email: clientAccesses.email,
        projectId: clientAccesses.projectId,
        isActive: clientAccesses.isActive,
        lastLoginAt: clientAccesses.lastLoginAt,
        createdAt: clientAccesses.createdAt,
        updatedAt: clientAccesses.updatedAt,
      });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Cliente no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update client error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ projectId: string; clientId: string }> }
) {
  try {
    const { projectId, clientId } = await params;
    const projectIdNum = parseInt(projectId, 10);
    const clientIdNum = parseInt(clientId, 10);
    if (isNaN(projectIdNum) || isNaN(clientIdNum)) {
      return NextResponse.json(
        { success: false, error: 'Parámetros inválidos' },
        { status: 400 }
      );
    }

    // Soft delete: set isActive = false
    const [updated] = await db
      .update(clientAccesses)
      .set({ isActive: false, updatedAt: new Date() })
      .where(
        and(
          eq(clientAccesses.id, clientIdNum),
          eq(clientAccesses.projectId, projectIdNum)
        )
      )
      .returning({ id: clientAccesses.id });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Cliente no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { id: updated.id } });
  } catch (error) {
    console.error('Delete client error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
