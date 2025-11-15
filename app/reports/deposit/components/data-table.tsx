"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Download, Search, Settings2, GripVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { DepositContainerReport } from "@/lib/deposit-data"
import { exportToCSV, exportToExcel, exportToPDF } from "@/lib/export"

interface DataTableProps {
  data: DepositContainerReport[]
}

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])
  const [draggedColumn, setDraggedColumn] = React.useState<string | null>(null)

  const totalAmount = React.useMemo(() => {
    return data.reduce((sum, item) => sum + item.tienCuoc, 0)
  }, [data])

  const columns: ColumnDef<DepositContainerReport>[] = [
    {
      accessorKey: "stt",
      header: "STT",
      cell: ({ row }) => <div className="w-12 text-sm text-center">{row.getValue("stt")}</div>,
      size: 60,
    },
    {
      accessorKey: "soContainer",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-[#2c86ff]/10 h-8 text-sm whitespace-nowrap w-full"
          >
            Số container
            <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium text-sm whitespace-nowrap text-center">{row.getValue("soContainer")}</div>,
    },
    {
      accessorKey: "hangTau",
      header: "Hãng tàu",
      cell: ({ row }) => <div className="text-sm whitespace-nowrap text-center">{row.getValue("hangTau")}</div>,
    },
    {
      accessorKey: "kichCo",
      header: "Kích cỡ",
      cell: ({ row }) => <div className="text-sm whitespace-nowrap text-center">{row.getValue("kichCo")}</div>,
    },
    {
      accessorKey: "soBaoGia",
      header: "Số báo giá",
      cell: ({ row }) => <div className="text-sm whitespace-nowrap text-center">{row.getValue("soBaoGia")}</div>,
    },
    {
      accessorKey: "ngayBaoGia",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-[#2c86ff]/10 h-8 text-sm whitespace-nowrap w-full"
          >
            Ngày báo giá
            <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-sm whitespace-nowrap text-center">{row.getValue("ngayBaoGia")}</div>,
    },
    {
      accessorKey: "ngayGiamDinh",
      header: "Ngày giảm đình",
      cell: ({ row }) => <div className="text-sm whitespace-nowrap text-center">{row.getValue("ngayGiamDinh")}</div>,
    },
    {
      accessorKey: "ngayCuoc",
      header: "Ngày cược",
      cell: ({ row }) => <div className="text-sm whitespace-nowrap text-center">{row.getValue("ngayCuoc")}</div>,
    },
    {
      accessorKey: "noiDungThuCuoc",
      header: "Nội dung thu cược",
      cell: ({ row }) => <div className="text-sm whitespace-nowrap text-center">{row.getValue("noiDungThuCuoc")}</div>,
    },
    {
      accessorKey: "nguoiThu",
      header: "Người thu",
      cell: ({ row }) => <div className="text-sm whitespace-nowrap text-center">{row.getValue("nguoiThu")}</div>,
    },
    {
      accessorKey: "tienCuoc",
      header: "Tiền cược",
      cell: ({ row }) => <div className="text-sm whitespace-nowrap text-center font-medium">{row.getValue("tienCuoc")}</div>,
    },
    {
      accessorKey: "ghiChu",
      header: "Ghi chú",
      cell: ({ row }) => <div className="text-sm whitespace-nowrap text-center">{row.getValue("ghiChu") || "-"}</div>,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      columnOrder,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  // Drag and drop handlers
  const handleDragStart = (columnId: string) => {
    setDraggedColumn(columnId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetColumnId: string) => {
    if (!draggedColumn || draggedColumn === targetColumnId) {
      setDraggedColumn(null)
      return
    }

    const currentOrder = table.getAllLeafColumns().map((col) => col.id)
    const draggedIndex = currentOrder.indexOf(draggedColumn)
    const targetIndex = currentOrder.indexOf(targetColumnId)

    const newOrder = [...currentOrder]
    newOrder.splice(draggedIndex, 1)
    newOrder.splice(targetIndex, 0, draggedColumn)

    setColumnOrder(newOrder)
    setDraggedColumn(null)
  }

  return (
    <Card className="rounded-xl border shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-3 border-b flex items-center justify-between gap-3">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Tìm số container, số báo giá, người thu..."
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
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id === "stt" ? "STT" :
                         column.id === "soContainer" ? "Số container" :
                         column.id === "hangTau" ? "Hãng tàu" :
                         column.id === "kichCo" ? "Kích cỡ" :
                         column.id === "soBaoGia" ? "Số báo giá" :
                         column.id === "ngayBaoGia" ? "Ngày báo giá" :
                         column.id === "ngayGiamDinh" ? "Ngày giảm đình" :
                         column.id === "ngayCuoc" ? "Ngày cược" :
                         column.id === "noiDungThuCuoc" ? "Nội dung thu cược" :
                         column.id === "nguoiThu" ? "Người thu" :
                         column.id === "tienCuoc" ? "Tiền cược" :
                         column.id === "ghiChu" ? "Ghi chú" :
                         column.id}
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
              <DropdownMenuItem >Xuất CSV</DropdownMenuItem>
              <DropdownMenuItem >Xuất Excel</DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportToPDF()}>Xuất PDF</DropdownMenuItem>
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
                  const isDraggable = header.column.id !== "stt" && header.column.getCanSort()
                  return (
                    <TableHead
                      key={header.id}
                      draggable={isDraggable}
                      onDragStart={() => isDraggable && handleDragStart(header.column.id)}
                      onDragOver={isDraggable ? handleDragOver : undefined}
                      onDrop={() => isDraggable && handleDrop(header.column.id)}
                      className={`h-10 font-semibold text-sm whitespace-nowrap border-r border-gray-200 last:border-r-0 bg-[#2c86ff]/10 text-[#2c86ff] text-center group relative ${
                        draggedColumn === header.column.id ? "opacity-50" : ""
                      } ${isDraggable ? "cursor-move" : ""}`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {isDraggable && (
                          <GripVertical className="h-3.5 w-3.5 text-[#2c86ff]/50 group-hover:text-[#2c86ff]" />
                        )}
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
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
                    className={`hover:bg-[#2c86ff]/5 h-12 border-b border-gray-200 ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <TableCell 
                        key={cell.id} 
                        className={`py-2 whitespace-nowrap border-r border-gray-200 last:border-r-0 text-center ${
                          cellIndex === 0 ? "bg-[#2c86ff]/10 font-medium text-[#2c86ff]" : ""
                        }`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow className="bg-blue-50 border-b-2 border-blue-200 font-semibold hover:bg-blue-50">
                  <TableCell colSpan={10} className="text-center text-sm py-3 border-r border-gray-200 text-blue-900">
                    Tổng
                  </TableCell>
                  <TableCell className="text-center text-sm py-3 border-r border-gray-200 text-blue-900 font-bold">
                    {totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center text-sm py-3 border-r border-gray-200 text-blue-900">
                    -
                  </TableCell>
                </TableRow>
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
