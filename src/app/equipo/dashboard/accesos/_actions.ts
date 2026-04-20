
"use server";

import { db } from "@/lib/db";
import { accesses, NewAccess } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAccesses() {
  try {
    const allAccesses = await db.query.accesses.findMany({
        orderBy: [desc(accesses.client)]
    });
    return allAccesses;
  } catch (error) {
    console.error("Error fetching accesses:", error);
    return [];
  }
}

export async function addAccess(data: Partial<Omit<NewAccess, 'id'>>) {
  try {
    await db.insert(accesses).values(data as NewAccess);
    revalidatePath("/equipo/dashboard/accesos");
  } catch (error) {
    console.error("Error adding access:", error);
    throw new Error("Could not add access");
  }
}

export async function updateAccess(id: number, data: Partial<Omit<NewAccess, 'id'>>) {
    try {
        await db.update(accesses).set(data).where(eq(accesses.id, id));
        revalidatePath("/equipo/dashboard/accesos");
    } catch (error) {
        console.error("Error updating access:", error);
        throw new Error("Could not update access");
    }
}

export async function deleteAccess(id: number) {
    try {
        await db.delete(accesses).where(eq(accesses.id, id));
        revalidatePath("/equipo/dashboard/accesos");
    } catch (error) {
        console.error("Error deleting access:", error);
        throw new Error("Could not delete access");
    }
}
