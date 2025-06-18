<script setup>
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref, watch } from 'vue';
import { getContractReference } from '@/features/campaign/api.js';
import { Icon } from '@iconify/vue';
import DetailReferenceList from '@/features/campaign/components/DetailReferenceList.vue';
import OpinionBar from '@/components/layout/OpinionBar.vue';
import SalesForm from '@/features/campaign/components/SalesForm.vue';
import FileUploadCard from '@/features/campaign/components/FileUploadCard.vue';

const router = useRouter();

const opinions = ref([]);
const contractReferences = ref([]);
const isEditing = ref(true);

const form = reactive({
    title: '',
    requestDate: '',
    clientCompany: {},
    clientManager: {},
    period: '',
    announcementDate: '',
    pipeline: '',
    username: {},
    influencer: [],
    influencerContents: [],
    status: '승인요청',
    adPrice: '',
    productPrice: '',
    salesQuantity: '',
    totalRevenue: 0,
    content: '',
    notes: '',
    startDate: '',
    endDate: '',
    showInfluencerContentInput: false,
    attachments: [],
});

const groups = [
    {
        type: 'horizontal',
        fields: [
            { key: 'title', label: '제목', type: 'input' },
            { key: 'requestDate', label: '요청일', type: 'date', inputType: 'date' },
        ],
    },
    {
        type: 'horizontal',
        fields: [
            {
                key: 'clientCompany',
                label: '광고업체',
                type: 'search-company',
                searchType: 'company',
            },
            { key: 'period', label: '제안 기간', type: 'date-range' },
        ],
    },
    {
        type: 'horizontal',
        fields: [
            {
                key: 'clientManager',
                label: '광고담당자',
                type: 'search-manager',
                searchType: 'manager',
            },
            { key: 'announcementDate', label: '발표일', type: 'input', inputType: 'date' },
        ],
    },
    {
        type: 'horizontal',
        fields: [
            {
                key: 'pipeline',
                label: '해당 파이프라인',
                type: 'search-pipeline',
                searchType: 'pipeline',
            },
            { key: 'username', label: '담당자', type: 'search-user', searchType: 'user' },
        ],
    },
    {
        type: 'horizontal',
        fields: [
            {
                key: 'influencer',
                label: '인플루언서',
                type: 'search-influencer',
                searchType: 'influencer',
            },
            {
                key: 'status',
                label: '진행단계',
                type: 'select',
                options: ['승인요청', '진행중', '보류', '완료'],
            },
        ],
    },
    {
        type: 'horizontal',
        fields: [
            {
                key: 'adPrice',
                label: '광고 단가',
                type: 'input',
                inputType: 'number',
                width: 50,
            },
            {
                key: 'productPrice',
                label: '상품 가격',
                type: 'input',
                inputType: 'number',
                width: 24,
            },
            {
                key: 'salesQuantity',
                label: '판매 수량',
                type: 'input',
                inputType: 'number',
                width: 24,
            },
        ],
    },
    {
        type: 'horizontal',
        fields: [
            { key: 'platform', label: '컨텐츠 목록', type: 'platform', width: 24 },
            {
                key: 'totalRevenue',
                label: '총 수익',
                type: 'input',
                inputType: 'number',
                disabled: true,
                width: 25,
            },
        ],
    },
    {
        type: 'single',
        fields: [
            { key: 'content', label: '내용', type: 'textarea' },
            { key: 'notes', label: '비고', type: 'textarea' },
        ],
    },
];

// 저장
const save = async () => {
    const payload = {
        ...form,
        opinions: opinions.value,
    };

    try {
        // 예: postContract(payload); 와 같은 API 호출
        console.log('전송 데이터:', payload);
        // await postContract(payload);
        await router.push('/sales/revenue'); // 저장 후 목록으로 이동
    } catch (e) {
        console.error('저장 실패:', e);
    }
};

