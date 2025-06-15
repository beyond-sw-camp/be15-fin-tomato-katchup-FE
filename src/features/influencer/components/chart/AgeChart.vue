<script setup>
import ApexCharts from 'vue3-apexcharts'

const props = defineProps({ data: Array })

const series = [{
    name: '팔로워 비율',
    data: props.data.map(item => item.male + item.female + item.other)
}]

const categories = props.data.map(item => `만 ${item.ageRange}세`)
</script>

<template>
    <div class="dashboard-section">
        <p class="dashboard-title">팔로워 연령대</p>
        <ApexCharts
            type="bar"
            height="300"
            :series="series"
            :options="{
                chart: { toolbar: { show: false } },
                colors: ['#5F38E9'], // 바 색상 변경
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    dataLabels: { position: 'top' } // 바 위에 숫자
                  }
                },
                dataLabels: { enabled: false },  // 바 안의 숫자 제거
                xaxis: {
                  categories,
                  labels: { style: { fontSize: '14px', colors: '#333' } }
                }
            }"
        />
    </div>
</template>

