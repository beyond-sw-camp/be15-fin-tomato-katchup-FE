<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:selected'])

const categories = [
  '전체',
  '엔터테인먼트',
  '일상',
  '푸드',
  '동물',
  '키즈',
  '애니메이션',
  '게임',
  '지식/정보',
  '뷰티/패션'
]

const selected = ref('전체')

const selectCategory = (category) => {
  selected.value = category
  emit('update:selected', category)
}
</script>

<template>
  <div class="flex gap-5 mb-10">
    <button
      v-for="category in categories"
      :key="category"
      @click="selectCategory(category)"
      :class="[
        'px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200',
        selected === category
          ? 'bg-btn-sky text-white'
          : 'text-click hover:text-black hover:bg-gray-light'
      ]"
    >
      {{ category }}
    </button>
  </div>
</template>

