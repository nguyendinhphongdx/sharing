<script setup lang="ts">
import { computed } from 'vue'
// Global styles của theme được nạp ở đây (qua layout, dùng toAtFS) để tránh bug
// resolve của virtual "conditional-styles" trên Windows. Mọi layout đều được
// Slidev eager-import lúc khởi động nên CSS này áp dụng toàn deck.
import '../styles/base.css'
import '../styles/layouts.css'

// Frontmatter của slide được truyền vào layout dưới dạng props.
const props = defineProps({
  // Ảnh nền (đường dẫn từ public, ví dụ: /images/cover.jpg)
  background: { type: String, default: '' },
})

const style = computed(() =>
  props.background ? { backgroundImage: `url('${props.background}')` } : {},
)
</script>

<template>
  <div
    class="slidev-layout sharing-cover"
    :class="{ 'has-bg': background }"
    :style="style"
  >
    <div class="cover-scrim" />
    <div class="cover-accent" />
    <div class="cover-inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.sharing-cover {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0;
  background-size: cover;
  background-position: center;
  background-color: var(--sharing-bg-soft);
}

/* Không có ảnh → gradient teal sáng làm fallback, slide vẫn đẹp */
.sharing-cover:not(.has-bg) {
  background-image:
    radial-gradient(1200px 600px at 80% -10%, #cffafe 0%, transparent 60%),
    linear-gradient(135deg, #ecfeff 0%, #f0fdfa 45%, #f6f9fb 100%);
}

/* Lớp phủ sáng để chữ tối luôn đọc rõ trên ảnh */
.cover-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.94) 0%,
    rgba(255, 255, 255, 0.78) 30%,
    rgba(255, 255, 255, 0.30) 65%,
    rgba(255, 255, 255, 0.10) 100%
  );
}

.cover-accent {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, var(--sharing-accent), var(--sharing-accent-2));
}

.cover-inner {
  position: relative;
  padding: 3.2rem 3.8rem 3.6rem;
}

.cover-inner :deep(h1) {
  font-size: 3rem;
  line-height: 1.08;
  margin-bottom: 0.5rem;
}
.cover-inner :deep(p) {
  font-size: 1.15rem;
  color: var(--sharing-fg-soft);
  max-width: 46ch;
}
.cover-inner :deep(h1 + p) {
  margin-top: 0.4rem;
}
</style>
