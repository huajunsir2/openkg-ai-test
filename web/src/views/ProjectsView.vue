<template>
  <div>
    <PageHeader
      eyebrow="CORE PROJECTS"
      title="OpenKG 五大核心项目"
      subtitle="围绕大模型时代的知识工程，OpenKG 重点推进 cnSchema/OneGraph、SPG/KAG、OneEval、SkillNet、SciGraph 五大核心项目，构建从数据到推理、从智能体到评测、从产业到科研的完整技术栈。"
    />

    <section class="section">
      <div class="container">
        <div class="layer-tabs">
          <button
            v-for="layer in layers"
            :key="layer"
            :class="['layer-tab', { active: filter === layer }]"
            @click="filter = layer"
          >{{ layer }}</button>
        </div>

        <div class="project-grid">
          <ProjectCard v-for="p in filteredProjects" :key="p.id" :project="p" class="fade-in-up" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { coreProjects } from '@/data/site.js'

const filter = ref('全部')
const layers = ['全部', '数据层', '推理层', 'Agent 层', '评测层', '科研层']
const filteredProjects = computed(() =>
  filter.value === '全部'
    ? coreProjects
    : coreProjects.filter((p) => p.layer === filter.value)
)
</script>

<style lang="scss" scoped>
.layer-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 50px;
}
.layer-tab {
  padding: 10px 22px;
  border-radius: 999px;
  font-size: 13.5px;
  border: 1px solid var(--color-border);
  background: rgba(8, 22, 40, 0.5);
  color: var(--text-secondary);
  transition: all 0.25s;
  &:hover { border-color: var(--color-border-strong); color: var(--color-sky-200); }
  &.active {
    background: var(--gradient-hero);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 8px 22px -8px rgba(14, 165, 233, 0.6);
  }
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
@media (max-width: 1000px) {
  .project-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 700px) {
  .project-grid { grid-template-columns: 1fr; }
}
</style>
