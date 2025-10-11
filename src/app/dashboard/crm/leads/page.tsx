import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserPlus, Search, Plus, Filter, Download, TrendingUp, Eye, ArrowRight } from 'lucide-react'
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

export default async function LeadsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Mock data - reemplazar con datos reales
  const leads = [
    {
      id: '1',
      name: 'Industrias del Norte',
      contact: 'Roberto Sánchez',
      email: 'roberto@industriasnorte.com',
      phone: '+52 811 234 5678',
      stage: 'HOT',
      source: 'WEB',
      value: '$25,000',
      createdAt: '2024-10-10',
      assignedTo: 'Juan Pérez'
    },
    {
      id: '2',
      name: 'Comercial del Bajío',
      contact: 'Laura Martínez',
      email: 'laura@comercialbajio.com',
      phone: '+52 477 345 6789',
      stage: 'WARM',
      source: 'REFERRAL',
      value: '$18,000',
      createdAt: '2024-10-09',
      assignedTo: 'María González'
    },
    {
      id: '3',
      name: 'Tech Solutions SA',
      contact: 'Pedro Ramírez',
      email: 'pedro@techsolutions.com',
      phone: '+52 55 456 7890',
      stage: 'COLD',
      source: 'MARKETING',
      value: '$15,000',
      createdAt: '2024-10-08',
      assignedTo: 'Carlos Ruiz'
    },
    {
      id: '4',
      name: 'Distribuidora Central',
      contact: 'Ana Flores',
      email: 'ana@distcentral.com',
      phone: '+52 33 567 8901',
      stage: 'HOT',
      source: 'WEB',
      value: '$32,000',
      createdAt: '2024-10-09',
      assignedTo: 'Ana López'
    },
  ]

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'HOT': return 'bg-red-500 hover:bg-red-600'
      case 'WARM': return 'bg-orange-500 hover:bg-orange-600'
      case 'COLD': return 'bg-blue-500 hover:bg-blue-600'
      default: return 'bg-gray-500'
    }
  }

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'WEB': return { label: 'Web', variant: 'default' as const }
      case 'REFERRAL': return { label: 'Referido', variant: 'secondary' as const }
      case 'MARKETING': return { label: 'Marketing', variant: 'outline' as const }
      default: return { label: source, variant: 'outline' as const }
    }
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header - Layout de 2 columnas: título a la izquierda, botones pegados a la derecha */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <UserPlus className="h-8 w-8 text-primary" />
              Leads
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona tus prospectos y pipeline de conversión
            </p>
          </div>
          <div className="flex gap-2 md:ml-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button asChild>
              <Link href="/dashboard/crm/leads/new">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Lead
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">
                +23% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calientes (Hot)</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">24</div>
              <p className="text-xs text-muted-foreground">
                Listos para cerrar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Pipeline</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1.2M</div>
              <p className="text-xs text-muted-foreground">
                Valor potencial total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa Conversión</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32%</div>
              <p className="text-xs text-muted-foreground">
                Lead → Cliente este mes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Visual */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pipeline de Conversión</CardTitle>
            <CardDescription>Distribución de leads por etapa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Fríos (Cold)</span>
                  <Badge className="bg-blue-500">35</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Recién contactados</p>
              </div>
              <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Tibios (Warm)</span>
                  <Badge className="bg-orange-500">28</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Interesados activamente</p>
              </div>
              <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-950">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Calientes (Hot)</span>
                  <Badge className="bg-red-500">24</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Listos para cerrar</p>
              </div>
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
                  placeholder="Buscar por nombre, email o teléfono..."
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

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Leads</CardTitle>
            <CardDescription>
              {leads.length} leads activos en el pipeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Valor Est.</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => {
                  const sourceBadge = getSourceBadge(lead.source)
                  return (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{lead.name}</div>
                          <div className="text-xs text-muted-foreground">{lead.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{lead.contact}</div>
                          <div className="text-xs text-muted-foreground">{lead.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStageColor(lead.stage)}>
                          {lead.stage}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={sourceBadge.variant}>
                          {sourceBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{lead.value}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString('es-MX')}
                      </TableCell>
                      <TableCell className="text-sm">{lead.assignedTo}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/crm/leads/${lead.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
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

