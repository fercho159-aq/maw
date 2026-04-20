
"use server";

import { db } from "@/lib/db";
import { clients, pendientes_maw, clientFinancialProfiles, NewClient } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getClients() {
  try {
    const allClients = await db.query.clients.findMany({
      with: {
        financialProfile: true,
      }
    });
    return allClients;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}

export type NewClientData = Omit<NewClient, 'id' | 'createdAt'> & {
  responsables?: {
    contenido?: { ejecutor: string };
    ads?: { responsable: string };
    web?: { responsable: string };
  }
};

export async function addClient(data: NewClientData) {
  try {
    const instagramFollowers = data.instagramUrl ? Math.floor(Math.random() * 5000) + 500 : 0;
    const facebookFollowers = data.facebookUrl ? Math.floor(Math.random() * 10000) + 1000 : 0;
    const tiktokFollowers = data.tiktokUrl ? Math.floor(Math.random() * 20000) + 200 : 0;

    const clientValues = {
      name: data.name,
      representativeName: data.representativeName,
      whatsapp: data.whatsapp,
      email: data.email,
      managedAreas: data.managedAreas,
      instagramUrl: data.instagramUrl,
      facebookUrl: data.facebookUrl,
      tiktokUrl: data.tiktokUrl,
      instagramFollowers,
      facebookFollowers,
      tiktokFollowers,
    };

    // 1. Insertar el cliente y obtener su ID
    const [newClient] = await db.insert(clients).values(clientValues).returning({ id: clients.id });

    if (!newClient || !newClient.id) {
      throw new Error("Failed to create client record and get an ID.");
    }

    // 2. Crear perfil financiero asociado con valores por defecto
    await db.insert(clientFinancialProfiles).values({
      clientId: newClient.id,
      fechaCorte: 15, // Default
      contenidoProgramadoHasta: 15, // Default
    });

    // 3. Crear pendientes iniciales si hay áreas gestionadas
    if (data.managedAreas && data.managedAreas.length > 0 && data.responsables) {
      const pendientesToInsert: Omit<typeof pendientes_maw.$inferInsert, 'id' | 'createdAt'>[] = [];

      for (const area of data.managedAreas) {
        let ejecutor = '';

        if (area === 'Contenido' && data.responsables.contenido?.ejecutor) {
          ejecutor = data.responsables.contenido.ejecutor;
        } else if (area === 'Ads' && data.responsables.ads?.responsable) {
          ejecutor = data.responsables.ads.responsable;
        } else if (area === 'Web' && data.responsables.web?.responsable) {
          ejecutor = data.responsables.web.responsable;
        }

        if (ejecutor) {
          pendientesToInsert.push({
            clientId: newClient.id,
            clienteName: data.name,
            ejecutor,
            categoria: area,
            pendientePrincipal: `Kick-off y configuración inicial del área de ${area}.`,
            status: 'Trabajando',
            completed: false,
          });
        }
      }
      if (pendientesToInsert.length > 0) {
        await db.insert(pendientes_maw).values(pendientesToInsert);
      }
    }

    revalidatePath("/equipo/dashboard/clientes");
    revalidatePath("/equipo/dashboard/pendientes");
    revalidatePath("/equipo/dashboard/finanzas");

  } catch (error: any) {
    console.error("Error adding client:", error);
    // Lanza un error más descriptivo si es posible
    throw new Error(`Could not add client: ${error.message || 'An unknown error occurred'}`);
  }
}


export async function updateClient(id: number, data: Partial<Omit<NewClient, 'id' | 'createdAt'>>) {
  try {
    await db.update(clients).set(data).where(eq(clients.id, id));
    revalidatePath("/equipo/dashboard/clientes");
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error("Could not update client");
  }
}

export async function deleteClients(ids: number[]) {
  try {
    await db.delete(pendientes_maw).where(inArray(pendientes_maw.clientId, ids));
    await db.delete(clientFinancialProfiles).where(inArray(clientFinancialProfiles.clientId, ids));
    await db.delete(clients).where(inArray(clients.id, ids));
    revalidatePath('/equipo/dashboard/clientes');
    revalidatePath('/equipo/dashboard/pendientes');
    revalidatePath('/equipo/dashboard/finanzas');
  } catch (error) {
    console.error("Error deleting clients:", error);
    throw new Error("Could not delete clients. The current database driver may not support cascading deletes properly via `inArray`. Manual sequential deletion is performed.");
  }
}
