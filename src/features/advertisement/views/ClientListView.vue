<script setup>
import { ref, computed } from 'vue'
import ClientCard from '../components/ClientCard.vue'
import PagingBar from '@/components/common/PagingBar.vue'
import CommonFiltering from '@/components/layout/CommonFiltering.vue'

const currentPage = ref(1)
const pageSize = 6

const clientList = ref([
  { id: 1, name: 'ABC 화장품', address: '서울특별시 구로구 디지털로 76길 111(구로동)', contacts: ['오유경'], price: '23,370,000' },
  { id: 2, name: '아모레퍼시픽', address: '서울특별시 구로구 디지털로 76길 111(구로동)', contacts: ['오유경', '이승재'], price: '23,370,000' },
  { id: 3, name: '마니커', address: '서울특별시 구로구 디지털로 76길 111(구로동)', contacts: ['오유경'], price: '23,370,000' },
  { id: 4, name: '마니커', address: '서울특별시 구로구 디지털로 76길 111(구로동)', contacts: ['오유경'], price: '23,370,000' },
  { id: 5, name: '마니커', address: '서울특별시 구로구 디지털로 76길 111(구로동)', contacts: ['오유경'], price: '23,370,000' },
  { id: 6, name: '마니커', address: '서울특별시 구로구 디지털로 76길 111(구로동)', contacts: ['오유경'], price: '23,370,000' },
  { id: 7, name: '마니커', address: '서울특별시 구로구 디지털로 76길 111(구로동)', contacts: ['오유경'], price: '23,370,000' },
  { id: 8, name: '마니커', address: '서울특별시 구로구 디지털로 76길 111(구로동)', contacts: ['오유경'], price: '23,370,000' },
])

const totalCount = clientList.value.length
const totalPages = computed(() => Math.ceil(totalCount / pageSize))

const paginatedClients = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return clientList.value.slice(start, start + pageSize)
})
</script>

<template>
  <div class="w-full min-h-screen bg-background flex font-sans">
    <!-- 사이드바 -->
    <CommonFiltering class="custom-sidebar" />

    <!-- 본문 영역 -->
    <div class="flex flex-col flex-1 container bg-white">

      <!-- 제목 + 등록 버튼 -->
      <div class="page-header">
        <div class="page-title">
          고객사 목록
          <span class="cnt-search">
            (검색 결과: {{ totalCount }}건)
          </span>
        </div>

        <!-- 등록 버튼 -->
        <RouterLink to="/management/client/new" class="btn-create">등록</RouterLink>
      </div>

      <!-- 구분선 -->
      <div class="blue-line"></div>

      <!-- 카드 리스트 -->
      <div class="grid grid-cols-2 gap-x-6 gap-y-6 px-4">
        <ClientCard
          v-for="client in paginatedClients"
          :key="client.id"
          :client="client"
        />
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
