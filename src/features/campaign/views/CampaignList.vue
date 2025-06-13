<template>
    <div class="container">
        <div class="header mb-4">
            <div class="flex justify-between items-center">
                <span>(검색결과: {{ total }}건)</span>
                <button
                    class="px-4 py-2 bg-btn-gray text-white rounded-lg hover:brightness-95 active:brightness-90 transition"
                >
                    등록
                </button>
            </div>
            <div class="w-full h-px bg-gray-300 my-4"></div>
        </div>

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
