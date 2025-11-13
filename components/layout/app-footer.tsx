export function AppFooter() {
  return (
    <footer className="bg-gradient-to-r from-[#2c86ff] to-[#4a9fff] text-white mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Hệ thống M&R Container</h3>
            <p className="text-sm text-white/90 leading-relaxed">
              Giải pháp quản lý và đánh giá hiệu suất container toàn diện, giúp doanh nghiệp theo dõi và phát triển hoạt
              động một cách hiệu quả.
            </p>
          </div>

          {/* Middle Column */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/dashboard" className="hover:underline text-white/90 hover:text-white transition-colors">
                  Tổng quan
                </a>
              </li>
              <li>
                <a
                  href="/reports/containers"
                  className="hover:underline text-white/90 hover:text-white transition-colors"
                >
                  Báo cáo
                </a>
              </li>
              <li>
                <a
                  href="/search/container"
                  className="hover:underline text-white/90 hover:text-white transition-colors"
                >
                  Tra cứu
                </a>
              </li>
              <li>
                <a href="/admin/users" className="hover:underline text-white/90 hover:text-white transition-colors">
                  Cài đặt tiêu chí
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Liên hệ</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li>Email: support@cehsoft.com</li>
              <li>Điện thoại: (84) 123-456-789</li>
              <li className="leading-relaxed">
                Địa chỉ: CEH Building, 107 Bến Vân Đồn, Phường Khánh Hội, TP Hồ Chí Minh.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-white/90">© 2025 Hệ thống M&R Container. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:underline text-white/90 hover:text-white transition-colors">
              Chính sách bảo mật
            </a>
            <a href="/terms" className="hover:underline text-white/90 hover:text-white transition-colors">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
