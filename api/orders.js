// Nhận đơn trên Vercel. Vercel không lưu được file, nên đơn được gửi thẳng về Telegram.
// Nếu chưa cài Telegram, trả lỗi để form tự chuyển sang gửi đơn qua Zalo.
const { buildOrder, tooMany, notifyTelegram, telegramReady } = require('../lib/orders');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  if (tooMany(ip)) return res.status(429).json({ ok: false, error: 'Bạn gửi nhiều đơn quá, thử lại sau ít phút nhé.' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (_) { body = {}; } }

  const { order, error } = buildOrder(body);
  if (error) return res.status(400).json({ ok: false, error });

  if (!telegramReady()) return res.status(503).json({ ok: false, error: 'Chưa cài nơi nhận đơn.' });
  try {
    await notifyTelegram(order);
  } catch (err) {
    console.error(err);
    return res.status(502).json({ ok: false, error: 'Shop chưa nhận được đơn.' });
  }
  res.status(200).json({ ok: true, id: order.id });
};
