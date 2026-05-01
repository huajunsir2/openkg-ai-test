<template>
  <div>
    <PageHeader
      eyebrow="ABOUT OPENKG"
      title="关于我们"
    >
      <template #subtitle>
        OpenKG（开放知识图谱）是一个非盈利、中立的学术开放技术社区，由
        <strong>中国中文信息学会语言与知识计算专业委员会</strong>
        于 2015 年发起。<br />
        我们致力于在通用人工智能时代，重构人类知识的表示与组织逻辑。
      </template>
    </PageHeader>

    <!-- Mission -->
    <section class="section">
      <div class="container mission-grid">
        <div>
          <span class="section-eyebrow">MISSION · 我们的使命</span>
          <h2>
            促进以中文为核心的<br />
            <span class="gradient-text">知识图谱开放、互联与众包</span>
          </h2>
        </div>
        <div class="mission-text">
          <p>
            OpenKG 旨在促进以中文为核心的知识图谱数据的开放、互联与众包，
            以及知识图谱工具、模型和平台的开源开放，
            探索<strong>开放知识图谱与大语言模型融合</strong>的通用人工智能路径。
          </p>
          <p>
            进入大模型时代，我们重新审视知识工程的本质：
            <strong>智能的本质是知识</strong>。OpenKG 把整个社区从“开放资源库”转化为
            以核心项目驱动的关键技术栈，全面拥抱大模型带来的范式变化。
          </p>
          <div class="quote">
            <span class="quote-mark">"</span>
            <p>开放促进互联，链接创造价值。</p>
            <span class="quote-author">— OpenKG Slogan</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision -->
    <section class="section vision-section">
      <div class="container">
        <div class="vision-card">
          <span class="section-eyebrow">VISION · 我们的愿景</span>
          <h2>在 AGI 时代<br />重构<span class="gradient-text">人类知识的表示与组织逻辑</span></h2>
          <p>
            知识图谱与大模型，是人类表示与处理知识的两种互补范式。
            OpenKG 相信：参数化知识与符号化知识的深度融合，
            必将为人工智能提供更全面、可靠、可控、可解释的知识处理方法，
            最终推动通用人工智能的实现。
          </p>
        </div>
      </div>
    </section>

    <!-- Founders -->
    <section class="section founders-section">
      <div class="container">
        <div class="text-center">
          <span class="section-eyebrow">FOUNDERS · 发起人 / 管理委员会</span>
          <h2 class="section-title">由<span class="gradient-text">陈华钧教授</span>领衔的五人管理组</h2>
          <p class="section-subtitle">陈华钧、漆桂林、王昊奋、胡伟、陈文亮，共同组成 OpenKG 的核心管理委员会，统筹大模型时代的整体战略。</p>
        </div>

        <div class="founder-grid">
          <article
            v-for="(f, i) in founders"
            :key="f.name"
            :class="['founder-card', { lead: i === 0 }]"
            :style="{ '--accent': f.accent }"
          >
            <span v-if="f.badge" class="lead-badge">{{ f.badge }}</span>
            <div class="founder-avatar">{{ f.name[0] }}</div>
            <h3>{{ f.name }}</h3>
            <div class="role">{{ f.role }}</div>
            <div class="org">{{ f.org }}</div>
            <p>{{ f.bio }}</p>
          </article>
        </div>

        <div class="cta-row">
          <router-link to="/toc" class="btn btn-ghost">了解 TOC 工作机制 →</router-link>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section timeline-section">
      <div class="container">
        <div class="text-center">
          <span class="section-eyebrow">JOURNEY · 我们的旅程</span>
          <h2 class="section-title">从 2015 到 <span class="gradient-text">AGI 时代</span></h2>
          <p class="section-subtitle">十余年持续运营，OpenKG 见证并推动了中文知识图谱社区的成长，并在大模型时代完成了一次完整的范式升级。</p>
        </div>

        <div class="timeline">
          <div v-for="m in milestones" :key="m.year" class="ts-item">
            <div class="ts-year">{{ m.year }}</div>
            <div class="ts-line">
              <span class="ts-dot" />
            </div>
            <div class="ts-card">
              <h4>{{ m.title }}</h4>
              <p>{{ m.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Affiliation -->
    <section class="section">
      <div class="container">
        <div class="aff-grid">
          <div class="aff">
            <h3>主管单位</h3>
            <p>中国中文信息学会<br/>语言与知识计算专业委员会</p>
          </div>
          <div class="aff">
            <h3>协作机构</h3>
            <p>浙江大学 · 东南大学 · 同济大学<br/>南京大学 · 苏州大学 · 蚂蚁集团 等</p>
          </div>
          <div class="aff">
            <h3>联系我们</h3>
            <p>
              <a href="mailto:contact@openkg.cn">contact@openkg.cn</a><br/>
              <a href="http://openkg.cn" target="_blank" rel="noreferrer">openkg.cn</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import { founders, milestones } from '@/data/site.js'
</script>

<style lang="scss" scoped>
.text-center { text-align: center; }
strong { color: var(--color-sky-200); font-weight: 700; }

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  align-items: start;
  h2 { font-size: clamp(28px, 4vw, 44px); line-height: 1.25; margin-top: 14px; }
}
.mission-text p {
  font-size: 16px;
  line-height: 1.85;
  margin-bottom: 18px;
}
.quote {
  margin-top: 28px;
  padding: 24px 28px;
  border-left: 3px solid var(--color-sky-400);
  background: rgba(56, 189, 248, 0.05);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  position: relative;
  .quote-mark {
    position: absolute;
    top: 6px; left: 12px;
    font-size: 50px;
    color: var(--color-sky-400);
    opacity: 0.4;
    font-family: serif;
  }
  p {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-sky-200);
    margin: 0;
  }
  .quote-author {
    display: block;
    margin-top: 8px;
    font-size: 12.5px;
    color: var(--text-muted);
    letter-spacing: 0.06em;
  }
}

