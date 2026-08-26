"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { negocios } from "@/lib/db/schema";

const negocioSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre es demasiado corto").max(100),
});

export type CrearNegocioState = { error?: string };

export async function crearNegocio(
  _prev: CrearNegocioState,
  formData: FormData
): Promise<CrearNegocioState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Tenés que iniciar sesión." };
  }

  const parsed = negocioSchema.safeParse({ nombre: formData.get("nombre") });
  if (!parsed.success) {
    return { error: "Ingresá un nombre de negocio válido." };
  }

  const [negocio] = await db
    .insert(negocios)
    .values({ nombre: parsed.data.nombre, propietarioId: session.user.id })
    .returning({ id: negocios.id });

  redirect(`/dashboard/negocios/${negocio.id}`);
}
