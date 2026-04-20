
'use server';

import { db } from '@/lib/db';
import { clients, Client, dominios_hostinger, DominioHostinger } from '@/lib/db/schema';
import { eq, asc, gte, lte, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getClientsWithRenovations() {
  try {
    const allClients = await db.query.clients.findMany({
      orderBy: (clients, { asc }) => [asc(clients.name)],
    });
    return allClients;
  } catch (error) {
    console.error("Error fetching clients for renovations:", error);
    return [];
  }
}

export async function updateClientRenovationDate(clientId: number, field: keyof Client, date: Date | null) {
    try {
        await db.update(clients)
            .set({ [field]: date })
            .where(eq(clients.id, clientId));

        revalidatePath('/equipo/dashboard/renovaciones');
    } catch(error) {
        console.error(`Error updating ${String(field)} for client ${clientId}:`, error);
        throw new Error('Could not update renovation date');
    }
}

export async function getDominiosHostinger(): Promise<DominioHostinger[]> {
  try {
    const dominios = await db.query.dominios_hostinger.findMany({
      orderBy: (d, { asc }) => [asc(d.fecha_expiracion)],
    });
    return dominios;
  } catch (error) {
    console.error("Error fetching dominios hostinger:", error);
    return [];
  }
}

export async function seedDominiosHostinger(data: { dominio: string; status: string; fecha_expiracion: string; dias_restantes: number }[]) {
  try {
    for (const item of data) {
      await db.insert(dominios_hostinger)
        .values({
          dominio: item.dominio,
          status: item.status,
          fecha_expiracion: new Date(item.fecha_expiracion),
          dias_restantes: item.dias_restantes,
        })
        .onConflictDoUpdate({
          target: dominios_hostinger.dominio,
          set: {
            status: item.status,
            fecha_expiracion: new Date(item.fecha_expiracion),
            dias_restantes: item.dias_restantes,
          },
        });
    }
    revalidatePath('/equipo/dashboard/renovaciones');
    return { success: true };
  } catch (error) {
    console.error("Error seeding dominios:", error);
    throw new Error('Could not seed dominios');
  }
}

export async function getDominiosProximosAExpirar(): Promise<DominioHostinger[]> {
  try {
    const today = new Date();
    const in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);

    const dominios = await db
      .select()
      .from(dominios_hostinger)
      .where(
        and(
          gte(dominios_hostinger.fecha_expiracion, today),
          lte(dominios_hostinger.fecha_expiracion, in30Days)
        )
      )
      .orderBy(asc(dominios_hostinger.fecha_expiracion));

    return dominios;
  } catch (error) {
    console.error("Error fetching dominios proximos a expirar:", error);
    return [];
  }
}
