// =====================================================
// CẤU HÌNH CỬA HÀNG - sửa thông tin thật vào đây
// =====================================================
window.SHOP = {
  name: "ENERJOY",
  slogan: "Trạm sạc di động, có điện mọi lúc",
  phone: "0926372001",
  zalo: "0926372001",           // đang dùng chung số hotline
  messenger: "https://m.me/tramcongngheJoyy",   // Messenger của fanpage
  facebook: "https://www.facebook.com/tramcongngheJoyy/",
  gaId: "G-L777L77624",         // mã Google Analytics 4 (dạng G-XXXXXXXXXX). Để trống thì không đo.
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
    id: "400w", photos: ["img/goc/400w-trai.webp", "img/goc/400w-phai.webp", "img/thuc-te/400w-1.webp", "img/thuc-te/400w-2.webp", "img/thuc-te/400w-3.webp"], bestSeller: true, name: "Trạm sạc ENERJOY 400W", watt: 400, sold: null, img: "img/tram-sac-400W.webp",
    ports: ["1 đèn LED", "2 ổ AC 220V", "6 cổng USB"],
    useFor: ["Cắm trại, dã ngoại", "Quạt, đèn, wifi khi mất điện", "Sạc điện thoại, laptop"],
    variants: [
      { code: "400W-10A", amp: "10A", wh: 111, mah: 30000, size: "230 x 195 x 119 mm", kg: 1.7, charge1: "4 tiếng", charge2: null, accessories: "1 sạc, 1 HDSD tiếng Việt", price: null },
      { code: "400W-20A", amp: "20A", wh: 222, mah: 60000, size: "230 x 195 x 120 mm", kg: 2.5, charge1: "6 tiếng", charge2: null, accessories: "1 sạc, 1 HDSD tiếng Việt", price: null },
    ],
  },
  {
    id: "500w", photos: ["img/goc/500w-trai.webp", "img/goc/500w-phai.webp", "img/thuc-te/500w-1.webp", "img/thuc-te/500w-2.webp", "img/thuc-te/500w-3.webp"], name: "Trạm sạc ENERJOY 500W", watt: 500, sold: null, img: "img/tram-sac-500W.webp",
    ports: ["1 đèn LED", "2 ổ AC 220V", "4 cổng USB", "2 cổng Type C"],
    useFor: ["Cắm trại, dã ngoại", "Quạt, đèn, wifi khi mất điện", "Sạc nhanh qua Type C"],
    variants: [
      { code: "500W-10A", amp: "10A", wh: 111, mah: 30000, size: "260 x 142 x 162 mm", kg: 3, charge1: "4 tiếng", charge2: null, accessories: "1 sạc, 1 HDSD tiếng Việt", price: null },
      { code: "500W-20A", amp: "20A", wh: 222, mah: 60000, size: "260 x 142 x 163 mm", kg: 3.5, charge1: "6 tiếng", charge2: null, accessories: "1 sạc, 1 HDSD tiếng Việt", price: null },
    ],
  },
  {
    id: "600w", photos: ["img/goc/600w-trai.webp", "img/goc/600w-phai.webp", "img/thuc-te/600w-1.webp", "img/thuc-te/600w-2.webp", "img/thuc-te/600w-3.webp"], name: "Trạm sạc ENERJOY 600W", watt: 600, sold: null, img: "img/tram-sac-600W.webp",
    ports: ["6 đèn LED", "2 ổ AC 220V", "4 cổng USB", "4 cổng Type C", "1 tẩu sạc ô tô"],
    useFor: ["Đi phượt, câu cá, bán hàng đêm", "Quạt, tivi nhỏ, wifi", "Có tẩu cắm thiết bị ô tô"],
    variants: [
      { code: "600W-30A", amp: "30A", wh: 333, mah: 90000, size: "260 x 192 x 196 mm", kg: 4.5, charge1: "7 tiếng", charge2: "4 tiếng", accessories: "1 sạc, 1 HDSD tiếng Việt", price: null },
    ],
  },
  {
    id: "1100w", photos: ["img/goc/1100w-trai.webp", "img/goc/1100w-phai.webp", "img/thuc-te/1100w-1.webp", "img/thuc-te/1100w-2.webp", "img/thuc-te/1100w-3.webp"], bestSeller: true, name: "Trạm sạc ENERJOY 1100W", watt: 1100, sold: null, img: "img/tram-sac-1100W.webp",
    ports: ["6 đèn LED", "3 ổ AC 220V", "4 cổng USB", "4 cổng Type C", "1 tẩu sạc ô tô"],
    useFor: ["Gia đình dự phòng mất điện", "Quạt, tivi, wifi, camera", "Bán hàng lưu động"],
    variants: [
      { code: "1100W-30A", amp: "30A", wh: 333, mah: 90000, size: "190 x 300 x 190 mm", kg: 5, charge1: "7 tiếng", charge2: "4 tiếng", accessories: "1 sạc, 1 HDSD tiếng Việt", price: null },
    ],
  },
  {
    id: "1600w", photos: ["img/goc/1600w-trai.webp", "img/goc/1600w-phai.webp", "img/thuc-te/1600w-1.webp", "img/thuc-te/1600w-2.webp", "img/thuc-te/1600w-3.webp"], name: "Trạm sạc ENERJOY 1600W", watt: 1600, sold: null, img: "img/tram-sac-1600W.webp",
    ports: ["6 đèn LED", "4 ổ AC 220V", "4 cổng USB", "4 cổng Type C", "1 tẩu sạc ô tô"],
    useFor: ["Dự phòng cả nhà khi mất điện", "Quạt, tủ lạnh, tivi, wifi", "Cửa hàng, quầy bán nhỏ"],
    variants: [
      { code: "1600W-60A", amp: "60A", wh: 666, mah: 180000, size: "190 x 300 x 189 mm", kg: 9.5, charge1: "4 tiếng", charge2: null, accessories: "2 sạc, 1 HDSD tiếng Việt", price: null },
      { code: "1600W-100A", amp: "100A", wh: 1110, mah: 300000, size: "190 x 300 x 190 mm", kg: 10, charge1: "10 tiếng", charge2: null, accessories: "2 sạc, 1 HDSD tiếng Việt", price: null },
    ],
  },
  {
    id: "3000w", photos: ["img/goc/3000w-trai.webp", "img/goc/3000w-phai.webp", "img/thuc-te/3000w-1.webp", "img/thuc-te/3000w-2.webp", "img/thuc-te/3000w-3.webp"], name: "Trạm sạc ENERJOY 3000W", watt: 3000, sold: null, img: "img/tram-sac-3000W.webp", sine: true,
    ports: ["6 đèn LED", "5 ổ AC 220V", "4 cổng USB", "4 cổng Type C", "1 tẩu sạc ô tô"],
    useFor: ["Sóng sin chuẩn, chạy thiết bị có động cơ", "Dự phòng gia đình, văn phòng", "Công trình, sự kiện ngoài trời"],
    variants: [
      { code: "3000W-100A", amp: "100A", wh: 2590, mah: 700000, size: "225 x 400 x 265 mm", kg: 20, charge1: "4 tiếng", charge2: null, accessories: "2 sạc, 1 HDSD tiếng Việt", price: null },
      { code: "3000W-100A sạc nhanh", amp: "100A", wh: 2590, mah: 700000, size: "225 x 400 x 266 mm", kg: 20, charge1: "5 tiếng", charge2: null, accessories: "2 sạc, 1 HDSD tiếng Việt", price: null, fast: true },
    ],
  },
];

