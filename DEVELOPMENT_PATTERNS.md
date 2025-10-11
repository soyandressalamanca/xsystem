# XSystem - Patrones de Desarrollo

## 🏗️ **Arquitectura de Componentes**

### Estructura de Archivos
```
src/
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── about-hero.tsx
│   ├── about-stats.tsx
│   ├── about-mission.tsx
│   ├── about-partners.tsx
│   ├── about-cta.tsx
│   ├── contact-info.tsx
│   └── contact-form.tsx
├── app/
│   ├── page.tsx (Home)
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── faq/page.tsx
└── lib/
    ├── auth.ts
    ├── db.ts
    └── email.ts
```

## 🎯 **Patrones de Componentes**

### 1. **Componente de Sección Estándar**
```tsx
"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function SectionComponent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-black relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-10">
        {/* Malla o partículas */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Título de Sección
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descripción de la sección
          </p>
        </motion.div>

        {/* Contenido específico */}
      </div>
    </section>
  )
}
```

### 2. **Componente de Página Completa**
```tsx
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'

export default function PageName() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Otras secciones */}
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
```

## 🎨 **Patrones de Estilo**

### 1. **Efectos de Fondo Consistentes**
```tsx
// Malla tecnológica
const techGrid = {
  backgroundImage: `
    linear-gradient(90deg, #3C85C6 1px, transparent 1px),
    linear-gradient(0deg, #3C85C6 1px, transparent 1px)
  `,
  backgroundSize: '50px 50px'
}

// Partículas flotantes
const generateParticles = (count: number) => {
  return [...Array(count)].map((_, i) => {
    const seed = i * 0.1
    const left = Math.round(((Math.sin(seed) * 50 + 50) % 100) * 100) / 100
    const top = Math.round(((Math.cos(seed) * 50 + 50) % 100) * 100) / 100
    
    return (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{ left: `${left}%`, top: `${top}%` }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
      />
    )
  })
}
```

### 2. **Sistema de Colores Centralizado**
```tsx
// Crear archivo: lib/colors.ts
export const colors = {
  primary: '#3C85C6',
  secondary: '#16438D',
  accent: '#00D4FF',
  dark: '#05171D',
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280'
  }
}

// Uso en componentes
className={`text-${colors.primary} hover:text-${colors.secondary}`}
```

## 🔧 **Patrones de Funcionalidad**

### 1. **Estado de Filtros**
```tsx
import { useState } from 'react'

export function FilterableComponent() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  
  const filteredData = selectedFilter === "All" 
    ? data 
    : data.filter(item => item.category === selectedFilter)

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => setSelectedFilter(filter.name)}
            className={`px-4 py-2 rounded-full bg-[#3C85C6] text-white text-sm font-medium transition-all duration-300 hover:opacity-80 ${
              selectedFilter === filter.name ? 'ring-2 ring-white/50' : ''
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Contenido filtrado */}
      {filteredData.map((item, index) => (
        // Renderizar item
      ))}
    </div>
  )
}
```

### 2. **Animaciones con useInView**
```tsx
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function AnimatedComponent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      {/* Contenido */}
    </motion.div>
  )
}
```

### 3. **Enlaces de Contacto**
```tsx
// Componente reutilizable
export function ContactLink({ 
  type, 
  value, 
  className = "text-white hover:text-[#3C85C6] transition-colors" 
}: {
  type: 'phone' | 'email'
  value: string
  className?: string
}) {
  if (type === 'phone') {
    return (
      <a 
        href={`tel:${value.replace(/\s+/g, '').replace(/\+/g, '')}`}
        className={className}
      >
        {value}
      </a>
    )
  }
  
  return (
    <a 
      href={`mailto:${value}`}
      className={className}
    >
      {value}
    </a>
  )
}

// Uso
<ContactLink type="phone" value="+57 317 298 7330" />
<ContactLink type="email" value="info@xsystem.com" />
```

## 📱 **Patrones Responsive**

### 1. **Grid Responsivo**
```tsx
// Patrón estándar para grids
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"

// Para estadísticas
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"

// Para partners/aliados
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
```

### 2. **Texto Responsivo**
```tsx
// Títulos principales
className="text-5xl md:text-6xl lg:text-7xl font-bold"

