"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Eye, Award, Users } from "lucide-react"

export function AboutMission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="pt-2 pb-20 bg-black relative overflow-hidden">
      {/* Efecto de fondo sutil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, #3C85C6 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, #16438D 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 120px 120px'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nuestra Propuesta de Valor
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nos dedicamos a proporcionar soluciones integrales y personalizadas que satisfagan las necesidades tecnológicas de nuestros clientes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Misión */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-[#16438D] to-[#05171D] rounded-2xl p-8 text-white"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#3C85C6] rounded-full flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Misión</h3>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              <strong>En XSYSTEM, nos dedicamos a proporcionar soluciones integrales y personalizadas que satisfagan las necesidades tecnológicas de nuestros clientes.</strong> Nos esforzamos por ofrecer un servicio centrado en la satisfacción del cliente y la excelencia.
            </p>
            <p className="text-gray-300 mb-4">
              Combinamos software innovador, asistencia técnica especializada, implementación acompañada y seguimiento constante para garantizar que nuestros clientes logren sus objetivos comerciales de manera exitosa.
            </p>
            <p className="text-gray-300">
              Nuestro propósito es maximizar el valor de la inversión en tecnología de nuestros clientes.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-[#3C85C6] to-[#16438D] rounded-2xl p-8 text-white"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Visión</h3>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              <strong>En XSYSTEM, aspiramos a ser el socio tecnológico preferido para empresas de todos los sectores, ofreciendo soluciones líderes en el mercado y un servicio excepcional.</strong> Buscamos destacarnos por nuestra capacidad para anticipar y satisfacer las demandas cambiantes del mercado.
            </p>
            <p className="text-gray-300 mb-4">
              Nos enfocamos en la innovación y mejora continua, adaptándonos constantemente a las nuevas tecnologías y tendencias del sector para ofrecer soluciones de vanguardia.
            </p>
            <p className="text-gray-300">
              Nuestra visión es convertirnos en un referente en el sector tecnológico, contribuyendo al éxito y crecimiento sostenible de nuestros clientes en un entorno digital en constante evolución.
            </p>
          </motion.div>
        </div>

        {/* Valores */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Nuestros Valores
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#3C85C6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Excelencia</h4>
              <p className="text-gray-300">
                Nos esforzamos por ofrecer la más alta calidad en todos nuestros servicios y soluciones.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#3C85C6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Compromiso</h4>
              <p className="text-gray-300">
                Estamos comprometidos con el éxito de nuestros clientes y su satisfacción a largo plazo.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#3C85C6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Innovación</h4>
              <p className="text-gray-300">
                Buscamos constantemente nuevas tecnologías y metodologías para mejorar nuestros servicios.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
