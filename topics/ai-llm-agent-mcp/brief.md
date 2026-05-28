# Brief: Hành trình của AI — từ biết *nói* đến biết *làm* (và lời giải MCP)

> **STAGE C — brief chi tiết per-slide.** slide-builder chỉ FORMAT, không sáng tác.
> Đây là bản REMAKE (LỚN): đổi cover title (bỏ chuỗi mũi tên H1), thêm timeline lịch sử
> AI đầu Phần 1, làm dày từng nấc Phần 1 + ví dụ & image hint, polish 3 slide Phần 2–3.
> Phần 3 (MCP) GIỮ NGUYÊN mạch — chỉ thêm ví dụ cho 3 slide.

- **Slug:** `ai-llm-agent-mcp`
- **Ngày:** 2026-05-28 (remake)
- **Khán giả:** Developer & tester mức trung cấp (kỹ thuật, chưa chắc rõ nội tại LLM/agent)
- **Thời lượng:** ~30 phút + Q&A (~30 slide sau remake)
- **Mục tiêu (sau buổi này người nghe sẽ...):**
  - Hiểu mạch tiến hoá AI → LLM → Agent và **vì sao** mỗi bước xuất hiện (qua timeline thật)
  - Nắm các thành phần của một AI agent, đặc biệt vai trò của **tools**
  - Hiểu bài toán bùng nổ & quản lý tools (M×N) và **MCP giải quyết ra sao**
- **Thông điệp cốt lõi (1 câu):**
  Agent mạnh lên nhờ **tools**, nhưng tools nhiều lên thì tích hợp vỡ trận — **MCP** chuẩn hoá kết nối để biến bài toán M×N thành M+N.

## Góc nhìn / câu chuyện dẫn dắt

Kể theo trình tự "vì sao": mỗi nấc tiến hoá sinh ra một giới hạn, nấc sau ra đời để
phá giới hạn đó. AI đi từ thắng cờ (Deep Blue, AlphaGo) → học từ dữ liệu (deep learning)
→ ngôn ngữ tổng quát (LLM) → biết *hành động* (Agent). LLM giỏi *nói* nhưng không *làm*
→ thêm tools thành agent. Tools nhiều lên thì tích hợp rối như "dây sạc mỗi hãng một
chuẩn" → MCP là "USB-C cho AI".

---

# CHI TIẾT TỪNG SLIDE (Stage C)

> Ghi chú đọc brief: mỗi slide ghi **layout**, **title**, **bullets/nội dung thật**,
> **image hint** (nếu có), **presenter note**. `[ẢNH MỚI]` = cần tải bằng fetch-images
> trước khi dựng. `[ẢNH CŨ]` = đã có trong credits.json, tái dùng.

## Slide 1 — Cover  *(ĐỔI: bỏ H1 chuỗi mũi tên)*
- **layout:** `cover`
- **background:** `/images/02-ai-generated-abstract-minimalistic-dark-.jpg` `[ẢNH CŨ]`
- **H1 (title mới):** **Hành trình của AI: từ biết *nói* đến biết *làm***
  - (Chốt 1 title thật, không dùng chuỗi mũi tên "AI → LLM → Agent → MCP" làm H1.
    Phương án dự phòng nếu muốn nhấn MCP: "Từ AI đến AI Agent — và lời giải MCP".)
- **Sub:** Một buổi đi từ AI thắng cờ, tới LLM, tới Agent — và vì sao cần một "USB-C cho AI".
- **Dòng nhỏ:** `Buổi chia sẻ kiến thức · 2026-05-28`
- **presenter note:** 2 năm trước AI chỉ trả lời; giờ AI tự đặt vé, sửa code, query DB.
  Điều gì đã thay đổi? Mạch tiến hoá nằm ở "tools" — và bài toán quản lý chúng.

