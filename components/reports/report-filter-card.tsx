"use client"

import * as React from "react"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export interface FilterConfig {
  id: string
  label: string
  options: { value: string; label: string }[]
}

export interface ReportFilterCardProps {
  filters: FilterConfig[]
  onSearch: (values: Record<string, string>) => void
  onTimeRangeChange?: (timeRange: string, from: string, to: string) => void
}

export function ReportFilterCard({ filters, onSearch, onTimeRangeChange }: ReportFilterCardProps) {
  const [timeRange, setTimeRange] = React.useState<"day" | "month" | "quarter" | "year">("day")

  // Date inputs
  const [dateFrom, setDateFrom] = React.useState("2025-11-01")
  const [dateTo, setDateTo] = React.useState("2025-11-11")

  // Month inputs
  const [monthFrom, setMonthFrom] = React.useState("10/2025")
  const [monthTo, setMonthTo] = React.useState("11/2025")

  // Quarter inputs
  const [quarter, setQuarter] = React.useState("4")
  const [quarterYear, setQuarterYear] = React.useState("2025")

  // Year inputs
  const [yearFrom, setYearFrom] = React.useState("2025")
  const [yearTo, setYearTo] = React.useState("2025")

  // Filter values
  const [filterValues, setFilterValues] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    filters.forEach(filter => {
      initial[filter.id] = filter.options[0]?.value || ""
    })
    return initial
  })

  const handleFilterChange = (id: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [id]: value }))
  }

  const handleSearch = () => {
    let effectiveDateFrom = ""
    let effectiveDateTo = ""

    if (timeRange === "day") {
      effectiveDateFrom = dateFrom
      effectiveDateTo = dateTo
    } else if (timeRange === "month") {
      const [monthStart, yearStart] = monthFrom.split("/")
      const [monthEnd, yearEnd] = monthTo.split("/")
      effectiveDateFrom = `${yearStart}-${monthStart.padStart(2, "0")}-01`
      const lastDay = new Date(Number.parseInt(yearEnd), Number.parseInt(monthEnd), 0).getDate()
      effectiveDateTo = `${yearEnd}-${monthEnd.padStart(2, "0")}-${lastDay}`
    } else if (timeRange === "quarter") {
      const quarterNum = Number.parseInt(quarter)
      const startMonth = (quarterNum - 1) * 3 + 1
      const endMonth = quarterNum * 3
      effectiveDateFrom = `${quarterYear}-${String(startMonth).padStart(2, "0")}-01`
      const lastDay = new Date(Number.parseInt(quarterYear), endMonth, 0).getDate()
      effectiveDateTo = `${quarterYear}-${String(endMonth).padStart(2, "0")}-${lastDay}`
    } else if (timeRange === "year") {
      effectiveDateFrom = `${yearFrom}-01-01`
      effectiveDateTo = `${yearTo}-12-31`
    }

    onTimeRangeChange?.(timeRange, effectiveDateFrom, effectiveDateTo)
    onSearch({ ...filterValues, dateFrom: effectiveDateFrom, dateTo: effectiveDateTo })
  }

  // Split filters into rows of 5
  const filterRows = []
  for (let i = 0; i < filters.length; i += 5) {
    filterRows.push(filters.slice(i, i + 5))
  }

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      {/* Time Range Filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Lọc theo thời gian</h3>
        
        <div className="flex items-end gap-3">
          {/* Tabs */}
          <div className="flex-shrink-0">
            <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
              <TabsList className="grid grid-cols-4 h-9 bg-gray-100/80 p-1 rounded-xl">
                <TabsTrigger
                  value="day"
                  className="text-xs px-3 py-1 rounded-lg data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                >
                  Ngày
                </TabsTrigger>
                <TabsTrigger
                  value="month"
                  className="text-xs px-3 py-1 rounded-lg data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                >
                  Tháng
                </TabsTrigger>
                <TabsTrigger
                  value="quarter"
                  className="text-xs px-3 py-1 rounded-lg data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                >
                  Quý
                </TabsTrigger>
                <TabsTrigger
                  value="year"
                  className="text-xs px-3 py-1 rounded-lg data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                >
                  Năm
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Date Inputs - On same row as tabs */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            {timeRange === "day" && (
              <>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Từ ngày</Label>
                  <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="h-9 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Đến ngày</Label>
                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="h-9 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] text-xs"
                  />
                </div>
              </>
            )}

            {timeRange === "month" && (
              <>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Từ tháng</Label>
                  <Input
                    value={monthFrom}
                    onChange={(e) => setMonthFrom(e.target.value)}
                    placeholder="MM/YYYY"
                    className="h-9 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Đến tháng</Label>
                  <Input
                    value={monthTo}
                    onChange={(e) => setMonthTo(e.target.value)}
                    placeholder="MM/YYYY"
                    className="h-9 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] text-xs"
                  />
                </div>
              </>
            )}

            {timeRange === "quarter" && (
              <>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Quý</Label>
                  <Select value={quarter} onValueChange={setQuarter}>
                    <SelectTrigger className="h-9 rounded-xl border-gray-300 focus:ring-[#2c86ff] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Quý 1</SelectItem>
                      <SelectItem value="2">Quý 2</SelectItem>
                      <SelectItem value="3">Quý 3</SelectItem>
                      <SelectItem value="4">Quý 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Năm</Label>
                  <Input
                    value={quarterYear}
                    onChange={(e) => setQuarterYear(e.target.value)}
                    placeholder="YYYY"
                    className="h-9 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] text-xs"
                  />
                </div>
              </>
            )}

            {timeRange === "year" && (
              <>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Từ năm</Label>
                  <Input
                    value={yearFrom}
                    onChange={(e) => setYearFrom(e.target.value)}
                    placeholder="YYYY"
                    className="h-9 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Đến năm</Label>
                  <Input
                    value={yearTo}
                    onChange={(e) => setYearTo(e.target.value)}
                    placeholder="YYYY"
                    className="h-9 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] text-xs"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Criteria Filters */}
      {filters.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">Lọc theo tiêu chí</h3>
          
          {filterRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-3">
              {row.map((filter) => (
                <div key={filter.id} className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">{filter.label}</Label>
                  <Select 
                    value={filterValues[filter.id]} 
                    onValueChange={(value) => handleFilterChange(filter.id, value)}
                  >
                    <SelectTrigger className="h-9 rounded-xl border-gray-300 focus:ring-[#2c86ff] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filter.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              {/* Fill remaining slots with empty divs */}
              {Array.from({ length: 5 - row.length }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
            </div>
          ))}

          {/* Search Button */}
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSearch}
              className="h-9 px-6 bg-[#2c86ff] hover:bg-[#1a6edb] text-white rounded-xl shadow-sm font-medium text-sm"
            >
              <Search className="h-4 w-4 mr-2" />
              Nạp dữ liệu
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
