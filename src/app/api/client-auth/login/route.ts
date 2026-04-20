import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { clientAccesses, feedbackProjects } from '@/lib/db/schema';
import { generateClientToken } from '@/lib/client-auth';
import { loginSchema } from '@/lib/validations/feedback';
import { eq, and } from 'drizzle-orm';

// Simple in-memory rate limiting
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(key);

  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    loginAttempts.set(key, { count: 1, firstAttempt: now });
    return true;
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password, projectId } = parsed.data;
    const rateLimitKey = `${email}:${projectId}`;

    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { success: false, error: 'Demasiados intentos. Intenta de nuevo en 15 minutos.' },
        { status: 429 }
      );
    }

    const [clientAccess] = await db
      .select()
      .from(clientAccesses)
      .where(
        and(
          eq(clientAccesses.email, email),
          eq(clientAccesses.projectId, projectId),
          eq(clientAccesses.isActive, true)
        )
      )
      .limit(1);

    if (!clientAccess) {
      return NextResponse.json(
        { success: false, error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const passwordValid = await bcrypt.compare(password, clientAccess.passwordHash);
    if (!passwordValid) {
      return NextResponse.json(
        { success: false, error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const token = await generateClientToken({
      clientAccessId: clientAccess.id,
      projectId: clientAccess.projectId,
      clientName: clientAccess.clientName,
    });

    await db
      .update(clientAccesses)
      .set({ lastLoginAt: new Date(), updatedAt: new Date() })
      .where(eq(clientAccesses.id, clientAccess.id));

    return NextResponse.json({
      success: true,
      data: {
        token,
        client: {
          id: clientAccess.id,
          clientName: clientAccess.clientName,
          email: clientAccess.email,
          projectId: clientAccess.projectId,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
