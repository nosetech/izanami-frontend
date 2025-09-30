import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function auth(request: NextRequest) {
  const user = request.cookies.get('user')
  const { pathname } = request.nextUrl

  // ログインページ（ルート）へのアクセス時の処理
  if (pathname === '/') {
    // ログインしている場合は/mypageにリダイレクト
    if (user) {
      return NextResponse.redirect(new URL('/mypage', request.url))
    }
    // ログインしていない場合はそのまま通す
    return NextResponse.next()
  }

  // その他の保護されたページの処理
  if (!user) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// TODO: 対象となるパスを整備する
export const config = {
  matcher: ['/', '/mypage/:path*'],
}
