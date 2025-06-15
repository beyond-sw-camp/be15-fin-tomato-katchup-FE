<script setup>
import { ref } from 'vue';

const props = defineProps({
    modelValue: Object,
    groups: Array,
    isEditing: Boolean,
});
const emit = defineEmits(['update:modelValue', 'submit', 'cancel']);

const form = props.modelValue;
const currentFieldKey = ref(null);

const formatNumber = (value) => {
    if (value === null || value === undefined || isNaN(value)) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseNumberInput = (e, key) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    form[key] = raw ? parseInt(raw, 10) : 0;
};

const openSearchPopup = (key, type) => {
    currentFieldKey.value = key;
    const currentValue = form[key];
    const selected = currentValue?.id ?? '';

    const popup = window.open(
        `/search-popup?type=${type}&selected=${encodeURIComponent(selected)}`,
        'SearchPopup',
        'width=500,height=600',
    );

    window.handleUserSelect = (selectedItem) => {
        form[currentFieldKey.value] = selectedItem;
        popup.close();
    };
};
</script>

<template>
    <form @submit.prevent="emit('submit')" class="grid grid-cols-1 gap-4">
        <template v-for="(group, index) in groups" :key="index">
            <div v-if="group.type === 'horizontal'" class="flex gap-4">
                <template v-for="field in group.fields" :key="field.key">
                    <div class="flex-1">
                        <label class="input-form-label">{{ field.label }}</label>

                        <div v-if="field.type === 'date-range'" class="flex items-center gap-2">
                            <input
                                type="date"
                                v-model="form.startDate"
                                :disabled="!isEditing"
                                class="input-form-box"
                            />
                            <span>~</span>
                            <input
                                type="date"
                                v-model="form.endDate"
                                :disabled="!isEditing"
                                class="input-form-box"
                            />
                        </div>

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
                            v-else-if="field.inputType === 'number'"
                            type="text"
                            :value="formatNumber(form[field.key])"
                            @input="parseNumberInput($event, field.key)"
                            :readonly="!isEditing"
                            class="input-form-box"
                        />

                        <div v-else-if="field.type?.startsWith('search-')" class="flex gap-2">
                            <input
                                type="text"
                                :value="
                                    Array.isArray(form[field.key])
                                        ? form[field.key].map((u) => u.name).join(', ')
                                        : (form[field.key]?.name ?? '')
                                "
                                readonly
                                class="input-form-box flex-1"
                            />
                            <button
                                type="button"
                                v-if="isEditing"
                                class="px-3 py-1 bg-blue-500 text-white rounded"
                                @click="openSearchPopup(field.key, field.searchType)"
                            >
                                검색
                            </button>
                        </div>

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
                    </div>
                </template>
            </div>

            <template v-else>
                <template v-for="field in group.fields" :key="field.key">
                    <div>
                        <label class="input-form-label">{{ field.label }}</label>
                        <textarea
                            v-if="field.type === 'textarea'"
                            v-model="form[field.key]"
                            :readonly="!isEditing"
                            class="input-form-box"
                            rows="3"
                        />
                    </div>
                </template>
            </template>
        </template>
    </form>
</template>
