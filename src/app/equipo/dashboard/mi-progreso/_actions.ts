

"use server";

import { db } from "@/lib/db";
import { como_voy_en_mis_finanzas, NewComoVoyEnMisFinanzas, activos_maw, NewActivo, pasivos_maw, NewPasivo, cuentasPorCobrar } from "@/lib/db/schema";
import { eq, and, sql, sum } from 'drizzle-orm';
import { revalidatePath } from "next/cache";

export type PersonalFinanceTransaction = Omit<NewComoVoyEnMisFinanzas, 'id'> & { id?: number };

export async function getPersonalFinance() {
    try {
        const data = await db.query.como_voy_en_mis_finanzas.findMany();
        return data;
    } catch (error) {
        console.error("Error fetching personal finance data:", error);
        return [];
    }
}

export async function updatePersonalFinanceEntry(entry: PersonalFinanceTransaction) {
    try {
        const { fecha, categoria, ...rest } = entry;
        const entryDate = new Date(fecha);
        if (isNaN(entryDate.getTime())) {
            throw new Error('Invalid date provided for personal finance entry.');
        }

        const year = entryDate.getUTCFullYear();
        const month = entryDate.getUTCMonth();

        const existingEntries = await db.select().from(como_voy_en_mis_finanzas).where(
            and(
                eq(como_voy_en_mis_finanzas.categoria, categoria!),
                eq(sql`EXTRACT(MONTH FROM fecha)`, month + 1),
                eq(sql`EXTRACT(YEAR FROM fecha)`, year)
            )
        );

        if (existingEntries.length > 0) {
            const idToUpdate = existingEntries[0].id;
            await db.update(como_voy_en_mis_finanzas).set({
                monto: Math.abs(rest.monto!),
                tipo: rest.monto! >= 0 ? 'INGRESO' : 'GASTO',
                descripcion: rest.descripcion,
            }).where(eq(como_voy_en_mis_finanzas.id, idToUpdate));

        } else {
            await db.insert(como_voy_en_mis_finanzas).values({
                fecha: entryDate,
                categoria,
                monto: Math.abs(rest.monto!),
                tipo: rest.monto! >= 0 ? 'INGRESO' : 'GASTO',
                descripcion: rest.descripcion,
                cuenta: 'Efectivo', 
            });
        }

        revalidatePath('/equipo/dashboard/mi-progreso');

    } catch (error) {
        console.error("Error updating personal finance entry:", error);
        throw new Error("No se pudo actualizar la entrada financiera.");
    }
}


// --- Balance Sheet Actions ---

export async function getBalanceSheetData() {
    try {
        const [activos, pasivos, cxcResult] = await Promise.all([
            db.query.activos_maw.findMany(),
            db.query.pasivos_maw.findMany(),
            db.select({ total: sum(cuentasPorCobrar.monto) }).from(cuentasPorCobrar)
        ]);

        const totalCuentasPorCobrar = Number(cxcResult[0]?.total || 0);

        return { activos, pasivos, totalCuentasPorCobrar };
    } catch (error) {
        console.error("Error fetching balance sheet data:", error);
        return { activos: [], pasivos: [], totalCuentasPorCobrar: 0 };
    }
}

export async function addActivo(data: Omit<NewActivo, 'id'>) {
    try {
        await db.insert(activos_maw).values(data);
        revalidatePath('/equipo/dashboard/mi-progreso');
    } catch (error) {
        console.error("Error adding asset:", error);
        throw new Error("No se pudo añadir el activo.");
    }
}

export async function updateActivo(id: number, data: Partial<Omit<NewActivo, 'id'>>) {
    try {
        await db.update(activos_maw).set(data).where(eq(activos_maw.id, id));
        revalidatePath('/equipo/dashboard/mi-progreso');
    } catch (error) {
        console.error("Error updating asset:", error);
        throw new Error("No se pudo actualizar el activo.");
    }
}

export async function deleteActivo(id: number) {
    try {
        await db.delete(activos_maw).where(eq(activos_maw.id, id));
        revalidatePath('/equipo/dashboard/mi-progreso');
    } catch (error) {
        console.error("Error deleting asset:", error);
        throw new Error("No se pudo eliminar el activo.");
    }
}

export async function addPasivo(data: Omit<NewPasivo, 'id'>) {
    try {
        await db.insert(pasivos_maw).values(data);
        revalidatePath('/equipo/dashboard/mi-progreso');
    } catch (error) {
        console.error("Error adding liability:", error);
        throw new Error("No se pudo añadir el pasivo.");
    }
}

export async function updatePasivo(id: number, data: Partial<Omit<NewPasivo, 'id'>>) {
    try {
        await db.update(pasivos_maw).set(data).where(eq(pasivos_maw.id, id));
        revalidatePath('/equipo/dashboard/mi-progreso');
    } catch (error) {
        console.error("Error updating liability:", error);
        throw new Error("No se pudo actualizar el pasivo.");
    }
}

export async function deletePasivo(id: number) {
    try {
        await db.delete(pasivos_maw).where(eq(pasivos_maw.id, id));
        revalidatePath('/equipo/dashboard/mi-progreso');
    } catch (error) {
        console.error("Error deleting liability:", error);
        throw new Error("No se pudo eliminar el pasivo.");
    }
}
