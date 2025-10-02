"use client"

import { motion } from "framer-motion"
import { ChevronDown, Sparkles, Users, Award, Target } from "lucide-react"

export function AboutHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-[#05171D] to-[#16438D] overflow-hidden">
      {/* Fondo de estrellas animadas */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => {
          // Usar un seed fijo y redondear para evitar diferencias de precisión
          const seed = i * 0.1
          const left = Math.round(((Math.sin(seed) * 50 + 50) % 100) * 100) / 100
          const top = Math.round(((Math.cos(seed) * 50 + 50) % 100) * 100) / 100
          const duration = 3 + (i % 4)
          const delay = (i % 8) * 0.3
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
              }}
            />
          )
        })}
      </div>

      {/* Grid tecnológico de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, #3C85C6 1px, transparent 1px),
            linear-gradient(0deg, #3C85C6 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-32 pb-16">
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

          {/* Características destacadas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#3C85C6] rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">25+ Años</h3>
              <p className="text-gray-300">De experiencia en el mercado</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#3C85C6] rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Soluciones Integrales</h3>
              <p className="text-gray-300">Para transformación digital</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#3C85C6] rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Partners Oficiales</h3>
              <p className="text-gray-300">De las mejores marcas</p>
            </div>
          </motion.div>

          {/* Botón de scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
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
      </div>
    </section>
  )
}
