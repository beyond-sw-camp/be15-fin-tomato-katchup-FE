<script setup>
const props = defineProps({
    diagramInfo: {
        type: Object,
        required: true,
    },
});

const { diagramInfo } = props;

const pipelineSteps = [
    { key: 'chance', label: '기회인지', colorVar: 'bg-pipeline-chance' },
    { key: 'listUp', label: '리스트업', colorVar: 'bg-pipeline-list-up' },
    { key: 'proposal', label: '제안', colorVar: 'bg-pipeline-proposal' },
    { key: 'quotation', label: '견적', colorVar: 'bg-pipeline-quotation' },
    { key: 'negotiation', label: '협상', colorVar: 'bg-pipeline-negotiation' },
    { key: 'contract', label: '계약', colorVar: 'bg-pipeline-contract' },
    { key: 'aftercare', label: '사후관리', colorVar: 'bg-pipeline-aftercare' },
];

const getLastPipelineIndex = (pipeLine) => {
    const keys = Object.keys(pipeLine || {});
    const lastKey = pipelineSteps.findLast((step) => keys.includes(step.key));
    return pipelineSteps.findIndex((step) => step.key === lastKey?.key);
};

const lastPipelineIndex = getLastPipelineIndex(diagramInfo);
</script>

<template>
    <template v-for="(step, index) in pipelineSteps" :key="step.key">
        <div class="step flex-1">
            <div
                :class="[
                    'pipeline-box w-full text-center p-2 rounded-lg text-white h-[60px]',
                    index <= lastPipelineIndex ? step.colorVar : 'bg-gray-300',
                ]"
            >
                <div class="step-label font-semibold">{{ step.label }}</div>
                <div class="step-date text-sm">
                    {{ diagramInfo?.[step.key]?.date || '-' }}
                </div>
            </div>
        </div>

        <div
            v-if="index < pipelineSteps.length - 1"
            :class="[
                'connector w-3 h-3',
                index <= lastPipelineIndex ? step.colorVar : 'bg-gray-300',
            ]"
        ></div>
    </template>
</template>

<style scoped></style>
