// Tạo các trang tĩnh cho Google (SEO) từ public/products.js và scripts/articles.cjs.
// Chạy lại mỗi khi sửa sản phẩm hoặc bài viết:  node scripts/build-seo.cjs
// Đổi tên miền:  SITE_URL=https://tenmien.vn node scripts/build-seo.cjs
const fs = require('fs'), path = require('path'), vm = require('vm');

const ROOT = path.join(__dirname, '..'), PUB = path.join(ROOT, 'public');
const BASE = (process.env.SITE_URL || 'https://www.enerjoy.vn').replace(/\/$/, '');
const SHOP_NAME = 'Đức Trạm Sạc';

const sb = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(PUB, 'products.js'), 'utf8'), sb);
const { SHOP: S, PRODUCTS: P, SOLAR: SO = [], DEVICES: D = [] } = sb.window;
const ARTICLES = require('./articles.cjs');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmt = n => Number(n).toLocaleString('vi-VN');
const kg = n => String(n).replace('.', ',') + ' kg';
const priceText = v => v.price ? fmt(v.price) + 'đ' : 'Liên hệ';
const prodUrl = p => p.solar ? '/tam-pin-nang-luong-mat-troi-mono/' : `/tram-sac-${p.id}/`;
const artUrl = a => `/bai-viet/${a.slug}/`;
const today = new Date().toISOString().slice(0, 10);

// ---------- khung trang ----------
function page({ url, title, desc, img, h1, body, jsonld = [] }) {
  const ga = /^G-[A-Z0-9]+$/.test(S.gaId || '') ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${S.gaId}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${S.gaId}');
document.addEventListener('click',function(e){var a=e.target.closest('a');if(!a)return;var h=a.getAttribute('href')||'';var k=h.indexOf('zalo.me')>-1?'bam_zalo':h.indexOf('tel:')===0?'bam_goi':a.hasAttribute('data-order')?'bam_dat_mua':'';if(k)gtag('event',k,{san_pham:a.getAttribute('data-order')||document.title});},true);</script>` : '';
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${BASE}${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="vi_VN">
<meta property="og:site_name" content="${SHOP_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${BASE}${url}">
<meta property="og:image" content="${BASE}/${img}">
<meta name="theme-color" content="#2B3894">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="/seo.css">
${jsonld.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
${ga}
</head>
<body>
<header class="top"><div class="wrap">
  <a href="/" aria-label="ENERJOY, về trang chủ"><img class="logo" src="/img/logo-enerjoy.png" alt="ENERJOY" width="600" height="89"></a>
  <nav><a href="/#san-pham">Sản phẩm</a><a href="/bai-viet/">Bài viết</a><a class="hot" href="tel:${S.phone}">${S.phone}</a></nav>
</div></header>
<main class="wrap">
<nav class="crumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a>${url.startsWith('/bai-viet/') && url !== '/bai-viet/' ? ' / <a href="/bai-viet/">Bài viết</a>' : ''} / <span>${esc(h1)}</span></nav>
${body}
</main>
${footer()}
</body>
</html>
`;
}

function footer() {
  return `<footer><div class="wrap">
  <div><img class="logo inv" src="/img/logo-enerjoy.png" alt="ENERJOY" width="600" height="89"><p>${SHOP_NAME}. Hotline, Zalo: <a href="tel:${S.phone}">${S.phone}</a></p>
  <p>${S.policies.map(x => esc(x.title)).join(' · ')}</p></div>
  <div><h3>Sản phẩm</h3><ul>${P.concat(SO).map(p => `<li><a href="${prodUrl(p)}">${esc(p.name)}</a></li>`).join('')}</ul></div>
  <div><h3>Bài viết</h3><ul>${ARTICLES.map(a => `<li><a href="${artUrl(a)}">${esc(a.h1)}</a></li>`).join('')}</ul></div>
</div></footer>`;
}

