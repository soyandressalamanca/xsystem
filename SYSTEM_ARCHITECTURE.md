# XSystem - Arquitectura Completa del Sistema CRM

## 📊 **Visión General del Sistema**

Sistema integral que conecta:
- **CRM** (Gestión de clientes y leads)
- **Renovaciones Automáticas** (T-90, T-60, T-30, T-7)
- **Marketing y Comunicación**
- **Suscripciones y Pagos**
- **Integración con Página Web**

---

## 🗄️ **Estructura de Base de Datos**

### **1. EMPRESAS (Companies)**
```prisma
model Company {
  id                String   @id @default(cuid())
  name              String
  rfc               String?  @unique
  industry          String?
  website           String?
  phone             String?
  email             String?
  address           String?
  city              String?
  state             String?
  country           String   @default("México")
  employeeCount     Int?
  annualRevenue     Decimal?
  
  // Clasificación
  type              CompanyType  @default(CLIENT) // CLIENT, LEAD, PARTNER
  stage             LeadStage?   // COLD, WARM, HOT (solo para leads)
  source            LeadSource?  // WEB, REFERRAL, MARKETING, etc.
  
  // Relaciones
  contacts          Contact[]
  subscriptions     Subscription[]
  quotes            Quote[]
  opportunities     Opportunity[]
  activities        Activity[]
  payments          Payment[]
  
  // Auditoría
  assignedTo        User?    @relation(fields: [assignedToId], references: [id])
  assignedToId      String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([type])
  @@index([stage])
  @@index([assignedToId])
}

enum CompanyType {
  LEAD           // Prospecto (desde web o marketing)
  CLIENT         // Cliente activo
  PARTNER        // Socio/Partner
}

enum LeadStage {
  COLD           // Frío - recién llegado
  WARM           // Tibio - mostró interés
  HOT            // Caliente - listo para cerrar
  CONVERTED      // Convertido a cliente
  LOST           // Perdido
}

enum LeadSource {
  WEB            // Formulario web
  MARKETING      // Campaña de marketing
  REFERRAL       // Referido
  PARTNER        // Partner
  DIRECT         // Contacto directo
  OTHER          // Otro
}
```

### **2. CONTACTOS (Contacts)**
```prisma
model Contact {
  id                String   @id @default(cuid())
  firstName         String
  lastName          String
  email             String?
  phone             String?
  mobilePhone       String?
  position          String?
  department        String?
  
  // Relaciones
  company           Company  @relation(fields: [companyId], references: [id])
  companyId         String
  
  isPrimary         Boolean  @default(false) // Contacto principal
  
  // Comunicación
  activities        Activity[]
  
  // Auditoría
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([companyId])
  @@index([email])
}
```

### **3. SUSCRIPCIONES (Subscriptions)**
```prisma
model Subscription {
  id                String   @id @default(cuid())
  
  // Producto/Servicio
  productName       String
  productType       ProductType
  licenseCount      Int      @default(1)
  
  // Fechas
  startDate         DateTime
  endDate           DateTime
  renewalDate       DateTime // Fecha de renovación
  
  // Financiero
  monthlyPrice      Decimal
  annualPrice       Decimal
  currency          String   @default("MXN")
  
  // Estado
  status            SubscriptionStatus @default(ACTIVE)
  autoRenew         Boolean  @default(true)
  
  // Renovación
  renewalStage      RenewalStage? // T90, T60, T30, T7
  renewalNotified   Boolean  @default(false)
  renewalAttempts   Int      @default(0)
  lastRenewalCheck  DateTime?
  
  // Relaciones
  company           Company  @relation(fields: [companyId], references: [id])
  companyId         String
  
  quote             Quote?   @relation(fields: [quoteId], references: [id])
  quoteId           String?
  
  payments          Payment[]
  renewalActivities Activity[]
  
  // Auditoría
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([companyId])
  @@index([status])
  @@index([renewalDate])
  @@index([renewalStage])
}

enum ProductType {
  SOFTWARE          // Licencias de software
  CLOUD             // Servicios cloud
  SUPPORT           // Soporte técnico
  CONSULTING        // Consultoría
  TRAINING          // Capacitación
}

enum SubscriptionStatus {
  ACTIVE            // Activa
  PENDING           // Pendiente de activación
  EXPIRED           // Expirada
  CANCELLED         // Cancelada
  SUSPENDED         // Suspendida
}

enum RenewalStage {
  T90               // 90 días antes
  T60               // 60 días antes
  T30               // 30 días antes
  T7                // 7 días antes
  OVERDUE           // Vencida
}
```

