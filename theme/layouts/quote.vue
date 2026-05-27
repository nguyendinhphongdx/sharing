<script setup lang="ts">
const props = defineProps({
  // Tên người được trích dẫn (tùy chọn)
  author: { type: String, default: '' },
})
</script>

<template>
  <div class="slidev-layout sharing-quote">
    <div class="quote-mark">&ldquo;</div>
    <div class="quote-body">
      <slot />
    </div>
    <div v-if="author || $slots.author" class="quote-author">
      <span class="quote-dash">—</span>
      <slot name="author">{{ author }}</slot>
    </div>
  </div>
</template>

<style scoped>
.sharing-quote {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--sharing-bg-soft);
  padding: 3rem 5rem;
}
.quote-mark {
  font-family: Georgia, serif;
  font-size: 5rem;
  line-height: 0.6;
  color: var(--sharing-accent);
  opacity: 0.55;
  margin-bottom: 0.5rem;
}
.quote-body :deep(p),
.quote-body :deep(h1) {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--sharing-fg);
  max-width: 60ch;
}
.quote-author {
  margin-top: 1.4rem;
  font-size: 1.1rem;
  color: var(--sharing-muted);
}
.quote-dash { color: var(--sharing-accent); margin-right: 0.4rem; }
</style>
