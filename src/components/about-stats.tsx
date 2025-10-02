"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function AboutStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    {
      number: "25+",
      label: "Años de Experiencia",
      description: "Más de dos décadas innovando en tecnología"
    },
    {
      number: "100+",
      label: "Soluciones Integrales",
      description: "Productos y servicios especializados"
    },
    {
      number: "50+",
      label: "Partners Oficiales",
      description: "Alianzas con las mejores marcas"
    },
    {
      number: "1000+",
      label: "Clientes Satisfechos",
      description: "Empresas que confían en nosotros"
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-[#16438D] to-[#05171D] relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #3C85C6 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, #3C85C6 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, #3C85C6 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 150px 150px, 200px 200px'
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
            Nuestros Números
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Más de 25 años de experiencia respaldan nuestro compromiso con la excelencia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-b from-[#16438D]/80 to-[#05171D]/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10 hover:border-[#3C85C6]/50 transition-all duration-300">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  className="text-5xl md:text-6xl font-bold text-[#3C85C6] mb-4"
                >
                  {stat.number}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {stat.label}
                </h3>
                <p className="text-gray-300 text-sm">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
