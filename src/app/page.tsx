import Link from "next/link";

import { auth } from "@/auth";
import { Navbar } from "@/components/landing/navbar";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black";

const TRUST_ITEMS = [
  "Gratis para empezar",
  "Sin tarjeta",
  "Sin instalación",
  "Funciona desde el celular",
  "Tus datos organizados",
];

const SIN_MATE = [
  "Buscás cada producto en la cabeza",
  "Tratás de acordarte a cuánto lo pagaste la vez pasada",
  "Escribís cada línea de nuevo, de cero",
  "Revisás todo dos veces por las dudas",
];

const CON_MATE = [
  "Elegís el proveedor",
  "Mate te muestra lo que ya le compraste, con el precio",
  "Tocás para agregar cada producto",
  "Confirmás y listo",
];

const FEATURES = [
  {
    title: "Proveedores sin precargar nada",
    description:
      "Escribís el nombre al cargar la primera factura y Mate lo da de alta solo. Nada de formularios previos.",
    colorClasses: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <path d="M3 9l2-5h14l2 5" />
        <rect x="3" y="9" width="18" height="12" rx="1" />
        <line x1="9" y1="21" x2="9" y2="14" />
        <line x1="15" y1="21" x2="15" y2="14" />
      </svg>
    ),
  },
  {
    title: "Historial de precios",
    description:
      "Cada factura que cargás queda guardada con su precio. Comparás cuánto pagabas antes y cuánto pagás ahora por lo mismo.",
    colorClasses: "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <polyline points="3 17 9 11 13 15 21 7" />
        <polyline points="14 7 21 7 21 14" />
      </svg>
    ),
  },
  {
    title: "Todo organizado por negocio",
    description:
      "Cada negocio tiene sus propias facturas y proveedores, con el detalle de productos y totales a mano.",
    colorClasses: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
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

const EVOLUCION = [
  {
    paso: "Factura 1",
    titulo: "Proveedor nuevo",
    detalle: "Cargás todo a mano: productos, cantidades y precios.",
  },
  {
    paso: "Factura 2",
    titulo: "Mismo proveedor",
    detalle: "Mate ya sabe qué le comprás. Te sugiere cada producto con un click.",
  },
  {
    paso: "Factura 3",
    titulo: "Con historial",
    detalle: "Vas viendo si el precio subió o bajó respecto a la última compra.",
  },
];

const FAQS = [
  {
    pregunta: "¿Puedo usar Mate desde el celular?",
    respuesta:
      "Sí, Mate funciona desde el navegador del celular sin instalar nada. El formulario está pensado para completarse rápido con una mano, parado en el mostrador.",
  },
  {
    pregunta: "¿Tengo que cargar mi catálogo antes?",
    respuesta:
      "No. Arrancás directo cargando tu primera factura. Mate arma el historial de proveedores y productos solo, a medida que los vas usando.",
  },
  {
    pregunta: "¿Mate funciona para cualquier proveedor?",
    respuesta:
      "Sí. No hay una lista cerrada: escribís el nombre del proveedor la primera vez que le cargás una factura y Mate lo guarda para las próximas.",
  },
  {
    pregunta: "¿Puedo ver precios anteriores?",
    respuesta:
      "Sí. Cuando elegís un proveedor que ya usaste, Mate te muestra el último precio que le pagaste a cada producto.",
  },
  {
    pregunta: "¿Tengo que pagar para usarlo?",
    respuesta:
      "Por ahora es 100% gratis mientras seguimos construyendo el producto. No pedimos tarjeta para registrarte.",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default async function Home() {
  const session = await auth();
  const haySesion = Boolean(session?.user?.id);
  const ctaHref = haySesion ? "/dashboard" : "/registro";
  const ctaLabel = haySesion ? "Ir al dashboard" : "Empezar gratis";

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <Navbar haySesion={haySesion} ctaHref={ctaHref} ctaLabel={ctaLabel} />

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-in-up space-y-6">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 dark:border-amber-900/40 dark:bg-amber-500/10 dark:text-amber-400">
              Pensado para comercios de barrio
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-5xl dark:text-zinc-50">
              Dejá de cargar la misma factura dos veces
            </h1>
            <p className="max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
              Elegí el proveedor y Mate te sugiere, con un click, los
              productos y precios que le compraste la última vez. Cuanto
              más lo usás, menos tipeás.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={ctaHref}
                className={`rounded-full bg-emerald-600 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-500 active:scale-[0.98] ${FOCUS_RING}`}
              >
                {ctaLabel}
              </Link>
              <a
                href="#como-funciona"
                className={`rounded-full border border-zinc-300 px-6 py-3 text-center text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900 ${FOCUS_RING}`}
              >
                Ver cómo funciona
              </a>
            </div>
            <p className="text-sm font-medium text-zinc-500">
              100% gratis • Sin tarjeta • En 30 segundos
            </p>
          </div>

          <div className="animate-fade-in-up relative [animation-delay:120ms]">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-emerald-200/60 via-amber-100/40 to-transparent blur-2xl dark:from-emerald-900/20 dark:via-amber-900/10" />
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-900/5 transition-shadow hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
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
                  <div className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-700 dark:text-zinc-200">
                    Distribuidora Norte
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      Ya conocido
                    </span>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium text-zinc-500">
                    Ya le compraste esto — tocá para agregar
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-emerald-600 bg-emerald-600 px-3 py-1 text-xs text-white">
                      + Yerba La Merced 1kg ($4.200)
                    </span>
                    <span className="rounded-full border border-emerald-600 bg-emerald-600 px-3 py-1 text-xs text-white">
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
                      <tr>
                        <td className="px-3 py-2">Aceite Natura 900ml</td>
                        <td className="px-3 py-2">3</td>
                        <td className="px-3 py-2">$2.950</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-zinc-200 font-medium text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
                        <td className="px-3 py-2" colSpan={2}>
                          Total
                        </td>
                        <td className="px-3 py-2">$17.250</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <div className="border-y border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950/40">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-600 sm:text-sm dark:text-zinc-400">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span className="text-emerald-600 dark:text-emerald-400">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Antes / Después */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
              Dejá de escribir lo mismo todos los días
            </h2>
            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
              Cada factura que entra por la puerta es la misma tarea
              repetida. Mate la corta a la mitad.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-500">Sin Mate</h3>
              <ul className="mt-4 space-y-3">
                {SIN_MATE.map((paso) => (
                  <li key={paso} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="mt-0.5 text-zinc-400 dark:text-zinc-600">
                      <XIcon />
                    </span>
                    {paso}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 dark:border-emerald-900/40 dark:bg-emerald-500/5">
              <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Con Mate
              </h3>
              <ul className="mt-4 space-y-3">
                {CON_MATE.map((paso) => (
                  <li key={paso} className="flex items-start gap-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                      <CheckIcon />
                    </span>
                    {paso}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section
          id="producto"
          className="border-t border-zinc-200 bg-white px-6 py-20 dark:border-zinc-800 dark:bg-zinc-950/40"
        >
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              Producto
            </p>
            <div className="mt-2 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
                Menos tipeo, más control
              </h2>
              <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
                Mate aprende de cada factura que cargás para que la próxima
                sea más rápida.
              </p>
            </div>

            {/* Feature destacada */}
            <div className="mt-10 grid items-center gap-8 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-8 lg:grid-cols-2 dark:border-emerald-900/30 dark:bg-emerald-500/5">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <line x1="12" y1="7" x2="12" y2="12" />
                    <line x1="12" y1="12" x2="16" y2="14" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                  Autocompletado por historial
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Mate recuerda qué le comprás a cada proveedor y a qué
                  precio. Elegís el proveedor y aparecen los productos
                  habituales, listos para agregar con un click.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <span className="rounded-full border border-emerald-600 bg-emerald-600 px-3 py-1.5 text-xs text-white">
                  + Yerba La Merced 1kg
                </span>
                <span className="rounded-full border border-emerald-600 bg-emerald-600 px-3 py-1.5 text-xs text-white">
                  + Aceite Natura 900ml
                </span>
                <span className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
                  + Alfajores Havanna x6
                </span>
                <span className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
                  + Gaseosa Cola 2.25L
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-zinc-200 p-6 transition-shadow hover:shadow-md dark:border-zinc-800"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.colorClasses}`}>
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 font-medium text-zinc-950 dark:text-zinc-50">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            Cómo funciona
          </h2>
          <div className="relative mt-14 grid gap-10 sm:grid-cols-3">
            <div
              aria-hidden="true"
              className="absolute top-5 hidden h-px bg-zinc-200 sm:left-[16.6667%] sm:right-[16.6667%] sm:block dark:bg-zinc-800"
            />
            {PASOS.map((paso, i) => (
              <div key={paso.title} className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-medium text-zinc-950 dark:text-zinc-50">
                  {paso.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {paso.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Evolución del producto */}
        <section className="border-t border-zinc-200 bg-white px-6 py-20 dark:border-zinc-800 dark:bg-zinc-950/40">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
                Mate aprende de cada compra
              </h2>
              <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
                No es magia, es historial: cada factura que cargás hace más
                rápida a la próxima.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {EVOLUCION.map((etapa) => (
                <div
                  key={etapa.paso}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-black"
                >
                  <span className="inline-flex rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {etapa.paso}
                  </span>
                  <h3 className="mt-3 font-medium text-zinc-950 dark:text-zinc-50">
                    {etapa.titulo}
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                    {etapa.detalle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            Preguntas frecuentes
          </h2>
          <div className="mt-10 space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.pregunta}
                className="group rounded-xl border border-zinc-200 px-5 py-1 open:bg-white dark:border-zinc-800 dark:open:bg-zinc-950"
              >
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-zinc-950 [&::-webkit-details-marker]:hidden dark:text-zinc-50 ${FOCUS_RING}`}
                >
                  {faq.pregunta}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="h-4 w-4 shrink-0 text-emerald-600 transition-transform duration-200 group-open:rotate-45 dark:text-emerald-400"
                    aria-hidden="true"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <p className="pb-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {faq.respuesta}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="border-t border-zinc-200 bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 py-20 text-white dark:border-zinc-800">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Empezá a cargar facturas sin volver a tipear todo
            </h2>
            <p className="mt-3 text-lg text-emerald-50">
              100% gratis • Sin tarjeta • En 30 segundos
            </p>
            <Link
              href={ctaHref}
              className={`mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-emerald-700 transition-opacity hover:opacity-90 active:scale-[0.98] ${FOCUS_RING}`}
            >
              {ctaLabel}
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 px-6 py-12 dark:border-zinc-800">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
          <div>
            <span className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Mate
            </span>
            <p className="mt-1 text-sm text-zinc-500">
              Menos tipeo. Más control.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600 sm:justify-end dark:text-zinc-400">
            <a href="#producto" className={`rounded-sm hover:text-zinc-950 dark:hover:text-zinc-50 ${FOCUS_RING}`}>
              Producto
            </a>
            <a href="#como-funciona" className={`rounded-sm hover:text-zinc-950 dark:hover:text-zinc-50 ${FOCUS_RING}`}>
              Cómo funciona
            </a>
            <a href="#faq" className={`rounded-sm hover:text-zinc-950 dark:hover:text-zinc-50 ${FOCUS_RING}`}>
              Preguntas frecuentes
            </a>
            <a
              href="https://github.com/ipiseradev/mate-app"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-sm hover:text-zinc-950 dark:hover:text-zinc-50 ${FOCUS_RING}`}
            >
              Código en GitHub
            </a>
          </nav>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-800">
          © {new Date().getFullYear()} Mate
        </div>
      </footer>
    </div>
  );
}
