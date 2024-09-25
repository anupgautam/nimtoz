
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"


export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        console.log(request.nextUrl.pathname)
        console.log(request.nextauth.token)

        if (request.nextUrl.pathname.startsWith("/extra")
            && request.nextauth.token?.role !== "Admin") {
            return NextResponse.rewrite(
                new URL("/login", request.url)
            )
        }

        if (request.nextUrl.pathname.startsWith('/registervenue')
            && request.nextauth.token?.role !== 'User') {
            return NextResponse.rewrite(
                new URL("/login", request.url)
            )
        }

    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

//! Applies next-auth only to matching routes can be regex

export const config = {
    matcher: [
        '/extra',
        '/registervenue',
        '/dashboard/:path*'
    ]
}
// export const config = {matcher:['/extra']}