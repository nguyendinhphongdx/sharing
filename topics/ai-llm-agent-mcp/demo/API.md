# Todo MCP demo — API reference

Một tiến trình ([server.mjs](server.mjs)), **một bộ định nghĩa tool** (`toolRegistry`) dùng
chung một in-memory store, phục vụ tool theo **2 dạng**: REST tool-call (`/tools`) và MCP (`/mcp`).

- Base URL: `http://localhost:8848` (đổi qua biến môi trường `PORT`)
- Token cho endpoint MCP: `demo-secret-123` → header `Authorization: Bearer demo-secret-123`
- Tool-call REST (`/tools`) **để mở** (không token) cho dễ demo & để n8n HTTP Request node gọi thẳng.

---

## 1) Tool-call REST API (gọi tool "bình thường" qua HTTP)

| Method | Path | Body | Công dụng |
|--------|------|------|-----------|
| `GET` | `/tools` | — | Liệt kê tool + params (vai trò giống `tools/list` của MCP) |
| `POST` | `/tools/:name` | `arguments` trực tiếp, hoặc `{ "arguments": {…} }` | Gọi 1 tool |

**Trả về:** `{ ok, message, data }`. Sai/thiếu tham số → `400`. Tool không tồn tại → `404`.

### 4 tool

| Tool | Params | Body ví dụ |
|------|--------|-----------|
| `list_todos` | — | `{}` |
| `add_todo` | `title` (string, bắt buộc) | `{ "title": "Mua cà phê" }` |
| `complete_todo` | `id` (number, bắt buộc) | `{ "id": 1 }` |
| `delete_todo` | `id` (number, bắt buộc) | `{ "id": 1 }` |

### curl

```bash
curl -s localhost:8848/tools
curl -s -X POST localhost:8848/tools/add_todo      -H "Content-Type: application/json" -d '{"title":"Mua cà phê"}'
curl -s -X POST localhost:8848/tools/complete_todo -H "Content-Type: application/json" -d '{"id":1}'
curl -s -X POST localhost:8848/tools/delete_todo   -H "Content-Type: application/json" -d '{"id":1}'
```

Ví dụ kết quả `POST /tools/add_todo`:

```json
{ "ok": true, "message": "Da them todo #5: \"Mua cà phê\"", "data": { "id": 5, "title": "Mua cà phê", "done": false, "createdAt": "…" } }
```

---

## 2) REST API cho Web UI

| Method | Path | Body | Công dụng |
|--------|------|------|-----------|
| `GET` | `/` | — | Web UI live (tự poll) |
| `GET` | `/api/todos` | — | Danh sách todo |
| `POST` | `/api/todos` | `{ "title": "…" }` | Thêm todo |
| `POST` | `/api/todos/:id/complete` | `{ "done": true }` | Đánh dấu hoàn thành |
| `DELETE` | `/api/todos/:id` | — | Xoá todo |
| `GET` | `/api/info` | — | Token + path (`mcpPath`, `ssePath`, `toolsPath`) cho nút ⚙ trên UI |

---

## 3) MCP server (cần `Authorization: Bearer demo-secret-123`)

| Method | Path | Công dụng |
|--------|------|-----------|
| `POST` / `GET` / `DELETE` | `/mcp` | Streamable HTTP (khuyến nghị cho n8n & client mới) |
| `GET` | `/sse` | Mở stream (SSE legacy) |
| `POST` | `/messages?sessionId=…` | Gửi JSON-RPC cho phiên SSE |

Client MCP tự **khám phá** tool qua `tools/list` rồi gọi `tools/call` — không cần biết trước URL
từng tool (khác hẳn dạng REST ở mục 1). Xem [check.mjs](check.mjs) để biết cách một client MCP
kết nối & gọi tool.

---

## Chạy

```bash
npm install
npm start       # http://localhost:8848
npm run check   # self-test: kiểm tra CẢ MCP (/mcp) lẫn REST tool-call (/tools)
```

> So sánh để demo: cùng 4 tool, **REST** thì client phải biết trước từng URL và nối tay
> (M×N); **MCP** thì client tự khám phá rồi gọi qua một chuẩn chung (M+N).
