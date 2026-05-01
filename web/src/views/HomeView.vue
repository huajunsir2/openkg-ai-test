<template>
  <div class="home">
    <!-- ============ HERO ============ -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-eyebrow fade-in-up">
          <span class="dot" />
          OpenKG · 大模型时代的开放知识图谱
        </div>

        <h1 class="hero-title fade-in-up" style="animation-delay: 0.05s">
          <span class="line">智能的本质</span>
          <span class="line">
            是<span class="gradient-text">知识</span>
          </span>
        </h1>

        <p class="hero-slogan fade-in-up" style="animation-delay: 0.15s">
          <span class="gradient-text">开放促进互联</span>
          <span class="dot-sep">·</span>
          <span class="gradient-text">链接创造价值</span>
        </p>

        <p class="hero-desc fade-in-up" style="animation-delay: 0.25s">
          OpenKG 致力于在通用人工智能时代，
          <strong>重构人类知识的表示与组织逻辑</strong>。
          以 cnSchema/OneGraph 数据底座、SPG/KAG 推理框架、SkillNet 智能体技能网络与
          OneEval 动态评测体系，构建大模型时代知识工程的完整技术栈。
        </p>

        <div class="hero-actions fade-in-up" style="animation-delay: 0.35s">
          <router-link to="/projects" class="btn btn-primary">
            探索核心项目
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </router-link>
          <router-link to="/sigs" class="btn btn-ghost">
            加入兴趣小组
          </router-link>
        </div>

        <div class="hero-stats fade-in-up" style="animation-delay: 0.5s">
          <div v-for="s in stats" :key="s.label" class="stat">
            <div class="stat-value" :style="{ color: s.accent }">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <KnowledgeOrb />
      </div>
    </section>

    <!-- ============ Vision ============ -->
    <section class="section vision">
      <div class="container">
        <div class="vision-grid">
          <div class="vision-text">
            <span class="section-eyebrow">VISION · 我们的愿景</span>
            <h2 class="vision-title">
              在 AGI 时代，<br/>
              重构<span class="gradient-text">人类知识</span><br/>
              的表示与组织逻辑
            </h2>
            <p class="vision-desc">
              知识图谱与大模型，是表示与处理知识的两种互补范式。
              OpenKG 把整个社区定位为：在大模型时代，重构知识被表示、被链接、被推理、被评测的完整逻辑。
            </p>
            <p class="vision-desc">
              我们相信，参数化知识与符号化知识的深度融合，
              将为人工智能提供更<strong>全面、可靠、可控、可解释</strong>的知识处理方法。
            </p>
          </div>
          <div class="vision-cards">
            <div class="vc">
              <div class="vc-num">01</div>
              <h4>开放</h4>
              <p>非盈利、中立的学术开放技术社区，沉淀面向全社会可复用的知识资产。</p>
            </div>
            <div class="vc">
              <div class="vc-num">02</div>
              <h4>互联</h4>
              <p>跨机构、跨学科、跨模型的知识互联与协同，构建中文为核心的知识网络。</p>
            </div>
            <div class="vc">
              <div class="vc-num">03</div>
              <h4>众包</h4>
              <p>以兴趣小组（SIG）为驱动，把社区的智慧组织成可持续演化的开放知识工程。</p>
            </div>
            <div class="vc">
              <div class="vc-num">04</div>
              <h4>新范式</h4>
              <p>从“开放资源库”进化为以核心项目驱动的 OpenKG 关键技术栈。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ Tech Stack ============ -->
    <section class="section stack">
      <div class="container">
        <div class="text-center">
          <span class="section-eyebrow">CORE STACK · 五大核心项目</span>
          <h2 class="section-title">大模型时代的<span class="gradient-text">知识技术栈</span></h2>
          <p class="section-subtitle">
            从数据 → 推理 → 智能体 → 评测，OpenKG 构建一条完整的、可被产业复用的知识工程主链路。
          </p>
        </div>

        <div class="stack-pyramid">
          <div class="layer-line layer-line-1">
            <span>评测层</span><i /><strong>OneEval</strong>
          </div>
          <div class="layer-line layer-line-2">
            <span>Agent 层</span><i /><strong>SkillNet</strong>
          </div>
          <div class="layer-line layer-line-3">
            <span>推理层</span><i /><strong>SPG / KAG</strong>
          </div>
          <div class="layer-line layer-line-4">
            <span>数据层</span><i /><strong>cnSchema / OneGraph</strong>
          </div>
          <div class="layer-line layer-line-5">
            <span>科研层</span><i /><strong>SciGraph</strong>
          </div>
        </div>

        <div class="project-grid">
          <ProjectCard
            v-for="p in coreProjects"
            :key="p.id"
            :project="p"
            class="fade-in-up"
          />
        </div>
      </div>
    </section>

    <!-- ============ SIGs ============ -->
    <section class="section sig-section">
      <div class="container">
        <div class="text-center">
          <span class="section-eyebrow">SIG · 兴趣小组</span>
          <h2 class="section-title">围绕<span class="gradient-text">核心项目</span>的协同协作</h2>
          <p class="section-subtitle">
            OpenKG 的兴趣小组（SIG）与五大核心项目一一对应，构成了从研究、实现到评测的完整生态。
          </p>
        </div>
        <div class="sig-grid">
          <router-link
            v-for="sig in sigs"
            :key="sig.id"
            to="/sigs"
            class="sig-card"
            :style="{ '--accent': sig.color }"
          >
            <div class="sig-head">
              <span class="sig-name">{{ sig.name }}</span>
              <span class="sig-arrow">→</span>
            </div>
            <div class="sig-project">驱动项目：{{ sig.project }}</div>
            <p class="sig-desc">{{ sig.desc }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ============ News ============ -->
    <section class="section news-section">
      <div class="container">
        <div class="news-head">
          <div>
            <span class="section-eyebrow">NEWS · 新闻动态</span>
            <h2 class="news-title">来自社区的<span class="gradient-text">最新进展</span></h2>
          </div>
          <router-link to="/news" class="btn btn-ghost">查看全部 →</router-link>
        </div>

        <div class="news-grid">
          <article v-for="(n, i) in news.slice(0, 4)" :key="n.title" class="news-card" :style="{ animationDelay: `${i * 0.05}s` }">
            <div class="news-meta">
              <span class="news-tag">{{ n.tag }}</span>
              <span class="news-date">{{ n.date }}</span>
            </div>
            <h3>{{ n.title }}</h3>
            <p>{{ n.summary }}</p>
            <span class="read-more">阅读全文 →</span>
          </article>
        </div>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <section id="join" class="section cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-bg" />
          <div class="cta-content">
            <span class="section-eyebrow">JOIN US</span>
            <h2>与我们共同构建<br/><span class="gradient-text">大模型时代的知识底座</span></h2>
            <p>OpenKG 欢迎来自高校、产业、科研机构的研究者与工程师加入，共建中文为核心的开放知识工程社区。</p>
            <div class="cta-actions">
              <router-link to="/sigs" class="btn btn-primary">加入兴趣小组</router-link>
              <router-link to="/about" class="btn btn-ghost">了解 OpenKG</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ProjectCard from '@/components/ProjectCard.vue'
import KnowledgeOrb from '@/components/KnowledgeOrb.vue'
import { coreProjects, sigs, news, stats } from '@/data/site.js'
</script>

<style lang="scss" scoped>
.home { padding-top: var(--header-height); }

/* HERO */
.hero {
  position: relative;
  padding: 100px 0 60px;
  overflow: hidden;
}
.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 920px;
  text-align: center;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  letter-spacing: 0.16em;
  color: var(--color-sky-300);
  padding: 8px 18px;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.06);
  margin-bottom: 28px;
}
.hero-eyebrow .dot {
  width: 8px; height: 8px; border-radius: 999px;
  background: var(--color-sky-300);
  box-shadow: 0 0 12px var(--color-sky-300);
  animation: pulse-glow 2s infinite;
}

