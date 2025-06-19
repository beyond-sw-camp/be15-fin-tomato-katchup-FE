<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCampaignDetail, getCampaignHistory } from '@/features/campaign/api.js';
import { Icon } from '@iconify/vue';

import CampaignForm from '@/features/campaign/components/CampaignForm.vue';
import PipelineDiagram from '@/features/campaign/components/PipelineDiagram.vue';
import CampaignHistory from '@/features/campaign/components/CampaignHistory.vue';

const route = useRoute();
const router = useRouter();
const campaignDetail = ref(null);
const campaignHistory = ref(null);
const form = reactive({});
const isEditing = ref(false);

const fetchCampaignDetail = async () => {
    const res = await getCampaignDetail(route.params.campaignId);
    campaignDetail.value = res.data.data;
    Object.assign(form, campaignDetail.value);
};

const fetchCampaignHistory = async () => {
    const res = await getCampaignHistory(route.params.campaignId);
    campaignHistory.value = res.data.data;
};

onMounted(() => {
    fetchCampaignDetail();
    fetchCampaignHistory();
});

const save = () => {
    console.log('저장할 값:', form);
    isEditing.value = false;
};

const cancel = () => {
    Object.assign(form, campaignDetail.value);
    isEditing.value = false;
};

const groups = [
    {
        type: 'horizontal',
        fields: [
            { key: 'title', label: '캠페인명', type: 'input' },
            {
                key: 'status',
                label: '진행 상태',
                type: 'select',
                options: ['진행중', '보류', '완료', '취소'],
            },
        ],
    },
    {
        type: 'horizontal',
        fields: [
            { key: 'startDate', label: '시작일', inputType: 'date' },
            { key: 'endDate', label: '종료일', inputType: 'date' },
        ],
    },
    {
        type: 'horizontal',
        fields: [
            {
                key: 'clientCompany',
                label: '고객사',
                type: 'search-company',
                searchType: 'company',
            },
            {
                key: 'clientManager',
                label: '광고담당자',
                type: 'search-manager',
                searchType: 'manager',
            },
        ],
    },
];
</script>

<template>
    <div class="container">
        <div class="page-header">
            <div class="page-title">캠페인 상세 정보</div>
            <div class="flex justify-end gap-2">
                <button class="btn-delete" @click="isEditing ? cancel() : remove()">
                    {{ isEditing ? '취소' : '삭제' }}
                </button>
                <button class="btn-create" @click="isEditing ? save() : (isEditing = true)">
                    {{ isEditing ? '저장' : '수정' }}
                </button>
                <Icon
                    icon="material-symbols:lists-rounded"
                    width="40"
                    height="40"
                    class="text-btn-gray"
                    @click="router.push('/campaign')"
                />
            </div>
        </div>
        <div class="blue-line"></div>
        <div class="pipeline flex items-center w-full mb-4">
            <PipelineDiagram v-if="campaignDetail" :diagramInfo="campaignDetail.pipeLine" />
        </div>
        <div class="flex">
            <div class="w-1/2">
                <CampaignForm v-model="form" :groups="groups" :isEditing="isEditing" />
            </div>
            <div class="w-1/2 bg-gray-50 p-4 rounded shadow">
                <CampaignHistory v-if="campaignHistory" :campaignHistory="campaignHistory" />
            </div>
        </div>
    </div>
</template>
