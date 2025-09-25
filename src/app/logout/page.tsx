import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LogoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <LogOut className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Cerrando Sesión</CardTitle>
          <CardDescription>
            Has cerrado sesión exitosamente de XSystem CRM
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Gracias por usar XSystem CRM. Tu sesión ha sido cerrada de forma segura.
          </div>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                Iniciar Sesión Nuevamente
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
