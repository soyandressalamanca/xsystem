'use client'

import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { 
  Building2, 
  FileText, 
  Calendar, 
  Users, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreHorizontal
} from 'lucide-react'

export default function DashboardPage() {
  // Mock session para desarrollo
  const session = { user: { name: 'Usuario Demo' } }
  
  if (!session?.user) {
    redirect('/login')
  }

  // Mock data para el dashboard
  const metrics = {
    totalRevenue: 2450000,
    newCustomers: 156,
    activeAccounts: 342,
    growthRate: 18.5
  }

  const recentClients = [
    { id: 1, name: 'Grupo Modelo SA', industry: 'Manufactura', status: 'Activo', value: '$45,000', date: '2024-01-15' },
    { id: 2, name: 'FEMSA Comercial', industry: 'Retail', status: 'Prospecto', value: '$78,000', date: '2024-01-14' },
    { id: 3, name: 'TechCorp Solutions', industry: 'Tecnología', status: 'Activo', value: '$32,000', date: '2024-01-13' },
    { id: 4, name: 'Bimbo de México', industry: 'Alimentación', status: 'Negociación', value: '$102,000', date: '2024-01-12' },
    { id: 5, name: 'Cemex México', industry: 'Construcción', status: 'Activo', value: '$89,000', date: '2024-01-11' }
  ]

  // Datos para diferentes períodos (actualizado para octubre 2024)
  const renewalData6Months = [
    { month: 'May', renewals: 42, new: 15 },
    { month: 'Jun', renewals: 48, new: 18 },
    { month: 'Jul', renewals: 52, new: 22 },
    { month: 'Ago', renewals: 45, new: 16 },
    { month: 'Sep', renewals: 58, new: 24 },
    { month: 'Oct', renewals: 61, new: 28 }
  ]

  const renewalData30Days = [
    { month: 'Sem 1', renewals: 18, new: 6 },
    { month: 'Sem 2', renewals: 22, new: 8 },
    { month: 'Sem 3', renewals: 16, new: 5 },
    { month: 'Sem 4', renewals: 25, new: 9 }
  ]

  const renewalData7Days = [
    { month: 'Lun', renewals: 12, new: 4 },
    { month: 'Mar', renewals: 15, new: 5 },
    { month: 'Mié', renewals: 8, new: 2 },
    { month: 'Jue', renewals: 18, new: 6 },
    { month: 'Vie', renewals: 22, new: 8 },
    { month: 'Sáb', renewals: 6, new: 2 },
    { month: 'Dom', renewals: 10, new: 3 }
  ]

  // Estado para el filtro de tiempo
  const [timeFilter, setTimeFilter] = React.useState('6months')
  
  // Función para obtener los datos según el filtro
  const getCurrentData = () => {
    switch (timeFilter) {
      case '30days':
        return renewalData30Days
      case '7days':
        return renewalData7Days
      default:
        return renewalData6Months
    }
  }

  const currentData = getCurrentData()

  return (
    <div className="flex flex-col gap-6 py-4 md:gap-8 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido, {session.user.name}
          </p>
        </div>

        {/* KPI Cards - 4 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(metrics.totalRevenue / 1000000).toFixed(2)}M</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500 font-medium">+12.5%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Tendencia alcista este mes
              </p>
              <p className="text-xs text-muted-foreground">
                Ingresos de los últimos 6 meses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nuevos Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.newCustomers}</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowDownRight className="h-3 w-3 text-red-500" />
                <span className="text-xs text-red-500 font-medium">-8.2%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Bajó 8.2% este período
              </p>
              <p className="text-xs text-muted-foreground">
                Adquisición necesita atención
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cuentas Activas</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.activeAccounts.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500 font-medium">+12.5%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Fuerte retención de usuarios
              </p>
              <p className="text-xs text-muted-foreground">
                Engagement excede objetivos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Crecimiento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.growthRate}%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500 font-medium">+4.5%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Aumento constante del rendimiento
              </p>
              <p className="text-xs text-muted-foreground">
                Cumple proyecciones de crecimiento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Renovaciones - Estirado a lo ancho */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Total de Renovaciones</CardTitle>
                <CardDescription>
                  {timeFilter === '6months' ? 'Total de los últimos 6 meses' :
                   timeFilter === '30days' ? 'Total de los últimos 30 días' :
                   'Total de los últimos 7 días'}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={timeFilter === '6months' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setTimeFilter('6months')}
                >
                  Últimos 6 meses
                </Button>
                <Button 
                  variant={timeFilter === '30days' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setTimeFilter('30days')}
                >
                  Últimos 30 días
                </Button>
                <Button 
                  variant={timeFilter === '7days' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setTimeFilter('7days')}
                >
                  Últimos 7 días
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="80" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Data points */}
                {currentData.map((data, index) => {
                  const x = (index / (currentData.length - 1)) * 900 + 50;
                  const maxRenewals = Math.max(...currentData.map(d => d.renewals));
                  const maxNew = Math.max(...currentData.map(d => d.new));
                  const y1 = 250 - (data.renewals / maxRenewals) * 200;
                  const y2 = 250 - (data.new / maxNew) * 200;
                  return (
                    <g key={index}>
                      {/* Circles for data points */}
                      <circle cx={x} cy={y1} r="4" fill="#3b82f6" className="hover:r-6 transition-all" />
                      <circle cx={x} cy={y2} r="4" fill="#10b981" className="hover:r-6 transition-all" />
                    </g>
                  );
                })}
                
                {/* Renewals line */}
                <path
                  d={currentData.map((data, index) => {
                    const x = (index / (currentData.length - 1)) * 900 + 50;
                    const maxRenewals = Math.max(...currentData.map(d => d.renewals));
                    const y = 250 - (data.renewals / maxRenewals) * 200;
                    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-sm"
                />
                
                {/* New clients line */}
                <path
                  d={currentData.map((data, index) => {
                    const x = (index / (currentData.length - 1)) * 900 + 50;
                    const maxNew = Math.max(...currentData.map(d => d.new));
                    const y = 250 - (data.new / maxNew) * 200;
                    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-sm"
                />
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="renewalsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="newGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Month labels */}
                {currentData.map((data, index) => {
                  const x = (index / (currentData.length - 1)) * 900 + 50;
                  return (
                    <text
                      key={index}
                      x={x}
                      y="290"
                      textAnchor="middle"
                      className="text-xs fill-muted-foreground"
                      fontSize="12"
                    >
                      {data.month}
                    </text>
                  );
                })}
              </svg>
            </div>
            <div className="mt-6 flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm font-medium">Renovaciones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm font-medium">Nuevos</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Clientes - Estilo como otras vistas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Clientes Recientes
                </CardTitle>
                <CardDescription>Gestión de clientes y oportunidades</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <MoreHorizontal className="mr-2 h-4 w-4" />
                  Personalizar Columnas
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Cliente
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filtros */}
            <div className="mb-6 flex flex-wrap gap-2">
              <Button variant="default" size="sm">Todos (156)</Button>
              <Button variant="outline" size="sm">Activos (342)</Button>
              <Button variant="outline" size="sm">Prospectos (28)</Button>
              <Button variant="outline" size="sm">En Negociación (12)</Button>
            </div>

            {/* Tabla */}
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Cliente
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Industria
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Estado
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Valor
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Fecha
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentClients.map((client) => (
                      <tr key={client.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-4 align-middle">
                          <input type="checkbox" className="rounded" />
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-muted-foreground">ID: {client.id}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="text-sm">{client.industry}</span>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge 
                            variant={
                              client.status === 'Activo' ? 'default' :
                              client.status === 'Prospecto' ? 'secondary' :
                              'outline'
                            }
                          >
                            {client.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="font-semibold text-green-600">{client.value}</span>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="text-sm text-muted-foreground">{client.date}</span>
                        </td>
                        <td className="p-4 align-middle">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between px-2 py-4">
              <div className="text-sm text-muted-foreground">
                Mostrando 5 de 156 clientes
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Anterior</Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Siguiente</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}