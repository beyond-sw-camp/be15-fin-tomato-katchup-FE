<script setup>
import Header from '@/components/layout/Header.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const isNoLayout = computed(() => route.meta.useLayout === 'none');
</script>

<template>
    <div v-if="isNoLayout">
        <!-- 레이아웃 없는 경우 (팝업 전용) -->
        <router-view />
    </div>

    <div v-else class="w-full min-h-screen bg-background flex flex-col font-sans">
        <Header />
        <div class="flex flex-1 flex-col p-16 mt-10">
            <router-view class="flex-1 w-full" />
        </div>
    </div>
</template>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');

* {
    font-family: 'Pretendard Variable', sans-serif;
}
</style>
