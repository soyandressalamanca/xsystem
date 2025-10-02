"use client"

import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
  {
    id: 1,
    title: "¡Transformación Digital Exitosa!",
    text: "La implementación de Adobe Acrobat Sign en la Universidad de los Andes ha simplificado y agilizado los procesos de registro académico, administración y contratación. Los estudiantes pueden completar y firmar documentos electrónicamente, reduciendo significativamente los tiempos de espera.",
    client: "UNIANDES",
    logo: "🏛️",
    rating: 5
  },
  {
    id: 2,
    title: "¡Servicio Excepcional!",
    text: "Desde 2019, hemos confiado en XSYSTEM como nuestro proveedor de soluciones tecnológicas debido a su excelente servicio al cliente y disponibilidad 24/7. La integración de Adobe Acrobat Sign con Scarlaf ha mejorado la trazabilidad y seguridad de nuestros documentos firmados.",
    client: "POSITIVA",
    logo: "🏥",
    rating: 5
  },
  {
    id: 3,
    title: "¡Aliado Estratégico Perfecto!",
    text: "Por más de dos años hemos trabajado con Xsystem, convirtiéndose en nuestro aliado estratégico con el despliegue de licenciamiento de AFT y Hexagon. Se caracterizan por contar con un equipo especializado y atento a todos nuestros requerimientos técnicos.",
    client: "Y&V",
    logo: "🏗️",
    rating: 5
  },
  {
    id: 4,
    title: "¡Creatividad Potenciada!",
    text: "XSystem ha transformado completamente nuestros procesos de diseño con Adobe Creative Cloud. La implementación de Substance 3D nos ha permitido crear visualizaciones 3D de alta calidad que han impresionado a nuestros clientes y aumentado significativamente nuestras ventas.",
    client: "STUDIO CREATIVO",
    logo: "🎨",
    rating: 5
  },
  {
    id: 5,
    title: "¡Migración a la Nube Exitosa!",
    text: "La migración a Microsoft Azure con XSystem ha sido un éxito total. Hemos reducido nuestros costos de infraestructura en un 40% mientras mejoramos la seguridad y escalabilidad. Su soporte técnico 24/7 ha sido fundamental para nuestro crecimiento empresarial.",
    client: "TECHNOLOGLASS",
    logo: "🏢",
    rating: 5
  },
  {
    id: 6,
    title: "¡Revolución en Infraestructura!",
    text: "La implementación de Bricsys y HEXAGON PPM ha revolucionado nuestros proyectos de infraestructura. Los tiempos de diseño se han reducido en un 60% y la precisión de nuestros cálculos ha mejorado dramáticamente. XSystem es nuestro partner tecnológico de confianza.",
    client: "INGENIERÍA DEL NORTE",
    logo: "⚙️",
    rating: 5
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1
        // Si llegamos al final de la primera copia, saltar al inicio de la segunda
        if (next >= testimonials.length) {
          return testimonials.length // Saltar al inicio de la segunda copia
        }
        return next
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToTestimonial = (index: number) => {
    // Para los 3 puntos: 0, 1, 2
    // Punto 0: testimonios 0, 1, 2
    // Punto 1: testimonios 3, 4, 5  
    // Punto 2: testimonios 6, 7, 8 (que son 0, 1, 2 del loop)
    const targetIndex = index * 3
    setCurrentIndex(targetIndex)
    setIsAutoPlaying(false)
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1
      // Si llegamos al final de la primera copia, saltar al inicio de la segunda
      if (next >= testimonials.length) {
        return testimonials.length // Saltar al inicio de la segunda copia
      }
      return next
    })
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1
      // Si vamos antes del inicio, ir al final de la primera copia
      if (prevIndex < 0) {
        return testimonials.length - 1
      }
      return prevIndex
    })
  }

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Título */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-[#16438D] rounded-full mb-6">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              <span className="text-white text-sm font-medium">XSystem</span>
              <div className="w-2 h-2 bg-white rounded-full ml-2"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            No Confíes en Nosotros,<br />
            <span className="text-gray-300">Confía en Su Voz</span>
          </h2>
        </motion.div>

        {/* Carrusel */}
        <div className="relative">
          {/* Ondas de datos solo en la sección de testimonios */}
          <div className="absolute inset-0 opacity-80">
            {/* Ondas horizontales que cruzan toda la sección */}
            <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3C85C6]/40 to-transparent"></div>
            <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#16438D]/40 to-transparent"></div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3C85C6]/30 to-transparent"></div>
            <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#16438D]/30 to-transparent"></div>
            <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3C85C6]/20 to-transparent"></div>
            
            {/* Puntos de datos en las ondas */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#3C85C6]/60 rounded-full animate-pulse"></div>
            <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-[#3C85C6]/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-[#16438D]/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#16438D]/60 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#3C85C6]/60 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            
            {/* Efecto de ondas expandiéndose */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#3C85C6]/20 rounded-full animate-ping"></div>
            <div className="absolute top-1/3 right-1/3 w-24 h-24 border border-[#16438D]/20 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/3 left-1/3 w-28 h-28 border border-[#3C85C6]/15 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          </div>

          {/* Testimonios */}
          <div className="overflow-hidden">
                  <motion.div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
                  >
                    {/* Duplicar testimonios para efecto infinito */}
                    {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                      <div key={`${testimonial.id}-${index}`} className="w-full md:w-1/3 flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gradient-to-b from-[#16438D] to-[#05171D] rounded-2xl p-8 shadow-2xl backdrop-blur-sm h-[400px] flex flex-col border border-white/10 transition-all duration-500 ease-in-out hover:border-[#3C85C6] hover:shadow-[#3C85C6]/40 hover:shadow-2xl hover:translate-y-2"
                  >
                    {/* Título del testimonio */}
                    <h3 className="text-2xl font-bold text-white text-center mb-6 flex-shrink-0">
                      {testimonial.title}
                    </h3>

                    {/* Testimonio */}
                    <blockquote className="text-gray-300 text-base leading-relaxed text-center mb-8 flex-grow flex items-center">
                      {testimonial.text}
                    </blockquote>

                    {/* Cliente */}
                    <div className="text-center flex-shrink-0">
                      <h4 className="text-white font-semibold text-lg">{testimonial.client}</h4>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-12 space-x-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === (currentIndex % 3)
                    ? 'bg-white' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
