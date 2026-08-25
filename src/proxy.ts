    import { NextResponse } from "next/server";
    import type { NextRequest } from "next/server";

    const SESSION_COOKIE_NAMES = [
    "authjs.session-token",
    "__Secure-authjs.session-token",
    ];

    export function proxy(request: NextRequest) {
    const hasSessionCookie = SESSION_COOKIE_NAMES.some((name) =>
        request.cookies.has(name)
    );

    if (!hasSessionCookie) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
    }

    export const config = {
    matcher: ["/dashboard/:path*"],
    };