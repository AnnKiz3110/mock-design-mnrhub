export interface DepositContainerReport {
  stt: number
  soContainer: string
  hangTau: string
  kichCo: string
  soBaoGia: string
  ngayBaoGia: string
  ngayGiamDinh: string
  ngayCuoc: string
  noiDungThuCuoc: string
  nguoiThu: string
  tienCuoc: number
  ghiChu: string
}

const depositMockData: DepositContainerReport[] = [
  {
    stt: 1,
    soContainer: "WHLU0294890",
    hangTau: "WHL",
    kichCo: "2200",
    soBaoGia: "E2510100001",
    ngayBaoGia: "2025-11-09 18:42",
    ngayGiamDinh: "2025-11-10 6:26:54",
    ngayCuoc: "2025-11-11 6:26:54",
    noiDungThuCuoc: "Đã thu",
    nguoiThu: "thuytm",
    tienCuoc: 166.67,
    ghiChu: ""
  },
  {
    stt: 2,
    soContainer: "WHSU2150562",
    hangTau: "WHL",
    kichCo: "2200",
    soBaoGia: "E2510100001",
    ngayBaoGia: "2025-11-09 15:32",
    ngayGiamDinh: "2025-11-09 22:33:39",
    ngayCuoc: "2025-11-10 22:33:39",
    noiDungThuCuoc: "Đã thu",
    nguoiThu: "thuytm",
    tienCuoc: 166.67,
    ghiChu: ""
  },
  {
    stt: 3,
    soContainer: "WHSU2286306",
    hangTau: "WHL",
    kichCo: "2200",
    soBaoGia: "E2510210004",
    ngayBaoGia: "2025-11-08 16:24",
    ngayGiamDinh: "2025-11-09 22:49:27",
    ngayCuoc: "2025-11-10 22:49:27",
    noiDungThuCuoc: "Đã thu",
    nguoiThu: "thuytm",
    tienCuoc: 166.67,
    ghiChu: ""
  },
  {
    stt: 4,
    soContainer: "WHSU2536935",
    hangTau: "WHL",
    kichCo: "2200",
    soBaoGia: "E2510210004",
    ngayBaoGia: "2025-11-08 19:55",
    ngayGiamDinh: "2025-11-08 20:57:41",
    ngayCuoc: "2025-11-09 20:57:41",
    noiDungThuCuoc: "Đã thu",
    nguoiThu: "thuytm",
    tienCuoc: 166.67,
    ghiChu: ""
  },
  {
    stt: 5,
    soContainer: "FYCU7147335",
    hangTau: "WHL",
    kichCo: "2200",
    soBaoGia: "E2510150022",
    ngayBaoGia: "2025-11-08 11:55",
    ngayGiamDinh: "2025-11-08 17:19:41",
    ngayCuoc: "2025-11-09 17:19:41",
    noiDungThuCuoc: "Đã thu",
    nguoiThu: "thuytm",
    tienCuoc: 166.67,
    ghiChu: ""
  },
  {
    stt: 6,
    soContainer: "WHSU0033778",
    hangTau: "WHL",
    kichCo: "2200",
    soBaoGia: "E2510150022",
    ngayBaoGia: "2025-11-08 11:30",
    ngayGiamDinh: "2025-11-08 13:18:35",
    ngayCuoc: "2025-11-09 13:18:35",
    noiDungThuCuoc: "Đã thu",
    nguoiThu: "thuytm",
    tienCuoc: 166.67,
    ghiChu: ""
  },
  {
    stt: 7,
    soContainer: "WHSU2388904",
    hangTau: "WHL",
    kichCo: "2200",
    soBaoGia: "E2511040007",
    ngayBaoGia: "2025-11-08 11:13",
    ngayGiamDinh: "2025-11-08 12:56:30",
    ngayCuoc: "2025-11-09 12:56:30",
    noiDungThuCuoc: "Đã thu",
    nguoiThu: "thuytm",
    tienCuoc: 166.67,
    ghiChu: ""
  }
]

export interface DepositFilterParams {
  dateFrom?: string
  dateTo?: string
  hangTau?: string
  kichCo?: string
  nguoiThu?: string
  searchTerm?: string
}

export function getDepositContainerReports(filters?: DepositFilterParams): DepositContainerReport[] {
  let data = [...depositMockData]

  if (!filters) return data

  // Filter by date range
  if (filters.dateFrom) {
    data = data.filter((item) => item.ngayBaoGia >= filters.dateFrom!)
  }
  if (filters.dateTo) {
    data = data.filter((item) => item.ngayBaoGia <= filters.dateTo!)
  }

  // Filter by shipping line
  if (filters.hangTau && filters.hangTau !== "Tất cả") {
    data = data.filter((item) => item.hangTau === filters.hangTau)
  }

  // Filter by size
  if (filters.kichCo && filters.kichCo !== "Tất cả") {
    data = data.filter((item) => item.kichCo === filters.kichCo)
  }

  // Filter by collector
  if (filters.nguoiThu && filters.nguoiThu !== "Tất cả") {
    data = data.filter((item) => item.nguoiThu === filters.nguoiThu)
  }

  // Search term
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase()
    data = data.filter(
      (item) =>
        item.soContainer.toLowerCase().includes(term) ||
        item.soBaoGia.toLowerCase().includes(term) ||
        item.nguoiThu.toLowerCase().includes(term)
    )
  }

  return data
}

export function getDepositKPIStats(data: DepositContainerReport[]) {
  const total = data.length
  const slCont = data.length // Số lượng container
  const tienCuoc = data.reduce((sum, item) => sum + item.tienCuoc, 0) // Tổng tiền cược

  return {
    total,
    slCont,
    tienCuoc,
  }
}
