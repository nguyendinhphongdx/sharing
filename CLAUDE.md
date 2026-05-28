# CLAUDE.md — Harness tạo slide chia sẻ kiến thức

Repo này là một **harness** để AI tạo slide [Slidev](https://sli.dev) cho các buổi
chia sẻ kiến thức. Mỗi chủ đề là **một folder** `topics/<slug>/`. Tất cả topic dùng
chung **local theme sáng** ở `theme/` (accent teal).

## Quy trình BẮT BUỘC (skill `/make-slides`)

Quy trình **iterative, 3 cổng duyệt**. Chi tiết đầy đủ ở
`.claude/skills/make-slides/SKILL.md` — đây là tóm tắt:

1. **Brainstorm & làm rõ** — `AskUserQuestion`: khán giả, thời lượng, góc nhìn,
   thông điệp cốt lõi, (tuỳ chọn) URL seed.
2. **Tạo skeleton** — `node scripts/new-topic.mjs <slug> --title "..."` (tạo
   `brief.md` + thư mục `research/`).
3. **Research vòng 1 (broad)** — subagent `topic-researcher` với `mode=broad` →
   ghi `topics/<slug>/research/round-1-broad.md`.
4. **Stage A — chọn outline (cổng 1)** — viết `brief.md` dạng "2-3 outline đề
   xuất (pattern khác nhau) + khuyến nghị"; người dùng chọn 1 hoặc "mix".
5. **Stage B — duyệt key points (cổng 2)** — viết `brief.md` dạng "outline đã
   chọn + key points theo từng phần". **Loop:** người dùng có thể yêu cầu
   research thêm (`topic-researcher` `mode=focused` ghi `round-N-<focus>.md`),
   sửa key points, tới khi nói "OK" rõ ràng.
6. **Stage C — brief chi tiết per-slide (cổng 3, cuối)** — viết `brief.md` chi
   tiết từng slide (title, bullets thật, layout, image hint, presenter note);
   slide-builder chỉ format, không sáng tác. Cổng duyệt cuối.
7. **Tải ảnh** — `node scripts/fetch-images.mjs <slug> --query "..."` theo
   truy vấn trong Stage C. Deck nội bộ nên không cần né bản quyền.
8. **Dựng slide** — subagent `slide-builder` map Stage C → `slides.md`.
9. **Build + verify** — `npm run build -- <slug>` (compile sạch). Slide-builder
   tự export PNG slide đầu để mắt thấy cover hiển thị đúng. PDF: `npm run
   export -- <slug>`.

## Remake một topic có sẵn (skill `/remake-slides` + subagent `topic-remaker`)

Khi người dùng muốn **làm lại / chỉnh / cập nhật / fix** một topic đã dựng (đã có
`slides.md`), KHÔNG chạy lại `/make-slides` từ đầu — dùng skill `/remake-slides`.
Nó điều phối như sau — **phần hỏi & cổng duyệt do skill (main thread) làm** vì
subagent không tương tác được:

1. **Hỏi người dùng trước** (`AskUserQuestion`): sửa nội dung gì? bổ sung ý gì?
   vấn đề nằm ở đâu? có đổi góc nhìn / thời lượng / khán giả / pattern không?
   → gom thành `change_directive` rõ ràng.
2. **Giao `topic-remaker`** (`subagent_type: topic-remaker`) với `slug` +
   `change_directive` + `phase: auto`. Subagent tự sao lưu `.bak`, phân loại
   **NHỎ / LỚN**.
   - **NHỎ** → nó sửa thẳng `slides.md`, build verify, trả kết quả. Xong.
   - **LỚN** → nó refresh research (nếu cần) + viết lại `brief.md` Stage C rồi
     **DỪNG**, trả về diff brief.
3. **Cổng duyệt (chỉ thay đổi LỚN):** trình diff brief mới cho người dùng, sửa tới
   khi họ OK.
4. **Dựng lại slides:** gọi `topic-remaker` lần nữa với `phase: slides` (hoặc giao
   `slide-builder`) để sinh `slides.md` từ brief đã duyệt; build verify.
5. Cần ảnh mới → `node scripts/fetch-images.mjs <slug> --query "..."` trước khi dựng.

Bản cũ luôn được giữ ở `slides.md.bak` / `brief.md.bak` (đã gitignore).

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

## Mẫu trình bày trực quan (HTML) — ƯU TIÊN

Ưu tiên **vẽ bằng HTML + inline style** (dùng biến CSS của theme) thay vì bullet/code-block
thuần cho nội dung cốt lõi — deck đẹp & dễ hiểu hơn hẳn. Biến CSS dùng được (định nghĩa ở
`theme/styles/base.css`): `--sharing-accent` (teal), `--sharing-accent-2` (sky),
`--sharing-fg`, `--sharing-fg-soft`, `--sharing-muted`, `--sharing-bg-soft`,
`--sharing-border`. Class UnoCSS có sẵn: `flex`, `grid grid-cols-2/3`, `gap-*`, `mt-*`,
`items-center`, `justify-center`, `flex-wrap`.

**Ba mẫu hay dùng:**

- **Timeline dọc** — cột rail gồm dot teal (có quầng `box-shadow:0 0 0 4px color-mix(in srgb,var(--sharing-accent) 16%,transparent)`)
  nối nhau bằng line `width:2px;background:var(--sharing-border)`; bên cạnh là nội dung (năm/nhãn
  in đậm teal, mô tả `--sharing-fg-soft`, dòng phụ nhỏ `--sharing-muted`). Item cuối bỏ đường nối.
- **Thẻ (cards)** — `background:var(--sharing-bg-soft)` + `border-left`/`border-top` 3–4px màu
  accent + nhãn đậm teal + mô tả muted. Dùng `grid grid-cols-2/3 gap-4` để so sánh / liệt kê.
- **Sơ đồ luồng / vòng lặp** — pill (`border` + `border-radius`) nối bằng mũi tên `→` teal;
  hộp nhấn dùng `linear-gradient(135deg,var(--sharing-accent),var(--sharing-accent-2))` +
  `box-shadow`; nhóm vòng lặp bằng khung `border:1.5px dashed var(--sharing-accent)` + nhãn `↺`.

**Quy tắc:**

- **KHÔNG** dùng code-block (` ```text `) cho ví dụ văn xuôi → chuyển thành thẻ mềm / pill màu /
  dòng "VD:" muted. CHỈ giữ code-block cho **code thật** (TS interface, JSON-RPC…).
- **Gộp, đừng lặp:** đừng vừa bullet vừa thẻ nói cùng một ý — nhồi khái niệm + ví dụ vào trong thẻ.
- **Màu:** teal = chính / giải pháp / positive; sky (`--sharing-accent-2`) = nhánh hoặc loại thứ 2
  (vd brute-force teal vs learning sky); muted/xám = giới hạn / vấn đề; hộp gradient = điểm nhấn
  (kết quả, "Transformer", "Hoàn thành").
- **Tiêu đề** ngắn, friendly, 1 dòng (giọng kể: "Khi máy bắt đầu thắng người"); câu phụ để làm
  **subtitle** (div đậm dưới H1); nhiều slide cùng một phase thì dùng chung nhãn **"Giai đoạn N"** ở title.
- **HTML block: KHÔNG để dòng trống bên trong** một khối `<div>` (CommonMark cắt khối ở dòng
  trống → vỡ render) — viết liền các thẻ con, chỉ chừa dòng trống GIỮA các khối top-level.
- **Ảnh nhúng trong HTML block phải bind `:src`**: `<img :src="'/images/x.png'" alt="..." style="...">`
  — KHÔNG dùng `src="/images/..."` tĩnh (Vite cố import → build lỗi *"resolves outside server.fs.allow"*,
  ra `D:\images`). Bind biến `:src` để Vue coi là URL public runtime. (Còn ảnh nền layout vẫn dùng
  `image:`/`background:` trong frontmatter như thường.)
- Luôn **verify bằng export PNG** từng slide vừa sửa (xem mục slide-builder); đảm bảo vừa khung,
  không tràn. Bỏ ảnh stock dính watermark / product-photo — nếu vẽ được bằng HTML thì ưu tiên vẽ.

## Cú pháp Slidev cần nhớ

- Slide phân tách bằng dòng `---`. **Headmatter** (cấu hình cả deck) là khối YAML
  đầu file; **frontmatter** mỗi slide là khối YAML ngay sau `---`.
- Headmatter của mọi topic phải có `theme: ../../theme` (đường dẫn tương đối tới
  thư mục theme dùng chung ở gốc repo). **KHÔNG** dùng `theme: slidev-theme-sharing`
  — khi đó Slidev resolve theme qua symlink node_modules và auto-import component của
  theme **không quét tới** (cụ thể `<Tag>`/`<Spotlight>` sẽ render rỗng); layouts thì
  vẫn ổn vì được import theo đường dẫn thật.
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

## Nguồn ảnh

`scripts/fetch-images.mjs` hỗ trợ nhiều nguồn (`--source`):

- `web` (mặc định) — tìm bằng trình duyệt thật (Playwright, Bing Images). Liên quan
  cao, **không cần API key**. Script tự lọc bỏ ảnh dính watermark (freepik,
  shutterstock, getty, adobe stock…); vẫn nên **xem lại ảnh** (Read file ảnh) và
  loại ảnh dính watermark/quá rậm trước khi gán.
- `cc` — chỉ ảnh Creative Commons (Openverse + Wikimedia), nếu muốn ảnh CC.

> Deck dùng **nội bộ** nên không cần bận tâm bản quyền — ưu tiên ảnh đẹp & liên quan.

Mọi ảnh ghi nguồn trong `topics/<slug>/public/images/credits.json`. Ảnh sơ đồ (kiến
trúc, thành phần…) hợp làm `image-right`; ảnh atmospheric/abstract hợp làm
`background:` cho cover/section.

## Đừng

- ❌ Sinh `slides.md` khi brief Stage C chưa được người dùng duyệt rõ ràng.
- ❌ Nhảy stage (vd: sang Stage B khi chưa chốt outline; sang C khi key points
  chưa OK). 3 cổng duyệt là bất khả xâm phạm.
- ❌ Tự "chốt" khi người dùng chưa nói OK (không có giới hạn vòng research).
- ❌ Sửa `theme/` cho nhu cầu của riêng một topic (đặc thù topic → để trong topic đó).
- ❌ Dùng nền/màu tối; phá vỡ tông sáng.
- ❌ Đặt ảnh ngoài `public/images/` rồi tham chiếu sai đường dẫn.
- ❌ Dùng `theme: slidev-theme-sharing` trong headmatter — components không
  render. Luôn dùng `theme: ../../theme`.
