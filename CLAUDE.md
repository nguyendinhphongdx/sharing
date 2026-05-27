# CLAUDE.md — Harness tạo slide chia sẻ kiến thức

Repo này là một **harness** để AI tạo slide [Slidev](https://sli.dev) cho các buổi
chia sẻ kiến thức. Mỗi chủ đề là **một folder** `topics/<slug>/`. Tất cả topic dùng
chung **local theme sáng** ở `theme/` (accent teal).

## Quy trình BẮT BUỘC (skill `/make-slides`)

Khi người dùng yêu cầu tạo slide cho một chủ đề, đi theo đúng các bước:

1. **Brainstorm & làm rõ** — dùng `AskUserQuestion` để chốt: khán giả, mức độ,
   thời lượng, góc nhìn/thông điệp cốt lõi. Đừng đoán nếu câu trả lời đổi nội dung.
2. **Research** — giao cho subagent `topic-researcher` (tìm bài viết uy tín, trích
   điểm chính, gợi ý truy vấn ảnh). Trả về một brief có cấu trúc + nguồn.
3. **Viết `topics/<slug>/brief.md`** — outline rõ ràng theo template, kèm nguồn và
   gợi ý ảnh. Tạo topic bằng `node scripts/new-topic.mjs <slug>`.
4. **DỪNG — chờ người dùng duyệt brief.** Đây là **cổng bắt buộc**. Chỉnh sửa tới
   khi họ đồng ý. **Tuyệt đối không sinh `slides.md` trước khi brief được chấp nhận.**
5. **Tải ảnh** — `node scripts/fetch-images.mjs <slug> --query "..." --query "..."`
   (lấy truy vấn từ brief). Ảnh về `topics/<slug>/public/images/` + `credits.json`.
6. **Dựng slide** — giao cho subagent `slide-builder` (hoặc tự làm) sinh `slides.md`
   từ brief đã duyệt: theme sáng, **ảnh nền ở cover + vài slide section đầu**, đa dạng
   layout.
7. **Kiểm tra** — `npm run build -- <slug>` để chắc chắn compile được; báo kết quả.
   Export PDF nếu được yêu cầu (`npm run export -- <slug>`).

## Lệnh

```powershell
npm install                        # 1 lần
npm run list                       # liệt kê topic
node scripts/new-topic.mjs <slug> --title "..." --author "..."
node scripts/fetch-images.mjs <slug> --query "..." [--query "..."] [--source web|cc] [--limit 6]
npm run dev -- <slug>              # dev server
npm run build -- <slug>            # build -> dist/
npm run export -- <slug>          # PDF (cần playwright-chromium)
```

## Quy ước nội dung

- **Song ngữ:** giữ thuật ngữ kỹ thuật bằng **tiếng Anh** (RAG, embedding, tool
  calling...), diễn giải/trình bày bằng **tiếng Việt**. Tiêu đề slide ngắn gọn.
- **Theme sáng** — không dùng nền tối, không tự đặt màu chữ tối/đen nền đen.
- Mỗi ý một dòng; ưu tiên gạch đầu dòng ngắn hơn đoạn văn dài. Tối đa ~6 bullet/slide.
- Dùng `<Tag>` cho nhãn term, `<Spotlight>` cho câu chốt quan trọng.

## Cú pháp Slidev cần nhớ

- Slide phân tách bằng dòng `---`. **Headmatter** (cấu hình cả deck) là khối YAML
  đầu file; **frontmatter** mỗi slide là khối YAML ngay sau `---`.
- Headmatter của mọi topic phải có `theme: slidev-theme-sharing` (theme dùng chung,
  đã link vào `node_modules` qua npm workspaces). **KHÔNG** dùng `theme: ../../theme`.
- Ảnh đặt ở `topics/<slug>/public/images/`, tham chiếu **đường dẫn tuyệt đối**
  `/images/<file>` (KHÔNG dùng `./public/...`).

> ⚠️ **Lưu ý Windows (quan trọng):** Slidev dev/export resolve sai khi có file
> `styles/index.*`, `style.*`, `setup/*`, hay `global*.vue` ở thư mục topic **hoặc**
> ở gốc theme (bug virtual `conditional-styles`/`setup` khi entry nằm trong subfolder).
> Vì vậy: **đừng tạo** các file đó trong `topics/<slug>/` hay `theme/`. Global CSS được
> nạp qua layout của theme (`theme/layouts/cover.vue` & `section.vue` `import` CSS) —
> dùng `toAtFS` nên an toàn. Cần thêm style chung thì sửa `theme/styles/*.css` (được
> import sẵn từ layout), không thêm `styles/index.ts`.

### Các layout dùng được

| `layout:` | Dùng khi | Frontmatter |
|-----------|----------|-------------|
| `cover` | Slide tiêu đề mở đầu | `background: /images/xx.jpg` (nền ảnh + overlay sáng) |
| `section` | Slide phân mục | `number: "02"`, `background: /images/xx.jpg` (tùy chọn) |
| `default` | Slide nội dung thường | — |
| `two-cols` / `two-cols-header` | So sánh 2 cột | dùng `::left::` `::right::` (và `::title::` cho header) |
| `image-left` / `image-right` | Nội dung + ảnh | `image: /images/xx.jpg`, `class:` |
| `quote` | Trích dẫn | `author: "..."` |
| `center` | Câu khẳng định lớn | — |
| `end` | Slide cảm ơn/Q&A | `background:` (tùy chọn) |

> **Ảnh nền:** ít nhất `cover` và 1–2 `section` đầu nên có `background:` trỏ tới ảnh
> đã tải. Layout đã có overlay sáng để chữ tối luôn đọc rõ. Nếu không có ảnh phù hợp,
> bỏ `background:` — theme tự đổ gradient teal.

### Ví dụ slide

```md
---
layout: cover
background: /images/01-ai.jpg
---

# Tiêu đề buổi chia sẻ

Một câu mô tả ngắn.

---
layout: section
number: "01"
---

# Phần 1 — Bối cảnh

---

# Nội dung

- Ý chính với <Tag>term</Tag>

<Spotlight label="Key idea">Câu chốt.</Spotlight>
```

## Nguồn ảnh & bản quyền

`scripts/fetch-images.mjs` hỗ trợ nhiều nguồn (`--source`):

- `web` (mặc định) — tìm bằng trình duyệt thật (Playwright, Bing Images). Liên quan
  cao, **không cần API key**, **nhưng bản quyền hỗn hợp** → hợp dùng **nội bộ**. Script
  tự lọc bỏ ảnh dính watermark (freepik, shutterstock, getty, adobe stock…); vẫn nên
  **xem lại ảnh** (Read file ảnh) và loại ảnh dính watermark/quá rậm trước khi gán.
- `cc` — chỉ ảnh Creative Commons (Openverse + Wikimedia), **an toàn bản quyền** cho
  trình bày công khai, nhưng ít ảnh cho chủ đề mới/hẹp.

Mọi ảnh ghi nguồn/license trong `topics/<slug>/public/images/credits.json`. Nên thêm
1 slide "Nguồn ảnh" cuối deck. Ảnh sơ đồ (kiến trúc, thành phần…) hợp làm `image-right`;
ảnh atmospheric/abstract hợp làm `background:` cho cover/section.

## Đừng

- ❌ Sinh `slides.md` khi brief chưa được người dùng duyệt.
- ❌ Sửa `theme/` cho nhu cầu của riêng một topic (đặc thù topic → để trong topic đó).
- ❌ Dùng nền/màu tối; phá vỡ tông sáng.
- ❌ Đặt ảnh ngoài `public/images/` rồi tham chiếu sai đường dẫn.
