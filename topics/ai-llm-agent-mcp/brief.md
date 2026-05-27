# Brief: Hành trình AI → LLM → Agent và lời giải MCP

> File này là **outline để bạn duyệt** trước khi dựng slide.
> Sửa trực tiếp ở đây; khi bạn OK, AI mới sinh `slides.md`.

- **Slug:** `ai-llm-agent-mcp`
- **Ngày:** 2026-05-27
- **Khán giả:** Developer mức trung cấp (đã biết lập trình, chưa chắc rõ nội tại LLM/agent)
- **Thời lượng:** ~30 phút + 10 phút hỏi đáp (~22–26 slide)
- **Mục tiêu (sau buổi này người nghe sẽ...):**
  - Hiểu mạch tiến hoá AI → LLM → Agent và **vì sao** mỗi bước xuất hiện
  - Nắm các thành phần của một AI agent, đặc biệt vai trò của **tools**
  - Hiểu bài toán bùng nổ & quản lý tools (M×N) và **MCP giải quyết ra sao**
- **Thông điệp cốt lõi (1 câu):**
  Agent mạnh lên nhờ **tools**, nhưng tools nhiều lên thì tích hợp vỡ trận — **MCP** chuẩn hoá kết nối để biến bài toán M×N thành M+N.

## Góc nhìn / câu chuyện dẫn dắt

Kể theo trình tự "vì sao": mỗi nấc tiến hoá sinh ra một giới hạn, nấc sau ra đời để
phá giới hạn đó. LLM giỏi *nói* nhưng không *làm* → thêm tools thành agent. Tools
nhiều lên thì tích hợp rối như "dây sạc mỗi hãng một chuẩn" → MCP là "USB-C cho AI".

## Outline (mỗi mục ~ 1–3 slide)

1. **Mở đầu** — Cover + 1 câu hook: "Từ AI biết nói đến AI biết làm".
2. **Phần 1 — Hành trình AI → LLM → Agent**
   - AI cổ điển / ML: học từ dữ liệu, mỗi bài toán một model riêng.
   - LLM trỗi dậy: **transformer** (2017) → **scaling** → mô hình nền tảng (GPT, Claude…). LLM = bộ dự đoán token, giỏi ngôn ngữ/lý luận nhưng "đóng băng" sau training, không hành động.
   - Từ chatbot → agent: LLM + vòng lặp *reason → act → observe* để tự hành động.
3. **Cầu nối — Thành phần của agent & bài toán tools**
   - 4 thành phần: **LLM (bộ não)**, **planning/reasoning**, **memory**, **tools** (tay chân).
   - Tools là mấu chốt: cho agent đọc/ghi thế giới thực (API, DB, file, web…).
   - Bùng nổ tools: mỗi app tự định nghĩa tool/integration riêng → **bài toán M×N** (M agent × N tool), trùng lặp, mỗi tích hợp một kiểu, khó khám phá/quản lý/bảo trì, không chuẩn hoá.
4. **Phần 2 — MCP là lời giải**
   - MCP là gì: chuẩn mở Anthropic công bố **11/2024**, "**USB-C cho AI**" — chuẩn hoá cách LLM/agent kết nối dữ liệu & công cụ.
   - Kiến trúc: **Host** (app AI) → tạo **Client** → nối tới **Server**; 2 lớp **data layer** (JSON-RPC 2.0) + **transport layer**.
   - Primitives của server: **Tools / Resources / Prompts** (khám phá động qua `tools/list`, gọi qua `tools/call`); client có Sampling/Elicitation.
   - Transport: **stdio** (local) và **Streamable HTTP** (remote, hỗ trợ OAuth).
   - M×N → **M+N**: viết server 1 lần, mọi host MCP dùng được; ngược lại.
   - Hệ sinh thái 2025–2026: OpenAI (3/2025), Google DeepMind (4/2025), Microsoft (VS Code/Azure) đều theo; **10.000+ MCP server công khai**; 12/2025 Anthropic chuyển MCP cho **Agentic AI Foundation** (Linux Foundation).
5. **Tổng kết & next step** — bản đồ AI→LLM→Agent→MCP; gợi ý thử 1 MCP server; Q&A.

## Điểm chính cần nhấn (talking points)

- LLM **không tự hành động** — phải có tool calling mới chạm được thế giới thực.
- Cái khó của agent thực chiến **không phải model**, mà là **tích hợp tools** rời rạc.
- M×N: 3 agent × 100 tool = 300 bản tích hợp tay; MCP đưa về 3 + 100.
- MCP **không** thay LLM/agent framework — nó chỉ chuẩn hoá *lớp kết nối* (giống HTTP).
- Khám phá tool **động**: server đổi tool → `notifications/tools/list_changed` → client cập nhật.

## Thuật ngữ (giữ tiếng Anh, kèm giải thích ngắn)

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

## Hiểu lầm thường gặp / điểm dễ nhầm

- "MCP là một AI/agent mới" → Sai. MCP chỉ là **giao thức kết nối**, không phải model.
- "Có MCP là hết cần framework agent" → Không; MCP bổ trợ, không thay LangChain/SDK.
- "MCP server chạy trên cloud" → Server có thể chạy **local** (stdio) hoặc remote.

## Gợi ý ảnh nền (cho cover + section)

- query: `artificial intelligence`
- query: `neural network`
- query: `robot artificial intelligence`
- query: `usb-c connector`
- query: `network connection diagram`
- query: `data center servers`

## Nguồn tham khảo

1. MCP — Architecture overview (docs chính thức) — https://modelcontextprotocol.io/docs/concepts/architecture — định nghĩa host/client/server, primitives, transport.
2. Model Context Protocol — Wikipedia — https://en.wikipedia.org/wiki/Model_Context_Protocol — mốc thời gian & adoption (OpenAI 3/2025, Google 4/2025).
3. Anthropic — Donating MCP to the Agentic AI Foundation — https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation — chuyển giao quản trị 12/2025.
4. The New Stack — Why the Model Context Protocol Won — https://thenewstack.io/why-the-model-context-protocol-won/ — vì sao MCP thành chuẩn de-facto.
5. Pento — A Year of MCP (2025 review) — https://www.pento.ai/blog/a-year-of-mcp-2025-review — quy mô hệ sinh thái.
