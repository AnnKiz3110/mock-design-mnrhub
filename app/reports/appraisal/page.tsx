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
import { DataTable } from "@/app/reports/containers/components/data-table"
import { getContainerReports } from "@/lib/data-client"

const filters: FilterConfig[] = [
  {
    id: "trangThai",
    label: "Trạng thái",
    options: [
      { value: "all", label: "Tất cả" },
      { value: "pending", label: "Chờ báo giá" },
      { value: "approved", label: "Đã duyệt" },
      { value: "completed", label: "Hoàn tất" },
    ],
  },
  {
    id: "hangTau",
    label: "Hãng tàu",
    options: [
      { value: "all", label: "Tất cả" },
      { value: "MAE", label: "MAE" },
      { value: "GMD", label: "GMD" },
      { value: "ZIM", label: "ZIM" },
      { value: "CMA", label: "CMA" },
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
    id: "loaiCont",
    label: "Loại cont",
    options: [
      { value: "all", label: "Tất cả" },
      { value: "DC", label: "DC" },
      { value: "HC", label: "HC" },
      { value: "RF", label: "RF" },
    ],
  },
  {
    id: "payer",
    label: "Payer",
    options: [
      { value: "all", label: "Tất cả" },
      { value: "owner", label: "Owner" },
      { value: "shipper", label: "Shipper" },
    ],
  },
]

export default function AppraisalReportPage() {
  const [data, setData] = React.useState(getContainerReports())

  const handleSearch = (values: Record<string, string>) => {
    console.log("[v0] Appraisal filter values:", values)
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
            <BreadcrumbPage>Báo cáo giám định</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ReportFilterCard filters={filters} onSearch={handleSearch} />
      <DataTable data={data} />
    </div>
  )
}
