<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  background: { type: String, default: '' },
})

const style = computed(() =>
  props.background ? { backgroundImage: `url('${props.background}')` } : {},
)
</script>

<template>
  <div
    class="slidev-layout sharing-end"
    :class="{ 'has-bg': background }"
    :style="style"
  >
    <div class="end-scrim" />
    <div class="end-inner">
      <slot />
    </div>
    <div class="end-accent" />
  </div>
</template>

<style scoped>
.sharing-end {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0;
  background-size: cover;
  background-position: center;
}
.sharing-end:not(.has-bg) {
  background-image:
    radial-gradient(900px 500px at 50% 120%, #cffafe 0%, transparent 60%),
    linear-gradient(135deg, #ecfeff 0%, #f0fdfa 50%, #f6f9fb 100%);
}
.end-scrim {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.82);
}
.end-inner {
  position: relative;
  padding: 2rem;
}
.end-inner :deep(h1) {
  font-size: 3rem;
}
.end-inner :deep(p) {
  color: var(--sharing-fg-soft);
  font-size: 1.2rem;
}
.end-accent {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, var(--sharing-accent), var(--sharing-accent-2));
}
</style>
