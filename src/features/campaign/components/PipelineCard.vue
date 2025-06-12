<template>
    <div>
        <div v-for="campaign in campaigns" :key="campaign.id" class="campaign-card">
            <div class="campaign-header">
                <Badge :label="campaign.status" status="default" />
                <span class="campaign-title">{{ campaign.title }}</span>
            </div>
            <div class="campaign-info">
                {{ campaign.clientCompany }} | 담당자: {{ campaign.clientManagerName }} ({{
                    campaign.clientManagerRole
                }})<br />
                ₩{{ formatPrice(campaign.price) }}<br />
                기간: {{ campaign.startDate }} ~ {{ campaign.endDate }}
            </div>

            <div class="pipeline">
                <div v-for="step in pipelineSteps" :key="step.key" class="step">
                    <div class="step-label">{{ step.label }}</div>
                    <div class="step-date">{{ campaign.pipeLine[step.key]?.date || '-' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Badge from '@/components/common/Badge.vue';

const { campaigns, pipelineSteps } = defineProps({
    campaigns: {
        type: Array,
        required: true,
    },
    pipelineSteps: {
        type: Array,
        required: true,
    },
});

const formatPrice = (price) => price.toLocaleString();
</script>

<style scoped></style>
