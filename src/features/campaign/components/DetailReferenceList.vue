<template>
    <div class="flex items-center justify-between mt-1 mb-5">
        <!-- 상단: 제목 + 버튼 -->
        <div class="flex justify-between items-center w-full">
            <div class="text-lg font-bold">{{ title }} ({{ items.length }})</div>
            <button class="btn-create" @click="handleCreate">
                {{ createButtonText }}
            </button>
        </div>
    </div>

    <!-- 구분선 -->
    <div class="blue-line mb-4"></div>

    <!-- 리스트 -->
    <div class="flex flex-col gap-2 items-start max-h-[120px] overflow-y-auto">
        <div
            v-for="(item, index) in items"
            :key="item.id"
            class="hover:underline cursor-pointer"
            @click="handleSelect(item)"
        >
            <slot name="item" :item="item" :index="index">
                {{ item.title }}
            </slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: { type: String, default: '참고 리스트' },
    createButtonText: { type: String, default: '추가' },
    items: { type: Array, default: () => [] },
});

const emit = defineEmits(['create', 'select']);

const handleCreate = () => emit('create');
const handleSelect = (item) => emit('select', item);
</script>
