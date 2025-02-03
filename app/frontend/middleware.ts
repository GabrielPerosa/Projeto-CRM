import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Se a URL for de uma rota admin e o usuário não for admin, redirecione
  if (pathname.startsWith("/pages/admin") && (!token || token.role !== "admin")) {
    return NextResponse.redirect(new URL("/pages/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pages/admin/:path*"],
};