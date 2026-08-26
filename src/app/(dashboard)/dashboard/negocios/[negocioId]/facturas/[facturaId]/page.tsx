import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { obtenerFacturaConDetalle, obtenerNegocioDeUsuario } from "@/lib/db/queries";

const ESTADO_LABEL: Record<string, string> = {
  procesando: "Procesando",
  revisar: "A revisar",
  confirmada: "Confirmada",
  error: "Error",
};

export default async function FacturaPage(
  props: PageProps<"/dashboard/negocios/[negocioId]/facturas/[facturaId]">
) {
  const { negocioId, facturaId } = await props.params;
  const session = await auth();
  const negocio = await obtenerNegocioDeUsuario(negocioId, session!.user!.id!);

  if (!negocio) {
    notFound();
  }

  const detalle = await obtenerFacturaConDetalle(facturaId, negocio.id);
  if (!detalle) {
    notFound();
  }

  const { factura, productos } = detalle;
  const total = productos.reduce(
    (acc, p) => acc + Number(p.cantidad) * Number(p.precioUnitario),
    0
  );

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Link
        href={`/dashboard/negocios/${negocio.id}`}
        className="text-sm text-zinc-500 hover:underline"
      >
        ← {negocio.nombre}
      </Link>

      <div>
        <h1 className="text-xl font-semibold">
          {factura.proveedorNombre ?? "Proveedor sin identificar"}
        </h1>
        <p className="text-sm text-zinc-500">
          {ESTADO_LABEL[factura.estado] ?? factura.estado}
          {factura.fecha
            ? ` · ${new Date(factura.fecha).toLocaleDateString("es-AR")}`
            : ""}
        </p>
      </div>

      {productos.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Esta factura no tiene productos cargados.
        </p>
      ) : (
        <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
              <tr>
                <th className="px-3 py-2 font-medium">Producto</th>
                <th className="px-3 py-2 font-medium">Cant.</th>
                <th className="px-3 py-2 font-medium">P. unit.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td className="px-3 py-2">{producto.nombreDetectado}</td>
                  <td className="px-3 py-2">{Number(producto.cantidad)}</td>
                  <td className="px-3 py-2">
                    ${Number(producto.precioUnitario).toLocaleString("es-AR")}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-zinc-200 font-medium dark:border-zinc-800">
                <td className="px-3 py-2" colSpan={2}>
                  Total
                </td>
                <td className="px-3 py-2">${total.toLocaleString("es-AR")}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
