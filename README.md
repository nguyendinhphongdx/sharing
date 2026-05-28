# Sharing Slides Harness

Khung (harness) giúp AI Coding tạo **slide trình bày chia sẻ kiến thức** nhanh và nhất quán, dùng [Slidev](https://sli.dev). Mỗi chủ đề là **một folder riêng** trong `topics/`, tất cả dùng chung một **local theme sáng** (accent teal) trong `theme/`.

## Triết lý

Mỗi buổi chia sẻ đi qua quy trình **iterative, 3 cổng duyệt** — không để AI tự
"chốt" thay bạn:

1. **Brainstorm** — chốt khán giả, thời lượng, góc nhìn, thông điệp cốt lõi.
2. **Research vòng 1 (broad)** — agent `topic-researcher` quét rộng, lưu notes
   thô vào `topics/<slug>/research/round-1-broad.md`.
3. **Stage A · cổng 1: chọn outline** — AI đề xuất 2-3 outline (theo các pattern
   khác nhau: Evolution, Problem→Solution, Anatomy, Compare, Pattern catalog,
   Case study…). Bạn chọn 1 hoặc "mix A+B".
4. **Stage B · cổng 2: duyệt key points** — AI viết 10-20 key points theo outline.
   Bạn nói "OK" hoặc "research thêm về X" → loop research (focused) + cập nhật key
   points → tới khi bạn OK rõ ràng.
5. **Stage C · cổng 3: brief chi tiết per-slide** — AI viết nội dung từng slide
   (title, bullets thật, layout, image hint, presenter note). Cổng cuối.
6. **Tải ảnh** — `fetch-images.mjs` theo truy vấn trong Stage C (web/Bing mặc
   định, không cần key).
7. **Dựng slide** — agent `slide-builder` chỉ format + chọn layout + gắn ảnh,
   không sáng tác thêm.
8. **Build + verify** + export PDF nếu cần.

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
| `.claude/agents/` | `topic-researcher`, `slide-builder`, `topic-remaker` (làm lại topic có sẵn) |
| `.claude/skills/make-slides/` | Quy trình tạo topic mới (điều phối) |
| `.claude/skills/remake-slides/` | Quy trình làm lại topic có sẵn (gọi `topic-remaker`) |
| `CLAUDE.md` | Hướng dẫn chi tiết cho AI làm việc trong repo |

## Nguồn ảnh

Mặc định ảnh tìm từ **web** (Bing Images qua Playwright) — liên quan cao, không cần
API key. Script tự lọc bỏ ảnh dính watermark. Các deck ở đây **dùng nội bộ** nên
không bận tâm bản quyền; nếu cần ảnh Creative Commons thì thêm `--source cc`
(Openverse + Wikimedia Commons).

Nguồn mỗi ảnh được ghi trong `topics/<slug>/public/images/credits.json`.
