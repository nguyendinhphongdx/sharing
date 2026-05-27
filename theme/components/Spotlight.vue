<script setup lang="ts">
defineProps({
  // Nhãn nhỏ phía trên (vd "Key idea", "Lưu ý")
  label: { type: String, default: '' },
  // 'accent' | 'neutral'
  tone: { type: String, default: 'accent' },
})
</script>

<template>
  <div class="sharing-spotlight" :class="`tone-${tone}`">
    <div v-if="label" class="spotlight-label">{{ label }}</div>
    <div class="spotlight-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.sharing-spotlight {
  border-radius: 12px;
  padding: 1rem 1.2rem;
  background: var(--sharing-bg-soft);
  border: 1px solid var(--sharing-border);
}
.tone-accent {
  border-left: 4px solid var(--sharing-accent);
  background: color-mix(in srgb, var(--sharing-accent) 6%, white);
}
.spotlight-label {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sharing-accent);
  margin-bottom: 0.35rem;
}
.spotlight-body :deep(p) { margin: 0.2rem 0; }
.spotlight-body :deep(p:last-child) { margin-bottom: 0; }
</style>
