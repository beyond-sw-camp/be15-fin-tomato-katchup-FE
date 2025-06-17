<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { createCampaign } from '@/features/campaign/api.js';
import CreateCampaignForm from '@/features/campaign/components/CreateCampaignForm.vue';

const router = useRouter();
const form = reactive({
    title: '',
    requestDate: '',
    clientCompany: null,
    clientManager: null,
    period: '',
    announcementDate: '',
    pipeline: '',
    username: '',
    influencer: [],
    price: 0,
    supplyAmount: 0,
    extraProfit: 0,
    content: '',
    notes: '',
});

const save = async () => {
    try {
        const res = await createCampaign(form); // ← 등록 API 호출
        alert('캠페인이 생성되었습니다!');
        router.push('/campaign'); // 목록으로 이동
    } catch (e) {
        console.error(e);
        alert('캠페인 생성 실패');
    }
};
</script>

<template>
    <div class="container">
        <div class="page-header">
            <div class="page-title">캠페인 생성</div>
            <div class="flex justify-end gap-2">
                <button class="btn-create" @click="save()">저장</button>
                <button class="btn-delete" @click="router.back()">취소</button>
            </div>
        </div>
        <div class="blue-line"></div>
        <!--        <div class="pipeline flex items-center w-full mb-4">-->
        <!--            <PipelineDiagram :diagramInfo="null" />-->
        <!--        </div>-->
        <div class="flex">
            <div class="w-full">
                <CreateCampaignForm v-model="form" :isEditing="true" />
            </div>
            <!--            <div class="w-1/2 bg-gray-50 p-4 rounded shadow">-->
            <!--                <CampaignHistory :campaignHistory="[]" />-->
            <!--            </div>-->
        </div>
    </div>
</template>