const ctas = (code, hash) => `<div class="btns">
  <a class="btn pri" href="/#${hash}" data-order="${esc(code)}">Đặt mua trên web</a>
  <a class="btn zalo" href="https://zalo.me/${S.zalo}" target="_blank" rel="noopener">Nhắn Zalo ${S.zalo}</a>
  <a class="btn ghost" href="tel:${S.phone}">Gọi ${S.phone}</a>
</div>`;
const policies = () => `<ul class="pol">${S.policies.map(x => `<li><b>${esc(x.title)}.</b> ${esc(x.text)}</li>`).join('')}</ul>`;
const gallery = p => `<div class="gal">${[p.img].concat(p.photos || []).map((src, i) => `<img src="/${src}" alt="${esc(p.name)}${i ? ' ảnh thực tế ' + i : ''}" loading="${i ? 'lazy' : 'eager'}">`).join('')}</div>`;

// Thời gian dùng thực tế cho từng phiên bản, theo số trong DEVICES (số MẠNH đo / ước theo tỉ lệ đã xác nhận).
function usage(p, v) {
  const out = [];
  const fan = D.find(d => /quạt/i.test(d.name)); if (fan) out.push(`Quạt cây ${fan.w}W: khoảng ${(v.wh * 0.85 / fan.w).toFixed(1).replace('.', ',')} giờ (ước tính)`);
  const lap = D.find(d => d.hoursEach);
  if (lap) { const lo = Math.max(1, Math.floor(v.wh / lap.per)), hi = Math.floor(v.wh / lap.perMin);
    out.push(`Laptop ${lap.w}W: sạc được ${lo === hi ? lo : lo + '-' + hi} lần, dùng thêm khoảng ${lo === hi ? lo * lap.hoursEach : lo * lap.hoursEach + '-' + hi * lap.hoursEach} giờ`); }
  const fr = D.find(d => d.hoursBy); if (fr && fr.hoursBy[v.code]) out.push(`Tủ lạnh ${fr.w}W: khoảng ${fr.hoursBy[v.code]} giờ (shop đo thực tế)`);
  const rc = D.find(d => d.minW);
  if (rc) out.push(p.watt >= rc.minW ? `Nồi cơm điện ${rc.w}W: nấu được khoảng ${Math.floor(v.wh / rc.per + 1e-9)} lần` : `Nồi cơm điện ${rc.w}W: không đủ công suất, cần máy từ ${fmt(rc.minW)}W`);
  return out;
}

