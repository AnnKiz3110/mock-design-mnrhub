import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppLayoutClient } from "@/components/layout/app-layout-client"

const inter = Inter({ subsets: ["latin", "vietnamese"] })

export const metadata: Metadata = {
  title: "M&R Client - Hệ thống quản lý Container",
  description: "Hệ thống quản lý và báo cáo container chuyên nghiệp",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AppLayoutClient>{children}</AppLayoutClient>
      </body>
    </html>
  )
}
