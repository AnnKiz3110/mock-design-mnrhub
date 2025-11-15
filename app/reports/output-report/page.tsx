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
import { MRProductionFilters } from "./components/mr-production-filters"
import { MRProductionTable } from "./components/mr-production-table"
import { getMRProductionReports, type MRProductionFilterParams } from "@/lib/output-report-data"

export default function MRProductionPage() {
  const [filters, setFilters] = React.useState<MRProductionFilterParams>({})
  const [data, setData] = React.useState(getMRProductionReports())

  const handleFilterChange = (newFilters: MRProductionFilterParams) => {
    setFilters(newFilters)
    setData(getMRProductionReports(newFilters))
  }

  return (
    <div className="space-y-4">
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
            <BreadcrumbPage>Báo cáo sản lượng M&R</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <MRProductionFilters onFilterChange={handleFilterChange} />

      <MRProductionTable data={data} />
    </div>
  )
}
