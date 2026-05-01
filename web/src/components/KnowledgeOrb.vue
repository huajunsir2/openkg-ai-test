<template>
  <div class="orb-wrap" aria-hidden="true">
    <div class="orb">
      <div class="ring ring-1" />
      <div class="ring ring-2" />
      <div class="ring ring-3" />
      <div class="orb-core" />
      <span v-for="(p, i) in points" :key="i" class="point" :style="p.style" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const points = computed(() => {
  const arr = []
  for (let i = 0; i < 14; i++) {
    const angle = (i / 14) * Math.PI * 2
    const r = 220 + (i % 3) * 30
    const x = Math.cos(angle) * r
    const y = Math.sin(angle) * r
    arr.push({
      style: {
        transform: `translate(${x}px, ${y}px)`,
        animationDelay: `${i * 0.3}s`
      }
    })
  }
  return arr
})
</script>

<style lang="scss" scoped>
.orb-wrap {
  position: relative;
  width: 700px;
  height: 700px;
  display: grid;
  place-items: center;
  filter: blur(0.4px);
}
.orb {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
.ring {
  position: absolute;
  border: 1px solid rgba(56, 189, 248, 0.18);
  border-radius: 50%;
  border-top-color: rgba(56, 189, 248, 0.6);
  border-right-color: rgba(129, 140, 248, 0.4);
}
.ring-1 { width: 280px; height: 280px; animation: spin-slow 30s linear infinite; }
.ring-2 { width: 420px; height: 420px; animation: spin-slow 50s linear infinite reverse; border-top-color: rgba(34, 211, 238, 0.5); }
.ring-3 { width: 560px; height: 560px; animation: spin-slow 80s linear infinite; border-top-color: rgba(125, 211, 252, 0.5); }

.orb-core {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 30%, rgba(186, 230, 253, 0.95), rgba(56, 189, 248, 0.6) 30%, rgba(14, 165, 233, 0.3) 60%, transparent 80%);
  box-shadow:
    0 0 80px rgba(56, 189, 248, 0.6),
    0 0 200px rgba(129, 140, 248, 0.35),
    inset 0 0 40px rgba(255, 255, 255, 0.3);
  animation: float 6s ease-in-out infinite;
}

.point {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-sky-200);
  box-shadow: 0 0 12px var(--color-sky-300);
  animation: pulse-glow 3s infinite;
}

@media (max-width: 900px) {
  .orb-wrap { width: 500px; height: 500px; }
  .ring-1 { width: 200px; height: 200px; }
  .ring-2 { width: 320px; height: 320px; }
  .ring-3 { width: 440px; height: 440px; }
  .orb-core { width: 110px; height: 110px; }
}
</style>
