"use client"

import { motion } from "framer-motion"
import { Send, User, Mail, Phone, MessageSquare, Building } from "lucide-react"
import { useState } from "react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  const subjects = [
    "Consulta General",
    "Infraestructura Cloud",
    "Industrias Creativas", 
    "Flujo Documental",
    "CRM",
    "Ciberseguridad",
    "Infraestructura TI",
    "Plantas de Procesos",
    "Industrias AEC",
    "Visualización 3D",
    "Diseño y Manufactura",
    "Soporte Técnico"
  ]

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-[#16438D] to-[#05171D] rounded-2xl p-8 border border-white/10"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-[#3C85C6] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Send className="h-8 w-8 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">¡Mensaje Enviado!</h3>
          <p className="text-gray-300">
            Gracias por contactarnos. Nuestro equipo se pondrá en contacto contigo pronto.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-[#16438D] to-[#05171D] rounded-2xl p-8 border border-white/10 h-full flex flex-col"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Envíanos un Mensaje</h2>
        <p className="text-gray-300">
          Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
        {/* Nombre y Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#3C85C6]" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3C85C6] focus:bg-white/20 transition-all duration-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#3C85C6]" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@empresa.com"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3C85C6] focus:bg-white/20 transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Teléfono y Empresa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#3C85C6]" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+57 300 123 4567"
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3C85C6] focus:bg-white/20 transition-all duration-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#3C85C6]" />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nombre de tu empresa"
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3C85C6] focus:bg-white/20 transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Asunto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#3C85C6] focus:bg-white/20 transition-all duration-300"
          >
            <option value="" className="bg-black">Selecciona un tema</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject} className="bg-black">
                {subject}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Mensaje */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative flex-1"
        >
          <MessageSquare className="absolute left-4 top-6 h-5 w-5 text-[#3C85C6]" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Cuéntanos sobre tu proyecto o consulta..."
            rows={8}
            required
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3C85C6] focus:bg-white/20 transition-all duration-300 resize-none h-full"
          />
        </motion.div>

        {/* Botón de Envío */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(60, 133, 198, 0.4)"
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-4 bg-gradient-to-r from-[#3C85C6] to-[#16438D] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Enviar Mensaje</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}
