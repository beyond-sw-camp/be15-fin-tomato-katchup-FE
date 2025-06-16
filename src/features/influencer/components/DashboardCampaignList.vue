<script setup>
import { ref, computed } from 'vue'

const campaignList = [
  {
    id: 1,
    title: '[ABC사] 토끼 광고',
    post: {
      thumbnail: '/src/assets/images/mock/rabbit.png',
      title: '[광고] 토끼 풀 먹방',
      views: 1200000,
      likes: 17000,
      comments: 10,
      timestamp: '2019-06-01T10:00:00Z',
      permalink: "https://www.instagram.com/reel/123456/"
    }
  },
  {
    id: 2,
    title: '[DEF사] 당근 광고',
    post: {
      thumbnail: '/src/assets/images/mock/rabbit2.png',
      title: '[광고] 당근 폭풍 먹방',
      views: 800000,
      likes: 9000,
      comments: 5,
      timestamp: '2020-03-01T10:00:00Z',
      permalink: 'https://www.instagram.com/reel/123456/'
    }
  }
]

const selectedId = ref(campaignList[0].id)
const selectedCampaign = computed(() => campaignList.find(c => c.id === selectedId.value))

const formatNumber = (num) => num >= 10000 ? `${(num / 10000).toFixed(1)}만` : num
const formatDate = (isoDate) => {
  const diff = (Date.now() - new Date(isoDate)) / (1000 * 60 * 60 * 24 * 365)
  return `${Math.floor(diff)}년전`
}
</script>

<template>
  <div class="dashboard-section">
    <h2 class="dashboard-title">진행 캠페인</h2>
    <div class="flex border border-gray-medium rounded-xl overflow-hidden">
      <!-- 캠페인 리스트 -->
      <div class="w-1/3 border-r border-gray-medium p-4 flex flex-col gap-2">
        <button
          v-for="item in campaignList"
          :key="item.id"
          @click="selectedId = item.id"
          :class="[
            'text-left border border-gray-medium rounded-lg px-3 py-2',
            selectedId === item.id ? 'bg-btn-sky font-bold' : 'bg-white hover:bg-btn-sky'
          ]"
        >
          {{ item.title }}
        </button>
      </div>

      <!-- 캠페인 상세 정보 -->
      <div class="flex p-8 flex-col overflow-hidden hover:shadow-lg rounded-xl transition cursor-pointer">
        <a :href="selectedCampaign.permalink" target="_blank">
          <img :src="selectedCampaign.post.thumbnail" alt="campaign-thumbnail" class="w-96 h-48 rounded object-cover mb-6" />
        </a>
        <div class="flex flex-col gap-1">
          <div class="font-bold text-lg">{{ selectedCampaign.post.title }}</div>
          <div class="text-gray-dark text-sm">
            조회수 {{ formatNumber(selectedCampaign.post.views) }} ·
            좋아요 {{ formatNumber(selectedCampaign.post.likes) }} ·
            댓글 {{ selectedCampaign.post.comments }} ·
            {{ formatDate(selectedCampaign.post.timestamp) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
