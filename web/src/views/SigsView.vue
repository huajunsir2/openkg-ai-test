<template>
  <div>
    <PageHeader
      eyebrow="OPENKG SIG"
      title="兴趣小组"
      subtitle="OpenKG 兴趣小组（SIG）是社区核心协作单元。每一个 SIG 都直接驱动一个核心项目，把社区的智慧组织成可持续演化的开放知识工程。"
    />

    <section class="section">
      <div class="container">
        <div class="sig-list">
          <article
            v-for="sig in sigs"
            :key="sig.id"
            class="sig-card"
            :style="{ '--accent': sig.color }"
          >
            <div class="sig-left">
              <div class="sig-name">{{ sig.name }}</div>
              <div class="sig-link">
                <router-link
                  v-if="sig.projectId"
                  :to="`/projects/${sig.projectId}`"
                  class="proj-link"
                >
                  ⮕ 驱动项目：{{ sig.project }}
                </router-link>
                <span v-else class="proj-link static">{{ sig.project }}</span>
              </div>
            </div>
            <div class="sig-right">
              <p class="sig-desc">{{ sig.desc }}</p>
              <div class="contact">
                <span class="contact-label">加入联系人</span>
                <a :href="`mailto:${sig.contact}`">{{ sig.contact }}</a>
              </div>
            </div>
          </article>
        </div>

        <div class="join-call">
          <h3>想要发起新的兴趣小组？</h3>
          <p>OpenKG 鼓励围绕大模型时代的关键技术方向发起新的 SIG。请联系 TOC 委员会获取支持。</p>
          <router-link to="/toc" class="btn btn-primary">联系 TOC →</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import { sigs } from '@/data/site.js'
</script>

<style lang="scss" scoped>
.sig-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.sig-card {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
  padding: 32px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, transparent), rgba(8, 22, 40, 0.55));
  border: 1px solid var(--color-border);
  transition: all 0.3s;
  align-items: center;
  &:hover {
    border-color: color-mix(in srgb, var(--accent) 50%, transparent);
    transform: translateY(-3px);
    box-shadow: 0 18px 40px -20px color-mix(in srgb, var(--accent) 50%, transparent);
  }
}
.sig-name {
  font-family: var(--font-mono);
  font-size: 36px;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}
.proj-link {
  font-size: 13px;
  color: var(--text-secondary);
  letter-spacing: 0.04em;
  &:hover { color: var(--color-sky-200); }
  &.static { cursor: default; }
}
.sig-desc {
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 18px;
}
.contact {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 13.5px;
}
.contact-label {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.06);
  border: 1px solid var(--color-border);
}
.contact a { color: var(--accent); font-family: var(--font-mono); font-size: 13px; }

.join-call {
  margin-top: 60px;
  text-align: center;
  padding: 50px 30px;
  border-radius: var(--radius-xl);
  border: 1px dashed var(--color-border-strong);
  background: rgba(56, 189, 248, 0.04);
  h3 { font-size: 24px; margin-bottom: 12px; }
  p { margin-bottom: 24px; }
}

@media (max-width: 800px) {
  .sig-card { grid-template-columns: 1fr; gap: 14px; }
  .sig-name { font-size: 28px; }
}
</style>