// Đánh giá thật của khách (chép từ Shopee, TikTok, Zalo). Để trống thì web ẩn phần đánh giá.
// sold ở mỗi sản phẩm: số đã bán thật (null = không hiện).
// Mẫu: { name: "Anh T.", place: "Hà Nội", stars: 5, product: "1100W", text: "...", source: "Shopee" }
window.REVIEWS = [
  { name: "c*****g", date: "06/2026", stars: 5, product: "400W", source: "Shopee", text: "Độ bền: chắc chắn, dễ di chuyển. Dung lượng cho phép cắm nhiều thiết bị. Thiết kế nhỏ gọn, hiện đại, cầm vừa tay. Trạm sạc dự phòng di động 400W, đẹp, bền, mọi người nên mua, cho shop 5 sao đó." },
  { name: "fp5z_h7mj0", date: "12/2024", stars: 5, product: "1100W", source: "Shopee", text: "Sạc mấy tiếng thôi nhưng thấy dùng được lâu lắm nha, dễ dùng, nhỏ tiện. Nhà mình mang đi du lịch 2 ngày thấy tiện lắm, mình mua sale nên giá còn rẻ nữa." },
  { name: "ngahungduy", date: "10/2025", stars: 5, product: "600W", source: "Shopee", text: "Tư vấn nhiệt tình, đóng gói siêu cẩn thận. Do sơ suất mình làm cháy ổ sạc, nhắn cho shop, shop xử lý phút mốt, lên đơn mới đổi cho mình luôn. 10 điểm cho shop." },
  { name: "ttpt159", date: "11/2025", stars: 5, product: "1100W", source: "Shopee", text: "Đang cần để chuẩn bị bão số 13 vào, shop nghe vậy nên đi đơn liền. Bão lụt nên đơn chậm hơn, nhận hàng thấy như quảng cáo, đủ chức năng." },
  { name: "kimanh14140420", date: "04/2026", stars: 5, product: "500W", source: "Shopee", text: "Thiết kế chắc chắn, pin lớn, bật quạt cây khá ổn. Quạt tản nhiệt chạy nhẹ nhàng, nhỏ gọn dễ di chuyển." },
  { name: "quynhnhu97.com_", date: "07/2025", stars: 5, product: "600W", source: "Shopee", text: "Đúng với mô tả, chất lượng tuyệt vời. Shop hỗ trợ nhiệt tình, mua dùng lắm việc không lo cúp điện. Rất thích." }
];

