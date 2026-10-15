// Web bán trạm sạc ENERJOY
// Phục vụ trang tĩnh trong public/ và nhận đơn hàng qua /api/orders
require('./load-env');
const path = require('path');
const fs = require('fs');
const express = require('express');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.jsonl');
const vm = require('vm');

// products.js viết cho trình duyệt (gán vào window), đọc nó trong sandbox để server dùng chung dữ liệu
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'public', 'products.js'), 'utf8'), sandbox);
const { PRODUCTS } = sandbox.window;

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

// Danh sách mã hợp lệ, để chặn đơn gửi mã lạ
const SKUS = new Set(PRODUCTS.flatMap(p => p.variants.map(v => v.code)));

// Chống spam đơn giản: mỗi IP tối đa 5 đơn / 10 phút
const hits = new Map();
function tooMany(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);

app.post('/api/orders', async (req, res) => {
  if (tooMany(req.ip)) return res.status(429).json({ ok: false, error: 'Bạn gửi nhiều đơn quá, thử lại sau ít phút nhé.' });

  const order = {
    id: 'DH' + Date.now().toString(36).toUpperCase(),
    createdAt: new Date().toISOString(),
    name: clean(req.body.name, 80),
    phone: clean(req.body.phone, 20).replace(/[^\d+]/g, ''),
    sku: clean(req.body.sku, 40),
    qty: Math.min(Math.max(parseInt(req.body.qty, 10) || 1, 1), 50),
    address: clean(req.body.address, 300),
  };

  if (!order.name) return res.status(400).json({ ok: false, error: 'Bạn điền giúp họ tên nhé.' });
  if (!/^(\+?84|0)\d{9,10}$/.test(order.phone)) return res.status(400).json({ ok: false, error: 'Số điện thoại chưa đúng, kiểm tra lại giúp shop.' });
  if (!SKUS.has(order.sku)) return res.status(400).json({ ok: false, error: 'Sản phẩm không có trong danh sách.' });

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

// Báo đơn mới về Telegram nếu có TELEGRAM_BOT_TOKEN và TELEGRAM_CHAT_ID
async function notifyTelegram(o) {
  const token = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  const text = `Đơn mới ${o.id}\n${o.name} - ${o.phone}\n${o.sku} x ${o.qty}\n${o.address || '(chưa có địa chỉ)'}`;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text }),
  });
}

app.listen(PORT, () => console.log(`ENERJOY đang chạy ở cổng ${PORT}`));
