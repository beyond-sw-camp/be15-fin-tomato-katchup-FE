\<script setup>
import ApexCharts from 'vue3-apexcharts'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = defineProps({
  platform: String,
  reach: Number,
  followerRate: Number,
  nonFollowerRate: Number
})

const series = computed(() => {
  if (props.followerRate == null || props.nonFollowerRate == null) return []
  return [props.followerRate, props.nonFollowerRate]
})

const labels = ['팔로워', '팔로워가 아닌 사람']

const getTitle = () => {
  return props.platform === 'instagram' ? '도달' : '노출';
}

const getReachText = () => {
  return props.platform === 'instagram' ? '도달한 계정' : '노출 수';
}
</script>

<template>
  <div class="dashboard-section">
      <h3 class="dashboard-title">{{ getTitle() }}</h3>

    <div class="relative w-[300px] ml-6 mt-6">
      <ApexCharts
        v-if="series && series.length > 0"
        type="donut"
        width="320"
        :series="series"
        :options="{
          labels,
          colors: ['#FF62B3', '#8F87F1'],
          stroke: { show: false },
          legend: { position: 'bottom' },
          dataLabels: { enabled: false },
          tooltip: {
            y: {
              formatter: function (val) {
                return `${val.toFixed(1)}%`;
              }
            }
          }
        }"
      />

      <div v-if="series && series.length > 0" class="absolute top-30 left-40 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div class="text-3xl font-extrabold">{{ (props.reach / 10000).toFixed(1) }}만</div>
        <div class="text-gray-400 text-sm mt-1">{{ getReachText() }}</div>
      </div>
    </div>
  </div>
</template>
