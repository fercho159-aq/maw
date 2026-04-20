

"use server";

import { db } from "@/lib/db";
import { cuentasPorCobrar, movimientosDiarios, type NewCuentaPorCobrar, type CuentaPorCobrar, type MovimientoDiario, type NewMovimientoDiario } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { addMonths, format } from "date-fns";
import { es } from "date-fns/locale";

const IVA_RATE = 0.16;

export async function getCuentasPorCobrar() {
    try {
        const allCpc = await db.query.cuentasPorCobrar.findMany({
            orderBy: [desc(cuentasPorCobrar.id)],
        });
        return allCpc;
    } catch (error) {
        console.error("Error fetching cpc:", error);
        return [];
    }
}

export async function getMovimientos() {
    try {
        const allMovimientos = await db.query.movimientosDiarios.findMany({
            orderBy: [desc(movimientosDiarios.fecha)],
        });
        return allMovimientos;
    } catch (error) {
        console.error("Error fetching movimientos:", error);
        return [];
    }
}

export async function addCpc(data: Omit<NewCuentaPorCobrar, 'id'>): Promise<{ cpc: CuentaPorCobrar }> {
    try {
        const [newCpc] = await db.insert(cuentasPorCobrar).values(data).returning();

        if (!newCpc) {
            throw new Error("Failed to create the cpc record.");
        }
        revalidatePath("/equipo/dashboard/finanzas");
        return { cpc: newCpc };

    } catch (error: any) {
        console.error("Error adding cpc:", error);
        throw new Error(error.message || "Could not add cpc");
    }
}


export async function updateCpc(id: number, data: Partial<Omit<NewCuentaPorCobrar, 'id' | 'clienteId' | 'clienteName'>>) {
    try {
        await db.update(cuentasPorCobrar).set(data).where(eq(cuentasPorCobrar.id, id)).returning();
        revalidatePath("/equipo/dashboard/finanzas");
    } catch (error: any) {
        console.error("Error updating cpc:", error);
        throw new Error(error.message || "Could not update cpc");
    }
}

