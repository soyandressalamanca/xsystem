"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Globe, Users, Headphones, Wrench } from "lucide-react"

export function ContactInfo() {
  const offices = [
    {
      city: "Bogotá",
      country: "Colombia",
      address: "Av. Calle 26 #69D - 91 | Torre 2 | Of.705",
      phone: "(601) 416 0177 | +57 317 298 7330",
      email: "bogota@xsystem.com",
      hours: "Lun - Vie: 8:00 AM - 6:00 PM"
    },
    {
      city: "Barranquilla", 
      country: "Colombia",
      address: "Cra 50 #84 - 110 Of 904",
      phone: "+57 318 582 1876",
      email: "barranquilla@xsystem.com",
      hours: "Lun - Vie: 8:00 AM - 6:00 PM"
    },
    {
      city: "Miami",
      country: "Estados Unidos",
      address: "2150 N bayshore Dr Suite 410, Miami FL 33137",
      phone: "+1(786) 566-3280",
      email: "miami@xsystem.com",
      hours: "Lun - Vie: 9:00 AM - 5:00 PM EST"
    }
  ]

  const contactMethods = [
    {
      icon: Headphones,
      title: "Servicio al Cliente",
      description: "Atención comercial y ventas",
      value: "+57 317 298 7330",
      color: "text-[#3C85C6]"
    },
    {
      icon: Mail,
      title: "Marketing",
      description: "Consultas comerciales",
      value: "marketing@xsystemla.com",
      color: "text-[#3C85C6]"
    },
    {
      icon: Phone,
      title: "Asistencia Técnica",
      description: "Soporte técnico especializado",
      value: "+57 315 401 3694",
      color: "text-[#3C85C6]"
    },
    {
      icon: Wrench,
      title: "Soporte Técnico",
      description: "Ayuda técnica especializada",
      value: "tecnico.soporte@xsystemla.com",
      color: "text-[#3C85C6]"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="h-full flex flex-col"
    >
      {/* Información de Contacto */}
      <div className="bg-gradient-to-br from-[#05171D] to-[#16438D] rounded-2xl p-8 border border-white/10 h-full flex flex-col">
        <h3 className="text-2xl font-bold text-white mb-6 text-center md:text-left">Información de Contacto</h3>
        
        <div className="space-y-6 flex-1">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 text-center md:text-left"
            >
              <div className={`p-3 rounded-xl bg-white/10 ${method.color} flex-shrink-0`}>
                <method.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold text-lg mb-2">{method.title}</h4>
                <p className="text-gray-300 text-base mb-3">{method.description}</p>
                {method.title.includes("Servicio al Cliente") || method.title.includes("Asistencia Técnica") ? (
                  <a 
                    href={`tel:${method.value.replace(/\s+/g, '').replace(/\+/g, '')}`}
                    className="text-white font-semibold text-base hover:text-[#3C85C6] transition-colors cursor-pointer"
                  >
                    {method.value}
                  </a>
                ) : (
                  <a 
                    href={`mailto:${method.value}`}
                    className="text-white font-semibold text-base hover:text-[#3C85C6] transition-colors cursor-pointer"
                  >
                    {method.value}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>


    </motion.div>
  )
}
