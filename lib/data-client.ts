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