const parsePeriodoDate = (periodoString: string): Date | null => {
    const months: Record<string, number> = { 'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11 };

    // Regex para capturar "DD de mes"
    const match = periodoString.toLowerCase().match(/(\d{1,2}) de (\w+)/);

    if (match) {
        const day = parseInt(match[1]);
        const monthName = match[2];
        const month = months[monthName];

        // Asumimos el año actual si no se especifica, pero intentamos buscar uno
        const yearMatch = periodoString.match(/(\d{4})/);
        const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();

        if (!isNaN(day) && month !== undefined) {
            // Handle cases like "31 de enero de 2025", we need to make sure the year is correctly parsed
            // If the month is december and current month is january, we might be in the next year.
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            if (currentMonth === 0 && month === 11 && !yearMatch) {
                return new Date(currentYear - 1, month, day);
            }
            return new Date(year, month, day);
        }
    }
    return null;
}

export async function registrarPagoCpc(cpcId: number, cuentaDestino: string, detalleCuenta: string | null) {
    try {
        // Since neon-http driver doesn't support transactions, we'll run operations sequentially.

        // 1. Fetch the cpc to pay
        const cpcToPay = await db.query.cuentasPorCobrar.findFirst({
            where: eq(cuentasPorCobrar.id, cpcId),
        });

        if (!cpcToPay) {
            throw new Error("La cuenta por cobrar que intentas pagar ya no existe.");
        }

        const ivaAmount = cpcToPay.conIva ? cpcToPay.monto * IVA_RATE : 0;
        const totalAmount = cpcToPay.monto + ivaAmount;

        // 2. Create income movement
        await db.insert(movimientosDiarios).values({
            fecha: new Date(),
            tipo: 'Ingreso',
            descripcion: cpcToPay.concepto || `Pago de ${cpcToPay.clienteName} - ${cpcToPay.tipo} (${cpcToPay.periodo})`,
            monto: totalAmount, // Se registra el monto total (con IVA si aplica)
            cuenta: cuentaDestino,
            detalleCuenta: detalleCuenta,
            categoria: cpcToPay.tipo,
            cpcId: cpcToPay.id,
            clienteName: cpcToPay.clienteName, // Guardar el nombre del cliente
            conIva: cpcToPay.conIva,
            iva: ivaAmount > 0 ? ivaAmount : null,
        });

        // 3. Recreate recurrent payment for the next month if applicable
        const isRecurrent = ['Iguala Contenido', 'Iguala Web', 'Iguala Ads'].includes(cpcToPay.tipo);
        if (isRecurrent && cpcToPay.periodo) {
            const startDate = parsePeriodoDate(cpcToPay.periodo);
            if (startDate) {
                const nextMonthDate = addMonths(startDate, 1);
                const newPeriod = `Del ${format(nextMonthDate, 'd \'de\' MMMM', { locale: es })} al ${format(addMonths(nextMonthDate, 1), 'd \'de\' MMMM \'de\' yyyy', { locale: es })}`;
                const newFechaCobro = cpcToPay.fecha_cobro ? format(addMonths(parsePeriodoDate(cpcToPay.fecha_cobro)!, 1), "d 'de' MMMM 'de' yyyy", { locale: es }) : undefined;

                const existingNext = await db.query.cuentasPorCobrar.findFirst({
                    where: and(
                        eq(cuentasPorCobrar.clienteId, cpcToPay.clienteId),
                        eq(cuentasPorCobrar.tipo, cpcToPay.tipo),
                        eq(cuentasPorCobrar.periodo, newPeriod)
                    )
                });

                if (!existingNext) {
                    await db.insert(cuentasPorCobrar).values({
                        clienteId: cpcToPay.clienteId,
                        clienteName: cpcToPay.clienteName,
                        periodo: newPeriod,
                        monto: cpcToPay.monto,
                        tipo: cpcToPay.tipo,
                        fecha_cobro: newFechaCobro,
                        conIva: cpcToPay.conIva,
                        concepto: cpcToPay.concepto,
                    });
                }
            }
        }

        // 4. Delete the paid cpc record
        await db.delete(cuentasPorCobrar).where(eq(cuentasPorCobrar.id, cpcId));

        revalidatePath("/equipo/dashboard/finanzas");
    } catch (error: any) {
        console.error("Error registering cpc payment:", error);
        throw new Error(error.message || "Could not register cpc payment");
    }
}


export async function deleteCpc(id: number) {
    try {
        // Just delete the cpc, no related movement to delete anymore from this action.
        await db.delete(cuentasPorCobrar).where(eq(cuentasPorCobrar.id, id));
        revalidatePath("/equipo/dashboard/finanzas");
    } catch (error: any) {
        console.error("Error deleting cpc:", error);
        throw new Error(error.message || "Could not delete cpc");
    }
}


export async function addMovimiento(data: Omit<NewMovimientoDiario, 'id' | 'iva'> & { conIva?: boolean }) {
    try {
        const ivaAmount = data.conIva ? data.monto * IVA_RATE : null;
        const montoTotal = data.monto + (ivaAmount || 0);

        await db.insert(movimientosDiarios).values({
            ...data,
            monto: montoTotal,
            iva: ivaAmount,
        });
        revalidatePath("/equipo/dashboard/finanzas");
    } catch (error: any) {
        console.error("Error adding movimiento:", error);
        throw new Error(error.message || "Could not add movimiento");
    }
}

export async function updateMovimiento(id: number, data: Partial<Omit<NewMovimientoDiario, 'id' | 'iva'>> & { conIva?: boolean }) {
    try {
        const montoBase = data.monto; // Asumimos que el monto que llega es el base.
        const updates: Partial<NewMovimientoDiario> = { ...data };

        if (montoBase !== undefined && 'conIva' in data) {
            const ivaAmount = data.conIva ? montoBase * IVA_RATE : 0;
            updates.iva = ivaAmount > 0 ? ivaAmount : null;
            updates.monto = montoBase + ivaAmount; // Guardamos el monto total
        } else if ('conIva' in data && data.conIva === false) {
            updates.iva = null;
            updates.monto = montoBase; // El monto es solo el base
        }

        await db.update(movimientosDiarios).set(updates).where(eq(movimientosDiarios.id, id));
        revalidatePath("/equipo/dashboard/finanzas");
    } catch (error: any) {
        console.error("Error updating movimiento:", error);
        throw new Error(error.message || "Could not update movimiento");
    }
}

export async function deleteMovimiento(id: number) {
    try {
        await db.delete(movimientosDiarios).where(eq(movimientosDiarios.id, id));
        revalidatePath("/equipo/dashboard/finanzas");
    } catch (error: any) {
        console.error("Error deleting movimiento:", error);
        throw new Error(error.message || "Could not delete movimiento");
    }
}