.vision-section .vision-card {
  padding: 60px;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(129, 140, 248, 0.12));
  border: 1px solid var(--color-border-strong);
  text-align: center;
  h2 {
    font-size: clamp(28px, 4vw, 44px);
    line-height: 1.25;
    margin: 18px auto 22px;
    max-width: 760px;
  }
  p {
    max-width: 720px;
    margin: 0 auto;
    font-size: 16px;
    line-height: 1.85;
  }
}

.founder-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 30px;
}
.founder-card {
  padding: 28px 22px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, transparent), rgba(8, 22, 40, 0.6));
  border: 1px solid var(--color-border);
  text-align: center;
  transition: all 0.3s;
  position: relative;
  &:hover {
    transform: translateY(-6px);
    border-color: color-mix(in srgb, var(--accent) 50%, transparent);
    box-shadow: 0 18px 40px -20px color-mix(in srgb, var(--accent) 50%, transparent);
  }
  &.lead {
    grid-row: span 1;
    background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 22%, transparent), rgba(8, 22, 40, 0.6));
    border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  }
  h3 { font-size: 19px; margin-bottom: 6px; }
  p {
    font-size: 12.5px;
    line-height: 1.65;
    color: var(--text-secondary);
    margin-top: 14px;
  }
}
.lead-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--gradient-hero);
  color: #fff;
}
.founder-avatar {
  width: 64px;
  height: 64px;
  margin: 0 auto 14px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 30%, transparent), color-mix(in srgb, var(--accent) 60%, transparent));
  border: 2px solid color-mix(in srgb, var(--accent) 60%, transparent);
  font-size: 26px;
  font-weight: 700;
  color: #fff;
}
.role {
  font-size: 12.5px;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 4px;
}
.org { font-size: 12px; color: var(--text-muted); }
.cta-row { text-align: center; margin-top: 30px; }

.timeline {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.ts-item {
  display: grid;
  grid-template-columns: 90px 32px 1fr;
  gap: 18px;
  align-items: stretch;
}
.ts-year {
  font-family: var(--font-mono);
  font-size: 22px;
  font-weight: 800;
  color: var(--color-sky-300);
  text-align: right;
  padding-top: 20px;
  letter-spacing: 0.02em;
}
.ts-line {
  position: relative;
  display: flex;
  justify-content: center;
}
.ts-line::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--color-border-strong), transparent);
  transform: translateX(-50%);
}
.ts-dot {
  width: 14px; height: 14px;
  margin-top: 22px;
  border-radius: 50%;
  background: var(--color-sky-400);
  box-shadow: 0 0 14px var(--color-sky-400);
  position: relative;
  z-index: 1;
}
.ts-card {
  padding: 18px 22px;
  margin-bottom: 18px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: rgba(8, 22, 40, 0.55);
  transition: all 0.3s;
  &:hover { border-color: var(--color-border-strong); background: rgba(56, 189, 248, 0.05); }
  h4 { font-size: 17px; margin-bottom: 6px; color: var(--color-sky-100); }
  p { font-size: 13.5px; line-height: 1.7; }
}

.aff-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.aff {
  padding: 28px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: rgba(8, 22, 40, 0.55);
  text-align: center;
  h3 {
    font-size: 13px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-sky-300);
    margin-bottom: 14px;
  }
  p {
    font-size: 14px;
    line-height: 1.85;
  }
}

@media (max-width: 1100px) {
  .founder-grid { grid-template-columns: repeat(2, 1fr); }
  .founder-card.lead { grid-column: span 2; }
}
@media (max-width: 800px) {
  .mission-grid { grid-template-columns: 1fr; gap: 30px; }
  .vision-card { padding: 40px 24px; }
  .ts-item { grid-template-columns: 70px 28px 1fr; }
  .aff-grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .founder-grid { grid-template-columns: 1fr; }
  .founder-card.lead { grid-column: auto; }
}
</style>
