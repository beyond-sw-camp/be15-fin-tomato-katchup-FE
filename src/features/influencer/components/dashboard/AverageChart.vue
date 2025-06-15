<script setup>
import ApexCharts from 'vue3-apexcharts'
import { Icon } from '@iconify/vue';

const props = defineProps({
  daily: Number,
  monthly: Number
})

const series = [{
  data: [props.daily / 10000, props.monthly / 10000]
}]

const categories = ['일 평균 조회 수', '월 평균 조회 수']
</script>

<template>
  <div class="dashboard-section">
    <div class="flex items-center mb-4 px-10 justify-between">
      <!-- 일평균 조회수 -->
      <div class="flex items-center gap-1">
        <h3 class="font-bold text-gray-dark">일 평균 조회수</h3>
        <div class="relative group">
          <Icon icon="material-symbols:info-outline-rounded" class="w-5 h-5 text-gray-dark cursor-pointer" />
          <div class="absolute left-1/2 -translate-x-1/2 top-8 w-max bg-black text-white text-xs rounded px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-10">
            최근 90일간 하루 평균 조회수
          </div>
        </div>
      </div>

      <!-- 월평균 조회수 -->
      <div class="flex items-center gap-1">
        <h3 class="font-bold text-gray-dark">월 평균 조회수</h3>
        <div class="relative group">
          <Icon icon="material-symbols:info-outline-rounded" class="w-5 h-5 text-gray-dark cursor-pointer" />
          <div class="absolute left-1/2 -translate-x-1/2 top-8 w-max bg-black text-white text-xs rounded px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-10">
            최근 1년간 월별 평균 조회수
          </div>
        </div>
      </div>
    </div>

    <ApexCharts
      type="bar"
      height="300"
      :series="series"
      :options="{
        chart: { toolbar: { show: false } },
        colors: ['#5F38E9'],
        plotOptions: {
          bar: {
            columnWidth: '40%',
            borderRadius: 10,
            distributed: true
          }
        },
        dataLabels: {
          enabled: true,
          formatter: val => `${val.toFixed(0)}만`,
          style: { fontSize: '20px', fontWeight: 'bold', colors: '#5F38E9' },
          position: 'top'
        },
        xaxis: {
          categories,
          labels: { style: { fontSize: '14px', colors: '#999' } }
        },
        yaxis: {
          show: false
        },
        grid: { show: false }
      }"
    />
  </div>
</template>
