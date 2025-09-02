import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { cookies } from "next/headers";

const protectedRoutes = ["/user_info"];
const authRoutes = ["/auth"];

export default async function middleware(req: NextRequest) {
    const session = await auth();
    const { pathname } = req.nextUrl;
    const cookieStore = await cookies();
    const token = cookieStore.get("next-auth-session-token")?.value;

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    if (isProtected && !session && !token) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (isAuthRoute && (session || token)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