// Hỏi đáp: hiện trên trang và khai báo FAQPage để Google, AI đọc được. Chỉ dùng số có trong products.js.
function faqHtml(qa) { return `<section class="faq">\n  <h2>Câu hỏi thường gặp</h2>\n  ${qa.map(([q, a]) => `<details open><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n  ')}\n</section>`; }
function faqLd(qa) { return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }; }
const POL = 'Máy bảo hành chính hãng 5 năm. Trong 7 - 15 ngày đầu, nếu lỗi từ nhà sản xuất thì shop đổi máy mới, 1 đổi 1. Miễn phí giao hàng toàn quốc, được mở hộp kiểm tra trước khi trả tiền.';
function productFaq(p, solar) {
  const V = p.variants, rc = D.find(d => d.minW), n = `trạm sạc dự phòng 220V ENERJOY ${p.watt}W`;
  const qa = [
    [`Trạm sạc ${p.watt}W chạy được thiết bị gì?`, `ENERJOY ${p.watt}W có ${p.ports.join(', ')}. Dùng tốt cho: ${p.useFor.join(', ').toLowerCase()}. Tổng công suất các thiết bị cắm cùng lúc nên dưới ${fmt(Math.floor(p.watt * 0.8))}W (chừa dư 20%). ${usage(p, V[V.length - 1]).slice(0, 2).join('. ')}.`],
  ];
  if (rc) qa.push([`Trạm sạc ${p.watt}W có nấu được nồi cơm điện không?`, p.watt >= rc.minW ? `Được. ${V.map(v => `Bản ${v.code} (${fmt(v.wh)} Wh) nấu được khoảng ${Math.floor(v.wh / rc.per + 1e-9)} lần với nồi cơm ${rc.w}W`).join('; ')}.` : `Không. Nồi cơm điện cần máy từ ${fmt(rc.minW)}W trở lên. Máy ${p.watt}W hợp với quạt, đèn, wifi, sạc điện thoại, laptop.`]);
  qa.push([`Dung lượng thực tế của ENERJOY ${p.watt}W là bao nhiêu?`, V.map(v => `${v.code}: ${fmt(v.wh)} Wh (${fmt(v.mah)} mAh)`).join('; ') + '. Shop ghi Wh thực tế, không dùng số mAh quảng cáo.']);
  qa.push([`Sạc đầy ENERJOY ${p.watt}W mất bao lâu?`, V.map(v => `${v.code}: ${v.charge1}${v.charge2 ? `, cắm 2 củ sạc còn ${v.charge2}` : ''}`).join('; ') + '.']);
  qa.push([`ENERJOY ${p.watt}W là sóng sin chuẩn hay sin mô phỏng?`, p.sine ? `Sóng sin chuẩn, giống điện lưới, chạy được thiết bị có động cơ và thiết bị nhạy điện.` : `Trong các dòng ENERJOY, sóng sin chuẩn có ở máy 3000W. Nếu cần chạy thiết bị có động cơ hoặc thiết bị nhạy điện, nên chọn ENERJOY 3000W.`]);
  if (solar.length) qa.push([`ENERJOY ${p.watt}W sạc bằng pin năng lượng mặt trời được không?`, `Được. Dùng ${solar.map(({ x, f }) => `tấm ${x.code}${f.max ? `, tối đa ${f.max} tấm` : ''}`).join('; ')}.`]);
  qa.push([`Mua ${n} ở đâu, bảo hành thế nào?`, `Đặt trên www.enerjoy.vn, gọi hoặc Zalo ${S.phone}, hoặc mua ở shop Đức Trạm Sạc trên Shopee, TikTok. ${POL}`]);
  return qa;
}

