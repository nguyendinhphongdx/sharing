---
name: make-slides
description: Tạo slide Slidev cho một buổi chia sẻ kiến thức — brainstorm, research nhiều vòng, đề xuất outline để chọn, viết key points để duyệt, viết brief chi tiết để duyệt, rồi tải ảnh và dựng slide theme sáng. Dùng khi người dùng muốn làm slide/bài thuyết trình/bài chia sẻ cho một chủ đề.
argument-hint: <mô tả chủ đề muốn chia sẻ>
---

# Tạo slide chia sẻ kiến thức

Điều phối quy trình. **Bám sát thứ tự**, **tôn trọng các cổng duyệt** ở Stage A/B/C.
Đọc `CLAUDE.md` ở gốc repo để nắm quy ước theme/component.

Chủ đề người dùng yêu cầu: **$ARGUMENTS**

## Bước 1 — Brainstorm & làm rõ

Phân tích yêu cầu rồi dùng `AskUserQuestion` để chốt những điều **làm đổi nội dung**:
- Khán giả & mức độ (mới / trung cấp / nâng cao)
- Thời lượng (→ số slide mục tiêu; ~1.5-2 phút/slide)
- Góc nhìn / thông điệp cốt lõi muốn nhấn; phạm vi nên / không nên đụng tới
- (Tùy chọn) URL/tài liệu seed người dùng đã có

Đặt `slug` kebab-case ngắn gọn (vd `ai-llm-agent-mcp`).

## Bước 2 — Tạo topic skeleton

```
node scripts/new-topic.mjs <slug> --title "<Tiêu đề>" --author "<tên nếu có>"
```
Tạo thêm thư mục `topics/<slug>/research/` (script đã tạo sẵn).

## Bước 3 — Research vòng 1 (broad)

Gọi subagent **topic-researcher** với:
- `subagent_type: topic-researcher`
- prompt: `mode=broad`, slug, mô tả chủ đề + khán giả + góc nhìn từ Bước 1

Agent ghi `topics/<slug>/research/round-1-broad.md` + cập nhật `sources.json`,
trả về tóm tắt + danh sách "chỗ còn mù mờ".

## Bước 4 — Stage A: đề xuất outline (cổng 1)

Đọc `round-1-broad.md`. **Think** theo các pattern outline (xem cuối file) và
chọn 2-3 pattern hợp nhất với chủ đề + khán giả + góc nhìn. Viết
`topics/<slug>/brief.md` dạng Stage A:

```markdown
# Brief: <Tiêu đề>  ·  Stage A — chọn outline

> File này đang ở **Stage A**: 2-3 outline đề xuất để bạn chọn 1.

- **Khán giả / thời lượng / góc nhìn**: ... (chốt ở Bước 1)
- **Tóm tắt research** (3-5 câu): ...

## Outline đề xuất

### Phương án 1 — <Pattern> · <Tên ngắn>
- **Khi nào hợp:** ...
- **Mạch:**
  1. <Phần> — <ý chính 1 dòng>
  2. ...
- **Ưu / nhược:** ...

### Phương án 2 — ...
### Phương án 3 — ...

## Khuyến nghị
Tôi nghiêng về **Phương án X** vì ... (lý do bám audience/thời lượng/góc nhìn).
```

Dùng `AskUserQuestion` để hỏi người dùng chọn phương án, hoặc trả lời "mix 1+3"
hoặc "làm lại với pattern khác". **Không sang Stage B** cho tới khi chọn được 1.

## Bước 5 — Stage B: key points + lặp research (cổng 2)

Sau khi chốt outline, viết lại `brief.md` thành Stage B:

```markdown
# Brief: <Tiêu đề>  ·  Stage B — key points

- **Outline đã chọn:** Phương án X (<lý do>)
- **Mạch:** (copy từ Stage A, có thể chỉnh)
  1. ...
  2. ...

## Key points theo từng phần

### 1. <Phần 1>
- <Key point 1> — <số liệu / ví dụ cụ thể nếu có, có thể trích claim từ research>
- <Key point 2> — ...
- ...

### 2. <Phần 2>
...
```

Trình bày tóm tắt + `AskUserQuestion` đại loại:
- "OK, sang Stage C viết brief chi tiết?"
- "Hay cần research thêm về <chủ đề>?"
- "Hay sửa key points nào?"

**Loop:**
- Nếu người dùng yêu cầu research thêm → gọi `topic-researcher` với
  `mode=focused`, `focus=<câu hỏi cụ thể>`. Agent ghi `round-N-<focus>.md`.
  Cập nhật key points → hỏi lại.
- Nếu sửa key points trực tiếp → cập nhật → hỏi lại.
- Chỉ sang Stage C **khi người dùng OK rõ ràng**. Không tự chốt sau N vòng.

## Bước 6 — Stage C: brief chi tiết per-slide (cổng 3 — cổng cuối)

Viết lại `brief.md` thành Stage C — **gần như draft slide**, slide-builder chỉ
format + chọn layout + gắn ảnh.

