<script setup>
import { onMounted, ref } from 'vue';
import { getCampaignDetail } from '@/features/campaign/api.js';
import { useRoute } from 'vue-router';
import PipelineDiagram from '@/features/campaign/components/PipelineDiagram.vue';

const campaignDetail = ref(null);
const route = useRoute();

const fetchCampaignDetail = async () => {
    const campaignId = route.params.campaignId;
    const res = await getCampaignDetail(campaignId);
    campaignDetail.value = res.data.data;
};

onMounted(fetchCampaignDetail);
</script>

<template>
    <div class="container">
        <div class="campaign-detail-header"></div>

        <div v-if="campaignDetail">
            <div>{{ campaignDetail }}</div>
            <div class="pipeline flex items-center w-full mb-1">
                <PipelineDiagram :diagramInfo="campaignDetail.pipeLine" />
            </div>
            <div class="campaign-info">
                <div class="chance-info"></div>
            </div>
        </div>

        <div v-else>Loading...</div>
    </div>
</template>

<style scoped></style>
