<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue'

import DashboardBase from '@/features/influencer/components/DashboardBase.vue'
import DashboardHeader from '@/features/influencer/components/DashboardHeader.vue'
import PopularPosts from '@/features/influencer/components/PopularPosts.vue'
import PopularShortForms from '@/features/influencer/components/PopularShortForms.vue'
import DashboardCampaignList from '@/features/influencer/components/DashboardCampaignList.vue'
import { useToast } from 'vue-toastification';

const route = useRoute()
const router = useRouter()
const toast = useToast()
const data = ref(null)
const satisfaction = ref(92.5)

const influencerId = route.query.id

onMounted(async () => {
  const res = await fetch(`/api/v1/dashboard/instagram?id=${influencerId}`)
  const resData = await res.json()

  if (!resData.data) {
    toast.warning('인스타그램 계정이 연결되어있지 않습니다.');
    router.replace(`/influencer/dashboard/youtube?id=${influencerId}`);
  }

  data.value = resData.data
})

const summaryData = computed(() => {
  if (!data.value?.reelsSummary) {
    return { shorts: 0, views: '0만', comments: '0개', likes: '0만' }
  }
  return {
    shorts: data.value.reelsSummary.count,
    views: `${(data.value.reelsSummary.avgViews / 10000).toFixed(1)}만`,
    comments: `${data.value.reelsSummary.avgComments}개`,
    likes: `${(data.value.reelsSummary.avgLikes / 10000).toFixed(1)}만`
  }
})

const formatFollowers = (num) => {
  const parsedNum = parseInt(num)
  return parsedNum >= 10000 ? `${Math.floor(parsedNum / 10000)}만명` : `${parsedNum}명`
}

const goToPlatform = (platform) => {
  router.push(`/influencer/dashboard/${platform}?id=${influencerId}`);
}

const goToList = () => {
  router.push(`/influencer/list`);
}
</script>

<template>
  <div class="w-full min-h-screen flex items-center justify-center">
    <div v-if="data">
      <div class="sticky top-10 flex justify-end">
        <button
          @click="goToList"
          class="flex items-center gap-2 px-4 py-2 mb-5 bg-btn-blue text-white font-bold rounded-md"
        >
          나가기
          <Icon icon="tabler:door-exit" width="24" height="24" />
        </button>
      </div>
      <DashboardHeader
        :name="data.title"
        :thumbnail="data.thumbnail"
        :tags="data.tags"
        :instaFollowers="formatFollowers(data.instagram.followers)"
      />

      <DashboardBase
        :platform="'instagram'"
        :summaryData="summaryData"
        :data="data"
        :satisfaction="satisfaction"
        @switch="goToPlatform"
      />

      <PopularPosts
        :platform="'instagram'"
        :items="data.popularPosts"
      />

      <PopularShortForms
        :platform="'instagram'"
        :items="data.popularReels"
      ></PopularShortForms>

      <DashboardCampaignList />
    </div>

    <div v-else class="flex justify-center items-center w-full h-full">Loading...</div>
  </div>
</template>
