    "use client";

    import { useActionState } from "react";

    import { registrar, type RegistroState } from "@/lib/actions/auth";

    const initialState: RegistroState = {};

    export function RegistroForm() {
    const [state, formAction, pending] = useActionState(registrar, initialState);

    return (
        <form action={formAction} className="space-y-4">
        <input
            name="name"
            type="text"
            placeholder="Nombre (opcional)"
            autoComplete="name"
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
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
            minLength={8}
            placeholder="Contraseña (mínimo 8 caracteres)"
            autoComplete="new-password"
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
            {pending ? "Creando cuenta..." : "Crear cuenta"}
        </button>
        </form>
    );
    }