// Thiết bị mẫu cho công cụ "Chạy được bao lâu" (công suất ước lượng phổ biến).
// Thiết bị có "per" thì tính theo số lần (MẠNH 2026-10-16): per = Wh pin mất mỗi lần (đã tính hao hụt), unit = tên lần.
// Laptop: perMin..per cho ra khoảng số lần (máy 10A 111Wh: 2-3 lần), mỗi lần đầy pin dùng thêm khoảng hoursEach giờ (MẠNH 2026-10-16).
// Nồi cơm 111Wh/lần khớp số MẠNH đưa: 1100W-30A 3 lần, 1600W-60A 6 lần, 1600W-100A 10 lần.
// hoursBy: số giờ thực tế MẠNH đo theo từng mã (tủ lạnh chạy ngắt quãng). Mã chưa có số thì ước theo avgW (W trung bình, suy từ số đo).
// minW: máy phải từ công suất này trở lên mới dùng được (nồi cơm: 1100W, 1600W, 3000W).
window.DEVICES = [
  { name: "Đèn LED", w: 10 },
  { name: "Sạc điện thoại", w: 15 },
  { name: "Wifi / modem", w: 12 },
  { name: "Camera", w: 6 },
  { name: "Quạt cây", w: 45 },
  { name: "Laptop", w: 65, per: 55, perMin: 37, unit: "lần sạc đầy", hoursEach: 3 },
  { name: "Tủ lạnh", w: 120, hoursBy: { "600W-30A": 6, "1100W-30A": 8, "1600W-60A": 12, "1600W-100A": 24 }, avgW: 50 },
  { name: "Nồi cơm điện", w: 600, per: 111, unit: "lần nấu", minW: 1100 },
];

