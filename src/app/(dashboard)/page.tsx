import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return <div>Please sign in</div>
  }

  // Get dashboard statistics
  const [
    totalCompanies,
    totalQuotes,
    activeSubscriptions,
    upcomingRenewals
  ] = await Promise.all([
    prisma.company.count(),
    prisma.quote.count(),
    prisma.subscription.count({ where: { status: 'active' } }),
    prisma.subscription.count({
      where: {
        status: 'active',
        nextRenewalAt: {
          lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Next 30 days
        }
      }
    })
  ])

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido, {session.user.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empresas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompanies}</div>
            <p className="text-xs text-muted-foreground">
              Total de empresas registradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cotizaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuotes}</div>
            <p className="text-xs text-muted-foreground">
              Total de cotizaciones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suscripciones Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">
              Suscripciones en curso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Renovaciones Próximas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingRenewals}</div>
            <p className="text-xs text-muted-foreground">
              Vencen en los próximos 30 días
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Accede a las funciones más utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button asChild>
                <Link href="/crm/companies">
                  Ver Empresas
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/quotes">
                  Nueva Cotización
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/subscriptions">
                  Ver Suscripciones
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/api/renewals/run?stage=T60">
                  Ejecutar T-60
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Renovaciones Automáticas</CardTitle>
            <CardDescription>
              Gestión de renovaciones por etapas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">T-60 (60 días antes)</span>
                <Button size="sm" variant="outline">
                  Ejecutar
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">T-30 (30 días antes)</span>
                <Button size="sm" variant="outline">
                  Ejecutar
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">T-7 (7 días antes)</span>
                <Button size="sm" variant="outline">
                  Ejecutar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
