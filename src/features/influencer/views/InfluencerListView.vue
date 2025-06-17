<script setup>
import { ref, onMounted, computed } from 'vue';
import InfluencerCard from '@/components/common/InfluencerCard.vue'
import CommonFiltering from '@/components/layout/CommonFiltering.vue';
import InfluencerCategory from '@/features/influencer/components/InfluencerCategory.vue';
import PagingBar from '@/components/common/PagingBar.vue';

const influencerList = ref([])
const selectedCategory = ref('전체')

const currentPage = ref(1)
const pageSize = 6

const categoryMap = {
  '전체': 'ALL',
  '일상': 'LifeStyle',
  '동물': 'Pet',
  '애니메이션': 'Animation',
  '엔터테인먼트': 'Entertainment',
  '지식/정보': 'Professional',
  '푸드': 'Food',
  '뷰티/패션': 'Fashion & Beauty',
  '키즈': 'Family & Kids',
  '게임': 'Gaming'
}

onMounted(async () => {
  const res = await fetch('/api/v1/influencer')
  const data = await res.json()
  influencerList.value = data.data
})

const filteredList = computed(() => {
  const selectedTag = categoryMap[selectedCategory.value]

  if (selectedTag === 'ALL') {
    return influencerList.value
  }

  return influencerList.value.filter(item => item.tags.includes(selectedTag))
})

const totalCount = computed(() => filteredList.value.length)
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize))

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredList.value.slice(start, start + pageSize)
})
</script>

<template>
    <div class="w-full min-h-screen bg-background flex font-sans">
        <CommonFiltering />
        <div class="container">
            <div class="page-header">
                <div class="page-title">
                    인플루언서
                    <span class="cnt-search"> (검색 결과: {{ totalCount }}건) </span>
                </div>
            </div>
            <div class="blue-line"></div>

        <InfluencerCategory @update:selected="selectedCategory = $event" />

        <div class="flex flex-1 py-5 ml-5 mr-4 justify-between text-gray-medium text-sm">
          <span>프로필</span>
          <span>유튜브명</span>
          <span>인스타 아이디</span>
          <span>유튜브 구독자 수</span>
          <span>인스타 팔로워 수</span>
          <span>타깃 성별</span>
          <span>타깃 연령대</span>
        </div>

        <div v-for="influencer in paginatedList" :key="influencer.id">
          <InfluencerCard :influencer="influencer" />
        </div>

        <!-- 페이지네이션 -->
        <div class="flex justify-center mt-8">
          <PagingBar
            :totalPages="totalPages"
            :currentPage="currentPage"
            @update:currentPage="(val) => currentPage = val"
          />
        </div>
      </div>
  </div>
</template>
