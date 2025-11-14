"use client"

import { Card } from "@/components/ui/card"

interface SummaryTableProps {
  stats: {
    total: number
    veSinh: number
    suaChua: number
  }
}

export function SummaryTable({ stats }: SummaryTableProps) {
  return (
    <Card className="rounded-xl border shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-bold text-gray-800 text-lg">Thống kê tổng hợp</h3>
          <p className="text-sm text-gray-500 mt-1">Báo cáo vệ sinh và sửa chữa container theo kích cỡ</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="px-6 py-4 text-left font-semibold text-gray-700 bg-gradient-to-r from-blue-50 to-blue-100/50 border-r border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-[#2c86ff] rounded-full"></div>
                    Kích cỡ
                  </div>
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-700 bg-blue-50 border-r border-gray-200">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-1xl">20&apos;</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-700 bg-blue-50 border-r border-gray-200">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-1xl">40&apos;</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-700 bg-blue-50">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-1xl">45&apos;</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-gray-200 hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-5 border-r border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#2c86ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Vệ sinh</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center border-r border-gray-200">
                  <div className="text-1xl font-bold text-[#2c86ff]">{stats.veSinh}</div>
                </td>
                <td className="px-6 py-5 text-center border-r border-gray-200">
                  <div className="text-1xl font-bold text-[#2c86ff]">20</div>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="text-1xl font-bold text-[#2c86ff]">16</div>
                </td>
              </tr>

              <tr className="border-b border-gray-200 hover:bg-orange-50/30 transition-colors">
                <td className="px-6 py-5 border-r border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Sửa chữa</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center border-r border-gray-200">
                  <div className="text-1xl font-bold text-orange-500">{stats.suaChua}</div>
                </td>
                <td className="px-6 py-5 text-center border-r border-gray-200">
                 <div className="text-1xl font-bold text-orange-500">13</div>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="text-1xl font-bold text-orange-500">25</div>
                </td>
              </tr>

              <tr className="border-t-2 border-gray-300 bg-gradient-to-r from-gray-50 to-blue-50/30">
                <td className="px-6 py-5 border-r border-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Tổng cộng</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center border-r border-gray-300">
                  <div className="text-1xl font-bold text-gray-800">{stats.total}</div>
                </td>
                <td className="px-6 py-5 text-center border-r border-gray-300">
                  <div className="text-1xl font-bold text-gray-800">36</div>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="text-1xl font-bold text-gray-800">41  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2c86ff]"></div>
              <span>Vệ sinh: {stats.veSinh}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>Sửa chữa: {stats.suaChua}</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Tổng số dòng: <span className="font-semibold text-gray-700">3</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
