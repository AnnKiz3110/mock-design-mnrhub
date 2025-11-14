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
      { value: "BDP", label: "BDP" },
    ],
  },
  {
    id: "tinhTrangCont",
    label: "Tình trạng cont",
    options: [
      { value: "all", label: "Tất cả" },
      { value: "D2", label: "D2" },
      { value: "AA", label: "AA" },
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
  {
    id: "donVi",
    label: "Đơn vị",
    options: [
      { value: "all", label: "Tất cả" },
      { value: "bdp1", label: "BDP1" },
      { value: "bdp2", label: "BDP2" },
      { value: "bdp3", label: "BDP3" },
    ],
  },
]

export default function ProductionByOperationPage() {
  const [data, setData] = React.useState(getContainerReports())

  const handleSearch = (values: Record<string, string>) => {
    console.log("[v0] Production By Operation filter values:", values)
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
            <BreadcrumbPage>Báo cáo sản lượng theo tác nghiệp</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ReportFilterCard filters={filters} onSearch={handleSearch} />

      {/* Summary by Size */}
      <Card className="p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Thống kê theo kích cỡ</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-[#2c86ff]/10">
              <th className="text-left py-3 px-4">Kích cỡ</th>
              <th className="text-center py-3 px-4">CONT</th>
              <th className="text-center py-3 px-4">TEUS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">20'</td>
              <td className="text-center py-3 px-4">6</td>
              <td className="text-center py-3 px-4">6</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">40'</td>
              <td className="text-center py-3 px-4">2</td>
              <td className="text-center py-3 px-4">4</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">45'</td>
              <td className="text-center py-3 px-4">0</td>
              <td className="text-center py-3 px-4">0</td>
            </tr>
            <tr className="bg-[#2c86ff]/5 font-bold">
              <td className="py-3 px-4">Tổng</td>
              <td className="text-center py-3 px-4">8</td>
              <td className="text-center py-3 px-4">10</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-muted-foreground mt-4">
          Mô tả: Báo cáo sản lượng theo tác nghiệp thống kê sản lượng container đã được vệ sinh hoặc sửa chữa 
          trong khoảng thời gian được chọn.
        </p>
      </Card>

      {/* Detailed Data Table */}
      <DataTable data={data} />
    </div>
  )
}
