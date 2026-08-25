    "use server";

    import { signIn, signOut } from "@/auth";
    import { db } from "@/lib/db";
    import { users } from "@/lib/db/schema";
    import bcrypt from "bcryptjs";
    import { eq } from "drizzle-orm";
    import { z } from "zod";
    import { CredentialsSignin } from "next-auth";

    const registroSchema = z.object({
        name: z.string().trim().max(100).optional(),
        email:z.email(),
        password: z.string().min(8),
    });

    export type RegistroState = { error?: string };

    export async function registrar(
    _prev: RegistroState,
    formData: FormData
    ): Promise<RegistroState> {
    const parsed = registroSchema.safeParse({
        name: formData.get("name") || undefined,
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!parsed.success) {
        return {
        error: "Email inválido o contraseña demasiado corta (mínimo 8 caracteres).",
        };
    }

    const email = parsed.data.email.toLowerCase();
    const name = parsed.data.name || null;

    const [existing] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (existing) {
        return { error: "Ese email ya está registrado." };
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    await db.insert(users).values({ email, name, passwordHash });

    await signIn("credentials", {
        email,
        password: parsed.data.password,
        redirectTo: "/dashboard",
    });

    return {};
}

export type LoginState = { error?: string };

export async function ingresar(
    _prev: LoginState,
    formData: FormData
): Promise<LoginState> {
    const emailRaw = formData.get("email");
    const passwordRaw = formData.get("password");

    const email = typeof emailRaw === "string" ? emailRaw.toLowerCase() : "";
    const password = typeof passwordRaw === "string" ? passwordRaw : "";

    if (!email || !password) {
        return { error: "Completá email y contraseña." };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        });
    } catch (error) {
        if (error instanceof CredentialsSignin) {
            return { error: "Email o contraseña incorrectos." };
        }
        throw error;
    }

    return {};
}

export async function cerrarSesion(): Promise<void> {
    await signOut({ redirectTo: "/login" });
}
