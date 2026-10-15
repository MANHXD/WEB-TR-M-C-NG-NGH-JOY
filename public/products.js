// =====================================================
// CẤU HÌNH CỬA HÀNG - sửa thông tin thật vào đây
// =====================================================
window.SHOP = {
  name: "ENERJOY",
  slogan: "Trạm sạc di động, có điện mọi lúc",
  phone: "0926372001",
  zalo: "0926372001",           // đang dùng chung số hotline
  messenger: "",                // TODO: link m.me/tenpage
  shopee: "https://s.shopee.vn/30omLlFXi1",
  tiktok: "https://vt.tiktok.com/ZS9Ur7LqbBabW-39Li8/",
  address: "Đang cập nhật",     // TODO: địa chỉ kho / cửa hàng
  warranty: "Bảo hành chính hãng 5 năm",
  // Chính sách bán hàng, hiện ở trang chủ, trang sản phẩm, hỏi đáp và chân trang
  policies: [
    { icon: "shield", title: "Bảo hành 5 năm", text: "Cam kết bảo hành chính hãng 5 năm." },
    { icon: "swap", title: "Lỗi 1 đổi 1", text: "Đổi máy mới trong 7 - 15 ngày nếu lỗi từ nhà sản xuất." },
    { icon: "truck", title: "Miễn phí giao hàng", text: "Giao toàn quốc, không tính phí ship." },
    { icon: "box", title: "Kiểm tra trước khi trả tiền", text: "Mở hộp xem máy rồi mới thanh toán." },
  ],
};

