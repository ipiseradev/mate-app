    import NextAuth from "next-auth";
    import Credentials from "next-auth/providers/credentials";
    import { DrizzleAdapter } from "@auth/drizzle-adapter";
    import bcrypt from "bcryptjs";
    import { eq } from "drizzle-orm";
    import { z } from "zod";

    import { db } from "@/lib/db";
    import { users } from "@/lib/db/schema";

    const credentialsSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
    });

    declare module "next-auth" {
    interface User {
        passwordHash?: string | null;
    }
    }

    declare module "@auth/core/jwt" {
    interface JWT {
        id?: string;
    }
    }

    export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
        credentials: {
            email: {},
            password: {},
        },
        authorize: async (credentials) => {
            const parsed = credentialsSchema.safeParse(credentials);
            if (!parsed.success) return null;

            const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, parsed.data.email.toLowerCase()));

            if (!user?.passwordHash) return null;

            const isValid = await bcrypt.compare(
            parsed.data.password,
            user.passwordHash
            );
            if (!isValid) return null;

            return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            };
        },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
        if (user) {
            token.id = user.id;
        }
        return token;
        },
        session({ session, token }) {
        if (typeof token.id === "string") {
            session.user.id = token.id;
        }
        return session;
        },
    },
    });