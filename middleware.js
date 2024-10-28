import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('access_token');
  const pathname = request.nextUrl.pathname;

  // Permitir acceso público a "/"
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Si no tiene token y no está en login o register, redirige a login
  if (!token && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si tiene token y está en login o register, redirige a /
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Verifica permisos si tiene token
  if (token) {
    const url = new URL('https://back-k1a3.onrender.com/user/', request.url);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (response.ok) {
      const data = await response.json();
      const groups = data.groups; 

      if (groups.includes('administrador')) {
        // Si es administrador y no está en /admin, redirige a /admin
        if (pathname !== '/admin') {
          return NextResponse.redirect(new URL('/admin', request.url));
        } else {
          return NextResponse.next();
        }
      } else {
        // Si no es administrador y está en /admin, redirige a /
        if (pathname === '/admin') {
          return NextResponse.redirect(new URL('/', request.url));
        } else {
          return NextResponse.next();
        }
      }
    } else {
      // Si no se pudo verificar los permisos, redirige a /
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};