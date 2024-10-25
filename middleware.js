import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('access_token');
  
  if (!token && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (token && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}



export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
