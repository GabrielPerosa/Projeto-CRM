import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
export { default } from "next-auth/middleware";

const protectedRoutes = [
    "/admin",
    "/client",
    "/supplier",];  
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = await getToken({ req: request });
    
    // if (token && path === '/login') {
    //     redirect('/admin/home');
    // }
    if(!token && path !== '/login'){
        redirect('/login');
    }
  
};
export const config = {
    matcher: [
    "/admin/:path*",
    "/client/:path*",
    "/supplier/:path*",
  ]
}