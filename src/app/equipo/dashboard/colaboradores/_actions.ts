
"use server";

import { db } from "@/lib/db";
import { colaboradores, NewColaborador } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import bcrypt from 'bcryptjs';

export async function getColaboradores() {
  try {
    const allColaboradores = await db.query.colaboradores.findMany();
    return allColaboradores;
  } catch (error) {
    console.error("Error fetching colaboradores:", error);
    return [];
  }
}

export async function addColaborador(data: NewColaborador) {
  try {
    if (!data.name || !data.username || !data.email || !data.role || !data.password) {
        throw new Error("Missing required fields for new collaborator.");
    }
    
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    await db.insert(colaboradores).values({
        ...data,
        id: data.username, 
        password: hashedPassword,
        color: '#'+(Math.random()*0xFFFFFF<<0).toString(16).padStart(6,'0'),
    });
    revalidatePath("/equipo/dashboard/colaboradores");
  } catch (error) {
    console.error("Error adding collaborator:", error);
    throw new Error("Could not add collaborator. Username or email might already exist.");
  }
}

export async function updateColaborador(id: string, data: Partial<NewColaborador>) {
  try {
    const dataToUpdate = { ...data };
    if (data.password) {
      dataToUpdate.password = await bcrypt.hash(data.password, 10);
    } else {
      delete dataToUpdate.password;
    }

    await db.update(colaboradores).set(dataToUpdate).where(eq(colaboradores.id, id));
    revalidatePath("/equipo/dashboard/colaboradores");
  } catch (error) {
    console.error("Error updating collaborator:", error);
    throw new Error("Could not update collaborator.");
  }
}
