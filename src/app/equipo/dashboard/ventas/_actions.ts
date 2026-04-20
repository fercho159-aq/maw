
"use server";

import { db } from "@/lib/db";
import { prospects_maw, type NewProspect } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { addClient, type NewClientData } from '../clientes/_actions';


export async function getProspects() {
  try {
    const allProspects = await db.query.prospects_maw.findMany({
      orderBy: [desc(prospects_maw.createdAt)],
    });
    return allProspects;
  } catch (error) {
    console.error("Error fetching prospects:", error);
    return [];
  }
}

export async function addMawProspect(data: Partial<Omit<NewProspect, 'id' | 'createdAt'>>) {
    try {
        if (!data.company) {
            throw new Error("Company name is required.");
        }
        await db.insert(prospects_maw).values({
            name: data.name, 
            company: data.company,
            phone: data.phone,
            email: data.email,
            source: data.source || 'Manual',
            status: data.status || 'Lead Nuevo',
            responsable: data.responsable as any || 'Sin asignar', // Cambiado
            data: data.data,
            notas: data.notas,
        });
        revalidatePath("/equipo/dashboard/ventas");
    } catch (error: any) {
        console.error("Error adding prospect:", error);
        throw new Error("No se pudo añadir el prospecto a la base de datos: " + error.message);
    }
}

export async function bulkAddMawProspects(prospects: Partial<Omit<NewProspect, 'id' | 'createdAt'>>[]) {
    if (!prospects || prospects.length === 0) {
        return;
    }
    try {
        const prospectsToInsert = prospects.map(prospect => {
            return {
                 name: prospect.name || prospect.company, 
                company: prospect.company,
                phone: prospect.phone,
                email: prospect.email,
                source: prospect.source || 'Campaña',
                status: 'Lead Nuevo',
                responsable: 'Sin asignar', // Cambiado
                data: prospect.data,
                notas: prospect.notas,
            }
        });

        await db.insert(prospects_maw).values(prospectsToInsert);

        revalidatePath("/equipo/dashboard/ventas");
    } catch (error: any) {
        console.error("Error bulk adding prospects:", error);
        throw new Error("No se pudieron añadir los prospectos a la base de datos: " + error.message);
    }
}

export async function convertProspectToClient(prospectId: number, clientData: NewClientData) {
    try {
        // 1. Update prospect status to 'Convertido'
        await db.update(prospects_maw).set({ status: 'Convertido' }).where(eq(prospects_maw.id, prospectId));

        // 2. Add the new client using the existing action
        await addClient(clientData);

        // 3. Revalidate paths for both pages
        revalidatePath('/equipo/dashboard/ventas');
        revalidatePath('/equipo/dashboard/clientes');
        revalidatePath('/equipo/dashboard/pendientes');

    } catch (error) {
        console.error("Error converting prospect to client:", error);
        throw new Error("No se pudo convertir el prospecto a cliente.");
    }
}

export async function updateProspect(id: number, data: Partial<Omit<NewProspect, 'id' | 'createdAt'>>) {
    try {
        await db.update(prospects_maw).set(data).where(eq(prospects_maw.id, id));
        revalidatePath("/equipo/dashboard/ventas");
    } catch (error) {
        console.error("Error updating prospect:", error);
        throw new Error("No se pudo actualizar el prospecto.");
    }
}

export async function deleteProspect(id: number) {
    try {
        await db.delete(prospects_maw).where(eq(prospects_maw.id, id));
        revalidatePath("/equipo/dashboard/ventas");
    } catch (error: any) {
        console.error("Error deleting prospect:", error);
        throw new Error(error.message || "No se pudo eliminar el prospecto.");
    }
}