### **4. COTIZACIONES (Quotes)**
```prisma
model Quote {
  id                String   @id @default(cuid())
  quoteNumber       String   @unique
  
  // Información
  title             String
  description       String?
  validUntil        DateTime
  
  // Financiero
  subtotal          Decimal
  tax               Decimal  @default(0)
  discount          Decimal  @default(0)
  total             Decimal
  currency          String   @default("MXN")
  
  // Estado
  status            QuoteStatus @default(DRAFT)
  
  // Items de cotización
  items             QuoteItem[]
  
  // Relaciones
  company           Company  @relation(fields: [companyId], references: [id])
  companyId         String
  
  subscriptions     Subscription[]
  
  // Seguimiento
  sentAt            DateTime?
  viewedAt          DateTime?
  acceptedAt        DateTime?
  rejectedAt        DateTime?
  
  // Auditoría
  createdBy         User     @relation(fields: [createdById], references: [id])
  createdById       String
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([companyId])
  @@index([status])
}

enum QuoteStatus {
  DRAFT             // Borrador
  SENT              // Enviada
  VIEWED            // Vista por cliente
  ACCEPTED          // Aceptada
  REJECTED          // Rechazada
  EXPIRED           // Expirada
}

model QuoteItem {
  id                String   @id @default(cuid())
  
  quote             Quote    @relation(fields: [quoteId], references: [id])
  quoteId           String
  
  productName       String
  description       String?
  quantity          Int
  unitPrice         Decimal
  discount          Decimal  @default(0)
  total             Decimal
  
  @@index([quoteId])
}
```

### **5. OPORTUNIDADES (Opportunities)**
```prisma
model Opportunity {
  id                String   @id @default(cuid())
  name              String
  description       String?
  
  // Valor
  value             Decimal
  probability       Int      @default(50) // 0-100%
  expectedCloseDate DateTime
  
  // Estado
  stage             OpportunityStage @default(PROSPECTING)
  status            OpportunityStatus @default(OPEN)
  
  // Relaciones
  company           Company  @relation(fields: [companyId], references: [id])
  companyId         String
  
  assignedTo        User?    @relation(fields: [assignedToId], references: [id])
  assignedToId      String?
  
  activities        Activity[]
  
  // Auditoría
  closedAt          DateTime?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([companyId])
  @@index([stage])
  @@index([assignedToId])
}

enum OpportunityStage {
  PROSPECTING       // Prospección
  QUALIFICATION     // Calificación
  PROPOSAL          // Propuesta
  NEGOTIATION       // Negociación
  CLOSED_WON        // Ganada
  CLOSED_LOST       // Perdida
}

enum OpportunityStatus {
  OPEN              // Abierta
  WON               // Ganada
  LOST              // Perdida
}
```

### **6. ACTIVIDADES (Activities)**
```prisma
model Activity {
  id                String   @id @default(cuid())
  
  // Tipo de actividad
  type              ActivityType
  subject           String
  description       String?
  
  // Fechas
  dueDate           DateTime?
  completedAt       DateTime?
  
  // Estado
  status            ActivityStatus @default(PENDING)
  priority          Priority @default(MEDIUM)
  
  // Relaciones
  company           Company?  @relation(fields: [companyId], references: [id])
  companyId         String?
  
  contact           Contact?  @relation(fields: [contactId], references: [id])
  contactId         String?
  
  opportunity       Opportunity? @relation(fields: [opportunityId], references: [id])
  opportunityId     String?
  
  subscription      Subscription? @relation(fields: [subscriptionId], references: [id])
  subscriptionId    String?
  
  // Usuario
  assignedTo        User?    @relation(fields: [assignedToId], references: [id])
  assignedToId      String?
  
  // Auditoría
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([type])
  @@index([status])
  @@index([companyId])
  @@index([assignedToId])
}

enum ActivityType {
  CALL              // Llamada
  EMAIL             // Email
  MEETING           // Reunión
  TASK              // Tarea
  WHATSAPP          // WhatsApp
  RENEWAL_REMINDER  // Recordatorio renovación
  FOLLOW_UP         // Seguimiento
  NOTE              // Nota
}

enum ActivityStatus {
  PENDING           // Pendiente
  IN_PROGRESS       // En progreso
  COMPLETED         // Completada
  CANCELLED         // Cancelada
}

enum Priority {
  LOW               // Baja
  MEDIUM            // Media
  HIGH              // Alta
  URGENT            // Urgente
}
```