// ---------- trang trạm sạc ----------
function productPage(p) {
  const V = p.variants, whs = [...new Set(V.map(v => v.wh))];
  const whText = whs.map(w => fmt(w)).join(' và ') + ' Wh';
  const ac = (p.ports.find(x => /AC/.test(x)) || '').toLowerCase();
  const title = `Trạm sạc dự phòng 220V ENERJOY ${p.watt}W, ${whs.length > 1 ? fmt(whs[0]) + '-' + fmt(whs[whs.length - 1]) : fmt(whs[0])}Wh | ${SHOP_NAME}`;
  const desc = `Trạm sạc di động 220V ENERJOY ${p.watt}W${p.sine ? ' sóng sin chuẩn' : ''}, tích điện dự phòng mất điện, cắm trại. Dung lượng thực tế ${whText}, ${p.ports.slice(1).join(', ').toLowerCase()}. Bảo hành 5 năm, miễn phí giao hàng, kiểm tra trước khi trả tiền.`;
  const solar = SO.flatMap(s => s.variants.filter(x => (x.fits || []).some(f => f.w === p.watt)).map(x => ({ s, x, f: x.fits.find(f => f.w === p.watt) })));
  const qa = productFaq(p, solar);
  const body = `
<article class="pd">
  ${gallery(p)}
  <div class="info">
    <h1>Trạm sạc dự phòng 220V ENERJOY ${p.watt}W</h1>
    <p class="lead">${esc(p.useFor.join('. '))}.</p>
    <ul class="facts">
      <li><b>${p.watt}W</b><span>công suất${p.sine ? ', sóng sin chuẩn' : ''}</span></li>
      <li><b>${whText}</b><span>dung lượng thực tế</span></li>
      <li><b>${kg(Math.min(...V.map(v => v.kg)))}</b><span>${V.length > 1 ? 'nặng từ' : 'trọng lượng'}</span></li>
    </ul>
    <p><b>Cổng ra:</b> ${esc(p.ports.join(', '))}.</p>
    <p class="price">Giá: <strong>${V.every(v => !v.price) ? 'Liên hệ' : V.map(v => esc(v.code) + ' ' + priceText(v)).join(', ')}</strong></p>
    ${ctas(V[0].code, 'sp-' + p.id)}
    ${policies()}
  </div>
</article>

<section>
  <h2>ENERJOY ${p.watt}W dùng được bao lâu?</h2>
  ${V.map(v => `<h3>${esc(v.code)} (${fmt(v.wh)} Wh)</h3><ul>${usage(p, v).map(x => `<li>${esc(x)}</li>`).join('')}</ul>`).join('')}
  <p class="muted">Thời gian thực tế thay đổi theo thiết bị, tình trạng pin laptop và cách dùng. Tính cho đúng nhà mình bằng <a href="/#tinh-gio">công cụ tính trên trang chủ</a>.</p>
  ${solar.length ? `<p><b>Sạc bằng năng lượng mặt trời:</b> ${solar.map(({ s, x, f }) => `dùng <a href="${prodUrl(s)}">${esc(x.code)}</a>${f.max ? `, tối đa ${f.max} tấm` : ''}`).join('; ')}.</p>` : ''}
</section>

<section>
  <h2>Thông số kỹ thuật</h2>
  <div class="tbl"><table>
    <thead><tr><th>Thông số</th>${V.map(v => `<th>${esc(v.code)}</th>`).join('')}</tr></thead>
    <tbody>
      <tr><td>Công suất</td>${V.map(() => `<td>${p.watt}W${p.sine ? ' sóng sin chuẩn' : ''}</td>`).join('')}</tr>
      <tr><td>Dòng pin</td>${V.map(v => `<td>${esc(v.amp)}</td>`).join('')}</tr>
      <tr><td>Dung lượng thực tế</td>${V.map(v => `<td>${fmt(v.wh)} Wh (${fmt(v.mah)} mAh)</td>`).join('')}</tr>
      <tr><td>Thời gian sạc đầy</td>${V.map(v => `<td>${esc(v.charge1)}${v.charge2 ? ', 2 củ sạc ' + esc(v.charge2) : ''}</td>`).join('')}</tr>
      <tr><td>Kích thước</td>${V.map(v => `<td>${esc(v.size)}</td>`).join('')}</tr>
      <tr><td>Trọng lượng</td>${V.map(v => `<td>${kg(v.kg)}</td>`).join('')}</tr>
      <tr><td>Phụ kiện</td>${V.map(v => `<td>${esc(v.accessories)}</td>`).join('')}</tr>
    </tbody>
  </table></div>
</section>

<section>
  <h2>Các dòng máy khác</h2>
  <ul class="others">${P.filter(x => x !== p).map(x => `<li><a href="${prodUrl(x)}">ENERJOY ${x.watt}W</a></li>`).join('')}</ul>
</section>

${faqHtml(qa)}`;
  const jsonld = [breadcrumb([['Trang chủ', '/'], [p.name, prodUrl(p)]]), faqLd(qa)];
  if (V.some(v => v.price)) jsonld.push(productLd(p, desc));
  return page({ url: prodUrl(p), title, desc, img: p.img, h1: p.name, body, jsonld });
}

