import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

const protectedRoutes = [
  { path: "/pages/admin", role: "admin" },
  { path: "/pages/client", role: "client" },
  { path: "/pages/provider", role: "provider" },
];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const path = request.nextUrl.pathname;

  // Verifica se o token é necessário para a rota protegida
  if (protectedRoutes.some((route) => path.startsWith(route.path)) && !token) {
    return NextResponse.redirect(new URL("/pages/login", request.nextUrl));
  }

  // Redireciona para a página inicial do usuário se ele já estiver logado
  if (path == "/pages/login" && token) {
    return NextResponse.redirect(
      new URL(`/pages/${token.role}/home`, request.nextUrl)
    );
  }

  // Protege as rotas de administrador, prestador e cliente
  if (token?.role !== "admin" && path.startsWith("/pages/admin")) {
    return NextResponse.redirect(
      new URL(`/pages/${token?.role}/home`, request.nextUrl)
    );
  }

  if (token?.role !== "provider" && path.startsWith("/pages/provider")) {
    return NextResponse.redirect(
      new URL(`/pages/${token?.role}/home`, request.nextUrl)
    );
  }

  if (token?.role !== "client" && path.startsWith("/pages/client")) {
    return NextResponse.redirect(
      new URL(`/pages/${token?.role}/home`, request.nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pages/login",
    "/pages/admin/:path",
    "/pages/client/:path",
    "/pages/provider/:path",
  ],
};
