import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const userCookie = request.cookies.get('user');
  const isAuthPage = path === '/login';
  const isDashboardPage = path.startsWith('/dashboard');

  if (!userCookie) {
    if (isDashboardPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  const user = JSON.parse(decodeURIComponent(userCookie.value || '{}'));

  const role = user?.role;
  const isVerified = user?.isVerified;
  const orgStatus = user?.orgStatus;
  const isActive = user?.isActive;

  if (role === 'superAdmin') {
    if (isDashboardPage && !isVerified) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (isAuthPage && isVerified) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    if (isDashboardPage && (!isVerified || orgStatus !== 'verified' || !isActive)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (
      isAuthPage &&
      isVerified &&
      orgStatus === 'active' &&
      isActive
    ) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }


  // Role-based route protection
  const routePermissionsMap: Record<string, string> = {
   
    '/dashboard/users/organizations': 'organization.read',
    '/dashboard/users/profile': 'profile.read',
    // etc.
  };

  const userPermissions = user?.permissions || [];

  for (const route in routePermissionsMap) {
    if (path.startsWith(route)) {
      const requiredPermission = routePermissionsMap[route];
      if (!userPermissions.includes(requiredPermission)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
