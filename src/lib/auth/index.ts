
'use server';

import { db } from "@/lib/db";
import { colaboradores } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs';
import type { Colaborador } from "@/lib/db/schema";

export async function login(credentials: {username: string, password: string}): Promise<Colaborador | {error: string}> {
    try {
        const user = await db.query.colaboradores.findFirst({
            where: eq(colaboradores.username, credentials.username),
        });

        if (!user || !user.password) {
            return { error: 'Usuario o contraseña incorrectos.' };
        }

        let passwordMatch = false;
        let isPlainTextPassword = false;

        // Intentar comparar como hash
        try {
            passwordMatch = await bcrypt.compare(credentials.password, user.password);
        } catch (e) {
            // Si bcrypt falla, probablemente no es un hash, así que intentamos comparación de texto plano
            passwordMatch = false;
        }
        
        // Si no coincidió como hash, intentar como texto plano
        if (!passwordMatch && user.password === credentials.password) {
            passwordMatch = true;
            isPlainTextPassword = true;
        }

        if (!passwordMatch) {
            return { error: 'Usuario o contraseña incorrectos.' };
        }
        
        // Si la contraseña era de texto plano, la hasheamos y la actualizamos en la BD
        if (isPlainTextPassword) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            await db.update(colaboradores)
                .set({ password: hashedPassword })
                .where(eq(colaboradores.id, user.id));
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;

    } catch (error) {
        console.error('Login error:', error);
        return { error: 'Ocurrió un error en el servidor.' };
    }
}
