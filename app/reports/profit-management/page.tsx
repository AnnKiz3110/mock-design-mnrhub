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
import { InspectionFilters } from "./components/inspection-filters"
import { InspectionDataTable } from "./components/inspection-data-table"
import { getRepairInspectionReports, type RepairInspectionFilterParams } from "@/lib/data-client"

export default function RepairInspectionPage() {
  const [filters, setFilters] = React.useState<RepairInspectionFilterParams>({})
  const [data, setData] = React.useState(getRepairInspectionReports())

  const handleFilterChange = (newFilters: RepairInspectionFilterParams) => {
    setFilters(newFilters)
    setData(getRepairInspectionReports(newFilters))
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
            <BreadcrumbPage>Giám định sửa chữa container</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <InspectionFilters onFilterChange={handleFilterChange} />

      <InspectionDataTable data={data} />
    </div>
  )
}
