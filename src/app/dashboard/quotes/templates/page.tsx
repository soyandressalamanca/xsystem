import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { 
  FileText, 
  Plus, 
  Download, 
  Edit, 
  Copy, 
  Trash2,
  Calendar,
  User,
  Building2
} from 'lucide-react'

export default function QuotesTemplatesPage() {
  // Mock data para plantillas
  const templates = [
    {
      id: 1,
      name: 'Plantilla Básica - Servicios',
      description: 'Plantilla estándar para servicios generales',
      category: 'Servicios',
      status: 'Activa',
      lastModified: '2024-10-15',
      createdBy: 'Juan Pérez',
      usageCount: 45
    },
    {
      id: 2,
      name: 'Plantilla Premium - Software',
      description: 'Plantilla para licencias de software empresarial',
      category: 'Software',
      status: 'Activa',
      lastModified: '2024-10-12',
      createdBy: 'María González',
      usageCount: 23
    },
    {
      id: 3,
      name: 'Plantilla Hardware - Servidores',
      description: 'Plantilla especializada para equipos de servidores',
      category: 'Hardware',
      status: 'Borrador',
      lastModified: '2024-10-10',
      createdBy: 'Carlos Ruiz',
      usageCount: 8
    },
    {
      id: 4,
      name: 'Plantilla Consultoría IT',
      description: 'Plantilla para servicios de consultoría tecnológica',
      category: 'Consultoría',
      status: 'Activa',
      lastModified: '2024-10-08',
      createdBy: 'Ana López',
      usageCount: 31
    },
    {
      id: 5,
      name: 'Plantilla Mantenimiento',
      description: 'Plantilla para contratos de mantenimiento anual',
      category: 'Mantenimiento',
      status: 'Activa',
      lastModified: '2024-10-05',
      createdBy: 'Pedro Martínez',
      usageCount: 67
    }
  ]

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header - Layout de 2 columnas: título a la izquierda, botones pegados a la derecha */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              Plantillas de Cotizaciones
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona las plantillas para crear cotizaciones rápidamente
            </p>
          </div>
          <div className="flex gap-2 md:ml-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button asChild>
              <Link href="/dashboard/quotes/templates/new">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Plantilla
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Plantillas</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{templates.length}</div>
              <p className="text-xs text-muted-foreground">
                Plantillas disponibles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plantillas Activas</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{templates.filter(t => t.status === 'Activa').length}</div>
              <p className="text-xs text-muted-foreground">
                Listas para usar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usos Totales</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{templates.reduce((sum, t) => sum + t.usageCount, 0)}</div>
              <p className="text-xs text-muted-foreground">
                Cotizaciones generadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorías</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(templates.map(t => t.category)).size}</div>
              <p className="text-xs text-muted-foreground">
                Diferentes categorías
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button variant="default" size="sm">Todas ({templates.length})</Button>
          <Button variant="outline" size="sm">Activas ({templates.filter(t => t.status === 'Activa').length})</Button>
          <Button variant="outline" size="sm">Borrador ({templates.filter(t => t.status === 'Borrador').length})</Button>
          <Button variant="outline" size="sm">Servicios ({templates.filter(t => t.category === 'Servicios').length})</Button>
          <Button variant="outline" size="sm">Software ({templates.filter(t => t.category === 'Software').length})</Button>
        </div>

        {/* Tabla de Plantillas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Plantillas Disponibles
                </CardTitle>
                <CardDescription>Gestiona tus plantillas de cotizaciones</CardDescription>
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
                        Nombre
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Categoría
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Estado
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Usos
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Creado por
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Última modificación
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {templates.map((template) => (
                      <tr key={template.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-4 align-middle">
                          <input type="checkbox" className="rounded" />
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-sm text-muted-foreground">{template.description}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant="secondary">{template.category}</Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge 
                            variant={template.status === 'Activa' ? 'default' : 'outline'}
                          >
                            {template.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="font-semibold text-blue-600">{template.usageCount}</span>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="text-sm">{template.createdBy}</span>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="text-sm text-muted-foreground">{template.lastModified}</span>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" title="Usar plantilla">
                              <Copy className="h-4 w-4" />
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
                Mostrando {templates.length} de {templates.length} plantillas
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
