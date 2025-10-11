import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileText, Search, Plus, Filter, Download, Eye, Send } from 'lucide-react'
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

export default async function QuotesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Mock data
  const quotes = [
    {
      id: '1',
      quoteNumber: 'COT-2024-001',
      title: 'Licencias Microsoft 365',
      company: 'Grupo Modelo',
      contact: 'Roberto Sánchez',
      total: '$180,000',
      status: 'SENT',
      validUntil: '2024-10-20',
      createdAt: '2024-10-01',
      sentAt: '2024-10-02',
      viewedAt: '2024-10-05',
      createdBy: 'Juan Pérez'
    },
    {
      id: '2',
      quoteNumber: 'COT-2024-002',
      title: 'Renovación Adobe Creative Cloud',
      company: 'FEMSA',
      contact: 'Laura Martínez',
      total: '$102,000',
      status: 'VIEWED',
      validUntil: '2024-10-18',
      createdAt: '2024-10-03',
      sentAt: '2024-10-04',
      viewedAt: '2024-10-09',
      createdBy: 'María González'
    },
    {
      id: '3',
      quoteNumber: 'COT-2024-003',
      title: 'Implementación Salesforce',
      company: 'Cemex',
      contact: 'Ana Flores',
      total: '$216,000',
      status: 'ACCEPTED',
      validUntil: '2024-10-25',
      createdAt: '2024-10-05',
      sentAt: '2024-10-06',
      viewedAt: '2024-10-07',
      createdBy: 'Carlos Ruiz'
    },
    {
      id: '4',
      quoteNumber: 'COT-2024-004',
      title: 'Autodesk Suite Completa',
      company: 'Bimbo',
      contact: 'Carlos Mendoza',
      total: '$144,000',
      status: 'DRAFT',
      validUntil: '2024-10-30',
      createdAt: '2024-10-08',
      sentAt: null,
      viewedAt: null,
      createdBy: 'Ana López'
    },
  ]

  const getStatusInfo = (status: string) => {
    const statuses: Record<string, { label: string; color: string; variant: any }> = {
      'DRAFT': { label: 'Borrador', color: 'bg-gray-500', variant: 'secondary' },
      'SENT': { label: 'Enviada', color: 'bg-blue-500', variant: 'default' },
      'VIEWED': { label: 'Vista', color: 'bg-yellow-500', variant: 'default' },
      'ACCEPTED': { label: 'Aceptada', color: 'bg-green-500', variant: 'default' },
      'REJECTED': { label: 'Rechazada', color: 'bg-red-500', variant: 'destructive' },
      'EXPIRED': { label: 'Expirada', color: 'bg-orange-500', variant: 'outline' },
    }
    return statuses[status] || statuses['DRAFT']
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header - Layout de 2 columnas: título a la izquierda, botones pegados a la derecha */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              Cotizaciones
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona tus cotizaciones y propuestas comerciales
            </p>
          </div>
          <div className="flex gap-2 md:ml-0">
            <Button variant="outline" asChild>
              <Link href="/dashboard/quotes/templates">
                <FileText className="mr-2 h-4 w-4" />
                Plantillas
              </Link>
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button asChild>
              <Link href="/dashboard/quotes/new">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Cotización
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cotizaciones</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">
                Este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enviadas</CardTitle>
              <Send className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">34</div>
              <p className="text-xs text-muted-foreground">
                Esperando respuesta
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aceptadas</CardTitle>
              <FileText className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">28</div>
              <p className="text-xs text-muted-foreground">
                32% tasa de conversión
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs text-muted-foreground">
                En cotizaciones activas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Cerrado</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$780K</div>
              <p className="text-xs text-muted-foreground">
                Cotizaciones aceptadas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Status Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtrar por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">Todas (87)</Button>
              <Button variant="outline" size="sm">Borradores (12)</Button>
              <Button variant="outline" size="sm">Enviadas (34)</Button>
              <Button variant="outline" size="sm">Vistas (13)</Button>
              <Button variant="outline" size="sm">Aceptadas (28)</Button>
              <Button variant="outline" size="sm">Rechazadas (5)</Button>
              <Button variant="outline" size="sm">Expiradas (7)</Button>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número, cliente o título..."
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

        {/* Quotes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Cotizaciones</CardTitle>
            <CardDescription>
              {quotes.length} cotizaciones recientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Válida Hasta</TableHead>
                  <TableHead>Creada Por</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => {
                  const statusInfo = getStatusInfo(quote.status)
                  const isExpiringSoon = new Date(quote.validUntil) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                  
                  return (
                    <TableRow key={quote.id}>
                      <TableCell className="font-mono text-sm">{quote.quoteNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{quote.title}</div>
                          <div className="text-xs text-muted-foreground">
                            Creada: {new Date(quote.createdAt).toLocaleDateString('es-MX')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{quote.company}</div>
                          <div className="text-xs text-muted-foreground">{quote.contact}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{quote.total}</TableCell>
                      <TableCell>
                        <Badge className={statusInfo.color}>
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">
                            {new Date(quote.validUntil).toLocaleDateString('es-MX')}
                          </div>
                          {isExpiringSoon && quote.status !== 'ACCEPTED' && (
                            <Badge variant="outline" className="text-xs mt-1">
                              Próxima a expirar
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{quote.createdBy}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          {quote.status === 'DRAFT' && (
                            <Button variant="ghost" size="sm">
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/quotes/${quote.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

