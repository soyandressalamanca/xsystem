"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { 
  Cloud, 
  Brain, 
  Users, 
  Server,
  FileText,
  ShieldCheck,
  Sparkles
} from "lucide-react"

const categories = [
  { id: "all", name: "Todos", icon: Sparkles },
  { id: "cloud", name: "Cloud & IA", icon: Cloud },
  { id: "crm", name: "CRM", icon: Users },
  { id: "infrastructure", name: "Infraestructura", icon: Server },
  { id: "documents", name: "Flujo Documental", icon: FileText },
  { id: "security", name: "Ciberseguridad", icon: ShieldCheck }
]

const services = [
  {
    category: "cloud",
    name: "Transformación Digital",
    description: "Migramos tu empresa a la nube con estrategias personalizadas para modernizar tu infraestructura.",
    icon: Cloud,
    features: ["Migración Cloud", "Arquitectura Cloud", "Optimización de Costos", "Consultoría Estratégica"],
    benefits: ["Reducción de costos", "Mayor escalabilidad", "Acceso global"],
    color: "from-[#3C85C6] to-[#00D4FF]"
  },
  {
    category: "cloud",
    name: "Inteligencia Artificial y BI",
    description: "Implementamos soluciones de IA y Business Intelligence para tomar decisiones basadas en datos.",
    icon: Brain,
    features: ["Análisis Predictivo", "Machine Learning", "Dashboards Interactivos", "Data Warehouse"],
    benefits: ["Insights en tiempo real", "Automatización", "Mejores decisiones"],
    color: "from-[#8B5CF6] to-[#6366F1]"
  },
  {
    category: "crm",
    name: "Implementación de CRM",
    description: "Configuramos y personalizamos sistemas CRM para optimizar tu gestión de clientes y ventas.",
    icon: Users,
    features: ["Configuración Personalizada", "Integración de Sistemas", "Capacitación", "Soporte Continuo"],
    benefits: ["Mejores relaciones", "Mayor productividad", "Análisis de ventas"],
    color: "from-[#EC4899] to-[#F43F5E]"
  },
  {
    category: "infrastructure",
    name: "Infraestructura TI y Cómputo",
    description: "Diseñamos e implementamos infraestructuras tecnológicas robustas y escalables.",
    icon: Server,
    features: ["Diseño de Arquitectura", "Implementación", "Virtualización", "Mantenimiento"],
    benefits: ["Alta disponibilidad", "Rendimiento óptimo", "Escalabilidad"],
    color: "from-[#16438D] to-[#3C85C6]"
  },
  {
    category: "documents",
    name: "Gestión de Flujo Documental",
    description: "Digitalizamos y automatizamos tus procesos documentales para mayor eficiencia.",
    icon: FileText,
    features: ["Digitalización", "Automatización de Flujos", "Firma Digital", "Gestión Documental"],
    benefits: ["Procesos más rápidos", "Menos papel", "Trazabilidad"],
    color: "from-[#F59E0B] to-[#EF4444]"
  },
  {
    category: "security",
    name: "Consultoría en Ciberseguridad",
    description: "Protegemos tu empresa con auditorías, políticas de seguridad y respuesta a incidentes.",
    icon: ShieldCheck,
    features: ["Auditorías de Seguridad", "Políticas y Normativas", "Respuesta a Incidentes", "Capacitación"],
    benefits: ["Mayor protección", "Cumplimiento normativo", "Prevención de ataques"],
    color: "from-[#EF4444] to-[#DC2626]"
  }
]

export function ServicesGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory)

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

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={`${service.category}-${service.name}`}
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
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Nombre del servicio */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#3C85C6] transition-colors w-full">
                    {service.name}
                  </h3>

                  {/* Descripción */}
                  <p className="text-gray-400 mb-6 leading-relaxed w-full">
                    {service.description}
                  </p>

                  {/* Características */}
                  <div className="space-y-4 mb-6 w-full">
                    <p className="text-sm font-semibold text-[#3C85C6]">Lo que incluye:</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Beneficios */}
                  <div className="space-y-2 w-full">
                    <p className="text-sm font-semibold text-[#00D4FF]">Beneficios clave:</p>
                    <ul className="space-y-1 flex flex-col items-center md:items-start">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-xs text-gray-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <motion.button
                    className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-[#3C85C6] to-[#16438D] text-white font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Solicitar Asesoría
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

