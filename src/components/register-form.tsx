'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validaciones básicas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (response.ok) {
        // Registro exitoso, iniciar sesión automáticamente
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          setError('Error al iniciar sesión después del registro')
        } else {
          router.push('/dashboard')
          router.refresh()
        }
      } else {
        const data = await response.json()
        setError(data.error || 'Error al crear la cuenta')
      }
    } catch (error) {
      setError('Error al crear la cuenta')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-white">Crear Cuenta</h1>
        <p className="text-white text-sm text-balance">
          Regístrate para acceder a XSystem
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name" className="text-white">Nombre Completo</Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="Tu nombre completo" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
            required 
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="tu@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
            required 
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password" className="text-white">Contraseña</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
            required 
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword" className="text-white">Confirmar Contraseña</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
            required 
          />
        </div>
        {error && (
          <div className="text-sm text-red-400 text-center">
            {error}
          </div>
        )}
        <Button type="submit" className="w-full text-white" style={{ backgroundColor: '#16438d' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f2d5f'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16438d'} disabled={isLoading}>
          {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-white">O continúa con</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-white text-black hover:bg-gray-100 border-gray-600"
            onClick={() => signIn('google')}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full bg-white text-black hover:bg-gray-100 border-gray-600"
            onClick={() => signIn('azure-ad')}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#00BCF2" d="M1 12c0-1.5.5-2.9 1.4-4l2.1 2.1c-.3.9-.5 1.9-.5 2.9s.2 2 .5 2.9L2.4 16c-.9-1.1-1.4-2.5-1.4-4z"/>
              <path fill="#0078D4" d="M12 1C6.5 1 2 5.5 2 11s4.5 10 10 10 10-4.5 10-10S17.5 1 12 1zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
              <path fill="#00BCF2" d="M12 6c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
            </svg>
            Microsoft
          </Button>
        </div>
      </div>
      
      <div className="text-center text-sm text-white">
        <p>¿Ya tienes cuenta? <a href="/login" className="text-blue-400 hover:text-blue-300 underline">Inicia sesión aquí</a></p>
      </div>
    </form>
  )
}
