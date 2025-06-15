<script setup>
import { computed, nextTick } from 'vue';

const props = defineProps({
    modelValue: Object,
    isEditing: Boolean,
});
const emit = defineEmits(['update:modelValue', 'submit', 'cancel']);

const popupWidth = 500;
const popupHeight = 600;

const form = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
});

const expectedProfitAmount = computed(() => {
    const revenue = Number(form.value.expectedRevenue) || 0;
    const margin = Number(form.value.expectedProfitMargin) || 0;
    return (revenue * margin) / 100;
});

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

// FormGroups
const groups = [
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
        fields: [{ key: 'clientCompany', label: '고객사', type: 'input', inputType: 'text' }],
    },
    {
        type: 'horizontal',
        fields: [
            { key: 'clientManagerName', label: '광고 담당자', type: 'input', inputType: 'text' },
            {
                key: 'clientManagerPosition',
                label: '직책',
                type: 'input',
                inputType: 'text',
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
            { key: 'startDate', label: '시작일', type: 'input', inputType: 'date' },
            { key: 'endDate', label: '종료일', type: 'input', inputType: 'date' },
            { key: 'address', label: '주소 검색', type: 'address-search' },
            { key: 'addressDetail', label: '상세 주소', type: 'input', inputType: 'text' },
            { key: 'username', label: '담당자', type: 'input', inputType: 'text' },
            { key: 'awarenessPath', label: '인지 경로', type: 'input', inputType: 'text' },
            { key: 'notes', label: '비고', type: 'textarea' },
        ],
    },
];
</script>

<template>
    <form @submit.prevent="emit('submit')" class="grid grid-cols-1 gap-4">
        <template v-for="(group, index) in groups" :key="index">
            <div v-if="group.type === 'horizontal'" class="flex items-center gap-4">
                <template v-for="field in group.fields" :key="field.key">
                    <div :class="field.width || 'flex-1'">
                        <label class="input-form-label">{{ field.label }}</label>

                        <input
                            v-if="field.inputType === 'number'"
                            type="text"
                            :value="formatNumber(form[field.key])"
                            @input="parseNumberInput($event, field.key)"
                            :readonly="!isEditing"
                            class="input-form-box"
                        />

                        <select
                            v-else-if="field.type === 'select'"
                            v-model="form[field.key]"
                            :disabled="!isEditing"
                            class="input-form-box"
                        >
                            <option v-for="option in field.options" :key="option" :value="option">
                                {{ option }}
                            </option>
                        </select>

                        <input
                            v-else
                            type="text"
                            v-model="form[field.key]"
                            :readonly="!isEditing"
                            class="input-form-box"
                        />
                    </div>
                </template>
            </div>

            <template v-else>
                <template v-for="field in group.fields" :key="field.key">
                    <div>
                        <label class="input-form-label">{{ field.label }}</label>

                        <div v-if="field.type === 'address-search'">
                            <div class="flex gap-2">
                                <input
                                    type="text"
                                    v-model="form[field.key]"
                                    readonly
                                    class="input-form-box flex-1 bg-gray-100"
                                />
                                <button
                                    type="button"
                                    class="border bg-gray-300 rounded px-3 py-1 text-sm shadow hover:brightness-95 active:brightness-90 transition"
                                    @click="openPostcodeSearch"
                                    v-if="isEditing"
                                >
                                    검색
                                </button>
                            </div>
                        </div>

                        <textarea
                            v-else-if="field.type === 'textarea'"
                            v-model="form[field.key]"
                            :readonly="!isEditing"
                            rows="3"
                            class="input-form-box"
                        />

                        <input
                            v-else-if="field.inputType === 'number'"
                            type="text"
                            :value="formatNumber(form[field.key])"
                            @input="parseNumberInput($event, field.key)"
                            :readonly="!isEditing"
                            class="input-form-box"
                        />

                        <select
                            v-else-if="field.type === 'select'"
                            v-model="form[field.key]"
                            :disabled="!isEditing"
                            class="input-form-box"
                        >
                            <option v-for="option in field.options" :key="option" :value="option">
                                {{ option }}
                            </option>
                        </select>

                        <input
                            v-else-if="field.inputType === 'date'"
                            type="date"
                            v-model="form[field.key]"
                            :disabled="!isEditing"
                            class="input-form-box"
                        />

                        <input
                            v-else
                            type="text"
                            v-model="form[field.key]"
                            :readonly="!isEditing"
                            class="input-form-box"
                        />

                        <div v-if="field.key === 'expectedProfitMargin'" class="mt-4">
                            <label class="input-form-label">예상 이익 금액</label>
                            <input
                                type="text"
                                :value="formatNumber(expectedProfitAmount)"
                                readonly
                                class="input-form-box bg-gray-100"
                            />
                        </div>
                    </div>
                </template>
            </template>
        </template>
    </form>
</template>
