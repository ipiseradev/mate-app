"use server";

import { and, eq, ilike } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { obtenerNegocioDeUsuario } from "@/lib/db/queries";
import { facturas, productosDetectados, proveedores } from "@/lib/db/schema";

const productoSchema = z.object({
  nombre: z.string().trim().min(1).max(200),
  cantidad: z.number().positive(),
  precioUnitario: z.number().nonnegative(),
});

const facturaSchema = z.object({
  proveedor: z.string().trim().min(1, "Ingresá el proveedor").max(200),
  fecha: z.string().optional(),
  productos: z.array(productoSchema).min(1, "Agregá al menos un producto"),
});

export type CrearFacturaState = { error?: string };

export async function crearFactura(
  negocioId: string,
  _prev: CrearFacturaState,
  formData: FormData
): Promise<CrearFacturaState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Tenés que iniciar sesión." };
  }

  const negocio = await obtenerNegocioDeUsuario(negocioId, session.user.id);
  if (!negocio) {
    return { error: "Ese negocio no existe o no te pertenece." };
  }

  const productosJson = formData.get("productosJson");
  let productosRaw: unknown;
  try {
    productosRaw = JSON.parse(
      typeof productosJson === "string" ? productosJson : "[]"
    );
  } catch {
    return { error: "Los productos cargados no son válidos." };
  }

  const parsed = facturaSchema.safeParse({
    proveedor: formData.get("proveedor"),
    fecha: formData.get("fecha") || undefined,
    productos: productosRaw,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const [proveedorExistente] = await db
    .select({ id: proveedores.id })
    .from(proveedores)
    .where(
      and(
        eq(proveedores.negocioId, negocio.id),
        ilike(proveedores.nombre, parsed.data.proveedor)
      )
    )
    .limit(1);

  const proveedorId = proveedorExistente
    ? proveedorExistente.id
    : (
        await db
          .insert(proveedores)
          .values({ negocioId: negocio.id, nombre: parsed.data.proveedor })
          .returning({ id: proveedores.id })
      )[0].id;

  const fecha = parsed.data.fecha ? new Date(parsed.data.fecha) : null;
  const fechaValida = fecha && !Number.isNaN(fecha.getTime()) ? fecha : null;

  const [factura] = await db
    .insert(facturas)
    .values({
      negocioId: negocio.id,
      proveedorId,
      estado: "confirmada",
      fecha: fechaValida,
    })
    .returning({ id: facturas.id });

  await db.insert(productosDetectados).values(
    parsed.data.productos.map((producto) => ({
      facturaId: factura.id,
      nombreDetectado: producto.nombre,
      nombreCanonico: producto.nombre.trim().toLowerCase(),
      cantidad: producto.cantidad.toFixed(2),
      precioUnitario: producto.precioUnitario.toFixed(2),
      confirmadoPorUsuario: true,
    }))
  );

  redirect(`/dashboard/negocios/${negocio.id}/facturas/${factura.id}`);
}
