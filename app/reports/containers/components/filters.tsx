"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  const [trachNhiem, setTrachNhiem] = React.useState("Tất cả")
  const [chuKT, setChuKT] = React.useState("Tất cả")
  const [kichCo, setKichCo] = React.useState("Tất cả")
  const [phanLoaiContainer, setPhanLoaiContainer] = React.useState("Tất cả")
  const [loaiContainer, setLoaiContainer] = React.useState("Tất cả")
  const [payer, setPayer] = React.useState("Tất cả")

  const controlClass = "h-9 text-xs w-full focus:ring-[#2c86ff]"

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
      loaiContainer: loaiContainer === "Tất cả" ? undefined : loaiContainer,
      payer: payer === "Tất cả" ? undefined : payer,
    })
  }

  return (
    <div className="bg-white border rounded-xl p-4 space-y-4">
      {/* GRID 2 CỘT: BÊN TRÁI = THỜI GIAN, BÊN PHẢI = FILTER KHÁC */}
      <div className="grid gap-2 md:grid-cols-12">
        {/* ===== BÊN TRÁI: TIME RANGE ===== */}
        <div className="md:col-span-5 space-y-3 max-w-md">
          <Tabs
            value={timeRange}
            onValueChange={(v) => setTimeRange(v as any)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 h-9 w-full">
              <TabsTrigger value="day" className="text-xs">
                Ngày
              </TabsTrigger>
              <TabsTrigger value="month" className="text-xs">
                Tháng
              </TabsTrigger>
              <TabsTrigger value="quarter" className="text-xs">
                Quý
              </TabsTrigger>
              <TabsTrigger value="year" className="text-xs">
                Năm
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* các trường thời gian – cùng độ rộng với TabsList */}
          {timeRange === "day" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <div className="space-y-1">
                <Label className="text-xs text-blue-600">Từ ngày</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className={controlClass}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-blue-600">Đến ngày</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className={controlClass}
                />
              </div>
            </div>
          )}

          {timeRange === "month" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <div className="space-y-1">
                <Label className="text-xs text-blue-600">Từ tháng</Label>
                <Input
                  value={monthFrom}
                  onChange={(e) => setMonthFrom(e.target.value)}
                  placeholder="MM/YYYY"
                  className={controlClass}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-blue-600">Đến tháng</Label>
                <Input
                  value={monthTo}
                  onChange={(e) => setMonthTo(e.target.value)}
                  placeholder="MM/YYYY"
                  className={controlClass}
                />
              </div>
            </div>
          )}

          {timeRange === "quarter" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <div className="space-y-1">
                <Label className="text-xs text-blue-600">Quý</Label>
                <Select value={quarter} onValueChange={setQuarter}>
                  <SelectTrigger className={controlClass}>
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
                <Label className="text-xs text-blue-600">Năm</Label>
                <Input
                  value={quarterYear}
                  onChange={(e) => setQuarterYear(e.target.value)}
                  placeholder="YYYY"
                  className={controlClass}
                />
              </div>
            </div>
          )}

          {timeRange === "year" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <div className="space-y-1">
                <Label className="text-xs text-blue-600">Từ năm</Label>
                <Input
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  placeholder="YYYY"
                  className={controlClass}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-blue-600">Đến năm</Label>
                <Input
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  placeholder="YYYY"
                  className={controlClass}
                />
              </div>
            </div>
          )}
        </div>

        {/* ===== BÊN PHẢI: CÁC FILTER KHÁC + NÚT TRA CỨU ===== */}
        <div className="md:col-span-7 flex flex-col gap-3">
          {/* 3 combobox / 1 hàng, độ dài bằng nhau */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Trạng thái *</Label>
              <Select value={trangThai} onValueChange={setTrangThai}>
                <SelectTrigger className={controlClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả">Tất cả</SelectItem>
                  <SelectItem value="Vệ sinh">Vệ sinh</SelectItem>
                  <SelectItem value="Sửa chữa">Sửa chữa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Hãng tàu</Label>
              <Select value={chuKT} onValueChange={setChuKT}>
                <SelectTrigger className={controlClass}>
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

            <div className="space-y-1">
              <Label className="text-xs">Kích cỡ</Label>
              <Select value={kichCo} onValueChange={setKichCo}>
                <SelectTrigger className={controlClass}>
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

            <div className="space-y-1">
              <Label className="text-xs">Tình trạng container</Label>
              <Select value={phanLoaiContainer} onValueChange={setPhanLoaiContainer}>
                <SelectTrigger className={controlClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả">Tất cả</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">ĐTTT</Label>
              <Select value={payer} onValueChange={setPayer}>
                <SelectTrigger className={controlClass}>
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
          </div>

          {/* nút tra cứu – sát cạnh dưới, bên phải */}
          <div className="flex justify-end">
            <Button
              onClick={handleSearch}
              size="sm"
              className="bg-[#2c86ff] hover:bg-[#1568db] text-white h-9 px-6"
            >
              <Search className="h-3 w-3 mr-1" />
              Tra cứu
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