## Slide 2 — Agenda / Hành trình hôm nay  *(GIỮ, mạch evolution để ở diagram bên trong)*
- **layout:** `default`
- **title:** Hành trình hôm nay
- **bullets (≤6):**
  - **Phần 1** — Hành trình AI → LLM → Agent: *vì sao* mỗi nấc xuất hiện
  - **Phần 2** — Bên trong Agent: <Tag>tools</Tag> và bài toán bùng nổ tích hợp
  - **Phần 3** — **MCP**: chuẩn hoá kết nối, biến **M×N → M+N**
- **Spotlight (label="Thông điệp cốt lõi"):** Agent mạnh lên nhờ **tools**. Nhưng tools
  nhiều lên thì tích hợp vỡ trận — **MCP** chuẩn hoá lớp kết nối để mọi agent dùng chung mọi tool.
- **presenter note:** Mũi tên evolution vẫn được dùng *trong* agenda/diagram, chỉ không
  làm H1 cover. Đặt kỳ vọng 3 phần.

## Slide 3 — Section 01  *(GIỮ; chỉnh sub cho khớp timeline tiếp theo)*
- **layout:** `section`
- **number:** `"01"`
- **background:** `/images/01-abstract-futuristic-digital-and-technolo.jpg` `[ẢNH CŨ]`
- **title:** Hành trình AI → LLM → Agent
- **sub:** Sáu thập kỷ, vài cột mốc — mỗi nấc phá một giới hạn.
- **presenter note:** Dẫn vào timeline ngay sau đây.

## Slide 4 — Timeline (phần 1): AI thắng cờ → deep learning  *(THÊM MỚI)*
- **layout:** `default`
- **title:** Cột mốc AI (1) — khi máy bắt đầu *thắng người*
- **nội dung (timeline dọc, năm in đậm + `<Tag>`; ≤6 dòng):**
  - **1950s–1980s** — AI cổ điển / **expert systems** (rule-based) <Tag>rule-based</Tag>
  - **1997** — IBM **Deep Blue** thắng Garry Kasparov (cờ vua) <Tag>cờ vua</Tag> ← *"AI thắng vua cờ"*
  - **2012** — **AlexNet / ImageNet**: deep learning bùng nổ <Tag>vision</Tag>
  - **2016** — **AlphaGo** thắng Lee Sedol (cờ vây) <Tag>cờ vây</Tag>
- **callout/Spotlight (label="Ghi chú"):** Deep Blue thắng bằng *vét nước cờ* (brute-force);
  AlphaGo *học* từ dữ liệu — đây chính là bước nhảy sang **machine learning / deep learning**.
- **image hint:** `[ẢNH MỚI]` ảnh nhỏ minh hoạ bàn cờ / Deep Blue / cờ vây — query: `chess board game` hoặc `go board game stones`. (Nếu dùng `image-right` thay `default` thì gắn ảnh bàn cờ.)
- **presenter note:** Verified: Deep Blue 11/5/1997 (thắng 3.5–2.5); AlexNet 2012 (top-5
  error 26.2%→15.3%); AlphaGo 3/2016 Seoul (4–1). Nhấn: 2 mốc "cờ" cho thấy AI chuyển từ
  brute-force sang học từ dữ liệu.

## Slide 5 — Timeline (phần 2): Transformer → LLM → Agent  *(THÊM MỚI)*
- **layout:** `default`
- **title:** Cột mốc AI (2) — khi máy bắt đầu *nói* và *làm*
- **nội dung (timeline dọc; ≤6 dòng):**
  - **2017** — <Tag>Transformer</Tag> "Attention is All You Need" (Google) — nền của mọi LLM
  - **2022** — **ChatGPT**: LLM tới đại chúng <Tag>LLM</Tag>
  - **2023–2024** — **tool calling** + **AI Agent**; **MCP** công bố 11/2024 <Tag>Agent</Tag>
  - **2025** — MCP thành chuẩn de-facto đa nhà cung cấp <Tag>MCP</Tag>
