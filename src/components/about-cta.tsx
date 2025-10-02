"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function AboutCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-black relative overflow-hidden">
      {/* Efecto de fondo sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, #3C85C6 1px, transparent 1px),
            linear-gradient(-45deg, #16438D 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Únete a los cientos de empresas que ya confían en XSystem para su transformación digital
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/contact" 
              className="px-8 py-4 bg-[#16438D] hover:bg-[#3C85C6] text-white font-medium rounded-lg transition-colors text-lg"
            >
              Contáctanos
            </a>
            <a 
              href="/services" 
              className="px-8 py-4 border border-[#3C85C6] text-[#3C85C6] hover:bg-[#3C85C6] hover:text-white font-medium rounded-lg transition-colors text-lg"
            >
              Ver Servicios
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
