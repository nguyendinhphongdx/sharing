---
name: remake-slides
description: Làm lại / chỉnh / cập nhật / fix một topic slide ĐÃ CÓ — hỏi rõ cần đổi gì, rồi điều phối subagent topic-remaker (sửa nhỏ làm thẳng; đổi lớn thì viết lại brief, xin duyệt, mới dựng lại slides). Dùng khi người dùng muốn sửa một deck đã dựng, KHÔNG phải tạo topic mới.
argument-hint: <slug hoặc mô tả topic cần làm lại>
---

# Làm lại một topic có sẵn

Điều phối việc remake một deck **đã tồn tại**. Phần **hỏi người dùng** và **cổng
duyệt** do skill này (main thread) làm; phần làm việc giao subagent `topic-remaker`.
Đọc `CLAUDE.md` mục "Remake một topic có sẵn" để nắm quy ước.

Đầu vào người dùng: **$ARGUMENTS**

> Nếu người dùng muốn **tạo topic mới**, KHÔNG dùng skill này — dùng `/make-slides`.

## Bước 1 — Xác định topic

- Nếu `$ARGUMENTS` có slug rõ ràng và `topics/<slug>/slides.md` tồn tại → dùng nó.
- Nếu mơ hồ → `npm run list` rồi `AskUserQuestion` cho người dùng chọn topic.
- Nếu topic chưa có `slides.md` → báo: nên dùng `/make-slides` để dựng lần đầu.

## Bước 2 — Nắm bối cảnh deck hiện tại

Đọc nhanh `topics/<slug>/brief.md`, `slides.md`, và `research/` (nếu có) để hiểu
mạch, thông điệp, số slide, layout đang dùng. Tóm tắt ngắn cho người dùng thấy bạn
đã hiểu deck.

## Bước 3 — HỎI cần đổi gì (bắt buộc)

Dùng `AskUserQuestion` (cho phép trả lời tự do) để gom **`change_directive`** rõ ràng:
- Sửa **nội dung** phần nào? (slide/section cụ thể)
- **Bổ sung** ý gì / **bỏ** gì?
- **Vấn đề** đang nằm ở đâu? (khó hiểu, dài dòng, thiếu ví dụ, ảnh xấu, build lỗi…)
- Có **đổi lớn** không: góc nhìn, thời lượng, khán giả, pattern outline?

Đừng đoán. Nếu câu trả lời còn mơ hồ, hỏi tiếp tới khi đủ cụ thể để giao việc.

## Bước 4 — Giao `topic-remaker` (phase: auto)

Gọi subagent (`subagent_type: topic-remaker`) với `slug` + `change_directive` +
`phase: auto`. Subagent sẽ tự **sao lưu `.bak`**, phân loại **NHỎ / LỚN**:

- **NHỎ** (fix/polish/sửa bullet/đổi ảnh/thêm 1-2 slide) → nó sửa thẳng `slides.md`,
  build verify, trả kết quả. **Sang Bước 7.**
- **LỚN** (đổi góc nhìn/pattern/thời lượng/tái cấu trúc/cập nhật sâu) → nó refresh
  research (nếu cần) + viết lại `brief.md` Stage C rồi **DỪNG**, trả diff brief.

Nếu subagent báo chỉ thị chưa đủ rõ → quay lại Bước 3 hỏi thêm.

## Bước 5 — Cổng duyệt brief mới (chỉ thay đổi LỚN)

Trình diff brief (slide nào thêm/đổi/bỏ) cho người dùng. Sửa tới khi họ **duyệt rõ
ràng**. Không dựng slides trước khi được duyệt.

## Bước 6 — Tải ảnh mới (nếu cần) & dựng lại slides

- Nếu brief mới cần ảnh chưa có: `node scripts/fetch-images.mjs <slug> --query "..."`
  rồi xem lại ảnh.
- Giao `topic-remaker` lần nữa với `phase: slides` (hoặc `slide-builder`) để sinh
  `slides.md` từ brief đã duyệt; build verify.

## Bước 7 — Bàn giao

Báo: phân loại (NHỎ/LỚN), slide/nội dung đã đổi, research thêm (nếu có), đường dẫn
`.bak`, kết quả build. Hướng dẫn:
```
npm run dev -- <slug>            # xem trực tiếp
git diff topics/<slug>           # xem thay đổi
# hoàn tác: cp topics/<slug>/slides.md.bak topics/<slug>/slides.md
```

## Nguyên tắc

- Chỉ remake topic đã có; tạo mới → `/make-slides`.
- Cổng duyệt cho thay đổi LỚN là bất khả xâm phạm; thay đổi NHỎ làm thẳng.
- Luôn giữ bản cũ (`.bak`); không bịa nội dung ngoài brief/research; giữ theme sáng,
  song ngữ, `theme: ../../theme`.
