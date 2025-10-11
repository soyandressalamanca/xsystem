import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Building2, Search, Plus, Filter, Download, Eye } from 'lucide-react'
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

export default async function ClientsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Mock data - reemplazar con datos reales de la base de datos
  const clients = [
    {
      id: '1',
      name: 'Grupo Modelo',
      industry: 'Manufactura',
      subscriptions: 5,
      revenue: '$45,000',
      status: 'active',
      lastContact: '2024-10-08',
      assignedTo: 'Juan Pérez'
    },
    {
      id: '2',
      name: 'FEMSA',
      industry: 'Retail',
      subscriptions: 8,
      revenue: '$78,000',
      status: 'active',
      lastContact: '2024-10-09',
      assignedTo: 'María González'
    },
    {
      id: '3',
      name: 'Cemex',
      industry: 'Construcción',
      subscriptions: 3,
      revenue: '$32,000',
      status: 'active',
      lastContact: '2024-10-05',
      assignedTo: 'Carlos Ruiz'
    },
    {
      id: '4',
      name: 'Bimbo',
      industry: 'Alimentos',
      subscriptions: 6,
      revenue: '$52,000',
      status: 'active',
      lastContact: '2024-10-07',
      assignedTo: 'Ana López'
    },
    {
      id: '5',
      name: 'Televisa',
      industry: 'Medios',
      subscriptions: 4,
      revenue: '$38,000',
      status: 'active',
      lastContact: '2024-10-06',
      assignedTo: 'Juan Pérez'
    },
  ]

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header - Layout de 2 columnas: título a la izquierda, botones pegados a la derecha */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              Clientes
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona todos tus clientes activos
            </p>
          </div>
          <div className="flex gap-2 md:ml-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button asChild>
              <Link href="/dashboard/crm/clients/new">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Cliente
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                +12% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suscripciones Activas</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs text-muted-foreground">
                MRR total de clientes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retención</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                Tasa de retención anual
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, RFC o industria..."
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

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Clientes</CardTitle>
            <CardDescription>
              {clients.length} clientes activos en total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Industria</TableHead>
                  <TableHead>Suscripciones</TableHead>
                  <TableHead>Ingresos MRR</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Último Contacto</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.industry}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{client.subscriptions} activas</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{client.revenue}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Activo
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(client.lastContact).toLocaleDateString('es-MX')}
                    </TableCell>
                    <TableCell className="text-sm">{client.assignedTo}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/crm/clients/${client.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
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

