import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold">
                XSystem
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link 
                  href="/" 
                  className="text-sm font-medium hover:text-primary"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/crm/companies" 
                  className="text-sm font-medium hover:text-primary"
                >
                  CRM
                </Link>
                <Link 
                  href="/quotes" 
                  className="text-sm font-medium hover:text-primary"
                >
                  Cotizaciones
                </Link>
                <Link 
                  href="/subscriptions" 
                  className="text-sm font-medium hover:text-primary"
                >
                  Suscripciones
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {session.user.name}
              </span>
              <form action="/api/auth/signout" method="post">
                <Button type="submit" variant="outline" size="sm">
                  Cerrar Sesión
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  )
}