.hero-title {
  font-size: clamp(48px, 8vw, 96px);
  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 900;
  margin-bottom: 30px;
}
.hero-title .line { display: block; }

.hero-slogan {
  font-size: clamp(20px, 2.6vw, 28px);
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-bottom: 28px;
}
.dot-sep {
  margin: 0 14px;
  color: var(--color-sky-400);
  opacity: 0.6;
}

.hero-desc {
  font-size: 17px;
  line-height: 1.85;
  color: var(--text-secondary);
  max-width: 760px;
  margin: 0 auto 40px;
  strong { color: var(--color-sky-200); font-weight: 700; }
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 70px;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 30px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: rgba(8, 22, 40, 0.4);
  backdrop-filter: blur(14px);
}
.stat-value {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}
.stat-label {
  font-size: 12.5px;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

.hero-visual {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: grid;
  place-items: center;
  pointer-events: none;
  opacity: 0.5;
}

/* Vision */
.vision-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 60px;
  align-items: center;
}
.vision-title {
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.2;
  margin: 18px 0 24px;
}
.vision-desc {
  font-size: 16px;
  line-height: 1.85;
  margin-bottom: 18px;
  strong { color: var(--color-sky-200); font-weight: 700; }
}
.vision-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.vc {
  padding: 24px 22px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: rgba(8, 22, 40, 0.5);
  transition: all 0.3s;
  &:hover {
    border-color: var(--color-border-strong);
    transform: translateY(-4px);
    background: rgba(56, 189, 248, 0.06);
  }
  .vc-num {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-sky-400);
    letter-spacing: 0.16em;
    margin-bottom: 10px;
  }
  h4 {
    font-size: 18px;
    margin-bottom: 8px;
    color: var(--color-sky-100);
  }
  p {
    font-size: 13.5px;
    line-height: 1.6;
    color: var(--text-secondary);
  }
}

