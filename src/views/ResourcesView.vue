<template>
  <div>
    <PageHeader
      eyebrow="OPEN RESOURCES"
      title="资源库"
      subtitle="OpenKG 持续沉淀面向中文与大模型的知识资源。新版资源库以核心项目为入口，辅以经典开放数据集与开源工具，方便研究者与开发者快速接入。"
    />

    <section class="section">
      <div class="container">
        <div class="lite-banner">
          <div>
            <span class="section-eyebrow">RECOMMENDED</span>
            <h2>优先推荐：核心项目资源</h2>
            <p>建议从 OpenKG 五大核心项目入手 — 它们覆盖了大模型时代知识工程的完整链路。</p>
          </div>
          <router-link to="/projects" class="btn btn-primary">进入核心项目 →</router-link>
        </div>

        <div class="filters">
          <button
            v-for="t in types"
            :key="t"
            :class="['filter-btn', { active: type === t }]"
            @click="type = t"
          >{{ t }}</button>
        </div>

        <div class="res-grid">
          <article v-for="r in filteredResources" :key="r.title" class="res-card">
            <div class="res-head">
              <span class="res-type" :data-t="r.type">{{ r.type }}</span>
              <span v-if="r.featured" class="featured">★ Featured</span>
            </div>
            <h3>{{ r.title }}</h3>
            <p>{{ r.desc }}</p>
            <div class="res-foot">
              <span class="res-org">{{ r.org }}</span>
              <a v-if="r.link" :href="r.link" target="_blank" rel="noreferrer">访问 →</a>
            </div>
          </article>
        </div>

        <div class="legacy-note">
          <strong>关于历史数据集</strong>
          <p>
            OpenKG 自 2015 年累积的近 300 个开放领域知识图谱数据集仍然可用。考虑到大模型时代的发展，
            我们将以 <router-link to="/projects/cnschema-onegraph">cnSchema/OneGraph</router-link>
            作为新的统一入口，对历史数据进行渐进式整合与升级。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '@/components/PageHeader.vue'

const types = ['全部', '核心项目', '工具', '数据', '标准', '评测']
const type = ref('全部')

const resources = [
  { title: 'OneGraph', type: '核心项目', org: 'SIGData / 浙江大学', desc: '大模型驱动的开放知识图谱，包含 cnSchema、概念图、实体图、文本图四个层级。', link: 'http://onegraph.openkg.cn/', featured: true },
  { title: 'cnSchema', type: '标准', org: 'OpenKG', desc: '中文领域 Schema 参考标准，连接 Schema.ORG、Wikidata 等典型知识图谱标准。', link: 'http://openkg.cn/', featured: true },
  { title: 'OpenSPG', type: '核心项目', org: 'SIGSPG / 蚂蚁集团', desc: 'Semantic-enhanced Programmable Graph，知识图谱语义底座与编程框架。', link: 'https://openspg.github.io/v2/', featured: true },
  { title: 'KAG', type: '核心项目', org: 'SIGSPG / 蚂蚁集团', desc: '基于 OpenSPG 与大模型的知识增强生成与逻辑推理框架。', link: 'https://github.com/OpenSPG/KAG', featured: true },
  { title: 'OneEval', type: '评测', org: 'SIGEval / 东南大学', desc: '面向大模型 + 知识库的系统化评测体系，覆盖 5 种知识库类型与 5 大领域。', link: 'http://oneeval.openkg.cn/', featured: true },
  { title: 'SkillNet', type: '核心项目', org: 'SIGAgent / 浙江大学', desc: '面向 Agent 时代的知识技能开放协作网络，把知识能力封装为可调度的技能。', featured: true },
  { title: 'OpenRAG Base', type: '工具', org: '同济大学', desc: 'RAG 的开源开放知识库，沉淀检索增强生成的最佳实践与基础组件。' },
  { title: 'unKR', type: '工具', org: '东南大学', desc: '不确定性知识图谱推理工具，支持多种概率与不确定性建模算法。' },
  { title: 'KnowCoder', type: '工具', org: 'OpenKG 社区', desc: '面向知识抽取与构建的代码生成与执行框架。' },
  { title: 'DeepOnto', type: '工具', org: 'OpenKG 社区', desc: '基于深度学习的本体匹配与对齐工具集。' },
  { title: 'OpenKG-300', type: '数据', org: 'OpenKG 社区', desc: 'OpenKG 历史累积的近 300 个开放领域知识图谱数据集（陆续整合到 OneGraph）。' },
  { title: 'IEEE P2807.7', type: '标准', org: 'OpenKG 联合', desc: '《开放域知识图谱发布和众包服务指南》国际标准编制中。' }
]