- **Spotlight (label="Mạch của buổi nay"):** Từ đây trở đi ta đào sâu nửa cuối timeline:
  **LLM → Agent → MCP**.
- **image hint:** `[ẢNH MỚI]` query: `transformer neural network architecture` hoặc `language model neural network` (atmospheric, sáng).
- **presenter note:** Verified: Transformer arXiv 1706.03762 (6/2017, Vaswani et al.);
  ChatGPT ra mắt 30/11/2022 (100M user/2 tháng). Slide này là bản lề: phần còn lại của buổi
  bám nửa cuối timeline.

## Slide 6 — Nấc 1: AI cổ điển & Machine Learning  *(GIỮ + LÀM DÀY: ví dụ rule-based vs ML + ảnh)*
- **layout:** `image-right`
- **image:** `[ẢNH MỚI]` query: `expert system decision tree` hoặc `vintage computer` hoặc `decision tree diagram`
- **title:** Nấc 1 — AI cổ điển & Machine Learning
- **bullets (≤5):**
  - AI "truyền thống": **luật tay** (rule-based) — giòn, không tổng quát hoá
  - **Machine Learning**: học quy luật *từ dữ liệu* thay vì lập trình từng luật
  - Nhưng: **mỗi bài toán = một model riêng** (phân loại ảnh, dịch máy, gợi ý…)
- **callout ví dụ đối chiếu (đặt trong box code/note, KHÔNG phình bullet):**
  ```
  Rule-based: if email chứa "trúng thưởng" → spam   (giòn: né chữ là lọt)
  ML:         học từ hàng nghìn email → bắt cả biến thể ("tru’ng thươ?ng", ảnh…)
  ```
- **Spotlight (label="Giới hạn", tone="accent"):** Không có mô hình "đa năng" — đổi bài
  toán là phải gom dữ liệu và train lại từ đầu.
- **presenter note:** Ví dụ spam là cầu nối trực giác rule-based (giòn) vs ML (học, bắt
  biến thể). Dẫn tới câu hỏi: có model nào *một cái làm nhiều việc* không? → LLM.

## Slide 7 — Nấc 2: Sự trỗi dậy của LLM  *(GIỮ + LÀM DÀY: ví dụ dự đoán token + ảnh)*
- **layout:** `image-right`
- **image:** `[ẢNH MỚI]` query: `neural network` hoặc `transformer architecture` (sáng, abstract)
- **title:** Nấc 2 — Sự trỗi dậy của LLM
- **bullets (≤5):**
  - **2017**: kiến trúc <Tag>Transformer</Tag> ("Attention is All You Need")
  - **Scaling**: thêm dữ liệu + tham số + compute → năng lực tổng quát bất ngờ
  - Sinh ra **foundation models** (GPT, Claude, Gemini…): *một* model, *nhiều* việc
- **callout ví dụ "dự đoán token" (box note 1 dòng):**
  ```
  "Hà Nội là thủ đô của ___"  →  LLM dự đoán token kế tiếp: "Việt Nam"
  ```
- **dòng nhỏ:** LLM = bộ dự đoán **token** kế tiếp, học từ lượng văn bản khổng lồ — lặp lại
  việc đó đủ lớn thì "biết" ngữ pháp, sự kiện, lý luận.
- **presenter note:** Ví dụ token-prediction khử bí ẩn LLM: bản chất là đoán chữ kế tiếp;
  nhờ Transformer 2017 + scaling mà việc đó sinh ra năng lực tổng quát.

## Slide 8 — LLM giỏi *nói* nhưng chưa biết *làm*  *(GIỮ + LÀM DÀY: ví dụ "giá vàng hôm nay")*
- **layout:** `default`
- **title:** LLM giỏi *nói* — nhưng chưa biết *làm*
- **bullets (≤5):**
  - Kiến thức **đóng băng** tại thời điểm train — không biết chuyện mới
  - Không truy cập được **dữ liệu riêng** của bạn (DB, file nội bộ, API)
  - Chỉ sinh **văn bản** — tự nó không thể đặt lịch, gọi API hay chạy code
