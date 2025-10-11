"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { ArrowRight, MessageSquare } from "lucide-react"
import Link from "next/link"

export function ProductsCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-black relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3C85C6] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3C85C6] to-transparent"></div>
      </div>

      {/* Gradiente radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3C85C6]/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Necesitas asesoría sobre nuestros{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3C85C6] to-[#00D4FF]">
              productos?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte a elegir la mejor solución para tu negocio.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-[#3C85C6] to-[#16438D] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="h-5 w-5" />
                Contactar Asesor
              </motion.button>
            </Link>

            <Link href="/services">
              <motion.button
                className="px-8 py-4 border-2 border-[#3C85C6] text-[#3C85C6] font-semibold rounded-full hover:bg-[#3C85C6] hover:text-white transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Servicios
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

