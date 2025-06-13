<template>
  <div class="flex items-center justify-center gap-2 mt-10">
    <!-- 이전 버튼 -->
    <button
      class="w-8 h-8 flex items-center justify-center rounded border text-sm text-gray-dark hover:bg-gray-light"
      :disabled="currentPage === 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      &lt;
    </button>

    <!-- 숫자 페이지 -->
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="$emit('update:currentPage', page)"
      :class="[
        'w-8 h-8 rounded flex items-center justify-center text-sm',
        page === currentPage
          ? 'bg-[#0F1C61] text-white border'
          : 'text-gray-dark hover:bg-gray-light'
      ]"
    >
      {{ page }}
    </button>

    <!-- 다음 버튼 -->
    <button
      class="w-8 h-8 flex items-center justify-center rounded border text-sm text-gray-dark hover:bg-gray-light"
      :disabled="currentPage === totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      &gt;
    </button>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  totalPages: { type: Number, required: true },
  currentPage: { type: Number, required: true }
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, props.currentPage - 2)
  let end = Math.min(props.totalPages, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>