/* Stack */
.text-center { text-align: center; }

.stack-pyramid {
  max-width: 700px;
  margin: 50px auto 70px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.layer-line {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 22px;
  border-radius: 999px;
  background: rgba(8, 22, 40, 0.6);
  border: 1px solid var(--color-border);
  font-size: 14px;
  span {
    font-size: 11px;
    letter-spacing: 0.18em;
    color: var(--text-muted);
    width: 70px;
    flex-shrink: 0;
  }
  i {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-border-strong), transparent);
  }
  strong {
    font-size: 15.5px;
    font-family: var(--font-mono);
    color: var(--color-sky-200);
    font-weight: 700;
  }
}
.layer-line-1 { background: linear-gradient(135deg, rgba(129, 140, 248, 0.18), rgba(8, 22, 40, 0.6)); }
.layer-line-2 { background: linear-gradient(135deg, rgba(96, 165, 250, 0.18), rgba(8, 22, 40, 0.6)); }
.layer-line-3 { background: linear-gradient(135deg, rgba(34, 211, 238, 0.18), rgba(8, 22, 40, 0.6)); }
.layer-line-4 { background: linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(8, 22, 40, 0.6)); }
.layer-line-5 { background: linear-gradient(135deg, rgba(125, 211, 252, 0.18), rgba(8, 22, 40, 0.6)); }

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-top: 50px;
}
.project-grid > :nth-child(4),
.project-grid > :nth-child(5) {
  // grid stays
}

/* SIGs */
.sig-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.sig-card {
  padding: 24px 22px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent), rgba(8, 22, 40, 0.5));
  display: block;
  color: inherit;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--accent) 50%, transparent);
    box-shadow: 0 18px 40px -20px color-mix(in srgb, var(--accent) 60%, transparent);
    .sig-arrow { transform: translateX(6px); }
  }
}
.sig-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.sig-name {
  font-size: 22px;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--accent);
}
.sig-arrow {
  font-size: 20px;
  color: var(--accent);
  transition: transform 0.3s;
}
.sig-project {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.06em;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px dashed var(--color-border);
}
.sig-desc {
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--text-secondary);
}

/* News */
.news-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}
.news-title {
  font-size: clamp(26px, 3vw, 36px);
  margin-top: 8px;
}
.news-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}
.news-card {
  padding: 28px;
  border-radius: var(--radius-md);
  background: rgba(8, 22, 40, 0.55);
  border: 1px solid var(--color-border);
  transition: all 0.3s;
  cursor: pointer;
  animation: fade-in-up 0.6s both;
  &:hover {
    transform: translateY(-4px);
    border-color: var(--color-border-strong);
    background: rgba(56, 189, 248, 0.06);
    .read-more { color: var(--color-sky-200); }
  }
  h3 {
    font-size: 18px;
    margin: 12px 0 10px;
    line-height: 1.4;
  }
  p {
    font-size: 13.5px;
    line-height: 1.7;
    margin-bottom: 14px;
  }
}
.news-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 12px;
  color: var(--text-muted);
}
.news-tag {
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid var(--color-border);
  color: var(--color-sky-300);
  font-weight: 600;
  letter-spacing: 0.06em;
}
.news-date { letter-spacing: 0.04em; }
.read-more {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-sky-400);
  letter-spacing: 0.06em;
}

/* CTA */
.cta-section { padding-bottom: 60px; }
.cta-card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  padding: 80px 40px;
  text-align: center;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.18), rgba(129, 140, 248, 0.12));
  border: 1px solid var(--color-border-strong);
}
.cta-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.4), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(129, 140, 248, 0.4), transparent 50%);
  filter: blur(40px);
  z-index: 0;
}
.cta-content {
  position: relative;
  z-index: 1;
  h2 {
    font-size: clamp(28px, 4vw, 44px);
    margin: 18px 0 18px;
    line-height: 1.3;
  }
  p {
    max-width: 600px;
    margin: 0 auto 30px;
    font-size: 16px;
  }
}
.cta-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

@media (max-width: 1000px) {
  .vision-grid { grid-template-columns: 1fr; gap: 40px; }
  .project-grid { grid-template-columns: repeat(2, 1fr); }
  .sig-grid { grid-template-columns: repeat(2, 1fr); }
  .news-grid { grid-template-columns: 1fr; }
}
@media (max-width: 700px) {
  .hero { padding: 80px 0 30px; }
  .hero-stats { grid-template-columns: repeat(2, 1fr); padding: 18px 22px; }
  .stat-value { font-size: 24px; }
  .vision-cards { grid-template-columns: 1fr; }
  .project-grid { grid-template-columns: 1fr; }
  .sig-grid { grid-template-columns: 1fr; }
  .layer-line span { width: 56px; }
  .layer-line strong { font-size: 13.5px; }
}
</style>