- **callout ví dụ "đóng băng kiến thức" (box note):**
  ```
  Hỏi: "Giá vàng hôm nay bao nhiêu?"
  LLM thuần: không biết (dừng ở lúc train) → trả lời cũ, hoặc bịa (hallucinate)
  ```
- **Spotlight (label="Khoảng trống"):** Cần một cách để LLM **hành động** ra thế giới thực
  → đây là lúc **tool calling** và **agent** xuất hiện.
- **presenter note:** "Giá vàng hôm nay" là ví dụ đắt: cho thấy giới hạn đóng băng + nguy
  cơ bịa. Đây là bản lề dẫn sang tool calling/agent.

## Slide 9 — Nấc 3: Từ chatbot đến AI Agent  *(GIỮ sơ đồ + LÀM DÀY: ví dụ đặt vé chạy qua loop)*
- **layout:** `default`
- **title:** Nấc 3 — Từ chatbot đến **AI Agent**
- **lead:** Agent = LLM đặt trong vòng lặp **reason → act → observe**, có quyền dùng tools.
- **mermaid (GIỮ nguyên loop):**
  ```mermaid
  graph LR
    G[Mục tiêu] --> R[Reason / lập kế hoạch]
    R --> A[Act: gọi Tool]
    A --> O[Observe: đọc kết quả]
    O --> R
    O --> D[Hoàn thành]
  ```
- **callout ví dụ đặt vé chạy qua vòng lặp (box note, ngắn):**
  ```
  Reason: cần tìm chuyến  →  Act: search_flights(HAN→SGN, 1/6)
  Observe: có 3 chuyến    →  Reason: chọn rẻ nhất  →  Act: book_flight(...) → Done
  ```
- **dòng nhỏ:** LLM tự quyết định *gọi tool nào, với tham số gì*, rồi dùng kết quả để bước tiếp.
- **presenter note:** Chạy ví dụ đặt vé từng vòng để khán giả "thấy" loop. Dẫn sang câu hỏi:
  *bên trong* một agent có những gì? → Phần 2.

## Slide 10 — Section 02  *(GIỮ)*
- **layout:** `section`
- **number:** `"02"`
- **title:** Bên trong một Agent
- **sub:** Thành phần, vai trò của **tools**, và bài toán bắt đầu lộ ra.

## Slide 11 — Bốn thành phần của một Agent  *(GIỮ vị trí; LÀM DÀY: ví dụ memory ngắn/dài hạn)*
- **layout:** `image-right`
- **image:** `/images/08-rise-of-the-planet-of-the-agents-creatin.png` `[ẢNH CŨ]`
- **title:** Bốn thành phần của một Agent
- **bullets (≤5):**
  - 🧠 **LLM — bộ não:** suy luận, ra quyết định
  - 🗺️ **Reasoning / Planning:** chia mục tiêu thành các bước
  - 💾 **Memory:** ngữ cảnh ngắn hạn + dài hạn
  - 🔧 **Tools — tay chân:** đọc/ghi thế giới thực (API, DB, file, web)
- **callout ví dụ memory (box note 1 dòng):**
  ```
  Ngắn hạn: nội dung hội thoại hiện tại   |   Dài hạn: hồ sơ user, tài liệu đã lập index
  ```
- **Spotlight (label="Mấu chốt"):** LLM là bộ não, nhưng **tools** mới biến "biết nói"
  thành "biết làm".
- **presenter note:** Ví dụ memory ngắn/dài hạn để phân biệt rõ. Nhấn tools là phần ta đào
  sâu tiếp.

