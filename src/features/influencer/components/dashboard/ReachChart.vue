<script setup>
import ApexCharts from 'vue3-apexcharts'
import { Icon } from '@iconify/vue'

const props = defineProps({
  reach: Number,
  followerRate: Number,
  nonFollowerRate: Number
})

const series = [props.followerRate, props.nonFollowerRate]
const labels = ['팔로워', '팔로워가 아닌 사람']

</script>

<template>
    <div class="dashboard-section relative">
        <div class="flex flex-row items-center gap-1 mb-4">
            <h3 class="font-bold text-gray-dark">도달</h3>
            <Icon icon="material-symbols:info-outline-rounded" class="w-5 h-5 text-gray-dark" />
        </div>

    <ApexCharts
      type="donut"
      width="380"
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

    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center">
      <div class="text-3xl font-extrabold text-gray-800">{{ (props.reach / 10000).toFixed(1) }}만</div>
      <div class="text-gray-400 text-sm mt-1">도달한 계정</div>
    </div>
  </div>
</template>

