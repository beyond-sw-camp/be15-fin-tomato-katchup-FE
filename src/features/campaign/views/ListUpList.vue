<script setup>
import { useRouter } from 'vue-router';
import { getListUpList } from '@/features/campaign/api.js';
import { computed, onMounted, ref } from 'vue';
import SalesCards from '@/features/campaign/components/SalesCards.vue';
import SalesFiltering from '@/components/layout/SalesFiltering.vue';
import Pagination from '@/components/common/PagingBar.vue';

const router = useRouter();

const listupList = ref([]);
const page = ref(1);
const size = ref(10);
const total = ref(0);
const totalPages = computed(() => Math.ceil(total.value / size.value));

const categoryOptions = [
    { value: 'title', label: '제목' },
    { value: 'clientCompany', label: '고객사' },
    { value: 'user', label: '담당자' },
];

const filterOptions = [
    { value: 'approved', label: '승인완료' },
    { value: 'request', label: '승인요청' },
    { value: 'onhold', label: '보류/대기' },
    { value: 'rejected', label: '거절됨' },
];

const searchFilters = ref({
    category: '',
    keyword: '',
    manager: null,
    filter: '',
    sort: 'date',
    sortOrder: 'asc',
});

// 목록 불러오기
const fetchListUpList = async () => {
    try {
        const res = await getListUpList(page.value, size.value, searchFilters.value);
        listupList.value = res.data.data;
        total.value = res.data.total;
    } catch (e) {
        console.error(e);
    }
};

onMounted(fetchListUpList);

const handlePageChange = async (newPage) => {
    page.value = newPage;
    await fetchListUpList();
};

const handleSearch = () => {
    page.value = 1;
    fetchListUpList();
};

const goDetail = (id) => {
    router.push(`/sales/listup/${id}`);
};

const handleDelete = (id) => {
    listupList.value = listupList.value.filter((item) => item.id !== id);
};

const menuOpenId = ref(null);
const toggleMenu = (id) => {
    menuOpenId.value = menuOpenId.value === id ? null : id;
};
</script>

<template>
    <div class="flex">
        <SalesFiltering
            v-model="searchFilters"
            :categoryOptions="categoryOptions"
            :filterOptions="filterOptions"
            @search="handleSearch"
        />

        <div class="container">
            <div class="grid grid-cols-2 gap-6">
                <SalesCards
                    v-for="listup in listupList"
                    :key="listup.id"
                    :management-option="listup"
                    :openMenuId="menuOpenId"
                    :pageType="'listup'"
                    @menuToggle="toggleMenu"
                    @delete="handleDelete"
                    @click="goDetail(listup.id)"
                />
            </div>

            <Pagination
                :currentPage="page"
                :totalPages="totalPages"
                @update:currentPage="handlePageChange"
            />
        </div>
    </div>
</template>