// ---------- trang tấm pin ----------
function solarPage(p) {
  const V = p.variants;
  const title = `Tấm pin năng lượng mặt trời MONO 100W, 200W cho trạm sạc | ${SHOP_NAME}`;
  const desc = `Tấm pin năng lượng mặt trời MONO 100W, 200W và combo 2 tấm, hiệu suất cell đến 24,6%, hộp đấu nối IP67. Dùng nạp điện cho trạm sạc ENERJOY 400W đến 3000W.`;
  const singles = V.filter(v => !v.qty);
  const qa = [
    ['Tấm pin năng lượng mặt trời nào hợp với trạm sạc ENERJOY?', singles.map(v => `${v.code}: ${v.fit}`).join('. ') + '.'],
    ['Có combo 2 tấm pin không?', `Có. ${V.filter(v => v.qty).map(v => v.code).join(', ')}, gồm 2 tấm cùng loại, thông số như tấm lẻ.`],
    ['Mua tấm pin ở đâu, bảo hành thế nào?', `Đặt trên www.enerjoy.vn, gọi hoặc Zalo ${S.phone}. Miễn phí giao hàng toàn quốc, được kiểm tra trước khi trả tiền.`],
  ];
  const body = `
<article class="pd">
  ${gallery(p)}
  <div class="info">
    <h1>${esc(p.name)}</h1>
    <p class="lead">${esc(p.useFor.join('. '))}.</p>
    <p><b>Phân loại:</b> ${V.map(v => esc(v.code)).join(', ')}.</p>
    <p class="price">Giá: <strong>${V.every(v => !v.price) ? 'Liên hệ' : V.map(v => esc(v.code) + ' ' + priceText(v)).join(', ')}</strong></p>
    ${ctas(V[0].code, 'sp-' + p.id)}
    ${policies()}
  </div>
</article>
<section>
  <h2>Chọn tấm pin theo trạm sạc</h2>
  <ul>${singles.map(v => `<li><b>${esc(v.code)}:</b> ${esc(v.fit)}.</li>`).join('')}</ul>
  <p>Đọc thêm: <a href="${artUrl(ARTICLES[2])}">${esc(ARTICLES[2].h1)}</a></p>
</section>
<section>
  <h2>Thông số kỹ thuật</h2>
  <div class="tbl"><table>
    <thead><tr><th>Thông số</th>${singles.map(v => `<th>${esc(v.code)}</th>`).join('')}</tr></thead>
    <tbody>
      <tr><td>Điện áp</td>${singles.map(v => `<td>${esc(v.volt)}</td>`).join('')}</tr>
      <tr><td>Số cell</td>${singles.map(v => `<td>${v.cells}</td>`).join('')}</tr>
      <tr><td>Kích thước</td>${singles.map(v => `<td>${esc(v.size)}</td>`).join('')}</tr>
      <tr><td>Trọng lượng</td>${singles.map(v => `<td>${kg(v.kg)}</td>`).join('')}</tr>
      ${singles[0].specs.slice(1).map((row, i) => `<tr><td>${esc(row[0])}</td>${singles.map(v => `<td>${esc((v.specs[i + 1] || [])[1] || '')}</td>`).join('')}</tr>`).join('')}
    </tbody>
  </table></div>
  <p class="muted">Combo 2 tấm gồm 2 tấm cùng loại, thông số như tấm lẻ.</p>
</section>

${faqHtml(qa)}`;
  return page({ url: prodUrl(p), title, desc, img: p.img, h1: p.name, body, jsonld: [breadcrumb([['Trang chủ', '/'], [p.name, prodUrl(p)]]), faqLd(qa)] });
}

