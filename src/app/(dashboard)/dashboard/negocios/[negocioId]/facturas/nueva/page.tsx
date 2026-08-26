import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { FacturaForm } from "@/components/facturas/factura-form";
import {
  obtenerHistorialProductosPorProveedor,
  obtenerNegocioDeUsuario,
  obtenerProveedoresDeNegocio,
} from "@/lib/db/queries";

export default async function NuevaFacturaPage(
  props: PageProps<"/dashboard/negocios/[negocioId]/facturas/nueva">
) {
  const { negocioId } = await props.params;
  const session = await auth();
  const negocio = await obtenerNegocioDeUsuario(negocioId, session!.user!.id!);

  if (!negocio) {
    notFound();
  }

  const [proveedores, historial] = await Promise.all([
    obtenerProveedoresDeNegocio(negocio.id),
    obtenerHistorialProductosPorProveedor(negocio.id),
  ]);

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <Link
        href={`/dashboard/negocios/${negocio.id}`}
        className="text-sm text-zinc-500 hover:underline"
      >
        ← {negocio.nombre}
      </Link>
      <h1 className="text-2xl font-semibold">Cargar factura</h1>
      <p className="text-sm text-zinc-500">
        Elegí el proveedor: si ya le compraste antes, te sugerimos los
        productos habituales para que no tengas que tipear todo de nuevo.
      </p>
      <FacturaForm
        negocioId={negocio.id}
        proveedores={proveedores}
        historial={historial}
      />
    </div>
  );
}