// Subtítulos
className="text-3xl md:text-4xl lg:text-5xl font-bold"

// Texto de cuerpo
className="text-base md:text-lg lg:text-xl"

// Texto pequeño
className="text-sm md:text-base"
```

### 3. **Espaciado Responsivo**
```tsx
// Padding vertical
className="py-16 md:py-20 lg:py-24"

// Padding horizontal
className="px-4 md:px-6 lg:px-8"

// Gaps
className="gap-4 md:gap-6 lg:gap-8"
```

## 🚀 **Optimizaciones de Performance**

### 1. **Evitar Errores de Hidratación**
```tsx
// ❌ Malo - puede causar diferencias entre servidor y cliente
const left = Math.sin(seed) * 50 + 50

// ✅ Bueno - valores determinísticos
const left = Math.round(((Math.sin(seed) * 50 + 50) % 100) * 100) / 100
```

### 2. **Lazy Loading de Componentes**
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Cargando...</div>
})
```

### 3. **Optimización de Imágenes**
```tsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Descripción"
  width={500}
  height={300}
  className="rounded-lg"
  priority={false} // Solo true para imágenes above-the-fold
/>
```

## 🧪 **Patrones de Testing**

### 1. **Componentes Testeables**
```tsx
// Hacer props opcionales para testing
interface ComponentProps {
  title?: string
  items?: Item[]
  onFilterChange?: (filter: string) => void
}

export function Component({ 
  title = "Título por defecto", 
  items = [], 
  onFilterChange 
}: ComponentProps) {
  // Implementación
}
```

### 2. **Mocks para Desarrollo**
```tsx
// Crear archivo: lib/mockData.ts
export const mockPartners = [
  { name: "Microsoft", category: "Cloud & AI" },
  { name: "Adobe", category: "Creative" },
  // ...
]

// Uso en desarrollo
const partners = process.env.NODE_ENV === 'development' ? mockPartners : realPartners
```

## 📝 **Convenciones de Código**

### 1. **Nombres de Archivos**
- Componentes: `kebab-case.tsx` (about-hero.tsx)
- Páginas: `page.tsx` dentro de carpetas
- Hooks: `use-` prefijo (use-partners.ts)
- Utilidades: `camelCase.ts` (formatPhone.ts)

### 2. **Estructura de Componentes**
```tsx
// 1. Imports
import { motion } from "framer-motion"
import { useRef } from "react"

// 2. Interfaces/Types
interface ComponentProps {
  title: string
  items: Item[]
}

// 3. Componente principal
export function Component({ title, items }: ComponentProps) {
  // 4. Hooks
  const ref = useRef(null)
  
  // 5. Estados
  const [filter, setFilter] = useState("All")
  
  // 6. Funciones
  const handleFilter = (newFilter: string) => {
    setFilter(newFilter)
  }
  
  // 7. Render
  return (
    <section ref={ref}>
      {/* JSX */}
    </section>
  )
}
```

### 3. **Comentarios**
```tsx
// ✅ Bueno - explicar el por qué, no el qué
// Evitar errores de hidratación con valores determinísticos
const left = Math.round(((Math.sin(seed) * 50 + 50) % 100) * 100) / 100

// ❌ Malo - obvio
// Calcular posición izquierda
const left = Math.sin(seed) * 50
```

---

## 🎯 **Checklist de Desarrollo**

### Antes de Crear un Componente:
- [ ] ¿Ya existe algo similar?
- [ ] ¿Sigue los patrones de color establecidos?
- [ ] ¿Es responsive?
- [ ] ¿Tiene animaciones consistentes?
- [ ] ¿Usa useInView para optimización?

### Antes de Hacer Commit:
- [ ] ¿No hay errores de linting?
- [ ] ¿Funciona en móvil y desktop?
- [ ] ¿Las animaciones son suaves?
- [ ] ¿Los colores siguen la guía?
- [ ] ¿El código es reutilizable?

### Para Nuevas Páginas:
- [ ] ¿Tiene Header y Footer?
- [ ] ¿Sigue la estructura de secciones?
- [ ] ¿Usa los efectos de fondo apropiados?
- [ ] ¿Es consistente con el diseño existente?


