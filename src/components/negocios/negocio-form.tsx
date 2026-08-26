"use client";

import { useActionState } from "react";

import { crearNegocio, type CrearNegocioState } from "@/lib/actions/negocios";

const initialState: CrearNegocioState = {};

export function NegocioForm() {
  const [state, formAction, pending] = useActionState(
    crearNegocio,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <input
        name="nombre"
        type="text"
        required
        placeholder="Nombre del negocio"
        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
      />
      {state.error ? (
        <p className="text-sm text-red-500">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-foreground py-2 text-background disabled:opacity-50"
      >
        {pending ? "Creando..." : "Crear negocio"}
      </button>
    </form>
  );
}
