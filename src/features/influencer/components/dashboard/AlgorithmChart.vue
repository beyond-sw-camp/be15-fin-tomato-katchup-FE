<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'


const props = defineProps({
  data: Object
})

const scoreData = computed(() => {
  if (!props.data) return []

  const { reelsSummary, instagram } = props.data

  const algorithmScore = (reelsSummary.avgViews / instagram.followers) * 100
  const engagement = ((reelsSummary.avgLikes + reelsSummary.avgComments) / reelsSummary.avgViews) * 100
  const activeness = (reelsSummary.count * reelsSummary.avgViews / instagram.followers) * 100

  return [
    { label: '알고리즘 스코어', value: algorithmScore },
    { label: '참여도', value: engagement },
    { label: '활성도', value: activeness }
  ]
})

const getTooltip = (label) => {
  switch (label) {
    case '알고리즘 스코어':
      return '평균 조회수 ÷ 팔로워 수 × 100'
    case '참여도':
      return '(좋아요 + 댓글) ÷ 조회수 × 100'
    case '활성도':
      return '(릴스 수 × 평균 조회수) ÷ 팔로워 수 × 100'
    default:
      return ''
  }
}

const getBarColors = (percent) => {
  const thresholds = [20, 40, 60, 80]
  const colors = ['#FF3B30', '#FF8A65', '#90A4AE', '#7C9CF6', '#5F38E9']
  return thresholds.map(t => percent > t).filter(Boolean).length
}

const getSegmentColor = (segment, percent) => {
  const activeLevel = getBarColors(percent)
  return segment <= activeLevel ? [
    '#FF3B30', '#FF8A65', '#90A4AE', '#7C9CF6', '#5F38E9'
  ][segment - 1] : '#EAEAEA'
}
</script>

<template>
  <div class="dashboard-section">
    <div v-for="score in scoreData" :key="score.label" class="mb-10">
      <div class="flex items-center gap-1 mb-2">
        <h3 class="text-gray-dark font-semibold">{{ score.label }}</h3>
        <div class="relative group">
          <Icon icon="material-symbols:info-outline-rounded" class="w-5 h-5 text-gray-dark cursor-pointer" />

          <div class="absolute left-1/2 -translate-x-1/2 top-8 w-max bg-black text-white text-xs rounded px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-10">
            {{ getTooltip(score.label) }}
          </div>
        </div>
      </div>

      <div class="flex gap-1.5">
        <div v-for="n in 5" :key="n"
             class="h-5 flex-1 rounded-md"
             :style="{ backgroundColor: getSegmentColor(n, score.value) }"
        ></div>
      </div>
    </div>
  </div>
</template>