// ---------- bài viết ----------
function machineTable() {
  return `<div class="tbl"><table><thead><tr><th>Máy</th><th>Phiên bản</th><th>Dung lượng thực tế</th><th>Trọng lượng</th></tr></thead><tbody>${
    P.flatMap(p => p.variants.map(v => `<tr><td><a href="${prodUrl(p)}">ENERJOY ${p.watt}W</a></td><td>${esc(v.code)}</td><td>${fmt(v.wh)} Wh</td><td>${kg(v.kg)}</td></tr>`)).join('')}</tbody></table></div>`;
}
function articlePage(a) {
  const body = `<article class="post">
  <h1>${esc(a.h1)}</h1>
  <p class="muted">${SHOP_NAME} · ${a.date.split('-').reverse().join('/')}</p>
  ${a.body.replace('{{BANG_MAY}}', machineTable())}
  <div class="cta-box"><p><b>Cần tư vấn chọn máy?</b> Nhắn Zalo hoặc gọi shop, báo thiết bị nhà bạn hay dùng, shop chọn giúp máy vừa đủ.</p>${ctas('', 'lien-he').replace(' data-order=""', '')}</div>
</article>`;
  const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: a.h1, description: a.desc, datePublished: a.date, dateModified: a.date, inLanguage: 'vi',
    image: [`${BASE}/img/tram-sac-1100W.webp`], author: { '@type': 'Organization', name: SHOP_NAME }, publisher: { '@type': 'Organization', name: SHOP_NAME, logo: { '@type': 'ImageObject', url: `${BASE}/img/icon-512.png` } }, mainEntityOfPage: `${BASE}${artUrl(a)}` };
  return page({ url: artUrl(a), title: a.title, desc: a.desc, img: 'img/tram-sac-1100W.webp', h1: a.h1, body, jsonld: [ld, breadcrumb([['Trang chủ', '/'], ['Bài viết', '/bai-viet/'], [a.h1, artUrl(a)]])] });
}
function blogIndex() {
  const body = `<h1>Bài viết hướng dẫn chọn trạm sạc</h1>
<ul class="posts">${ARTICLES.map(a => `<li><a href="${artUrl(a)}"><b>${esc(a.h1)}</b><span>${esc(a.desc)}</span></a></li>`).join('')}</ul>`;
  return page({ url: '/bai-viet/', title: `Bài viết hướng dẫn chọn trạm sạc dự phòng | ${SHOP_NAME}`, desc: 'Hướng dẫn chọn trạm sạc dự phòng, tấm pin năng lượng mặt trời, tính thời gian dùng cho tủ lạnh, quạt, laptop, nồi cơm khi mất điện.', img: 'img/tram-sac-1100W.webp', h1: 'Bài viết', body });
}

// ---------- schema ----------
function breadcrumb(items) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, u], i) => ({ '@type': 'ListItem', position: i + 1, name, item: BASE + u })) };
}
function productLd(p, desc) {
  return { '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: desc, image: [`${BASE}/${p.img}`], brand: { '@type': 'Brand', name: 'ENERJOY' },
    offers: p.variants.filter(v => v.price).map(v => ({ '@type': 'Offer', sku: v.code, price: v.price, priceCurrency: 'VND', availability: 'https://schema.org/InStock', url: BASE + prodUrl(p) })) };
}

// ---------- ghi file ----------
function write(rel, html) { const f = path.join(PUB, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); }
const urls = ['/'];
P.forEach(p => { write(`tram-sac-${p.id}/index.html`, productPage(p)); urls.push(prodUrl(p)); });
SO.forEach(p => { write('tam-pin-nang-luong-mat-troi-mono/index.html', solarPage(p)); urls.push(prodUrl(p)); });
write('bai-viet/index.html', blogIndex()); urls.push('/bai-viet/');
ARTICLES.forEach(a => { write(`bai-viet/${a.slug}/index.html`, articlePage(a)); urls.push(artUrl(a)); });

