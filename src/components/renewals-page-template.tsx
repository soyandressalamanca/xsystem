"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RefreshCw, Search, Filter, Download, Mail, Phone, MessageSquare, Eye, Calendar } from 'lucide-react'
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

interface Subscription {
  id: string
  product: string
  company: string
  contact: string
  email: string
  phone: string
  licenses: number
  monthlyPrice: string
  annualPrice: string
  renewalDate: string
  daysUntilRenewal: number
  lastContact: string
  notificationsSent: number
  assignedTo: string
}

interface RenewalsPageTemplateProps {
  title: string
  description: string
  days: number
  subscriptions: Subscription[]
  totalCount: number
  totalValue: string
  colorScheme: {
    bg: string
    border: string
    text: string
    badge: string
  }
}

export function RenewalsPageTemplate({
  title,
  description,
  days,
  subscriptions,
  totalCount,
  totalValue,
  colorScheme
}: RenewalsPageTemplateProps) {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <RefreshCw className={`h-8 w-8 ${colorScheme.text}`} />
              {title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {description}
            </p>
          </div>
          <div className="flex gap-2 md:ml-auto">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className={`${colorScheme.bg} ${colorScheme.border} border-2`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Renovaciones</CardTitle>
              <Calendar className={`h-4 w-4 ${colorScheme.text}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${colorScheme.text}`}>{totalCount}</div>
              <p className="text-xs text-muted-foreground">
                En los próximos {days} días
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalValue}</div>
              <p className="text-xs text-muted-foreground">
                MRR en renovación
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contactadas</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscriptions.filter(s => s.notificationsSent > 0).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Al menos un contacto
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sin Contactar</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscriptions.filter(s => s.notificationsSent === 0).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Requieren atención
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Acciones Masivas</CardTitle>
            <CardDescription>
              Gestiona todas las renovaciones de esta etapa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Enviar Email Masivo
              </Button>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Enviar WhatsApp Masivo
              </Button>
              <Button variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Generar Lista de Llamadas
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

        {/* Renewals Table */}
        <Card>
          <CardHeader>
            <CardTitle>Renovaciones en T-{days}</CardTitle>
            <CardDescription>
              {subscriptions.length} suscripciones por renovar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>MRR</TableHead>
                  <TableHead>Renovación</TableHead>
                  <TableHead>Días Restantes</TableHead>
                  <TableHead>Notificaciones</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((sub) => (
                  <TableRow key={sub.id}>
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
                      {new Date(sub.renewalDate).toLocaleDateString('es-MX')}
                    </TableCell>
                    <TableCell>
                      <Badge className={colorScheme.badge}>
                        {sub.daysUntilRenewal} días
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={sub.notificationsSent > 0 ? 'default' : 'outline'}>
                        {sub.notificationsSent} enviadas
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

