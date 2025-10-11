import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Target, Search, Plus, Filter, Download, TrendingUp, Eye } from 'lucide-react'
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

export default async function OpportunitiesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Mock data
  const opportunities = [
    {
      id: '1',
      name: 'Migración a Cloud',
      company: 'Grupo Modelo',
      value: '$125,000',
      probability: 80,
      stage: 'NEGOTIATION',
      expectedClose: '2024-10-15',
      assignedTo: 'Juan Pérez',
      lastActivity: '2024-10-09'
    },
    {
      id: '2',
      name: 'Renovación Licencias Adobe',
      company: 'FEMSA',
      value: '$78,000',
      probability: 90,
      stage: 'PROPOSAL',
      expectedClose: '2024-10-12',
      assignedTo: 'María González',
      lastActivity: '2024-10-10'
    },
    {
      id: '3',
      name: 'Implementación CRM',
      company: 'Cemex',
      value: '$95,000',
      probability: 60,
      stage: 'QUALIFICATION',
      expectedClose: '2024-10-20',
      assignedTo: 'Carlos Ruiz',
      lastActivity: '2024-10-08'
    },
    {
      id: '4',
      name: 'Proyecto Infraestructura',
      company: 'Bimbo',
      value: '$210,000',
      probability: 70,
      stage: 'PROPOSAL',
      expectedClose: '2024-10-18',
      assignedTo: 'Ana López',
      lastActivity: '2024-10-09'
    },
  ]

  const getStageLabel = (stage: string) => {
    const stages: Record<string, { label: string; color: string }> = {
      'PROSPECTING': { label: 'Prospección', color: 'bg-blue-500' },
      'QUALIFICATION': { label: 'Calificación', color: 'bg-cyan-500' },
      'PROPOSAL': { label: 'Propuesta', color: 'bg-yellow-500' },
      'NEGOTIATION': { label: 'Negociación', color: 'bg-orange-500' },
      'CLOSED_WON': { label: 'Ganada', color: 'bg-green-500' },
      'CLOSED_LOST': { label: 'Perdida', color: 'bg-red-500' },
    }
    return stages[stage] || { label: stage, color: 'bg-gray-500' }
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header - Layout de 2 columnas: título a la izquierda, botones pegados a la derecha */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Target className="h-8 w-8 text-primary" />
              Oportunidades
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona tu pipeline de ventas y oportunidades
            </p>
          </div>
          <div className="flex gap-2 md:ml-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button asChild>
              <Link href="/dashboard/crm/opportunities/new">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Oportunidad
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Oportunidades Activas</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">
                En diferentes etapas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total Pipeline</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3.2M</div>
              <p className="text-xs text-muted-foreground">
                Oportunidades abiertas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Ponderado</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1.8M</div>
              <p className="text-xs text-muted-foreground">
                Ajustado por probabilidad
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Cierre</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">
                Últimos 30 días
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Kanban View */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pipeline de Ventas</CardTitle>
            <CardDescription>Vista general del proceso de ventas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold">Prospección</span>
                  <Badge variant="secondary">8</Badge>
                </div>
                <div className="text-2xl font-bold mb-1">$420K</div>
                <p className="text-xs text-muted-foreground">Valor total</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold">Calificación</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="text-2xl font-bold mb-1">$680K</div>
                <p className="text-xs text-muted-foreground">Valor total</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold">Propuesta</span>
                  <Badge variant="secondary">9</Badge>
                </div>
                <div className="text-2xl font-bold mb-1">$890K</div>
                <p className="text-xs text-muted-foreground">Valor total</p>
              </div>
              <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold">Cerradas</span>
                  <Badge className="bg-green-500">6</Badge>
                </div>
                <div className="text-2xl font-bold mb-1">$460K</div>
                <p className="text-xs text-muted-foreground">Este mes</p>
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
                  placeholder="Buscar por nombre, empresa o responsable..."
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

        {/* Opportunities Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Oportunidades</CardTitle>
            <CardDescription>
              {opportunities.length} oportunidades activas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Oportunidad</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Probabilidad</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead>Cierre Esperado</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.map((opp) => {
                  const stageInfo = getStageLabel(opp.stage)
                  return (
                    <TableRow key={opp.id}>
                      <TableCell className="font-medium">{opp.name}</TableCell>
                      <TableCell>{opp.company}</TableCell>
                      <TableCell className="font-semibold">{opp.value}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full max-w-[100px] bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${opp.probability}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{opp.probability}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={stageInfo.color}>
                          {stageInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(opp.expectedClose).toLocaleDateString('es-MX')}
                      </TableCell>
                      <TableCell className="text-sm">{opp.assignedTo}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/crm/opportunities/${opp.id}`}>
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

