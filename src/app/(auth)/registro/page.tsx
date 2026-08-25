import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { RegistroForm } from "@/components/auth/registro-form";

export default async function RegistroPage() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-semibold">Crear cuenta</h1>
        <RegistroForm />
        <p className="text-center text-sm text-zinc-500">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