## Slide 12 — Tools: cây cầu ra thế giới thực  *(GIỮ interface + POLISH: thêm ví dụ tool điền thật get_weather)*
- **layout:** `default`
- **title:** Tools — cây cầu ra thế giới thực
- **bullets (≤4):**
  - Mỗi tool = một **hàm có schema**: tên, mô tả, tham số đầu vào
  - Ví dụ: `search_web`, `query_db`, `send_email`, `get_weather`…
  - LLM đọc danh sách tool → chọn tool → app **thực thi** → trả kết quả về
- **code 1 — interface tổng quát (GIỮ):**
  ```ts
  interface Tool {
    name: string                 // "get_weather"
    description: string          // LLM đọc để biết khi nào dùng
    inputSchema: JSONSchema      // tham số hợp lệ
    run(args: unknown): Promise<Result>
  }
  ```
- **code 2 — ví dụ ĐIỀN THẬT (POLISH, đặt cạnh interface):**
  ```ts
  const getWeather: Tool = {
    name: "get_weather",
    description: "Lấy thời tiết hiện tại của một thành phố",
    inputSchema: { type: "object", properties: { city: { type: "string" } }, required: ["city"] },
    run: async ({ city }) => fetchWeather(city),
  }
  ```
- **presenter note:** Đặt interface tổng quát cạnh ví dụ get_weather đã điền để khán giả
  thấy schema "trông như thế nào khi thật". `description` là thứ LLM đọc để quyết định gọi.
  *(Nếu 2 block code làm slide quá dày, dùng `two-cols`: trái = interface, phải = get_weather.)*

## Slide 13 — Càng nhiều tool → tích hợp vỡ trận  *(GIỮ)*
- **layout:** `default`
- **title:** Càng nhiều tool → tích hợp **vỡ trận**
- **lead:** Mỗi app/dịch vụ tự định nghĩa tool & cách kết nối riêng → **bài toán M×N**.
- **mermaid (GIỮ):**
  ```mermaid
  graph LR
    A1[Agent 1] --- T1[Slack]
    A1 --- T2[GitHub]
    A1 --- T3[Postgres]
    A2[Agent 2] --- T1
    A2 --- T2
    A2 --- T3
    A3[Agent 3] --- T1
    A3 --- T2
    A3 --- T3
  ```
- **dòng nhỏ:** M agent × N tool = M×N bản tích hợp viết tay. 3 × 3 = 9… và còn phình to.
- **presenter note:** Hình lưới chằng chịt là điểm "đau". Dẫn sang hệ quả.

## Slide 14 — Hệ quả: trùng lặp & khó quản lý  *(GIỮ)*
- **layout:** `default`
- **title:** Hệ quả: trùng lặp & khó quản lý
- **bullets (≤5):**
  - **Trùng lặp**: mỗi đội viết lại connector cho cùng một dịch vụ
  - **Không chuẩn**: mỗi tích hợp một kiểu auth, một format, một cách báo lỗi
  - **Khó khám phá / quản trị**: tool nào đang có? ai được dùng? cập nhật ra sao?
  - Đổi 1 API → sửa **mọi** agent đang gọi nó
- **Spotlight (label="Câu hỏi"):** Nếu USB từng thống nhất "muôn vàn đầu cắm", liệu có một
  **chuẩn chung** cho việc nối AI với dữ liệu & công cụ?
- **presenter note:** Đặt câu hỏi mở dẫn thẳng sang MCP.

---

## PHẦN 3 — MCP  *(GIỮ NGUYÊN MẠCH; chỉ POLISH slide 16 & 18)*

## Slide 15 — Section 03  *(GIỮ)*
- **layout:** `section`; **number:** `"03"`
- **title:** MCP — *USB-C cho AI*
- **sub:** Model Context Protocol: một chuẩn, nối mọi agent với mọi tool.

## Slide 16 — MCP là gì?  *(GIỮ)*
- **layout:** `default`
- **title:** MCP là gì?
- **bullets:**
  - **Model Context Protocol** — chuẩn **mở**, Anthropic công bố **11/2024**
  - Chuẩn hoá cách **AI app ↔ dữ liệu & công cụ** kết nối với nhau
  - Ẩn dụ: <Tag variant="solid">USB-C cho AI</Tag> — một cổng, cắm được mọi thứ
