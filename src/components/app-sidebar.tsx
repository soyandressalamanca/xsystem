import * as React from "react"
import Image from "next/image"
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  FileText, 
  Calendar, 
  Database, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Minus, 
  Plus,
  MessageSquare,
  Mail,
  Phone,
  LogOut,
  User,
  Bell,
  Shield
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
          title: "Empresas",
          url: "/crm/companies",
        },
        {
          title: "Contactos",
          url: "/crm/contacts",
        },
        {
          title: "Oportunidades",
          url: "/crm/opportunities",
        },
        {
          title: "Actividades",
          url: "/crm/activities",
        },
      ],
    },
    {
      title: "Cotizaciones",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Todas las Cotizaciones",
          url: "/quotes",
        },
        {
          title: "Nueva Cotización",
          url: "/quotes/new",
        },
        {
          title: "Plantillas",
          url: "/quotes/templates",
        },
        {
          title: "Productos",
          url: "/products",
        },
      ],
    },
    {
      title: "Suscripciones",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Todas las Suscripciones",
          url: "/subscriptions",
        },
        {
          title: "Renovaciones T-60",
          url: "/subscriptions/renewals?stage=T60",
        },
        {
          title: "Renovaciones T-30",
          url: "/subscriptions/renewals?stage=T30",
        },
        {
          title: "Renovaciones T-7",
          url: "/subscriptions/renewals?stage=T7",
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
          url: "/communication/whatsapp",
        },
        {
          title: "Email",
          url: "/communication/email",
        },
        {
          title: "Plantillas",
          url: "/communication/templates",
        },
        {
          title: "Historial",
          url: "/communication/history",
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
          url: "/payments/transactions",
        },
        {
          title: "Conciliación",
          url: "/payments/reconciliation",
        },
        {
          title: "Reportes de Pago",
          url: "/payments/reports",
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
          url: "/reports/executive",
        },
        {
          title: "Ventas",
          url: "/reports/sales",
        },
        {
          title: "Renovaciones",
          url: "/reports/renewals",
        },
        {
          title: "Clientes",
          url: "/reports/customers",
        },
      ],
    },
    {
      title: "Configuración",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Usuarios",
          url: "/settings/users",
        },
        {
          title: "Roles y Permisos",
          url: "/settings/roles",
        },
        {
          title: "Integraciones",
          url: "/settings/integrations",
        },
        {
          title: "General",
          url: "/settings/general",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex w-full items-center justify-center py-4">
                  <Image 
                    src="/logo xsystem.png" 
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


