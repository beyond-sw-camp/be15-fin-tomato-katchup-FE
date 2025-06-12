<template>
    <div class="container">
        <div class="header">
            <div>(검색결과: {{ total }}건)</div>
        </div>
        <PipelineCard :campaigns="campaigns" :pipelineSteps="pipelineSteps" />

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

const pipelineSteps = [
    { key: 'chance', label: '기획' },
    { key: 'listUp', label: '리스트업' },
    { key: 'proposal', label: '제안' },
    { key: 'negotiation', label: '협상' },
];

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

const formatPrice = (price) => price.toLocaleString();
</script>

<style scoped></style>
