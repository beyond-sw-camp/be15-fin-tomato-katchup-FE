<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
    title: String,
    value: String,
    icon: String,
});
</script>

<template>
    <div class="flex flex-col gap-5 px-4">
        <div class="text-md text-gray-medium text-left">{{ title }}</div>
        <div class="flex flex-row justify-between mb-5">
            <div class="font-semibold text-3xl mt-3">{{ value }}</div>
            <Icon :icon="icon" class="w-15 h-15 text-gray-medium" />
        </div>
    </div>
</template>
