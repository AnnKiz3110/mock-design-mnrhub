"use client"

import * as React from "react"
import { ChevronRight } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ReportFilterCard, type FilterConfig } from "@/components/reports/report-filter-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/app/reports/containers/components/data-table"
import { getContainerReports } from "@/lib/data-client"

const filters: FilterConfig[] = [
  {
    id: "soContainer",
    label: "Số container",
    options: [
      { value: "all", label: "Tất cả" },
    ],
  },
  {
    id: "hangTau",
    label: "Hãng tàu",
    options: [
      { value: "all", label: "Tất cả" },
      { value: "GMD", label: "GMD" },
      { value: "CKY", label: "CKY" },
      { value: "CMA", label: "CMA" },
    ],
  },
  {
    id: "vssc",
    label: "VSSC",
    options: [
      { value: "all", label: "Tất cả" },
      { value: "vesinh", label: "Vệ sinh" },
      { value: "suachua", label: "Sửa chữa" },
    ],
  },
  {
    id: "kichCo",
    label: "Kích cỡ",
    options: [
      { value: "all", label: "Tất cả" },
      { value: "20", label: "20'" },
      { value: "40", label: "40'" },
      { value: "45", label: "45'" },
    ],
  },
]

export default function ProductionByCarrierPage() {
  const [data, setData] = React.useState(getContainerReports())

  const handleSearch = (values: Record<string, string>) => {
    console.log("[v0] Production By Carrier filter values:", values)
    setData(getContainerReports())
  }

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/reports">Báo cáo</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Báo cáo sản lượng theo hãng tàu</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ReportFilterCard filters={filters} onSearch={handleSearch} />

      {/* Tabs for Summary and Details */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
          <TabsTrigger value="summary">Tab Tổng kết</TabsTrigger>
          <TabsTrigger value="details">Tab Chi tiết</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-4">
          <Card className="p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Tổng kết theo hãng tàu</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-[#2c86ff]/10">
                  <th className="text-left py-3 px-4">Hãng tàu</th>
                  <th className="text-center py-3 px-4">Vệ sinh</th>
                  <th className="text-center py-3 px-4">Sửa chữa</th>
                  <th className="text-center py-3 px-4">Tổng</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">GMD</td>
                  <td className="text-center py-3 px-4">2</td>
                  <td className="text-center py-3 px-4">2</td>
                  <td className="text-center py-3 px-4 font-semibold">4</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">CKY</td>
                  <td className="text-center py-3 px-4">1</td>
                  <td className="text-center py-3 px-4">1</td>
                  <td className="text-center py-3 px-4 font-semibold">2</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">CMA</td>
                  <td className="text-center py-3 px-4">1</td>
                  <td className="text-center py-3 px-4">1</td>
                  <td className="text-center py-3 px-4 font-semibold">2</td>
                </tr>
                <tr className="bg-[#2c86ff]/5 font-bold">
                  <td className="py-3 px-4">Tổng cộng</td>
                  <td className="text-center py-3 px-4">4</td>
                  <td className="text-center py-3 px-4">4</td>
                  <td className="text-center py-3 px-4">8</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <DataTable data={data} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
