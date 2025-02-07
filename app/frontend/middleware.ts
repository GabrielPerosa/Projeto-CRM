import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
export { default } from "next-auth/middleware";

const protectedRoutes = [
    "/admin",
    "/client",
    "/supplier",
];  

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = await getToken({ req: request });

    if (!token && path !== '/login') {
        return redirect('/login');
    }

    if (token && path === '/login') {
        return redirect('/admin/home');
    }

};

export const config = {
    matcher: [
    "/login",
    "/admin/:path*",
    "/client/:path*",
    "/supplier/:path*",
  ]
}
