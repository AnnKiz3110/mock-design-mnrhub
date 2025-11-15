"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Download, Search, Settings2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { MRProductionReport } from "@/lib/output-report-data"

interface MRProductionTableProps {
  data: MRProductionReport[]
}

export function MRProductionTable({ data }: MRProductionTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const columns: ColumnDef<MRProductionReport>[] = [
    {
  accessorKey: "stt",
  header: () => <div className="text-center w-full">STT</div>,
  cell: ({ row }) => (
    <div className="text-center w-full text-xs font-medium">
      {row.getValue("stt")}
    </div>
  ),
}
,
    {
      accessorKey: "hangTau",
      header: "Hãng tàu",
      cell: ({ row }) => <div className="text-xs font-medium whitespace-nowrap text-center">{row.getValue("hangTau")}</div>,
    },
    {
      accessorKey: "kichCo",
      header: "Kích cỡ",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("kichCo")}</div>,
    },
    {
      accessorKey: "tinhTrangCont",
      header: "Tình trạng cont",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("tinhTrangCont")}</div>,
    },
    {
      accessorKey: "dttt",
      header: "ĐTTT",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("dttt") || "Owner"}</div>,
    },
    {
      accessorKey: "ngayVaoBai",
      header: "Ngày vào bãi",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("ngayVaoBai")}</div>,
    },
    {
      accessorKey: "ngayBaoGia",
      header: "Ngày báo giá",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("ngayBaoGia")}</div>,
    },
    {
      accessorKey: "ngayHoanTat",
      header: "Ngày hoàn tất",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("ngayHoanTat")}</div>,
    },
    {
      accessorKey: "gio",
      header: "Giờ",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("gio")}</div>,
    },
    {
      accessorKey: "soLuong",
      header: "Số lượng",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("soLuong")}</div>,
    },
    {
      accessorKey: "tongTien",
      header: "Tổng tiền",
      cell: ({ row }) => <div className="text-xs font-semibold whitespace-nowrap text-center">{row.getValue("tongTien")}</div>,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  })

  const calculateTotals = () => {
    const totals = {
      gio: 0,
      soLuong: 0,
      tongTien: 0
    }

    data.forEach(row => {
      totals.gio += row.gio
      totals.soLuong += row.soLuong
      totals.tongTien += row.tongTien
    })

    return totals
  }

  const totals = calculateTotals()

  return (
    <Card className="rounded-xl border shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-3 border-b flex items-center justify-between gap-3">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Tìm hãng tàu..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 focus-visible:ring-[#2c86ff] h-9 text-sm"
            />
          </div>
        </div>
      
        <div className="flex items-center gap-2">
          {/* Column Visibility Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent h-9">
                <Settings2 className="h-3.5 w-3.5" />
                <span className="text-sm">Cột</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Hiển thị cột</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-[300px]">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize text-xs"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent h-9">
                <Download className="h-3.5 w-3.5" />
                <span className="text-sm">Xuất</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Xuất CSV</DropdownMenuItem>
              <DropdownMenuItem>Xuất Excel</DropdownMenuItem>
              <DropdownMenuItem>Xuất PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table with Horizontal Scroll */}
      <div className="overflow-x-auto relative">
        <Table className="min-w-full w-max">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-9 font-semibold text-xs whitespace-nowrap border-r border-gray-200 last:border-r-0 bg-[#2c86ff]/10 text-[#2c86ff] text-center"
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`hover:bg-[#2c86ff]/5 h-10 border-b border-gray-200 ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <TableCell 
                        key={cell.id} 
                        className={`py-1.5 whitespace-nowrap border-r border-gray-200 last:border-r-0 text-center ${
                          cellIndex === 0 ? "bg-[#2c86ff]/10 font-medium text-[#2c86ff]" : ""
                        }`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
           
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-sm border-b border-gray-200">
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-3 border-t flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Hiển thị {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}{" "}
          trong {table.getFilteredRowModel().rows.length} bản ghi
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 text-xs"
          >
            Trước
          </Button>
          <div className="text-xs">
            Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 text-xs"
          >
            Sau
          </Button>
        </div>
      </div>
    </Card>
  )
}
