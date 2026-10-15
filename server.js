// Web bán trạm sạc ENERJOY, chạy bằng máy chủ Node.js thường (máy cá nhân, Hostinger, Render...)
// Trên Vercel không dùng file này: trang lấy từ public/, đơn hàng đi qua api/orders.js
require('./load-env');
const path = require('path');
const fs = require('fs');
const express = require('express');
const { buildOrder, tooMany, notifyTelegram } = require('./lib/orders');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.jsonl');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

app.post('/api/orders', (req, res) => {
  if (tooMany(req.ip)) return res.status(429).json({ ok: false, error: 'Bạn gửi nhiều đơn quá, thử lại sau ít phút nhé.' });

  const { order, error } = buildOrder(req.body);
  if (error) return res.status(400).json({ ok: false, error });

  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.appendFileSync(ORDERS_FILE, JSON.stringify(order) + '\n');
  } catch (err) {
    console.error('Không lưu được đơn', err);
    return res.status(500).json({ ok: false, error: 'Shop chưa nhận được đơn, bạn nhắn Zalo giúp shop nhé.' });
  }

  notifyTelegram(order).catch(err => console.error('Gửi Telegram lỗi', err.message));
  res.json({ ok: true, id: order.id });
});

// Xem đơn: /api/orders?key=ADMIN_KEY
app.get('/api/orders', (req, res) => {
  if (!process.env.ADMIN_KEY || req.query.key !== process.env.ADMIN_KEY) return res.status(401).json({ ok: false });
  let rows = [];
  try { rows = fs.readFileSync(ORDERS_FILE, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l)); } catch (_) {}
  res.json({ ok: true, count: rows.length, orders: rows.reverse() });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: '7d', index: 'index.html' }));
app.use((_req, res) => res.status(404).sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`ENERJOY đang chạy ở cổng ${PORT}`));