const filteredResources = computed(() =>
  type.value === '全部' ? resources : resources.filter((r) => r.type === type.value)
)
</script>

<style lang="scss" scoped>
.lite-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 36px 36px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(129, 140, 248, 0.12));
  border: 1px solid var(--color-border-strong);
  margin-bottom: 50px;
  flex-wrap: wrap;
  h2 { font-size: 24px; margin: 12px 0 8px; }
  p { color: var(--text-secondary); }
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.filter-btn {
  padding: 8px 18px;
  font-size: 13.5px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: rgba(8, 22, 40, 0.5);
  color: var(--text-secondary);
  transition: all 0.2s;
  &:hover { border-color: var(--color-border-strong); color: var(--color-sky-200); }
  &.active {
    background: var(--gradient-hero);
    color: #fff;
    border-color: transparent;
  }
}

.res-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.res-card {
  padding: 26px 24px;
  border-radius: var(--radius-md);
  background: rgba(8, 22, 40, 0.55);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-4px);
    border-color: var(--color-border-strong);
    background: rgba(56, 189, 248, 0.05);
  }
  h3 { font-size: 18px; margin: 12px 0 10px; }
  p {
    font-size: 13.5px;
    line-height: 1.7;
    flex: 1;
    margin-bottom: 18px;
  }
}

.res-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.res-type {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.1);
  color: var(--color-sky-300);
  border: 1px solid var(--color-border);
}
.res-type[data-t='核心项目'] { color: #38bdf8; border-color: rgba(56, 189, 248, 0.4); background: rgba(56, 189, 248, 0.12); }
.res-type[data-t='评测']     { color: #818cf8; border-color: rgba(129, 140, 248, 0.4); background: rgba(129, 140, 248, 0.12); }
.res-type[data-t='工具']     { color: #22d3ee; border-color: rgba(34, 211, 238, 0.4); background: rgba(34, 211, 238, 0.12); }
.res-type[data-t='标准']     { color: #7dd3fc; border-color: rgba(125, 211, 252, 0.4); background: rgba(125, 211, 252, 0.12); }
.res-type[data-t='数据']     { color: #60a5fa; border-color: rgba(96, 165, 250, 0.4); background: rgba(96, 165, 250, 0.12); }

.featured {
  font-size: 11px;
  color: #fbbf24;
  letter-spacing: 0.06em;
  font-weight: 700;
}

.res-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px dashed var(--color-border);
  font-size: 12.5px;
  .res-org { color: var(--text-muted); }
  a { color: var(--color-sky-300); font-weight: 600; }
}

.legacy-note {
  margin-top: 50px;
  padding: 28px 32px;
  border-radius: var(--radius-md);
  border: 1px dashed var(--color-border-strong);
  background: rgba(56, 189, 248, 0.04);
  strong {
    color: var(--color-sky-200);
    font-size: 15px;
    display: block;
    margin-bottom: 8px;
    letter-spacing: 0.04em;
  }
  p { font-size: 14px; line-height: 1.8; }
}

@media (max-width: 1000px) {
  .res-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .res-grid { grid-template-columns: 1fr; }
  .lite-banner { padding: 26px; }
}
</style>
