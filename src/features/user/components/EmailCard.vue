<script setup>
defineProps({
    emailList: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div
        class="grid grid-cols-3 w-full border border-gray-medium bg-white shadow-sm p-5 hover:bg-gray-100 transition-colors duration-200"
    >
        <!-- 왼쪽: 이미지 -->
        <div class="flex flex-col justify-between min-h-[80px]">
            <img src="@/assets/images/mock/EmailSystem.png" width="125" />
            <!-- 이미지 아래 텍스트 -->
            <div class="mt-3 text-sm text-gray-700">
                <p class="text-gray-medium mb-3">{{ emailList.artist_name }}</p>
                <p class="text-gray-medium mb-3">{{ emailList.contacts }}</p>
            </div>
            <div class="mt-1 text-lg">
                <p class="font-semibold">{{ emailList.campaign_name }}</p>
            </div>

        </div>

        <!-- 가운데: 텍스트 정보 -->
        <div class="flex flex-col justify-start gap-1 text-sm text-black">
            <p class="text-lg font-bold mb-2">{{ emailList.client_name }}</p>
            <p class="text-sm font-bold text-gray-medium">{{ emailList.clientCompany_name }}</p>
            <p class="text-sm font-bold text-gray-medium">{{ emailList.client_email }}</p>
        </div>

        <!-- 오른쪽 버튼들 -->
        <div class="flex justify-center items-center">
        <div class="flex flex-col items-end gap-5">
            <button
                class="bg-white border-2 border-btn-sky text-sm px-2 py-3 rounded hover:bg-btn-sky"
            >
                만족도 평가 요청
            </button>
            <button
                class="bg-white border-2 border-btn-sky text-sm px-2 py-3 rounded hover:bg-btn-sky"
            >
                만족도 평가 조회
            </button>
            <button
                class="bg-white border-2 border-btn-sky text-sm px-2 py-3 rounded hover:bg-btn-sky"
            >
                성과 보고서 전송
            </button>
        </div>
    </div>
    </div>
</template>

<style scoped></style>
