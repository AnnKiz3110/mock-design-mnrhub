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
    <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm h-full p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-700 text-base">Thống kê tổng hợp</h3>
      </div>

      {/* Đường ngăn cách header / nội dung */}
      <div className="h-px bg-gray-200 mb-4" />

      {/* Table - increased height */}
      <div className="flex-1 flex flex-col">
        <table className="w-full border-collapse text-base flex-1">
          <thead>
            <tr className="border-b-2 border-gray-300 bg-blue-50">
              <td className="px-4 py-4 border-r border-gray-200 font-bold text-gray-700">
                Kích cỡ
              </td>
              <th className="px-4 py-4 text-center border-r border-gray-300 font-semibold text-gray-700">
                20
              </th>
              <th className="px-4 py-4 text-center border-r border-gray-300 font-semibold text-gray-700">
                40
              </th>
              <th className="px-4 py-4 text-center font-semibold text-gray-700">
                45
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-4 border-r border-gray-200 font-medium text-gray-700">
                Số lượng container
              </td>
              <td className="px-4 py-4 text-center border-r border-gray-200 text-gray-600">
                {stats.veSinh}
              </td>
              <td className="px-4 py-4 text-center border-r border-gray-200 text-gray-600"></td>
              <td className="px-4 py-4 text-center text-gray-600"></td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="px-4 py-4 border-r border-gray-200 font-medium text-gray-700">
                Tiền cược
              </td>
              <td className="px-4 py-4 text-center border-r border-gray-200 text-gray-600">
                {stats.suaChua}
              </td>
              <td className="px-4 py-4 text-center border-r border-gray-200 text-gray-600"></td>
              <td className="px-4 py-4 text-center text-gray-600"></td>
            </tr>

            <tr className="border-t-2 border-gray-300 bg-blue-50">
              <td className="px-4 py-4 font-bold border-r border-gray-300 text-gray-800">
                Tổng
              </td>
              <td className="px-4 py-4 text-center font-bold text-gray-800">
                {stats.total}
              </td>
              <td className="px-4 py-4 text-center font-bold text-gray-800"></td>
              <td className="px-4 py-4 text-center font-bold text-gray-800"></td>
            </tr>
          </tbody>
        </table>

        {/* Row count info */}
        <div className="mt-3 text-sm text-gray-500 text-right">
          Số dòng: {rowCount}
        </div>
      </div>
    </div>
  )
}