- **Spotlight (label="Quan trọng"):** MCP **không** phải model hay framework agent mới. Nó
  là **giao thức kết nối** — vai trò giống HTTP với web.
- **presenter note:** Nhấn: MCP ở "lớp kết nối", không thay LLM hay LangChain/SDK.

## Slide 17 — Kiến trúc Host · Client · Server  *(GIỮ + POLISH: thêm ví dụ ánh xạ cụ thể)*
- **layout:** `image-right`
- **image:** `/images/05-what-is-model-context-protocol-mcp-a-gui.png` `[ẢNH CŨ]`
- **title:** Kiến trúc: Host · Client · Server
- **bullets (≤4):**
  - **Host**: app AI (Claude, IDE, ChatGPT…), điều phối nhiều client
  - **Client**: giữ kết nối **1-1** tới một server
  - **Server**: chương trình *cấp* tools & dữ liệu
  - **Transport**: **stdio** (local) hoặc **HTTP** (remote)
- **callout ví dụ ánh xạ cụ thể (POLISH, box note):**
  ```
  Claude Desktop (Host)
    ├─ Client 1 → MCP server: filesystem  (đọc/ghi file)
    └─ Client 2 → MCP server: GitHub      (issue, PR, repo)
  → 1 host → nhiều client; mỗi client nối đúng 1 server.
  ```
- **presenter note:** Ví dụ Claude Desktop + filesystem + GitHub làm rõ "1 host → nhiều
  client, mỗi client 1 server". Đây là chỗ hay nhầm nhất.

## Slide 18 — Hai lớp & các "primitives"  *(GIỮ; POLISH: ví dụ 1 dòng cho mỗi primitive)*
- **layout:** `two-cols-header`
- **title:** Hai lớp & các "primitives"
- **::left:: — Data layer (JSON-RPC 2.0):**
  - Vòng đời, thương lượng năng lực, và các primitives.
  - Server cung cấp:
    - **Tools** — hàm để *hành động* — *vd:* `send_email`
    - **Resources** — dữ liệu/ngữ cảnh — *vd:* đọc file `README.md`
    - **Prompts** — mẫu tương tác — *vd:* mẫu "tóm tắt PR này"
- **::right:: — Transport layer:**
  - **stdio** — tiến trình local
  - **Streamable HTTP** — remote (+ OAuth)
  - Client cung cấp: **Sampling**, **Elicitation**, **Logging**
- **::bottom:: (dòng nhỏ):** Cùng một format JSON-RPC chạy trên mọi transport — server
  không cần quan tâm.
- **presenter note:** Slide khó nhất — ví dụ 1 dòng/primitive (send_email / đọc README /
  mẫu tóm tắt PR) giúp phân biệt Tools (làm) vs Resources (dữ liệu) vs Prompts (mẫu).
  Nếu chật chỗ, để ví dụ dạng `<Tag>` hoặc chú thích nhỏ chứ không phình bullet.

## Slide 19 — Khám phá tool động  *(GIỮ)*
- **layout:** `default`
- **title:** Khám phá tool **động**
- **lead:** Client hỏi server có tool gì (`tools/list`), rồi gọi (`tools/call`).
- **code json (GIỮ):**
  ```json
  { "jsonrpc": "2.0", "id": 2, "method": "tools/list" }
  ```
- **bullets:**
  - Server đổi tool → gửi `notifications/tools/list_changed`
  - Client tự cập nhật → LLM thấy ngay năng lực mới, **không cần code lại**
- **dòng nhỏ:** Khác biệt lớn so với tool nhúng cứng: danh sách tool là *dữ liệu*, không phải code.

