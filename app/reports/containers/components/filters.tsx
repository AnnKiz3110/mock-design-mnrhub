"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FilterParams } from "@/lib/data-client"

interface FiltersProps {
  onFilterChange: (filters: FilterParams) => void
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [timeRange, setTimeRange] = React.useState<"day" | "month" | "quarter" | "year">("day")

  // Ngày
  const [dateFrom, setDateFrom] = React.useState("")
  const [dateTo, setDateTo] = React.useState("")

  // Tháng
  const [monthFrom, setMonthFrom] = React.useState("10/2025")
  const [monthTo, setMonthTo] = React.useState("11/2025")

  // Quý
  const [quarter, setQuarter] = React.useState("4")
  const [quarterYear, setQuarterYear] = React.useState("2025")

  // Năm
  const [yearFrom, setYearFrom] = React.useState("2025")
  const [yearTo, setYearTo] = React.useState("2025")

  const [trangThai, setTrangThai] = React.useState("Tất cả")
  const [chuKT, setChuKT] = React.useState("Tất cả")
  const [kichCo, setKichCo] = React.useState("Tất cả")
  const [phanLoaiContainer, setPhanLoaiContainer] = React.useState("Tất cả")
  const [payer, setPayer] = React.useState("Tất cả")

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

    onFilterChange({
      dateFrom: effectiveDateFrom,
      dateTo: effectiveDateTo,
      trangThai: trangThai === "Tất cả" ? undefined : trangThai,
      kichCo: kichCo === "Tất cả" ? undefined : kichCo,
      payer: payer === "Tất cả" ? undefined : payer,
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      {/* ===== LỌC THEO THỜI GIAN ===== */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-[-10]">Lọc theo thời gian</h3>

        <div className="grid grid-cols-6 gap-4 items-end">
          {/* Tabs - takes 4 columns */}
          <div className="col-span-4">
            <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
              <TabsList className="grid grid-cols-4 h-11 bg-gray-100/80 p-1 rounded-xl w-full">
                <TabsTrigger
                  value="day"
                  className="text-sm font-medium rounded-lg data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                >
                  Ngày
                </TabsTrigger>
                <TabsTrigger
                  value="month"
                  className="text-sm font-medium rounded-lg data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                >
                  Tháng
                </TabsTrigger>
                <TabsTrigger
                  value="quarter"
                  className="text-sm font-medium rounded-lg data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                >
                  Quý
                </TabsTrigger>
                <TabsTrigger
                  value="year"
                  className="text-sm font-medium rounded-lg data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                >
                  Năm
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Date Range Inputs - takes 2 columns, equal widths */}
          {timeRange === "day" && (
            <>
              <div className="space-y-2 col-span-1">
                <Label className="text-xs font-medium text-gray-600">Từ ngày</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="h-11 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] w-full"
                />
              </div>
              <div className="space-y-2 col-span-1">
                <Label className="text-xs font-medium text-gray-600">Đến ngày</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="h-11 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] w-full"
                />
              </div>
            </>
          )}

          {timeRange === "month" && (
            <>
              <div className="space-y-2 col-span-1">
                <Label className="text-xs font-medium text-gray-600">Từ tháng</Label>
                <Input
                  value={monthFrom}
                  onChange={(e) => setMonthFrom(e.target.value)}
                  placeholder="MM/YYYY"
                  className="h-11 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] w-full"
                />
              </div>
              <div className="space-y-2 col-span-1">
                <Label className="text-xs font-medium text-gray-600">Đến tháng</Label>
                <Input
                  value={monthTo}
                  onChange={(e) => setMonthTo(e.target.value)}
                  placeholder="MM/YYYY"
                  className="h-11 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] w-full"
                />
              </div>
            </>
          )}

          {timeRange === "quarter" && (
            <>
              <div className="space-y-2 col-span-1">
                <Label className="text-xs font-medium text-gray-600">Quý</Label>
                <Select value={quarter} onValueChange={setQuarter}>
                  <SelectTrigger className="h-11 rounded-xl border-gray-300 focus:ring-[#2c86ff] w-full">
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
              <div className="space-y-2 col-span-1">
                <Label className="text-xs font-medium text-gray-600">Năm</Label>
                <Input
                  value={quarterYear}
                  onChange={(e) => setQuarterYear(e.target.value)}
                  placeholder="YYYY"
                  className="h-11 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] w-full"
                />
              </div>
            </>
          )}

          {timeRange === "year" && (
            <>
              <div className="space-y-2 col-span-1">
                <Label className="text-xs font-medium text-gray-600">Từ năm</Label>
                <Input
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  placeholder="YYYY"
                  className="h-11 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] w-full"
                />
              </div>
              <div className="space-y-2 col-span-1">
                <Label className="text-xs font-medium text-gray-600">Đến năm</Label>
                <Input
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  placeholder="YYYY"
                  className="h-11 rounded-xl border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] w-full"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Divider between two filter sections */}
      <div className="h-px bg-gray-200 mb-6" />

      {/* ===== LỌC THEO TIÊU CHÍ ===== */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Lọc theo tiêu chí</h3>

        <div className="space-y-4">
          {/* First row: 3 filters with separators */}
          <div className="grid grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-600">Trạng thái</Label>
              <Select value={trangThai} onValueChange={setTrangThai}>
                <SelectTrigger className="h-11 rounded-xl border-gray-300 focus:ring-[#2c86ff] w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả">Tất cả</SelectItem>
                  <SelectItem value="Vệ sinh">Vệ sinh</SelectItem>
                  <SelectItem value="Sửa chữa">Sửa chữa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 relative">
              {/* Separator before this field */}
              <div className="absolute -left-2 bottom-[-10] w-px h-11 bg-gray-200" />
              <Label className="text-xs font-medium text-gray-600">Hãng tàu</Label>
              <Select value={chuKT} onValueChange={setChuKT}>
                <SelectTrigger className="h-11 rounded-xl border-gray-300 focus:ring-[#2c86ff] w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả">Tất cả</SelectItem>
                  <SelectItem value="CMA">CMA</SelectItem>
                  <SelectItem value="MSC">MSC</SelectItem>
                  <SelectItem value="ZIM">ZIM</SelectItem>
                  <SelectItem value="MAE">MAE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 relative">
              {/* Separator before this field */}
              <div className="absolute -left-2 bottom-[-10] w-px h-11 bg-gray-200" />
              <Label className="text-xs font-medium text-gray-600">Kích cỡ</Label>
              <Select value={kichCo} onValueChange={setKichCo}>
                <SelectTrigger className="h-11 rounded-xl border-gray-300 focus:ring-[#2c86ff] w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả">Tất cả</SelectItem>
                  <SelectItem value="20">20&apos;</SelectItem>
                  <SelectItem value="40">40&apos;</SelectItem>
                  <SelectItem value="45">45&apos;</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Second row: 2 filters with separator */}
          <div className="grid grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-600">Tình trạng</Label>
              <Select value={phanLoaiContainer} onValueChange={setPhanLoaiContainer}>
                <SelectTrigger className="h-11 rounded-xl border-gray-300 focus:ring-[#2c86ff] w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả">Tất cả</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 relative">
              {/* Separator before this field */}
              <div className="absolute -left-2 bottom-[-10] w-px h-11 bg-gray-200" />
              <Label className="text-xs font-medium text-gray-600">ĐTTT</Label>
              <Select value={payer} onValueChange={setPayer}>
                <SelectTrigger className="h-11 rounded-xl border-gray-300 focus:ring-[#2c86ff] w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả">Tất cả</SelectItem>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="S">S</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Empty space to maintain 3-column grid alignment */}
            <div />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSearch}
              className="h-11 px-8 bg-[#2c86ff] hover:bg-[#1a6edb] text-white rounded-xl shadow-sm font-medium"
            >
              <Search className="h-4 w-4 mr-2" />
              Tra cứu
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
