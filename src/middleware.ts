import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function auth(request: NextRequest) {
  const user = request.cookies.get('user')

  if (!user) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// TODO: 対象となるパスを整備する
export const config = {
  matcher: ['/mypage/:path*'],
}
