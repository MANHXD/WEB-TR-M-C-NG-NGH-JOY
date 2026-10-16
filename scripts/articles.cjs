// Bài viết SEO. Số liệu lấy từ products.js và số MẠNH đo thực tế (2026-10-16).
// Văn phong: tiếng Việt gần gũi, không emoji, không dùng em dash.
// Mỗi bài: slug (đường dẫn), title (tiêu đề Google), h1, desc (mô tả Google), date, body (HTML).

module.exports = [
  {
    slug: 'mat-dien-dung-tram-sac-nao-cho-tu-lanh',
    title: 'Mất điện dùng trạm sạc nào cho tủ lạnh? Số giờ chạy thực tế',
    h1: 'Mất điện dùng trạm sạc nào cho tủ lạnh?',
    desc: 'Tủ lạnh 120W chạy được bao lâu bằng trạm sạc dự phòng? Số giờ shop đo thực tế với ENERJOY 600W, 1100W, 1600W và cách chọn máy cho nhà hay mất điện.',
    date: '2026-10-16',
    body: `
<p>Mùa hè mất điện vài tiếng là đồ trong tủ lạnh bắt đầu lo. Câu shop được hỏi nhiều nhất là: máy nào cắm được tủ lạnh, và cắm được bao lâu. Bài này trả lời bằng số shop đo thực tế, không phải số trên giấy.</p>

<h2>Tủ lạnh chạy được bao lâu với từng máy</h2>
<p>Shop thử với tủ lạnh khoảng 120W, loại phổ biến trong gia đình:</p>
<table>
<thead><tr><th>Máy</th><th>Dung lượng thực tế</th><th>Tủ lạnh 120W chạy được</th></tr></thead>
<tbody>
<tr><td><a href="/tram-sac-600w/">ENERJOY 600W-30A</a></td><td>333 Wh</td><td>khoảng 6 giờ</td></tr>
<tr><td><a href="/tram-sac-1100w/">ENERJOY 1100W-30A</a></td><td>333 Wh</td><td>khoảng 8 giờ</td></tr>
<tr><td><a href="/tram-sac-1600w/">ENERJOY 1600W-60A</a></td><td>666 Wh</td><td>khoảng 12 giờ</td></tr>
<tr><td><a href="/tram-sac-1600w/">ENERJOY 1600W-100A</a></td><td>1110 Wh</td><td>khoảng 24 giờ</td></tr>
</tbody>
</table>
<p>Tủ lạnh không chạy liên tục. Máy nén chạy một lúc rồi nghỉ, nên số giờ thực tế dài hơn nhiều so với lấy dung lượng chia cho 120W. Số trên còn thay đổi theo đời tủ, nhiệt độ phòng và số lần mở cửa tủ.</p>

<h2>Nên chọn máy nào</h2>
<ul>
<li><strong>Mất điện vài tiếng trong ngày:</strong> 1100W-30A là đủ, vừa cắm tủ lạnh vừa còn ổ cho quạt, wifi.</li>
<li><strong>Hay mất điện qua đêm:</strong> 1600W-60A, giữ tủ lạnh khoảng 12 giờ.</li>
<li><strong>Mất điện cả ngày hoặc nhà có nhiều thiết bị:</strong> 1600W-100A, khoảng 24 giờ cho tủ lạnh. Nếu cần chạy thêm thiết bị có động cơ, xem <a href="/tram-sac-3000w/">ENERJOY 3000W sóng sin chuẩn</a>.</li>
</ul>
<p>Lúc máy nén khởi động, tủ lạnh kéo điện cao hơn lúc chạy bình thường. Vì vậy nên chọn máy có công suất dư ra, đừng chọn sát với công suất ghi trên tủ.</p>

<h2>Mẹo giữ tủ lạnh lâu hơn khi mất điện</h2>
<ul>
<li>Hạn chế mở cửa tủ, mỗi lần mở là máy nén phải chạy lại lâu hơn.</li>
<li>Không cắm thêm thiết bị công suất lớn vào cùng máy khi đang chạy tủ lạnh.</li>
<li>Sạc đầy trạm sạc khi có điện trở lại để sẵn sàng cho lần sau.</li>
</ul>

<p>Muốn tính cho đúng nhà mình, bạn dùng <a href="/#tinh-gio">công cụ tính thời gian sử dụng</a> trên trang chủ: chọn tủ lạnh, quạt, đèn, web sẽ hiện máy nào phù hợp.</p>
`,
  },
  {
    slug: 'cach-chon-tram-sac-du-phong-cho-gia-dinh',
    title: 'Cách chọn trạm sạc dự phòng cho gia đình: tính theo Wh, không theo mAh',
    h1: 'Cách chọn trạm sạc dự phòng cho gia đình',
    desc: 'Hướng dẫn chọn trạm sạc dự phòng theo thiết bị trong nhà: công suất W, dung lượng Wh, vì sao không nên nhìn số mAh, ví dụ với quạt, laptop, nồi cơm điện.',
    date: '2026-10-16',
    body: `
<p>Chọn trạm sạc dự phòng chỉ cần nhìn đúng 2 con số: <strong>công suất (W)</strong> và <strong>dung lượng (Wh)</strong>. Hiểu 2 số này là chọn được máy vừa nhu cầu, không tốn tiền mua máy quá to, cũng không mua phải máy yếu.</p>

<h2>Công suất W: cắm được thiết bị nào</h2>
<p>Công suất là mức điện tối đa máy cấp ra cùng lúc. Cộng công suất các thiết bị bạn muốn cắm cùng lúc, rồi chọn máy có công suất dư ít nhất 20%.</p>
<p>Ví dụ quạt cây 45W, đèn LED 10W, wifi 12W, tổng 67W. Máy nào của ENERJOY cũng cắm được. Nhưng nồi cơm điện 600W thì cần máy từ 1100W trở lên, máy 400W, 500W, 600W không đủ công suất.</p>

<h2>Dung lượng Wh: dùng được bao lâu</h2>
<p>Dung lượng là lượng điện máy chứa được. Cách tính gần đúng:</p>
<p class="formula">Số giờ dùng = Dung lượng (Wh) x 85% / Tổng công suất thiết bị (W)</p>
<p>85% là phần điện dùng được sau hao hụt khi đổi sang điện 220V. Với ví dụ 67W ở trên, máy 1100W-30A (333 Wh) chạy được khoảng 333 x 0,85 / 67, tức khoảng 4,2 giờ.</p>

<h2>Vì sao không nên nhìn số mAh</h2>
<p>Số mAh thường được tính theo điện áp pin 3,7V nên con số rất to, dễ gây hiểu nhầm khi so sánh. Cùng một máy 333 Wh có thể ghi là 90.000 mAh. ENERJOY ghi rõ Wh thực tế để bạn so sánh cho dễ.</p>

<h2>Một vài con số thực tế để hình dung</h2>
<ul>
<li><strong>Laptop 65W:</strong> máy 10A sạc được tầm 2-3 lần. Sạc đầy pin laptop sử dụng được thêm 3 giờ thì tổng sẽ là 6-9 giờ. Thời gian thực tế còn tuỳ tình trạng pin laptop của mỗi người.</li>
<li><strong>Nồi cơm điện 600W:</strong> máy 1100W nấu được khoảng 3 lần, 1600W-60A khoảng 6 lần, 1600W-100A khoảng 10 lần.</li>
<li><strong>Tủ lạnh 120W:</strong> xem bài <a href="/bai-viet/mat-dien-dung-tram-sac-nao-cho-tu-lanh/">Mất điện dùng trạm sạc nào cho tủ lạnh</a>.</li>
</ul>

<h2>Bảng dung lượng các dòng máy ENERJOY</h2>
{{BANG_MAY}}

<p>Chưa chắc chọn máy nào, bạn dùng <a href="/#tinh-gio">công cụ tính trên trang chủ</a> hoặc nhắn Zalo shop để được tư vấn theo thiết bị nhà mình.</p>
`,
  },
  {
    slug: 'tam-pin-nang-luong-mat-troi-cho-tram-sac',
    title: 'Tấm pin năng lượng mặt trời cho trạm sạc: chọn 100W hay 200W',
    h1: 'Tấm pin năng lượng mặt trời cho trạm sạc: chọn 100W hay 200W?',
    desc: 'Trạm sạc ENERJOY dùng tấm pin năng lượng mặt trời MONO 100W hay 200W, ghép được mấy tấm. Bảng chọn tấm pin theo từng máy 400W đến 3000W.',
    date: '2026-10-16',
    body: `
<p>Có tấm pin năng lượng mặt trời, trạm sạc tự nạp điện ban ngày. Rất hợp cho nhà hay mất điện dài, đi cắm trại nhiều ngày hoặc bán hàng ngoài trời. Câu hỏi chính là chọn tấm 100W hay 200W, và ghép được mấy tấm.</p>

<h2>Bảng chọn tấm pin theo máy</h2>
<table>
<thead><tr><th>Trạm sạc</th><th>Tấm pin phù hợp</th><th>Số tấm tối đa</th></tr></thead>
<tbody>
<tr><td><a href="/tram-sac-400w/">ENERJOY 400W</a></td><td>MONO 100W</td><td>1 tấm</td></tr>
<tr><td><a href="/tram-sac-500w/">ENERJOY 500W</a></td><td>MONO 100W</td><td>1 tấm</td></tr>
<tr><td><a href="/tram-sac-600w/">ENERJOY 600W</a></td><td>MONO 100W</td><td>2 tấm</td></tr>
<tr><td><a href="/tram-sac-1100w/">ENERJOY 1100W</a></td><td>MONO 100W</td><td>2 tấm</td></tr>
<tr><td><a href="/tram-sac-1600w/">ENERJOY 1600W</a></td><td>MONO 100W</td><td>2 tấm</td></tr>
<tr><td><a href="/tram-sac-3000w/">ENERJOY 3000W</a></td><td>MONO 200W</td><td>2 tấm</td></tr>
</tbody>
</table>
<p>Máy nào hỗ trợ 2 tấm thì shop có sẵn <strong>combo 2 tấm</strong> để bạn khỏi phải mua lẻ.</p>

<h2>Khác nhau giữa tấm MONO 100W và 200W</h2>
<table>
<thead><tr><th></th><th>MONO 100W</th><th>MONO 200W</th></tr></thead>
<tbody>
<tr><td>Điện áp</td><td>18V</td><td>24V</td></tr>
<tr><td>Số cell</td><td>32</td><td>48</td></tr>
<tr><td>Hiệu suất tế bào quang điện</td><td>23%</td><td>24,6%</td></tr>
<tr><td>Kích thước</td><td>450 x 1190 x 25 x 20 mm</td><td>770 x 1160 x 30 x 25 mm</td></tr>
<tr><td>Trọng lượng</td><td>5,1 kg</td><td>8,5 kg</td></tr>
</tbody>
</table>
<p>Cả 2 loại đều có hộp đấu nối chống nước IP67 và chịu nhiệt từ -40 °C đến 85 °C, để ngoài trời được.</p>

<h2>Lưu ý khi dùng</h2>
<ul>
<li>Lượng điện nạp vào phụ thuộc nhiều vào nắng. Trời âm u hoặc bị che bóng thì nạp chậm hơn hẳn.</li>
<li>Đặt tấm pin hướng thẳng về phía mặt trời, không để lá cây hay mái che che bóng.</li>
<li>Không ghép quá số tấm tối đa của máy trong bảng trên.</li>
</ul>

<p>Xem chi tiết và đặt mua tại trang <a href="/tam-pin-nang-luong-mat-troi-mono/">tấm pin năng lượng mặt trời MONO</a>.</p>
`,
  },
];
