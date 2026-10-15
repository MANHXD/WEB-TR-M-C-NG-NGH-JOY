# Web ENERJOY (Node.js)

Web bán trạm sạc di động ENERJOY. Express phục vụ trang trong `public/` và nhận đơn hàng qua `/api/orders`.

## Chạy trên máy

```bash
npm install
cp .env.example .env   # sửa ADMIN_KEY
npm start              # mở http://localhost:3000
```

## Cấu trúc

| File | Dùng để |
|------|---------|
| `public/products.js` | Thông tin shop (hotline, Zalo, Shopee, TikTok, bảo hành) và giá từng mã. `price: null` thì web hiện "Liên hệ". |
| `public/index.html` | Giao diện web |
| `public/img/` | Ảnh sản phẩm và logo |
| `server.js` | Máy chủ, API nhận đơn |
| `data/orders.jsonl` | Đơn hàng lưu mỗi dòng một đơn (không đưa lên GitHub) |

## Đơn hàng

- Khách bấm "Gửi đơn hàng", đơn lưu vào `data/orders.jsonl`.
- Xem đơn: mở `https://ten-mien/api/orders?key=ADMIN_KEY`.
- Muốn có đơn là báo về điện thoại: tạo bot Telegram, điền `TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID`.
- Nếu máy chủ lỗi, form tự chuyển sang copy nội dung đơn để khách gửi qua Zalo.

## Deploy lên Hostinger

Cần gói có Node.js (Business Web Hosting trở lên, hoặc Cloud). Gói Single và Premium không chạy được Node.js.

1. hPanel > Websites > Add website > chọn **Node.js Apps**.
2. Chọn **Import Git repository**, kết nối GitHub và chọn kho này.
3. Cấu hình build: Framework **Express** (hoặc Other), Node **20** hoặc mới hơn, Entry file `server.js`, lệnh chạy `npm start`.
4. Phần Environment variables: thêm `ADMIN_KEY`, và `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` nếu dùng.
5. Deploy. Mỗi lần push lên nhánh `main`, Hostinger tự deploy lại.
6. Gắn tên miền trong hPanel và bật SSL.

Lưu ý: file `data/orders.jsonl` có thể bị xóa khi deploy lại, nên bật báo đơn qua Telegram để không sót đơn.
