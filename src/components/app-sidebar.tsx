"use client"

import * as React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  FileText, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Minus, 
  Plus,
  MessageSquare,
  Target,
  UserPlus,
  PackageCheck,
  RefreshCw
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"

// CRM Navigation Data
const data = {
  user: {
    name: "Admin User",
    email: "admin@xsystem.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "CRM",
      url: "#",
      icon: Building2,
      items: [
        {
          title: "Clientes",
          url: "/dashboard/crm/clients",
        },
        {
          title: "Leads",
          url: "/dashboard/crm/leads",
        },
        {
          title: "Contactos",
          url: "/dashboard/crm/contacts",
        },
        {
          title: "Oportunidades",
          url: "/dashboard/crm/opportunities",
        },
      ],
    },
    {
      title: "Cotizaciones",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Todas",
          url: "/dashboard/quotes",
        },
        {
          title: "Nueva Cotización",
          url: "/dashboard/quotes/new",
        },
        {
          title: "Plantillas",
          url: "/dashboard/quotes/templates",
        },
        {
          title: "Productos",
          url: "/dashboard/quotes/products",
        },
      ],
    },
    {
      title: "Suscripciones",
      url: "#",
      icon: PackageCheck,
      items: [
        {
          title: "Activas",
          url: "/dashboard/subscriptions/active",
        },
        {
          title: "Renovaciones 90 días",
          url: "/dashboard/subscriptions/renewals/90",
        },
        {
          title: "Renovaciones 60 días",
          url: "/dashboard/subscriptions/renewals/60",
        },
        {
          title: "Renovaciones 30 días",
          url: "/dashboard/subscriptions/renewals/30",
        },
        {
          title: "Renovaciones 7 días",
          url: "/dashboard/subscriptions/renewals/7",
        },
        {
          title: "Vencidas",
          url: "/dashboard/subscriptions/expired",
        },
      ],
    },
    {
      title: "Comunicación",
      url: "#",
      icon: MessageSquare,
      items: [
        {
          title: "WhatsApp",
          url: "/dashboard/communication/whatsapp",
        },
        {
          title: "Email",
          url: "/dashboard/communication/email",
        },
        {
          title: "Plantillas",
          url: "/dashboard/communication/templates",
        },
        {
          title: "Historial",
          url: "/dashboard/communication/history",
        },
      ],
    },
    {
      title: "Pagos",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Transacciones",
          url: "/dashboard/payments/transactions",
        },
        {
          title: "Conciliación",
          url: "/dashboard/payments/reconciliation",
        },
        {
          title: "Reportes",
          url: "/dashboard/payments/reports",
        },
      ],
    },
    {
      title: "Reportes",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "Dashboard Ejecutivo",
          url: "/dashboard/reports/executive",
        },
        {
          title: "Ventas",
          url: "/dashboard/reports/sales",
        },
        {
          title: "Renovaciones",
          url: "/dashboard/reports/renewals",
        },
        {
          title: "Marketing",
          url: "/dashboard/reports/marketing",
        },
      ],
    },
    {
      title: "Configuración",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Usuarios y Permisos",
          url: "/dashboard/settings/users",
        },
        {
          title: "Integraciones",
          url: "/dashboard/settings/integrations",
        },
        {
          title: "Automatizaciones",
          url: "/dashboard/settings/automations",
        },
        {
          title: "General",
          url: "/dashboard/settings/general",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Evitar hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const logoSrc = !mounted ? "/Logo Xsystem Blanco 2.png" : (theme === "light" ? "/logo xsystem.png" : "/Logo Xsystem Blanco 2.png")

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex w-full items-center justify-center py-4">
                  <Image 
                    src={logoSrc}
                    alt="XSystem Logo" 
                    width={140} 
                    height={70}
                    className="object-contain"
                  />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  {item.items?.length ? (
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {item.icon && <item.icon className="size-4" />}
                        <span>{item.title}</span>
                        <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        {item.icon && <item.icon className="size-4" />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={subItem.isActive}
                            >
                              <a href={subItem.url}>{subItem.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}


