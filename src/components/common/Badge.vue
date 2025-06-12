<template>
    <span :class="badgeClass">
        {{ label }}
    </span>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const { status, label } = defineProps({
    status: { type: String, required: true },
    label: { type: String, required: true },
})

const badgeClass = computed(() => {
    const base = 'inline-block px-3 py-1 rounded-lg text-white text-sm font-medium'

    const colorMap = {
        진행중: 'bg-request',
        종료: 'bg-complete',
        보류: 'bg-onhold',
        거절: 'bg-reject',
        default: 'bg-badge-black',
    }

    return `${base} ${colorMap[status] ?? colorMap.default}`
})
</script>
