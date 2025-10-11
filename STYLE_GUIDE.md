# XSystem - Guía de Estilos y Patrones de Desarrollo

## 🎨 **Paleta de Colores**

### Colores Principales
- **Azul Principal:** `#3C85C6`
- **Azul Oscuro:** `#16438D` 
- **Cyan:** `#00D4FF`
- **Fondo Negro:** `#000000` o `bg-black`
- **Fondo Oscuro:** `#05171D`

### Uso de Colores
```css
/* Gradientes comunes */
bg-gradient-to-br from-[#16438D] to-[#05171D]
bg-gradient-to-r from-[#3C85C6] to-[#00D4FF]
bg-gradient-to-br from-[#3C85C6] to-[#16438D]

/* Texto */
text-[#3C85C6]  /* Azul principal para enlaces */
text-white       /* Texto principal */
text-gray-300    /* Texto secundario */
```

## 🎯 **Patrones de Componentes**

### 1. **Hero Sections**
```tsx
// Estructura estándar
<section className="relative min-h-screen bg-black overflow-hidden">
  {/* Efectos de fondo */}
  <div className="absolute inset-0 opacity-10">
    {/* Malla tecnológica o partículas */}
  </div>
  
  {/* Contenido */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-32 pb-16">
    {/* Títulos y contenido */}
  </div>
</section>
```

### 2. **Efectos de Fondo**
```tsx
// Malla tecnológica
<div className="absolute inset-0 opacity-10">
  <div className="absolute inset-0" style={{
    backgroundImage: `
      linear-gradient(90deg, #3C85C6 1px, transparent 1px),
      linear-gradient(0deg, #3C85C6 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px'
  }}></div>
</div>

// Partículas flotantes
{[...Array(50)].map((_, i) => (
  <motion.div
    key={i}
    className="absolute w-1 h-1 bg-white rounded-full"
    style={{ left: `${left}%`, top: `${top}%` }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
    transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
  />
))}
```

### 3. **Tarjetas con Glassmorphism**
```tsx
<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
  {/* Contenido */}
</div>
```

### 4. **Botones con Efectos Hover**
```tsx
// Botón principal
<button className="px-8 py-4 bg-[#3C85C6] hover:bg-[#16438D] text-white font-medium rounded-lg transition-colors">
  Texto
</button>

// Botón secundario
<button className="px-8 py-4 border border-[#3C85C6] text-[#3C85C6] hover:bg-[#3C85C6] hover:text-white font-medium rounded-lg transition-colors">
  Texto
</button>

// Con animaciones Framer Motion
<motion.button
  className="px-8 py-4 bg-[#3C85C6] text-white font-semibold rounded-full"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Texto
</motion.button>
```

## 🎭 **Animaciones y Transiciones**

### Patrones de Animación
```tsx
// Entrada desde abajo
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// Entrada desde los lados
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8, delay: 0.2 }}

// Escalonado
transition={{ duration: 0.5, delay: index * 0.1 }}

// Hover con Framer Motion
whileHover={{ scale: 1.05, y: -5 }}
transition={{ duration: 0.3 }}
```

### Efectos de Hover
```tsx
// Con anillo de luz
className={`transition-all duration-300 hover:opacity-80 ${
  selected ? 'ring-2 ring-white/50' : ''
}`}

// Con elevación
whileHover={{ scale: 1.05, y: -5 }}

// Con cambio de color
className="text-white hover:text-[#3C85C6] transition-colors"
```

## 📱 **Responsive Design**

### Breakpoints Estándar
```tsx
// Grid responsivo
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"

// Texto responsivo
className="text-4xl md:text-5xl lg:text-6xl font-bold"

// Padding responsivo
className="px-6 md:px-8 lg:px-12"

// Flex responsivo
className="flex flex-col md:flex-row gap-4"
```

## 🎪 **Efectos Especiales**

### 1. **Etiquetas con Efectos**
```tsx
<div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#3C85C6]/20 to-[#00D4FF]/20 backdrop-blur-sm border border-[#3C85C6]/30 rounded-2xl px-8 py-6">
  <div className="w-12 h-12 bg-gradient-to-br from-[#3C85C6] to-[#00D4FF] rounded-full flex items-center justify-center">
    <Icon className="h-6 w-6 text-white" />
  </div>
  <div>
    <h3 className="text-xl font-bold text-white">Título</h3>
    <p className="text-gray-300">Descripción</p>
  </div>
