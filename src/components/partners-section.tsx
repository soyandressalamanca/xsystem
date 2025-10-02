"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
  {
    name: "Microsoft",
    logo: "M",
    color: "#00BCF2",
    description: "Azure Cloud Platform"
  },
  {
    name: "Adobe",
    logo: "A",
    color: "#FF0000",
    description: "Creative Cloud & Document Cloud"
  },
  {
    name: "Autodesk",
    logo: "A",
    color: "#0696D7",
    description: "CAD & 3D Design Software"
  },
  {
    name: "Hexagon",
    logo: "H",
    color: "#00A651",
    description: "PPM & Engineering Solutions"
  },
  {
    name: "Bricsys",
    logo: "B",
    color: "#1E88E5",
    description: "CAD & BIM Software"
  },
  {
    name: "Graphisoft",
    logo: "G",
    color: "#1976D2",
    description: "Archicad & BIM Solutions"
  },
  {
    name: "Siemens",
    logo: "S",
    color: "#009639",
    description: "Digital Industries"
  },
  {
    name: "Acronis",
    logo: "A",
    color: "#FF6B35",
    description: "Cyber Protection"
  },
  {
    name: "Sophos",
    logo: "S",
    color: "#00A651",
    description: "Cybersecurity Solutions"
  },
  {
    name: "Kaspersky",
    logo: "K",
    color: "#FF6B35",
    description: "Endpoint Security"
  }
]

export function PartnersSection() {
  return (
    <section className="bg-black py-16 relative overflow-hidden">
      {/* Efecto de fondo sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, #3C85C6 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, #16438D 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 120px 120px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Título */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#16438D] rounded-full mb-6">
            <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
            <span className="text-white text-sm font-medium">Partners Tecnológicos</span>
            <div className="w-2 h-2 bg-white rounded-full ml-2"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trabajamos con los Líderes
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Colaboramos con las mejores marcas tecnológicas para brindarte soluciones de clase mundial.
          </p>
        </motion.div>

        {/* Grid de partners */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -5,
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(60, 133, 198, 0.2)"
              }}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#3C85C6]/50 transition-all duration-300 hover:bg-white/10"
            >
              {/* Logo con color oficial */}
              <div className="flex items-center justify-center h-16 mb-4">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: partner.color }}
                >
                  <span className="text-white font-bold text-2xl">{partner.logo}</span>
                </div>
              </div>
              
              {/* Nombre */}
              <h3 className="text-white font-semibold text-center mb-2 group-hover:text-[#3C85C6] transition-colors">
                {partner.name}
              </h3>
              
              {/* Descripción */}
              <p className="text-gray-400 text-xs text-center leading-relaxed">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
