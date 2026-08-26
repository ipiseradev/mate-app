import Link from "next/link";

import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const ctaHref = session?.user?.id ? "/dashboard" : "/registro";
  const ctaLabel = session?.user?.id ? "Ir al dashboard" : "Empezar gratis";

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 dark:bg-black">
      <main className="w-full max-w-2xl space-y-8 py-24 text-center">
        <div className="space-y-4">
          <span className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Mate App
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
            Controlá las facturas de tus proveedores sin cargar todo a mano
          </h1>
          <p className="mx-auto max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
            Elegí el proveedor y Mate te sugiere, con un click, los
            productos y precios que le compraste la última vez.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={ctaHref}
            className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-[#383838] sm:w-auto dark:hover:bg-[#ccc]"
          >
            {ctaLabel}
          </Link>
          {!session?.user?.id ? (
            <Link
              href="/login"
              className="w-full rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium transition-colors hover:bg-zinc-100 sm:w-auto dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Ya tengo cuenta
            </Link>
          ) : null}
        </div>
      </main>
    </div>
  );
}
