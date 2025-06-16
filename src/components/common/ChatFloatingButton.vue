<template>
  <button
    class="fixed bottom-6 right-6 z-50
           w-14 h-14 rounded-full
           bg-[--color-request]
           border border-[--color-btn-sky]
           text-white text-2xl
           shadow-lg
           hover:scale-105 active:scale-95
           transition duration-200 ease-in-out
           flex items-center justify-center"
    @click="$emit('toggle')"
  >
    <Icon icon="mdi:chat" class="w-8 h-8" style="color: var(--color-btn-sky)" />
  </button>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineEmits(['toggle'])
</script>

<style scoped>

</style>
