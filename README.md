# Sharing Slides Harness

Khung (harness) giúp AI Coding tạo **slide chia sẻ kiến thức** nhanh và nhất quán bằng [Slidev](https://sli.dev).

- Mỗi chủ đề là **một folder riêng** trong `topics/<slug>/`.
- Tất cả dùng chung **một local theme sáng** (accent teal) trong `theme/`.
- Nội dung **song ngữ**: thuật ngữ kỹ thuật giữ tiếng Anh (RAG, embedding, tool calling…), diễn giải bằng tiếng Việt.

---

## Bắt đầu nhanh

```powershell
npm install                                  # cài Slidev + deps (chạy 1 lần)
```

Cách chính là dùng AI trong Claude Code:

```
/make-slides <mô tả chủ đề bạn muốn chia sẻ>
```

Skill sẽ điều phối toàn bộ quy trình bên dưới và **dừng lại xin bạn duyệt** ở từng cổng.
Muốn xem nhanh một topic đã có:

```powershell
npm run list                                 # liệt kê các topic hiện có
npm run dev -- ai-llm-agent-mcp              # mở dev server cho 1 topic
```

---

## Quy trình: iterative, 3 cổng duyệt

AI không tự "chốt" thay bạn — mỗi buổi chia sẻ đi qua 8 bước với **3 cổng duyệt**:

| Bước | Việc | Cổng duyệt |
|------|------|------------|
| 1 | **Brainstorm** — chốt khán giả, thời lượng, góc nhìn, thông điệp cốt lõi | — |
| 2 | **Research vòng 1 (broad)** — agent `topic-researcher` quét rộng → `research/round-1-broad.md` | — |
| 3 | **Stage A — chọn outline** — AI đề xuất 2-3 outline (Evolution, Problem→Solution, Anatomy, Compare…); bạn chọn 1 hoặc "mix" | **Cổng 1** |
| 4 | **Stage B — duyệt key points** — AI viết key points theo outline; bạn "OK" hoặc "research thêm về X" (loop focused) | **Cổng 2** |
| 5 | **Stage C — brief chi tiết per-slide** — title, bullets thật, layout, image hint, presenter note | **Cổng 3** |
| 6 | **Tải ảnh** — `fetch-images` theo truy vấn trong Stage C | — |
| 7 | **Dựng slide** — agent `slide-builder` chỉ format + chọn layout + gắn ảnh, không sáng tác thêm | — |
| 8 | **Build + verify** — compile sạch, export PDF nếu cần | — |

> Cổng duyệt là bất khả xâm phạm: AI **không** sinh `slides.md` khi brief Stage C chưa được bạn duyệt, và **không** nhảy stage.

---

## Lệnh CLI

| Lệnh | Việc |
|------|------|
| `npm run list` | Liệt kê các topic hiện có |
| `npm run new -- <slug> --title "..." --author "..."` | Tạo topic mới từ template (`--title`/`--author` tuỳ chọn) |
| `npm run images -- <slug> --query "..." --query "..."` | Tải ảnh về `public/images/` (mặc định web/Bing) |
| `npm run dev -- <slug>` | Mở Slidev dev server (`--open` để mở trình duyệt) |
| `npm run build -- <slug>` | Build tĩnh ra `dist/` |
| `npm run export -- <slug>` | Export PDF (Playwright đã có sẵn trong deps) |

> Slug chỉ dùng chữ thường, số và dấu gạch ngang, ví dụ `ai-llm-agent-mcp`.

---

## Tạo topic mới vs. làm lại topic có sẵn

| Tình huống | Cách làm |
|------------|----------|
| **Topic mới** (chưa có folder) | `/make-slides <mô tả>` — chạy đủ quy trình 3 cổng ở trên |
| **Làm lại / chỉnh / cập nhật / fix** một topic đã dựng | `/remake-slides` — hỏi rõ cần đổi gì rồi điều phối agent `topic-remaker` |

`/remake-slides` tự phân loại thay đổi: **NHỎ** thì sửa thẳng `slides.md`; **LỚN** thì viết lại
`brief.md` (Stage C), xin bạn duyệt, rồi mới dựng lại slide. Bản cũ luôn giữ ở `*.bak`.

---

## Cấu trúc thư mục

| Đường dẫn | Vai trò |
|-----------|---------|
| `theme/` | Local Slidev theme dùng chung — nền sáng, accent teal, layout tuỳ biến (`cover`, `section`, `quote`, `end`) |
| `templates/topic/` | Skeleton sao chép cho mỗi topic mới (`brief.md`, `slides.md`, `public/images/`) |
| `topics/<slug>/` | Một chủ đề: `brief.md`, `slides.md`, `research/`, `public/images/` |
| `scripts/` | `new-topic`, `fetch-images`, `present` |
| `.claude/skills/make-slides/` | Quy trình tạo topic mới (điều phối) |
| `.claude/skills/remake-slides/` | Quy trình làm lại topic có sẵn |
| `.claude/agents/` | `topic-researcher`, `slide-builder`, `topic-remaker` |
| `CLAUDE.md` | Hướng dẫn chi tiết cho AI làm việc trong repo (cú pháp Slidev, layout, quy ước) |

---

## Nguồn ảnh

Mặc định ảnh tìm từ **web** (Bing/Google Images qua Playwright) — liên quan cao, không cần API key.
Script tự lọc bỏ ảnh dính watermark. Deck ở đây **dùng nội bộ** nên không bận tâm bản quyền.

| `--source` | Nguồn |
|-----------|-------|
| `web` (mặc định) | Bing/Google Images — bản quyền hỗn hợp, hợp dùng nội bộ |
| `cc` | Creative Commons: Openverse + Wikimedia Commons (an toàn bản quyền) |
| `openverse` / `commons` | Chỉ một nguồn CC cụ thể |
| `all` | web → openverse → commons |

Nguồn mỗi ảnh được ghi trong `topics/<slug>/public/images/credits.json`.
Có thể tải ảnh theo URL cụ thể: `npm run images -- <slug> --url https://.../anh.jpg`.
