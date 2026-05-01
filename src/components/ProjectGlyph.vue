<template>
  <svg viewBox="0 0 32 32" width="32" height="32" fill="none" :stroke="color" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <template v-if="type === 'graph'">
      <circle cx="16" cy="6" r="2.5" :fill="color" />
      <circle cx="6" cy="22" r="2.5" :fill="color" />
      <circle cx="26" cy="22" r="2.5" :fill="color" />
      <circle cx="16" cy="18" r="2" />
      <line x1="16" y1="6" x2="16" y2="18" />
      <line x1="16" y1="18" x2="6" y2="22" />
      <line x1="16" y1="18" x2="26" y2="22" />
      <line x1="6" y1="22" x2="26" y2="22" stroke-dasharray="2 2" />
    </template>
    <template v-else-if="type === 'reason'">
      <path d="M6 22 L12 10 L20 18 L26 8" />
      <circle cx="6" cy="22" r="2" :fill="color"/>
      <circle cx="12" cy="10" r="2" :fill="color"/>
      <circle cx="20" cy="18" r="2" :fill="color"/>
      <circle cx="26" cy="8" r="2" :fill="color"/>
      <path d="M4 28 H28" stroke-dasharray="2 2"/>
    </template>
    <template v-else-if="type === 'eval'">
      <rect x="5" y="14" width="4" height="12" rx="1" :fill="color"/>
      <rect x="14" y="8" width="4" height="18" rx="1" :fill="color" opacity="0.7"/>
      <rect x="23" y="18" width="4" height="8" rx="1" :fill="color" opacity="0.5"/>
      <path d="M4 6 L12 14 L18 10 L28 4" />
    </template>
    <template v-else-if="type === 'agent'">
      <circle cx="16" cy="13" r="6" />
      <circle cx="16" cy="11" r="1.4" :fill="color"/>
      <path d="M11 11 L8 8 M21 11 L24 8 M16 19 L16 24"/>
      <rect x="9" y="22" width="14" height="6" rx="2"/>
      <circle cx="12" cy="25" r="0.8" :fill="color"/>
      <circle cx="20" cy="25" r="0.8" :fill="color"/>
    </template>
    <template v-else-if="type === 'science'">
      <ellipse cx="16" cy="16" rx="12" ry="5" />
      <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(-60 16 16)" />
      <circle cx="16" cy="16" r="2" :fill="color"/>
    </template>
  </svg>
</template>

<script setup>
defineProps({
  type: { type: String, required: true },
  color: { type: String, default: '#38bdf8' }
})
</script>
