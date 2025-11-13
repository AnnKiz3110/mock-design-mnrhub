"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Filters } from "./components/filters"
import { KPICards } from "./components/kpi-cards"
import { DataTable } from "./components/data-table"
import { getContainerReports, getKPIStats, type FilterParams } from "@/lib/data-client"

export default function ContainersReportPage() {
  const [filters, setFilters] = React.useState<FilterParams>({})
  const [data, setData] = React.useState(getContainerReports())

  const stats = React.useMemo(() => getKPIStats(data), [data])

  const handleFilterChange = (newFilters: FilterParams) => {
    setFilters(newFilters)
    setData(getContainerReports(newFilters))
  }

  return (
    <div className="space-y-2">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/reports">Báo cáo</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Báo cáo vệ sinh & sửa chữa container</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Filters */}
      <Filters onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-2">
        {/* KPI Cards */}
        <KPICards stats={stats} />

        {/* Data Table */}
        <DataTable data={data} />
      </div>
    </div>
  )
}
