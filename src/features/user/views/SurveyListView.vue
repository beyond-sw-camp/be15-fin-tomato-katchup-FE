<script setup>

import CommonFiltering from '@/components/layout/CommonFiltering.vue';
import PagingBar from '@/components/common/PagingBar.vue';
import SatisfactionCard from '@/features/user/components/SatisfactionCard.vue';
import ChartCard from '@/features/user/components/ChartCard.vue';
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

const satisfactionList = ref([])
const currentPage = ref(1)
const itemsPerPage = 10

//
const fetchSatisfactionList = async () => {
    try {
        const res = await axios.get('/api/v1/management/survey')
        satisfactionList.value = res.data.data
    } catch (err) {
        console.error('데이터 불러오기 실패:', err)
    }
}

onMounted(fetchSatisfactionList)

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return satisfactionList.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() =>
    Math.ceil(satisfactionList.value.length / itemsPerPage)
)

</script>

<template>
    <div class="w-full min-h-screen bg-background flex">
        <CommonFiltering />

        <div class="flex flex-col flex-1 container bg-white">
            <!-- 제목 + 등록 버튼 -->
            <div class="page-header">
                <div class="page-title">
                    만족도 조사 목록
                    <span class="text-sm text-gray-400 ml-1">
              (검색 결과: {{ satisfactionList.length }}건)
            </span>
                </div>
            </div>
            <div class="blue-line"></div>

            <div class="grid grid-cols-2 gap-x-20 gap-y-20 px-6">
                <ChartCard />
                <SatisfactionCard />
            </div>

            <table class="w-full text-sm text-center border-t mt-10 border-gray-400">
                <thead class="text-sm font-semibold border-b border-gray-400">
                <tr>
                    <th class="py-2">고객</th>
                    <th>회사명</th>
                    <th>진행 캠페인</th>
                    <th>발송일</th>
                    <th>응답일</th>
                    <th>응답 상태</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in paginatedList" :key="item.id">
                    <td class="py-2">{{ item.name }}</td>
                    <td>{{ item.company }}</td>
                    <td>{{ item.campaign}}</td>
                    <td>{{ item.date_sent }}</td>
                    <td>{{ item.date_reacted }}</td>
                    <td>{{ item.status }}</td>
                </tr>
                </tbody>
            </table>

            <!-- 페이지네이션 -->
            <div class="flex justify-center mt-8 mb-8">
                <PagingBar
                    :totalPages="totalPages"
                    :currentPage="currentPage"
                    @update:currentPage="(val) => (currentPage = val)"
                />
            </div>

        </div>
    </div>
</template>

<style scoped>

</style>
