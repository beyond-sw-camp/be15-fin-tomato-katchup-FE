<template>
    <div class="container">
        <div class="page-header">
            <div class="page-title">
                파이프라인
                <span class="cnt-search">(검색결과: {{ total }}건)</span>
            </div>
            <button class="btn-create" @click="router.push('/campaign/create')">등록</button>
        </div>

        <div class="blue-line"></div>

        <PipelineCard :campaigns="campaigns" />

        <!-- 페이지네이션 컴포넌트 적용 -->
        <Pagination
            :current-page="page"
            :total-pages="totalPages"
            @update:currentPage="handlePageChange"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCampaignList } from '@/features/campaign/api.js';
import PipelineCard from '@/features/campaign/components/PipelineCard.vue';
import Pagination from '@/components/common/PagingBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const campaigns = ref([]);
const page = ref(1);
const size = ref(10);
const total = ref(0);

const totalPages = computed(() => Math.ceil(total.value / size.value));

const fetchCampaigns = async () => {
    const res = await getCampaignList(page.value, size.value);
    campaigns.value = res.data.data;
    total.value = res.data.total;
};

onMounted(fetchCampaigns);

const handlePageChange = async (newPage) => {
    page.value = newPage;
    await fetchCampaigns();
};
</script>
