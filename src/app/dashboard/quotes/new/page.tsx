import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileText, Save, Send, Plus, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link'

export default async function NewQuotePage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              Nueva Cotización
            </h1>
            <p className="text-muted-foreground mt-1">
              Crea una nueva cotización para tus clientes
            </p>
          </div>
          <div className="flex gap-2 md:ml-auto">
            <Button variant="outline" asChild>
              <Link href="/quotes">
                Cancelar
              </Link>
            </Button>
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Guardar Borrador
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Enviar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
                <CardDescription>
                  Datos básicos de la cotización
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente *</Label>
                    <Select>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Seleccionar cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Grupo Modelo</SelectItem>
                        <SelectItem value="2">FEMSA</SelectItem>
                        <SelectItem value="3">Cemex</SelectItem>
                        <SelectItem value="4">Bimbo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validUntil">Válida Hasta *</Label>
                    <Input 
                      id="validUntil" 
                      type="date" 
                      defaultValue={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título de la Cotización *</Label>
                  <Input 
                    id="title" 
                    placeholder="ej. Renovación Licencias Microsoft 365"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Descripción detallada de la cotización..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Products/Services */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Productos y Servicios</CardTitle>
                    <CardDescription>
                      Agrega los items a la cotización
                    </CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto/Servicio</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Precio Unit.</TableHead>
                      <TableHead>Descuento</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar producto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Microsoft 365 E5</SelectItem>
                            <SelectItem value="2">Adobe Creative Cloud</SelectItem>
                            <SelectItem value="3">Salesforce Enterprise</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue="1" className="w-20" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue="0" className="w-32" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue="0" placeholder="%" className="w-20" />
                      </TableCell>
                      <TableCell className="font-semibold">
                        $0.00
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Haz clic en "Agregar Item" para añadir productos o servicios
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notas Adicionales</CardTitle>
                <CardDescription>
                  Información adicional para el cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Términos y condiciones, notas especiales, etc..."
                  rows={6}
                />
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            {/* Totals */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Descuento:</span>
                  <span className="font-semibold text-red-600">-$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>IVA (16%):</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-2xl font-bold text-primary">$0.00</span>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <Select defaultValue="MXN">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                      <SelectItem value="USD">USD - Dólar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Plantillas</CardTitle>
                <CardDescription>
                  Usar plantilla prediseñada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plantilla" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Plantilla Básica</SelectItem>
                    <SelectItem value="2">Plantilla Corporativa</SelectItem>
                    <SelectItem value="3">Plantilla con Términos</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Vista Previa PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Desde Oportunidad
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

