<template>
  <div class="starfield" aria-hidden="true">
    <canvas ref="canvasRef" />
    <div class="grid-overlay" />
    <div class="aurora aurora-1" />
    <div class="aurora aurora-2" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let rafId = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let width, height, particles, mouse
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  const resize = () => {
    width = canvas.clientWidth = window.innerWidth
    height = canvas.clientHeight = window.innerHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    initParticles()
  }

  const initParticles = () => {
    const count = Math.min(110, Math.floor((width * height) / 16000))
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.4 + 0.4
    }))
  }

  mouse = { x: -9999, y: -9999 }
  const onMove = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }
  const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

  const draw = () => {
    ctx.clearRect(0, 0, width, height)
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > width) p.vx *= -1
      if (p.y < 0 || p.y > height) p.vy *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(125, 211, 252, ${0.25 + p.r * 0.4})`
      ctx.fill()

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j]
        const dx = p.x - q.x
        const dy = p.y - q.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 130) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(q.x, q.y)
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.16 * (1 - dist / 130)})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      const mdx = p.x - mouse.x
      const mdy = p.y - mouse.y
      const md = Math.sqrt(mdx * mdx + mdy * mdy)
      if (md < 160) {
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.strokeStyle = `rgba(125, 211, 252, ${0.35 * (1 - md / 160)})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }
    }
    rafId = requestAnimationFrame(draw)
  }

  resize()
  draw()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseleave', onLeave)

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseleave', onLeave)
  })
})
</script>

<style lang="scss" scoped>
.starfield {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  opacity: 0.45;
}

.aurora {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.4;
}
.aurora-1 {
  width: 600px; height: 600px;
  top: -200px; left: -100px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.6), transparent 60%);
  animation: float 18s ease-in-out infinite;
}
.aurora-2 {
  width: 700px; height: 700px;
  bottom: -300px; right: -150px;
  background: radial-gradient(circle, rgba(129, 140, 248, 0.4), transparent 60%);
  animation: float 22s ease-in-out infinite reverse;
}
</style>
