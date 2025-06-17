<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
    getUser,
    getClientCompany,
    getClientManager,
    getInfluencer,
} from '@/features/campaign/api.js';

const route = useRoute();
const type = route.query.type ?? 'user';
const title = route.query.title ?? '검색';
const labelKey = route.query.labelKey ?? 'name';
const valueKey = route.query.valueKey ?? 'id';
const selectedParam = route.query.selected ?? '';
const placeholder = route.query.placeholder ?? '검색어를 입력하세요';

const searchKeyword = ref('');
const selectedItems = ref([]);
const allItems = ref([]);

const fetchData = async () => {
    let res = null;
    try {
        if (type === 'user') {
            res = await getUser();
        } else if (type === 'company') {
            res = await getClientCompany();
        } else if (type === 'manager') {
            res = await getClientManager();
        } else if (type === 'influencer') {
            res = await getInfluencer();
        } else {
            console.error('Unknown search type:', type);
        }
        allItems.value = res.data.data;
    } catch (e) {
        console.error('검색 데이터 조회 실패:', e);
    }
};

onMounted(async () => {
    await fetchData();

    if (selectedParam) {
        selectedItems.value = selectedParam.split(',').map((s) => s.trim());
    }
});

const filteredItems = computed(() => {
    if (!searchKeyword.value) return allItems.value;
    return allItems.value.filter((item) =>
        (item[labelKey] ?? '').toLowerCase().includes(searchKeyword.value.toLowerCase()),
    );
});

const isSelected = (item) => selectedItems.value.includes(item[valueKey]);

const toggleSelect = (item) => {
    const id = item[valueKey];

    if (type === 'user' || type === 'influencer') {
        // 다중 선택 유지
        if (isSelected(item)) {
            selectedItems.value = selectedItems.value.filter((i) => i !== id);
        } else {
            selectedItems.value.push(id);
        }
    } else {
        // 단일 선택은 클릭 즉시 선택 완료
        selectedItems.value = [id];
        submit();
    }
};

const submit = () => {
    let result = null;

    if (type === 'user' || type === 'influencer') {
        result = allItems.value.filter((item) => selectedItems.value.includes(item[valueKey]));
    } else {
        const selectedObj = allItems.value.find(
            (item) => item[valueKey] === selectedItems.value[0],
        );
        result = selectedObj ?? null;
    }

    window.opener?.handleUserSelect(result);
    window.close();
};

const closePopup = () => window.close();
</script>

<template>
    <div class="p-6 w-[500px] font-sans bg-white">
        <h2 class="font-bold text-lg mb-6">{{ title }}</h2>

        <div class="mb-6">
            <input
                v-model="searchKeyword"
                type="text"
                :placeholder="placeholder"
                class="border border-gray-300 rounded w-full p-3 text-base"
            />
        </div>

        <div class="pt-2">
            <div
                v-if="filteredItems.length"
                class="flex flex-col gap-2 max-h-[300px] overflow-y-auto"
            >
                <div
                    v-for="item in filteredItems"
                    :key="item[valueKey]"
                    class="flex justify-between items-center border border-gray-300 rounded p-3 hover:bg-blue-100 cursor-pointer"
                    :class="{ 'bg-blue-200': isSelected(item) }"
                    @click="toggleSelect(item)"
                >
                    <span>{{ item[labelKey] }}</span>
                    <span v-if="isSelected(item)" class="text-blue-500 font-bold">선택됨</span>
                </div>
            </div>

            <div v-else class="text-gray-400 text-sm py-8 text-center">검색 결과가 없습니다.</div>
        </div>

        <div class="mt-8 flex gap-4 justify-end">
            <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="submit">
                선택 완료
            </button>
            <button class="px-4 py-2 bg-gray-300 rounded" @click="closePopup">취소</button>
        </div>
    </div>
</template>
