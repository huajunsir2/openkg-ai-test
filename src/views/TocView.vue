<template>
  <div>
    <PageHeader
      eyebrow="OPENKG TOC"
      title="技术监督委员会"
      subtitle="OpenKG TOC（Technical Oversight Committee）是 OpenKG 官方技术治理机构，由社区核心发起人组成，为 OpenKG 提供技术指导、技术监督和宣传布道，帮助 OpenKG 规范化管理与运行。"
    />

    <section class="section">
      <div class="container">
        <h2 class="block-title">五人管理委员会</h2>
        <p class="block-subtitle">由陈华钧教授牵头，漆桂林、王昊奋、胡伟、陈文亮共同组成的核心管理组，统筹 OpenKG 在大模型时代的整体战略与技术方向。</p>

        <div class="lead-row">
          <article class="lead-card lead-primary" :style="{ '--accent': lead.accent }">
            <div class="lead-glow" />
            <span class="badge">{{ lead.badge }}</span>
            <div class="avatar">{{ lead.name[0] }}</div>
            <h3>{{ lead.name }}</h3>
            <div class="role">{{ lead.role }}</div>
            <div class="org">{{ lead.org }}</div>
            <p>{{ lead.bio }}</p>
          </article>

          <div class="lead-others">
            <article
              v-for="member in others"
              :key="member.name"
              class="lead-card"
              :style="{ '--accent': member.accent }"
            >
              <div class="avatar small">{{ member.name[0] }}</div>
              <h4>{{ member.name }}</h4>
              <div class="role small">{{ member.role }}</div>
              <div class="org small">{{ member.org }}</div>
              <p>{{ member.bio }}</p>
            </article>
          </div>
        </div>

        <h2 class="block-title" style="margin-top: 90px">轮值主席机制</h2>
        <p class="block-subtitle">OpenKG 采用 TOC 轮值主席机制，由管理委员会成员轮值担任主席，统筹年度工作并对外代表 OpenKG。</p>
        <div class="rotation">
          <div v-for="(r, i) in rotation" :key="i" class="rot-item" :style="{ '--accent': r.accent }">
            <div class="rot-year">{{ r.year }}</div>
            <div class="rot-name">{{ r.name }}</div>
            <div class="rot-org">{{ r.org }}</div>
          </div>
        </div>

        <h2 class="block-title" style="margin-top: 90px">TOC 工作机制</h2>
        <div class="mech-grid">
          <div class="mech">
            <div class="mech-num">01</div>
            <h4>技术指导</h4>
            <p>为各 SIG 提供方向性技术指导，识别大模型时代知识工程的关键问题。</p>
          </div>
          <div class="mech">
            <div class="mech-num">02</div>
            <h4>技术监督</h4>
            <p>对核心项目进行技术评审与质量把关，确保 OpenKG 输出的标准与规范性。</p>
          </div>
          <div class="mech">
            <div class="mech-num">03</div>
            <h4>宣传布道</h4>
            <p>通过 TOC 专家谈、年度回顾等方式，发出社区在大模型时代的权威声音。</p>
          </div>
          <div class="mech">
            <div class="mech-num">04</div>
            <h4>规范化运行</h4>
            <p>建立 OpenKG 社区的治理规范、评审流程与开放协作机制。</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import { founders } from '@/data/site.js'

const lead = computed(() => founders[0])
const others = computed(() => founders.slice(1))

const rotation = [
  { year: '2023', name: '陈华钧', org: '浙江大学', accent: '#38bdf8' },
  { year: '2024', name: '漆桂林', org: '东南大学', accent: '#22d3ee' },
  { year: '2025', name: '王昊奋', org: '同济大学', accent: '#60a5fa' },
  { year: '2026', name: '胡伟', org: '南京大学', accent: '#818cf8' }
]
</script>

<style lang="scss" scoped>
.block-title {
  text-align: center;
  font-size: clamp(26px, 3vw, 36px);
  margin-bottom: 14px;
}
.block-subtitle {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 50px;
  font-size: 15.5px;
}

.lead-row {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 24px;
}

.lead-card {
  position: relative;
  padding: 32px 28px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 14%, transparent), rgba(8, 22, 40, 0.6));
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--accent) 50%, transparent);
  }
  h3 { font-size: 26px; margin-bottom: 6px; }
  h4 { font-size: 19px; margin-bottom: 6px; }
  p {
    font-size: 13.5px;
    line-height: 1.75;
    color: var(--text-secondary);
    margin-top: 14px;
  }
}

.lead-glow {
  position: absolute;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 40%, transparent), transparent 60%);
  filter: blur(60px);
  top: -150px; right: -100px;
  pointer-events: none;
}

.lead-primary {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.badge {
  position: absolute;
  top: 22px;
  right: 22px;
  font-size: 11px;
  letter-spacing: 0.18em;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 999px;
  background: var(--gradient-hero);
  color: #fff;
}

.avatar {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 30%, transparent), color-mix(in srgb, var(--accent) 60%, transparent));
  border: 2px solid color-mix(in srgb, var(--accent) 60%, transparent);
  color: #fff;
  margin-bottom: 18px;
  box-shadow: 0 0 30px color-mix(in srgb, var(--accent) 40%, transparent);
}
.avatar.small { width: 56px; height: 56px; font-size: 22px; margin-bottom: 14px; }

.role {
  color: var(--accent);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  &.small { font-size: 12.5px; }
}
.org {
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  &.small { font-size: 12px; }
}

.lead-others {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.rotation {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  position: relative;
}
.rot-item {
  padding: 26px 22px;
  border-radius: var(--radius-md);
  background: rgba(8, 22, 40, 0.5);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--accent);
  transition: all 0.3s;
  &:hover { transform: translateY(-3px); background: color-mix(in srgb, var(--accent) 8%, rgba(8, 22, 40, 0.5)); }
}
.rot-year {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--accent);
  letter-spacing: 0.16em;
  margin-bottom: 8px;
}
.rot-name {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}
.rot-org { font-size: 13px; color: var(--text-muted); }

.mech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.mech {
  padding: 26px 22px;
  border-radius: var(--radius-md);
  background: rgba(8, 22, 40, 0.5);
  border: 1px solid var(--color-border);
  transition: all 0.3s;
  &:hover { border-color: var(--color-border-strong); transform: translateY(-3px); }
  .mech-num {
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--color-sky-400);
    letter-spacing: 0.16em;
    margin-bottom: 12px;
  }
  h4 { font-size: 17px; margin-bottom: 8px; color: var(--color-sky-100); }
  p { font-size: 13.5px; line-height: 1.7; }
}

@media (max-width: 1000px) {
  .lead-row { grid-template-columns: 1fr; }
  .lead-others { grid-template-columns: repeat(2, 1fr); }
  .rotation, .mech-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .lead-others, .rotation, .mech-grid { grid-template-columns: 1fr; }
}
</style>