## Slide 20 — Lời giải M×N → M+N  *(GIỮ)*
- **layout:** `two-cols-header`
- **title:** Lời giải: M×N → **M+N**
- **::left:: Trước MCP:** mỗi cặp (agent, tool) một tích hợp · 3 agent × 100 tool = **300** bản tay · đổi 1 tool → sửa khắp nơi
- **::right:: Với MCP:** viết **server 1 lần** → mọi host dùng · viết **client 1 lần** → mọi server dùng · 3 + 100 = **103** mảnh ghép
- **::bottom:: mermaid (GIỮ):**
  ```mermaid
  graph LR
    A1[Agent 1] --> M((MCP))
    A2[Agent 2] --> M
    A3[Agent 3] --> M
    M --> T1[Slack]
    M --> T2[GitHub]
    M --> T3[Postgres]
  ```

## Slide 21 — Hệ sinh thái 2025 → 2026  *(GIỮ)*
- **layout:** `default`
- **title:** Hệ sinh thái 2025 → 2026
- **bullets:**
  - **03/2025**: OpenAI áp dụng MCP (ChatGPT, SDK)
  - **04/2025**: Google DeepMind xác nhận hỗ trợ trong Gemini
  - **Microsoft**: tích hợp vào VS Code & Azure
  - **10.000+** MCP server công khai; hàng trăm Fortune 500 triển khai
  - **12/2025**: Anthropic chuyển MCP cho **Agentic AI Foundation** (Linux Foundation)
- **Spotlight (label="Ý nghĩa"):** MCP đã thành **chuẩn de-facto** để nối AI với thế giới
  thực — trung lập, đa nhà cung cấp.

## Slide 22 — Hiểu lầm thường gặp  *(GIỮ)*
- **layout:** `default`
- **title:** Hiểu lầm thường gặp
- **bullets:**
  - ❌ *"MCP là một AI/agent mới"* → MCP chỉ là **giao thức kết nối**
  - ❌ *"Có MCP là hết cần framework agent"* → MCP **bổ trợ**, không thay LangChain/SDK
  - ❌ *"MCP server luôn chạy trên cloud"* → có thể chạy **local** (stdio) hoặc remote

## Slide 23 — Quote  *(GIỮ)*
- **layout:** `quote`; **author:** "Ẩn dụ phổ biến về MCP"
- **nội dung:** Trước USB-C, mỗi thiết bị một đầu cắm. MCP làm điều tương tự cho AI:
  **một chuẩn**, nối mọi mô hình với mọi công cụ.

## Slide 24 — Tổng kết  *(GIỮ; mạch evolution trong nội dung, không làm H1 mũi tên)*
- **layout:** `default`
- **title:** Tổng kết
- **lead:** **AI → LLM → Agent → MCP**: mỗi nấc phá một giới hạn. *(mũi tên trong body OK, không phải H1 cover.)*
- **bullets:**
  - LLM cho AI khả năng **ngôn ngữ & lý luận** tổng quát
  - **Tools** biến LLM "biết nói" thành agent "biết làm"
  - Tools bùng nổ → **M×N** → **MCP** chuẩn hoá về **M+N**
- **Spotlight (label="Thử ngay"):** Cắm một MCP server (filesystem / GitHub) vào Claude
  hoặc IDE của bạn, xem agent "khám phá" tool và dùng — chỉ trong vài phút.

## Slide 25 — Nguồn ảnh & tham khảo  *(GIỮ; cập nhật nếu thêm ảnh timeline)*
- **layout:** `default`, `class: text-sm`
- **title:** Nguồn ảnh & tham khảo
- **Ảnh:** nền AI/tech (Vecteezy); sơ đồ MCP (DevDash Labs); thành phần agent (Open Threat
  Research); + ảnh timeline/nấc Phần 1 (web — chi tiết `public/images/credits.json`).
- **Nội dung:** modelcontextprotocol.io (Architecture) · Wikipedia (MCP, Deep Blue, AlphaGo,
  AlexNet, Attention Is All You Need, ChatGPT) · Anthropic — Agentic AI Foundation.

