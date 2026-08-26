import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { obtenerFacturasDeNegocio, obtenerNegocioDeUsuario } from "@/lib/db/queries";

const ESTADO_LABEL: Record<string, string> = {
  procesando: "Procesando",
  revisar: "A revisar",
  confirmada: "Confirmada",
  error: "Error al procesar",
};

export default async function NegocioPage(
  props: PageProps<"/dashboard/negocios/[negocioId]">
) {
  const { negocioId } = await props.params;
  const session = await auth();
  const negocio = await obtenerNegocioDeUsuario(negocioId, session!.user!.id!);

  if (!negocio) {
    notFound();
  }

  const facturas = await obtenerFacturasDeNegocio(negocio.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:underline">
            ← Tus negocios
          </Link>
          <h1 className="text-2xl font-semibold">{negocio.nombre}</h1>
        </div>
        <Link
          href={`/dashboard/negocios/${negocio.id}/facturas/nueva`}
          className="rounded-md bg-foreground px-4 py-2 text-sm text-background"
        >
          Cargar factura
        </Link>
      </div>

      {facturas.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Todavía no cargaste ninguna factura para este negocio.
        </p>
      ) : (
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {facturas.map((factura) => (
            <li key={factura.id}>
              <Link
                href={`/dashboard/negocios/${negocio.id}/facturas/${factura.id}`}
                className="flex items-center justify-between py-3 hover:opacity-70"
              >
                <div>
                  <p className="font-medium">
                    {factura.proveedorNombre ?? "Proveedor sin identificar"}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {factura.fecha
                      ? new Date(factura.fecha).toLocaleDateString("es-AR")
                      : new Date(factura.createdAt).toLocaleDateString("es-AR")}
                  </p>
                </div>
                <span className="text-sm text-zinc-500">
                  {ESTADO_LABEL[factura.estado] ?? factura.estado}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
