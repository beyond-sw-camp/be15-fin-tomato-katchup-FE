<script setup>
import { Icon } from '@iconify/vue'

import AverageChart from '@/features/influencer/components/chart/AverageChart.vue'
import AlgorithmChart from '@/features/influencer/components/chart/AlgorithmChart.vue'
import ReachChart from '@/features/influencer/components/chart/ReachChart.vue'
import AgeChart from '@/features/influencer/components/chart/AgeChart.vue'
import GenderChart from '@/features/influencer/components/chart/GenderChart.vue'
import FollowerChart from '@/features/influencer/components/chart/FollowerChart.vue'
import DashboardSummary from '@/features/influencer/components/DashboardSummary.vue';

const props = defineProps({
  summaryData: Object,
  data: Object,
  satisfaction: Number
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <DashboardSummary :data="summaryData" />

    <div class="flex gap-8">
      <AverageChart :daily="data.dailyAverageViews" :monthly="data.monthlyAverageViews" class="w-1/3" />
      <AlgorithmChart class="w-1/3" :data="data" />
      <ReachChart :reach="data.reach" :followerRate="data.followerReachRate" :nonFollowerRate="data.nonFollowerReachRate" class="w-1/3" />
    </div>

    <div class="flex gap-8">
      <AgeChart :data="data.demographics.ageGender" class="w-2/3" />
      <GenderChart :data="data.demographics.ageGender" class="w-1/3" />
    </div>

    <div class="flex gap-8">
      <FollowerChart :data="data.followersTrend" class="w-2/3" />
      <div class="dashboard-section w-1/3">
        <div class="dashboard-title">평균 고객 만족도</div>
        <div class="flex justify-center items-center mt-24 gap-14 p-2">
          <Icon icon="hugeicons:smile" class="w-36 h-36 text-graph-line" />
          <p class="text-6xl font-bold">{{ satisfaction }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
