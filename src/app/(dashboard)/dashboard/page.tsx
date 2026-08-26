import Link from "next/link";

import { auth } from "@/auth";
import { NegocioForm } from "@/components/negocios/negocio-form";
import { obtenerNegociosDeUsuario } from "@/lib/db/queries";

export default async function DashboardPage() {
  const session = await auth();
  const negocios = await obtenerNegociosDeUsuario(session!.user!.id!);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">
          Hola, {session?.user?.name ?? session?.user?.email}
        </h1>
        <p className="text-sm text-zinc-500">Tus negocios</p>
      </div>

      {negocios.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {negocios.map((negocio) => (
            <li key={negocio.id}>
              <Link
                href={`/dashboard/negocios/${negocio.id}`}
                className="block rounded-md border border-zinc-200 px-4 py-3 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <span className="font-medium">{negocio.nombre}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-500">
          Todavía no tenés ningún negocio cargado.
        </p>
      )}

      <div className="max-w-sm space-y-3 rounded-md border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="font-medium">Crear negocio</h2>
        <NegocioForm />
      </div>
    </div>
  );
}
