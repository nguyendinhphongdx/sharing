---
name: make-slides
description: Tạo slide Slidev cho một buổi chia sẻ kiến thức — brainstorm & làm rõ, research web, viết brief có cấu trúc để người dùng duyệt, rồi tải ảnh và dựng slide theme sáng. Dùng khi người dùng muốn làm slide/bài thuyết trình/bài chia sẻ cho một chủ đề.
argument-hint: <mô tả chủ đề muốn chia sẻ>
---

# Tạo slide chia sẻ kiến thức

Điều phối quy trình làm slide trong repo harness này. **Bám sát thứ tự** dưới đây và
**tôn trọng cổng duyệt** ở Bước 4. Đọc `CLAUDE.md` ở gốc repo để nắm quy ước.

Chủ đề người dùng yêu cầu: **$ARGUMENTS**

## Bước 1 — Brainstorm & làm rõ

Phân tích yêu cầu rồi dùng `AskUserQuestion` để chốt những điều **làm đổi nội dung**:
- Khán giả & mức độ (mới/trung cấp/nâng cao)
- Thời lượng (→ số slide mục tiêu)
- Góc nhìn/thông điệp cốt lõi muốn nhấn, phạm vi nên/không nên đụng tới

Đặt `slug` kebab-case ngắn gọn cho chủ đề (vd `ai-llm-agent-mcp`).

## Bước 2 — Research

Giao cho subagent **topic-researcher** (qua tool Agent, `subagent_type: topic-researcher`)
với mô tả chủ đề + khán giả + góc nhìn đã chốt. Nhận lại research brief có cấu trúc.
Nếu chủ đề rộng, có thể chạy nhiều researcher song song theo từng phần.

## Bước 3 — Viết brief để duyệt

```
node scripts/new-topic.mjs <slug> --title "<Tiêu đề>" --author "<tên nếu có>"
```
Ghi kết quả research vào `topics/<slug>/brief.md` theo đúng các mục của template:
mục tiêu, outline, talking points, thuật ngữ, **gợi ý truy vấn ảnh**, nguồn.

## Bước 4 — CỔNG DUYỆT (bắt buộc)

Trình bày tóm tắt brief cho người dùng và mời họ chỉnh. **Hỏi rõ "bạn duyệt brief này
chưa?"** Lặp lại tới khi họ đồng ý. **TUYỆT ĐỐI không sang Bước 5 nếu brief chưa được
chấp nhận rõ ràng.**

## Bước 5 — Tải ảnh

Lấy truy vấn ảnh từ brief đã duyệt (mặc định nguồn `web` = Bing qua Playwright, không
cần key; dùng `--source cc` nếu deck sẽ trình bày công khai cần an toàn bản quyền):
```
node scripts/fetch-images.mjs <slug> --query "..." --query "..." --limit 8
```
**Xem lại ảnh đã tải** (Read từng file trong `public/images/`): loại ảnh dính watermark
hoặc quá rậm, giữ lại ảnh atmospheric (cho `background:`) và ảnh sơ đồ (cho `image-right`).
Cập nhật `credits.json` cho khớp ảnh đã giữ. Tải được ít → thử truy vấn khác.

## Bước 6 — Dựng slide

Giao cho subagent **slide-builder** (`subagent_type: slide-builder`) với `slug`. Nó sẽ
sinh `topics/<slug>/slides.md`: theme sáng, **ảnh nền ở cover + section đầu**, đa dạng
layout, song ngữ, và tự `npm run build -- <slug>` để kiểm tra.

## Bước 7 — Bàn giao

Báo: số slide, layout đã dùng, ảnh đã gắn, kết quả build. Hướng dẫn xem:
```
npm run dev -- <slug>           # xem trực tiếp
npm run export -- <slug>        # xuất PDF (cần playwright-chromium)
```

## Nguyên tắc

- Một chủ đề = một folder `topics/<slug>/`. Không trộn nội dung topic vào `theme/`.
- Song ngữ; theme sáng; chính xác hơn hoa mỹ — không bịa số liệu/nguồn/ảnh.
- Cổng duyệt ở Bước 4 là bất khả xâm phạm.
