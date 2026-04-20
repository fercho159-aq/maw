
"use server";

import { db } from "@/lib/db";
import { prospects_maw, type NewProspect } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function addLead(data: Partial<Omit<NewProspect, 'id' | 'createdAt' | 'responsable' | 'status'>>) {
  try {
    if (!data.company) {
        // Fallback if company name is somehow not provided, though forms should require it.
        data.company = data.name || 'Empresa no especificada';
    }
    
    await db.insert(prospects_maw).values({
        name: data.name,
        company: data.company,
        phone: data.phone,
        email: data.email,
        source: data.source || 'Sitio Web',
        status: 'Lead Nuevo',
        responsable: 'Sin asignar', // Se establece como 'Sin asignar'
        data: data.data,
        notas: data.notas,
    });
    
    revalidatePath("/equipo/dashboard/ventas"); 

  } catch (error) {
    console.error("Error adding lead to prospects_maw:", error);
    // We don't want to throw an error to the client, just log it.
  }
}
