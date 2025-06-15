<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  platform: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

const summary = computed(() => {
  if (!props.data) {
    return {
      avgViews: 0, avgLikes: 0, avgComments: 0,
      averageViewCount: 0, likeCount: 0, commentCount: 0,
      count: 0
    }
  }
  return props.platform === 'instagram'
    ? (props.data.reelsSummary ?? { avgViews: 0, avgLikes: 0, avgComments: 0, count: 0 })
    : (props.data.shortsSummary ?? { averageViewCount: 0, likeCount: 0, commentCount: 0, count: 0 })
})

const followers = computed(() => {
  if (!props.data) return 1
  return props.platform === 'instagram'
    ? (props.data.instagram?.followers ?? 1)
    : (parseInt(props.data.channel?.subscriberCount ?? '1'))
})

const safeDivide = (a, b) => (!b || isNaN(b)) ? 0 : a / b

const scoreData = computed(() => {
  const s = summary.value
  const f = followers.value

  const avgViews = s.avgViews ?? s.averageViewCount ?? 0
  const avgLikes = s.avgLikes ?? s.likeCount ?? 0
  const avgComments = s.avgComments ?? s.commentCount ?? 0
  const count = s.count ?? 0

  const algorithmScore = safeDivide(avgViews, f) * 100
  const engagement = safeDivide(avgLikes + avgComments, avgViews) * 100
  const activeness = safeDivide(count * avgViews, f) * 100

  return [
    { label: '알고리즘 스코어', value: algorithmScore },
    { label: '참여도', value: engagement },
    { label: '활성도', value: activeness }
  ]
})

const tooltipMap = {
  '알고리즘 스코어': '평균 조회수 ÷ 팔로워(구독자) 수 × 100',
  '참여도': '(좋아요 + 댓글) ÷ 조회수 × 100',
  '활성도': '(게시물 수 × 평균 조회수) ÷ 팔로워(구독자) 수 × 100'
}

const barColors = ['#FF3B30', '#FF8A65', '#90A4AE', '#7C9CF6', '#5F38E9']
const thresholds = [20, 40, 60, 80]
const getActiveLevel = percent => thresholds.filter(t => percent > t).length
const getSegmentColor = (segment, percent) => {
  const level = getActiveLevel(percent)
  return segment <= level + 1 ? barColors[segment - 1] : '#EAEAEA'
}
</script>

<template>
  <div class="dashboard-section space-y-16">
    <div v-for="score in scoreData" :key="score.label" class="space-y-3">
      <div class="flex items-center gap-1">
        <h3 class="text-gray-dark font-semibold">{{ score.label }}</h3>
        <div class="relative group">
          <Icon icon="material-symbols:info-outline-rounded" class="w-5 h-5 text-gray-dark cursor-pointer" />
          <div class="absolute left-1/2 -translate-x-1/2 top-8 w-max bg-black text-white text-xs rounded px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-10">
            {{ tooltipMap[score.label] }}
          </div>
        </div>
      </div>

      <div class="flex gap-1.5">
        <div
          v-for="n in 5"
          :key="n"
          class="h-6 flex-1"
          :class="{
            'rounded-l-lg': n === 1,
            'rounded-r-lg': n === 5
          }"
          :style="{ backgroundColor: getSegmentColor(n, score.value) }"
        ></div>
      </div>
    </div>
  </div>
</template>
