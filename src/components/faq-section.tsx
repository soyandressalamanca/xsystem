"use client"

import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    id: 1,
    question: "¿Qué es XSystem y cuántos años de experiencia tienen?",
    answer: "XSystem es una empresa con más de 25 años de experiencia en el mercado de IT, especializada en soluciones tecnológicas para empresas. Ofrecemos servicios desde infraestructura cloud hasta software especializado para industrias creativas, AECO y plantas de procesos."
  },
  {
    id: 2,
    question: "¿Qué servicios de infraestructura cloud ofrecen?",
    answer: "Ofrecemos soluciones completas de infraestructura cloud con Microsoft Azure, inteligencia artificial y business intelligence. Incluye migración a la nube, optimización de recursos, análisis de datos y automatización de procesos empresariales."
  },
  {
    id: 3,
    question: "¿Qué soluciones ofrecen para industrias creativas?",
    answer: "Trabajamos con estudios de diseño, agencias creativas, productoras audiovisuales y empresas de marketing. Ofrecemos Adobe Creative Cloud, Document Cloud y Substance 3D para optimizar flujos de trabajo creativos y gestión documental."
  },
  {
    id: 4,
    question: "¿Ofrecen soluciones para la industria AECO?",
    answer: "Sí, tenemos experiencia en Arquitectura, Ingeniería, Construcción y Operación. Trabajamos con Bricsys, HEXAGON PPM, GRAPHISOFT y SIEMENS para proyectos de infraestructura, plantas de procesos y análisis de fluidos."
  },
  {
    id: 5,
    question: "¿Qué otras soluciones tecnológicas ofrecen?",
    answer: "Ofrecemos CRM, ciberseguridad, infraestructura TI y cómputo, visualización y renderizado, diseño y manufactura de producto. También trabajamos con partners como Microsoft, Adobe, Acronis, Sophos y Kaspersky."
  },
  {
    id: 6,
    question: "¿En qué ciudades tienen presencia?",
    answer: "Tenemos sedes en Bogotá (Colombia), Barranquilla (Colombia) y Miami (Estados Unidos). Nuestro equipo está disponible para atender proyectos en toda Latinoamérica y Estados Unidos."
  },
  {
    id: 7,
    question: "¿Qué tipos de empresas pueden beneficiarse de sus servicios?",
    answer: "Trabajamos con empresas de todos los tamaños: desde startups hasta corporaciones multinacionales. Nuestros clientes incluyen universidades, empresas de telecomunicaciones, manufactureras, constructoras y estudios creativos."
  },
  {
    id: 8,
    question: "¿Ofrecen capacitación y soporte técnico?",
    answer: "Sí, ofrecemos capacitación personalizada, soporte técnico 24/7, documentación completa y webinars mensuales. Nuestro equipo de expertos está disponible para resolver cualquier consulta técnica y optimizar el uso de las soluciones implementadas."
  },
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Efecto minimalista */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Puntos sutiles en las esquinas */}
        {[
          { x: "15%", y: "15%" },
          { x: "85%", y: "15%" },
          { x: "15%", y: "85%" },
          { x: "85%", y: "85%" }
        ].map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#3C85C6]/40 rounded-full"
            style={{
              left: position.x,
              top: position.y,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          />
        ))}
        
        {/* Onda sutil que se expande desde el centro */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 border border-[#3C85C6]/20 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 8, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1
          }}
          style={{
            transform: "translate(-50%, -50%)"
          }}
        />
        
        {/* Grid sutil de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, #3C85C6 1px, transparent 1px),
              linear-gradient(0deg, #3C85C6 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        {/* Partículas flotantes sutiles */}
        {[...Array(6)].map((_, i) => {
          const seed = i * 0.5
          const left = (Math.sin(seed) * 30 + 50) % 100
          const top = (Math.cos(seed * 1.1) * 20 + 50) % 100
          const delay = i * 1.2
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#3C85C6]/30 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
              }}
            />
          )
        })}
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Título */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Encuentra respuestas a las consultas más comunes sobre nuestros servicios y soluciones tecnológicas.
          </p>
        </motion.div>

        {/* FAQ Items - 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <h3 className="text-white font-semibold text-lg pr-4">
                  {faq.question}
                </h3>
                <motion.div 
                  className="flex-shrink-0"
                  animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-5 w-5 text-[#3C85C6]" />
                </motion.div>
              </button>
              
              {openItems.includes(faq.id) && (
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.4, 0.0, 0.2, 1],
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className="px-8 pb-6"
                >
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="text-gray-300 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-6">
            ¿No encontraste la respuesta que buscabas?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="px-8 py-3 bg-[#16438D] hover:bg-[#3C85C6] text-white font-medium rounded-lg transition-colors"
            >
              Contáctanos
            </a>
            <a 
              href="/services" 
              className="px-8 py-3 border border-[#3C85C6] text-[#3C85C6] hover:bg-[#3C85C6] hover:text-white font-medium rounded-lg transition-colors"
            >
              Ver Servicios
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
