"use client"
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogOut, X } from 'lucide-react'

export function LogoutConfirmation() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ 
      redirect: false,
      callbackUrl: '/login'
    })
    router.push('/login')
    router.refresh()
    setIsOpen(false)
  }

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setIsOpen(true)}
        className="w-full justify-start"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Cerrar Sesión
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4">
            <div className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
              {/* Header con gradiente */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <div className="flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <LogOut className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Contenido */}
              <div className="px-6 py-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Cerrar Sesión</h2>
                  <p className="text-gray-600 text-base leading-relaxed mb-8">
                    ¿Estás seguro de que quieres cerrar sesión?<br />
                    Tendrás que iniciar sesión nuevamente para acceder.
                  </p>
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={handleLogout}
                      className="flex-1 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ 
                        backgroundColor: '#3c85c6',
                        borderColor: '#3c85c6'
                      }}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Sí, Cerrar Sesión
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsOpen(false)}
                      className="flex-1 h-12 text-base font-semibold border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                    >
                      <X className="mr-2 h-5 w-5" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
