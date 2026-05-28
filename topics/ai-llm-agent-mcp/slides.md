---
theme: ../../theme
title: "Sự tiến hóa của AI"
info: |
  Buổi chia sẻ kiến thức: từ AI thắng cờ, tới LLM, tới Agent — và vì sao cần một
  "USB-C cho AI" (MCP).
layout: cover
background: /images/02-ai-generated-abstract-minimalistic-dark-.jpg
class: text-left
mdc: true
drawings:
  persist: false
---

# Sự tiến hóa của AI

Cùng dạo một vòng xem AI đã lớn lên thế nào — từ bàn cờ, tới LLM, tới Agent.

<div class="mt-4 text-sm opacity-70">
Buổi chia sẻ kiến thức · 2026-05-28
</div>

<!--
2 năm trước AI chỉ trả lời; giờ AI tự đặt vé, sửa code, query DB. Điều gì đã thay đổi?
Mạch tiến hoá nằm ở "tools" — và bài toán quản lý chúng.
-->

---
layout: default
---

# Nội dung chính

<div class="mt-8 flex flex-col">
  <div class="flex gap-5">
    <div class="flex flex-col items-center">
      <div style="flex:none;display:flex;align-items:center;justify-content:center;width:2.3rem;height:2.3rem;border-radius:9999px;background:linear-gradient(135deg,var(--sharing-accent),var(--sharing-accent-2));color:#fff;font-weight:700;font-size:1.05rem">1</div>
      <div style="flex:1;width:2px;background:var(--sharing-border);margin-top:.3rem"></div>
    </div>
    <div class="pb-6">
      <div style="font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--sharing-muted);font-weight:700">Phần 1</div>
      <div style="font-size:1.5rem;font-weight:700;color:var(--sharing-fg);line-height:1.25">Sự phát triển của AI</div>
      <div style="color:var(--sharing-fg-soft);font-size:.95rem;margin-top:.15rem">Từ AI cổ điển, tới LLM, tới Agent — vì sao mỗi giai đoạn xuất hiện</div>
    </div>
  </div>
  <div class="flex gap-5">
    <div class="flex flex-col items-center">
      <div style="flex:none;display:flex;align-items:center;justify-content:center;width:2.3rem;height:2.3rem;border-radius:9999px;background:linear-gradient(135deg,var(--sharing-accent),var(--sharing-accent-2));color:#fff;font-weight:700;font-size:1.05rem">2</div>
      <div style="flex:1;width:2px;background:var(--sharing-border);margin-top:.3rem"></div>
    </div>
    <div class="pb-6">
      <div style="font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--sharing-muted);font-weight:700">Phần 2</div>
      <div style="font-size:1.5rem;font-weight:700;color:var(--sharing-fg);line-height:1.25">Các thành phần của Agent</div>
      <div style="color:var(--sharing-fg-soft);font-size:.95rem;margin-top:.15rem">LLM, planning, memory, tools — và bài toán bùng nổ tích hợp</div>
    </div>
  </div>
  <div class="flex gap-5">
    <div class="flex flex-col items-center">
      <div style="flex:none;display:flex;align-items:center;justify-content:center;width:2.3rem;height:2.3rem;border-radius:9999px;background:linear-gradient(135deg,var(--sharing-accent),var(--sharing-accent-2));color:#fff;font-weight:700;font-size:1.05rem">3</div>
    </div>
    <div>
      <div style="font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--sharing-muted);font-weight:700">Phần 3</div>
      <div style="font-size:1.5rem;font-weight:700;color:var(--sharing-fg);line-height:1.25">MCP</div>
      <div style="color:var(--sharing-fg-soft);font-size:.95rem;margin-top:.15rem">Chuẩn hoá kết nối, biến M×N thành M+N</div>
    </div>
  </div>
</div>

<Spotlight label="Thông điệp cốt lõi" class="mt-4">
Agent mạnh lên nhờ <strong>tools</strong>. Nhưng tools nhiều lên thì tích hợp vỡ trận —
<strong>MCP</strong> chuẩn hoá lớp kết nối để mọi agent dùng chung mọi tool.
</Spotlight>

<!--
Slide "Nội dung chính" — 3 phần dạng timeline dọc (HTML). Đặt kỳ vọng cấu trúc buổi.
-->

---
layout: section
number: "01"
background: /images/01-abstract-futuristic-digital-and-technolo.jpg
---

# Hành trình của AI

Sáu thập kỷ, vài cột mốc — mỗi giai đoạn phá một giới hạn.

<!--
Dẫn vào timeline ngay sau đây.
-->

---
layout: default
---

# Khi máy bắt đầu thắng người

<div class="mt-5 flex flex-col">
  <div class="flex gap-4">
    <div class="flex flex-col items-center">
      <div style="flex:none;width:.85rem;height:.85rem;border-radius:9999px;background:var(--sharing-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent);margin-top:.5rem"></div>
      <div style="flex:1;width:2px;background:var(--sharing-border)"></div>
    </div>
    <div class="pb-3">
      <span style="font-weight:700;color:var(--sharing-accent);font-size:1.1rem">1950s–1980s</span>
      <span style="color:var(--sharing-fg-soft)"> — AI cổ điển / <strong>expert systems</strong> (rule-based)</span>
    </div>
  </div>
  <div class="flex gap-4">
    <div class="flex flex-col items-center">
      <div style="flex:none;width:.85rem;height:.85rem;border-radius:9999px;background:var(--sharing-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent);margin-top:.5rem"></div>
      <div style="flex:1;width:2px;background:var(--sharing-border)"></div>
    </div>
    <div class="pb-3">
      <span style="font-weight:700;color:var(--sharing-accent);font-size:1.1rem">1997</span>
      <span style="color:var(--sharing-fg-soft)"> — IBM <strong>Deep Blue</strong> thắng Garry Kasparov (cờ vua) — <em style="color:var(--sharing-fg)">"AI thắng vua cờ"</em></span>
    </div>
  </div>
  <div class="flex gap-4">
    <div class="flex flex-col items-center">
      <div style="flex:none;width:.85rem;height:.85rem;border-radius:9999px;background:var(--sharing-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent);margin-top:.5rem"></div>
      <div style="flex:1;width:2px;background:var(--sharing-border)"></div>
    </div>
    <div class="pb-3">
      <span style="font-weight:700;color:var(--sharing-accent);font-size:1.1rem">2012</span>
      <span style="color:var(--sharing-fg-soft)"> — <strong>AlexNet / ImageNet</strong>: deep learning bùng nổ</span>
    </div>
  </div>
  <div class="flex gap-4">
    <div class="flex flex-col items-center">
      <div style="flex:none;width:.85rem;height:.85rem;border-radius:9999px;background:var(--sharing-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent);margin-top:.5rem"></div>
    </div>
    <div>
      <span style="font-weight:700;color:var(--sharing-accent);font-size:1.1rem">2016</span>
      <span style="color:var(--sharing-fg-soft)"> — <strong>AlphaGo</strong> thắng Lee Sedol (cờ vây)</span>
    </div>
  </div>
</div>

