import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token obtido no middleware:", token);
  const { pathname } = req.nextUrl;
  
  // Exemplo de restrição para rota de admin:
  if (pathname.startsWith("/admin") && (!token || token.role !== "admin")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  
  // Exemplo de restrição para rota de prestador:
  if (pathname.startsWith("/prestador") && (!token || token.role !== "prestador")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  
  // Exemplo de restrição para rota de cliente:
  if (pathname.startsWith("/cliente") && (!token || token.role !== "cliente")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/prestador/:path*", "/cliente/:path*"],
};
