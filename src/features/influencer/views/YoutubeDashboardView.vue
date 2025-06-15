<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

import DashboardHeader from '@/features/influencer/components/dashboard/DashboardHeader.vue'
import DashboardSummary from '@/features/influencer/components/dashboard/DashboardSummary.vue'
import AgeChart from '@/features/influencer/components/dashboard/AgeChart.vue'
import PopularPosts from '@/features/influencer/components/dashboard/PopularPosts.vue'

const router = useRouter()
const data = ref(null)
const activePlatform = ref('youtube')

onMounted(async () => {
  const res = await fetch('/api/v1/dashboard/instagram')
  const resData = await res.json()
  if (resData.data?.length > 0) {
    data.value = resData.data[0]
  } else {
    data.value = null
  }
})

const summaryData = computed(() => {
  if (!data.value) return {}
  return {
    reels: data.value.reels.count,
    views: `${(data.value.reels.avgViews / 10000).toFixed(1)}만`,
    comments: `${data.value.reels.avgComments}개`,
    likes: `${(data.value.reels.avgLikes / 10000).toFixed(1)}만`
  }
})

const formatSubscribers = (num) => {
  return num >= 10000 ? `${Math.floor(num / 10000)}만명` : `${num}명`
}

const formatFollowers = (num) => {
  return num >= 10000 ? `${Math.floor(num / 10000)}만명` : `${num}명`
}

const goToPlatform = (platform) => {
  activePlatform.value = platform

  if (platform === 'youtube') {
    router.push('/influencer/dashboard/youtube')
  } else if (platform === 'instagram') {
    router.push('/influencer/dashboard/instagram')
  }
}
</script>

<template>
  <div class="w-full min-h-screen bg-background flex items-center justify-center">
    <div v-if="data && data.title">
      <DashboardHeader
        :name="data.title"
        :thumbnail="data.thumbnail"
        :tags="data.tags"
        :subscribers="null"
        :instaFollowers="formatFollowers(data.instagram.followers)"
      />

      <div class="flex gap-3 mb-6">
        <!-- 유튜브 버튼 -->
        <button
          @click="goToPlatform('youtube')"
          :class="[
            'w-28 h-10 rounded-xl text-white font-semibold text-sm shadow-md transition',
            activePlatform === 'youtube'
              ? 'bg-gradient-to-r from-[#FF9999] via-[#FF6666] to-[#CC3333]'
              : 'bg-gradient-to-r from-[#FFCCCC] via-[#FF9999] to-[#FF6666]'
          ]"
        >
          유튜브
        </button>

        <!-- 인스타그램 버튼 -->
        <button
          @click="goToPlatform('instagram')"
          :class="[
            'w-28 h-10 rounded-xl text-white font-semibold text-sm shadow-md transition',
            activePlatform === 'instagram'
              ? 'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4]'
              : 'bg-gradient-to-r from-[#FFDABF] via-[#F5B5D4] to-[#B0B6F0]'
          ]"
        >
          인스타그램
        </button>
      </div>

      <DashboardSummary :data="summaryData" />
      <AgeChart />
      <PopularPosts :posts="data.popularPosts" />
    </div>

    <div v-else class="flex justify-center items-center w-full h-full">
      Loading...
    </div>
  </div>
</template>
