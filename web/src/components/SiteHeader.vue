<template>
  <header :class="['site-header', { scrolled: isScrolled }]">
    <div class="container header-inner">
      <router-link to="/" class="brand" aria-label="OpenKG 首页">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 40 40" width="36" height="36">
            <defs>
              <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#7dd3fc"/>
                <stop offset="100%" stop-color="#0284c7"/>
              </linearGradient>
            </defs>
            <circle cx="20" cy="20" r="18" fill="none" stroke="url(#brandGrad)" stroke-width="1.5" opacity="0.5"/>
            <circle cx="13" cy="14" r="2.6" fill="#7dd3fc"/>
            <circle cx="27" cy="14" r="2.6" fill="#38bdf8"/>
            <circle cx="20" cy="28" r="2.6" fill="#818cf8"/>
            <line x1="13" y1="14" x2="27" y2="14" stroke="url(#brandGrad)" stroke-width="1.4"/>
            <line x1="13" y1="14" x2="20" y2="28" stroke="url(#brandGrad)" stroke-width="1.4"/>
            <line x1="27" y1="14" x2="20" y2="28" stroke="url(#brandGrad)" stroke-width="1.4"/>
          </svg>
        </span>
        <div class="brand-text">
          <span class="brand-zh">OpenKG</span>
          <span class="brand-sub">开放知识图谱</span>
        </div>
      </router-link>

      <nav class="nav-desktop" aria-label="主导航">
        <router-link
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          active-class="active"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <div class="header-actions">
        <a class="btn btn-ghost lang-btn" href="#" @click.prevent>EN</a>
        <a class="btn btn-primary join-btn" href="#join">加入社区</a>
        <button class="menu-toggle" :aria-expanded="mobileOpen" @click="mobileOpen = !mobileOpen" aria-label="打开菜单">
          <span /><span /><span />
        </button>
      </div>
    </div>

    <transition name="slide-down">
      <nav v-if="mobileOpen" class="nav-mobile" aria-label="移动端导航">
        <router-link
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="mobile-item"
          active-class="active"
          @click="mobileOpen = false"
        >
          {{ item.label }}
        </router-link>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const nav = [
  { label: '主页', to: '/' },
  { label: '核心项目', to: '/projects' },
  { label: '兴趣小组', to: '/sigs' },
  { label: 'TOC 委员会', to: '/toc' },
  { label: '资源库', to: '/resources' },
  { label: '新闻动态', to: '/news' },
  { label: '关于我们', to: '/about' }
]

const isScrolled = ref(false)
const mobileOpen = ref(false)
const route = useRoute()

const onScroll = () => {
  isScrolled.value = window.scrollY > 24
}

watch(() => route.fullPath, () => { mobileOpen.value = false })

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: backdrop-filter 0.3s ease, background 0.3s ease, border-color 0.3s ease;
  background: rgba(3, 7, 18, 0.35);
  border-bottom: 1px solid transparent;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.site-header.scrolled {
  background: rgba(3, 7, 18, 0.78);
  border-bottom-color: var(--color-border);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.header-inner {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--text-primary);
}

.brand-mark {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid var(--color-border);
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.25);
  animation: float 5s ease-in-out infinite;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.brand-zh {
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 0.04em;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.brand-sub {
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--text-muted);
  margin-top: 4px;
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  margin-right: 24px;
}

.nav-item {
  position: relative;
  padding: 8px 14px;
  font-size: 14.5px;
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: 999px;
  transition: color 0.2s, background 0.2s;
}
.nav-item:hover { color: var(--text-primary); background: rgba(56, 189, 248, 0.06); }
.nav-item.active {
  color: var(--color-sky-200);
  background: rgba(56, 189, 248, 0.12);
}
.nav-item.active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -6px;
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: var(--color-sky-300);
  transform: translateX(-50%);
  box-shadow: 0 0 8px var(--color-sky-300);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.lang-btn { padding: 8px 14px; font-size: 13px; }
.join-btn { padding: 10px 20px; font-size: 13.5px; }

.menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: rgba(56, 189, 248, 0.06);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
}
.menu-toggle span {
  width: 18px;
  height: 2px;
  background: var(--color-sky-200);
  border-radius: 1px;
}

.nav-mobile {
  background: rgba(3, 7, 18, 0.95);
  border-top: 1px solid var(--color-border);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mobile-item {
  padding: 12px 16px;
  border-radius: 10px;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 500;
}
.mobile-item.active {
  background: rgba(56, 189, 248, 0.12);
  color: var(--color-sky-200);
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}
.slide-down-enter-from, .slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-down-enter-to, .slide-down-leave-from {
  max-height: 600px;
  opacity: 1;
}

@media (max-width: 1100px) {
  .nav-desktop { display: none; }
  .menu-toggle { display: inline-flex; }
  .lang-btn { display: none; }
}
</style>
