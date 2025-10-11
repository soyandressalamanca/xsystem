import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PackageCheck, Search, Plus, Filter, Download, Calendar, TrendingUp, Eye } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

export default async function ActiveSubscriptionsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Mock data
  const subscriptions = [
    {
      id: '1',
      product: 'Microsoft 365 E5',
      company: 'Grupo Modelo',
      licenses: 500,
      monthlyPrice: '$15,000',
      annualPrice: '$180,000',
      startDate: '2024-01-15',
      endDate: '2025-01-14',
      renewalDate: '2025-01-14',
      status: 'ACTIVE',
      daysUntilRenewal: 96,
      autoRenew: true
    },
    {
      id: '2',
      product: 'Adobe Creative Cloud',
      company: 'FEMSA',
      licenses: 200,
      monthlyPrice: '$8,500',
      annualPrice: '$102,000',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      renewalDate: '2025-01-31',
      status: 'ACTIVE',
      daysUntilRenewal: 113,
      autoRenew: true
    },
    {
      id: '3',
      product: 'Autodesk AutoCAD',
      company: 'Cemex',
      licenses: 150,
      monthlyPrice: '$12,000',
      annualPrice: '$144,000',
      startDate: '2023-12-01',
      endDate: '2024-11-30',
      renewalDate: '2024-11-30',
      status: 'ACTIVE',
      daysUntilRenewal: 51,
      autoRenew: false
    },
    {
      id: '4',
      product: 'Salesforce Enterprise',
      company: 'Bimbo',
      licenses: 300,
      monthlyPrice: '$18,000',
      annualPrice: '$216,000',
      startDate: '2024-03-15',
      endDate: '2025-03-14',
      renewalDate: '2025-03-14',
      status: 'ACTIVE',
      daysUntilRenewal: 155,
      autoRenew: true
    },
  ]

  const getRenewalBadge = (days: number) => {
    if (days <= 7) return { label: `${days} días`, color: 'bg-red-500' }
    if (days <= 30) return { label: `${days} días`, color: 'bg-orange-500' }
    if (days <= 60) return { label: `${days} días`, color: 'bg-yellow-500' }
    if (days <= 90) return { label: `${days} días`, color: 'bg-blue-500' }
    return { label: `${days} días`, color: 'bg-green-500' }
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header - Layout de 2 columnas: título a la izquierda, botones pegados a la derecha */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <PackageCheck className="h-8 w-8 text-primary" />
              Suscripciones Activas
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona todas las suscripciones activas de tus clientes
            </p>
          </div>
          <div className="flex gap-2 md:ml-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button asChild>
              <Link href="/dashboard/subscriptions/new">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Suscripción
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Suscripciones</CardTitle>
              <PackageCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                En 156 empresas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MRR (Ingresos Mensuales)</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs text-muted-foreground">
                +8% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ARR (Ingresos Anuales)</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$28.8M</div>
              <p className="text-xs text-muted-foreground">
                Proyección anual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximas Renovaciones</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68</div>
              <p className="text-xs text-muted-foreground">
                En los próximos 90 días
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Renewal Alerts */}
        <Card className="mb-6 border-orange-200 dark:border-orange-900">
          <CardHeader>
            <CardTitle className="text-orange-600 dark:text-orange-400">Alertas de Renovación</CardTitle>
            <CardDescription>Suscripciones que requieren atención</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/dashboard/subscriptions/renewals/7">
                <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900">
                  <div className="text-2xl font-bold text-red-600">12</div>
                  <p className="text-sm text-muted-foreground">7 días o menos</p>
                </div>
              </Link>
              <Link href="/dashboard/subscriptions/renewals/30">
                <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-900">
                  <div className="text-2xl font-bold text-orange-600">18</div>
                  <p className="text-sm text-muted-foreground">30 días o menos</p>
                </div>
              </Link>
              <Link href="/dashboard/subscriptions/renewals/60">
                <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-900">
                  <div className="text-2xl font-bold text-yellow-600">24</div>
                  <p className="text-sm text-muted-foreground">60 días o menos</p>
                </div>
              </Link>
              <Link href="/dashboard/subscriptions/renewals/90">
                <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
                  <div className="text-2xl font-bold text-blue-600">14</div>
                  <p className="text-sm text-muted-foreground">90 días o menos</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por producto, empresa o cliente..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Suscripciones Activas</CardTitle>
            <CardDescription>
              {subscriptions.length} suscripciones activas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Licencias</TableHead>
                  <TableHead>MRR</TableHead>
                  <TableHead>Valor Anual</TableHead>
                  <TableHead>Renovación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Auto-Renovación</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((sub) => {
                  const renewalBadge = getRenewalBadge(sub.daysUntilRenewal)
                  return (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.product}</TableCell>
                      <TableCell>{sub.company}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{sub.licenses}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{sub.monthlyPrice}</TableCell>
                      <TableCell className="font-semibold">{sub.annualPrice}</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">
                            {new Date(sub.renewalDate).toLocaleDateString('es-MX')}
                          </div>
                          <Badge className={`${renewalBadge.color} text-xs mt-1`}>
                            {renewalBadge.label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-600">
                          Activa
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {sub.autoRenew ? (
                          <Badge>Sí</Badge>
                        ) : (
                          <Badge variant="outline">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/subscriptions/${sub.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

