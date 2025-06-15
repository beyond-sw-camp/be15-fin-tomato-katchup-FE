<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

import DashboardSummary from '@/features/influencer/components/dashboard/DashboardSummary.vue';
import AgeChart from '@/features/influencer/components/dashboard/AgeChart.vue';
import PopularPosts from '@/features/influencer/components/dashboard/PopularPosts.vue';
import DashboardHeader from '@/features/influencer/components/dashboard/DashboardHeader.vue';
import PopularReels from '@/features/influencer/components/dashboard/PopularReels.vue';
import GenderChart from '@/features/influencer/components/dashboard/GenderChart.vue';
import FollowerChart from '@/features/influencer/components/dashboard/FollowerChart.vue';
import AverageChart from '@/features/influencer/components/dashboard/AverageChart.vue';
import ReachChart from '@/features/influencer/components/dashboard/ReachChart.vue';
import AlgorithmChart from '@/features/influencer/components/dashboard/AlgorithmChart.vue';

const router = useRouter()
const data = ref(null)
const activePlatform = ref('instagram')

const influencerId = 1
const satisfaction = ref(92.5)

onMounted(async () => {
  const res = await fetch(`/api/v1/dashboard/instagram?id=${influencerId}`)
  const resData = await res.json()
  data.value = resData.data
})

const summaryData = computed(() => {
  if (!data.value?.reelsSummary) {
    return { reels: 0, views: '0만', comments: '0개', likes: '0만' }
  }
  return {
    reels: data.value.reelsSummary.count,
    views: `${(data.value.reelsSummary.avgViews / 10000).toFixed(1)}만`,
    comments: `${data.value.reelsSummary.avgComments}개`,
    likes: `${(data.value.reelsSummary.avgLikes / 10000).toFixed(1)}만`
  }
})

const formatFollowers = (num) => {
  return num >= 10000 ? `${Math.floor(num / 10000)}만명` : `${num}명`
}

const goToPlatform = (platform) => {
  activePlatform.value = platform
  router.push(`/influencer/dashboard/${platform}`)
}
</script>

<template>
  <div class="w-full min-h-screen bg-background flex items-center justify-center">
    <div v-if="data">
      <DashboardHeader
        :name="data.title"
        :thumbnail="data.thumbnail"
        :tags="data.tags"
        :subscribers="null"
        :instaFollowers="formatFollowers(data.instagram.followers)"
      />

      <div class="flex gap-3 mb-6">
        <button
          @click="goToPlatform('youtube')"
          :class="[
            'w-28 h-10 rounded-xl text-white font-semibold text-sm shadow-md transition',
            activePlatform === 'youtube'
              ? 'bg-gradient-to-r from-[#FF9999] via-[#FF6666] to-[#CC3333]'
              : 'bg-gradient-to-r from-[#FFCCCC] via-[#FF9999] to-[#FF6666]'
          ]"
        >유튜브</button>

        <button
          @click="goToPlatform('instagram')"
          :class="[
            'w-28 h-10 rounded-xl text-white font-semibold text-sm shadow-md transition',
            activePlatform === 'instagram'
              ? 'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4]'
              : 'bg-gradient-to-r from-[#FFDABF] via-[#F5B5D4] to-[#B0B6F0]'
          ]"
        >인스타그램</button>
      </div>

      <DashboardSummary :data="summaryData" />
      <div class="flex gap-8 mb-8">
          <AverageChart
              :daily="data.dailyAverageViews"
              :monthly="data.monthlyAverageViews"
              class="w-1/3"
          />
          <AlgorithmChart class="w-1/3" :data="data" />
          <ReachChart
              :reach="data.reach"
              :followerRate="data.followerReachRate"
              :nonFollowerRate="data.nonFollowerReachRate"
              class="w-1/3"
          />
      </div>
      <div class="flex gap-8 mb-8">
          <AgeChart :data="data.demographics.ageGender" class="w-2/3" />
          <GenderChart :data="data.demographics.ageGender" class="w-1/3" />
      </div>
      <div class="flex gap-8 mb-8">
          <FollowerChart :data="data.followersTrend" class="w-2/3"/>
          <div class="dashboard-section w-1/3">
              <div class="dashboard-title">평균 고객 만족도</div>
                  <div class="flex justify-center items-center mt-24 gap-14 p-2">
                      <Icon icon="hugeicons:smile" class="w-36 h-36 text-graph-line"/>
                      <p class="text-6xl font-bold">{{ satisfaction }}</p>
                  </div>
          </div>
      </div>
      <PopularPosts :posts="data.popularPosts" />
      <PopularReels :reels="data.popularReels" />
    </div>

    <div v-else class="flex justify-center items-center w-full h-full">Loading...</div>
  </div>
</template>