<div class="mt-4 grid grid-cols-2 gap-4">
  <div style="border:1px solid var(--sharing-border);border-left:4px solid var(--sharing-accent);border-radius:.6rem;background:var(--sharing-bg-soft);padding:.7rem .9rem">
    <div style="font-weight:700;color:var(--sharing-fg);font-size:1.02rem">Deep Blue · 1997 — cờ vua</div>
    <div style="color:var(--sharing-fg-soft);font-size:.88rem;margin-top:.35rem">Hạ <strong>Garry Kasparov</strong> — đương kim vô địch cờ vua thế giới, một trong những kỳ thủ vĩ đại nhất lịch sử.</div>
    <div style="color:var(--sharing-fg-soft);font-size:.88rem;margin-top:.3rem">Thắng bằng <strong>vét cạn</strong> (~200 triệu thế/giây): sức mạnh từ compute, <em>không học</em>.</div>
    <div style="color:var(--sharing-fg-soft);font-size:.88rem;margin-top:.3rem"><strong>Ảnh hưởng:</strong> lần đầu máy hạ nhà vô địch thế giới → chấn động toàn cầu, đưa AI vào nhận thức đại chúng.</div>
  </div>
  <div style="border:1px solid var(--sharing-border);border-left:4px solid var(--sharing-accent-2);border-radius:.6rem;background:var(--sharing-bg-soft);padding:.7rem .9rem">
    <div style="font-weight:700;color:var(--sharing-fg);font-size:1.02rem">AlphaGo · 2016 — cờ vây</div>
    <div style="color:var(--sharing-fg-soft);font-size:.88rem;margin-top:.35rem">Hạ <strong>Lee Sedol</strong> — huyền thoại cờ vây Hàn Quốc, 9 đẳng (cao nhất), 18 chức vô địch thế giới.</div>
    <div style="color:var(--sharing-fg-soft);font-size:.88rem;margin-top:.3rem">Thắng bằng <strong>học</strong>: deep neural network + tự chơi (reinforcement learning) — biết cả nước đi <em>sáng tạo</em>.</div>
    <div style="color:var(--sharing-fg-soft);font-size:.88rem;margin-top:.3rem"><strong>Ảnh hưởng:</strong> cờ vây vốn bị coi là "bất khả" với máy (sớm hơn dự đoán cả thập kỷ) → cú hích deep learning; Lee Sedol giải nghệ 2019.</div>
  </div>
</div>

<div class="mt-3 text-sm" style="color:var(--sharing-muted)">
Vét cạn (Deep Blue) → <strong>học từ dữ liệu</strong> (AlphaGo): chính là bước nhảy sang <strong>machine learning / deep learning</strong>.
</div>

<!--
Verified: Deep Blue 11/5/1997 (thắng 3.5–2.5); AlexNet 2012 (top-5 error 26.2%→15.3%);
AlphaGo 3/2016 Seoul (4–1). Nhấn: 2 mốc "cờ" cho thấy AI chuyển từ brute-force sang
học từ dữ liệu.
-->

---
layout: default
---

# Khi máy biết nói và biết làm

<div class="mt-5 flex flex-col">
  <div class="flex gap-4">
    <div class="flex flex-col items-center">
      <div style="flex:none;width:.85rem;height:.85rem;border-radius:9999px;background:var(--sharing-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent);margin-top:.5rem"></div>
      <div style="flex:1;width:2px;background:var(--sharing-border)"></div>
    </div>
    <div class="pb-3">
      <div><span style="font-weight:700;color:var(--sharing-accent);font-size:1.1rem">2017</span><span style="color:var(--sharing-fg-soft)"> — <strong>Transformer</strong> "Attention is All You Need" (Google)</span></div>
      <div style="color:var(--sharing-muted);font-size:.85rem;margin-top:.15rem">Cơ chế <strong>self-attention</strong>: xử lý song song, nắm ngữ cảnh xa — nền của GPT, Claude, Gemini.</div>
    </div>
  </div>
  <div class="flex gap-4">
    <div class="flex flex-col items-center">
      <div style="flex:none;width:.85rem;height:.85rem;border-radius:9999px;background:var(--sharing-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent);margin-top:.5rem"></div>
      <div style="flex:1;width:2px;background:var(--sharing-border)"></div>
    </div>
    <div class="pb-3">
      <div><span style="font-weight:700;color:var(--sharing-accent);font-size:1.1rem">2022</span><span style="color:var(--sharing-fg-soft)"> — <strong>ChatGPT</strong>: LLM tới đại chúng</span></div>
      <div style="color:var(--sharing-muted);font-size:.85rem;margin-top:.15rem">Đạt 100 triệu người dùng trong ~2 tháng — app tiêu dùng tăng nhanh nhất khi đó.</div>
    </div>
  </div>
  <div class="flex gap-4">
    <div class="flex flex-col items-center">
      <div style="flex:none;width:.85rem;height:.85rem;border-radius:9999px;background:var(--sharing-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent);margin-top:.5rem"></div>
      <div style="flex:1;width:2px;background:var(--sharing-border)"></div>
    </div>
    <div class="pb-3">
      <div><span style="font-weight:700;color:var(--sharing-accent);font-size:1.1rem">2023–2024</span><span style="color:var(--sharing-fg-soft)"> — <strong>tool calling</strong> + <strong>AI Agent</strong>; <strong>MCP</strong> công bố 11/2024</span></div>
      <div style="color:var(--sharing-muted);font-size:.85rem;margin-top:.15rem">LLM biết gọi tool → từ "nói" sang "làm"; MCP (Anthropic) chuẩn hoá cách nối tool.</div>
    </div>
  </div>
  <div class="flex gap-4">
    <div class="flex flex-col items-center">
      <div style="flex:none;width:.85rem;height:.85rem;border-radius:9999px;background:var(--sharing-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent);margin-top:.5rem"></div>
    </div>
    <div>
      <div><span style="font-weight:700;color:var(--sharing-accent);font-size:1.1rem">2025</span><span style="color:var(--sharing-fg-soft)"> — MCP thành chuẩn de-facto đa nhà cung cấp</span></div>
      <div style="color:var(--sharing-muted);font-size:.85rem;margin-top:.15rem">OpenAI, Google, Microsoft đều áp dụng; hơn 10.000 MCP server công khai.</div>
    </div>
  </div>
</div>

<Spotlight label="Mạch của buổi nay" class="mt-4">
Từ đây trở đi ta đào sâu nửa cuối timeline: <strong>LLM → Agent → MCP</strong>.
</Spotlight>

<!--
Verified: Transformer arXiv 1706.03762 (6/2017, Vaswani et al.); ChatGPT ra mắt
30/11/2022 (100M user/2 tháng). Slide này là bản lề: phần còn lại của buổi bám
nửa cuối timeline.
-->

---
layout: image-right
image: /images/06-for-the-following-decision-tree-create-a.png
---

# Giai đoạn 1 — AI cổ điển & ML

<div class="mt-4 flex flex-col gap-3">
  <div style="background:var(--sharing-bg-soft);border-left:3px solid var(--sharing-accent);border-radius:.4rem;padding:.5rem .8rem">
    <span style="font-weight:700;color:var(--sharing-accent)">Luật tay (rule-based)</span>
    <div style="color:var(--sharing-fg-soft);font-size:.92rem;margin-top:.15rem">Người viết sẵn từng luật. VD: email chứa "trúng thưởng" → spam — giòn, đổi vài chữ là lọt.</div>
  </div>
  <div style="background:var(--sharing-bg-soft);border-left:3px solid var(--sharing-accent-2);border-radius:.4rem;padding:.5rem .8rem">
    <span style="font-weight:700;color:var(--sharing-accent-2)">Học từ dữ liệu (Machine Learning)</span>
    <div style="color:var(--sharing-fg-soft);font-size:.92rem;margin-top:.15rem">Máy tự rút luật từ dữ liệu. VD: xem hàng nghìn email → tự nhận ra spam, bắt cả biến thể lạ.</div>
  </div>
</div>

<Spotlight label="Giới hạn" tone="accent" class="mt-3">
Mỗi bài toán cần một model riêng — chưa có mô hình "đa năng".
</Spotlight>

<!--
Ví dụ spam là cầu nối trực giác rule-based (giòn) vs ML (học, bắt biến thể).
Dẫn tới câu hỏi: có model nào một cái làm nhiều việc không? → LLM.
-->

---
layout: default
---

# Giai đoạn 2 — Sự trỗi dậy của LLM

2017: kiến trúc **Transformer** — *"Attention Is All You Need"* (Google, Vaswani et al.). Bản chất LLM chỉ làm một việc: **đoán chữ (token) kế tiếp**.

