<template>
    <div class="container">
        <div class="page-header">
            <div class="page-title">
                파이프라인
                <span class="cnt-search">
                    (검색결과: {{ total }}건)
                </span>
            </div>
          <button class="btn-create">등록</button>
        </div>
      <div class="blue-line"></div>
        <PipelineCard :campaigns="campaigns" />

        <div class="pagination">
            <button @click="prevPage" :disabled="page === 1">이전</button>
            <span>Page {{ page }}</span>
            <button @click="nextPage" :disabled="page >= totalPages">다음</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCampaignList } from '@/features/campaign/api.js';
import PipelineCard from '@/features/campaign/components/PipelineCard.vue';

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

onMounted(async () => {
    await fetchCampaigns();
});

const prevPage = () => {
    if (page.value > 1) {
        page.value--;
        fetchCampaigns();
    }
};

const nextPage = () => {
    if (page.value < totalPages.value) {
        page.value++;
        fetchCampaigns();
    }
};
</script>

<style scoped></style>
