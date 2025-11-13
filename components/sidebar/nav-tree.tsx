"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Search, FileBarChart2, BarChart3, Settings, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface NavItem {
  title: string
  icon?: React.ReactNode
  href?: string
  items?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: "/dashboard",
  },
  {
    title: "Tra cứu",
    icon: <Search className="h-4 w-4" />,
    items: [
      { title: "Tra cứu container", href: "/search/container" },
      { title: "Tra cứu booking", href: "/search/booking" },
    ],
  },
  {
    title: "EDI",
    icon: <FileBarChart2 className="h-4 w-4" />,
    items: [
      { title: "Quản lý EDI", href: "/edi/manage" },
      { title: "Lịch sử EDI", href: "/edi/history" },
    ],
  },
  {
    title: "Báo cáo",
    icon: <BarChart3 className="h-4 w-4" />,
    items: [
      { title: "Giám định sửa chữa container", href: "/reports/inspection" },
      { title: "Báo cáo vệ sinh & sửa chữa container", href: "/reports/containers" },
      { title: "Danh sách container thu cược", href: "/reports/container-list" },
      { title: "Báo cáo tồn bãi", href: "/reports/inventory" },
      { title: "Báo cáo tồn bãi theo tình trạng", href: "/reports/inventory-status" },
      { title: "Báo cáo sản lượng M&R", href: "/reports/mr-volume" },
      { title: "Doanh thu sửa chữa", href: "/reports/repair-revenue" },
      { title: "Báo cáo Gate Out container", href: "/reports/gate-out" },
      { title: "Báo cáo sản lượng theo tác nghiệp", href: "/reports/operation-volume" },
      { title: "Báo cáo sản lượng theo hãng tàu", href: "/reports/shipping-volume" },
    ],
  },
  {
    title: "Quản trị hệ thống",
    icon: <Settings className="h-4 w-4" />,
    items: [
      { title: "Người dùng", href: "/admin/users" },
      { title: "Phân quyền", href: "/admin/permissions" },
    ],
  },
]

interface NavTreeProps {
  isCollapsed?: boolean
}

export function NavTree({ isCollapsed = false }: NavTreeProps) {
  const pathname = usePathname()
  const [openItems, setOpenItems] = React.useState<string[]>(["Báo cáo"])

  React.useEffect(() => {
    if (isCollapsed) {
      setOpenItems([])
    } else {
      const currentSection = navItems.find((item) => item.items?.some((subItem) => subItem.href === pathname))
      if (currentSection && !openItems.includes(currentSection.title)) {
        setOpenItems([currentSection.title])
      }
    }
  }, [isCollapsed, pathname])

  const toggleItem = (title: string) => {
    setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  if (isCollapsed) {
    return (
      <nav className="space-y-2 py-4">
        {navItems.map((item) => (
          <div key={item.title} className="flex justify-center">
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
                  "hover:bg-[#2c86ff]/10 hover:text-[#2c86ff]",
                  pathname === item.href && "bg-[#2c86ff] text-white",
                )}
                title={item.title}
              >
                {item.icon}
              </Link>
            ) : (
              <button
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
                  "hover:bg-[#2c86ff]/10 hover:text-[#2c86ff]",
                  item.items?.some((subItem) => subItem.href === pathname) && "bg-[#2c86ff]/20 text-[#2c86ff]",
                )}
                title={item.title}
              >
                {item.icon}
              </button>
            )}
          </div>
        ))}
      </nav>
    )
  }

  return (
    <nav className="space-y-1 py-4">
      {navItems.map((item) => (
        <div key={item.title}>
          {item.items ? (
            <Collapsible open={openItems.includes(item.title)} onOpenChange={() => toggleItem(item.title)}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 px-3 py-2 text-sm font-medium rounded-lg",
                    "hover:bg-[#2c86ff]/10 hover:text-[#2c86ff]",
                    openItems.includes(item.title) && "bg-[#2c86ff]/10 text-[#2c86ff]",
                  )}
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.title}</span>
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", openItems.includes(item.title) && "rotate-180")}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 pt-1 space-y-1">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href || "#"}
                    className={cn(
                      "block px-3 py-2 text-sm rounded-lg transition-colors",
                      "hover:bg-[#2c86ff]/10 hover:text-[#2c86ff]",
                      pathname === subItem.href && "bg-[#2c86ff] text-white hover:bg-[#1568db] hover:text-white",
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <Link
              href={item.href || "#"}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                "hover:bg-[#2c86ff]/10 hover:text-[#2c86ff]",
                pathname === item.href && "bg-[#2c86ff] text-white",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
