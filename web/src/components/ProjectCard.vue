<template>
  <component :is="compact ? 'router-link' : 'div'" v-bind="compact ? { to: `/projects/${project.id}` } : {}" class="project-card" :style="cardStyle">
    <div class="layer-tag">{{ project.layer }}</div>
    <div class="card-glow" />
    <div class="card-icon" aria-hidden="true">
      <ProjectGlyph :type="project.glyph" :color="project.color" />
    </div>
    <h3 class="card-title">
      <span class="card-name">{{ project.name }}</span>
      <span class="card-tagline">{{ project.tagline }}</span>
    </h3>
    <p class="card-desc">{{ project.short }}</p>
    <ul v-if="!compact" class="card-points">
      <li v-for="h in project.highlights" :key="h">
        <span class="bullet" />
        <span>{{ h }}</span>
      </li>
    </ul>
    <div class="card-keywords">
      <span v-for="k in project.keywords" :key="k" class="kw">{{ k }}</span>
    </div>
    <div class="card-footer">
      <span class="sig-tag">驱动小组：{{ project.sig }}</span>
      <router-link :to="`/projects/${project.id}`" class="card-cta">
        了解详情
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </router-link>
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import ProjectGlyph from './ProjectGlyph.vue'

const props = defineProps({
  project: { type: Object, required: true },
  compact: { type: Boolean, default: false }
})

const cardStyle = computed(() => ({
  '--accent': props.project.color
}))
</script>

<style lang="scss" scoped>
.project-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
  padding: 32px 28px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, transparent), rgba(8, 22, 40, 0.6));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  text-decoration: none;
  color: inherit;
  isolation: isolate;
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--accent) 50%, transparent);
  box-shadow: 0 25px 60px -25px color-mix(in srgb, var(--accent) 60%, transparent);
}

.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 60%, color-mix(in srgb, var(--accent) 25%, transparent));
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: -1;
}
.project-card:hover::before { opacity: 1; }

.layer-tag {
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

.card-glow {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  filter: blur(60px);
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 50%, transparent), transparent 60%);
  top: -100px;
  left: -100px;
  opacity: 0.55;
  pointer-events: none;
  z-index: -1;
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 30%, transparent);
}

.card-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.card-name {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}
.card-tagline {
  font-size: 13.5px;
  color: var(--accent);
  font-weight: 600;
  letter-spacing: 0.02em;
}

.card-desc {
  font-size: 14.5px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.card-points {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 4px 0 8px;
}
.card-points li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.6;
}
.bullet {
  flex-shrink: 0;
  width: 6px; height: 6px;
  margin-top: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

.card-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}
.kw {
  font-size: 11.5px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.06);
  border: 1px solid var(--color-border);
  color: var(--text-secondary);
}

.card-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px dashed var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sig-tag {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}
.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
}
.card-cta:hover { gap: 10px; transition: gap 0.2s; }
</style>
