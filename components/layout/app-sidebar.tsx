"use client"
import { NavTree } from "@/components/sidebar/nav-tree"
import { cn } from "@/lib/utils"

interface AppSidebarProps {
  isOpen: boolean
}

export function AppSidebar({ isOpen }: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 shadow-sm",
        isOpen ? "w-64" : "w-16",
      )}
    >
      <div className="flex flex-col h-full overflow-y-hidden">
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-2">
          <NavTree isCollapsed={!isOpen} />
        </div>
      </div>
    </aside>
  )
}
