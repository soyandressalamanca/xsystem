"use client"

import { motion } from "framer-motion"
import { Settings, ChevronDown } from "lucide-react"

export function ServicesHero() {
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#3C85C6]/20 to-[#00D4FF]/20 backdrop-blur-sm border border-[#3C85C6]/30 rounded-full px-6 py-3 mb-8">
            <Settings className="h-5 w-5 text-[#3C85C6]" />
            <span className="text-white font-medium text-center">Consultoría e Implementación</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3C85C6] to-[#00D4FF]">Servicios</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Servicios profesionales de consultoría, implementación y soporte para impulsar 
            la transformación digital de tu empresa.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center mt-8"
        >
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-[#3C85C6] to-[#00D4FF] rounded-full flex items-center justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-sm text-gray-400 mt-2">Explora nuestros servicios</span>
        </motion.div>
      </div>
    </section>
  )
}

