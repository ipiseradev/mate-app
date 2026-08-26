"use client";

import { useActionState, useId, useMemo, useState } from "react";

import { crearFactura, type CrearFacturaState } from "@/lib/actions/facturas";
import type { ProductoSugerido } from "@/lib/db/queries";

const initialState: CrearFacturaState = {};

type Fila = { id: string; nombre: string; cantidad: string; precioUnitario: string };

function nuevaFila(sugerencia?: ProductoSugerido): Fila {
  return {
    id: crypto.randomUUID(),
    nombre: sugerencia?.nombre ?? "",
    cantidad: "1",
    precioUnitario: sugerencia?.precioUnitario ?? "",
  };
}

export function FacturaForm({
  negocioId,
  proveedores,
  historial,
}: {
  negocioId: string;
  proveedores: { id: string; nombre: string }[];
  historial: Record<string, ProductoSugerido[]>;
}) {
  const crearFacturaDelNegocio = crearFactura.bind(null, negocioId);
  const [state, formAction, pending] = useActionState(
    crearFacturaDelNegocio,
    initialState
  );

  const datalistId = useId();
  const [proveedorInput, setProveedorInput] = useState("");
  const [filas, setFilas] = useState<Fila[]>(() => [nuevaFila()]);

  const proveedorSeleccionado = useMemo(
    () =>
      proveedores.find(
        (p) => p.nombre.toLowerCase() === proveedorInput.trim().toLowerCase()
      ),
    [proveedores, proveedorInput]
  );

  const sugerencias = proveedorSeleccionado
    ? historial[proveedorSeleccionado.id] ?? []
    : [];

  function agregarFila(sugerencia?: ProductoSugerido) {
    setFilas((prev) => [...prev, nuevaFila(sugerencia)]);
  }

  function actualizarFila(id: string, campo: keyof Omit<Fila, "id">, valor: string) {
    setFilas((prev) =>
      prev.map((fila) => (fila.id === id ? { ...fila, [campo]: valor } : fila))
    );
  }

  function quitarFila(id: string) {
    setFilas((prev) => prev.filter((fila) => fila.id !== id));
  }

  const productosJson = JSON.stringify(
    filas
      .filter((fila) => fila.nombre.trim() && fila.precioUnitario)
      .map((fila) => ({
        nombre: fila.nombre.trim(),
        cantidad: Number(fila.cantidad) || 0,
        precioUnitario: Number(fila.precioUnitario) || 0,
      }))
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="productosJson" value={productosJson} />

      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="proveedor">
          Proveedor
        </label>
        <input
          id="proveedor"
          name="proveedor"
          list={datalistId}
          required
          value={proveedorInput}
          onChange={(e) => setProveedorInput(e.target.value)}
          placeholder="Nombre del proveedor"
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <datalist id={datalistId}>
          {proveedores.map((p) => (
            <option key={p.id} value={p.nombre} />
          ))}
        </datalist>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="fecha">
          Fecha
        </label>
        <input
          id="fecha"
          name="fecha"
          type="date"
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      {sugerencias.length > 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Ya le compraste esto a {proveedorSeleccionado?.nombre} — tocá para agregar
          </p>
          <div className="flex flex-wrap gap-2">
            {sugerencias.map((s) => (
              <button
                key={s.nombre}
                type="button"
                onClick={() => agregarFila(s)}
                className="rounded-full border border-zinc-300 px-3 py-1 text-xs hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                + {s.nombre} (${Number(s.precioUnitario).toLocaleString("es-AR")})
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="space-y-3">
        <p className="text-sm font-medium">Productos</p>
        {filas.map((fila) => (
          <div key={fila.id} className="flex items-center gap-2">
            <input
              value={fila.nombre}
              onChange={(e) => actualizarFila(fila.id, "nombre", e.target.value)}
              placeholder="Producto"
              className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
            <input
              value={fila.cantidad}
              onChange={(e) => actualizarFila(fila.id, "cantidad", e.target.value)}
              type="number"
              min="0"
              step="0.01"
              placeholder="Cant."
              className="w-20 rounded-md border border-zinc-300 bg-white px-2 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
            <input
              value={fila.precioUnitario}
              onChange={(e) =>
                actualizarFila(fila.id, "precioUnitario", e.target.value)
              }
              type="number"
              min="0"
              step="0.01"
              placeholder="Precio"
              className="w-24 rounded-md border border-zinc-300 bg-white px-2 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
            <button
              type="button"
              onClick={() => quitarFila(fila.id)}
              className="px-2 text-zinc-400 hover:text-red-500"
              aria-label="Quitar producto"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => agregarFila()}
          className="text-sm text-zinc-500 hover:underline"
        >
          + Agregar producto
        </button>
      </div>

      {state.error ? <p className="text-sm text-red-500">{state.error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-foreground py-2 text-background disabled:opacity-50"
      >
        {pending ? "Guardando..." : "Guardar factura"}
      </button>
    </form>
  );
}
