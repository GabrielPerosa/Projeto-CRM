import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from 'next/server';
export { default } from "next-auth/middleware";

const protectedRoutes = [
  { path: "/pages/admin", role: "admin" },
  { path: "/pages/client", role: "client" },
  { path: "/pages/supplier", role: "supplier" },
];

export async function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const token = await getToken({ req: request });

  console.log('Middleware is running');
  
  if(protectedRoutes.some((route) => path.startsWith(route.path)) && !token) {
    return NextResponse.redirect(new URL('/pages/login', request.nextUrl));
  } 
  
  if (path == '/pages/login' && token){
    return NextResponse.redirect(new URL(`/pages/${token.role}/home`, request.nextUrl));
  }

  if (token?.role !== 'admin' && path.startsWith('/pages/admin')) {
    return NextResponse.redirect(new URL(`/pages/${token?.role}/home`, request.nextUrl));
  }
  
  if (token?.role !== 'supplier' && path.startsWith('/pages/supplier')) {
    return NextResponse.redirect(new URL(`/pages/${token?.role}/home`, request.nextUrl));
  }
  
  if (token?.role !== 'client' && path.startsWith('/pages/client')) {
    return NextResponse.redirect(new URL(`/pages/${token?.role}/home`, request.nextUrl));
  }

  
  return NextResponse.next();
}

export const config = {
    matcher: ['/pages/login', '/pages/admin/:path', '/pages/client/:path', '/pages/supplier/:path'],
  };