## Slide 26 — Cảm ơn  *(GIỮ)*
- **layout:** `end`
- **title:** Cảm ơn!
- **sub:** Hỏi đáp · Q&A

---

## Điểm chính cần nhấn (talking points)  *(GIỮ)*

- LLM **không tự hành động** — phải có tool calling mới chạm được thế giới thực.
- Cái khó của agent thực chiến **không phải model**, mà là **tích hợp tools** rời rạc.
- M×N: 3 agent × 100 tool = 300 bản tích hợp tay; MCP đưa về 3 + 100.
- MCP **không** thay LLM/agent framework — nó chỉ chuẩn hoá *lớp kết nối* (giống HTTP).
- Khám phá tool **động**: server đổi tool → `notifications/tools/list_changed` → client cập nhật.

## Thuật ngữ (giữ tiếng Anh, kèm giải thích ngắn)  *(GIỮ)*

| Term | Giải thích |
|------|-----------|
| LLM | Large Language Model — mô hình dự đoán token, nền tảng cho agent |
| Tool calling / function calling | LLM xuất lời gọi hàm có cấu trúc để app thực thi |
| AI Agent | LLM + vòng lặp reason–act–observe + tools/memory để tự hoàn thành mục tiêu |
| MCP | Model Context Protocol — chuẩn mở kết nối AI app với dữ liệu & công cụ |
| Host / Client / Server | App AI / kết nối 1-1 / chương trình cấp tool & dữ liệu |
| Primitives | Tools, Resources, Prompts — thứ server "chào" cho client |
| JSON-RPC 2.0 | Giao thức RPC dạng JSON mà MCP dùng ở data layer |
| stdio / Streamable HTTP | 2 transport của MCP: local qua stdin/stdout, remote qua HTTP(+SSE) |

## Image hints tổng hợp cho fetch-images (ảnh MỚI cần tải sau khi duyệt)

> Tải bằng: `node scripts/fetch-images.mjs ai-llm-agent-mcp --query "..."`

- **Slide 4 (timeline 1 / cờ):** `chess board game` hoặc `go board game stones`
- **Slide 5 (timeline 2 / transformer):** `transformer neural network architecture` hoặc `language model neural network`
- **Slide 6 (Nấc 1 / rule-based):** `expert system decision tree` hoặc `vintage computer` hoặc `decision tree diagram`
- **Slide 7 (Nấc 2 / LLM):** `neural network` hoặc `transformer architecture` (sáng, abstract)

(Slide 9, 11 dùng mermaid / ảnh cũ — không cần ảnh mới.)

## Nguồn tham khảo  *(GIỮ + bổ sung mốc timeline đã verify)*

1. MCP — Architecture overview (docs chính thức) — https://modelcontextprotocol.io/docs/concepts/architecture
2. Model Context Protocol — Wikipedia — https://en.wikipedia.org/wiki/Model_Context_Protocol
3. Anthropic — Donating MCP to the Agentic AI Foundation — https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
4. The New Stack — Why the Model Context Protocol Won — https://thenewstack.io/why-the-model-context-protocol-won/
5. Pento — A Year of MCP (2025 review) — https://www.pento.ai/blog/a-year-of-mcp-2025-review
6. Deep Blue versus Garry Kasparov — Wikipedia — https://en.wikipedia.org/wiki/Deep_Blue_versus_Garry_Kasparov  *(1997)*
7. AlexNet — Wikipedia — https://en.wikipedia.org/wiki/AlexNet  *(2012)*
8. AlphaGo versus Lee Sedol — Wikipedia — https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol  *(2016)*
9. Attention Is All You Need — arXiv 1706.03762 — https://arxiv.org/abs/1706.03762  *(2017)*
10. ChatGPT — Wikipedia — https://en.wikipedia.org/wiki/ChatGPT  *(30/11/2022)*
