import { NextResponse } from 'next/server'

export function middleware(request) {
  // 1. Ambil data sesi/token dari cookie (Supabase biasanya simpan di sini)
  const session = request.cookies.get('sb-access-token')

  // 2. Tentukan halaman mana yang mau diproteksi
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard')

  // 3. LOGIKA PROTEKSI:
  // Jika mencoba buka dashboard TAPI tidak ada sesi, lempar ke login
  if (isDashboardPage && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Jika sudah login tapi malah mau buka halaman login lagi, lempar ke dashboard
  if (session && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// 4. Atur halaman mana saja yang harus dicek oleh middleware ini
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}