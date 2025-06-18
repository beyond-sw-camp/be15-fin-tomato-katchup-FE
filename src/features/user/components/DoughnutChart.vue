<script setup>
import { Doughnut } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(ChartDataLabels)
ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartData = {
    labels: ['응답', '미응답'],
    datasets: [
        {
            label: '응답 비율',
            data: [50, 50],
            backgroundColor: ['#5F38E9', '#EAEAEA'],
            hoverOffset: 12,
        },
    ],
}

const chartOptions = {
    responsive: true,
    cutout: '45%', // 도넛 두께 조절
    layout: {
        padding: 12,
    },
    plugins: {
        legend: {
            position: 'right',
            align: 'start',
        },
        datalabels: {
            color: ['#FFFFFF', '#000000'],
            formatter: (value, context) => {
                const total = context.chart._metasets[0].total || context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = ((value / total) * 100).toFixed(0)
                return `${percentage}%`
            },
            font: {
                weight: 'bold',
                size: 12,
            },
        },
    },
}

</script>

<template>
    <div style="width: 280px; height: 265px; overflow: visible;">
        <Doughnut :data="chartData" :options="chartOptions" />
    </div>
</template>

<style scoped>

</style>
