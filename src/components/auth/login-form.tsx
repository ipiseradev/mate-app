"use client";

import Link from "next/link";
import { useActionState } from "react";

import { ingresar, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(ingresar, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        autoComplete="email"
        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
      />
      <input
        name="password"
        type="password"
        required
        placeholder="Contraseña"
        autoComplete="current-password"
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
        {pending ? "Ingresando..." : "Iniciar sesión"}
      </button>
      <p className="text-center text-sm text-zinc-500">
        ¿No tenés cuenta?{" "}
        <Link href="/registro" className="underline">
          Registrate
        </Link>
      </p>
    </form>
  );
}
