<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
    <div class="bg-white w-[320px] rounded-xl shadow-lg p-6">
      <p class="text-sm text-center mb-6">
        <strong class="font-semibold">{{ room.name }}</strong>
        채팅방에서 나가시겠습니까?
      </p>
      <div class="flex justify-center gap-3">
        <button
          class="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition"
          @click="$emit('confirm')"
        >
          나가기
        </button>
        <button
          class="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition"
          @click="$emit('cancel')"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  room: Object
})
const emit = defineEmits(['confirm', 'cancel'])
</script>
