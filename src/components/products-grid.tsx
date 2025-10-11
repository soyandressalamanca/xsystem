"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { 
  Palette, 
  Building2, 
  Box, 
  Clapperboard, 
  Shield,
  Sparkles
} from "lucide-react"

const categories = [
  { id: "all", name: "Todos", icon: Sparkles },
  { id: "creative", name: "Industrias Creativas", icon: Palette },
  { id: "aeco", name: "AECO", icon: Building2 },
  { id: "manufacturing", name: "Manufactura", icon: Box },
  { id: "visualization", name: "Visualización", icon: Clapperboard },
  { id: "security", name: "Ciberseguridad", icon: Shield }
]

const products = [
  {
    category: "creative",
    name: "Adobe Creative Cloud",
    description: "Suite completa de herramientas creativas para diseño gráfico, video, web y más.",
    icon: Palette,
    features: ["Photoshop", "Illustrator", "InDesign", "Premiere Pro", "After Effects"],
    color: "from-[#FF0000] to-[#FF6B00]"
  },
  {
    category: "creative",
    name: "Adobe Acrobat Pro",
    description: "Solución profesional para creación, edición y gestión de documentos PDF.",
    icon: Palette,
    features: ["Edición PDF", "Firma Digital", "Formularios", "Colaboración"],
    color: "from-[#FF0000] to-[#DC143C]"
  },
  {
    category: "aeco",
    name: "BricsCAD",
    description: "Software CAD potente y asequible para diseño 2D/3D en arquitectura e ingeniería.",
    icon: Building2,
    features: ["CAD 2D/3D", "BIM", "Compatibilidad DWG", "Modelado Paramétrico"],
    color: "from-[#3C85C6] to-[#16438D]"
  },
  {
    category: "aeco",
    name: "Graphisoft",
    description: "Soluciones BIM avanzadas para arquitectos y diseñadores.",
    icon: Building2,
    features: ["ArchiCAD", "BIMx", "BIMcloud", "Modelado BIM"],
    color: "from-[#00D4FF] to-[#3C85C6]"
  },
  {
    category: "manufacturing",
    name: "Siemens NX",
    description: "Solución integral CAD/CAM/CAE para diseño y manufactura de productos.",
    icon: Box,
    features: ["Diseño CAD", "Simulación CAE", "Manufactura CAM", "PLM"],
    color: "from-[#00979D] to-[#005F6B]"
  },
  {
    category: "visualization",
    name: "Unity",
    description: "Plataforma líder para creación de experiencias interactivas en 3D y realidad virtual.",
    icon: Clapperboard,
    features: ["Visualización 3D", "Realidad Virtual", "Realidad Aumentada", "Simulación"],
    color: "from-[#000000] to-[#404040]"
  },
  {
    category: "visualization",
    name: "Twinmotion",
    description: "Software de visualización arquitectónica en tiempo real para renderizado rápido.",
    icon: Clapperboard,
    features: ["Renderizado Real-Time", "Visualización 360°", "Animaciones", "VR Ready"],
    color: "from-[#FF6B00] to-[#FF0000]"
  },
  {
    category: "security",
    name: "Acronis",
    description: "Soluciones de backup, recuperación ante desastres y protección de datos.",
    icon: Shield,
    features: ["Backup Cloud", "Recuperación", "Anti-ransomware", "Protección Endpoint"],
    color: "from-[#00A4E4] to-[#0066CC]"
  },
  {
    category: "security",
    name: "Sophos",
    description: "Ciberseguridad avanzada para endpoints, redes y servidores.",
    icon: Shield,
    features: ["Antivirus", "Firewall", "EDR", "XDR"],
    color: "from-[#00B4E6] to-[#0080B4]"
  }
]

export function ProductsGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <section ref={ref} className="py-20 bg-black relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, #3C85C6 1px, transparent 1px),
            linear-gradient(0deg, #3C85C6 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-[#3C85C6] text-white ring-2 ring-white/50'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => {
            const Icon = product.icon
            return (
              <motion.div
                key={`${product.category}-${product.name}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  className="h-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#3C85C6]/50 transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Icono con gradiente */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Nombre del producto */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#3C85C6] transition-colors w-full">
                    {product.name}
                  </h3>

                  {/* Descripción */}
                  <p className="text-gray-400 mb-6 leading-relaxed w-full">
                    {product.description}
                  </p>

                  {/* Características */}
                  <div className="space-y-2 w-full">
                    <p className="text-sm font-semibold text-[#3C85C6] mb-3">Características principales:</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {product.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-[#3C85C6] to-[#16438D] text-white font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Más información
                  </motion.button>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

