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
import { ArrowUpDown, Download, Search, Settings2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { RepairInspectionReport } from "@/lib/data-client"

interface InspectionDataTableProps {
  data: RepairInspectionReport[]
}

export function InspectionDataTable({ data }: InspectionDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const columns: ColumnDef<RepairInspectionReport>[] = [
    {
      accessorKey: "id",
      header: "STT",
      cell: ({ row }) => <div className="w-12 text-xs text-center">{row.getValue("id")}</div>,
      size: 50,
    },
    {
      accessorKey: "estimateNo",
      header: "EstimateNo",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("estimateNo") || "-"}</div>,
    },
    {
      accessorKey: "containerNo",
      header: "ContainerNo",
      cell: ({ row }) => <div className="text-xs font-medium whitespace-nowrap text-center">{row.getValue("containerNo") || "-"}</div>,
    },
    {
      accessorKey: "sztp",
      header: "SZ/TP",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("sztp") || "-"}</div>,
    },
    {
      accessorKey: "oprId",
      header: "OprID",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("oprId") || "-"}</div>,
    },
    {
      accessorKey: "condition",
      header: "Condition",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("condition") || "-"}</div>,
    },
    {
      accessorKey: "timeIn",
      header: "TimeIn",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("timeIn") || "-"}</div>,
    },
    {
      accessorKey: "estimateDate",
      header: "Estimate Date",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("estimateDate") || "-"}</div>,
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("vendor") || "-"}</div>,
    },
    {
      accessorKey: "approvalDate",
      header: "Approval Date",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("approvalDate") || "-"}</div>,
    },
    {
      accessorKey: "repairDate",
      header: "Repair Date",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("repairDate") || "-"}</div>,
    },
    {
      accessorKey: "completedDate",
      header: "Completed Date",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("completedDate") || "-"}</div>,
    },
    {
      accessorKey: "cancelDate",
      header: "Cancel Date",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("cancelDate") || "-"}</div>,
    },
    {
      accessorKey: "com",
      header: "COM",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("com") || "-"}</div>,
    },
    {
      accessorKey: "loc",
      header: "LOC",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("loc") || "-"}</div>,
    },
    {
      accessorKey: "dam",
      header: "DAM",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("dam") || "-"}</div>,
    },
    {
      accessorKey: "rep",
      header: "REP",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("rep") || "-"}</div>,
    },
    {
      accessorKey: "length",
      header: "Length",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("length")}</div>,
    },
    {
      accessorKey: "width",
      header: "Width",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("width")}</div>,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("quantity")}</div>,
    },
    {
      accessorKey: "hours",
      header: "Hours",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("hours")}</div>,
    },
    {
      accessorKey: "laborCost",
      header: "Labor Cost",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("laborCost")}</div>,
    },
    {
      accessorKey: "mateCost",
      header: "Mate Cost",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("mateCost")}</div>,
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => <div className="text-xs font-semibold whitespace-nowrap text-center">{row.getValue("total")}</div>,
    },
    {
      accessorKey: "payer",
      header: "Payer",
      cell: ({ row }) => <div className="text-xs whitespace-nowrap text-center">{row.getValue("payer") || "-"}</div>,
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
        pageSize: 10,
      },
    },
  })

  // Calculate subtotals and totals
  const calculateSubtotals = () => {
    const subtotals = {
      hours: 0,
      laborCost: 0,
      mateCost: 0,
      total: 0
    }

    data.forEach(row => {
      subtotals.hours += row.hours
      subtotals.laborCost += row.laborCost
      subtotals.mateCost += row.mateCost
      subtotals.total += row.total
    })

    return subtotals
  }

  const subtotals = calculateSubtotals()

  return (
    <Card className="rounded-xl border shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-3 border-b flex items-center justify-between gap-3">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Tìm container, estimate..."
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
                {/* Subtotal Row */}
                <TableRow className="bg-blue-50 font-semibold border-b-2 border-blue-200">
                  <TableCell colSpan={20} className="text-xs text-center border-r border-gray-200">
                    Tổng
                  </TableCell>
                  <TableCell className="text-xs text-center border-r border-gray-200">{subtotals.hours.toFixed(2)}</TableCell>
                  <TableCell className="text-xs text-center border-r border-gray-200">{subtotals.laborCost.toFixed(2)}</TableCell>
                  <TableCell className="text-xs text-center border-r border-gray-200">{subtotals.mateCost.toFixed(2)}</TableCell>
                  <TableCell className="text-xs text-center border-r border-gray-200">{subtotals.total.toFixed(2)}</TableCell>
                  <TableCell className="text-xs text-center"></TableCell>
                </TableRow>
                {/* Grand Total Row */}
                <TableRow className="bg-blue-100 font-bold border-b-2 border-blue-300">
                  <TableCell colSpan={20} className="text-xs text-center border-r border-gray-200">
                    Tổng cộng
                  </TableCell>
                  <TableCell className="text-xs text-center border-r border-gray-200">{subtotals.hours.toFixed(2)}</TableCell>
                  <TableCell className="text-xs text-center border-r border-gray-200">{subtotals.laborCost.toFixed(2)}</TableCell>
                  <TableCell className="text-xs text-center border-r border-gray-200">{subtotals.mateCost.toFixed(2)}</TableCell>
                  <TableCell className="text-xs text-center border-r border-gray-200">{subtotals.total.toFixed(2)}</TableCell>
                  <TableCell className="text-xs text-center"></TableCell>
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
