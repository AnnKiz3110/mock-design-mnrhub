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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filters } from "./components/filters"
import { SummaryTable } from "./components/summary-table"
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
            <BreadcrumbPage>Báo cáo vệ sinh & sửa chữa container</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Filters onFilterChange={handleFilterChange} />

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 h-11 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger 
            value="summary" 
            className="rounded-lg data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-md transition-all font-medium"
          >
            Thống kê tổng hợp
          </TabsTrigger>
          <TabsTrigger 
            value="detail" 
            className="rounded-lg data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-md transition-all font-medium"
          >
            Chi tiết
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="mt-4">
          <SummaryTable stats={stats} />
        </TabsContent>
        
        <TabsContent value="detail" className="mt-4">
          <DataTable data={data} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
