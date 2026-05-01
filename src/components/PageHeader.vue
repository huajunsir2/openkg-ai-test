<template>
  <header class="page-header">
    <div class="container">
      <span class="eyebrow">{{ eyebrow }}</span>
      <h1 class="title">
        <slot name="title">{{ title }}</slot>
      </h1>
      <p class="subtitle">
        <slot name="subtitle">{{ subtitle }}</slot>
      </p>
    </div>
    <div class="header-decor" aria-hidden="true">
      <div class="halo" />
    </div>
  </header>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
.page-header {
  position: relative;
  padding: calc(var(--header-height) + 80px) 0 70px;
  text-align: center;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);
}
.eyebrow {
  display: inline-flex;
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-sky-400);
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.06);
  border: 1px solid var(--color-border);
  margin-bottom: 24px;
}
.title {
  font-size: clamp(36px, 5vw, 60px);
  letter-spacing: -0.02em;
  margin-bottom: 18px;
}
.subtitle {
  max-width: 720px;
  margin: 0 auto;
  font-size: 16.5px;
  line-height: 1.8;
  color: var(--text-secondary);
}
.header-decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
.halo {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.18), transparent 60%);
  filter: blur(40px);
}
</style>
