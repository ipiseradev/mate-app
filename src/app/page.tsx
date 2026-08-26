import Link from "next/link";

import { auth } from "@/auth";

const FEATURES = [
  {
    title: "Autocompletado por historial",
    description:
      "Elegí un proveedor que ya usaste y aparecen, con un click, los productos y el último precio que le pagaste.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="7" x2="12" y2="12" />
        <line x1="12" y1="12" x2="16" y2="14" />
      </svg>
    ),
  },
  {
    title: "Proveedores sin precargar nada",
    description:
      "Escribís el nombre al cargar la primera factura y Mate lo da de alta solo. Nada de formularios previos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M3 9l2-5h14l2 5" />
        <rect x="3" y="9" width="18" height="12" rx="1" />
        <line x1="9" y1="21" x2="9" y2="14" />
        <line x1="15" y1="21" x2="15" y2="14" />
      </svg>
    ),
  },
  {
    title: "Todo organizado por negocio",
    description:
      "Cada negocio tiene sus propias facturas y proveedores, con el detalle de productos y totales a mano.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="4" y="4" width="16" height="4" rx="1" />
        <rect x="4" y="10" width="16" height="4" rx="1" />
        <rect x="4" y="16" width="16" height="4" rx="1" />
      </svg>
    ),
  },
];

const PASOS = [
  {
    title: "Creá tu negocio",
    description: "Te registrás y armás tu primer negocio en menos de un minuto.",
  },
  {
    title: "Cargá tu primera factura",
    description: "Elegís el proveedor y cargás los productos a mano, esta primera vez.",
  },
  {
    title: "Las próximas van solas",
    description: "La próxima vez que le compres a ese proveedor, Mate te sugiere todo con un click.",
  },
];

export default async function Home() {
  const session = await auth();
  const haySesion = Boolean(session?.user?.id);
  const ctaHref = haySesion ? "/dashboard" : "/registro";
  const ctaLabel = haySesion ? "Ir al dashboard" : "Empezar gratis";

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Mate App
          </span>
          <nav className="hidden items-center gap-8 text-sm text-zinc-600 sm:flex dark:text-zinc-400">
            <a href="#funcionalidad" className="hover:text-zinc-950 dark:hover:text-zinc-50">
              Funcionalidad
            </a>
            <a href="#como-funciona" className="hover:text-zinc-950 dark:hover:text-zinc-50">
              Cómo funciona
            </a>
          </nav>
          <div className="flex items-center gap-4">
            {!haySesion ? (
              <Link
                href="/login"
                className="hidden text-sm font-medium text-zinc-700 hover:text-zinc-950 sm:inline dark:text-zinc-300 dark:hover:text-zinc-50"
              >
                Ingresar
              </Link>
            ) : null}
            <Link
              href={ctaHref}
              className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
              Para almacenes, kioscos y pequeños negocios
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-5xl dark:text-zinc-50">
              Cargá las facturas de tus proveedores en segundos, no en minutos
            </h1>
            <p className="max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
              Elegí el proveedor y Mate te sugiere, con un click, los
              productos y precios que le compraste la última vez. Cuanto
              más lo usás, menos tipeás.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={ctaHref}
                className="rounded-full bg-foreground px-6 py-3 text-center text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
              >
                {ctaLabel}
              </Link>
              <a
                href="#como-funciona"
                className="rounded-full border border-zinc-300 px-6 py-3 text-center text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                Ver cómo funciona
              </a>
            </div>
            <p className="text-sm text-zinc-500">
              Gratis, sin tarjeta de crédito.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-zinc-200/70 to-transparent blur-2xl dark:from-zinc-800/40" />
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center gap-1.5 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="ml-3 text-xs text-zinc-400">
                  Cargar factura
                </span>
              </div>
              <div className="space-y-5 p-5">
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">
                    Proveedor
                  </p>
                  <div className="rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-700 dark:text-zinc-200">
                    Distribuidora Norte
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium text-zinc-500">
                    Ya le compraste esto — tocá para agregar
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-foreground bg-foreground px-3 py-1 text-xs text-background">
                      + Yerba La Merced 1kg ($4.200)
                    </span>
                    <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                      + Aceite Natura 900ml ($2.950)
                    </span>
                    <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                      + Alfajores Havanna x6 ($1.800)
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
                  <table className="w-full text-xs">
                    <thead className="bg-zinc-50 text-left text-zinc-500 dark:bg-zinc-900">
                      <tr>
                        <th className="px-3 py-2 font-medium">Producto</th>
                        <th className="px-3 py-2 font-medium">Cant.</th>
                        <th className="px-3 py-2 font-medium">Precio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 text-zinc-700 dark:divide-zinc-800 dark:text-zinc-300">
                      <tr>
                        <td className="px-3 py-2">Yerba La Merced 1kg</td>
                        <td className="px-3 py-2">2</td>
                        <td className="px-3 py-2">$4.200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="funcionalidad"
          className="border-t border-zinc-200 bg-white px-6 py-20 dark:border-zinc-800 dark:bg-zinc-950/40"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
                Menos tipeo, más control
              </h2>
              <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
                Mate aprende de cada factura que cargás para que la próxima
                sea más rápida.
              </p>
            </div>
            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            Cómo funciona
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {PASOS.map((paso, i) => (
              <div key={paso.title}>
                <span className="text-sm font-semibold text-zinc-400">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-medium text-zinc-950 dark:text-zinc-50">
                  {paso.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {paso.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-200 bg-foreground px-6 py-20 text-background dark:border-zinc-800">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Empezá a cargar facturas sin volver a tipear todo
            </h2>
            <p className="mt-3 text-lg opacity-80">
              Gratis, sin tarjeta de crédito, en menos de un minuto.
            </p>
            <Link
              href={ctaHref}
              className="mt-8 inline-block rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
            >
              {ctaLabel}
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 px-6 py-10 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Mate App</span>
          <a
            href="https://github.com/ipiseradev/mate-app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            Código en GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