// =====================================================
// DỮ LIỆU SẢN PHẨM - lấy từ THONG_TIN_SAN_PHAM_ENERJOY.xlsx
// price: null = hiển thị "Liên hệ"
// wh / mah: số thực tế trong file (không dùng số quảng cáo)
// =====================================================
window.PRODUCTS = [
  {
    id: "400w", bestSeller: true, name: "Trạm sạc ENERJOY 400W", watt: 400, sold: null, img: "img/tram-sac-400W.webp",
    ports: ["1 đèn LED", "2 ổ AC 220V", "6 cổng USB"],
    useFor: ["Cắm trại, dã ngoại", "Quạt, đèn, wifi khi mất điện", "Sạc điện thoại, laptop"],
    variants: [
      { code: "400-10A", amp: "10A", wh: 111, mah: 30000, size: "230 x 195 x 119 mm", kg: 1.7, charge1: "4 tiếng", charge2: null, accessories: "1 sạc, 1 HDSD tiếng Việt", price: null },
      { code: "400-20A", amp: "20A", wh: 222, mah: 60000, size: "230 x 195 x 120 mm", kg: 2.5, charge1: "6 tiếng", charge2: null, accessories: "1 sạc, 1 HDSD tiếng Việt", price: null },
    ],
  },
  {
    id: "500w", name: "Trạm sạc ENERJOY 500W", watt: 500, sold: null, img: "img/tram-sac-500W.webp",
    ports: ["1 đèn LED", "2 ổ AC 220V", "4 cổng USB", "2 cổng Type C"],
    useFor: ["Cắm trại, dã ngoại", "Quạt, đèn, wifi khi mất điện", "Sạc nhanh qua Type C"],
    variants: [
      { code: "500-10A", amp: "10A", wh: 111, mah: 30000, size: "260 x 142 x 162 mm", kg: 3, charge1: "4 tiếng", charge2: null, accessories: "1 sạc, 1 HDSD tiếng Việt", price: null },
      { code: "500-20A", amp: "20A", wh: 222, mah: 60000, size: "260 x 142 x 163 mm", kg: 3.5, charge1: "6 tiếng", charge2: null, accessories: "1 sạc, 1 HDSD tiếng Việt", price: null },
    ],
  },
  {
    id: "600w", name: "Trạm sạc ENERJOY 600W", watt: 600, sold: null, img: "img/tram-sac-600W.webp",
    ports: ["6 đèn LED", "2 ổ AC 220V", "4 cổng USB", "4 cổng Type C", "1 tẩu sạc ô tô"],
    useFor: ["Đi phượt, câu cá, bán hàng đêm", "Quạt, tivi nhỏ, wifi", "Có tẩu cắm thiết bị ô tô"],
    variants: [
      { code: "600-30A", amp: "30A", wh: 333, mah: 90000, size: "260 x 192 x 196 mm", kg: 4.5, charge1: "7 tiếng", charge2: "4 tiếng", accessories: "1 sạc, 1 HDSD tiếng Việt", price: null },
    ],
  },
  {
    id: "1100w", bestSeller: true, name: "Trạm sạc ENERJOY 1100W", watt: 1100, sold: null, img: "img/tram-sac-1100W.webp",
    ports: ["6 đèn LED", "3 ổ AC 220V", "4 cổng USB", "4 cổng Type C", "1 tẩu sạc ô tô"],
    useFor: ["Gia đình dự phòng mất điện", "Quạt, tivi, wifi, camera", "Bán hàng lưu động"],
    variants: [
      { code: "1100-30A", amp: "30A", wh: 333, mah: 90000, size: "190 x 300 x 190 mm", kg: 5, charge1: "7 tiếng", charge2: "4 tiếng", accessories: "1 sạc, 1 HDSD tiếng Việt", price: null },
    ],
  },
  {
    id: "1600w", name: "Trạm sạc ENERJOY 1600W", watt: 1600, sold: null, img: "img/tram-sac-1600W.webp",
    ports: ["6 đèn LED", "4 ổ AC 220V", "4 cổng USB", "4 cổng Type C", "1 tẩu sạc ô tô"],
    useFor: ["Dự phòng cả nhà khi mất điện", "Quạt, tủ lạnh, tivi, wifi", "Cửa hàng, quầy bán nhỏ"],
    variants: [
      { code: "1600-60A", amp: "60A", wh: 666, mah: 180000, size: "190 x 300 x 189 mm", kg: 9.5, charge1: "4 tiếng", charge2: null, accessories: "2 sạc, 1 HDSD tiếng Việt", price: null },
      { code: "1600-100A", amp: "100A", wh: 1110, mah: 300000, size: "190 x 300 x 190 mm", kg: 10, charge1: "10 tiếng", charge2: null, accessories: "2 sạc, 1 HDSD tiếng Việt", price: null },
    ],
  },
  {
    id: "3000w", name: "Trạm sạc ENERJOY 3000W", watt: 3000, sold: null, img: "img/tram-sac-3000W.webp", sine: true,
    ports: ["6 đèn LED", "5 ổ AC 220V", "4 cổng USB", "4 cổng Type C", "1 tẩu sạc ô tô"],
    useFor: ["Sóng sin chuẩn, chạy thiết bị có động cơ", "Dự phòng gia đình, văn phòng", "Công trình, sự kiện ngoài trời"],
    variants: [
      { code: "3000-100A", amp: "100A", wh: 2590, mah: 700000, size: "225 x 400 x 265 mm", kg: 20, charge1: "4 tiếng", charge2: null, accessories: "2 sạc, 1 HDSD tiếng Việt", price: null },
      { code: "3000-100A sạc nhanh", amp: "100A", wh: 2590, mah: 700000, size: "225 x 400 x 266 mm", kg: 20, charge1: "5 tiếng", charge2: null, accessories: "2 sạc, 1 HDSD tiếng Việt", price: null, fast: true },
    ],
  },
];

// Đánh giá thật của khách (chép từ Shopee, TikTok, Zalo). Để trống thì web ẩn phần đánh giá.
// sold ở mỗi sản phẩm: số đã bán thật (null = không hiện).
// Mẫu: { name: "Anh T.", place: "Hà Nội", stars: 5, product: "1100W", text: "...", source: "Shopee" }
window.REVIEWS = [];

// Thiết bị mẫu cho công cụ "Chạy được bao lâu" (công suất ước lượng phổ biến)
window.DEVICES = [
  { name: "Đèn LED", w: 10 },
  { name: "Sạc điện thoại", w: 15 },
  { name: "Wifi / modem", w: 12 },
  { name: "Camera", w: 6 },
  { name: "Quạt cây", w: 45 },
  { name: "Laptop", w: 65 },
  { name: "Tivi 43 inch", w: 90 },
  { name: "Tủ lạnh nhỏ", w: 120 },
  { name: "Nồi cơm điện", w: 600 },
];