<div class="mt-6 flex items-center justify-center gap-4" style="flex-wrap:wrap">
  <div class="flex items-center gap-2">
    <span style="padding:.3rem .55rem;border:1px solid var(--sharing-border);border-radius:.4rem;background:#fff;color:var(--sharing-fg-soft);font-size:.95rem">Hà Nội</span>
    <span style="padding:.3rem .55rem;border:1px solid var(--sharing-border);border-radius:.4rem;background:#fff;color:var(--sharing-fg-soft);font-size:.95rem">là</span>
    <span style="padding:.3rem .55rem;border:1px solid var(--sharing-border);border-radius:.4rem;background:#fff;color:var(--sharing-fg-soft);font-size:.95rem">thủ đô</span>
    <span style="padding:.3rem .55rem;border:1px solid var(--sharing-border);border-radius:.4rem;background:#fff;color:var(--sharing-fg-soft);font-size:.95rem">của</span>
    <span style="padding:.3rem .55rem;border:1px dashed var(--sharing-accent);border-radius:.4rem;color:var(--sharing-accent);font-size:.95rem;font-weight:700">?</span>
  </div>
  <span style="color:var(--sharing-accent);font-size:1.6rem;font-weight:700">→</span>
  <div style="padding:.55rem 1.1rem;border-radius:.6rem;background:linear-gradient(135deg,var(--sharing-accent),var(--sharing-accent-2));color:#fff;text-align:center;box-shadow:0 6px 16px -6px var(--sharing-accent)">
    <div style="font-weight:700">Transformer</div>
    <div style="font-size:.72rem;opacity:.9;letter-spacing:.05em">self-attention</div>
  </div>
  <span style="color:var(--sharing-accent);font-size:1.6rem;font-weight:700">→</span>
  <span style="padding:.4rem .85rem;border-radius:.4rem;background:color-mix(in srgb,var(--sharing-accent) 14%,white);border:1px solid var(--sharing-accent);color:#0f766e;font-weight:700;font-size:1.05rem">Việt Nam</span>
</div>

<div class="mt-8 grid grid-cols-3 gap-4">
  <div style="background:var(--sharing-bg-soft);border-top:3px solid var(--sharing-accent);border-radius:.5rem;padding:.7rem .9rem">
    <div style="font-weight:700;color:var(--sharing-accent)">Self-attention</div>
    <div style="color:var(--sharing-fg-soft);font-size:.9rem;margin-top:.2rem">"Nhìn" cả câu cùng lúc, học từ nào liên quan từ nào → nắm ngữ cảnh xa, train song song.</div>
  </div>
  <div style="background:var(--sharing-bg-soft);border-top:3px solid var(--sharing-accent);border-radius:.5rem;padding:.7rem .9rem">
    <div style="font-weight:700;color:var(--sharing-accent)">Scaling</div>
    <div style="color:var(--sharing-fg-soft);font-size:.9rem;margin-top:.2rem">Thêm dữ liệu + tham số + compute → năng lực tổng quát bất ngờ.</div>
  </div>
  <div style="background:var(--sharing-bg-soft);border-top:3px solid var(--sharing-accent);border-radius:.5rem;padding:.7rem .9rem">
    <div style="font-weight:700;color:var(--sharing-accent)">Foundation models</div>
    <div style="color:var(--sharing-fg-soft);font-size:.9rem;margin-top:.2rem">GPT, Claude, Gemini… — một model, nhiều việc.</div>
  </div>
</div>

<!--
Ví dụ token-prediction khử bí ẩn LLM: bản chất là đoán chữ kế tiếp; nhờ Transformer
2017 + scaling mà việc đó sinh ra năng lực tổng quát.
-->

---
layout: default
---

# Giai đoạn 2 — Sự trỗi dậy của LLM

<div style="font-size:1.3rem;font-weight:600;color:var(--sharing-fg);margin-top:.1rem">Tạo được, nhưng chưa làm được</div>

Generative AI (gồm **LLM**) **tạo nội dung** rất giỏi — văn bản, ảnh, code… Nhưng tự thân còn **hai giới hạn**:

<div class="mt-5 grid grid-cols-2 gap-4">
  <div style="background:var(--sharing-bg-soft);border-left:3px solid var(--sharing-muted);border-radius:.5rem;padding:.7rem .9rem">
    <div style="font-weight:700;color:var(--sharing-fg)">1 · Không biết dữ liệu mới</div>
    <div style="color:var(--sharing-fg-soft);font-size:.92rem;margin-top:.2rem">Kiến thức "đóng băng" tại thời điểm train — không biết tin mới, không truy cập dữ liệu riêng (DB, file nội bộ, API).</div>
    <div style="color:var(--sharing-muted);font-size:.85rem;margin-top:.3rem">VD: "Giá vàng hôm nay?" → trả lời cũ hoặc <em>bịa</em> (hallucinate).</div>
  </div>
  <div style="background:var(--sharing-bg-soft);border-left:3px solid var(--sharing-muted);border-radius:.5rem;padding:.7rem .9rem">
    <div style="font-weight:700;color:var(--sharing-fg)">2 · Chưa hành động được</div>
    <div style="color:var(--sharing-fg-soft);font-size:.92rem;margin-top:.2rem">Chỉ sinh ra nội dung — tự nó không đặt lịch, gọi API, chạy code hay ghi vào DB.</div>
  </div>
</div>

<div class="mt-5" style="background:color-mix(in srgb,var(--sharing-accent) 8%,white);border:1px solid color-mix(in srgb,var(--sharing-accent) 28%,white);border-left:4px solid var(--sharing-accent);border-radius:.5rem;padding:.7rem 1rem">
  <div style="font-weight:700;color:var(--sharing-accent);font-size:.8rem;text-transform:uppercase;letter-spacing:.08em">Giải pháp → bước đầu của Agent</div>
  <div style="color:var(--sharing-fg-soft);margin-top:.25rem">Cho LLM dùng <strong>tools</strong> (công cụ) để chạm thế giới thực — và <strong>LLM tự quyết định gọi tool nào</strong>. Đó chính là bước đầu biến LLM thành <strong>Agent</strong>.</div>
</div>

<!--
"Giá vàng hôm nay" là ví dụ đắt: cho thấy giới hạn đóng băng + nguy cơ bịa.
Đây là bản lề dẫn sang tool calling/agent.
-->

---
layout: default
---

# Giai đoạn 3 — Từ chatbot đến **AI Agent**

Agent = LLM đặt trong vòng lặp **reason → act → observe**, có quyền dùng tools.

<div class="mt-5 flex items-center justify-center gap-3" style="flex-wrap:wrap">
  <span style="padding:.45rem .7rem;border:1px solid var(--sharing-border);border-radius:.5rem;background:#fff;color:var(--sharing-fg-soft);font-weight:600">Mục tiêu</span>
  <span style="color:var(--sharing-accent);font-size:1.4rem;font-weight:700">→</span>
  <div style="border:1.5px dashed var(--sharing-accent);border-radius:.8rem;padding:.6rem .8rem;text-align:center">
    <div class="flex items-center gap-2">
      <span style="padding:.4rem .65rem;border-radius:.5rem;background:color-mix(in srgb,var(--sharing-accent) 12%,white);color:#0f766e;font-weight:700;text-align:center;line-height:1.15">Reason<br><span style="font-weight:400;font-size:.7rem;opacity:.85">lập kế hoạch</span></span>
      <span style="color:var(--sharing-accent);font-weight:700">→</span>
      <span style="padding:.4rem .65rem;border-radius:.5rem;background:color-mix(in srgb,var(--sharing-accent) 12%,white);color:#0f766e;font-weight:700;text-align:center;line-height:1.15">Act<br><span style="font-weight:400;font-size:.7rem;opacity:.85">gọi tool</span></span>
      <span style="color:var(--sharing-accent);font-weight:700">→</span>
      <span style="padding:.4rem .65rem;border-radius:.5rem;background:color-mix(in srgb,var(--sharing-accent) 12%,white);color:#0f766e;font-weight:700;text-align:center;line-height:1.15">Observe<br><span style="font-weight:400;font-size:.7rem;opacity:.85">đọc kết quả</span></span>
    </div>
    <div style="color:var(--sharing-accent);font-size:.78rem;font-weight:600;margin-top:.45rem">↺ lặp đến khi đạt mục tiêu</div>
  </div>
  <span style="color:var(--sharing-accent);font-size:1.4rem;font-weight:700">→</span>
  <span style="padding:.45rem .8rem;border-radius:.5rem;background:linear-gradient(135deg,var(--sharing-accent),var(--sharing-accent-2));color:#fff;font-weight:700;box-shadow:0 6px 16px -6px var(--sharing-accent)">Hoàn thành</span>
