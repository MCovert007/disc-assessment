// middleware.js
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  
  const { pathname } = req.nextUrl
  
  if (pathname.includes('/admin')) {
    if(token?.role === "Admin")
      return NextResponse.next()
    else{
      const url = req.nextUrl.clone()
      url.pathname = '/auth/signin'
      return NextResponse.redirect(url)
    }
  }else if(pathname.includes('/report') || pathname.includes('/query')){
    if(token){
      if(token?.allow)
        return NextResponse.next()
      else{
        const url = req.nextUrl.clone()
        // url.pathname = `/auth/email-verification`
        url.pathname = '/auth/email-verification';
        const searchParams = new URLSearchParams(url.search);
        searchParams.set('reg', 'false');
        searchParams.set('email', String(token.email));
        url.search = searchParams.toString();
        return NextResponse.redirect(url)
      }
    }else{
      const url = req.nextUrl.clone()
      url.pathname = '/auth/signin'
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()  
}
