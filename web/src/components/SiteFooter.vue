<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <div class="brand-row">
          <span class="dot" />
          <strong>OpenKG · 开放知识图谱</strong>
        </div>
        <p class="brand-slogan">
          <span class="gradient-text">开放促进互联</span>
          ·
          <span class="gradient-text">链接创造价值</span>
        </p>
        <p class="brand-desc">
          OpenKG 是一个非盈利、中立的学术开放技术社区，致力于在通用人工智能时代重构人类知识的表示与组织逻辑。
        </p>
      </div>

      <div class="footer-col">
        <h4>核心项目</h4>
        <ul>
          <li v-for="p in coreProjects" :key="p.id">
            <router-link :to="`/projects/${p.id}`">{{ p.name }}</router-link>
          </li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>社区</h4>
        <ul>
          <li><router-link to="/sigs">兴趣小组 SIG</router-link></li>
          <li><router-link to="/toc">TOC 技术委员会</router-link></li>
          <li><router-link to="/resources">资源库</router-link></li>
          <li><router-link to="/news">新闻动态</router-link></li>
          <li><router-link to="/about">关于我们</router-link></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>联系我们</h4>
        <ul>
          <li><a href="mailto:contact@openkg.cn">contact@openkg.cn</a></li>
          <li><a href="http://openkg.cn" target="_blank" rel="noreferrer">openkg.cn</a></li>
          <li><a href="https://github.com/OpenKG-zjuKG" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href="#" @click.prevent>微信公众号 · 开放知识图谱</a></li>
        </ul>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© 2015 - 2026 OpenKG · 开放知识图谱社区</span>
      <span class="legal">由中国中文信息学会语言与知识计算专业委员会发起</span>
    </div>
  </footer>
</template>

<script setup>
import { coreProjects } from '@/data/site.js'
</script>

<style lang="scss" scoped>
.site-footer {
  margin-top: 80px;
  padding: 80px 0 30px;
  border-top: 1px solid var(--color-border);
  background:
    linear-gradient(180deg, transparent, rgba(3, 12, 24, 0.6) 30%);
  position: relative;
  z-index: 1;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
  gap: 50px;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  margin-bottom: 14px;
  color: var(--color-sky-200);
}
.dot {
  width: 8px; height: 8px; border-radius: 999px;
  background: var(--color-sky-400);
  box-shadow: 0 0 12px var(--color-sky-400);
  animation: pulse-glow 2s infinite;
}
.brand-slogan {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-bottom: 14px;
  color: var(--text-primary);
}
.brand-desc {
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--text-muted);
  max-width: 360px;
}

.footer-col h4 {
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-sky-300);
  margin-bottom: 18px;
  font-weight: 600;
}
.footer-col ul li { margin-bottom: 10px; }
.footer-col ul li a {
  color: var(--text-secondary);
  font-size: 14px;
  transition: color 0.2s;
}
.footer-col ul li a:hover { color: var(--color-sky-200); }

.footer-bottom {
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: var(--text-muted);
}
.legal { color: var(--text-muted); }

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}
@media (max-width: 560px) {
  .footer-grid { grid-template-columns: 1fr; }
}
</style>
