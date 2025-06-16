<script setup>
import ApexCharts from 'vue3-apexcharts'

const props = defineProps({
  platform: String,
  data: Array
})

const series = [{
  name: props.platform === 'instagram' ? '팔로워 비율' : '구독자 비율',
  data: props.data.map(item => item.male + item.female + item.other)
}]

const categories = props.data.map(item => `만 ${item.ageRange}세`)

const chartTitle = props.platform === 'instagram' ? '팔로워 연령대' : '구독자 연령대'
</script>

<template>
  <div class="dashboard-section">
    <p class="dashboard-title">{{ chartTitle }}</p>
    <ApexCharts
      type="bar"
      height="250"
      :series="series"
      :options="{
        chart: { toolbar: { show: false } },
        colors: ['#5F38E9'],
        plotOptions: {
          bar: { borderRadius: 10, dataLabels: { position: 'top' } }
        },
        dataLabels: { enabled: false },
        xaxis: {
          categories,
          labels: { style: { fontSize: '14px', colors: '#333' } }
        }
      }"
    />
  </div>
</template>
