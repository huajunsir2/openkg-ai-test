<template>
  <div>
    <PageHeader
      eyebrow="NEWS · 新闻动态"
      title="社区动态"
      subtitle="OpenKG 持续记录大模型时代知识工程的演进 — 包括核心项目进展、TOC 专家观点、社区活动与年度回顾。"
    />

    <section class="section">
      <div class="container">
        <div class="news-list">
          <article v-for="(n, i) in news" :key="n.title" class="news-item">
            <div class="left">
              <div class="date">{{ n.date }}</div>
              <div class="dot-line"><span class="dot" /><span class="line" v-if="i !== news.length - 1" /></div>
            </div>
            <div class="right">
              <span class="tag">{{ n.tag }}</span>
              <h3>{{ n.title }}</h3>
              <p>{{ n.summary }}</p>
              <a class="more" href="#" @click.prevent>阅读全文 →</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import { news } from '@/data/site.js'
</script>

<style lang="scss" scoped>
.news-list {
  max-width: 880px;
  margin: 0 auto;
}
.news-item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 28px;
  align-items: start;
}
.left {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 12px;
  padding-top: 24px;
}
.date {
  font-family: var(--font-mono);
  font-size: 13.5px;
  color: var(--text-muted);
  text-align: right;
  letter-spacing: 0.04em;
}
.dot-line {
  position: relative;
  height: 100%;
}
.dot {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--color-sky-400);
  box-shadow: 0 0 14px var(--color-sky-400);
  display: block;
  margin-top: 4px;
}
.line {
  position: absolute;
  left: 5px;
  top: 22px;
  width: 2px;
  height: calc(100% + 36px);
  background: linear-gradient(180deg, var(--color-border-strong), transparent);
}

.right {
  padding: 24px 26px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: rgba(8, 22, 40, 0.55);
  margin-bottom: 24px;
  transition: all 0.3s;
  &:hover {
    border-color: var(--color-border-strong);
    background: rgba(56, 189, 248, 0.05);
    transform: translateY(-2px);
  }
}
.tag {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.16em;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.12);
  color: var(--color-sky-300);
  border: 1px solid var(--color-border);
  margin-bottom: 14px;
}
h3 {
  font-size: 19px;
  margin-bottom: 10px;
  line-height: 1.4;
}
p {
  font-size: 14px;
  line-height: 1.75;
  margin-bottom: 14px;
}
.more {
  font-size: 13px;
  color: var(--color-sky-300);
  font-weight: 600;
}

@media (max-width: 700px) {
  .news-item { grid-template-columns: 1fr; gap: 8px; }
  .left { grid-template-columns: 1fr; padding-top: 0; }
  .date { text-align: left; }
  .dot-line { display: none; }
}
</style>