write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${BASE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
// Mở cửa cho Google và bot AI (ChatGPT, Claude, Gemini, Perplexity...) đọc trang.
const AI_BOTS = ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', 'Google-Extended', 'PerplexityBot', 'Perplexity-User', 'CCBot', 'Applebot-Extended'];
write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\n${AI_BOTS.map(b => `User-agent: ${b}\nAllow: /\nDisallow: /api/\n`).join('\n')}\nSitemap: ${BASE}/sitemap.xml\n`);
// llms.txt: bản tóm tắt cho AI đọc nhanh cửa hàng và sản phẩm.
write('llms.txt', `# ${SHOP_NAME} - Trạm sạc dự phòng 220V ENERJOY

> Cửa hàng bán trạm sạc di động, trạm tích điện 220V thương hiệu ENERJOY (400W đến 3000W) và tấm pin năng lượng mặt trời MONO. Dùng dự phòng mất điện cho gia đình, cắm trại, bán hàng đêm. Website: ${BASE}/ . Hotline, Zalo: ${S.phone}.

Chính sách: ${POL}

## Trạm sạc
${P.map(p => `- [${p.name}](${BASE}${prodUrl(p)}): ${p.watt}W${p.sine ? ' sóng sin chuẩn' : ''}, ${p.variants.map(v => `${v.code} ${fmt(v.wh)} Wh${v.price ? ' giá ' + fmt(v.price) + 'đ' : ''}`).join('; ')}. ${p.useFor.join(', ')}.`).join('\n')}

## Tấm pin năng lượng mặt trời
${SO.map(p => `- [${p.name}](${BASE}${prodUrl(p)}): ${p.variants.map(v => v.code + (v.price ? ' giá ' + fmt(v.price) + 'đ' : '')).join('; ')}.`).join('\n')}

## Bài viết
${ARTICLES.map(a => `- [${a.h1}](${BASE}${artUrl(a)}): ${a.desc}`).join('\n')}

## Kênh chính thức
${[['Facebook', S.facebook], ['Shopee', S.shopee], ['TikTok Shop', S.tiktok]].filter(x => x[1]).map(([k, u]) => `- ${k}: ${u}`).join('\n')}
`);

// Trang chủ: thẻ chia sẻ, canonical, dữ liệu cửa hàng, và khối link tĩnh ở chân trang để Google đi tới các trang con.
let home = fs.readFileSync(path.join(PUB, 'index.html'), 'utf8');
const homeFaq = [...home.matchAll(/<details><summary>([^<]+)<\/summary><p>([^<]+)<\/p><\/details>/g)].map(m => [m[1], m[2]]);
const homeHead = `<!--seo-head-->
<link rel="canonical" href="${BASE}/">
<meta property="og:type" content="website">
<meta property="og:locale" content="vi_VN">
<meta property="og:site_name" content="${SHOP_NAME}">
<meta property="og:title" content="Trạm sạc dự phòng ENERJOY 400W đến 3000W | ${SHOP_NAME}">
<meta property="og:description" content="Trạm sạc di động ENERJOY dự phòng mất điện, cắm trại, bán hàng đêm. Bảo hành 5 năm, freeship toàn quốc, kiểm tra hàng trước khi trả tiền.">
<meta property="og:url" content="${BASE}/">
<meta property="og:image" content="${BASE}/img/tram-sac-1100W.webp">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Store', name: SHOP_NAME, brand: { '@type': 'Brand', name: 'ENERJOY' }, url: BASE + '/', telephone: S.phone, image: `${BASE}/img/tram-sac-1100W.webp`, logo: `${BASE}/img/icon-512.png`, sameAs: [S.facebook, S.shopee, S.tiktok].filter(Boolean) })}</script>
${homeFaq.length ? `<script type="application/ld+json">${JSON.stringify(faqLd(homeFaq))}</script>\n` : ''}<!--/seo-head-->`;
home = home.replace(/<!--seo-head-->[\s\S]*?<!--\/seo-head-->/, '');
home = home.replace('</head>', homeHead + '\n</head>');
const links = `<!--seo-links--><nav class="ft-links" aria-label="Trang sản phẩm và bài viết">${P.concat(SO).map(p => `<a href="${prodUrl(p)}">${esc(p.name)}</a>`).join('')}<a href="/bai-viet/">Bài viết hướng dẫn</a>${ARTICLES.map(a => `<a href="${artUrl(a)}">${esc(a.h1)}</a>`).join('')}</nav><!--/seo-links-->`;
if (/<!--seo-links-->[\s\S]*?<!--\/seo-links-->/.test(home)) home = home.replace(/<!--seo-links-->[\s\S]*?<!--\/seo-links-->/, links);
else home = home.replace('<ul class="ft-pol" id="ft-pol"></ul>', '<ul class="ft-pol" id="ft-pol"></ul>\n    ' + links);
fs.writeFileSync(path.join(PUB, 'index.html'), home);

console.log('BASE', BASE, '\n' + urls.join('\n'));
