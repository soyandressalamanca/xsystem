# Credenciales de Prueba - XSystem Transformación Digital

## 🔐 Usuario Administrador

### Credenciales de Acceso:
- **Email:** `admin@xsystem.com`
- **Contraseña:** `admin123`
- **Rol:** `OWNER`

### Funcionalidades Disponibles:
- ✅ Acceso completo al sistema
- ✅ Gestión de empresas y contactos
- ✅ Creación y envío de cotizaciones
- ✅ Gestión de suscripciones
- ✅ Ejecución de renovaciones automáticas
- ✅ Configuración del sistema

## 🗄️ Base de Datos

### Datos de Prueba Incluidos:
- **1 Usuario administrador**
- **1 Empresa demo** (Empresa Demo S.A.S.)
- **3 Productos** (Microsoft 365 Business Basic, Standard, Premium)
- **1 Suscripción activa** (vence en 60 días)
- **1 Tarea de renovación** (T-60)

## 🚀 Configuración de Desarrollo

### Variables de Entorno Requeridas:
```env
# Base de datos
DATABASE_URL="postgresql://usuario:password@localhost:5432/xsystem"

# Autenticación
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-key"

# OAuth (Opcional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
AZURE_AD_CLIENT_ID=""
AZURE_AD_CLIENT_SECRET=""
AZURE_AD_TENANT_ID=""

# Servicios Externos (Stubs para desarrollo)
RESEND_API_KEY=""
WHATSAPP_TOKEN=""
WOMPI_PRIVATE_KEY=""
```

## 📱 Acceso al Sistema

1. **Iniciar servidor:**
   ```bash
   npm run dev
   ```

2. **Acceder a:** `http://localhost:3000`

3. **Usar credenciales:**
   - Email: `admin@xsystem.com`
   - Contraseña: `admin123`

## 🔧 Comandos Útiles

```bash
# Sincronizar base de datos
npm run db:push

# Poblar datos de prueba
npm run db:seed

# Abrir Prisma Studio
npm run db:studio

# Ejecutar renovaciones manualmente
curl -X POST http://localhost:3000/api/renewals/run?stage=T60
```

## 📋 Notas de Desarrollo

- El sistema está configurado con **stubs** para servicios externos
- Las integraciones reales requieren configuración de APIs
- Los datos de prueba se pueden regenerar con `npm run db:seed`
- El sistema incluye **RBAC** completo con diferentes roles

---

**XSystem CRM** - Sistema de gestión de relaciones con clientes
