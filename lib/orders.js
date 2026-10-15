// Logic đơn hàng dùng chung cho server.js (chạy máy chủ thường) và api/orders.js (chạy trên Vercel)
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// products.js viết cho trình duyệt (gán vào window), đọc trong sandbox để dùng chung dữ liệu
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'public', 'products.js'), 'utf8'), sandbox);
const { PRODUCTS } = sandbox.window;
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

// Trả về { order } nếu hợp lệ, hoặc { error } để báo lại cho khách
function buildOrder(body = {}) {
  const order = {
    id: 'DH' + Date.now().toString(36).toUpperCase(),
    createdAt: new Date().toISOString(),
    name: clean(body.name, 80),
    phone: clean(body.phone, 20).replace(/[^\d+]/g, ''),
    sku: clean(body.sku, 40),
    qty: Math.min(Math.max(parseInt(body.qty, 10) || 1, 1), 50),
    address: clean(body.address, 300),
  };
  if (!order.name) return { error: 'Bạn điền giúp họ tên nhé.' };
  if (!/^(\+?84|0)\d{9,10}$/.test(order.phone)) return { error: 'Số điện thoại chưa đúng, kiểm tra lại giúp shop.' };
  if (!SKUS.has(order.sku)) return { error: 'Sản phẩm không có trong danh sách.' };
  return { order };
}

const telegramReady = () => Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);

// Báo đơn mới về Telegram. Ném lỗi nếu Telegram từ chối.
async function notifyTelegram(o) {
  if (!telegramReady()) return false;
  const text = `Đơn mới ${o.id}\n${o.name} - ${o.phone}\n${o.sku} x ${o.qty}\n${o.address || '(chưa có địa chỉ)'}`;
  const r = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }),
  });
  if (!r.ok) throw new Error('Telegram trả lỗi ' + r.status);
  return true;
}

module.exports = { buildOrder, tooMany, notifyTelegram, telegramReady };
