<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import DashboardBase from '@/features/influencer/components/DashboardBase.vue'
import DashboardHeader from '@/features/influencer/components/DashboardHeader.vue';
import PopularPosts from '@/features/influencer/components/PopularPosts.vue';
import PopularShortForms from '@/features/influencer/components/PopularShortForms.vue';
import DashboardCampaignList from '@/features/influencer/components/DashboardCampaignList.vue';

const router = useRouter()
const route = useRoute()
const data = ref(null)
const activePlatform = ref('youtube')

const influencerId = route.query.id
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
  router.push(`/influencer/dashboard/${platform}?id=${influencerId}`)
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
        <button @click="goToPlatform('youtube')"
                :class="[
            'w-28 h-10 rounded-xl text-white font-semibold text-sm shadow-md transition',
            activePlatform === 'youtube' ? 'bg-[#CC3333]' : 'bg-[#FFCCCC]'
          ]"
        >유튜브</button>

        <button @click="goToPlatform('instagram')"
                :class="[
            'w-28 h-10 rounded-xl text-white font-semibold text-sm shadow-md transition',
            activePlatform === 'instagram'
              ? 'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4]'
              : 'bg-gradient-to-r from-[#FFDABF] via-[#F5B5D4] to-[#B0B6F0]'
          ]"
        >인스타그램</button>
      </div>

      <DashboardBase :summaryData="summaryData" :data="data" :satisfaction="satisfaction" />
      <PopularPosts :posts="data.popularPosts" />
      <PopularShortForms :reels="data.popularReels" />
      <DashboardCampaignList />
    </div>

    <div v-else class="flex justify-center items-center w-full h-full">Loading...</div>
  </div>
</template>
