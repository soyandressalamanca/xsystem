"use client"

import { motion } from "framer-motion"
import { ChevronDown, Sparkles, Users, Award, Target } from "lucide-react"

export function AboutHero() {
  return (
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

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Somos
            <span className="block bg-gradient-to-r from-[#3C85C6] to-[#00D4FF] bg-clip-text text-transparent">
              XSystem
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transformamos ideas en realidad con más de 25 años de experiencia en el mercado de TI
          </p>
        </motion.div>

        {/* Subtítulo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Soluciones integrales para la verdadera transformación digital
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Nos enorgullece ofrecer soluciones de negocio digital para una amplia gama de proyectos comerciales, industriales, de infraestructura y urbanismo.
          </p>
        </motion.div>


        {/* Botón de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <ChevronDown className="h-8 w-8 text-[#3C85C6]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
