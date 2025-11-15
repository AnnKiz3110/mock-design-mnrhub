import containersData from "@/data/reports-containers.json"

export interface ContainerReport {
  id: number
  soContainer: string
  hangTau: string
  chuKT: string
  iso: string
  plCont: string
  ngayVaoBai: string
  viTri: string
  ngayBaoGia: string
  ngayHTDuyet: string
  ngayHoanTat: string
  soBaoGia: string
  payer: string
  ngayRaBai: string
  trangThai: string
  kichCo: string
  loaiContainer: string
  vssc: string
  gio: string
  tongTien: string
  donViThucHien: string
}

export interface FilterParams {
  dateFrom?: string
  dateTo?: string
  trangThai?: string
  chuKT?: string
  kichCo?: string
  loaiContainer?: string
  payer?: string
  searchTerm?: string
}

export function getContainerReports(filters?: FilterParams): ContainerReport[] {
  let data = [...containersData] as ContainerReport[]

  if (!filters) return data

  // Filter by date range
  if (filters.dateFrom) {
    data = data.filter((item) => item.ngayVaoBai >= filters.dateFrom!)
  }
  if (filters.dateTo) {
    data = data.filter((item) => item.ngayVaoBai <= filters.dateTo!)
  }

  // Filter by status
  if (filters.trangThai && filters.trangThai !== "Tất cả") {
    data = data.filter((item) => item.trangThai === filters.trangThai)
  }

  // Filter by owner
  if (filters.chuKT && filters.chuKT !== "Tất cả") {
    data = data.filter((item) => item.chuKT === filters.chuKT)
  }

  // Filter by size
  if (filters.kichCo && filters.kichCo !== "Tất cả") {
    data = data.filter((item) => item.kichCo === filters.kichCo)
  }

  // Filter by payer
  if (filters.payer && filters.payer !== "Tất cả") {
    data = data.filter((item) => item.payer === filters.payer)
  }

  // Search term
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase()
    data = data.filter(
      (item) =>
        item.soContainer.toLowerCase().includes(term) ||
        item.chuKT.toLowerCase().includes(term) ||
        item.iso.toLowerCase().includes(term),
    )
  }

  return data
}

export function getKPIStats(data: ContainerReport[]) {
  const total = data.length
  const veSinh = data.filter((item) => item.trangThai === "Vệ sinh").length
  const suaChua = data.filter((item) => item.trangThai === "Sửa chữa").length

  const size20 = data.filter((item) => item.kichCo === "20").length
  const size40 = data.filter((item) => item.kichCo === "40").length
  const size45 = data.filter((item) => item.kichCo === "45").length

  return {
    total,
    veSinh,
    suaChua,
    size20,
    size40,
    size45,
  }
}

export interface RepairInspectionReport {
  id: number
  estimateNo: string
  containerNo: string
  sztp: string
  oprId: string
  condition: string
  timeIn: string
  estimateDate: string
  vendor: string
  approvalDate: string
  repairDate: string
  completedDate: string
  cancelDate: string
  com: string
  loc: string
  dam: string
  rep: string
  length: number
  width: number
  quantity: number
  hours: number
  laborCost: number
  mateCost: number
  total: number
  payer: string
}

export interface RepairInspectionFilterParams {
  dateFrom?: string
  dateTo?: string
  trangThai?: string
  hangTau?: string
  kichCo?: string
  tinhTrang?: string
  loaiCont?: string
  payer?: string
  searchTerm?: string
}

