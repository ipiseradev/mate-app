import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Hola, {session?.user?.name ?? session?.user?.email}
      </p>
      <p className="text-sm text-zinc-500">
        Tu ID de usuario: <code>{session?.user?.id}</code>
      </p>
    </div>
  );
}
