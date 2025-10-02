"use client"

import { motion } from "framer-motion"
import { 
  ChevronLeft,
  ChevronRight, 
  Cloud, 
  Palette, 
  FileText, 
  Users, 
  Shield, 
  Cpu, 
  Factory, 
  Building, 
  Eye, 
  Box 
} from "lucide-react"
import { useState, useEffect } from "react"

const services = [
  {
    id: 1,
    title: "Infraestructura Cloud + AI + BI",
    description: "Soluciones robustas en Microsoft Azure, inteligencia artificial y business intelligence para optimizar tus operaciones.",
    icon: Cloud
  },
  {
    id: 2,
    title: "Industrias Creativas",
    description: "Potencia tu creatividad con herramientas líderes para diseño, multimedia y producción.",
    icon: Palette
  },
  {
    id: 3,
    title: "Flujo documental y Firma electrónica",
    description: "Optimiza la gestión de documentos y agiliza procesos con soluciones de firma electrónica seguras.",
    icon: FileText
  },
  {
    id: 4,
    title: "CRM",
    description: "Gestiona tus relaciones con clientes de manera eficiente, mejora ventas y fidelización.",
    icon: Users
  },
  {
    id: 5,
    title: "Ciberseguridad",
    description: "Protege tu información y sistemas contra amenazas digitales con soluciones avanzadas.",
    icon: Shield
  },
  {
    id: 6,
    title: "Infraestructura TI y Cómputo",
    description: "Diseño, implementación y gestión de infraestructura tecnológica robusta y escalable.",
    icon: Cpu
  },
  {
    id: 7,
    title: "Plantas de procesos y análisis de fluidos",
    description: "Optimiza operaciones en plantas industriales con software especializado para procesos y fluidos.",
    icon: Factory
  },
  {
    id: 8,
    title: "Industrias AEC",
    description: "Soluciones integrales para Arquitectura, Ingeniería, Construcción y Operación.",
    icon: Building
  },
  {
    id: 9,
    title: "Visualización y renderizado",
    description: "Crea imágenes y animaciones 3D de alta calidad para proyectos arquitectónicos y de diseño.",
    icon: Eye
  },
  {
    id: 10,
    title: "Diseño y manufactura de producto",
    description: "Herramientas avanzadas para el diseño, desarrollo y fabricación de productos innovadores.",
    icon: Box
  }
]

