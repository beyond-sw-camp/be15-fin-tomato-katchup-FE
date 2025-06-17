<script setup>
import ApexCharts from 'vue3-apexcharts'

const props = defineProps({
  platform: String,
  data: Array
})

const totalMale = props.data.reduce((sum, item) => sum + item.male, 0)
const totalFemale = props.data.reduce((sum, item) => sum + item.female, 0)
const totalOther = props.data.reduce((sum, item) => sum + item.other, 0)

const series = [totalMale, totalFemale, totalOther]
const labels = ['남성', '여성', '사용자 지정']
const total = totalMale + totalFemale + totalOther

const chartTitle = props.platform === 'instagram' ? '팔로워 성별 비율' : '구독자 성별 비율'
</script>

<template>
  <div class="dashboard-section">
    <p class="dashboard-title">{{ chartTitle }}</p>

    <div class="flex justify-center items-center">
      <div class="relative">
        <ApexCharts
          type="pie"
          width="300"
          :series="series"
          :options="{
            labels,
            colors: ['#A2C9F4', '#F6A6B2', '#D9D9D9'],
            legend: { position: 'bottom' },
            dataLabels: { enabled: false },
            tooltip: {
              y: {
                formatter: function (val) {
                  const percent = (val / total * 100).toFixed(1);
                  return `${val}명 (${percent}%)`;
                }
              }
            },
            stroke: { show: false }
          }"
        />
      </div>
    </div>
  </div>
</template>
