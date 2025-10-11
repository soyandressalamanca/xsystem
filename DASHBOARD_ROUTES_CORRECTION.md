# Corrección de Rutas del Dashboard

## Problema Identificado
Las páginas del CRM, suscripciones y cotizaciones estaban ubicadas fuera del directorio `dashboard`, lo que causaba que no usaran el layout correcto con el sidebar y no fueran compatibles con los modos oscuro/claro.

## Solución Implementada

### 1. Reubicación de Archivos
Se movieron las siguientes carpetas al directorio correcto:
```
src/app/crm/ → src/app/dashboard/crm/
src/app/subscriptions/ → src/app/dashboard/subscriptions/
src/app/quotes/ → src/app/dashboard/quotes/
```

### 2. Corrección de Rutas Internas
Se actualizaron todas las rutas internas en las páginas para que apunten correctamente:

#### CRM
- `/crm/clients/new` → `/dashboard/crm/clients/new`
- `/crm/clients/{id}` → `/dashboard/crm/clients/{id}`
- `/crm/leads/new` → `/dashboard/crm/leads/new`
- `/crm/leads/{id}` → `/dashboard/crm/leads/{id}`
- `/crm/opportunities/new` → `/dashboard/crm/opportunities/new`
- `/crm/contacts/new` → `/dashboard/crm/contacts/new`
- `/crm/companies` → `/dashboard/crm/companies`

#### Suscripciones
- `/subscriptions/new` → `/dashboard/subscriptions/new`
- `/subscriptions/{id}` → `/dashboard/subscriptions/{id}`
- `/subscriptions/renewals/7` → `/dashboard/subscriptions/renewals/7`
- `/subscriptions/renewals/30` → `/dashboard/subscriptions/renewals/30`
- `/subscriptions/renewals/60` → `/dashboard/subscriptions/renewals/60`
- `/subscriptions/renewals/90` → `/dashboard/subscriptions/renewals/90`

#### Cotizaciones
- `/quotes/new` → `/dashboard/quotes/new`
- `/quotes/{id}` → `/dashboard/quotes/{id}`
- `/quotes/templates` → `/dashboard/quotes/templates`

### 3. Archivos Corregidos
- `src/app/dashboard/crm/clients/page.tsx`
- `src/app/dashboard/crm/leads/page.tsx`
- `src/app/dashboard/crm/opportunities/page.tsx`
- `src/app/dashboard/crm/contacts/page.tsx`
- `src/app/dashboard/subscriptions/active/page.tsx`
- `src/app/dashboard/quotes/page.tsx`
- `src/app/dashboard/page.tsx`

## Resultado
✅ Todas las páginas del dashboard ahora:
- Mantienen el sidebar lateral
- Son compatibles con los modos oscuro y claro
- Tienen rutas correctas y funcionales
- Usan el layout del dashboard con ThemeProvider

## 4. Corrección del Sidebar
Se actualizaron todas las rutas en `src/components/app-sidebar.tsx` para incluir el prefijo `/dashboard`:

- **CRM:** Todas las rutas ahora apuntan a `/dashboard/crm/...`
- **Suscripciones:** Todas las rutas ahora apuntan a `/dashboard/subscriptions/...`
- **Cotizaciones:** Todas las rutas ahora apuntan a `/dashboard/quotes/...`
- **Comunicación:** Todas las rutas ahora apuntan a `/dashboard/communication/...`
- **Pagos:** Todas las rutas ahora apuntan a `/dashboard/payments/...`
- **Reportes:** Todas las rutas ahora apuntan a `/dashboard/reports/...`
- **Configuración:** Todas las rutas ahora apuntan a `/dashboard/settings/...`

## Verificación
Se ejecutó el servidor de desarrollo para confirmar que todas las páginas funcionan correctamente sin errores de navegación.

**Estado:** ✅ Todas las rutas del sidebar ahora funcionan correctamente y las páginas cargan sin errores 404.
