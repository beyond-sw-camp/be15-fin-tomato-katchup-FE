<script setup>
import { ref, computed, nextTick } from 'vue';
import GroupRenderer from './GroupRenderer.vue';

const props = defineProps({
    modelValue: Object,
});

const popupWidth = 500;
const popupHeight = 600;
const currentFieldKey = ref(null);

const form = ref({ ...props.modelValue });

const expectedProfitAmount = computed(() => {
    const revenue = Number(form.value.expectedRevenue) || 0;
    const margin = Number(form.value.expectedProfitMargin) || 0;
    return (revenue * margin) / 100;
});

const openSearchPopup = (key, type) => {
    currentFieldKey.value = key;
    const currentValue = form.value[key];
    const selected = currentValue?.id ?? '';

    const popupWidth = 500;
    const popupHeight = 600;

    const left = window.screenX + (window.outerWidth - popupWidth) / 1.3;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2;

    const popup = window.open(
        `/search-popup?type=${type}&selected=${encodeURIComponent(selected)}`,
        'SearchPopup',
        `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=no,scrollbars=yes`,
    );

    window.handleUserSelect = (selectedItem) => {
        form.value[currentFieldKey.value] = selectedItem;
        popup.close();
    };
};

const formatNumber = (value) => {
    if (value === null || value === undefined || isNaN(value)) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseNumberInput = (e, key) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    form.value[key] = raw ? parseInt(raw, 10) : 0;
};

function openPostcodeSearch() {
    new daum.Postcode({
        oncomplete: function (data) {
            const selectedAddress = data.roadAddress || data.jibunAddress;
            form.value.address = selectedAddress;
            nextTick(() => {
                const detailInput = document.getElementById('detailAddress');
                detailInput?.focus();
            });
        },
    }).open({
        left: window.screen.width / 2 - popupWidth / 2,
        top: window.screen.height / 2 - popupHeight / 2,
    });
}

// 그룹 정의
const leftGroups = [
    {
        type: 'horizontal',
        fields: [
            { key: 'title', label: '영업 기회명', type: 'input', inputType: 'text' },
            {
                key: 'status',
                label: '진행 상태',
                type: 'select',
                options: ['진행중', '보류', '완료', '취소'],
                width: 'w-40',
            },
        ],
    },
    {
        type: 'single',
        fields: [
            {
                key: 'clientCompany',
                label: '고객사',
                type: 'search-company',
                searchType: 'company',
            },
        ],
    },
    {
        type: 'single',
        fields: [
            {
                key: 'clientManagerName',
                label: '광고 담당자',
                type: 'search-manager',
                searchType: 'manager',
            },
        ],
    },
    {
        type: 'horizontal',
        fields: [
            { key: 'startDate', label: '시작일', type: 'input', inputType: 'date' },
            { key: 'endDate', label: '종료일', type: 'input', inputType: 'date' },
        ],
    },
    {
        type: 'single',
        fields: [
            { key: 'address', label: '주소 검색', type: 'address-search' },
            { key: 'addressDetail', label: '상세 주소', type: 'input', inputType: 'text' },
            { key: 'username', label: '담당자', type: 'search-user', searchType: 'user' },
            { key: 'awarenessPath', label: '인지 경로', type: 'input', inputType: 'text' },
        ],
    },
];

const rightGroups = [
    {
        type: 'horizontal',
        fields: [
            { key: 'productName', label: '상품명', type: 'input', inputType: 'text' },
            {
                key: 'productPrice',
                label: '상품 가격',
                type: 'input',
                inputType: 'number',
                width: 'w-40',
            },
        ],
    },
    {
        type: 'single',
        fields: [
            { key: 'expectedRevenue', label: '예상 매출', type: 'input', inputType: 'number' },
            {
                key: 'expectedProfitMargin',
                label: '예상 이익률 (%)',
                type: 'input',
                inputType: 'number',
            },
            { key: 'notes', label: '비고', type: 'textarea' },
        ],
    },
];
</script>

<template>
    <div class="grid grid-cols-2 gap-4 relative">
        <div class="absolute top-0 bottom-0 left-1/2 w-px bg-gray-medium"></div>

        <div class="flex flex-col gap-4 pr-4">
            <GroupRenderer
                v-for="(group, idx) in leftGroups"
                :key="'left-' + idx"
                :group="group"
                :form="form"
                :isEditing="true"
                :expectedProfitAmount="expectedProfitAmount"
                :formatNumber="formatNumber"
                :parseNumberInput="parseNumberInput"
                :openPostcodeSearch="openPostcodeSearch"
                :openSearchPopup="openSearchPopup"
            />
        </div>

        <div class="flex flex-col gap-4 pl-4">
            <GroupRenderer
                v-for="(group, idx) in rightGroups"
                :key="'right-' + idx"
                :group="group"
                :form="form"
                :isEditing="true"
                :expectedProfitAmount="expectedProfitAmount"
                :formatNumber="formatNumber"
                :parseNumberInput="parseNumberInput"
                :openPostcodeSearch="openPostcodeSearch"
                :openSearchPopup="openSearchPopup"
            />
        </div>
    </div>
</template>
