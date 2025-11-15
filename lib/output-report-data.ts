// Mock data for M&R Production Report
export interface MRProductionReport {
  stt: number
  hangTau: string
  kichCo: number
  tinhTrangCont: string
  dttt: string
  ngayVaoBai: string
  ngayBaoGia: string
  ngayHoanTat: string
  gio: number
  soLuong: number
  tongTien: number
}

const mockMRProductionData: MRProductionReport[] = [
  {
    stt: 1,
    hangTau: "ZIM",
    kichCo: 2200,
    tinhTrangCont: "A",
    dttt: "Owner",
    ngayVaoBai: "2025-11-01 15:24:45",
    ngayBaoGia: "2025-11-02 16:24:23",
    ngayHoanTat: "2025-11-03 17:12:55",
    gio: 5,
    soLuong: 1,
    tongTien: 5000
  },
  {
    stt: 2,
    hangTau: "TES",
    kichCo: 2250,
    tinhTrangCont: "B",
    dttt: "Owner",
    ngayVaoBai: "2025-11-02 15:24:45",
    ngayBaoGia: "2025-11-03 16:24:23",
    ngayHoanTat: "2025-11-04 17:12:55",
    gio: 7,
    soLuong: 2,
    tongTien: 10000
  },
  {
    stt: 3,
    hangTau: "ALI",
    kichCo: 2200,
    tinhTrangCont: "A",
    dttt: "Owner",
    ngayVaoBai: "2025-11-03 15:24:45",
    ngayBaoGia: "2025-11-04 16:24:23",
    ngayHoanTat: "2025-11-05 17:12:55",
    gio: 9,
    soLuong: 3,
    tongTien: 15000
  },
  {
    stt: 4,
    hangTau: "ASA",
    kichCo: 2200,
    tinhTrangCont: "B",
    dttt: "Owner",
    ngayVaoBai: "2025-11-04 15:24:45",
    ngayBaoGia: "2025-11-05 16:24:23",
    ngayHoanTat: "2025-11-06 17:12:55",
    gio: 11,
    soLuong: 4,
    tongTien: 20000
  },
  {
    stt: 5,
    hangTau: "BAN",
    kichCo: 2250,
    tinhTrangCont: "A",
    dttt: "Owner",
    ngayVaoBai: "2025-11-05 15:24:45",
    ngayBaoGia: "2025-11-06 16:24:23",
    ngayHoanTat: "2025-11-07 17:12:55",
    gio: 13,
    soLuong: 5,
    tongTien: 25000
  },
  {
    stt: 6,
    hangTau: "ASE",
    kichCo: 2250,
    tinhTrangCont: "B",
    dttt: "Owner",
    ngayVaoBai: "2025-11-06 15:24:45",
    ngayBaoGia: "2025-11-07 16:24:23",
    ngayHoanTat: "2025-11-08 17:12:55",
    gio: 15,
    soLuong: 6,
    tongTien: 30000
  },
  {
    stt: 7,
    hangTau: "AWA",
    kichCo: 2200,
    tinhTrangCont: "A",
    dttt: "Owner",
    ngayVaoBai: "2025-11-07 15:24:45",
    ngayBaoGia: "2025-11-08 16:24:23",
    ngayHoanTat: "2025-11-09 17:12:55",
    gio: 17,
    soLuong: 7,
    tongTien: 35000
  },
  {
    stt: 8,
    hangTau: "BEN",
    kichCo: 2200,
    tinhTrangCont: "B",
    dttt: "Owner",
    ngayVaoBai: "2025-11-08 15:24:45",
    ngayBaoGia: "2025-11-09 16:24:23",
    ngayHoanTat: "2025-11-10 17:12:55",
    gio: 19,
    soLuong: 8,
    tongTien: 40000
  },
  {
    stt: 9,
    hangTau: "ATL",
    kichCo: 2250,
    tinhTrangCont: "A",
    dttt: "Owner",
    ngayVaoBai: "2025-11-09 15:24:45",
    ngayBaoGia: "2025-11-10 16:24:23",
    ngayHoanTat: "2025-11-11 17:12:55",
    gio: 21,
    soLuong: 9,
    tongTien: 45000
  },
  {
    stt: 10,
    hangTau: "BIS",
    kichCo: 2250,
    tinhTrangCont: "B",
    dttt: "Owner",
    ngayVaoBai: "2025-11-10 15:24:45",
    ngayBaoGia: "2025-11-11 16:24:23",
    ngayHoanTat: "2025-11-12 17:12:55",
    gio: 23,
    soLuong: 10,
    tongTien: 50000
  }
]

export interface MRProductionFilterParams {
  dateFrom?: string
  dateTo?: string
  hangTau?: string
  kichCo?: string
  tinhTrangCont?: string
}

export function getMRProductionReports(filters?: MRProductionFilterParams): MRProductionReport[] {
  let filtered = [...mockMRProductionData]

  if (filters?.dateFrom) {
    filtered = filtered.filter(item => item.ngayVaoBai >= filters.dateFrom!)
  }
  if (filters?.dateTo) {
    filtered = filtered.filter(item => item.ngayVaoBai <= filters.dateTo!)
  }
  if (filters?.hangTau) {
    filtered = filtered.filter(item => item.hangTau === filters.hangTau)
  }
  if (filters?.kichCo) {
    filtered = filtered.filter(item => item.kichCo === Number(filters.kichCo))
  }
  if (filters?.tinhTrangCont) {
    filtered = filtered.filter(item => item.tinhTrangCont === filters.tinhTrangCont)
  }

  return filtered
}