</div>
```

### 2. **Filtros Interactivos**
```tsx
// Estado de filtro
const [selectedCategory, setSelectedCategory] = useState("Todos")

// Botón de filtro
<button
  onClick={() => setSelectedCategory(category.name)}
  className={`px-4 py-2 rounded-full bg-[#3C85C6] text-white text-sm font-medium transition-all duration-300 hover:opacity-80 ${
    selectedCategory === category.name ? 'ring-2 ring-white/50' : ''
  }`}
>
  {category.name}
</button>
```

### 3. **Efectos de Resplandor**
```tsx
// Con animación de resplandor
animate={{
  textShadow: [
    "0 0 20px rgba(60, 133, 198, 0.5)",
    "0 0 40px rgba(60, 133, 198, 0.8)",
    "0 0 20px rgba(60, 133, 198, 0.5)"
  ]
}}
transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
```

## 🔧 **Patrones de Funcionalidad**

### 1. **Navegación**
```tsx
import Link from "next/link"

<Link href="/contact">
  <motion.button>
    Contactar Ahora
  </motion.button>
</Link>
```

### 2. **Enlaces de Contacto**
```tsx
// Teléfonos
<a 
  href={`tel:${phone.replace(/\s+/g, '').replace(/\+/g, '')}`}
  className="text-white hover:text-[#3C85C6] transition-colors"
>
  {phone}
</a>

// Emails
<a 
  href={`mailto:${email}`}
  className="text-white hover:text-[#3C85C6] transition-colors"
>
  {email}
</a>
```

### 3. **Estados de Carga**
```tsx
// Con useInView para animaciones
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: "-100px" })

// Animación condicional
animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
```

## 📐 **Espaciado y Layout**

### Padding/Margin Estándar
```tsx
// Secciones principales
className="py-20"           // Espaciado vertical
className="px-6"            // Espaciado horizontal
className="max-w-7xl mx-auto" // Contenedor centrado

// Hero sections
className="pt-32 pb-16"     // Hero estándar
className="pt-32 pb-8"      // Hero compacto

// Grids
className="gap-8"           // Espaciado entre elementos
className="gap-12"          // Espaciado mayor
```

## 🎨 **Tipografía**

### Jerarquía de Texto
```tsx
// Títulos principales
className="text-5xl md:text-7xl font-bold text-white"

// Subtítulos
className="text-3xl md:text-4xl font-bold text-white"

// Texto de sección
className="text-4xl md:text-5xl font-bold text-white"

// Texto de cuerpo
className="text-lg text-gray-300"

// Texto pequeño
className="text-sm text-gray-400"
```

## 🚀 **Mejores Prácticas**

### 1. **Consistencia**
- Usar siempre los colores de la marca
- Mantener el mismo patrón de espaciado
- Aplicar animaciones consistentes

### 2. **Performance**
- Usar `Math.round()` para evitar errores de hidratación
- Implementar `useInView` para animaciones
- Optimizar imágenes con Next.js Image

### 3. **Accesibilidad**
- Contraste adecuado entre texto y fondo
- Enlaces claramente identificables
- Animaciones no excesivas

### 4. **Código Limpio**
- Componentes reutilizables
- Props tipadas con TypeScript
- Nombres descriptivos para clases CSS

---

## 📝 **Notas de Desarrollo**

### Cambios Importantes Realizados:
1. **Página About:** Eliminado contenido duplicado, agregados filtros funcionales
2. **Contacto:** Colores de enlaces actualizados (blanco → azul al hover)
3. **Hero:** Botón "Contactar Ahora" ahora navega a `/contact`
4. **Efectos:** Implementados efectos de malla y partículas consistentes
5. **Responsive:** Diseño optimizado para todos los dispositivos

### Próximos Pasos Sugeridos:
- Implementar página Services
- Crear página Contact funcional
- Agregar sección Blog
- Optimizar SEO y meta tags


