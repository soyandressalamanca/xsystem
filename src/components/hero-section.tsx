"use client"

import { motion } from "framer-motion"
import { ChevronDown, Sparkles, Zap, Globe, Shield, Cpu } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Fondo de estrellas animadas */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => {
          // Usar un seed fijo y redondear para evitar diferencias de precisión
          const seed = i * 0.1
          const left = Math.round(((Math.sin(seed) * 50 + 50) % 100) * 100) / 100
          const top = Math.round(((Math.cos(seed) * 50 + 50) % 100) * 100) / 100
          const duration = 2 + (i % 3)
          const delay = (i % 10) * 0.2
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
              }}
            />
          )
        })}
      </div>

      {/* Ondas de energía */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3C85C6]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#16438D]/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Grid tecnológico de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, #3C85C6 1px, transparent 1px),
            linear-gradient(0deg, #3C85C6 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          // Usar un seed fijo y redondear para evitar diferencias de precisión
          const seed = i * 0.2
          const left = Math.round(((Math.sin(seed * 1.5) * 40 + 50) % 100) * 100) / 100
          const top = Math.round(((Math.cos(seed * 1.3) * 40 + 50) % 100) * 100) / 100
          const xOffset = Math.round((Math.sin(seed * 2) * 10) * 100) / 100
          const duration = 3 + (i % 4)
          const delay = (i % 5) * 0.4
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#3C85C6]/40 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, xOffset, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
              }}
            />
          )
        })}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 pt-20">
        {/* Logo XSystem */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <Image 
              src="/Logo Xsystem Blanco 2.png" 
              alt="XSystem Logo" 
              width={200} 
              height={100} 
              className="object-contain"
            />
            {/* Efecto de brillo alrededor del logo */}
            <motion.div
              className="absolute inset-0 bg-[#3C85C6]/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mb-8"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(60, 133, 198, 0.5)",
                "0 0 40px rgba(60, 133, 198, 0.8)",
                "0 0 20px rgba(60, 133, 198, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Transformamos
          </motion.h1>
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-[#3C85C6] mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Tu Negocio Digital
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Más de 25 años innovando en tecnología empresarial. 
            Soluciones CRM, infraestructura cloud, IA y business intelligence 
            para impulsar tu transformación digital.
          </motion.p>
        </motion.div>

        {/* Iconos flotantes de tecnología */}
        <motion.div
          className="flex justify-center space-x-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {[
            { icon: Cpu, label: "Infraestructura" },
            { icon: Globe, label: "Cloud" },
            { icon: Shield, label: "Seguridad" },
            { icon: Zap, label: "IA & BI" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.1, y: -5 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-[#16438D] to-[#3C85C6] rounded-2xl flex items-center justify-center mb-2 group-hover:shadow-lg group-hover:shadow-[#3C85C6]/50 transition-all duration-300"
                whileHover={{
                  boxShadow: "0 0 30px rgba(60, 133, 198, 0.6)"
                }}
              >
                <item.icon className="h-8 w-8 text-white" />
              </motion.div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Botones CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-[#16438D] to-[#3C85C6] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(60, 133, 198, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="h-5 w-5" />
            <span>Descubre Nuestros Servicios</span>
          </motion.button>
          
          <motion.button
            className="px-8 py-4 border-2 border-[#3C85C6] text-[#3C85C6] font-semibold rounded-full hover:bg-[#3C85C6] hover:text-white transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#3C85C6",
              color: "white"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Contactar Ahora
          </motion.button>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-[#16438D] to-[#3C85C6] rounded-full flex items-center justify-center mb-2"
            animate={{
              y: [0, 10, 0],
              boxShadow: [
                "0 0 20px rgba(60, 133, 198, 0.3)",
                "0 0 40px rgba(60, 133, 198, 0.6)",
                "0 0 20px rgba(60, 133, 198, 0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="h-6 w-6 text-white" />
          </motion.div>
          <span className="text-sm text-gray-400">Explora más</span>
        </motion.div>
      </div>

    </section>
  )
}