### **7. PAGOS (Payments)**
```prisma
model Payment {
  id                String   @id @default(cuid())
  
  // Referencia
  transactionId     String   @unique
  invoiceNumber     String?
  
  // Financiero
  amount            Decimal
  currency          String   @default("MXN")
  
  // Método de pago
  method            PaymentMethod
  status            PaymentStatus @default(PENDING)
  
  // Fechas
  paidAt            DateTime?
  dueDate           DateTime?
  
  // Relaciones
  company           Company  @relation(fields: [companyId], references: [id])
  companyId         String
  
  subscription      Subscription? @relation(fields: [subscriptionId], references: [id])
  subscriptionId    String?
  
  // Auditoría
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([companyId])
  @@index([status])
  @@index([subscriptionId])
}

enum PaymentMethod {
  TRANSFER          // Transferencia
  CREDIT_CARD       // Tarjeta de crédito
  DEBIT_CARD        // Tarjeta de débito
  CASH              // Efectivo
  CHECK             // Cheque
  OTHER             // Otro
}

enum PaymentStatus {
  PENDING           // Pendiente
  PAID              // Pagado
  FAILED            // Fallido
  REFUNDED          // Reembolsado
  CANCELLED         // Cancelado
}
```

### **8. WEB LEADS (Integración con la web)**
```prisma
model WebLead {
  id                String   @id @default(cuid())
  
  // Información del formulario
  name              String
  email             String
  phone             String?
  company           String?
  message           String?
  
  // Origen
  source            String   // "contact_form", "products_page", "services_page"
  pageUrl           String?
  
  // Estado
  status            WebLeadStatus @default(NEW)
  convertedToCompany Company? @relation(fields: [companyId], references: [id])
  companyId         String?
  
  // Auditoría
  createdAt         DateTime @default(now())
  processedAt       DateTime?
  
  @@index([status])
  @@index([email])
}

enum WebLeadStatus {
  NEW               // Nuevo
  CONTACTED         // Contactado
  CONVERTED         // Convertido a empresa
  SPAM              // Spam
  INVALID           // Inválido
}
```

---

## 🎯 **Flujo del Sistema**

### **1. FLUJO DE LEADS (Desde Web)**
```
Web Form → WebLead → Manual Review → Company (LEAD) → 
Opportunity → Quote → Subscription → Company (CLIENT)
```

### **2. FLUJO DE RENOVACIONES (Automático)**
```
Subscription → Cron Job (diario) → Check renewalDate →
T-90: Create Activity + Email → 
T-60: Create Activity + Email + WhatsApp →
T-30: Create Activity + Email + WhatsApp →
T-7: Create Activity + Call + Email + WhatsApp →
Vencida: Suspend + Notify
```

### **3. FLUJO DE COMUNICACIÓN**
```
Activity (CALL/EMAIL/WHATSAPP) → Template → Send → Log → History
```

---

## 📱 **Estructura del Menú Actualizado**

### **Dashboard**
- Vista general con métricas principales

### **CRM**
- **Clientes** (Companies con type=CLIENT)
  - Lista de clientes activos
  - Detalle de cliente
  - Historial de compras
  
- **Leads** (Companies con type=LEAD)
  - Lista de leads (desde web y otras fuentes)
  - Pipeline de conversión
  - Etapas: COLD → WARM → HOT
  
- **Contactos**
  - Todos los contactos
  - Por empresa
  
- **Oportunidades**
  - Pipeline de ventas
  - Por etapa
  - Forecast

### **Suscripciones**
- **Activas**
  - Todas las suscripciones activas
  
- **Renovaciones**
  - **90 días** (próximas renovaciones)
  - **60 días** (renovaciones próximas)
  - **30 días** (renovaciones inmediatas)
  - **7 días** (renovaciones urgentes)
  - **Vencidas** (requieren atención)
  
