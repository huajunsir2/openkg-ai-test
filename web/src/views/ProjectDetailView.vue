<template>
  <div v-if="project" class="project-detail" :style="{ '--accent': project.color }">
    <header class="detail-hero">
      <div class="container">
        <router-link to="/projects" class="back">← 返回核心项目</router-link>
        <div class="detail-grid">
          <div>
            <span class="layer-pill">{{ project.layer }} · {{ project.sig }}</span>
            <h1>{{ project.name }}</h1>
            <p class="tagline">{{ project.tagline }}</p>
            <p class="lead">{{ project.short }}</p>
            <div class="actions">
              <a class="btn btn-primary" :href="project.link" target="_blank" rel="noreferrer">
                访问项目主页
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>
              </a>
              <router-link class="btn btn-ghost" to="/sigs">加入 {{ project.sig }} →</router-link>
            </div>
          </div>
          <div class="hero-icon">
            <ProjectGlyph :type="project.glyph" :color="project.color" />
            <div class="hero-icon-glow" />
          </div>
        </div>
      </div>
    </header>

    <section class="section">
      <div class="container content-grid">
        <div>
          <h2 class="section-h">核心能力</h2>
          <ul class="feature-list">
            <li v-for="(h, i) in project.highlights" :key="h">
              <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="txt">{{ h }}</span>
            </li>
          </ul>

          <h2 class="section-h" style="margin-top: 50px">关键词</h2>
          <div class="keywords">
            <span v-for="k in project.keywords" :key="k">{{ k }}</span>
          </div>
        </div>

        <aside class="meta-card">
          <h3>项目档案</h3>
          <dl>
            <div><dt>所属层</dt><dd>{{ project.layer }}</dd></div>
            <div><dt>驱动小组</dt><dd>{{ project.sig }}</dd></div>
            <div><dt>定位</dt><dd>{{ project.tagline }}</dd></div>
            <div>
              <dt>资源链接</dt>
              <dd><a :href="project.link" target="_blank" rel="noreferrer">{{ project.link }}</a></dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>

    <section class="section other">
      <div class="container">
        <h2 class="section-h center">探索其它核心项目</h2>
        <div class="other-grid">
          <ProjectCard v-for="p in others" :key="p.id" :project="p" compact />
        </div>
      </div>
    </section>
  </div>
  <div v-else class="not-found container">
    <h1>项目未找到</h1>
    <router-link to="/projects" class="btn btn-primary">返回项目列表</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { coreProjects } from '@/data/site.js'
import ProjectGlyph from '@/components/ProjectGlyph.vue'
import ProjectCard from '@/components/ProjectCard.vue'

const route = useRoute()
const project = computed(() => coreProjects.find((p) => p.id === route.params.id))
const others = computed(() => coreProjects.filter((p) => p.id !== route.params.id))
</script>

<style lang="scss" scoped>
.detail-hero {
  position: relative;
  padding: calc(var(--header-height) + 60px) 0 60px;
  border-bottom: 1px solid var(--color-border);
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 12%, transparent), transparent);
}
.back {
  font-size: 13px;
  color: var(--text-muted);
  display: inline-block;
  margin-bottom: 28px;
  letter-spacing: 0.04em;
  &:hover { color: var(--color-sky-200); }
}
.detail-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 40px;
  align-items: center;
}
.layer-pill {
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  display: inline-block;
  margin-bottom: 18px;
  font-weight: 600;
}
h1 {
  font-size: clamp(40px, 6vw, 64px);
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}
.tagline {
  font-size: 18px;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 18px;
}
.lead {
  font-size: 16px;
  line-height: 1.85;
  margin-bottom: 30px;
}
.actions { display: flex; gap: 14px; flex-wrap: wrap; }

.hero-icon {
  position: relative;
  display: grid;
  place-items: center;
  height: 280px;
  svg { width: 160px; height: 160px; position: relative; z-index: 1; }
}
.hero-icon-glow {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 60%, transparent), transparent 60%);
  filter: blur(40px);
}

.content-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 50px;
  align-items: start;
}
.section-h {
  font-size: 24px;
  margin-bottom: 24px;
  padding-left: 14px;
  border-left: 3px solid var(--accent);
  &.center { text-align: center; padding-left: 0; border-left: none; margin-bottom: 40px; }
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  li {
    display: grid;
    grid-template-columns: 60px 1fr;
    align-items: center;
    gap: 16px;
    padding: 18px 22px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: rgba(8, 22, 40, 0.5);
    transition: all 0.25s;
    &:hover {
      transform: translateX(6px);
      border-color: color-mix(in srgb, var(--accent) 50%, transparent);
    }
  }
  .num {
    font-family: var(--font-mono);
    font-size: 22px;
    color: var(--accent);
    font-weight: 800;
  }
  .txt {
    font-size: 15px;
    line-height: 1.6;
    color: var(--text-secondary);
  }
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  span {
    padding: 8px 16px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
    color: var(--color-sky-100);
    font-size: 13px;
    font-weight: 500;
  }
}

.meta-card {
  padding: 28px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, transparent), rgba(8, 22, 40, 0.6));
  position: sticky;
  top: calc(var(--header-height) + 20px);

  h3 {
    font-size: 16px;
    color: var(--color-sky-200);
    margin-bottom: 18px;
    letter-spacing: 0.06em;
  }
  dl {
    display: flex;
    flex-direction: column;
    gap: 14px;
    div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-bottom: 14px;
      border-bottom: 1px dashed var(--color-border);
      &:last-child { border-bottom: none; }
    }
    dt {
      font-size: 11px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--text-muted);
    }
    dd {
      font-size: 14px;
      color: var(--text-primary);
      word-break: break-all;
    }
    a { color: var(--accent); }
  }
}

.other { padding-top: 0; }
.other-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.not-found {
  padding: 200px 24px;
  text-align: center;
  h1 { margin-bottom: 24px; }
}

@media (max-width: 1000px) {
  .detail-grid, .content-grid { grid-template-columns: 1fr; }
  .other-grid { grid-template-columns: 1fr; }
  .meta-card { position: static; }
  .hero-icon { height: 220px; }
}
</style>
