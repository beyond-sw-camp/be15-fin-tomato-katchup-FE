<script setup>
import { ref, onMounted, computed } from 'vue';
import InfluencerCard from '@/components/common/InfluencerCard.vue'
import CommonFiltering from '@/components/layout/CommonFiltering.vue';
import Category from '@/features/influencer/components/Category.vue';
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
      <CommonFiltering class="sticky top-0 w-[304px] h-screen bg-white shadow-md z-10" />

      <div class="container">
        <div class="page-header">
          <div class="page-title">
            인플루언서
            <span class="cnt-search">
              (검색 결과: {{ totalCount }}건)
            </span>
          </div>
        </div>
        <div class="blue-line"></div>

        <Category @update:selected="selectedCategory = $event" />

        <div class="flex flex-1 p-3 ml-4 mr-10 justify-between">
          <h4>프로필</h4>
          <h4>유튜브명</h4>
          <h4>인스타 아이디</h4>
          <h4>유튜브 구독자 수</h4>
          <h4>인스타 팔로워 수</h4>
          <h4>타깃 성별</h4>
          <h4>타깃 연령대</h4>
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