// fit: câu hiển thị ở trang tấm pin. fits: máy nào dùng được, max = số tấm ghép tối đa (theo lời MẠNH 2026-10-16).
// Tấm pin năng lượng mặt trời MONO (sheet "NĂNG LƯỢNG MẶT TRỜI MONO" trong file Excel). price: null thì web hiện "Liên hệ".
window.SOLAR = [
  {
    id: "nlmt-mono", solar: true, name: "Tấm pin năng lượng mặt trời MONO", img: "img/nlmt/mono-1.webp",
    photos: ["img/nlmt/mono-2.webp", "img/nlmt/mono-3.webp", "img/nlmt/mono-4.webp", "img/nlmt/mono-mat-truoc-sau.webp"],
    useFor: ["Nạp điện cho trạm sạc khi cắm trại, đi xa", "Hộp đấu nối chống nước IP67", "Chịu nhiệt từ -40 °C đến 85 °C"],
    variants: [
      { code: "NLMT MONO 100W", w: 100, volt: "18V", cells: 32, eff: "23%", size: "450 x 1190 x 25 x 20 mm", kg: 5.1, price: null, fit: "Dùng cho trạm ENERJOY 400W, 500W, 600W, 1100W, 1600W. Máy 400W và 500W dùng 1 tấm, máy 600W, 1100W và 1600W ghép tối đa 2 tấm", fits: [{ w: 400, max: 1 }, { w: 500, max: 1 }, { w: 600, max: 2 }, { w: 1100, max: 2 }, { w: 1600, max: 2 }],
        specs: [["Công suất tối đa", "100 W"], ["Sai số", "3%"], ["Điện áp mạch hở", "23,26 V"], ["Điện áp tại công suất tối đa", "19,38 V"], ["Dòng điện tại công suất tối đa", "5,16 A"], ["Dòng ngắn mạch", "5,58 A"], ["Hiệu suất mô-đun", "18,7%"], ["Hiệu suất tế bào quang điện", "23%"], ["Cầu chì nối tiếp định mức", "10 A"], ["Hộp đấu nối", "IP67"], ["Điện áp hệ thống tối đa", "DC 1500 V"], ["Nhiệt độ hoạt động", "-40 °C đến 85 °C"]] },
      { code: "NLMT MONO 200W", w: 200, volt: "24V", cells: 48, eff: "24,6%", size: "770 x 1160 x 30 x 25 mm", kg: 8.5, price: null, fit: "Dùng cho trạm ENERJOY 3000W, có thể ghép 1 đến 2 tấm", fits: [{ w: 3000, max: 2 }],
        specs: [["Công suất tối đa", "200 W"], ["Sai số", "3%"], ["Điện áp mạch hở", "32,83 V"], ["Điện áp tại công suất tối đa", "27,36 V"], ["Dòng điện tại công suất tối đa", "7,31 A"], ["Dòng ngắn mạch", "7,9 A"], ["Hiệu suất mô-đun", "22,4%"], ["Hiệu suất tế bào quang điện", "24,6%"], ["Cầu chì nối tiếp định mức", "10 A"], ["Hộp đấu nối", "IP67"], ["Điện áp hệ thống tối đa", "DC 1000 V"], ["Nhiệt độ hoạt động", "-40 °C đến 85 °C"]] }
    ]
  }
];

// Phân loại combo 2 tấm (MẠNH 2026-10-16): thông số giống tấm lẻ, giá riêng (null = Liên hệ).
(function () {
  const v = window.SOLAR[0].variants, combo = {
    "NLMT MONO 100W": "Dùng cho trạm ENERJOY 600W, 1100W, 1600W, đủ 2 tấm để sạc tối đa",
    "NLMT MONO 200W": "Dùng cho trạm ENERJOY 3000W, đủ 2 tấm để sạc tối đa",
  };
  v.push(...v.map(x => ({ ...x, code: "Combo 2 tấm MONO " + x.w + "W", qty: 2, price: null, fit: combo[x.code], fits: null })));
})();
