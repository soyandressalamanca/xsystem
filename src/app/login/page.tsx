import { Building2 } from "lucide-react"
import Image from "next/image"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Logo a la izquierda con fondo blanco */}
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-white">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center">
            <Image 
              src="/logo xsystem.png" 
              alt="XSystem Logo" 
              width={200} 
              height={100}
              className="object-contain"
            />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          {/* Solo el logo, sin texto */}
        </div>
      </div>

      {/* Formulario de login a la derecha con fondo negro */}
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-black">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
