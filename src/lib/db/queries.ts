import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { facturas, negocios, productosDetectados, proveedores } from "@/lib/db/schema";

export async function obtenerNegociosDeUsuario(usuarioId: string) {
  return db
    .select()
    .from(negocios)
    .where(eq(negocios.propietarioId, usuarioId))
    .orderBy(desc(negocios.createdAt));
}

export async function obtenerNegocioDeUsuario(
  negocioId: string,
  usuarioId: string
) {
  const [negocio] = await db
    .select()
    .from(negocios)
    .where(
      and(eq(negocios.id, negocioId), eq(negocios.propietarioId, usuarioId))
    )
    .limit(1);

  return negocio ?? null;
}

export async function obtenerProveedoresDeNegocio(negocioId: string) {
  return db
    .select()
    .from(proveedores)
    .where(eq(proveedores.negocioId, negocioId))
    .orderBy(proveedores.nombre);
}

export type ProductoSugerido = {
  nombre: string;
  precioUnitario: string;
};

/**
 * Última versión de cada producto que se compró a cada proveedor del
 * negocio, para autocompletar la carga de una factura nueva a partir del
 * historial (sin depender de OCR/IA externa).
 */
export async function obtenerHistorialProductosPorProveedor(
  negocioId: string
): Promise<Record<string, ProductoSugerido[]>> {
  const filas = await db
    .select({
      proveedorId: facturas.proveedorId,
      nombreDetectado: productosDetectados.nombreDetectado,
      nombreCanonico: productosDetectados.nombreCanonico,
      precioUnitario: productosDetectados.precioUnitario,
    })
    .from(productosDetectados)
    .innerJoin(facturas, eq(productosDetectados.facturaId, facturas.id))
    .where(eq(facturas.negocioId, negocioId))
    .orderBy(desc(productosDetectados.createdAt));

  const historial: Record<string, ProductoSugerido[]> = {};
  const vistos = new Set<string>();

  for (const fila of filas) {
    if (!fila.proveedorId) continue;
    const clave = `${fila.proveedorId}:${fila.nombreCanonico}`;
    if (vistos.has(clave)) continue;
    vistos.add(clave);

    if (!historial[fila.proveedorId]) {
      historial[fila.proveedorId] = [];
    }
    historial[fila.proveedorId].push({
      nombre: fila.nombreDetectado,
      precioUnitario: fila.precioUnitario,
    });
  }

  return historial;
}

export async function obtenerFacturasDeNegocio(negocioId: string) {
  return db
    .select({
      id: facturas.id,
      estado: facturas.estado,
      fecha: facturas.fecha,
      createdAt: facturas.createdAt,
      proveedorNombre: proveedores.nombre,
    })
    .from(facturas)
    .leftJoin(proveedores, eq(facturas.proveedorId, proveedores.id))
    .where(eq(facturas.negocioId, negocioId))
    .orderBy(desc(facturas.createdAt));
}

export async function obtenerFacturaConDetalle(
  facturaId: string,
  negocioId: string
) {
  const [factura] = await db
    .select({
      id: facturas.id,
      estado: facturas.estado,
      fecha: facturas.fecha,
      createdAt: facturas.createdAt,
      proveedorNombre: proveedores.nombre,
    })
    .from(facturas)
    .leftJoin(proveedores, eq(facturas.proveedorId, proveedores.id))
    .where(and(eq(facturas.id, facturaId), eq(facturas.negocioId, negocioId)))
    .limit(1);

  if (!factura) return null;

  const productos = await db
    .select()
    .from(productosDetectados)
    .where(eq(productosDetectados.facturaId, facturaId))
    .orderBy(productosDetectados.createdAt);

  return { factura, productos };
}
