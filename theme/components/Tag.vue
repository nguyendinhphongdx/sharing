<script setup lang="ts">
defineProps({
  // 'solid' | 'soft' | 'outline'
  variant: { type: String, default: 'soft' },
})
</script>

<template>
  <span class="sharing-tag" :class="`is-${variant}`">
    <slot />
  </span>
</template>

<style scoped>
.sharing-tag {
  display: inline-block;
  font-size: 0.78em;
  font-weight: 600;
  line-height: 1;
  padding: 0.32em 0.7em;
  border-radius: 999px;
  white-space: nowrap;
}
.is-soft {
  background: color-mix(in srgb, var(--sharing-accent) 13%, white);
  color: #0f766e;
}
.is-solid {
  background: var(--sharing-accent);
  color: #fff;
}
.is-outline {
  border: 1px solid var(--sharing-accent);
  color: var(--sharing-accent);
}
</style>
