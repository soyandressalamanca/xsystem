# Páginas a Crear - XSystem CRM

## ✅ **Sidebar Actualizado**

El sidebar ha sido reorganizado con la siguiente estructura:

### **1. Dashboard** (`/dashboard`)
- ✅ Ya existe
- Métricas principales
- Acciones rápidas

### **2. CRM**

#### **Clientes** (`/crm/clients`)
- Lista de clientes activos (type = CLIENT)
- Tabla con filtros y búsqueda
- Vista detalle de cliente
- Suscripciones del cliente
- Historial de pagos
- Actividades relacionadas

#### **Leads** (`/crm/leads`)
- Lista de leads (type = LEAD)
- Integración con formularios web
- Pipeline de conversión: COLD → WARM → HOT
- Conversión a cliente
- Asignación a vendedores

#### **Contactos** (`/crm/contacts`)
- Lista de todos los contactos
- Filtro por empresa
- CRUD de contactos
- Historial de comunicación

#### **Oportunidades** (`/crm/opportunities`)
- Pipeline de ventas
- Etapas: Prospección → Calificación → Propuesta → Negociación → Cierre
- Vista Kanban
- Forecast de ventas

### **3. Suscripciones**

#### **Activas** (`/subscriptions/active`)
- Todas las suscripciones activas
- Filtros por producto, cliente, fecha
- Vista de detalle
- Próximas renovaciones

#### **Renovaciones 90 días** (`/subscriptions/renewals/90`)
- Suscripciones que vencen en 90 días
- Estado de comunicación (T-90 enviado)
- Acciones de seguimiento

#### **Renovaciones 60 días** (`/subscriptions/renewals/60`)
- Suscripciones que vencen en 60 días
- Estado de comunicación (T-60 enviado)
- Escalamiento automático

#### **Renovaciones 30 días** (`/subscriptions/renewals/30`)
- Suscripciones que vencen en 30 días
- Alta prioridad
- Notificaciones múltiples

#### **Renovaciones 7 días** (`/subscriptions/renewals/7`)
- Suscripciones que vencen en 7 días
- Urgente
- Llamadas telefónicas requeridas

#### **Vencidas** (`/subscriptions/expired`)
- Suscripciones vencidas
- Requieren atención inmediata
- Plan de recuperación

### **4. Cotizaciones**

#### **Todas** (`/quotes`)
- Lista de todas las cotizaciones
- Filtros por estado, cliente, fecha
- Vista previa PDF

#### **Nueva Cotización** (`/quotes/new`)
- Formulario de creación
- Selección de productos
- Cálculos automáticos
- Generación de PDF

#### **Plantillas** (`/quotes/templates`)
- Plantillas prediseñadas
- Editor de plantillas
- Variables dinámicas

#### **Productos** (`/quotes/products`)
- Catálogo de productos/servicios
- Precios
- Descripciones
- Categorías

### **5. Comunicación**

#### **WhatsApp** (`/communication/whatsapp`)
- Envío individual
- Envío masivo
- Plantillas de mensajes
- Conversaciones

#### **Email** (`/communication/email`)
- Envío individual
- Campañas de email
- Plantillas de email
- Tracking de apertura

#### **Plantillas** (`/communication/templates`)
- Plantillas de WhatsApp
- Plantillas de Email
- Variables dinámicas
- Editor visual

#### **Historial** (`/communication/history`)
- Todas las comunicaciones
- Por cliente
- Por tipo
- Timeline

### **6. Pagos**

#### **Transacciones** (`/payments/transactions`)
- Lista de transacciones
- Filtros por estado, método, fecha
- Conciliación bancaria

#### **Conciliación** (`/payments/reconciliation`)
- Match de pagos con suscripciones
- Pagos pendientes
- Discrepancias

#### **Reportes** (`/payments/reports`)
- Ingresos por periodo
- Métodos de pago
- Tasa de pago a tiempo
- Proyecciones

### **7. Reportes**

#### **Dashboard Ejecutivo** (`/reports/executive`)
- KPIs principales
- Gráficas de tendencia
- Comparativas mes/año
- Top clientes

#### **Ventas** (`/reports/sales`)
- Pipeline de ventas
- Conversión de leads
- Tasa de cierre
- Por vendedor

