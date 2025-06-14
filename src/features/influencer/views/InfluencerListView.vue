<script setup>
import { ref, onMounted, computed } from 'vue';
import InfluencerCard from '@/components/common/InfluencerCard.vue'
import CommonFiltering from '@/components/layout/CommonFiltering.vue';
import Category from '@/features/influencer/components/Category.vue';

const influencerList = ref([])
const selectedCategory = ref('전체')

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
</script>

<template>
  <div class="w-full min-h-screen bg-background flex font-sans">
      <CommonFiltering class="sticky top-0 w-[304px] h-screen bg-white shadow-md z-10" />

      <div class="container">
        <h1 class="text-2xl font-bold mb-3">인플루언서</h1>
        <hr class="border-t-3 border-btn-blue my-8" />

        <Category @update:selected="selectedCategory = $event" />

        <div class="flex flex-1 p-3 ml-4 justify-between">
          <h4>프로필</h4>
          <h4>유튜브명</h4>
          <h4>인스타 아이디</h4>
          <h4>유튜브 구독자 수</h4>
          <h4>인스타 팔로워 수</h4>
          <h4>타깃 성별</h4>
          <h4>타깃 연령대</h4>
        </div>

        <div v-for="influencer in filteredList" :key="influencer.id">
          <InfluencerCard :influencer="influencer" />
        </div>
      </div>
  </div>
</template>
