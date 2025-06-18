<script setup>
import { reactive, ref, nextTick, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import PipelineCard from '@/features/campaign/components/PipelineCard.vue';
import { RouterLink } from 'vue-router';

/* 고객, 사원 더미 데이터 */
const clientList = [
    {
        id: 1,
        name: 'ABC 화장품',
        revenue: '130000000',
        employeeCount: '8',
        businessNumber: '123-45-67890',
        note: 'ABC 고객사 비고입니다.',
        status: '잠재고객',
        phone: '02-1234-5678',
        fax: '02-8765-4321',
        user: [{ id: 1, name: '오유경' }],
        address1: '서울시 강남구 테헤란로',
        address2: '3층',
        employees: [
            {
                name: '이관호',
                position: '재직',
                client: 'ABC 화장품',
                mobile: '010-1234-5678',
                email: 'abc@naver.com',
                department: '마케팅',
                title: '팀장',
                phone: '02-1234-5678',
                note: '',
            },
        ],
    },
    {
        id: 2,
        name: '아모레퍼시픽',
        revenue: '250000000',
        employeeCount: '5',
        businessNumber: '456-78-12345',
        note: 'XYZ 고객사 메모입니다.',
        status: '기존고객',
        phone: '02-9876-5432',
        fax: '02-5432-6789',
        user: [{ id: 2, name: '오유경, 이승재' }],
        address1: '서울시 마포구 월드컵북로',
        address2: '10층',
        employees: [],
    },
];

/* 파이프라인, 계약, 커뮤니케이션용 더미 데이터 */
const campaignList = [
    {
        id: 3,
        status: '진행중',
        title: 'UVW 뷰티 디바이스 언박싱 캠페인',
        clientCompany: 'ABC 화장품',
        clientManagerName: '김대리',
        clientManagerPosition: '대리',
        price: 45000000,
        startDate: '2025.06.05',
        endDate: '2025.07.10',
        username: '소정재',
        userPosition: '팀장',
        productName: 'UVW 뷰티 디바이스 PRO-X',
        pipeLine: {
            chance: '2025.06.05',
            listUp: '2025.06.05',
            proposal: '2025.06.07',
            quotation: '2025.06.07',
        },
    },
    {
        id: 4,
        status: '프로모션완료',
        title: 'XYZ 패션 브랜드 S/S 프로모션',
        clientCompany: 'XYZ 패션 베니사',
        clientManagerName: '최과장',
        clientManagerPosition: '과장',
        price: 45000000,
        startDate: '2025.06.05',
        endDate: '2025.07.10',
        username: '노차은',
        userPosition: '주임',
        productName: '패션 라인 의류',
        pipeLine: {
            chance: '2025.06.05',
            listUp: '2025.06.05',
            proposal: '2025.06.07',
            quotation: '2025.06.07',
            negotiation: '2025.06.07',
            contract: '2025.06.07',
            aftercare: '2025.06.07',
        },
    },
    {
        id: 1,
        status: '진행중',
        title: 'UVW 뷰티 디바이스 언박싱 캠페인',
        clientCompany: 'ABC 화장품',
        clientManagerName: '송강',
        clientManagerPosition: '팀장',
        productName: '뷰티 디바이스 PRO X',
        price: 45000000,
        startDate: '2025-06-05',
        endDate: '2025-07-10',
        username: '차은우',
        userPosition: 'AE',
        pipeLine: {
            chance: { date: '2025-06-05' },
            listUp: { date: '2025-06-06' },
            proposal: { date: '2025-06-07' },
            quotation: { date: '2025-06-08' },
            contract: { date: '2025-06-09' },
        },
    },
    {
        id: 2,
        status: '진행중',
        title: 'XYZ 패션 브랜드 시즌 프로모션',
        clientCompany: 'ABC 화장품',
        clientManagerName: '송강',
        clientManagerPosition: '팀장',
        productName: '썸머 티셔츠',
        price: 39000000,
        startDate: '2025-06-06',
        endDate: '2025-07-15',
        username: '정재현',
        userPosition: '팀장',
        pipeLine: {
            chance: { date: '2025-06-05' },
            listUp: { date: '2025-06-06' },
            proposal: { date: '2025-06-07' },
            quotation: { date: '2025-06-08' },
            negotiation: { date: '2025-06-09' },
            contract: { date: '2025-06-10' },
        },
    },
];

const contractList = [
    {
        campaignId: 1,
        campaignName: '닭가슴살 증식 캠페인',
        productName: '닭가슴살 3종 세트',
        influencerName: '말왕',
        revenue: 12200000,
        period: '2025.05.02 ~ 2025.05.31',
        resultLink: '#',
    },
    {
        campaignId: 2,
        campaignName: '어뜰추가 라라쿠라 캠페인',
        productName: '3탄 집어라 라라쿠라',
        influencerName: '매미킴',
        revenue: 5000000,
        period: '2025.05.15 ~ 2025.06.01',
        resultLink: '#',
    },
];

const selectedCampaignId = ref(null);
const selectedMsg = ref(null);

const communicationList = ref([
    {
        id: 1,
        campaignId: 3,
        category: '제안',
        title: '고구마 맛 닭가슴살 광고 제안',
        writer: '조현승',
        department: '영업부',
        createdAt: '2024.02.13',
        content: '고구마 맛 닭가슴살 광고 제안서 전달 및 문의',
        feedback: '이후 진행 시, 베타버전 우선 도입',
        file: '고구마맛 닭가슴살 광고 제안 1차.hwp',
        date: '2024.02.12',
        price: 9600000,
    },
    {
        id: 2,
        campaignId: 1,
        category: '계약',
        title: '단백질 닭가슴살 유튜브 계약 확정',
        writer: '김지수',
        department: '마케팅팀',
        createdAt: '2024.03.10',
        content: '단백질 닭가슴살 제품의 캠페인 계약서 체결',
        feedback: '광고 송출은 3월 말부터 진행 예정',
        file: '단백질닭_계약서.pdf',
        date: '2024.03.10',
        price: 12000000,
    },
    {
        id: 3,
        campaignId: 2,
        category: '리스트업',
        title: '패션 브랜드 시즌 캠페인 인플루언서 리스트업',
        writer: '박서준',
        department: '제휴팀',
        createdAt: '2024.04.01',
        content: '패션 브랜드에 적합한 인플루언서 리스트 정리 완료',
        feedback: '3명 우선 접촉 예정',
        file: '',
        date: '2024.04.01',
        price: null,
    },
    {
        id: 4,
        campaignId: 3,
        category: '견적',
        title: '뷰티 디바이스 인플루언서 견적 제안',
        writer: '이주연',
        department: '영업부',
        createdAt: '2024.04.15',
        content: '뷰티 인플루언서 2명 대상 견적서 전달',
        feedback: '추가 인플루언서 검토 요청됨',
        file: '뷰티_견적서.pdf',
        date: '2024.04.14',
        price: 7500000,
    },
    {
        id: 5,
        campaignId: 2,
        category: '파이프라인 등록',
        title: '패션 브랜드 신규 파이프라인 등록',
        writer: '정태호',
        department: '운영팀',
        createdAt: '2024.05.03',
        content: '해당 캠페인을 파이프라인에 신규 등록 완료',
        feedback: '진행자 배정 및 커뮤니케이션 시작',
        file: '',
        date: '2024.05.02',
        price: null,
    },
]);

// 라우터
const route = useRoute();
const router = useRouter();

// 상세조회용 ID
// const clientId = route.params.id

// 상태값
const isEditing = ref(false);

const form = reactive({
    name: '',
    revenue: '',
    employeeCount: '',
    businessNumber: '',
    note: '',
    status: '',
    phone: '',
    fax: '',
    user: [],
    address1: '',
    address2: '',
});

const employeeList = ref([]);

const isAddingEmployee = ref(false);
const editIndex = ref(-1);

const newEmployee = reactive({
    name: '',
    position: '재직',
    client: '',
    department: '',
    title: '',
    phone: '',
    mobile: '',
    email: '',
    note: '',
});

// 고객사명이 바뀔 때마다 사원 등록에 반영
watch(
    () => form.name,
    (v) => (newEmployee.client = v),
);

// 상세조회 API 호출
onMounted(() => {
    fetchClientDetail();
    initUserSelectHandler();
});

const fetchClientDetail = () => {
    const client = clientList.find((c) => c.id === Number(route.params.id));
    if (!client) return console.warn('해당 ID의 클라이언트를 찾을 수 없습니다.');
    Object.assign(form, client);
    employeeList.value = client.employees;
};

// 저장
const save = () => {
    console.log('수정 저장:', form);
    isEditing.value = false;
};

const cancel = () => {
    console.log('수정 취소됨');
    isEditing.value = false;
};

// 담당자 검색 로직은 재사용
onMounted(() => {
    if (!window.__userSelectHandlerRegistered) {
        window.handleUserSelect = (selectedItems) => {
            if (window.__userSelectCallback__) {
                window.__userSelectCallback__(selectedItems);
                window.__userSelectCallback__ = null;
            }
        };
        window.__userSelectHandlerRegistered = true;
    }
});

function initUserSelectHandler() {
    if (window.__userSelectHandlerRegistered) return;
    window.handleUserSelect = (sel) => {
        if (window.__userSelectCallback__) {
            window.__userSelectCallback__(sel);
            window.__userSelectCallback__ = null;
        }
    };
    window.__userSelectHandlerRegistered = true;
}

const openUserSearch = () => {
    const selectedIds = form.user.map((u) => u.id).join(',');

    window.__userSelectCallback__ = (selectedItems) => {
        form.user.splice(0, form.user.length, ...selectedItems);
    };

    window.open(
        `/search-popup?type=user&selected=${selectedIds}`,
        'SearchPopup',
        'width=500,height=600',
    );
};

// 주소 검색
const popupWidth = 500;
const popupHeight = 600;
const openPostcodeSearch = () => {
    new daum.Postcode({
        oncomplete: function (data) {
            const selectedAddress = data.roadAddress || data.jibunAddress;
            form.address1 = selectedAddress;
            nextTick(() => document.getElementById('detailAddress')?.focus());
        },
    }).open({
        left: window.screen.width / 2 - popupWidth / 2,
        top: window.screen.height / 2 - popupHeight / 2,
    });
};

// 사원 추가
const addEmployee = () => {
    newEmployee.client = form.name;

    if (editIndex.value === -1) {
        employeeList.value.push({ ...newEmployee });
    } else {
        employeeList.value[editIndex.value] = { ...newEmployee };
    }

    Object.keys(newEmployee).forEach((key) => {
        if (key !== 'client') newEmployee[key] = '';
    });
    newEmployee.position = '재직';
    editIndex.value = -1;
    isAddingEmployee.value = false;
};

const deleteEmployee = (index) => {
    employeeList.value.splice(index, 1);
};

const editEmployee = (index) => {
    Object.assign(newEmployee, employeeList.value[index]);
    editIndex.value = index;
    isAddingEmployee.value = true;
};

const filteredHistories = computed(() => {
    if (!selectedCampaignId.value) return communicationList.value;
    return communicationList.value.filter((item) => item.campaignId === selectedCampaignId.value);
});

function selectCampaign(id) {
    selectedCampaignId.value = id;
    selectedMsg.value = null;
}
</script>

<template>
    <!-- 상단 고객사 등록 영역 -->
    <div class="w-full flex justify-center px-4">
        <div class="container bg-white w-full">
            <!-- 제목 및 버튼 -->
            <div class="page-header">
                <div class="page-title">고객사 조회</div>
                <div class="flex items-center gap-3">
                    <button class="btn-delete" v-if="isEditing" @click="cancel">취소</button>
                    <button class="btn-create" v-if="isEditing" @click="save">저장</button>
                    <button class="btn-edit" v-else @click="isEditing = true">수정</button>
                    <Icon
                        icon="material-symbols:lists-rounded"
                        width="48"
                        height="48"
                        class="text-btn-gray cursor-pointer"
                        @click="router.push('/management/client')"
                    />
                </div>
            </div>
            <div class="blue-line"></div>

            <div class="grid grid-cols-2 gap-10">
                <div class="flex flex-col gap-2.5">
                    <!-- 왼쪽 필드 -->
                    <label class="input-form-label">
                        광고업체명 <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input class="input-form-box" v-model="form.name" :disabled="!isEditing" />
                    <label class="input-form-label">매출</label>
                    <input class="input-form-box" v-model="form.revenue" :disabled="!isEditing" />
                    <label class="input-form-label">사원 수</label>
                    <input
                        class="input-form-box"
                        v-model="form.employeeCount"
                        :disabled="!isEditing"
                    />
                    <label class="input-form-label">사업자 번호</label>
                    <input
                        class="input-form-box"
                        v-model="form.businessNumber"
                        :disabled="!isEditing"
                    />
                    <label class="input-form-label">비고</label>
                    <textarea
                        class="input-form-box resize-y min-h-[80px]"
                        v-model="form.note"
                        :disabled="!isEditing"
                        rows="3"
                    />
                </div>

                <div class="flex flex-col gap-2.5">
                    <!-- 오른쪽 필드 -->
                    <label class="input-form-label">
                        진행 상태 <span class="text-red-500 ml-1">*</span>
                    </label>
                    <select class="input-form-box" v-model="form.status" :disabled="!isEditing">
                        <option value="잠재고객">잠재고객</option>
                        <option value="신규고객">신규고객</option>
                        <option value="기존고객">기존고객</option>
                    </select>
                    <label class="input-form-label">유선번호</label>
                    <input class="input-form-box" v-model="form.phone" :disabled="!isEditing" />
                    <label class="input-form-label">팩스번호</label>
                    <input class="input-form-box" v-model="form.fax" :disabled="!isEditing" />
                    <label class="input-form-label">
                        담당자 <span class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex gap-2">
                        <input
                            type="text"
                            :value="form.user.map((u) => u.name).join(', ')"
                            readonly
                            class="input-form-box flex-1"
                        />
                        <button class="btn-open-popup" @click="openUserSearch" v-if="isEditing">
                            검색
                        </button>
                    </div>
                    <label class="input-form-label">주소</label>
                    <div class="flex gap-2">
                        <input
                            type="text"
                            v-model="form.address1"
                            readonly
                            class="input-form-box flex-1 bg-gray-100"
                        />
                        <button class="btn-open-popup" @click="openPostcodeSearch" v-if="isEditing">
                            검색
                        </button>
                    </div>
                    <input
                        class="input-form-box"
                        v-model="form.address2"
                        :disabled="!isEditing"
                        id="detailAddress"
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- 사원 정보 리스트 영역 -->
    <div class="w-full flex justify-center px-4">
        <div class="container bg-white mt-12 w-full">
            <div class="flex justify-between items-center mb-4">
                <p class="font-bold">사원 정보 ({{ employeeList.length }})</p>
                <button class="btn-create !py-1 !px-4 text-sm" @click="isAddingEmployee = true">
                    추가
                </button>
            </div>

            <div class="grid grid-cols-2 gap-4" v-if="employeeList.length > 0">
                <div
                    v-for="(employee, index) in employeeList"
                    :key="index"
                    class="border rounded-lg p-4 flex items-center justify-between shadow-sm"
                >
                    <div>
                        <!-- 사원 목록에서 이름 옆 -->
                        <p class="font-semibold">
                            {{ employee.name }}
                            <span
                                class="text-xs font-semibold ml-2 px-2 py-0.5 rounded"
                                :class="{
                                    'bg-[#A2D9FF] text-white': employee.position === '재직',
                                    'bg-[#FFD000] text-white': employee.position === '휴직',
                                    'bg-[#FF6D6D] text-white': employee.position === '퇴직',
                                }"
                            >
                                {{ employee.position }}
                            </span>
                        </p>
                        <p class="text-sm text-gray-500">
                            {{ employee.mobile }}
                            <template v-if="employee.mobile && employee.email"> / </template>
                            {{ employee.email }}
                        </p>
                    </div>
                    <div class="flex gap-2">
                        <button class="btn-icon">
                            <Icon icon="material-symbols:mail-outline" width="20" height="20" />
                            MAIL
                        </button>
                        <button class="btn-icon" @click="editEmployee(index)">
                            <Icon icon="lucide:edit" width="20" height="20" />
                            수정
                        </button>
                        <button class="btn-icon" @click="deleteEmployee(index)">
                            <Icon icon="gg:trash" width="20" height="20" />
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 사원 추가 폼 -->
    <div class="w-full flex justify-center px-4">
        <div class="container bg-white mt-8" v-if="isAddingEmployee">
            <p class="font-bold mb-2">
                {{ editIndex === -1 ? '사원 추가' : '사원 수정' }}
            </p>
            <div class="blue-line mb-4" />
            <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-2">
                    <label class="input-form-label">
                        이름<span class="text-red-500 ml-1">*</span>
                    </label>
                    <input v-model="newEmployee.name" class="input-form-box" />
                    <label class="input-form-label">상태</label>
                    <select v-model="newEmployee.position" class="input-form-box">
                        <option value="재직">재직</option>
                        <option value="휴직">휴직</option>
                        <option value="퇴직">퇴직</option>
                    </select>
                    <label class="input-form-label">부서</label>
                    <input v-model="newEmployee.department" class="input-form-box" />
                    <label class="input-form-label">유선번호</label>
                    <input v-model="newEmployee.phone" class="input-form-box" />
                    <label class="input-form-label">비고</label>
                    <textarea v-model="newEmployee.note" class="input-form-box" rows="3" />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="input-form-label">고객사</label>
                    <input
                        v-model="newEmployee.client"
                        class="input-form-box bg-gray-100"
                        readonly
                    />

                    <label class="input-form-label">직책</label>
                    <input v-model="newEmployee.title" class="input-form-box" />

                    <label class="input-form-label">
                        휴대폰번호<span class="text-red-500 ml-1">*</span>
                    </label>
                    <input v-model="newEmployee.mobile" class="input-form-box" />

                    <label class="input-form-label">
                        이메일<span class="text-red-500 ml-1">*</span>
                    </label>
                    <input v-model="newEmployee.email" class="input-form-box" />
                </div>
            </div>
            <div class="flex justify-end gap-2 mt-4">
                <button class="btn-delete !px-5" @click="isAddingEmployee = false">취소</button>
                <button class="btn-create !px-5" @click="addEmployee">
                    {{ editIndex === -1 ? '등록' : '수정 완료' }}
                </button>
            </div>
        </div>
    </div>

    <!-- 캠페인 진행 현황 + (스크롤) -->
    <div class="w-full flex justify-center px-4 mt-12">
        <div class="container bg-white pt-4 pb-6">
            <p class="font-bold mb-2">캠페인 진행 현황 ({{ campaignList.length }})</p>
            <div class="blue-line mb-4" />
            <div class="max-h-[500px] overflow-y-auto pr-2">
                <PipelineCard :campaigns="campaignList" />
            </div>
        </div>
    </div>

    <!-- 캠페인 계약 목록 -->
    <div class="w-full flex justify-center px-4 mt-12">
        <div class="container bg-white pt-4 pb-6">
            <p class="font-bold mb-2">캠페인 계약 목록</p>
            <div class="blue-line mb-4" />

            <table class="w-full table-auto border-collapse text-sm">
                <!-- 헤더 -->
                <thead class="text-white text-center text-sm">
                    <tr class="bg-btn-blue rounded-lg overflow-hidden">
                        <th class="px-4 py-2 rounded-l-lg">캠페인명</th>
                        <th class="px-4 py-2">상품명</th>
                        <th class="px-4 py-2">인플루언서</th>
                        <th class="px-4 py-2">수익</th>
                        <th class="px-4 py-2">기간</th>
                        <th class="px-4 py-2 rounded-r-lg">성과</th>
                    </tr>
                </thead>

                <!-- 본문 -->
                <tbody>
                    <tr
                        v-for="(c, i) in contractList"
                        :key="i"
                        class="h-[46px] text-center border-b border-gray-200 even:bg-gray-50"
                    >
                        <td class="px-4 whitespace-nowrap">{{ c.campaignName }}</td>
                        <td class="px-4 whitespace-nowrap">{{ c.productName }}</td>
                        <td class="px-4 whitespace-nowrap">{{ c.influencerName }}</td>
                        <td class="px-4 whitespace-nowrap">{{ c.revenue.toLocaleString() }} ₩</td>
                        <td class="px-4 whitespace-nowrap">{{ c.period }}</td>
                        <td class="px-4 whitespace-nowrap">
                            <RouterLink
                                :to="`/dashboard/campaign-result?id=${c.campaignId}`"
                                class="text-primary underline hover:font-medium"
                            >
                                보러가기
                            </RouterLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 커뮤니케이션 이력 -->
    <div class="w-full flex justify-center px-4 mt-12">
        <div class="container bg-white pt-4 pb-6">
            <p class="font-bold mb-2">커뮤니케이션 이력</p>
            <div class="blue-line mb-4" />

            <div class="grid grid-cols-4 gap-6">
                <!-- 1. 캠페인 목록 -->
                <div class="col-span-1 flex flex-col gap-2">
                    <!-- 전체 버튼 -->
                    <button
                        class="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150 text-gray-700 hover:bg-gray-100"
                        :class="{
                            'bg-[#e6f0ff] border-[#5b8cff] text-[#00274A] font-semibold':
                                selectedCampaignId === null,
                            'border-[var(--color-gray-medium)]': selectedCampaignId !== null,
                        }"
                        @click="selectedCampaignId = null"
                    >
                        전체
                    </button>

                    <!-- 캠페인별 버튼 -->
                    <button
                        v-for="c in campaignList"
                        :key="c.id"
                        class="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150 text-gray-700 truncate hover:bg-gray-100"
                        :class="{
                            'bg-[#e6f0ff] border-[#5b8cff] text-[#00274A] font-semibold':
                                selectedCampaignId === c.id,
                            'border-[var(--color-gray-medium)]': selectedCampaignId !== c.id,
                        }"
                        @click="selectCampaign(c.id)"
                    >
                        {{ c.title }}
                    </button>
                </div>

                <!-- 2. 이력 리스트 (선택된 캠페인에 한해 표시) -->
                <div class="col-span-1 space-y-2 max-h-[460px] overflow-y-auto pr-1">
                    <button
                        v-for="item in filteredHistories"
                        :key="item.id"
                        @click="selectedMsg = item"
                        class="w-full text-left rounded-lg text-sm font-medium border transition-all duration-150 hover:bg-gray-100 px-4 py-3"
                        :class="{
                            'bg-[#e6f0ff] border-[#5b8cff] text-[#00274A]':
                                selectedMsg?.id === item.id,
                            'border-[var(--color-gray-medium)] text-gray-800':
                                selectedMsg?.id !== item.id,
                        }"
                    >
                        <!-- 카테고리와 날짜 -->
                        <div class="flex justify-between items-center mb-1">
                            <span class="font-semibold text-sm">{{ item.category }}</span>
                            <span class="text-xs text-gray-500">{{ item.createdAt }}</span>
                        </div>

                        <!-- 제목 -->
                        <p class="text-sm font-medium mb-1">{{ item.title }}</p>

                        <!-- 작성자 / 부서 -->
                        <p class="text-xs text-gray-500">
                            {{ item.writer }} / {{ item.department }}
                        </p>

                        <!-- 내부 날짜 -->
                        <p class="text-xs text-gray-500">{{ item.date }}</p>

                        <!-- 가격 (있을 경우) -->
                        <p v-if="item.price" class="text-xs font-semibold text-right text-[#333]">
                            KRW {{ item.price.toLocaleString() }}
                        </p>
                    </button>
                </div>

                <!-- 3. 상세 보기 -->
                <!-- 오른쪽 상세보기 패널 -->
                <div
                    v-if="selectedMsg"
                    class="col-span-2 border rounded-lg px-6 py-4 shadow-sm bg-white space-y-3"
                    style="border-color: var(--color-gray-medium)"
                >
                    <!-- 상단 제목/카테고리 -->
                    <div class="flex items-start justify-between pb-3">
                        <div class="flex items-center gap-2">
                            <span
                                class="px-3 py-1 rounded-full text-white text-xs font-semibold shadow-sm"
                                :class="{
                                    'bg-pipeline-proposal': selectedMsg.category === '제안',
                                    'bg-pipeline-negotiation': selectedMsg.category === '협상',
                                    'bg-pipeline-contract': selectedMsg.category === '계약',
                                    'bg-pipeline-quotation': selectedMsg.category === '견적',
                                    'bg-pipeline-list-up': selectedMsg.category === '리스트업',
                                    'bg-pipeline-chance':
                                        selectedMsg.category === '파이프라인 등록',
                                }"
                            >
                                {{ selectedMsg.category }}
                            </span>
                            <h3 class="text-base font-bold text-[#1A1A1A]">
                                {{ selectedMsg.title }}
                            </h3>
                        </div>
                        <div class="text-xs text-gray-400 mt-1">
                            작성일 : {{ selectedMsg.createdAt }}
                        </div>
                    </div>

                    <!-- 단 하나의 구분선만 남기고 -->
                    <hr style="border-color: var(--color-gray-medium)" />

                    <!-- 담당자 -->
                    <div>
                        <h4 class="text-sm font-medium text-gray-600 mb-1">담당자</h4>
                        <p class="text-sm text-gray-800">
                            {{ selectedMsg.writer }} / {{ selectedMsg.department }}
                        </p>
                    </div>

                    <!-- 내용 -->
                    <div>
                        <h4 class="text-sm font-medium text-gray-600 mb-1">내용</h4>
                        <div
                            class="rounded px-3 py-2 bg-gray-50 text-sm text-gray-700 whitespace-pre-line"
                            style="border: 1px solid var(--color-gray-medium)"
                        >
                            {{ selectedMsg.content }}
                        </div>
                    </div>

                    <!-- 피드백 -->
                    <div>
                        <h4 class="text-sm font-medium text-gray-600 mb-1">피드백</h4>
                        <div
                            class="rounded px-3 py-2 bg-gray-50 text-sm text-gray-700 whitespace-pre-line"
                            style="border: 1px solid var(--color-gray-medium)"
                        >
                            {{ selectedMsg.feedback }}
                        </div>
                    </div>

                    <!-- 첨부파일 -->
                    <div v-if="selectedMsg.file">
                        <h4 class="text-sm font-medium text-gray-600 mb-1">첨부파일</h4>
                        <div
                            class="flex items-center gap-2 rounded px-3 py-2 bg-white text-sm"
                            style="border: 1px solid var(--color-gray-medium)"
                        >
                            📎 <a href="#" class="text-primary underline">{{ selectedMsg.file }}</a>
                        </div>
                    </div>
                </div>

                <!-- 상세 비어 있을 때 -->
                <div
                    v-else
                    class="col-span-2 flex items-center justify-center text-gray-400 border rounded py-24"
                >
                    가운데 목록에서 항목을 선택해 주세요
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