export function getRepairInspectionReports(filters?: RepairInspectionFilterParams): RepairInspectionReport[] {
  // Sample data based on the image provided
  const sampleData: RepairInspectionReport[] = [
    {
      id: 1,
      estimateNo: "",
      containerNo: "",
      sztp: "",
      oprId: "",
      condition: "",
      timeIn: "",
      estimateDate: "",
      vendor: "",
      approvalDate: "",
      repairDate: "",
      completedDate: "",
      cancelDate: "",
      com: "FWd",
      loc: "BXXX",
      dam: "DB",
      rep: "WW",
      length: 1200,
      width: 240,
      quantity: 1,
      hours: 0.6,
      laborCost: 1.5,
      mateCost: 2.42,
      total: 3.92,
      payer: "O"
    },
    {
      id: 2,
      estimateNo: "R2511130032",
      containerNo: "NRSU7068526",
      sztp: "45G0",
      oprId: "NSL",
      condition: "D",
      timeIn: "13/11/2025 07:38:27",
      estimateDate: "13/11/2025 07:50:02",
      vendor: "",
      approvalDate: "",
      repairDate: "",
      completedDate: "",
      cancelDate: "",
      com: "FPP",
      loc: "BLDN",
      dam: "BR",
      rep: "SN",
      length: 150,
      width: 120,
      quantity: 1,
      hours: 2.89,
      laborCost: 7.23,
      mateCost: 56.62,
      total: 63.85,
      payer: "O"
    },
    {
      id: 3,
      estimateNo: "",
      containerNo: "",
      sztp: "",
      oprId: "",
      condition: "",
      timeIn: "",
      estimateDate: "",
      vendor: "",
      approvalDate: "",
      repairDate: "",
      completedDate: "",
      cancelDate: "",
      com: "FPP",
      loc: "BXXX",
      dam: "GD",
      rep: "PR",
      length: 120,
      width: 240,
      quantity: 2,
      hours: 0,
      laborCost: 0,
      mateCost: 0,
      total: 0,
      payer: "O"
    },
    {
      id: 4,
      estimateNo: "",
      containerNo: "",
      sztp: "",
      oprId: "",
      condition: "",
      timeIn: "",
      estimateDate: "",
      vendor: "",
      approvalDate: "",
      repairDate: "",
      completedDate: "",
      cancelDate: "",
      com: "FPP",
      loc: "BRNN",
      dam: "BR",
      rep: "SN",
      length: 90,
      width: 120,
      quantity: 1,
      hours: 0,
      laborCost: 0,
      mateCost: 0,
      total: 0,
      payer: "O"
    },
    {
      id: 5,
      estimateNo: "",
      containerNo: "",
      sztp: "",
      oprId: "",
      condition: "",
      timeIn: "",
      estimateDate: "",
      vendor: "",
      approvalDate: "",
      repairDate: "",
      completedDate: "",
      cancelDate: "",
      com: "GTO",
      loc: "DBNN",
      dam: "CU",
      rep: "SN",
      length: 30,
      width: 0,
      quantity: 1,
      hours: 0,
      laborCost: 0,
      mateCost: 0,
      total: 0,
      payer: "O"
    },
    {
      id: 6,
      estimateNo: "R2511130031",
      containerNo: "DYLU3211294",
      sztp: "22G0",
      oprId: "DYL",
      condition: "D",
      timeIn: "13/11/2025 07:33:19",
      estimateDate: "13/11/2025 07:50:02",
      vendor: "",
      approvalDate: "",
      repairDate: "",
      completedDate: "",
      cancelDate: "",
      com: "GTO",
      loc: "DBNN",
      dam: "CU",
      rep: "SN",
      length: 15,
      width: 0,
      quantity: 1,
      hours: 0,
      laborCost: 0,
      mateCost: 0,
      total: 0,
      payer: "O"
    }
  ]

  let data = [...sampleData]

  if (!filters) return data

  // Filter by date range
  if (filters.dateFrom && filters.dateTo) {
    data = data.filter((item) => {
      if (!item.timeIn) return false
      const itemDate = new Date(item.timeIn.split(' ')[0].split('/').reverse().join('-'))
      const fromDate = new Date(filters.dateFrom!)
      const toDate = new Date(filters.dateTo!)
      return itemDate >= fromDate && itemDate <= toDate
    })
  }

  // Filter by status
  if (filters.trangThai && filters.trangThai !== "Tất cả") {
    data = data.filter((item) => item.condition === filters.trangThai)
  }

  // Filter by shipping line
  if (filters.hangTau && filters.hangTau !== "Tất cả") {
    data = data.filter((item) => item.oprId === filters.hangTau)
  }

  // Filter by size
  if (filters.kichCo && filters.kichCo !== "Tất cả") {
    data = data.filter((item) => item.sztp.startsWith(filters.kichCo!))
  }

  // Filter by payer
  if (filters.payer && filters.payer !== "Tất cả") {
    data = data.filter((item) => item.payer === filters.payer)
  }

  return data
}
