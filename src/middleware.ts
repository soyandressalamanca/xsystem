import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect dashboard routes
        if (req.nextUrl.pathname.startsWith('/dashboard') || 
            req.nextUrl.pathname.startsWith('/crm') ||
            req.nextUrl.pathname.startsWith('/quotes') ||
            req.nextUrl.pathname.startsWith('/subscriptions')) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/crm/:path*',
    '/quotes/:path*',
    '/subscriptions/:path*',
    '/api/companies/:path*',
    '/api/quotes/:path*',
    '/api/subscriptions/:path*',
    '/api/renewals/:path*'
  ]
}
