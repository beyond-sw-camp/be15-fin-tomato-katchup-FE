<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl w-[300px] p-6 shadow-md text-center">
      <div class="mb-4 text-sm font-medium">
        <span class="inline-flex items-center">
          🔒 비밀번호를 입력하세요
        </span>
      </div>
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호 입력"
        class="w-full border rounded px-3 py-2 mb-4 text-sm"
      />
      <div class="flex justify-center gap-2">
        <button @click="handleConfirm" class="bg-blue-300 text-white px-4 py-1 rounded">
          확인
        </button>
        <button @click="$emit('close')" class="bg-gray-300 text-white px-4 py-1 rounded">
          취소
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit', 'close']) // 이벤트 이름 'submit'임
const password = ref('')

const handleConfirm = () => {
  emit('submit', password.value) // submit 이벤트로 비밀번호 전달
}
</script>
