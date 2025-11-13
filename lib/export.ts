import type { ContainerReport } from "./data-client"

export function exportToCSV(data: ContainerReport[], filename = "container-report.csv") {
  const headers = [
    "STT",
    "Số container",
    "Chủ KT",
    "ISO",
    "PL cont",
    "Ngày vào bãi",
    "Ngày ra bãi",
    "Trạng thái",
    "Kích cỡ",
    "Payer",
  ]

  const rows = data.map((item, index) => [
    index + 1,
    item.soContainer,
    item.chuKT,
    item.iso,
    item.plCont,
    item.ngayVaoBai,
    item.ngayRaBai,
    item.trangThai,
    item.kichCo,
    item.payer,
  ])

  const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

  const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

export function exportToExcel(data: ContainerReport[], filename = "container-report.xlsx") {
  // Simple XLSX export using CSV format with .xlsx extension
  // For production, use a library like xlsx or exceljs
  exportToCSV(data, filename)
}

export function exportToPDF() {
  // Trigger browser print dialog
  window.print()
}
