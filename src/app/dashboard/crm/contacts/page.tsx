import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users, Search, Plus, Filter, Download, Mail, Phone, Eye } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from 'next/link'

export default async function ContactsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Mock data
  const contacts = [
    {
      id: '1',
      firstName: 'Roberto',
      lastName: 'Sánchez',
      email: 'roberto@grupomodelo.com',
      phone: '+52 55 1234 5678',
      mobilePhone: '+52 55 8765 4321',
      position: 'Director de TI',
      department: 'Tecnología',
      company: 'Grupo Modelo',
      isPrimary: true,
      lastContact: '2024-10-09'
    },
    {
      id: '2',
      firstName: 'Laura',
      lastName: 'Martínez',
      email: 'laura@femsa.com',
      phone: '+52 811 234 5678',
      mobilePhone: '+52 811 876 5432',
      position: 'Gerente de Sistemas',
      department: 'Sistemas',
      company: 'FEMSA',
      isPrimary: true,
      lastContact: '2024-10-10'
    },
    {
      id: '3',
      firstName: 'Pedro',
      lastName: 'Ramírez',
      email: 'pedro@cemex.com',
      phone: '+52 818 345 6789',
      mobilePhone: '+52 818 987 6543',
      position: 'Jefe de Infraestructura',
      department: 'TI',
      company: 'Cemex',
      isPrimary: false,
      lastContact: '2024-10-08'
    },
    {
      id: '4',
      firstName: 'Ana',
      lastName: 'Flores',
      email: 'ana@bimbo.com',
      phone: '+52 55 456 7890',
      mobilePhone: '+52 55 098 7654',
      position: 'Coordinadora de TI',
      department: 'Tecnología',
      company: 'Bimbo',
      isPrimary: true,
      lastContact: '2024-10-07'
    },
  ]

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              Contactos
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona los contactos de tus clientes y leads
            </p>
          </div>
          <div className="flex gap-2 md:ml-auto">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button asChild>
              <Link href="/dashboard/crm/contacts/new">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Contacto
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contactos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle className="text-sm font-medium">Contactos Primarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                Un contacto principal por empresa
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contactados Hoy</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                Por email, llamada o WhatsApp
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Por Contactar</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-muted-foreground">
                Seguimientos pendientes
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
                  placeholder="Buscar por nombre, email, teléfono o empresa..."
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

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Contactos</CardTitle>
            <CardDescription>
              {contacts.length} contactos en total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Puesto</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Último Contacto</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(contact.firstName, contact.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {contact.firstName} {contact.lastName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {contact.department}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{contact.position}</TableCell>
                    <TableCell>
                      <a href={`mailto:${contact.email}`} className="text-sm text-blue-600 hover:underline">
                        {contact.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{contact.phone}</div>
                        <div className="text-xs text-muted-foreground">{contact.mobilePhone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{contact.company}</TableCell>
                    <TableCell>
                      {contact.isPrimary ? (
                        <Badge>Principal</Badge>
                      ) : (
                        <Badge variant="secondary">Secundario</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(contact.lastContact).toLocaleDateString('es-MX')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`mailto:${contact.email}`}>
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>
                            <Phone className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/crm/contacts/${contact.id}`}>
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

