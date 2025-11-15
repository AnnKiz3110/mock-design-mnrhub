"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
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

  // class chung cho chiều cao input/select -> đảm bảo bằng nhau
  const fieldClass =
    "h-9 rounded-lg border-gray-300 focus-visible:ring-[#2c86ff] focus-visible:border-[#2c86ff] text-xs bg-white"

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
    <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden h-60">
      {/* giảm padding top/bottom để sát card hơn */}
      <div className="p-3 pb-10 relative mt-[-15]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <fieldset className="border border-gray-300 rounded-lg bg-gray-50/50 shadow-sm">
            <legend className="ml-3 px-2 text-xs font-semibold text-[#2c86ff]">
              Lọc theo thời gian
            </legend>
            {/* giảm pt/pb + space-y cho gọn */}
            <div className="px-3 pb-5 pt-0 space-y-1.5">
              <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
                {/* giảm mt-6 -> mt-3 để tab sát legend/card hơn */}
                <TabsList className="grid grid-cols-4 h-9 bg-white mt-6 p-0.5 rounded-lg w-full shadow-sm">
                  <TabsTrigger
                    value="day"
                    className="text-xs px-2 py-1 rounded-md data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                  >
                    Ngày
                  </TabsTrigger>
                  <TabsTrigger
                    value="month"
                    className="text-xs px-2 py-1 rounded-md data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                  >
                    Tháng
                  </TabsTrigger>
                  <TabsTrigger
                    value="quarter"
                    className="text-xs px-2 py-1 rounded-md data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                  >
                    Quý
                  </TabsTrigger>
                  <TabsTrigger
                    value="year"
                    className="text-xs px-2 py-1 rounded-md data-[state=active]:bg-[#2c86ff] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                  >
                    Năm
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-2 gap-2">
                {timeRange === "day" && (
                  <>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-gray-600">Từ ngày</Label>
                      <Input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className={fieldClass}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-gray-600">Đến ngày</Label>
                      <Input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className={fieldClass}
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
                        className={fieldClass}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-gray-600">Đến tháng</Label>
                      <Input
                        value={monthTo}
                        onChange={(e) => setMonthTo(e.target.value)}
                        placeholder="MM/YYYY"
                        className={fieldClass}
                      />
                    </div>
                  </>
                )}

                {timeRange === "quarter" && (
                  <>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-gray-600">Quý</Label>
                      <Select value={quarter} onValueChange={setQuarter}>
                        <SelectTrigger className={fieldClass}>
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
                        className={fieldClass}
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
                        className={fieldClass}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-gray-600">Đến năm</Label>
                      <Input
                        value={yearTo}
                        onChange={(e) => setYearTo(e.target.value)}
                        placeholder="YYYY"
                        className={fieldClass}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset className="border border-gray-300 rounded-lg bg-gray-50/50 shadow-sm">
            <legend className="ml-3 px-2 text-xs font-semibold text-[#2c86ff]">
              Lọc theo tiêu chí
            </legend>
            <div className="px-3 pb-2 pt-1 space-y-1.5">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Trạng thái</Label>
                  <Select value={trangThai} onValueChange={setTrangThai}>
                    <SelectTrigger className={`${fieldClass} w-36`}>
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
                  <Label className="text-xs font-medium text-gray-600">Hãng tàu</Label>
                  <Select value={chuKT} onValueChange={setChuKT}>
                    <SelectTrigger className={`${fieldClass} w-36`}>
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
                  <Label className="text-xs font-medium text-gray-600">Kích cỡ</Label>
                  <Select value={kichCo} onValueChange={setKichCo}>
                    <SelectTrigger className={`${fieldClass} w-36`}>
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

             

               
            </div>
          </fieldset>
        </div>

        {/* kéo nút lên gần cạnh dưới card hơn */}
        <div className="absolute bottom-[-5] right-3">
          <Button
            onClick={handleSearch}
            className="h-8 px-4 bg-[#2c86ff] hover:bg-[#1a6edb] text-white rounded-lg shadow-md font-medium text-xs transition-all hover:shadow-lg"
          >
            <Search className="h-3.5 w-3.5 mr-1.5" />
            Nạp dữ liệu
          </Button>
        </div>
      </div>
    </Card>
  )
}
