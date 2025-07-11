// middleware.ts

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value || ''

  const protectedRoutes = ['/dashboard', '/']

  if (protectedRoutes.includes(request.nextUrl.pathname) && isLoggedIn !== 'true') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
