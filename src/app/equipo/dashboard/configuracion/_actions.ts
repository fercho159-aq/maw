"use server";

import { db } from "@/lib/db";
import { colaboradores } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { Colaborador } from "@/lib/db/schema";
import bcrypt from 'bcryptjs';

export async function updateUserProfile(id: string, data: Partial<Colaborador>) {
  try {

    const dataToUpdate: Partial<Colaborador> = { ...data };

    if (data.password) {
      dataToUpdate.password = await bcrypt.hash(data.password, 10);
    } else {
      delete dataToUpdate.password;
    }

    const [updatedUser] = await db.update(colaboradores)
      .set(dataToUpdate)
      .where(eq(colaboradores.id, id))
      .returning();
    
    if (!updatedUser) {
        throw new Error("User not found");
    }

    revalidatePath("/equipo/dashboard/configuracion");
    
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as Colaborador;

  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Could not update user profile");
  }
}
