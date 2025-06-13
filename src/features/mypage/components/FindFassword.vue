<template>
  <div class="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
    <div class="bg-white w-full max-w-[500px] rounded-[12px] p-6">
      <h2 class="text-xl font-bold mb-6">비밀번호 변경</h2>

      <!-- 현재 비밀번호 -->
      <div class="mb-4">
        <label class="block text-sm text-gray-500 mb-1">현재 비밀번호</label>
        <input
          type="password"
          v-model="form.current"
          class="w-full border border-[#EAEAEA] rounded px-3 py-2"
        />
        <p v-if="!valid.current" class="text-xs text-red-500 mt-1">
          현재 비밀번호가 일치하지 않습니다.
        </p>
      </div> <br>

      <!-- 새 비밀번호 -->
      <div class="mb-4">
        <label class="block text-sm text-gray-500 mb-1">새 비밀번호</label>
        <input type="password" v-model="form.new" class="w-full border border-[#EAEAEA] rounded px-3 py-2" />
      </div>

      <!-- 새 비밀번호 확인 -->
      <div class="mb-6">
        <label class="block text-sm text-gray-500 mb-1">새 비밀번호 확인</label>
        <input
          type="password"
          v-model="form.confirm"
          class="w-full border border-[#EAEAEA] rounded px-3 py-2"
        />
        <p
          v-if="form.new && form.confirm"
          :class="['text-xs mt-1',form.new === form.confirm ? 'text-blue-500' : 'text-red-500']"
        >
          {{ form.new === form.confirm ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.' }}
        </p>
      </div>

      <div class="flex justify-end gap-3">
        <button class="bg-gray-300 text-white text-sm px-4 py-2 rounded cursor-pointer" @click="$emit('close')">
          취소
        </button>
        <button class="bg-[#A8C1DA] text-white text-sm px-4 py-2 rounded cursor-pointer" @click="handleSubmit">
          변경
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { reactive } from 'vue'

const toast = useToast()
const emit = defineEmits(['close'])

// form 데이터
const form = reactive({
  current: '',
  new: '',
  confirm: ''
})

// 유효성 상태
const valid = reactive({
  current: true
})

// 현재 비밀번호
const realPassword = '1234'

const handleSubmit = () => {
  if (form.current !== realPassword) {
    valid.current = false
    return
  } else {
    toast.success("비밀번호가 변경되었습니다.")
    valid.current = true
  }

  if (form.new === form.confirm) {
    console.log('비밀번호 변경 요청:', form)
    emit('close')
  }
}
</script>

