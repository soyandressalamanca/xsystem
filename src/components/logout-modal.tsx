"use client"
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut, X } from 'lucide-react'

export function LogoutModal() {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-sm mx-4">
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
                  <LogOut className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Cerrar Sesión</h2>
                <p className="text-gray-600 mb-6">
                  ¿Estás seguro de que quieres cerrar sesión?
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleLogout}
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sí, Cerrar
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsOpen(false)}
                    className="flex-1"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
