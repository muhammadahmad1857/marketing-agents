
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {


  const { pathname } = request.nextUrl;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userCookies = request.cookies.get('user') as any;
  userCookies = userCookies && JSON.parse(userCookies?.value) 

  const privateRoutes = ['/', '/send-call', '/history', '/pathway'];
  const publicRoutes = ['/login', '/register'];
  const loggedIn = userCookies?.logged_in ?? false;

  // Redirect logged-in users away from the /login page
  if (publicRoutes.includes(pathname) && loggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  // Restrict access to /call for non-logged-in users
  if (privateRoutes.includes(pathname) && !loggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/send-call', '/history', '/pathway','/login','/register'], // Apply middleware to both /call and /login routes
};