```markdown
# Brief: <Tiêu đề>  ·  Stage C — chi tiết per-slide

- **Outline:** Phương án X
- **Tổng slide dự kiến:** ~N
- **Mạch chính:** ...

## Slide 1 — Cover
- **Layout:** cover
- **Tiêu đề:** <H1 chính xác>
- **Subtitle:** <1 câu>
- **Background hint:** `<query ảnh>` (atmospheric/abstract hợp cover)
- **Presenter note:** <hook mở đầu 1-2 câu>

## Slide 2 — Hành trình hôm nay
- **Layout:** default
- **Tiêu đề:** ...
- **Bullets** (đúng thứ tự sẽ lên slide):
  - **Phần 1** — ...
  - **Phần 2** — ...
  - **Phần 3** — ...
- **Component nhấn:** `<Spotlight label="Thông điệp cốt lõi">...</Spotlight>`
- **Presenter note:** ...

## Slide 3 — Phần 1 — <Tên phần>
- **Layout:** section
- **Number:** "01"
- **Tiêu đề:** ...
- **Background hint:** `<query ảnh>` (nếu có)

## Slide 4 — ...
- **Layout:** default | two-cols-header | image-right | quote
- **Tiêu đề:** ...
- **Bullets:** (nội dung thật, viết sẵn, có **bold** + `<Tag>term</Tag>` đã đặt)
- **Code/Mermaid (nếu có):** đặt nguyên block sẽ lên slide
- **Image hint:** `/images/<slug>.jpg` hoặc query nếu chưa có
- **Presenter note:** ...

...

## Slide cuối — Kết / Cảm ơn
- **Layout:** end
- **Nội dung:** ...

## Truy vấn ảnh cần tải (gộp lại)

- `<query 1>`  → dùng cho slide A, B
- `<query 2>`  → ...

## Nguồn tham khảo (lọc từ research/, đẹp + đáng tin)

1. <tiêu đề> — <url>
```

Trình bày + `AskUserQuestion`: "Duyệt brief để dựng slide chưa?" Lặp tới khi OK.

## Bước 7 — Tải ảnh

Lấy truy vấn ảnh từ Stage C. Mặc định `web` (Bing). Deck nội bộ nên không bận
tâm bản quyền:
```
node scripts/fetch-images.mjs <slug> --query "..." --query "..." --limit 8
```
**Xem lại ảnh** (Read từng file): loại watermark / quá rậm. Ghi nhận file nào
hợp `background:` (atmospheric), file nào hợp `image-right` (sơ đồ).

## Bước 8 — Dựng slide

Giao **slide-builder** (`subagent_type: slide-builder`) với `slug`. Nó sẽ:
- Đọc Stage C brief làm chân lý nội dung
- Map mỗi mục "Slide N" thành slide Slidev (layout đã được chỉ định)
- Gắn ảnh đã tải theo image hint
- Build kiểm tra

## Bước 9 — Bàn giao

Báo: số slide, layout đã dùng, ảnh đã gắn, kết quả build. Hướng dẫn:
```
npm run dev -- <slug>     # xem trực tiếp
npm run export -- <slug>  # xuất PDF
```

---

## Pattern outline để tham khảo (chọn 2-3 cho Stage A)

| Pattern | Khi nào hợp |
|---|---|
| **Evolution / Journey** | "A → B → C → D", mỗi nấc phá giới hạn nấc trước. Hợp lịch sử/tiến hoá kỹ thuật. |
| **Problem → Solution** | Bối cảnh đau → cách hiện tại không đủ → giải pháp → đánh đổi. Hợp giới thiệu tool/framework mới. |
| **Anatomy / Deep-dive** | "X là gì → thành phần → từng phần → phối hợp → demo". Hợp giải thích một hệ thống cụ thể. |
| **Compare & Choose** | Vài tùy chọn → tiêu chí → so sánh có số → khi nào chọn cái nào. Hợp "DB nào", "framework nào". |
| **Pattern catalog** | 5-7 pattern/recipe + ví dụ + khi nào dùng. Hợp "best practices". |
| **Case study** | 1 case thật: bối cảnh → quyết định → kết quả → bài học → áp dụng. Hợp post-mortem / kinh nghiệm. |

Nếu chủ đề không hợp pattern nào trên, được phép đề xuất pattern khác — miễn là
**có lý do** và viết rõ ở Phương án.

## Nguyên tắc xuyên suốt

- Một chủ đề = một folder `topics/<slug>/`. Không trộn nội dung topic vào `theme/`.
- Song ngữ; theme sáng; chính xác hơn hoa mỹ — không bịa số liệu/nguồn/ảnh.
- **3 cổng duyệt** là bất khả xâm phạm: chọn outline (Stage A), OK key points
  (Stage B), duyệt brief chi tiết (Stage C). Không nhảy bước, không tự chốt khi
  người dùng chưa rõ ràng.
- Research có thể chạy nhiều lần (focused) sau Stage A nếu Stage B cần bổ sung.
