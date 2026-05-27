<script setup lang="ts">
import { computed } from 'vue'
// Nạp global styles (xem ghi chú trong cover.vue). Import lặp lại an toàn — Vite dedupe.
import '../styles/base.css'
import '../styles/layouts.css'

const props = defineProps({
  // Ảnh nền tùy chọn cho slide phân mục (vd /images/section-2.jpg)
  background: { type: String, default: '' },
  // Số thứ tự phần, vd "02"
  number: { type: [String, Number], default: '' },
})

const style = computed(() =>
  props.background ? { backgroundImage: `url('${props.background}')` } : {},
)
</script>

<template>
  <div
    class="slidev-layout sharing-section"
    :class="{ 'has-bg': background }"
    :style="style"
  >
    <div class="section-scrim" />
    <div class="section-inner">
      <div v-if="number !== ''" class="section-number">{{ number }}</div>
      <div class="section-bar" />
      <div class="section-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sharing-section {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  background-size: cover;
  background-position: center;
  background-color: var(--sharing-bg-soft);
}
.sharing-section:not(.has-bg) {
  background-image:
    radial-gradient(900px 500px at 110% 50%, #cffafe 0%, transparent 55%),
    linear-gradient(135deg, #f0fdfa 0%, #f6f9fb 100%);
}
.section-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0.96) 0%,
    rgba(255, 255, 255, 0.82) 50%,
    rgba(255, 255, 255, 0.45) 100%
  );
}
.section-inner {
  position: relative;
  padding: 0 3.8rem;
  max-width: 70%;
}
.section-number {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: var(--sharing-accent);
}
.section-bar {
  width: 3.6rem;
  height: 5px;
  border-radius: 5px;
  margin: 0.6rem 0 1rem;
  background: linear-gradient(90deg, var(--sharing-accent), var(--sharing-accent-2));
}
.section-body :deep(h1) {
  font-size: 2.8rem;
  line-height: 1.1;
}
.section-body :deep(p) {
  font-size: 1.15rem;
  color: var(--sharing-fg-soft);
  max-width: 50ch;
}
</style>
