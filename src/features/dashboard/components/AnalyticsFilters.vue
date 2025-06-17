<script setup>
const props = defineProps({
  activeMetric: String,
  activePeriod: String,
})

const emit = defineEmits(['update:metric', 'update:period'])
</script>

<template>
  <div class="flex gap-4 justify-between text-xs">
    <div class="flex gap-2">
      <button v-for="metric in ['조회수','댓글수','좋아요수','클릭수']"
              :key="metric"
              :class="['px-3 py-1 rounded-md', activeMetric === metric ? 'bg-btn-sky text-white' : 'text-black']"
              @click="$emit('update:metric', metric)">
        {{ metric }}
      </button>
    </div>

    <div class="flex gap-0 ml-4">
      <button
        v-for="(period, index) in ['일간','주간','월간']"
        :key="period"
        :class="[
          'px-3 py-1 border border-gray-medium',
          activePeriod === period ? 'bg-click text-white' : 'bg-white',
          index === 0 ? 'rounded-l-md' : '',
          index === 2 ? 'rounded-r-md' : '',
          index !== 0 ? '-ml-px' : ''
        ]"
        @click="$emit('update:period', period)"
      >
        {{ period }}
      </button>
    </div>
  </div>
</template>
