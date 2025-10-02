"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Footer() {
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    // Verificar si es la primera visita a la página principal en esta sesión
    const hasVisitedHome = sessionStorage.getItem('hasVisitedHome')
    if (!hasVisitedHome) {
      setShouldAnimate(true)
      sessionStorage.setItem('hasVisitedHome', 'true')
    }
  }, [])

  return (
    <footer className="bg-gradient-to-b from-black to-[#05171D] text-white relative overflow-hidden">
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Logo y Descripción */}
            <motion.div 
              initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 20 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 text-center md:text-left"
            >
              <div className="mb-6">
                <div className="mb-4 flex justify-center md:justify-start">
                  <Image 
                    src="/Logo Xsystem Blanco 2.png" 
                    alt="XSystem Logo" 
                    width={180} 
                    height={90}
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-300 text-base leading-relaxed">
                  Transformamos tu negocio con soluciones CRM inteligentes. 
                  Más de 25 años innovando en tecnología empresarial.
                </p>
              </div>
            </motion.div>

            {/* Enlaces Rápidos */}
            <motion.div 
              initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 20 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: shouldAnimate ? 0.1 : 0 }}
              className="lg:col-span-1 text-center md:text-left"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-[#3C85C6] transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-[#3C85C6] transition-colors">
                    Nuestros Servicios
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-[#3C85C6] transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-[#3C85C6] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-300 hover:text-[#3C85C6] transition-colors">
                    Acceder a XSystem
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Servicios */}
            <motion.div 
              initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 20 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: shouldAnimate ? 0.2 : 0 }}
              className="lg:col-span-1 text-center md:text-left"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Servicios</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/services/cloud-ai-bi" className="text-gray-300 hover:text-[#3C85C6] transition-colors">
                    Infraestructura Cloud + IA + BI
                  </Link>
                </li>
                <li>
                  <Link href="/services/creative-document" className="text-gray-300 hover:text-[#3C85C6] transition-colors">
                    Industrias Creativas y Flujo Documental
                  </Link>
                </li>
                <li>
                  <Link href="/services/aeco-process" className="text-gray-300 hover:text-[#3C85C6] transition-colors">
                    Industrias AECO y Plantas de Procesos
                  </Link>
                </li>
                <li>
                  <Link href="/services/other-solutions" className="text-gray-300 hover:text-[#3C85C6] transition-colors">
                    Otras Soluciones
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Contacto */}
            <motion.div 
              initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 20 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: shouldAnimate ? 0.3 : 0 }}
              className="lg:col-span-1 text-center md:text-left"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#3C85C6]" />
                  <div>
                    <p className="text-gray-300 text-sm">Bogotá, Colombia</p>
                    <p className="text-gray-400 text-xs">Av. Calle 26 #69D - 91</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <Phone className="h-5 w-5 text-[#3C85C6]" />
                  <div>
                    <p className="text-gray-300 text-sm">+57 317 298 7330</p>
                    <p className="text-gray-400 text-xs">Servicio al Cliente</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <Mail className="h-5 w-5 text-[#3C85C6]" />
                  <div>
                    <p className="text-gray-300 text-sm">marketing@xsystemla.com</p>
                    <p className="text-gray-400 text-xs">Consultas Comerciales</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 20 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: shouldAnimate ? 0.4 : 0 }}
            className="mt-12 pt-8 border-t border-gray-800"
          >
            <div className="max-w-md mx-auto text-center">
              <h4 className="text-lg font-semibold text-white mb-4">
                Únete a la Comunidad XSystem
              </h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Ingresa tu email"
                  className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                <button className="px-6 py-3 bg-[#16438D] hover:bg-[#3C85C6] text-white font-medium rounded-lg transition-colors">
                  Suscribirse
                </button>
              </div>
            </div>
          </motion.div>

          {/* Redes Sociales */}
          <motion.div 
            initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 20 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: shouldAnimate ? 0.5 : 0 }}
            className="mt-8 pt-8 border-t border-gray-800"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <a 
                  href="https://www.linkedin.com/company/3092439/admin/feed/posts/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#3C85C6] transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.instagram.com/xsystem_ltda/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#3C85C6] transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#3C85C6] transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.youtube.com/@Xsystemla" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#3C85C6] transition-colors"
                >
                  <Youtube className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.tiktok.com/@xsystemla" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#3C85C6] transition-colors"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.26-4.63 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-gray-400 text-sm">
                  © 2025 XSystem Transformación Digital. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

