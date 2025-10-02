"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function AboutPartners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const partners = [
    // Microsoft y Azure
    { name: "Microsoft", category: "Cloud & AI" },
    { name: "Azure", category: "Cloud & AI" },
    
    // Adobe Creative Cloud
    { name: "Adobe Creative Cloud", category: "Creative" },
    { name: "Adobe Acrobat", category: "Document" },
    { name: "Substance 3D", category: "Creative" },
    
    // AECO
    { name: "Bricsys", category: "AECO" },
    { name: "Graphisoft", category: "AECO" },
    { name: "Hexagon PPM", category: "AECO" },
    { name: "Siemens", category: "AECO" },
    
    // Otras soluciones
    { name: "HubSpot", category: "CRM" },
    { name: "Acronis", category: "Security" },
    { name: "Sophos", category: "Security" },
    { name: "Kaspersky", category: "Security" },
    
    // Visualización
    { name: "VRex", category: "Visualization" },
    { name: "Unity", category: "Visualization" },
    { name: "Twinmotion", category: "Visualization" },
    
    // Otros
    { name: "Spatial Manager", category: "Tools" },
    { name: "Plexos", category: "Tools" },
    { name: "CGS Labs", category: "Tools" },
    { name: "CSI Caribe", category: "Tools" }
  ]

  const categories = [
    { name: "Cloud & AI", color: "from-blue-500 to-blue-600" },
    { name: "Creative", color: "from-purple-500 to-purple-600" },
    { name: "AECO", color: "from-green-500 to-green-600" },
    { name: "CRM", color: "from-orange-500 to-orange-600" },
    { name: "Security", color: "from-red-500 to-red-600" },
    { name: "Visualization", color: "from-pink-500 to-pink-600" },
    { name: "Tools", color: "from-gray-500 to-gray-600" }
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-[#05171D] to-[#16438D] relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, #3C85C6 1px, transparent 1px),
            linear-gradient(-45deg, #3C85C6 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
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
            Nuestros Aliados
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trabajamos con las mejores marcas del mercado para ofrecerte soluciones de clase mundial
          </p>
        </motion.div>

        {/* Categorías */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${category.color} text-white text-sm font-medium`}
            >
              {category.name}
            </div>
          ))}
        </motion.div>

        {/* Grid de partners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-[#3C85C6]/50"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {partner.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                </span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                {partner.name}
              </h3>
              <p className="text-gray-400 text-xs">
                {partner.category}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Texto adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-300 max-w-4xl mx-auto">
            Nuestras alianzas estratégicas nos permiten ofrecer soluciones integrales y actualizadas, 
            garantizando que nuestros clientes tengan acceso a las últimas tecnologías y mejores prácticas del mercado.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
