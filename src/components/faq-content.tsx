"use client"

import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Monitor, Palette, Shield, Cloud, Building, Cpu } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    id: 1,
    category: "Microsoft",
    icon: Cloud,
    question: "¿Qué versiones de Microsoft Office soportan?",
    answer: "Soportamos todas las versiones de Microsoft Office desde Office 2016 hasta Microsoft 365. Incluimos Office 365, Office 2019, Office 2021 y las últimas actualizaciones de Microsoft 365 con todas las aplicaciones: Word, Excel, PowerPoint, Outlook, Teams, OneDrive y SharePoint."
  },
  {
    id: 2,
    category: "Adobe",
    icon: Palette,
    question: "¿Qué incluye Adobe Creative Cloud?",
    answer: "Adobe Creative Cloud incluye más de 20 aplicaciones profesionales: Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Acrobat Pro, Lightroom, XD, Dimension, Substance 3D, y muchas más. También incluye Adobe Fonts, Adobe Stock, y almacenamiento en la nube."
  },
  {
    id: 3,
    category: "Autodesk",
    icon: Building,
    question: "¿Qué software de Autodesk manejan?",
    answer: "Manejamos toda la suite de Autodesk: AutoCAD, Revit, 3ds Max, Maya, Inventor, Civil 3D, Navisworks, Fusion 360, y más. Ofrecemos licencias individuales y colecciones completas para arquitectura, ingeniería, construcción y manufactura."
  },
  {
    id: 4,
    category: "Microsoft",
    icon: Cloud,
    question: "¿Cómo funciona Microsoft Azure?",
    answer: "Microsoft Azure es nuestra plataforma de nube principal. Ofrecemos servicios de infraestructura como máquinas virtuales, bases de datos, almacenamiento, redes, y servicios de IA. Incluye Azure Active Directory, Azure DevOps, y herramientas de análisis de datos con Power BI."
  },
  {
    id: 5,
    category: "Adobe",
    icon: Palette,
    question: "¿Qué es Adobe Document Cloud?",
    answer: "Adobe Document Cloud incluye Acrobat DC, Acrobat Sign, y servicios de PDF en la nube. Permite crear, editar, firmar y compartir documentos PDF de forma segura. Incluye integración con Microsoft Office y herramientas de colaboración en tiempo real."
  },
  {
    id: 6,
    category: "Hexagon",
    icon: Building,
    question: "¿Qué soluciones de Hexagon ofrecen?",
    answer: "Ofrecemos Hexagon PPM (Project Portfolio Management), SmartPlant, Intergraph, y herramientas de ingeniería de procesos. Estas soluciones son ideales para industrias de petróleo y gas, manufactura, y proyectos de infraestructura complejos."
  },
  {
    id: 7,
    category: "Bricsys",
    icon: Building,
    question: "¿Qué es BricsCAD y para qué sirve?",
    answer: "BricsCAD es una alternativa profesional a AutoCAD con compatibilidad DWG nativa. Incluye BricsCAD BIM para modelado de información de construcción, BricsCAD Mechanical para diseño mecánico, y BricsCAD Shape para modelado conceptual 3D."
  },
  {
    id: 8,
    category: "Siemens",
    icon: Cpu,
    question: "¿Qué software de Siemens manejan?",
    answer: "Manejamos Siemens NX para CAD/CAM/CAE, Solid Edge para diseño mecánico, Teamcenter para gestión de datos de productos, y Simcenter para simulación. También ofrecemos soluciones de Siemens Digital Industries para manufactura inteligente."
  },
  {
    id: 9,
    category: "Microsoft",
    icon: Cloud,
    question: "¿Qué incluye Microsoft 365 Business?",
    answer: "Microsoft 365 Business incluye Office 365, Windows 10/11, Enterprise Mobility + Security, Teams, SharePoint, OneDrive, Exchange, y herramientas de administración. También incluye Microsoft Intune, Azure AD Premium, y Microsoft Defender para empresas."
  },
  {
    id: 10,
    category: "Adobe",
    icon: Palette,
    question: "¿Qué es Adobe Substance 3D?",
    answer: "Adobe Substance 3D es una suite completa para creación de materiales y texturas 3D. Incluye Substance 3D Designer, Painter, Sampler, y Stager. Es ideal para arquitectos, diseñadores de productos, y creadores de contenido 3D que necesitan materiales realistas."
  },
  {
    id: 11,
    category: "Graphisoft",
    icon: Building,
    question: "¿Qué es Archicad y para quién es?",
    answer: "Archicad es un software BIM (Building Information Modeling) para arquitectos. Permite crear modelos 3D inteligentes, generar planos automáticamente, y colaborar en tiempo real. Incluye herramientas de visualización, análisis energético, y documentación técnica completa."
  },
  {
    id: 12,
    category: "Ciberseguridad",
    icon: Shield,
    question: "¿Qué soluciones de ciberseguridad ofrecen?",
    answer: "Ofrecemos Kaspersky Endpoint Security, Sophos Intercept X, Acronis Cyber Backup, y Microsoft Defender. Incluyen protección contra malware, ransomware, phishing, y amenazas avanzadas. También ofrecemos servicios de consultoría en seguridad y cumplimiento normativo."
  }
]

export function FAQContent() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const categories = [...new Set(faqs.map(faq => faq.category))]
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas")

  const filteredFAQs = selectedCategory === "Todas" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Efecto de fondo sutil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #3C85C6 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #16438D 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 80px 80px'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Filtros por categoría */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Primera fila - 5 botones */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSelectedCategory("Todas")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === "Todas"
                    ? "bg-[#3C85C6] text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                Todas las Categorías
              </button>
              {categories.slice(0, 4).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[#3C85C6] text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Segunda fila - 4 botones */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.slice(4).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[#3C85C6] text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-r from-[#16438D] to-[#05171D] rounded-2xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-[#3C85C6]/20">
                    <faq.icon className="h-6 w-6 text-[#3C85C6]" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-[#3C85C6] text-sm font-medium">{faq.category}</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <motion.div 
                  className="flex-shrink-0"
                  animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-5 w-5 text-[#3C85C6]" />
                </motion.div>
              </button>
              
              {openItems.includes(faq.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  className="px-8 pb-6"
                >
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="text-gray-300 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 text-lg mb-6">
            ¿No encuentras la respuesta que buscas? Contáctanos directamente.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(60, 133, 198, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-[#16438D] hover:bg-[#3C85C6] text-white font-semibold rounded-full transition-colors shadow-lg hover:shadow-xl"
          >
            Contactar a XSystem
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
