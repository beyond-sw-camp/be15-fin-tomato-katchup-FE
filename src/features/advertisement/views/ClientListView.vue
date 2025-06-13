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
        v-for="client in clientList"
        :key="client.id"
        :client="client"
      />
    </div>

    <!-- 페이지네이션 -->
    <div class="flex justify-center mt-8">
      <Pagination :totalPages="5" v-model:currentPage="currentPage" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ClientCard from '../components/ClientCard.vue'
import Pagination from '@/components/common/PagingBar.vue'

const currentPage = ref(1)

const clientList = ref([
  {
    id: 1,
    name: 'ABC 화장품',
    address: '서울특별시 구로구 디지털로 76길 111(구로동)',
    contacts: ['오유경'],
    price: '23,370,000',
  },
  {
    id: 2,
    name: '마니커',
    address: '서울특별시 구로구 디지털로 76길 111(구로동)',
    contacts: ['오유경', '이승재'],
    price: '23,370,000',
  },
  {
    id: 3,
    name: '마니커',
    address: '서울특별시 구로구 디지털로 76길 111(구로동)',
    contacts: ['오유경'],
    price: '23,370,000',
  },
  {
    id: 4,
    name: '마니커',
    address: '서울특별시 구로구 디지털로 76길 111(구로동)',
    contacts: ['오유경'],
    price: '23,370,000',
  },
])

const totalCount = clientList.value.length
</script>
