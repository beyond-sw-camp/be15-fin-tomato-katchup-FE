<script setup>
import { computed } from 'vue'
import ApexCharts from 'vue3-apexcharts'

const props = defineProps({
  rows: Array,
  activeMetric: String,
})

const categories = computed(() => props.rows.map(row => row[0]))

const metricKeyMap = {
  '조회수': 'views',
  '댓글수': 'comments',
  '좋아요수': 'likes',
  '클릭수': 'clicks',
}

const metricIndexMap = {
  views: 1,
  comments: 2,
  likes: 3,
  clicks: 4,
}

const chartSeries = computed(() => {
  const key = metricKeyMap[props.activeMetric]
  const idx = metricIndexMap[key]
  const data = props.rows.map(row => row[idx] || 0)

  return [
    { name: props.activeMetric, type: 'column', data },
    { name: props.activeMetric + ' trend', type: 'line', data }
  ]
})

const chartOptions = computed(() => ({
  chart: {
    height: 200,
    type: 'line',
    stacked: false
  },
  stroke: {
    width: [0, 1.5],
    curve: 'straight'
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 6,
      borderRadiusApplication: 'end'
    }
  },
  markers: {
    size: 3,
    shape: 'circle',
    colors: ['#ffffff'],
    strokeWidth: 2,
    strokeColors: '#DA001A',
    hover: { sizeOffset: 3 }
  },
  xaxis: {
    categories: categories.value
  },
  yaxis: {
    labels: {
      formatter: (val) => val.toLocaleString()
    }
  },
  colors: ['#5F38E9', '#000000'],
  legend: { show: false },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1],
    formatter: (val) => val.toLocaleString(),
    offsetY: -10,
    style: {
      fontSize: '12px',
      fontWeight: '500',
      colors: undefined
    },
    background: {
      enabled: true,
      backgroundColor: '#ffffff',
      foreColor: '#000000'
    }
  }
}))

</script>

<template>
    <ApexCharts type="line" height="250" :series="chartSeries" :options="chartOptions" />
</template>