export function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Función para calcular la rotación de cada tarjeta
  const getCardRotation = (index: number, current: number) => {
    const relativeIndex = index - current
    // En móvil, no aplicar rotaciones 3D
    if (typeof window !== 'undefined' && window.innerWidth < 768) return 0
    if (relativeIndex === 0) return 0 // Tarjeta central - sin rotación
    if (relativeIndex === 1) return 25 // Tarjeta derecha - rotación hacia atrás
    if (relativeIndex === -1) return -25 // Tarjeta izquierda - rotación hacia atrás
    if (relativeIndex > 1) return 35 // Tarjetas más a la derecha - más rotación
    if (relativeIndex < -1) return -35 // Tarjetas más a la izquierda - más rotación
    return 0
  }

  // Función para calcular la profundidad Z
  const getCardDepth = (index: number, current: number) => {
    const relativeIndex = index - current
    if (relativeIndex === 0) return 0 // Tarjeta central - al frente
    if (Math.abs(relativeIndex) === 1) return -30 // Tarjetas laterales - atrás
    return -50 - (Math.abs(relativeIndex) * 20) // Tarjetas más lejanas - más atrás
  }

  // Función para calcular el z-index
  const getCardZIndex = (index: number, current: number) => {
    const relativeIndex = index - current
    if (relativeIndex === 0) return 20 // Tarjeta central - al frente
    if (Math.abs(relativeIndex) === 1) return 15 // Tarjetas laterales
    return 10 - Math.abs(relativeIndex) // Tarjetas más lejanas
  }

  // Función para calcular la opacidad
  const getCardOpacity = (index: number, current: number) => {
    const relativeIndex = index - current
    if (relativeIndex === 0) return 1 // Tarjeta central - completamente visible
    if (Math.abs(relativeIndex) === 1) return 0.8 // Tarjetas laterales - ligeramente transparentes
    return Math.max(0.3, 0.8 - (Math.abs(relativeIndex) * 0.2)) // Tarjetas lejanas - más transparentes
  }

  const nextService = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length)
  }

  const prevService = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
  }


  const goToService = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Efecto tecnológico - Grid de puntos */}
      <div className="absolute inset-0 opacity-60">
        {/* Grid de puntos tecnológico */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #3C85C6 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #16438D 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, #3C85C6 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 80px 80px, 100px 100px',
          backgroundPosition: '0 0, 30px 30px, 50px 50px'
        }}></div>
        
        {/* Líneas de conexión tecnológicas */}
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#3C85C6]/30 to-transparent"></div>
        <div className="absolute top-1/3 right-1/3 w-px h-24 bg-gradient-to-b from-transparent via-[#16438D]/30 to-transparent"></div>
        <div className="absolute bottom-1/3 left-1/2 w-px h-28 bg-gradient-to-b from-transparent via-[#3C85C6]/20 to-transparent"></div>
        <div className="absolute bottom-1/4 right-1/4 w-px h-20 bg-gradient-to-b from-transparent via-[#16438D]/20 to-transparent"></div>
        
        {/* Puntos de datos */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#3C85C6]/60 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#16438D]/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-[#3C85C6]/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-[#16438D]/60 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Efecto de ondas de datos */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#3C85C6]/10 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#16438D]/10 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      </div>
      
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
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ofertas de Servicios<br />
            <span className="text-gray-300">Integrales</span>
          </h2>
        </motion.div>

        {/* Carrusel 3D de Servicios */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Botones de navegación - Desktop: laterales, Móvil: abajo */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ 
              scale: 1.1, 
              rotate: -5,
              boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={prevService}
            className="hidden md:block p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors border border-white/20 flex-shrink-0"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </motion.button>

          {/* Servicios */}
          <div className="flex-1 overflow-hidden w-full">
                  <motion.div 
                    className="flex"
                    animate={{ x: `-${currentIndex * 33.333}%` }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 20,
                      duration: 0.8
                    }}
                  >
                    {/* Servicios con duplicación para efecto infinito */}
                    {[...services, ...services, ...services, ...services].map((service, index) => (
                <div key={`${service.id}-${index}`} className="w-full md:w-1/3 flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8, rotateY: -15 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1, 
                      rotateY: 0 
                    }}
                    whileHover={{ 
                      y: -5, 
                      scale: 1.01,
                      boxShadow: "0 25px 50px -12px rgba(60, 133, 198, 0.25)"
                    }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="bg-gradient-to-b from-[#16438D]/80 to-[#05171D]/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10 h-[400px] flex flex-col relative overflow-hidden"
                    style={{ 
                      transform: `perspective(1200px) rotateY(${getCardRotation(index, currentIndex)}deg) translateZ(${getCardDepth(index, currentIndex)}px)`,
                      zIndex: getCardZIndex(index, currentIndex),
                      opacity: getCardOpacity(index, currentIndex)
                    }}
                  >
                    {/* Efecto de brillo animado */}
                    <motion.div 
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#3C85C6] to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                    />
                    
                    {/* Icono */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                        className="w-16 h-16 rounded-2xl bg-[#3C85C6] flex items-center justify-center"
                      >
                        <service.icon className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>
                    
                    {/* Título */}
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      className="text-xl font-bold text-white text-center mb-4 flex-shrink-0"
                    >
                      {service.title}
                    </motion.h3>

                    {/* Descripción */}
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      className="text-gray-300 text-sm leading-relaxed text-center flex-grow flex items-center"
                    >
                      {service.description}
                    </motion.p>

                    {/* Botón */}
                    <motion.div 
                      className="flex justify-center mt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    >
                      <motion.button 
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(60, 133, 198, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-[#3C85C6] hover:bg-[#3C85C6]/80 text-white font-medium rounded-full transition-colors flex items-center space-x-2"
                      >
                        <span>Conoce más</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2,
                            delay: 1 + index * 0.1
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Botón siguiente - Desktop: lateral, Móvil: abajo */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ 
              scale: 1.1, 
              rotate: 5,
              boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={nextService}
            className="hidden md:block p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors border border-white/20 flex-shrink-0"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </motion.button>

                  {/* Indicadores móviles - Solo visibles en móvil */}
                  <div className="flex md:hidden justify-center mt-4">
                    <div className="flex space-x-2">
                      {services.map((_, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ 
                            scale: 1.2,
                            boxShadow: "0 3px 10px -2px rgba(255, 255, 255, 0.3)"
                          }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => goToService(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                              ? 'bg-white' 
                              : 'bg-white/30 hover:bg-white/50'
                          }`}
                        >
                          {index === currentIndex && (
                            <motion.div
                              className="w-full h-full bg-white rounded-full"
                              layoutId="activeIndicator"
                              transition={{ 
                                type: "spring", 
                                stiffness: 300, 
                                damping: 30 
                              }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
        </div>

      </div>
    </section>
  )
}
