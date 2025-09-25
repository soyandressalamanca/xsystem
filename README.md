# XSystem - CRM Completo

Sistema de gestión de relaciones con clientes (CRM) con funcionalidades avanzadas de cotizaciones, renovaciones automáticas, mensajería WhatsApp/Email y pagos.

## 🚀 Características Principales

- **CRM Completo**: Gestión de empresas, contactos y relaciones
- **Pricebook**: Catálogo de productos con precios dinámicos
- **Cotizaciones**: Generación y envío de cotizaciones por email/WhatsApp
- **Renovaciones Automáticas**: Sistema T-60/T-30/T-7 para recordatorios
- **Mensajería**: Integración WhatsApp Cloud API y Email (Resend)
- **Pagos**: Integración Wompi para procesamiento de pagos
- **RBAC**: Control de acceso basado en roles (OWNER, ADMIN, SALES, SUPPORT, FINANCE)

## 🛠️ Tecnologías

- **Next.js 14+** con App Router
- **TypeScript** para tipado estático
- **Prisma** como ORM con PostgreSQL
- **NextAuth.js** para autenticación
- **Tailwind CSS** + **shadcn/ui** para UI
- **Zod** para validación de datos
- **React Query** para gestión de estado
- **Resend** para envío de emails
- **WhatsApp Cloud API** para mensajería
- **Wompi** para pagos

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd xsystem
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` con tus credenciales:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/xsystem"
   NEXTAUTH_SECRET="your-secret-key"
   RESEND_API_KEY="your-resend-key"
   WHATSAPP_TOKEN="your-whatsapp-token"
   WOMPI_PRIVATE_KEY="your-wompi-key"
   ```

4. **Configurar base de datos**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

## 🗄️ Base de Datos

El sistema utiliza PostgreSQL con el siguiente esquema principal:

- **Users**: Usuarios del sistema con roles
- **Companies**: Empresas clientes
- **Contacts**: Contactos de las empresas
- **Products**: Catálogo de productos
- **Pricebook**: Precios por producto y período
- **Quotes**: Cotizaciones con items
- **Subscriptions**: Suscripciones activas
- **RenewalTasks**: Tareas de renovación automática
- **Messages**: Historial de mensajes WhatsApp/Email
- **Payments**: Registro de pagos
- **AuditLog**: Log de auditoría

## 🔄 Sistema de Renovaciones

El sistema maneja renovaciones automáticas en tres etapas:

- **T-60**: 60 días antes del vencimiento
- **T-30**: 30 días antes del vencimiento  
- **T-7**: 7 días antes del vencimiento

### Ejecutar renovaciones manualmente:
```bash
# T-60
curl -X POST http://localhost:3000/api/renewals/run?stage=T60

# T-30
curl -X POST http://localhost:3000/api/renewals/run?stage=T30

# T-7
curl -X POST http://localhost:3000/api/renewals/run?stage=T7
```

## 📱 Integración WhatsApp

El sistema se integra con WhatsApp Cloud API para:

- Envío de mensajes de renovación
- Recepción de respuestas de clientes
- Procesamiento automático de intenciones

### Webhook de WhatsApp:
```
POST /api/webhooks/whatsapp
```

## 💳 Integración de Pagos

Integración con Wompi para:

- Procesamiento de pagos
- Webhooks de confirmación
- Conciliación automática

### Webhook de Wompi:
```
POST /api/webhooks/wompi
```

## 🔐 Autenticación y Roles

### Roles disponibles:
- **OWNER**: Acceso completo al sistema
- **ADMIN**: Gestión completa excepto usuarios
- **SALES**: Gestión de ventas y cotizaciones
- **SUPPORT**: Solo lectura
- **FINANCE**: Gestión de pagos y finanzas

### Credenciales de prueba:
- Email: `admin@xsystem.com`
- Contraseña: `admin123`

## 📊 API Endpoints

### Empresas
- `GET /api/companies` - Listar empresas
- `POST /api/companies` - Crear empresa
- `GET /api/companies/[id]` - Obtener empresa
- `PUT /api/companies/[id]` - Actualizar empresa
- `DELETE /api/companies/[id]` - Eliminar empresa

### Cotizaciones
- `GET /api/quotes` - Listar cotizaciones
- `POST /api/quotes` - Crear cotización
- `GET /api/quotes/[id]` - Obtener cotización
- `POST /api/quotes/[id]/send` - Enviar cotización

### Renovaciones
- `POST /api/renewals/run` - Ejecutar proceso de renovación

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Configurar Vercel Cron para renovaciones automáticas

### Variables de entorno en producción:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="production-secret"
RESEND_API_KEY="production-key"
WHATSAPP_TOKEN="production-token"
WOMPI_PRIVATE_KEY="production-key"
```

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run start        # Producción
npm run lint         # Linting
npm run typecheck    # Verificación de tipos
npm run db:push      # Sincronizar esquema
npm run db:migrate   # Ejecutar migraciones
npm run db:seed      # Poblar datos de prueba
npm run db:studio    # Abrir Prisma Studio
```

## 🔧 Configuración de Vercel Cron

Para renovaciones automáticas, configurar en Vercel:

```json
{
  "crons": [
    {
      "path": "/api/renewals/run?stage=T60",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/renewals/run?stage=T30", 
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/renewals/run?stage=T7",
      "schedule": "0 9 * * *"
    }
  ]
}
```

## 📈 Próximas Funcionalidades

- [ ] Dashboard con KPIs avanzados
- [ ] Reportes y analytics
- [ ] Integración con más proveedores de pago
- [ ] API pública para integraciones
- [ ] Notificaciones push
- [ ] Aplicación móvil

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas, contactar al equipo de desarrollo.

---

**XSystem** - CRM Completo para la gestión moderna de relaciones con clientes.