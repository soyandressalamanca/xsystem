"use client"

import { motion } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const menuItems = [
  { name: "Inicio", href: "/" },
  { name: "Acerca", href: "/about" },
  { name: "Productos", href: "/products" },
  { name: "Servicios", href: "/services" },
  { name: "FAQ", href: "/faq" },
  { name: "Contacto", href: "/contact" }
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center h-20 relative">
          {/* Logo - Izquierda */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute left-0 flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Image 
                  src="/Logo Xsystem Blanco 2.png" 
                  alt="XSystem Logo" 
                  width={150} 
                  height={75} 
                  className="object-contain"
                />
                {/* Efecto de brillo sutil */}
                <motion.div
                  className="absolute inset-0 bg-[#3C85C6]/20 rounded-lg blur-sm"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </Link>
          </motion.div>

          {/* Menú Desktop - Centrado */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -2,
                  color: "#3C85C6"
                }}
                className="text-white hover:text-[#3C85C6] font-medium transition-all duration-300 relative group"
              >
                {item.name}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3C85C6] group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Botones de acción - Derecha */}
          <div className="absolute right-0 hidden md:flex items-center space-x-4">
            {/* Botón CTA Principal */}
            <Link href="/contact">
              <motion.button
                whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(60, 133, 198, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[#16438D] to-[#3C85C6] text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300"
            >
              Asesoría
            </motion.button>
            </Link>

            {/* Botón Login */}
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#3C85C6",
                color: "white"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-[#3C85C6] text-[#3C85C6] font-semibold rounded-full hover:bg-[#3C85C6] hover:text-white transition-all duration-300"
            >
              <Link href="/login">
                Acceder
              </Link>
            </motion.button>
          </div>

          {/* Botón Menú Móvil */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="md:hidden absolute right-0 p-3 text-white hover:text-[#3C85C6] transition-colors"
          >
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </motion.button>
        </div>

        {/* Menú Móvil */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-6 space-y-4 border-t border-white/10">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:text-[#3C85C6] font-medium transition-colors py-2"
              >
                {item.name}
              </motion.a>
            ))}
            
            {/* Botones móviles */}
            <div className="flex flex-col space-y-3 pt-4">
              <Link href="/contact">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0,
                    y: isMenuOpen ? 0 : 20
                  }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#16438D] to-[#3C85C6] text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300"
                >
                  Asesoría
                </motion.button>
              </Link>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0,
                  y: isMenuOpen ? 0 : 20
                }}
                transition={{ duration: 0.3, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 border-2 border-[#3C85C6] text-[#3C85C6] font-semibold rounded-full hover:bg-[#3C85C6] hover:text-white transition-all duration-300"
              >
                <Link href="/login">
                  Acceder
                </Link>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