#### **Renovaciones** (`/reports/renewals`)
- Tasa de renovación
- Churn rate
- Ingresos recurrentes (MRR/ARR)
- Análisis de etapas

#### **Marketing** (`/reports/marketing`)
- Leads por fuente
- Costo de adquisición (CAC)
- ROI de campañas
- Conversión web

### **8. Configuración**

#### **Usuarios y Permisos** (`/settings/users`)
- Gestión de usuarios
- Roles y permisos
- Equipos
- Asignaciones

#### **Integraciones** (`/settings/integrations`)
- WhatsApp Business API
- Email (SMTP)
- Webhooks de la web
- Pasarelas de pago

#### **Automatizaciones** (`/settings/automations`)
- Cron jobs de renovaciones
- Reglas de asignación
- Workflows automáticos
- Notificaciones

#### **General** (`/settings/general`)
- Configuración de empresa
- Moneda y región
- Formatos de fecha
- Plantillas por defecto

---

## 🔄 **Funcionalidades Clave a Implementar**

### **1. Sistema de Renovaciones Automáticas**
```typescript
// Cron Job que se ejecuta diariamente
- Revisar todas las suscripciones
- Identificar próximas renovaciones (90, 60, 30, 7 días)
- Crear actividades automáticas
- Enviar notificaciones programadas
- Actualizar estado de renovación
- Suspender suscripciones vencidas
```

### **2. Integración con Formularios Web**
```typescript
// API endpoint para recibir leads de la web
POST /api/leads/web
{
  name, email, phone, company, message, source
}
// Crear WebLead
// Notificar equipo de ventas
// Auto-asignar según reglas
```

### **3. Pipeline de Conversión**
```
Web Lead → Review → Company (LEAD) → 
Opportunity → Quote → Accepted → 
Subscription → Company (CLIENT)
```

### **4. Sistema de Comunicación Unificado**
- Historial completo por cliente
- Plantillas para cada etapa
- Tracking de envíos
- Respuestas automáticas

---

## 📊 **Prioridad de Desarrollo**

### **FASE 1 - Core CRM (Alta Prioridad)**
1. ⚡ **Clientes** - Base del sistema
2. ⚡ **Leads** - Captura desde web
3. ⚡ **Contactos** - Relaciones
4. ⚡ **Suscripciones Activas** - Gestión principal

### **FASE 2 - Renovaciones (Alta Prioridad)**
1. ⚡ **Sistema de Renovaciones Automáticas**
2. ⚡ **Vistas por Etapa** (90, 60, 30, 7 días)
3. ⚡ **Notificaciones Automáticas**
4. ⚡ **Vencidas**

### **FASE 3 - Ventas (Media Prioridad)**
1. 🔷 **Oportunidades** - Pipeline
2. 🔷 **Cotizaciones** - Generación
3. 🔷 **Productos** - Catálogo
4. 🔷 **Conversión** - Quote → Subscription

### **FASE 4 - Comunicación (Media Prioridad)**
1. 🔷 **Email** - Básico
2. 🔷 **Plantillas** - Comunicación
3. 🔷 **Historial** - Tracking
4. 🔷 **WhatsApp** - Integración

### **FASE 5 - Financiero (Baja Prioridad)**
1. 🔹 **Pagos** - Transacciones
2. 🔹 **Conciliación** - Automática
3. 🔹 **Reportes de Pago**

### **FASE 6 - Análisis (Baja Prioridad)**
1. 🔹 **Dashboard Ejecutivo**
2. 🔹 **Reportes de Ventas**
3. 🔹 **Reportes de Renovaciones**
4. 🔹 **Reportes de Marketing**

---

## 🎯 **Recomendación de Inicio**

**Empezar con:**
1. ✅ Actualizar sidebar (HECHO)
2. 🚀 **Crear página de Clientes** (`/crm/clients`)
3. 🚀 **Crear página de Leads** (`/crm/leads`)
4. 🚀 **Implementar formulario de contacto en la web**
5. 🚀 **Crear endpoint API para recibir leads**
6. 🚀 **Sistema de renovaciones automáticas**

¿Empezamos con la página de Clientes? 🎯