- **Gestión de Productos**
  - Catálogo de productos/servicios

### **Cotizaciones**
- **Todas las Cotizaciones**
- **Nueva Cotización**
- **Plantillas**
- **Por Estado** (Draft, Sent, Accepted, etc.)

### **Comunicación**
- **WhatsApp**
  - Envío masivo
  - Conversaciones
  
- **Email**
  - Envío masivo
  - Campañas
  
- **Plantillas**
  - Email templates
  - WhatsApp templates
  
- **Historial**
  - Todas las comunicaciones

### **Pagos**
- **Transacciones**
- **Conciliación**
- **Reportes de Pago**

### **Reportes**
- **Dashboard Ejecutivo**
- **Ventas**
- **Renovaciones** (métricas de renovación)
- **Clientes** (análisis de clientes)
- **Marketing** (performance de leads)

### **Configuración**
- **Usuarios y Permisos**
- **Integraciones** (Web, WhatsApp, Email)
- **Automatizaciones** (Renovaciones, Notificaciones)
- **General**

---

## 🔄 **Sistema de Renovaciones Automáticas**

### **Cron Job Diario**
```typescript
// Ejecutar diariamente a las 8:00 AM
async function processRenewals() {
  const today = new Date()
  
  // T-90
  const t90 = await getSubscriptionsRenewingIn(90)
  for (const sub of t90) {
    await createRenewalActivity(sub, 'T90')
    await sendRenewalEmail(sub, 't90_template')
    await updateRenewalStage(sub, 'T90')
  }
  
  // T-60
  const t60 = await getSubscriptionsRenewingIn(60)
  for (const sub of t60) {
    await createRenewalActivity(sub, 'T60')
    await sendRenewalEmail(sub, 't60_template')
    await sendWhatsApp(sub, 't60_template')
    await updateRenewalStage(sub, 'T60')
  }
  
  // Similar para T-30 y T-7
  
  // Vencidas
  const expired = await getExpiredSubscriptions()
  for (const sub of expired) {
    await suspendSubscription(sub)
    await notifyExpiration(sub)
  }
}
```

---

## 🌐 **Integración con Página Web**

### **Formulario de Contacto**
```typescript
// En la página web (/contact)
async function handleContactForm(data) {
  // Crear WebLead
  const lead = await prisma.webLead.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      source: 'contact_form',
      pageUrl: window.location.href
    }
  })
  
  // Notificar al equipo de ventas
  await notifySalesTeam(lead)
}
```

### **Conversión de Lead a Cliente**
```typescript
async function convertWebLeadToCompany(webLeadId: string) {
  const webLead = await prisma.webLead.findUnique({ where: { id: webLeadId } })
  
  const company = await prisma.company.create({
    data: {
      name: webLead.company || webLead.name,
      email: webLead.email,
      phone: webLead.phone,
      type: 'LEAD',
      stage: 'COLD',
      source: 'WEB'
    }
  })
  
  await prisma.webLead.update({
    where: { id: webLeadId },
    data: {
      status: 'CONVERTED',
      companyId: company.id,
      processedAt: new Date()
    }
  })
  
  return company
}
```

---

## ✅ **Próximos Pasos de Desarrollo**

### **Fase 1: Core CRM**
1. ✅ Dashboard principal
2. Clientes (CRUD completo)
3. Leads (con integración web)
4. Contactos
5. Oportunidades

### **Fase 2: Suscripciones y Renovaciones**
1. Gestión de suscripciones
2. Sistema de renovaciones automáticas
3. Vistas por etapa (T-90, T-60, T-30, T-7)
4. Notificaciones automatizadas

### **Fase 3: Cotizaciones**
1. Generador de cotizaciones
2. Plantillas personalizables
3. Envío y tracking
4. Conversión a suscripción

### **Fase 4: Comunicación**
1. Integración WhatsApp
2. Email marketing
3. Plantillas de comunicación
4. Historial unificado

### **Fase 5: Pagos y Reportes**
1. Gestión de pagos
2. Conciliación
3. Reportes ejecutivos
4. Analytics avanzado

---

Este es el sistema completo e integrado que propongo. ¿Empezamos a implementarlo? 🚀

