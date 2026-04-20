import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { clientAccesses } from '@/lib/db/schema';
import { createClientAccessSchema } from '@/lib/validations/feedback';
import { eq, and } from 'drizzle-orm';

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

    const clients = await db
      .select({
        id: clientAccesses.id,
        clientName: clientAccesses.clientName,
        email: clientAccesses.email,
        projectId: clientAccesses.projectId,
        isActive: clientAccesses.isActive,
        lastLoginAt: clientAccesses.lastLoginAt,
        createdAt: clientAccesses.createdAt,
        updatedAt: clientAccesses.updatedAt,
      })
      .from(clientAccesses)
      .where(eq(clientAccesses.projectId, id));

    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    console.error('List clients error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(
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
    const parsed = createClientAccessSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { clientName, email, password } = parsed.data;

    // Check for existing client with same email in this project
    const [existing] = await db
      .select({ id: clientAccesses.id })
      .from(clientAccesses)
      .where(
        and(
          eq(clientAccesses.email, email),
          eq(clientAccesses.projectId, id)
        )
      )
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Ya existe un acceso con este email para este proyecto' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [client] = await db
      .insert(clientAccesses)
      .values({
        clientName,
        email,
        passwordHash,
        projectId: id,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: {
          id: client.id,
          clientName: client.clientName,
          email: client.email,
          projectId: client.projectId,
          isActive: client.isActive,
          createdAt: client.createdAt,
          password, // Plaintext password ONLY in this response
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create client error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
