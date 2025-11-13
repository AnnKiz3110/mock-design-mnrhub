"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Download, Printer, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { ContainerReport } from "@/lib/data-client"
import { exportToCSV, exportToExcel, exportToPDF } from "@/lib/export"

interface DataTableProps {
  data: ContainerReport[]
}
const handlePrint = () => {
    // đơn giản là in luôn, nếu sau này muốn in riêng vùng table
    // có thể dùng một component print chuyên biệt
    window.print()
  }
export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")

  const columns: ColumnDef<ContainerReport>[] = [
    {
      accessorKey: "id",
      header: "STT",
      cell: ({ row }) => <div className="w-12 text-sm">{row.index + 1}</div>,
    },
    {
      accessorKey: "soContainer",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-[#2c86ff]/10 h-8 text-sm"
          >
            Số container
            <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium text-sm">{row.getValue("soContainer")}</div>,
    },
    {
      accessorKey: "chuKT",
      header: "Chủ KT",
      cell: ({ row }) => <div className="text-sm">{row.getValue("chuKT")}</div>,
    },
    {
      accessorKey: "iso",
      header: "ISO",
      cell: ({ row }) => <div className="text-sm">{row.getValue("iso")}</div>,
    },
    {
      accessorKey: "plCont",
      header: "PL cont",
      cell: ({ row }) => <div className="text-sm">{row.getValue("plCont")}</div>,
    },
    {
      accessorKey: "ngayVaoBai",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-[#2c86ff]/10 h-8 text-sm"
          >
            Ngày vào bãi
            <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-sm">{row.getValue("ngayVaoBai")}</div>,
    },
    {
      accessorKey: "ngayRaBai",
      header: "Ngày ra bãi",
      cell: ({ row }) => <div className="text-sm">{row.getValue("ngayRaBai")}</div>,
    },
    {
      accessorKey: "trangThai",
      header: "Trạng thái",
      cell: ({ row }) => {
        const status = row.getValue("trangThai") as string
        return (
          <Badge
            variant={status === "Vệ sinh" ? "default" : "secondary"}
            className={`text-xs ${status === "Vệ sinh" ? "bg-blue-500 hover:bg-blue-600" : "bg-orange-500 hover:bg-orange-600"}`}
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "kichCo",
      header: "Kích cỡ",
      cell: ({ row }) => <div className="text-sm">{row.getValue("kichCo")}'</div>,
    },
    {
      accessorKey: "payer",
      header: "Payer",
      cell: ({ row }) => <div className="text-sm">{row.getValue("payer")}</div>,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <Card className="rounded-xl border shadow-sm">
      {/* Toolbar */}
      <div className="p-3 border-b flex items-center justify-between gap-3">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Tìm số container, chủ KT, ISO..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 focus-visible:ring-[#2c86ff] h-9 text-sm"
            />
          </div>
        </div>
         <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="gap-2 bg-transparent h-9"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="text-sm">In</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent h-9">
                <Download className="h-3.5 w-3.5" />
                <span className="text-sm">Xuất</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportToCSV(data)}>Xuất CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportToExcel(data)}>Xuất Excel</DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportToPDF()}>Xuất PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#2c86ff]/10">
  {table.getHeaderGroups().map((headerGroup) => (
    <TableRow key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <TableHead
          key={header.id}
          className="h-10 font-semibold text-[#2c86ff] text-sm"
        >
          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        </TableHead>
      ))}
    </TableRow>
  ))}
</TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-[#2c86ff]/5 h-12"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-sm">
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
