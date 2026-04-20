

"use server";

import { db } from "@/lib/db";
import { pendientes_maw, recordingEvents, NewRecordingEvent, PendienteMaw, clientFinancialProfiles, NewClientFinancialProfile, clients, Client } from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getPendientes() {
    try {
        const allPendientes = await db.query.pendientes_maw.findMany({
            with: {
                recordingEvent: true,
                client: {
                    with: {
                        financialProfile: true,
                    }
                }
            }
        });
        return allPendientes;
    } catch (error) {
        console.error("Error fetching pendientes:", error);
        return [];
    }
}

export type NewPendienteData = Omit<PendienteMaw, 'id' | 'createdAt'>;

export async function addPendiente(data: Omit<NewPendienteData, 'id' | 'createdAt'>) {
    try {
        await db.insert(pendientes_maw).values(data);
        // revalidatePath("/equipo/dashboard/pendientes");
    } catch (error) {
        console.error("Error adding pendiente:", error);
        throw new Error("Could not add pendiente");
    }
}

export async function updatePendiente(id: number, data: Partial<NewPendienteData>) {
    try {
        await db.update(pendientes_maw).set(data).where(eq(pendientes_maw.id, id));
        // revalidatePath("/equipo/dashboard/pendientes");
    } catch (error) {
        console.error("Error updating pendiente:", error);
        throw new Error("Could not update pendiente");
    }
}

export async function updateClientFinancialProfile(clientId: number, data: Partial<Omit<NewClientFinancialProfile, 'id' | 'clientId'>>) {
     try {
        const existingProfile = await db.query.clientFinancialProfiles.findFirst({
            where: eq(clientFinancialProfiles.clientId, clientId),
        });

        if (existingProfile) {
            await db.update(clientFinancialProfiles).set(data).where(eq(clientFinancialProfiles.id, existingProfile.id));
        } else {
            await db.insert(clientFinancialProfiles).values({ clientId, ...data });
        }

        revalidatePath("/equipo/dashboard/pendientes");
    } catch (error) {
        console.error("Error updating client financial profile:", error);
        throw new Error("Could not update client financial profile");
    }
}

export async function updateClientPublicaciones(clientId: number, data: { publicacionesAlMes?: string | null; publicacionesALaSemana?: string | null }) {
    try {
        await db.update(clients).set(data).where(eq(clients.id, clientId));
        revalidatePath("/equipo/dashboard/pendientes");
    } catch (error) {
        console.error("Error updating client publicaciones:", error);
        throw new Error("Could not update client publicaciones");
    }
}


export async function deletePendientes(ids: number[]) {
    try {
        // First delete associated recording events to avoid foreign key constraint violations
        await db.delete(recordingEvents).where(inArray(recordingEvents.pendienteId, ids));
        // Then delete the pendientes
        await db.delete(pendientes_maw).where(inArray(pendientes_maw.id, ids));
        // revalidatePath("/equipo/dashboard/pendientes");
    } catch (error) {
        console.error("Error deleting pendientes:", error);
        throw new Error("No se pudo eliminar los pendientes. Verifica si tienen eventos de grabación asociados.");
    }
}

export async function scheduleRecording(data: Omit<NewRecordingEvent, 'id'>) {
    try {
        // Check if an event for this pendiente already exists
        const existingEvent = await db.query.recordingEvents.findFirst({
            where: data.pendienteId ? eq(recordingEvents.pendienteId, data.pendienteId) : undefined,
        });

        if (existingEvent) {
            // Update
            await db.update(recordingEvents).set(data).where(eq(recordingEvents.id, existingEvent.id));
        } else {
            // Insert
            await db.insert(recordingEvents).values(data);
        }
        revalidatePath("/equipo/dashboard/calendario");
    } catch (error) {
        console.error("Error scheduling recording:", error);
        throw new Error("Could not schedule recording");
    }
}

export async function deleteRecording(pendienteId: number) {
    try {
        await db.delete(recordingEvents).where(eq(recordingEvents.pendienteId, pendienteId));
        revalidatePath("/equipo/dashboard/calendario");
    } catch (error) {
        console.error("Error deleting recording:", error);
        throw new Error("Could not delete recording");
    }
}

export async function getRecordingEvents() {
    try {
        const events = await db.query.recordingEvents.findMany();
        return events;
    } catch (error) {
        console.error("Error fetching recording events:", error);
        return [];
    }
}
