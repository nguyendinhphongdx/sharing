---
theme: slidev-theme-sharing
title: {{TITLE}}
info: |
  {{TITLE}} — buổi chia sẻ kiến thức.
class: text-left
mdc: true
drawings:
  persist: false
---

# {{TITLE}}

Một câu mô tả ngắn gọn buổi chia sẻ.

<div class="mt-4 text-sm opacity-70">
{{AUTHOR}} · {{DATE}}
</div>

<!--
Ghi chú cho người trình bày (presenter notes) đặt trong khối HTML comment ở cuối slide.
-->

---
layout: section
number: "01"
---

# Phần 1 — Tên phần

Một dòng dẫn dắt cho phần này.

---

# Slide nội dung (layout default)

- Ý chính thứ nhất — **nhấn mạnh** điểm quan trọng
- Ý chính thứ hai
- Dùng <Tag>thuật ngữ</Tag> để gắn nhãn term tiếng Anh

<Spotlight label="Key idea" class="mt-4">
Câu chốt quan trọng nhất của slide này.
</Spotlight>

---
layout: two-cols-header
---

# Slide hai cột

::left::

**Trước đây**

- Điểm A
- Điểm B

::right::

**Bây giờ**

- Điểm A'
- Điểm B'

---
layout: image-right
image: /images/example.jpg
---

# Slide có ảnh bên phải

- Đặt ảnh minh hoạ vào `public/images/`
- Tham chiếu bằng đường dẫn tuyệt đối `/images/...`

---

# Code ví dụ

```ts
// Code block dùng theme sáng (github-light)
interface Tool {
  name: string
  description: string
  run(input: unknown): Promise<unknown>
}
```

---
layout: quote
author: "Tên tác giả"
---

Một câu trích dẫn truyền cảm hứng hoặc tóm tắt thông điệp.

---
layout: end
---

# Cảm ơn!

Hỏi đáp · {{AUTHOR}}
