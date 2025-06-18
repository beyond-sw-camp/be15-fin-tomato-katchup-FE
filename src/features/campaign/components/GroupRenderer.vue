<script setup>
const props = defineProps({
    group: Object,
    form: Object,
    isEditing: Boolean,
    expectedProfitAmount: Number,
    formatNumber: Function,
    parseNumberInput: Function,
    openPostcodeSearch: Function,
    openSearchPopup: Function,
});
</script>

<template>
    <div v-if="group?.fields?.length">
        <!-- 수평 그룹 -->
        <div v-if="group.type === 'horizontal'" class="flex items-center gap-4">
            <template v-for="field in group.fields" :key="field.key">
                <div :class="field.width || 'flex-1'">
                    <label class="input-form-label">{{ field.label }}</label>
                    <template v-if="field.inputType === 'number'">
                        <input
                            type="text"
                            :value="formatNumber(form[field.key])"
                            @input="parseNumberInput($event, field.key)"
                            class="input-form-box"
                        />
                    </template>

                    <template v-else-if="field.type === 'select'">
                        <select v-model="form[field.key]" class="input-form-box">
                            <option v-for="option in field.options" :key="option" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </template>
                    <!-- 날짜 -->
                    <input
                        v-else-if="field.inputType === 'date'"
                        type="date"
                        v-model="form[field.key]"
                        class="input-form-box"
                    />

                    <template v-else>
                        <input type="text" v-model="form[field.key]" class="input-form-box" />
                    </template>
                </div>
            </template>
        </div>

        <!-- 수직 그룹 -->
        <div v-else>
            <template v-for="field in group.fields" :key="field.key">
                <div class="mb-3">
                    <label class="input-form-label">{{ field.label }}</label>

                    <!-- 주소 검색 -->
                    <div v-if="field.type === 'address-search'" class="flex gap-2">
                        <input
                            type="text"
                            v-model="form[field.key]"
                            readonly
                            class="input-form-box bg-gray-100 flex-1"
                        />
                        <button type="button" class="btn-open-popup" @click="openPostcodeSearch">
                            검색
                        </button>
                    </div>

                    <!-- 팝업 검색 -->
                    <div v-else-if="field.type?.startsWith('search-')" class="flex gap-2">
                        <input
                            type="text"
                            :value="form[field.key]?.name || ''"
                            readonly
                            class="input-form-box bg-gray-100 flex-1"
                        />
                        <button
                            type="button"
                            class="btn-open-popup"
                            @click="openSearchPopup(field.key, field.searchType)"
                        >
                            검색
                        </button>
                    </div>

                    <!-- 텍스트에어리어 -->
                    <textarea
                        v-else-if="field.type === 'textarea'"
                        v-model="form[field.key]"
                        rows="3"
                        class="input-form-box"
                    />

                    <!-- 숫자 입력 -->
                    <input
                        v-else-if="field.inputType === 'number'"
                        type="text"
                        :value="formatNumber(form[field.key])"
                        @input="parseNumberInput($event, field.key)"
                        class="input-form-box"
                    />

                    <!-- 셀렉트 -->
                    <select
                        v-else-if="field.type === 'select'"
                        v-model="form[field.key]"
                        class="input-form-box"
                    >
                        <option v-for="option in field.options" :key="option" :value="option">
                            {{ option }}
                        </option>
                    </select>

                    <!-- 기본 인풋 -->
                    <input v-else type="text" v-model="form[field.key]" class="input-form-box" />

                    <!-- 예상 이익 금액 자동계산 -->
                    <div v-if="field.key === 'expectedProfitMargin'" class="mt-2">
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
        </div>
    </div>
</template>