</div>

<div class="mt-5" style="background:var(--sharing-bg-soft);border-radius:.5rem;padding:.7rem .9rem">
  <div style="font-weight:700;color:var(--sharing-accent);font-size:.8rem;text-transform:uppercase;letter-spacing:.08em">Ví dụ — agent đặt vé máy bay</div>
  <div class="flex items-center mt-2" style="flex-wrap:wrap;gap:.4rem">
    <span style="padding:.25rem .55rem;border-radius:.4rem;background:color-mix(in srgb,var(--sharing-accent) 12%,white);color:#0f766e;font-size:.82rem;font-weight:600">Reason: cần tìm chuyến</span>
    <span style="color:var(--sharing-muted)">→</span>
    <span style="padding:.25rem .55rem;border-radius:.4rem;background:color-mix(in srgb,var(--sharing-accent-2) 14%,white);color:#0369a1;font-size:.82rem;font-weight:600">Act: search_flights(HAN→SGN)</span>
    <span style="color:var(--sharing-muted)">→</span>
    <span style="padding:.25rem .55rem;border-radius:.4rem;background:#fff;border:1px solid var(--sharing-border);color:var(--sharing-fg-soft);font-size:.82rem;font-weight:600">Observe: 3 chuyến</span>
    <span style="color:var(--sharing-muted)">→</span>
    <span style="padding:.25rem .55rem;border-radius:.4rem;background:color-mix(in srgb,var(--sharing-accent) 12%,white);color:#0f766e;font-size:.82rem;font-weight:600">Reason: chọn rẻ nhất</span>
    <span style="color:var(--sharing-muted)">→</span>
    <span style="padding:.25rem .55rem;border-radius:.4rem;background:color-mix(in srgb,var(--sharing-accent-2) 14%,white);color:#0369a1;font-size:.82rem;font-weight:600">Act: book_flight(…)</span>
    <span style="color:var(--sharing-muted)">→</span>
    <span style="padding:.25rem .55rem;border-radius:.4rem;background:var(--sharing-accent);color:#fff;font-size:.82rem;font-weight:700">Done</span>
  </div>
</div>

<div class="text-sm mt-3" style="color:var(--sharing-muted)">
LLM tự quyết định <em>gọi tool nào, với tham số gì</em>, rồi dùng kết quả để bước tiếp.
</div>

<!--
Chạy ví dụ đặt vé từng vòng để khán giả "thấy" loop. Dẫn sang câu hỏi: bên trong
một agent có những gì? → Phần 2.
-->

---
layout: section
number: "02"
background: /images/02-artificial-neural-network-with-chip.jpg
---

# Bên trong một Agent

Bốn thành phần làm nên một agent — và vì sao **tools** là mấu chốt.

---
layout: default
---

# Bốn thành phần của một Agent

<div class="mt-4 grid grid-cols-2 gap-6 items-start">
  <div class="flex flex-col gap-2">
    <div style="background:var(--sharing-bg-soft);border-left:3px solid var(--sharing-accent);border-radius:.45rem;padding:.5rem .8rem">
      <div style="font-weight:700;color:var(--sharing-accent)">LLM — bộ não</div>
      <div style="color:var(--sharing-fg-soft);font-size:.9rem">Suy luận, ra quyết định.</div>
    </div>
    <div style="background:var(--sharing-bg-soft);border-left:3px solid var(--sharing-accent);border-radius:.45rem;padding:.5rem .8rem">
      <div style="font-weight:700;color:var(--sharing-accent)">Reasoning / Planning</div>
      <div style="color:var(--sharing-fg-soft);font-size:.9rem">Chia mục tiêu lớn thành các bước nhỏ.</div>
    </div>
    <div style="background:var(--sharing-bg-soft);border-left:3px solid var(--sharing-accent);border-radius:.45rem;padding:.5rem .8rem">
      <div style="font-weight:700;color:var(--sharing-accent)">Memory</div>
      <div style="color:var(--sharing-fg-soft);font-size:.9rem">Ngắn hạn (hội thoại) + dài hạn (hồ sơ, tài liệu đã index).</div>
    </div>
    <div style="background:color-mix(in srgb,var(--sharing-accent) 10%,white);border-left:3px solid var(--sharing-accent);border-radius:.45rem;padding:.5rem .8rem">
      <div style="font-weight:700;color:var(--sharing-accent)">Tools — tay chân</div>
      <div style="color:var(--sharing-fg-soft);font-size:.9rem">Đọc/ghi thế giới thực: API, DB, file, web.</div>
    </div>
  </div>
  <div>
    <img :src="'/images/n8n-ai-agent-components.png'" alt="Thành phần một AI Agent trong n8n" style="width:100%;border-radius:.5rem;border:1px solid var(--sharing-border)" />
    <div style="color:var(--sharing-muted);font-size:.82rem;margin-top:.4rem">Ví dụ thực tế (n8n): <strong>Chat Model</strong> = LLM · <strong>Memory</strong> = Window Buffer · <strong>Tool</strong> = Dalle, Telegram.</div>
  </div>
</div>

<Spotlight label="Mấu chốt" class="mt-4">
LLM là bộ não, nhưng <strong>tools</strong> mới biến "biết nói" thành "biết làm".
</Spotlight>

<!--
Ví dụ memory ngắn/dài hạn để phân biệt rõ. Nhấn tools là phần ta đào sâu tiếp.
-->

---
layout: default
---

# Tools — cây cầu ra thế giới thực

Mỗi tool là một **hàm** kèm **mô tả bằng lời** — để LLM tự biết *khi nào dùng* và *cần truyền gì*.

<div class="mt-4 grid grid-cols-2 gap-6 items-start">
  <div style="background:var(--sharing-bg-soft);border-left:3px solid var(--sharing-accent);border-radius:.5rem;padding:.8rem 1rem">
    <div style="font-weight:700;color:var(--sharing-accent);font-size:.8rem;text-transform:uppercase;letter-spacing:.08em">Một tool gồm 3 phần (vd get_weather)</div>
    <div style="margin-top:.6rem;display:flex;flex-direction:column;gap:.55rem">
      <div><span style="display:inline-block;background:color-mix(in srgb,var(--sharing-accent) 14%,white);color:#0f766e;font-weight:700;font-size:.72rem;padding:.1rem .45rem;border-radius:.35rem;margin-right:.4rem">name</span> <code>get_weather</code></div>
      <div><span style="display:inline-block;background:color-mix(in srgb,var(--sharing-accent) 14%,white);color:#0f766e;font-weight:700;font-size:.72rem;padding:.1rem .45rem;border-radius:.35rem;margin-right:.4rem">description</span> "Lấy thời tiết hiện tại của một thành phố"<div style="color:var(--sharing-muted);font-size:.8rem;margin-top:.15rem">↑ LLM đọc đúng dòng này để quyết định có gọi hay không</div></div>
      <div><span style="display:inline-block;background:color-mix(in srgb,var(--sharing-accent) 14%,white);color:#0f766e;font-weight:700;font-size:.72rem;padding:.1rem .45rem;border-radius:.35rem;margin-right:.4rem">execute</span> hàm thật chạy khi tool được gọi</div>
    </div>
  </div>
  <div>
    <div style="font-weight:700;color:var(--sharing-accent);font-size:.8rem;text-transform:uppercase;letter-spacing:.08em">LLM dùng tool thế nào</div>
    <div style="margin-top:.6rem;display:flex;flex-direction:column;gap:.55rem">
      <div style="display:flex;align-items:center;gap:.55rem"><span style="flex:none;display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:9999px;background:var(--sharing-accent);color:#fff;font-weight:700;font-size:.8rem">1</span><span style="color:var(--sharing-fg-soft)">Đọc danh sách tool + mô tả</span></div>
      <div style="display:flex;align-items:center;gap:.55rem"><span style="flex:none;display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:9999px;background:var(--sharing-accent);color:#fff;font-weight:700;font-size:.8rem">2</span><span style="color:var(--sharing-fg-soft)">Chọn tool &amp; điền tham số</span></div>
      <div style="display:flex;align-items:center;gap:.55rem"><span style="flex:none;display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:9999px;background:var(--sharing-accent);color:#fff;font-weight:700;font-size:.8rem">3</span><span style="color:var(--sharing-fg-soft)">App thực thi, trả kết quả về</span></div>
      <div style="display:flex;align-items:center;gap:.55rem"><span style="flex:none;display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:9999px;background:var(--sharing-accent);color:#fff;font-weight:700;font-size:.8rem">4</span><span style="color:var(--sharing-fg-soft)">LLM dùng kết quả để bước tiếp</span></div>
    </div>
  </div>
