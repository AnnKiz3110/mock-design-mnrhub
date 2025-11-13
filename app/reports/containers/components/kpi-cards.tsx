"use client"

interface KPICardsProps {
  stats: {
    total: number
    veSinh: number
    suaChua: number
  }
}

export function KPICards({ stats }: KPICardsProps) {
  const rowCount = 3

  return (
    <div className="bg-white border rounded-md overflow-hidden text-xs inline-block h-auto self-start">
      {/* Title */}

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b bg-blue-50">
            <th className="px-2 py-1.5 w-24 text-left border-r"></th>
            <th className="px-2 py-1.5 text-center border-r">20</th>
            <th className="px-2 py-1.5 text-center border-r">40</th>
            <th className="px-2 py-1.5 text-center">45</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="px-2 py-1.5 border-r">Vệ sinh</td>
            <td className="px-2 py-1.5 text-center border-r">{stats.veSinh}</td>
            <td className="px-2 py-1.5 text-center border-r"></td>
            <td className="px-2 py-1.5 text-center"></td>
          </tr>

          <tr className="border-b">
            <td className="px-2 py-1.5 border-r">Sửa chữa</td>
            <td className="px-2 py-1.5 text-center border-r">{stats.suaChua}</td>
            <td className="px-2 py-1.5 text-center border-r"></td>
            <td className="px-2 py-1.5 text-center"></td>
          </tr>

          <tr className="border-t-2 bg-blue-50">
            <td className="px-2 py-1.5 font-bold border-r">Tổng</td>
            <td className="px-2 py-1.5 text-center font-bold">{stats.total}</td>
            <td className="px-2 py-1.5 text-center font-bold"></td>
            <td className="px-2 py-1.5 text-center font-bold"></td>
          </tr>
        </tbody>
      </table>

      <div className="px-2 py-1 text-[11px] text-muted-foreground text-right border-t bg-gray-50">
        Số dòng: {rowCount}
      </div>
    </div>
  )
}
