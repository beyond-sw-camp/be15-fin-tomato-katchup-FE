<template>
  <div class="flex flex-col w-full px-8 pt-6">
    <!-- 상단 텍스트 -->
    <div class="mb-4 text-lg font-bold text-black">
      고객사 목록
      <span class="text-sm font-normal text-gray-medium">(검색 결과: {{ totalCount }}건)</span>
    </div>

    <!-- 카드 리스트 -->
    <div class="grid grid-cols-2 gap-6">
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
</template>

<script setup>
import { ref, computed } from 'vue'
import ClientCard from '../components/ClientCard.vue'
import PagingBar from '@/components/common/PagingBar.vue'

const currentPage = ref(1)
const pageSize = 6

const clientList = ref([
  { id: 1, name: 'ABC 화장품', address: '서울특별시 구로구 디지털로 76길 111(구로동)', contacts: ['오유경'], price: '23,370,000' },
  { id: 2, name: '마니커', address: '서울특별시 구로구 디지털로 76길 111(구로동)', contacts: ['오유경', '이승재'], price: '23,370,000' },
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
