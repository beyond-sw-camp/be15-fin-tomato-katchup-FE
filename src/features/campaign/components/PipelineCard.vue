<template>
    <div>
        <div
            v-for="campaign in campaigns"
            :key="campaign.id"
            class="campaign-card border-1 border-solid border-gray-medium mb-[16px] px-4 py-1"
        >
            <div class="campaign-header mb-2">
                <CampaignBadge :label="campaign.status" status="default" />
                <span class="campaign-title text-lg font-medium">{{ campaign.title }}</span>
            </div>
            <div class="pipeline flex items-center w-full mb-1">
                <template v-for="(step, index) in pipelineSteps" :key="step.key">
                    <div class="step flex-1">
                        <div
                            :class="[
                                'pipeline-box w-full text-center p-2 rounded-lg text-white h-[60px]',
                                index <= getLastPipelineIndex(campaign.pipeLine)
                                    ? step.colorVar
                                    : 'bg-gray-300',
                            ]"
                        >
                            <div class="step-label font-semibold">{{ step.label }}</div>
                            <div class="step-date text-sm">
                                {{ campaign.pipeLine?.[step.key]?.date || '-' }}
                            </div>
                        </div>
                    </div>

                    <div
                        v-if="index < pipelineSteps.length - 1"
                        :class="[
                            `connector w-3 h-3`,
                            index <= getLastPipelineIndex(campaign.pipeLine)
                                ? step.colorVar
                                : 'bg-gray-300',
                        ]"
                    ></div>
                </template>
                <div class="flex items-center gap-2 min-h-[60px]">
                    <span class="success-rate font-medium ml-8">성공 확률</span>
                    <div
                        class="success-rate-box bg-gray-200 relative w-[112px] h-[56px] rounded-lg overflow-hidden flex items-center justify-center"
                    >
                        <div
                            class="absolute top-0 left-0 h-full bg-pipeline-quotation transition-all duration-500 z-0"
                            :style="{ width: `${getSuccessRate(campaign.pipeLine)}%` }"
                        ></div>
                        <div class="relative z-10 text-white text-sm font-bold">
                            {{ getSuccessRate(campaign.pipeLine) }}%
                        </div>
                    </div>
                </div>
            </div>
            <div class="campaign-info text-md text-gray-dark">
                <span class="client-company mr-2">{{ campaign.clientCompany }}</span>
                <span class="bar mx-2">|</span>
                <span class="client-name mx-2"
                    >{{ campaign.clientManagerName }} {{ campaign.clientManagerPosition }}</span
                >
                <span class="bar mx-2">|</span>
                <span class="client-name mx-2">{{ formatPrice(campaign.price) }}</span>
                <span class="bar mx-2">|</span>
                <span class="campaign-term mx-2"
                    >{{ campaign.startDate }} ~ {{ campaign.endDate }}</span
                >
                <span class="bar mx-2">|</span>
                <span class="username ml-2">
                    {{ campaign.username }} {{ campaign.userPosition }}</span
                >
                <!--                {{ campaign.clientCompany }}{{ campaign.clientManagerName }} ({{-->
                <!--                    campaign.clientManagerRole-->
                <!--                }})<br />-->
                <!--                ₩{{ formatPrice(campaign.price) }}<br />-->
                <!--                기간: {{ campaign.startDate }} ~ {{ campaign.endDate }}-->
                <div class="produce-name">{{ campaign.productName }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CampaignBadge from '@/components/common/CampaignBadge.vue';

const { campaigns } = defineProps({
    campaigns: {
        type: Array,
        required: true,
    },
});

const getLastPipelineIndex = (pipeLine) => {
    const keys = Object.keys(pipeLine || {});
    const lastKey = pipelineSteps.findLast((step) => keys.includes(step.key));
    return pipelineSteps.findIndex((step) => step.key === lastKey?.key);
};

const getSuccessRate = (pipeLine) => {
    const filledCount = getLastPipelineIndex(pipeLine) + 1;
    const totalSteps = pipelineSteps.length;
    return Math.round((filledCount / totalSteps) * 100);
};

const pipelineSteps = [
    { key: 'chance', label: '기회인지', colorVar: 'bg-pipeline-chance' },
    { key: 'listUp', label: '리스트업', colorVar: 'bg-pipeline-list-up' },
    { key: 'proposal', label: '제안', colorVar: 'bg-pipeline-proposal' },
    { key: 'quotation', label: '견적', colorVar: 'bg-pipeline-quotation' },
    { key: 'negotiation', label: '협상', colorVar: 'bg-pipeline-negotiation' },
    { key: 'contract', label: '계약', colorVar: 'bg-pipeline-contract' },
    { key: 'aftercare', label: '사후관리', colorVar: 'bg-pipeline-aftercare' },
];

const formatPrice = (price) => price.toLocaleString();
</script>

<style scoped></style>
