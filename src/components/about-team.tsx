"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Users, Award, Target, Heart } from "lucide-react"

export function AboutTeam() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const teamValues = [
    {
      icon: Users,
      title: "Equipo Competente",
      description: "Profesionales altamente capacitados y comprometidos con la excelencia en el servicio"
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description: "Política de calidad respaldada por procesos probados y certificaciones"
    },
    {
      icon: Target,
      title: "Enfoque en Resultados",
      description: "Nos enfocamos en entregar soluciones que generen valor real para nuestros clientes"
    },
    {
      icon: Heart,
      title: "Compromiso Social",
      description: "Dedicados a contribuir al desarrollo tecnológico y sostenible de la región"
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#16438D] mb-6">
            Nuestro Equipo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un equipo altamente competente y comprometido con el servicio excepcional
          </p>
        </motion.div>

        {/* Valores del equipo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-[#16438D] to-[#05171D] rounded-2xl p-8 text-white h-full">
                <div className="w-16 h-16 bg-[#3C85C6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-[#16438D] to-[#3C85C6] rounded-2xl p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-6">
            Aliado estratégico en tecnologías para la sostenibilidad
          </h3>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8">
            Con más de 25 años en el mercado de TI, nos enorgullece ofrecer soluciones de negocio digital 
            para una amplia gama de proyectos comerciales, industriales, de infraestructura y urbanismo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-2">25+</h4>
              <p className="text-gray-300">Años de experiencia</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">100+</h4>
              <p className="text-gray-300">Soluciones implementadas</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">1000+</h4>
              <p className="text-gray-300">Clientes satisfechos</p>
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-[#16438D] mb-4">
            ¿Listo para transformar tu negocio?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Únete a los cientos de empresas que ya confían en XSystem para su transformación digital
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="px-8 py-3 bg-[#16438D] hover:bg-[#3C85C6] text-white font-medium rounded-lg transition-colors"
            >
              Contáctanos
            </a>
            <a 
              href="/services" 
              className="px-8 py-3 border border-[#16438D] text-[#16438D] hover:bg-[#16438D] hover:text-white font-medium rounded-lg transition-colors"
            >
              Ver Servicios
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
