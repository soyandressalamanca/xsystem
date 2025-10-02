"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation, Phone } from "lucide-react"

export function ContactMap() {
  const locations = [
    {
      id: 1,
      city: "Bogotá",
      country: "Colombia",
      coordinates: { lat: 4.6097, lng: -74.0817 },
      address: "Av. Calle 26 #69D - 91 | Torre 2 | Of.705",
      phone: "(601) 416 0177 | +57 317 298 7330",
      isMain: true
    },
    {
      id: 2,
      city: "Barranquilla",
      country: "Colombia", 
      coordinates: { lat: 10.9685, lng: -74.7813 },
      address: "Cra 50 #84 - 110 Of 904",
      phone: "+57 318 582 1876",
      isMain: false
    },
    {
      id: 3,
      city: "Miami",
      country: "Estados Unidos",
      coordinates: { lat: 25.7617, lng: -80.1918 },
      address: "2150 N bayshore Dr Suite 410, Miami FL 33137",
      phone: "+1(786) 566-3280",
      isMain: false
    }
  ]

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Efecto de fondo sutil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, #3C85C6 1px, transparent 1px),
            linear-gradient(0deg, #3C85C6 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestras Oficinas
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Con presencia en Colombia y Estados Unidos, estamos cerca de ti para brindarte el mejor servicio.
          </p>
        </motion.div>

        {/* Detalles de Oficinas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {locations.map((office, index) => (
              <motion.div
                key={office.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="bg-gradient-to-br from-[#16438D] to-[#05171D] rounded-2xl p-6 border border-white/10 hover:border-[#3C85C6]/50 transition-all duration-300 text-center md:text-left"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 mb-4">
                  <div className="p-3 rounded-xl bg-[#3C85C6]/20">
                    <MapPin className="h-6 w-6 text-[#3C85C6]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {office.city}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {office.country}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
                    <MapPin className="h-4 w-4 text-[#3C85C6] flex-shrink-0" />
                    <p className="text-gray-300 text-sm text-center md:text-left">{office.address}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center md:items-center space-y-2 md:space-y-0 md:space-x-3">
                    <Phone className="h-4 w-4 text-[#3C85C6] flex-shrink-0" />
                    <a 
                      href={`tel:${office.phone.replace(/\s+/g, '').replace(/\+/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\|/g, '').replace(/\s/g, '')}`}
                      className="text-gray-300 text-sm hover:text-[#3C85C6] transition-colors cursor-pointer text-center md:text-left"
                    >
                      {office.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mapa Interactivo */}
        <div className="relative">
          {/* Mapa de fondo (simulado) */}
          <div className="relative h-96 bg-gradient-to-br from-[#05171D] to-[#16438D] rounded-2xl overflow-hidden border border-white/10">
            {/* Grid de fondo */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(90deg, #3C85C6 1px, transparent 1px),
                  linear-gradient(0deg, #3C85C6 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            {/* Marcadores de ubicación */}
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  location.isMain 
                    ? 'top-1/3 left-1/3' 
                    : index === 1 
                      ? 'top-2/3 left-1/4' 
                      : 'top-1/2 left-2/3'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`relative ${
                    location.isMain 
                      ? 'w-8 h-8' 
                      : 'w-6 h-6'
                  }`}
                >
                  {/* Pulsos de ubicación */}
                  <motion.div
                    className={`absolute inset-0 rounded-full border-2 ${
                      location.isMain 
                        ? 'border-[#3C85C6]' 
                        : 'border-[#16438D]'
                    }`}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                  
                  {/* Marcador principal */}
                  <div className={`relative w-full h-full rounded-full flex items-center justify-center ${
                    location.isMain 
                      ? 'bg-[#3C85C6]' 
                      : 'bg-[#16438D]'
                  }`}>
                    <MapPin className="h-4 w-4 text-white" />
                  </div>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-3 border border-white/20 min-w-48"
                  >
                    <h4 className="text-white font-bold text-sm mb-1">
                      {location.city}, {location.country}
                    </h4>
                    <p className="text-gray-300 text-xs mb-2">{location.address}</p>
                    <p className="text-[#3C85C6] text-xs">{location.phone}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}

            {/* Líneas de conexión */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.line
                x1="33%"
                y1="33%"
                x2="25%"
                y2="66%"
                stroke="#3C85C6"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 1 }}
              />
              <motion.line
                x1="33%"
                y1="33%"
                x2="66%"
                y2="50%"
                stroke="#16438D"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              />
            </svg>

            {/* Efecto de ondas */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-32 h-32 border border-[#3C85C6]/30 rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                transform: "translate(-50%, -50%)"
              }}
            />
          </div>

          {/* Leyenda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#3C85C6] rounded-full"></div>
                <span className="text-white">Oficina Principal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#16438D] rounded-full"></div>
                <span className="text-white">Oficinas Regionales</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300 mb-6">
            ¿Necesitas una consulta personalizada? Agenda una reunión con nuestro equipo.
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(60, 133, 198, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#3C85C6] to-[#16438D] text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300"
          >
            <Navigation className="h-5 w-5 mr-2" />
            Agendar Reunión
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}
