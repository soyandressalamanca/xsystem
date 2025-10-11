import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { 
  Package, 
  Plus, 
  Download, 
  Edit, 
  Eye, 
  Trash2,
  DollarSign,
  TrendingUp,
  Building2,
  Zap
} from 'lucide-react'

export default function QuotesProductsPage() {
  // Mock data para productos
  const products = [
    {
      id: 1,
      name: 'Licencia Microsoft 365 Business',
      description: 'Suite completa de productividad empresarial',
      category: 'Software',
      price: 12000,
      currency: 'MXN',
      status: 'Activo',
      stock: 150,
      supplier: 'Microsoft México',
      lastUpdated: '2024-10-15'
    },
    {
      id: 2,
      name: 'Servidor Dell PowerEdge R750',
      description: 'Servidor rack 1U con procesador Intel Xeon',
      category: 'Hardware',
      price: 85000,
      currency: 'MXN',
      status: 'Activo',
      stock: 8,
      supplier: 'Dell Technologies',
      lastUpdated: '2024-10-12'
    },
    {
      id: 3,
      name: 'Consultoría IT - Implementación',
      description: 'Servicio de consultoría para implementación de sistemas',
      category: 'Servicios',
      price: 2500,
      currency: 'MXN',
      status: 'Activo',
      stock: null,
      supplier: 'Interno',
      lastUpdated: '2024-10-10'
    },
    {
      id: 4,
      name: 'Switch Cisco Catalyst 9300',
      description: 'Switch de red empresarial 48 puertos',
      category: 'Hardware',
      price: 45000,
      currency: 'MXN',
      status: 'Activo',
      stock: 12,
      supplier: 'Cisco Systems',
      lastUpdated: '2024-10-08'
    },
    {
      id: 5,
      name: 'Mantenimiento Preventivo Anual',
      description: 'Servicio de mantenimiento para equipos de cómputo',
      category: 'Servicios',
      price: 8000,
      currency: 'MXN',
      status: 'Activo',
      stock: null,
      supplier: 'Interno',
      lastUpdated: '2024-10-05'
    },
    {
      id: 6,
      name: 'Licencia Adobe Creative Cloud',
      description: 'Suite de diseño gráfico y multimedia',
      category: 'Software',
      price: 1800,
      currency: 'MXN',
      status: 'Agotado',
      stock: 0,
      supplier: 'Adobe México',
      lastUpdated: '2024-09-28'
    }
  ]

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header - Layout de 2 columnas: título a la izquierda, botones pegados a la derecha */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Package className="h-8 w-8 text-primary" />
              Productos y Servicios
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona el catálogo de productos y servicios para cotizaciones
            </p>
          </div>
          <div className="flex gap-2 md:ml-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button asChild>
              <Link href="/dashboard/quotes/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Producto
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                En el catálogo
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos Activos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.filter(p => p.status === 'Activo').length}</div>
              <p className="text-xs text-muted-foreground">
                Disponibles para venta
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(products.reduce((sum, p) => sum + p.price, 0), 'MXN').replace('MX$', '$')}
              </div>
              <p className="text-xs text-muted-foreground">
                Inventario total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorías</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(products.map(p => p.category)).size}</div>
              <p className="text-xs text-muted-foreground">
                Diferentes categorías
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button variant="default" size="sm">Todos ({products.length})</Button>
          <Button variant="outline" size="sm">Software ({products.filter(p => p.category === 'Software').length})</Button>
          <Button variant="outline" size="sm">Hardware ({products.filter(p => p.category === 'Hardware').length})</Button>
          <Button variant="outline" size="sm">Servicios ({products.filter(p => p.category === 'Servicios').length})</Button>
          <Button variant="outline" size="sm">Con Stock ({products.filter(p => p.stock && p.stock > 0).length})</Button>
          <Button variant="outline" size="sm">Agotados ({products.filter(p => p.status === 'Agotado').length})</Button>
        </div>

        {/* Tabla de Productos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-6 w-6 text-primary" />
                  Catálogo de Productos
                </CardTitle>
                <CardDescription>Gestiona tu inventario de productos y servicios</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Producto
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Categoría
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Precio
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Stock
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Estado
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Proveedor
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-4 align-middle">
                          <input type="checkbox" className="rounded" />
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.description}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge 
                            variant={
                              product.category === 'Software' ? 'default' :
                              product.category === 'Hardware' ? 'secondary' :
                              'outline'
                            }
                          >
                            {product.category}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="font-semibold text-green-600">
                            {formatPrice(product.price, product.currency)}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          {product.stock !== null ? (
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold ${
                                product.stock === 0 ? 'text-red-600' :
                                product.stock < 10 ? 'text-orange-600' :
                                'text-green-600'
                              }`}>
                                {product.stock}
                              </span>
                              {product.stock < 10 && product.stock > 0 && (
                                <Zap className="h-3 w-3 text-orange-500" />
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">N/A</span>
                          )}
                        </td>
                        <td className="p-4 align-middle">
                          <Badge 
                            variant={
                              product.status === 'Activo' ? 'default' :
                              'destructive'
                            }
                          >
                            {product.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="text-sm">{product.supplier}</span>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" title="Ver detalles">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Editar">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Eliminar">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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
                Mostrando {products.length} de {products.length} productos
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Anterior</Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm">Siguiente</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
