import { ContactForm } from '@/components/contact-form'
import { ContactInfo } from '@/components/contact-info'
import { ContactMap } from '@/components/contact-map'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function ContactPage() {
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
            Contacta con
            <span className="block text-[#3C85C6]">XSystem</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos aquí para ayudarte a transformar tu negocio con las mejores soluciones tecnológicas. 
            Conecta con nuestro equipo de expertos.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Información de Contacto */}
            <ContactInfo />
            
            {/* Formulario de Contacto */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Oficinas */}
      <ContactMap />

      {/* Footer */}
      <Footer />
    </div>
  )
}