</div>

**Demo** — một tool gồm `name` · `description` · `execute`:

```ts
const get_weather = {
  name: "get_weather",
  description: "Lấy thời tiết hiện tại của 1 thành phố", // ← LLM đọc để quyết định gọi
  execute: (city) => fetch(`https://api.weather/${city}`),
}
```

<div class="mt-3" style="color:var(--sharing-fg-soft)">
Tool thường gặp: <code>search_web</code> · <code>query_db</code> · <code>send_email</code> · <code>create_ticket</code> · <code>get_weather</code> …
</div>

<!--
Tool = name + description + execute. Nhấn: description là thứ LLM đọc để tự quyết định gọi tool nào.
-->


---
layout: two-cols-header
---

# Càng nhiều tool → tích hợp **vỡ trận**

Mỗi app/dịch vụ tự định nghĩa tool & cách kết nối riêng → **bài toán M×N**.

::left::

<div>
<svg viewBox="0 0 660 372" width="660" height="372" style="display:block;width:100%;max-width:560px;height:auto;margin:0 auto;font-family:Inter,sans-serif">
<text x="104" y="20" text-anchor="middle" style="font-size:13px;font-weight:700;letter-spacing:1.5px;fill:#64748b">AGENTS</text>
<text x="556" y="20" text-anchor="middle" style="font-size:13px;font-weight:700;letter-spacing:1.5px;fill:#64748b">APPS / DỊCH VỤ</text>
<g stroke="#94a3b8" stroke-width="1.5" fill="none" opacity="0.55">
<path d="M184 67 C304 67 356 67 476 67"/>
<path d="M184 67 C304 67 356 191 476 191"/>
<path d="M184 67 C304 67 356 315 476 315"/>
<path d="M184 191 C304 191 356 67 476 67"/>
<path d="M184 191 C304 191 356 191 476 191"/>
<path d="M184 191 C304 191 356 315 476 315"/>
<path d="M184 315 C304 315 356 67 476 67"/>
<path d="M184 315 C304 315 356 191 476 191"/>
<path d="M184 315 C304 315 356 315 476 315"/>
</g>
<g><rect x="24" y="34" width="160" height="66" rx="12" fill="#f6f9fb" stroke="#e2e8f0"/><rect x="24" y="44" width="4" height="46" rx="2" fill="#0d9488"/><g transform="translate(42,53) scale(0.9)" style="color:#0d9488"><path fill="currentColor" d="M18 10h2v2h-2zm-6 0h2v2h-2z"/><path fill="currentColor" d="M26 20h-5v-2h1a2 2 0 0 0 2-2v-4h2v-2h-2V8a2 2 0 0 0-2-2h-2V2h-2v4h-4V2h-2v4h-2a2 2 0 0 0-2 2v2H6v2h2v4a2 2 0 0 0 2 2h1v2H6a2 2 0 0 0-2 2v8h2v-8h20v8h2v-8a2 2 0 0 0-2-2M10 8h12v8H10Zm3 10h6v2h-6Z"/></g><text x="82" y="73" style="font-size:17px;font-weight:600;fill:#0f172a">Agent 1</text></g>
<g><rect x="24" y="158" width="160" height="66" rx="12" fill="#f6f9fb" stroke="#e2e8f0"/><rect x="24" y="168" width="4" height="46" rx="2" fill="#0d9488"/><g transform="translate(42,177) scale(0.9)" style="color:#0d9488"><path fill="currentColor" d="M18 10h2v2h-2zm-6 0h2v2h-2z"/><path fill="currentColor" d="M26 20h-5v-2h1a2 2 0 0 0 2-2v-4h2v-2h-2V8a2 2 0 0 0-2-2h-2V2h-2v4h-4V2h-2v4h-2a2 2 0 0 0-2 2v2H6v2h2v4a2 2 0 0 0 2 2h1v2H6a2 2 0 0 0-2 2v8h2v-8h20v8h2v-8a2 2 0 0 0-2-2M10 8h12v8H10Zm3 10h6v2h-6Z"/></g><text x="82" y="197" style="font-size:17px;font-weight:600;fill:#0f172a">Agent 2</text></g>
<g><rect x="24" y="282" width="160" height="66" rx="12" fill="#f6f9fb" stroke="#e2e8f0"/><rect x="24" y="292" width="4" height="46" rx="2" fill="#0d9488"/><g transform="translate(42,301) scale(0.9)" style="color:#0d9488"><path fill="currentColor" d="M18 10h2v2h-2zm-6 0h2v2h-2z"/><path fill="currentColor" d="M26 20h-5v-2h1a2 2 0 0 0 2-2v-4h2v-2h-2V8a2 2 0 0 0-2-2h-2V2h-2v4h-4V2h-2v4h-2a2 2 0 0 0-2 2v2H6v2h2v4a2 2 0 0 0 2 2h1v2H6a2 2 0 0 0-2 2v8h2v-8h20v8h2v-8a2 2 0 0 0-2-2M10 8h12v8H10Zm3 10h6v2h-6Z"/></g><text x="82" y="321" style="font-size:17px;font-weight:600;fill:#0f172a">Agent 3</text></g>
<g><rect x="476" y="34" width="160" height="66" rx="12" fill="#f6f9fb" stroke="#e2e8f0"/><rect x="476" y="44" width="4" height="46" rx="2" fill="#611f69"/><g transform="translate(494,53) scale(0.9)" style="color:#611f69"><path fill="currentColor" d="M9.042 19.166a2.521 2.521 0 1 1-2.52-2.521h2.52Zm1.271 0a2.521 2.521 0 0 1 5.042 0v6.313a2.521 2.521 0 1 1-5.042 0Zm2.521-10.124a2.521 2.521 0 1 1 2.521-2.52v2.52Zm0 1.271a2.521 2.521 0 0 1 0 5.042H6.52a2.521 2.521 0 1 1 0-5.042Zm10.124 2.521a2.521 2.521 0 1 1 2.52 2.521h-2.52Zm-1.271 0a2.521 2.521 0 0 1-5.042 0V6.52a2.521 2.521 0 1 1 5.042 0Zm-2.521 10.124a2.521 2.521 0 1 1-2.521 2.52v-2.52Zm0-1.271a2.521 2.521 0 0 1 0-5.042h6.313a2.521 2.521 0 1 1 0 5.042Z"/></g><text x="534" y="73" style="font-size:17px;font-weight:600;fill:#0f172a">Slack</text></g>
<g><rect x="476" y="158" width="160" height="66" rx="12" fill="#f6f9fb" stroke="#e2e8f0"/><rect x="476" y="168" width="4" height="46" rx="2" fill="#24292f"/><g transform="translate(494,177) scale(0.9)" style="color:#24292f"><path fill="currentColor" fill-rule="evenodd" d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.7 3.7 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2"/></g><text x="534" y="197" style="font-size:17px;font-weight:600;fill:#0f172a">GitHub</text></g>
<g><rect x="476" y="282" width="160" height="66" rx="12" fill="#f6f9fb" stroke="#e2e8f0"/><rect x="476" y="292" width="4" height="46" rx="2" fill="#336791"/><g transform="translate(494,301) scale(0.9)" style="color:#336791"><path fill="currentColor" d="M22.98 28.875c-4.047 0-5.588-1.058-5.588-2.828a2.21 2.21 0 0 1 2.139-2.3v-.253a1.97 1.97 0 0 1-1.541-2c0-1.242 1.057-1.863 2.207-2.116v-.092a3.62 3.62 0 0 1-2.184-3.495c0-2.438 1.724-4.07 4.967-4.07a6.7 6.7 0 0 1 2.092.299v-.391a1.534 1.534 0 0 1 1.702-1.748h1.862v2.254h-2.552v.321a3.59 3.59 0 0 1 1.862 3.335c0 2.414-1.702 4.024-4.967 4.024a7.4 7.4 0 0 1-1.84-.207a1.23 1.23 0 0 0-.85 1.08c0 .599.506.897 1.563.897h3.22c2.943 0 4.208 1.265 4.208 3.427c0 2.506-1.702 3.863-6.3 3.863m1.494-4.737h-4.093a1.47 1.47 0 0 0-.621 1.242c0 .92.69 1.472 2.53 1.472h1.47c1.91 0 2.76-.483 2.76-1.495c0-.76-.551-1.22-2.046-1.22Zm.667-8.163v-.391c0-1.219-.759-1.84-2.161-1.84s-2.162.62-2.162 1.84v.39c0 1.196.759 1.84 2.162 1.84s2.16-.644 2.16-1.84ZM4.603 24V7.95h7.22c2.967 0 4.76 2 4.76 4.967c0 2.99-1.793 4.967-4.76 4.967H7.639V24Zm3.036-8.738h3.909a1.69 1.69 0 0 0 1.885-1.817v-1.058a1.672 1.672 0 0 0-1.885-1.793h-3.91Z"/></g><text x="534" y="321" style="font-size:17px;font-weight:600;fill:#0f172a">Postgres</text></g>
</svg>
</div>

<div class="text-xs opacity-70 mt-1" style="text-align:center">
M agent × N tool = M×N bản tích hợp viết tay. 3 × 3 = 9… và còn phình to.
</div>

::right::

<div v-click style="border:1px solid var(--sharing-border);border-left:4px solid var(--sharing-muted);background:var(--sharing-bg-soft);border-radius:.6rem;padding:.7rem .85rem"><div style="font-weight:700;color:var(--sharing-fg);font-size:1.02rem;margin-bottom:.5rem">Hệ quả: trùng lặp & khó quản lý</div><div style="display:flex;flex-direction:column;gap:.5rem;font-size:.9rem"><div><strong>Trùng lặp</strong> <span style="color:var(--sharing-fg-soft)">— mỗi đội viết lại connector cho cùng một dịch vụ</span></div><div><strong>Không chuẩn</strong> <span style="color:var(--sharing-fg-soft)">— mỗi tích hợp một kiểu auth, format, báo lỗi</span></div><div><strong>Khó quản trị</strong> <span style="color:var(--sharing-fg-soft)">— tool nào đang có? ai được dùng? cập nhật ra sao?</span></div><div><span style="color:var(--sharing-fg-soft)">Đổi 1 API →</span> <strong>sửa mọi agent</strong> <span style="color:var(--sharing-fg-soft)">đang gọi nó</span></div></div></div>

<Spotlight label="Câu hỏi" v-click class="mt-3">
Nếu USB từng thống nhất "muôn vàn đầu cắm", liệu có một <strong>chuẩn chung</strong>
cho việc nối AI với dữ liệu & công cụ?
</Spotlight>

<style>
.two-cols-header { grid-template-columns: 1.3fr 1fr; column-gap: 28px; }
.two-cols-header .col-left, .two-cols-header .col-right { align-self: center; }
</style>

<!--
Trái: sơ đồ M×N chằng chịt — điểm "đau". Next → hiện hệ quả (trùng lặp, không chuẩn,
khó quản trị), next nữa → câu hỏi mở dẫn thẳng sang MCP.
-->

---
layout: section
number: "03"
background: /images/mcp-ecosystem.png
---

# MCP — *USB-C cho AI Agent*

Model Context Protocol: một chuẩn, nối mọi agent với mọi tool.

---
layout: two-cols-header
---

# MCP là gì?

**Model Context Protocol** — chuẩn **mở** do Anthropic công bố **11/2024**: chuẩn hoá cách **AI app kết nối dữ liệu & công cụ**. Ẩn dụ: <Tag variant="solid">USB-C cho AI</Tag> — một cổng, cắm được mọi thứ.

::left::

<div style="background:var(--sharing-bg-soft);border-left:3px solid var(--sharing-accent);border-radius:.5rem;padding:.7rem 1rem">
  <div style="font-weight:700;color:var(--sharing-accent);font-size:.8rem;text-transform:uppercase;letter-spacing:.08em">Cách hoạt động</div>
  <div style="color:var(--sharing-fg-soft);margin-top:.25rem">AI app kết nối tới một <strong>MCP server</strong> → server "chào" danh sách <strong>tool &amp; dữ liệu</strong> → LLM <strong>khám phá</strong> rồi <strong>gọi</strong> khi cần — tất cả qua <em>một giao thức chung</em>, không phải viết tích hợp riêng cho từng dịch vụ.</div>
</div>

<Spotlight label="Quan trọng" class="mt-3">
MCP <strong>không</strong> phải model hay framework agent mới — nó là <strong>giao thức kết nối</strong> (vai trò như HTTP với web): viết <strong>1 lần</strong>, dùng được <strong>mọi nơi</strong>.
</Spotlight>

::right::

<div class="flex flex-col items-center justify-center"><img :src="'/images/mcp-vs-without-mcp.png'" alt="So sánh: without MCP (M×N) vs with MCP (qua một lớp chung)" style="width:100%;max-width:470px;border-radius:.6rem;border:1px solid var(--sharing-border);background:#fff;padding:.5rem"><div style="color:var(--sharing-muted);font-size:.8rem;margin-top:.55rem;text-align:center;line-height:1.35">Không MCP: mỗi LLM nối thẳng từng app (M×N).<br>Có MCP: tất cả đi qua <strong>một lớp chung</strong>.</div></div>

<style>
.two-cols-header { grid-template-columns: 1fr 1.02fr; column-gap: 26px; }
.two-cols-header .col-left, .two-cols-header .col-right { align-self: center; }
</style>

<!--
Nhấn: MCP nằm ở "lớp kết nối", không thay LLM hay LangChain/SDK. Ảnh phải = đúng ẩn dụ
M×N (without) → M+N (with). Đối chiếu trực tiếp với slide "vỡ trận" trước đó.
-->

---
layout: default
---

# Kiến trúc: Host · Client · Server

AI app (**Host**) mở các **Client**, mỗi client giữ kết nối **1-1** tới một **Server**; server "chào" **Context · Tools · Prompt**.

<div class="mt-3 flex justify-center">
  <img :src="'/images/architecture-of-mcp.webp'" alt="Kiến trúc MCP: Host (Claude) mở Client, qua MCP Protocol tới Server, server cấp Context/Tools/Prompt" style="width:72%;border-radius:.7rem;box-shadow:0 10px 30px -10px rgba(15,23,42,.35)" />
</div>

<div class="mt-3 text-sm" style="color:var(--sharing-muted);text-align:center">
Kết nối qua <strong>MCP Protocol</strong> trên transport <strong>stdio</strong> (local) hoặc <strong>HTTP</strong> (remote).
</div>

<!--
Sơ đồ: 1 Host (Claude) mở nhiều Client, mỗi Client nối 1-1 tới 1 MCP Server; server cấp
Context/Tools/Prompt. Transport stdio (local) / HTTP (remote). Đây là chỗ hay nhầm nhất.
-->

---
layout: default
---

# Cấu tạo MCP: 2 lớp & primitives

<div class="mt-3 flex flex-col gap-2">
  <div style="background:color-mix(in srgb,var(--sharing-accent) 9%,white);border-left:4px solid var(--sharing-accent);border-radius:.5rem;padding:.55rem .9rem"><span style="font-weight:700;color:var(--sharing-accent)">Data layer · JSON-RPC 2.0</span><span style="color:var(--sharing-fg-soft)"> — vòng đời, thương lượng năng lực, và các <strong>primitives</strong> (nội dung trao đổi)</span></div>
  <div style="background:color-mix(in srgb,var(--sharing-accent-2) 9%,white);border-left:4px solid var(--sharing-accent-2);border-radius:.5rem;padding:.55rem .9rem"><span style="font-weight:700;color:#0369a1">Transport layer</span><span style="color:var(--sharing-fg-soft)"> — <strong>stdio</strong> (local) · <strong>Streamable HTTP</strong> (remote, + OAuth)</span></div>
</div>

<div class="text-sm" style="color:var(--sharing-muted);margin-top:.5rem">Cùng một format JSON-RPC chạy trên mọi transport — server không cần quan tâm.</div>

<div class="mt-4 grid grid-cols-2 gap-6 items-start">
  <div>
    <div style="font-weight:700;color:var(--sharing-accent);font-size:.8rem;text-transform:uppercase;letter-spacing:.08em">Server cung cấp</div>
    <div style="margin-top:.5rem;display:flex;flex-direction:column;gap:.45rem">
      <div style="background:var(--sharing-bg-soft);border-left:3px solid var(--sharing-accent);border-radius:.4rem;padding:.45rem .7rem;color:var(--sharing-fg-soft);font-size:.92rem"><strong>Tools</strong> — hàm để <em>hành động</em> · vd <code>send_email</code></div>
      <div style="background:var(--sharing-bg-soft);border-left:3px solid var(--sharing-accent);border-radius:.4rem;padding:.45rem .7rem;color:var(--sharing-fg-soft);font-size:.92rem"><strong>Resources</strong> — dữ liệu / ngữ cảnh · vd đọc <code>README.md</code></div>
      <div style="background:var(--sharing-bg-soft);border-left:3px solid var(--sharing-accent);border-radius:.4rem;padding:.45rem .7rem;color:var(--sharing-fg-soft);font-size:.92rem"><strong>Prompts</strong> — mẫu tương tác · vd "tóm tắt PR này"</div>
    </div>
  </div>
  <div>
    <div style="font-weight:700;color:#0369a1;font-size:.8rem;text-transform:uppercase;letter-spacing:.08em">Client cung cấp</div>
    <div style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.45rem">
      <span style="background:color-mix(in srgb,var(--sharing-accent-2) 12%,white);color:#0369a1;font-weight:700;padding:.25rem .65rem;border-radius:.4rem">Sampling</span>
      <span style="background:color-mix(in srgb,var(--sharing-accent-2) 12%,white);color:#0369a1;font-weight:700;padding:.25rem .65rem;border-radius:.4rem">Elicitation</span>
      <span style="background:color-mix(in srgb,var(--sharing-accent-2) 12%,white);color:#0369a1;font-weight:700;padding:.25rem .65rem;border-radius:.4rem">Logging</span>
    </div>
    <div style="color:var(--sharing-fg-soft);font-size:.88rem;margin-top:.55rem">Server "chào" năng lực; client hỗ trợ ngược lại (vd để LLM sinh nội dung, hỏi thêm người dùng).</div>
  </div>
</div>

<!--
Tools (làm) vs Resources (dữ liệu) vs Prompts (mẫu) — ví dụ 1 dòng giúp phân biệt.
2 lớp: data (JSON-RPC, primitives) tách khỏi transport (stdio/HTTP).
-->

---
layout: default
---

# Khám phá tool **động**

Luồng trao đổi giữa **Host** và **MCP Server** qua JSON-RPC — tool được khám phá lúc chạy.

<div class="flex justify-center mt-1">
<svg viewBox="0 0 820 410" width="820" height="410" style="display:block;width:100%;max-width:680px;height:auto;margin:0 auto;font-family:Inter,sans-serif">
<defs>
<marker id="arT" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#0d9488"/></marker>
<marker id="arS" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#0ea5e9"/></marker>
</defs>
<line x1="170" y1="52" x2="170" y2="400" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4"/>
<line x1="650" y1="52" x2="650" y2="400" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4"/>
<rect x="110" y="256" width="600" height="144" rx="10" fill="none" stroke="#0d9488" stroke-width="1.3" stroke-dasharray="6 5" opacity="0.7"/>
<rect x="120" y="246" width="232" height="22" rx="11" fill="#ffffff" stroke="#0d9488" stroke-width="1"/>
<text x="132" y="261" style="font-size:12px;font-weight:700;fill:#0d9488">↺ Khi server đổi / thêm tool</text>
<text x="410" y="74" text-anchor="middle" style="font-size:12px;font-weight:700;letter-spacing:1px;fill:#64748b">① KHÁM PHÁ — DISCOVERY</text>
<text x="410" y="170" text-anchor="middle" style="font-size:12px;font-weight:700;letter-spacing:1px;fill:#64748b">② GỌI TOOL — INVOCATION</text>
<line x1="178" y1="100" x2="642" y2="100" stroke="#0d9488" stroke-width="2" marker-end="url(#arT)"/>
<text x="410" y="92" text-anchor="middle" style="font-size:13.5px;fill:#334155"><tspan style="font-weight:700;fill:#0d9488;font-family:'Fira Code',monospace">tools/list</tspan> — có những tool nào?</text>
<line x1="642" y1="138" x2="178" y2="138" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#arS)"/>
<text x="410" y="130" text-anchor="middle" style="font-size:13.5px;fill:#334155"><tspan style="font-weight:700;fill:#0ea5e9">danh sách tool</tspan> — name · description · input schema</text>
<line x1="178" y1="196" x2="642" y2="196" stroke="#0d9488" stroke-width="2" marker-end="url(#arT)"/>
<text x="410" y="188" text-anchor="middle" style="font-size:13.5px;fill:#334155"><tspan style="font-weight:700;fill:#0d9488;font-family:'Fira Code',monospace">tools/call</tspan> — { name, arguments }</text>
<line x1="642" y1="234" x2="178" y2="234" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#arS)"/>
<text x="410" y="226" text-anchor="middle" style="font-size:13.5px;fill:#334155"><tspan style="font-weight:700;fill:#0ea5e9">kết quả thực thi</tspan> → đưa lại cho LLM</text>
<line x1="642" y1="306" x2="178" y2="306" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#arS)"/>
<text x="410" y="298" text-anchor="middle" style="font-size:13.5px;fill:#334155"><tspan style="font-weight:700;fill:#0ea5e9;font-family:'Fira Code',monospace">notifications/tools/list_changed</tspan></text>
<line x1="178" y1="360" x2="642" y2="360" stroke="#0d9488" stroke-width="2" marker-end="url(#arT)"/>
<text x="410" y="352" text-anchor="middle" style="font-size:13.5px;fill:#334155"><tspan style="font-weight:700;fill:#0d9488;font-family:'Fira Code',monospace">tools/list</tspan> lại → LLM thấy năng lực mới, <tspan style="font-weight:700;fill:#0d9488">không cần code lại</tspan></text>
<rect x="40" y="8" width="260" height="44" rx="10" fill="#f6f9fb" stroke="#e2e8f0"/>
<text x="170" y="35" text-anchor="middle" style="font-size:14px;font-weight:700;fill:#0f172a">Host · LLM + MCP Client</text>
<rect x="545" y="8" width="210" height="44" rx="10" fill="#f6f9fb" stroke="#e2e8f0"/>
<text x="650" y="35" text-anchor="middle" style="font-size:14px;font-weight:700;fill:#0f172a">MCP Server</text>
</svg>
</div>

<div class="text-sm opacity-70 mt-1" style="text-align:center">
Danh sách tool là <em>dữ liệu</em>, không phải code → đổi/thêm tool <strong>không cần build lại</strong> client.
</div>

---
layout: two-cols-header
---

# Hệ sinh thái 2025 → 2026

Trong một năm, MCP đi từ thử nghiệm nội bộ → **chuẩn ngành, đa nhà cung cấp**.

::left::

<div class="flex flex-col mt-1"><div class="flex gap-3"><div class="flex flex-col items-center"><div style="flex:none;width:.8rem;height:.8rem;border-radius:9999px;background:var(--sharing-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent);margin-top:.4rem"></div><div style="flex:1;width:2px;background:var(--sharing-border)"></div></div><div class="pb-2.5"><span style="font-weight:700;color:var(--sharing-accent);font-size:1rem">11/2024</span><span style="color:var(--sharing-fg-soft);font-size:.9rem"> — Anthropic công bố <strong>MCP</strong> (chuẩn mở, open-source)</span></div></div><div class="flex gap-3"><div class="flex flex-col items-center"><div style="flex:none;width:.8rem;height:.8rem;border-radius:9999px;background:var(--sharing-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent);margin-top:.4rem"></div><div style="flex:1;width:2px;background:var(--sharing-border)"></div></div><div class="pb-2.5"><span style="font-weight:700;color:var(--sharing-accent);font-size:1rem">03/2025</span><span style="color:var(--sharing-fg-soft);font-size:.9rem"> — <strong>OpenAI</strong> áp dụng: Agents SDK → ChatGPT</span><div style="color:var(--sharing-muted);font-size:.76rem">Sam Altman — "open standard quan trọng cho agent"</div></div></div><div class="flex gap-3"><div class="flex flex-col items-center"><div style="flex:none;width:.8rem;height:.8rem;border-radius:9999px;background:var(--sharing-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent);margin-top:.4rem"></div><div style="flex:1;width:2px;background:var(--sharing-border)"></div></div><div class="pb-2.5"><span style="font-weight:700;color:var(--sharing-accent);font-size:1rem">04/2025</span><span style="color:var(--sharing-fg-soft);font-size:.9rem"> — <strong>Google DeepMind</strong> hỗ trợ MCP cho <strong>Gemini</strong></span><div style="color:var(--sharing-muted);font-size:.76rem">Demis Hassabis — "đang thành chuẩn mở của kỷ nguyên agent"</div></div></div><div class="flex gap-3"><div class="flex flex-col items-center"><div style="flex:none;width:.8rem;height:.8rem;border-radius:9999px;background:var(--sharing-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent);margin-top:.4rem"></div><div style="flex:1;width:2px;background:var(--sharing-border)"></div></div><div class="pb-2.5"><span style="font-weight:700;color:var(--sharing-accent);font-size:1rem">2025</span><span style="color:var(--sharing-fg-soft);font-size:.9rem"> — <strong>Microsoft</strong>: VS Code · Visual Studio (GA) · Azure · Windows 11 native</span></div></div><div class="flex gap-3"><div class="flex flex-col items-center"><div style="flex:none;width:.95rem;height:.95rem;border-radius:9999px;background:linear-gradient(135deg,var(--sharing-accent),var(--sharing-accent-2));box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 18%,transparent);margin-top:.35rem"></div></div><div><span style="font-weight:700;color:var(--sharing-accent);font-size:1rem">12/2025</span><span style="color:var(--sharing-fg-soft);font-size:.9rem"> — MCP gia nhập <strong>Agentic AI Foundation</strong> (Linux Foundation)</span><div style="color:var(--sharing-muted);font-size:.76rem">đồng sáng lập Anthropic · Block · OpenAI — governance trung lập</div></div></div></div>

::right::

<div style="border:1px solid var(--sharing-border);border-left:4px solid var(--sharing-accent);border-radius:.6rem;background:var(--sharing-bg-soft);padding:.7rem .9rem"><div style="font-weight:700;color:var(--sharing-accent);font-size:.78rem;text-transform:uppercase;letter-spacing:.08em">Tầm vóc cuối 2025</div><div style="display:flex;gap:1.4rem;margin-top:.55rem"><div><div style="font-size:1.5rem;font-weight:800;color:var(--sharing-fg);line-height:1">~97M</div><div style="font-size:.76rem;color:var(--sharing-fg-soft)">lượt tải SDK / tháng</div></div><div><div style="font-size:1.5rem;font-weight:800;color:var(--sharing-fg);line-height:1">~10.000</div><div style="font-size:.76rem;color:var(--sharing-fg-soft)">MCP server active</div></div></div><div style="color:var(--sharing-fg-soft);font-size:.82rem;margin-top:.6rem">Client first-class: ChatGPT · Claude · Gemini · Copilot · Cursor · VS Code</div></div>

<Spotlight label="Ý nghĩa" class="mt-3">
MCP đã thành <strong>chuẩn de-facto</strong> để nối AI với thế giới thực — <strong>trung lập, đa nhà cung cấp</strong> (governance qua Linux Foundation).
</Spotlight>

<style>
.two-cols-header { grid-template-columns: 1.15fr 1fr; column-gap: 28px; }
.two-cols-header .col-left, .two-cols-header .col-right { align-self: center; }
</style>

<!--
Timeline 11/2024→12/2025 đã verify (research/round-3). Nhấn: đa nhà cung cấp + chuyển
cho Linux Foundation = chuẩn trung lập, không bị một hãng kiểm soát. Số liệu 97M/10k từ AAIF.
-->

---
layout: quote
author: "Ẩn dụ phổ biến về MCP"
---

Trước USB-C, mỗi thiết bị một đầu cắm. MCP làm điều tương tự cho AI: **một chuẩn**, nối mọi mô hình với mọi công cụ.

---
layout: default
---

# Tổng kết

<div class="mt-3 flex items-center justify-center gap-3" style="flex-wrap:wrap">
  <div style="display:inline-flex;flex-direction:column;align-items:center;text-align:center;padding:.5rem .9rem;border-radius:.6rem;background:var(--sharing-bg-soft);border:1px solid var(--sharing-border);min-width:9rem"><div style="font-weight:700;color:var(--sharing-accent);font-size:1.1rem">AI / ML</div><div style="font-size:.78rem;color:var(--sharing-fg-soft)">học từ dữ liệu</div></div>
  <span style="color:var(--sharing-accent);font-size:1.5rem;font-weight:700">→</span>
  <div style="display:inline-flex;flex-direction:column;align-items:center;text-align:center;padding:.5rem .9rem;border-radius:.6rem;background:var(--sharing-bg-soft);border:1px solid var(--sharing-border);min-width:9rem"><div style="font-weight:700;color:var(--sharing-accent);font-size:1.1rem">LLM</div><div style="font-size:.78rem;color:var(--sharing-fg-soft)">ngôn ngữ & lý luận tổng quát</div></div>
  <span style="color:var(--sharing-accent);font-size:1.5rem;font-weight:700">→</span>
  <div style="display:inline-flex;flex-direction:column;align-items:center;text-align:center;padding:.5rem .9rem;border-radius:.6rem;background:color-mix(in srgb,var(--sharing-accent) 12%,white);border:1px solid var(--sharing-accent);min-width:9rem"><div style="font-weight:700;color:var(--sharing-accent);font-size:1.1rem">Agent</div><div style="font-size:.78rem;color:var(--sharing-fg-soft)">LLM + tools → biết hành động</div></div>
</div>

<div class="mt-3" style="text-align:center;color:var(--sharing-fg-soft);font-size:.95rem">Mỗi giai đoạn phá một giới hạn — <strong>tools</strong> biến LLM "biết nói" thành agent "biết làm".</div>

<div class="mt-4" style="background:color-mix(in srgb,var(--sharing-accent-2) 9%,white);border:1px solid color-mix(in srgb,var(--sharing-accent-2) 28%,white);border-left:4px solid var(--sharing-accent-2);border-radius:.6rem;padding:.65rem 1rem">
  <span style="font-weight:700;color:#0369a1">MCP — lớp kết nối, KHÔNG phải nấc tiến hoá mới.</span><span style="color:var(--sharing-fg-soft)"> Tools/agent bùng nổ → <strong>M×N</strong> tích hợp rối; MCP chuẩn hoá về <strong>M+N</strong> để mọi agent dùng chung mọi tool (như USB-C / HTTP).</span>
</div>

<Spotlight label="Thử ngay" class="mt-4">
Cắm một MCP server (filesystem / GitHub) vào Claude hoặc IDE của bạn, xem agent
"khám phá" tool và dùng — chỉ trong vài phút.
</Spotlight>

---
layout: end
---

# Cảm ơn!

Hỏi đáp · Q&A
