import { FAQContent } from '@/components/faq-content'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-black via-[#05171D] to-black overflow-hidden">
        {/* Efecto de fondo sutil */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #3C85C6 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, #16438D 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 80px 80px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Preguntas Frecuentes
            <span className="block text-[#3C85C6]">Software & Programas</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Encuentra respuestas sobre los programas y soluciones de software que manejamos en XSystem. 
            Desde Microsoft hasta Adobe, te ayudamos a resolver tus dudas.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <FAQContent />

      {/* Footer */}
      <Footer />
    </div>
  )
}
