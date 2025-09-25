import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { LogOut } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 h-8 w-8" />
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm">
            <a href="/api/auth/signout">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