// 초기화
const cancel = () => {
    Object.keys(form).forEach((key) => {
        form[key] = Array.isArray(form[key])
            ? []
            : typeof form[key] === 'object' && form[key] !== null
              ? {}
              : '';
    });
    form.status = '승인요청';
    form.totalRevenue = 0;
    form.attachments = [];
    isEditing.value = true;
};

const handleSubmit = (newComment) => {
    opinions.value.push({
        id: Date.now(),
        author: '나',
        content: newComment,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    });
};

// 참조 선택 시 폼 매핑
const handleReferenceSelect = (item) => {
    if (!isEditing.value) {
        alert('수정 모드가 아닙니다!');
        return;
    }

    Object.keys(form).forEach((key) => {
        form[key] = Array.isArray(form[key]) ? [] : typeof form[key] === 'object' ? {} : '';
    });

    form.title = item.title;
    form.requestDate = item.requestDate;
    form.clientCompany = { ...(item.clientCompany ?? {}) };
    form.clientManager = { ...(item.clientManager ?? {}) };
    form.period = item.period;
    form.announcementDate = item.announcementDate;
    form.pipeline = item.pipeline;
    form.username = { ...(item.username ?? {}) };
    form.influencer = Array.isArray(item.influencer) ? [...item.influencer] : [item.influencer];
    form.status = item.status;
    form.adPrice = item.price;
    form.productPrice = item.supplyAmount;
    form.salesQuantity = item.extraProfit;
    form.content = item.content;
    form.notes = item.notes;
    form.startDate = item.startDate;
    form.endDate = item.endDate;
    form.showInfluencerContentInput = true;
};

// 인플루언서 선택 시 자동 매핑
watch(
    () => form.influencer,
    (influencers) => {
        if (!Array.isArray(influencers)) return;

        form.influencerContents =
            form.influencerContents?.filter((item) =>
                influencers.some((inf) => inf.id === item.influencerId),
            ) ?? [];

        for (const inf of influencers) {
            if (!form.influencerContents.some((i) => i.influencerId === inf.id)) {
                form.influencerContents.push({
                    influencerId: inf.id,
                    name: inf.name,
                    platform: 'youtube',
                    url: '',
                });
            }
        }
    },
    { immediate: true },
);

// 총 수익 계산
watch(
    () => [form.productPrice, form.salesQuantity],
    ([productPrice, salesQuantity]) => {
        const price = parseInt(productPrice) || 0;
        const quantity = parseInt(salesQuantity) || 0;
        form.totalRevenue = price * quantity;
    },
);

// 계약 참조 불러오기
const fetchContractReferences = async () => {
    try {
        const res = await getContractReference();
        contractReferences.value = res.data.data;
    } catch (e) {
        console.error(e);
    }
};

onMounted(() => {
    fetchContractReferences();
});
</script>

<template>
    <div class="flex">
        <!-- 좌측 의견 바 -->
        <OpinionBar :opinions="opinions" @submit="handleSubmit" @delete="handleDelete" />

        <!-- 본문 영역 -->
        <div class="flex-1 flex flex-col gap-8">
            <!-- 상단: 매출 폼 -->
            <div class="container">
                <div class="page-header">
                    <div class="page-title">매출 생성</div>
                    <div class="flex justify-end gap-2">
                        <button class="btn-create" @click="save">저장</button>
                        <Icon
                            icon="material-symbols:lists-rounded"
                            width="32"
                            height="32"
                            class="text-btn-gray"
                            @click="router.push('/sales/revenue')"
                        />
                    </div>
                </div>

                <div class="blue-line"></div>

                <SalesForm v-model="form" :groups="groups" :isEditing="isEditing" />
            </div>

            <!-- 하단: 참조 리스트 -->
            <div class="container">
                <DetailReferenceList :items="contractReferences" @select="handleReferenceSelect" />
            </div>

            <div class="container">
                <FileUploadCard :isEditing="isEditing" v-model="form.attachments" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
