<script setup>
import ApexCharts from 'vue3-apexcharts'

const props = defineProps({ data: Array })

const totalMale = props.data.reduce((sum, item) => sum + item.male, 0)
const totalFemale = props.data.reduce((sum, item) => sum + item.female, 0)
const totalOther = props.data.reduce((sum, item) => sum + item.other, 0)

const series = [totalMale, totalFemale, totalOther]
const labels = ['남성', '여성', '사용자 지정']

// 전체 총합 미리 계산
const total = totalMale + totalFemale + totalOther
</script>

<template>
  <div class="dashboard-section">
    <p class="dashboard-title">팔로워 성별 비율</p>
    <ApexCharts
      type="pie"
      width="380"
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
</template>
