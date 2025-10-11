import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertTriangle, Search, Filter, Download, Mail, Phone, RefreshCw, Eye } from 'lucide-react'
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

export default async function ExpiredSubscriptionsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Mock data
  const expiredSubscriptions = [
    {
      id: '13',
      product: 'Norton Security',
      company: 'Comercial Mexicana',
      contact: 'Alberto Ramírez',
      email: 'alberto@comercialmexicana.com',
      phone: '+52 55 345 6789',
      licenses: 50,
      monthlyPrice: '$1,800',
      annualPrice: '$21,600',
      expiredDate: '2024-10-05',
      daysExpired: 5,
      assignedTo: 'Juan Pérez',
      recoveryAttempts: 3
    },
    {
      id: '14',
      product: 'McAfee Total Protection',
      company: 'Elektra',
      contact: 'Daniela Ortiz',
      email: 'daniela@elektra.com',
      phone: '+52 55 456 7890',
      licenses: 75,
      monthlyPrice: '$2,250',
      annualPrice: '$27,000',
      expiredDate: '2024-10-03',
      daysExpired: 7,
      assignedTo: 'María González',
      recoveryAttempts: 5
    },
    {
      id: '15',
      product: 'Acronis Cyber Protect',
      company: 'Chedraui',
      contact: 'Gabriel Soto',
      email: 'gabriel@chedraui.com',
      phone: '+52 222 567 8901',
      licenses: 100,
      monthlyPrice: '$4,500',
      annualPrice: '$54,000',
      expiredDate: '2024-10-01',
      daysExpired: 9,
      assignedTo: 'Carlos Ruiz',
      recoveryAttempts: 4
    },
  ]

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              Suscripciones Vencidas
            </h1>
            <p className="text-muted-foreground mt-1">
              Suscripciones que han expirado y requieren atención inmediata
            </p>
          </div>
          <div className="flex gap-2 md:ml-auto">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Alert Banner */}
        <Card className="mb-8 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Acción Requerida
            </CardTitle>
            <CardDescription>
              Hay suscripciones vencidas que necesitan renovación urgente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm">
                • Contactar a los clientes inmediatamente
              </p>
              <p className="text-sm">
                • Verificar estado de pago pendiente
              </p>
              <p className="text-sm">
                • Ofrecer plan de recuperación o extensión
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900 border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vencidas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">27</div>
              <p className="text-xs text-muted-foreground">
                Requieren atención urgente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor en Riesgo</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$162K</div>
              <p className="text-xs text-muted-foreground">
                MRR potencialmente perdido
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Recuperación</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Con plan de recuperación activo
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Recuperación</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42%</div>
              <p className="text-xs text-muted-foreground">
                Últimos 30 días
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Plan de Recuperación</CardTitle>
            <CardDescription>
              Acciones para recuperar suscripciones vencidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="destructive">
                <Mail className="mr-2 h-4 w-4" />
                Email de Recuperación Masivo
              </Button>
              <Button variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Generar Lista de Llamadas
              </Button>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Ofrecer Descuento
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar Reporte
              </Button>
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
                  placeholder="Buscar por producto, cliente o contacto..."
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

        {/* Expired Subscriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Suscripciones Vencidas</CardTitle>
            <CardDescription>
              {expiredSubscriptions.length} suscripciones requieren acción
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Valor MRR</TableHead>
                  <TableHead>Fecha Vencimiento</TableHead>
                  <TableHead>Días Vencidos</TableHead>
                  <TableHead>Intentos</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expiredSubscriptions.map((sub) => (
                  <TableRow key={sub.id} className="bg-red-50/50 dark:bg-red-950/50">
                    <TableCell className="font-medium">{sub.product}</TableCell>
                    <TableCell>{sub.company}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm font-medium">{sub.contact}</div>
                        <div className="text-xs text-muted-foreground">{sub.email}</div>
                        <div className="text-xs text-muted-foreground">{sub.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{sub.monthlyPrice}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(sub.expiredDate).toLocaleDateString('es-MX')}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-500 hover:bg-red-600">
                        {sub.daysExpired} días
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={sub.recoveryAttempts >= 5 ? 'destructive' : 'secondary'}>
                        {sub.recoveryAttempts} intentos
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{sub.assignedTo}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`mailto:${sub.email}`}>
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`tel:${sub.phone.replace(/\s+/g, '')}`}>
                            <Phone className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/subscriptions/${sub.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

