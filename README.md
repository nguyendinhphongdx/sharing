# Sharing Slides Harness

Khung (harness) giúp AI Coding tạo **slide trình bày chia sẻ kiến thức** nhanh và nhất quán, dùng [Slidev](https://sli.dev). Mỗi chủ đề là **một folder riêng** trong `topics/`, tất cả dùng chung một **local theme sáng** (accent teal) trong `theme/`.

## Triết lý

Mỗi buổi chia sẻ đi qua một quy trình cố định:

1. **Brainstorm & làm rõ** — chốt khán giả, thời lượng, độ sâu, góc nhìn.
2. **Research** — tìm bài viết/tài liệu uy tín về chủ đề (agent `topic-researcher`).
3. **Tổng kết thành `brief.md`** — outline có cấu trúc + nguồn + gợi ý ảnh.
4. **Bạn duyệt** — chỉnh sửa tới khi đồng ý. *Đây là cổng bắt buộc trước khi dựng slide.*
5. **Tải ảnh** — ảnh chủ đề tìm từ web (Playwright/Bing, không cần key) hoặc Creative Commons (`--source cc`); có gradient dự phòng.
6. **Dựng slide** — `slides.md` dùng theme sáng, ảnh nền ở vài slide đầu, nhiều layout.
7. **Kiểm tra build** + export PDF nếu cần.

Ngôn ngữ nội dung: **song ngữ** (thuật ngữ kỹ thuật tiếng Anh, diễn giải tiếng Việt).

## Cách dùng nhanh (cho con người)

```powershell
npm install                       # cài Slidev + deps (chạy 1 lần)
npm run list                      # liệt kê các topic hiện có
npm run new -- <slug>             # tạo folder topic mới từ template
npm run images -- <slug> --query "..." --query "..."   # ảnh web (Bing); thêm --source cc cho ảnh CC
npm run dev -- <slug>             # mở Slidev dev server cho topic
npm run build -- <slug>           # build tĩnh ra dist/
npm run export -- <slug>          # export PDF/PNG (Playwright đã có sẵn trong deps)
```

## Cách dùng với AI Coding (cách chính)

Trong Claude Code, gõ:

```
/make-slides <mô tả chủ đề bạn muốn chia sẻ>
```

Skill sẽ tự điều phối toàn bộ quy trình ở trên, dừng lại xin bạn duyệt `brief.md`
trước khi dựng slide.

## Cấu trúc

| Đường dẫn | Vai trò |
|-----------|---------|
| `theme/` | Local Slidev theme dùng chung — nền sáng, accent teal, các layout tuỳ biến |
| `templates/topic/` | Skeleton sao chép cho mỗi topic mới |
| `topics/<slug>/` | Một chủ đề: `brief.md`, `slides.md`, `public/images/` |
| `scripts/` | `new-topic`, `fetch-images`, `present` |
| `.claude/agents/` | `topic-researcher`, `slide-builder` |
| `.claude/skills/make-slides/` | Quy trình điều phối |
| `CLAUDE.md` | Hướng dẫn chi tiết cho AI làm việc trong repo |

## Bản quyền ảnh

Mặc định ảnh tìm từ **web** (Bing Images qua Playwright) — liên quan cao, không cần
API key, **nhưng bản quyền hỗn hợp** → phù hợp dùng **nội bộ**. Script tự lọc bỏ ảnh
dính watermark. Muốn **an toàn bản quyền** để trình bày công khai, dùng
`--source cc` (Openverse + Wikimedia Commons, đa số CC-BY / public domain).

Mọi ảnh đều ghi nguồn/license trong `topics/<slug>/public/images/credits.json` —
hãy ghi nguồn theo file đó khi trình bày.
