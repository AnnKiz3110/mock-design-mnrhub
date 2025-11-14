"use client"

import * as React from "react"
import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"
import { AppFooter } from "./app-footer"

export function AppLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

  return (
    <div className="flex min-h-screen flex-col bg-gray-5">
      <AppHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 ">
        <AppSidebar isOpen={isSidebarOpen} />

        <main className="flex-1 p-6 overflow-x-hidden">{children}</main>
      </div>

      <AppFooter />
    </div>
  )
}
