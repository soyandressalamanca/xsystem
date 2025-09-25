import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center">
        <Link href="/login" className="inline-block">
          <Image 
            src="/logo xsystem.png" 
            alt="XSystem Logo" 
            width={300} 
            height={150}
            className="object-contain mb-8"
          />
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Plataforma Web en Construcción
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Estamos trabajando para brindarte la mejor experiencia. 
          Pronto estará disponible.
        </p>
        
        <div>
          <Link 
            href="/login" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Acceder al Sistema
          </Link>
        </div>
      </div>
    </div>
  )
}
