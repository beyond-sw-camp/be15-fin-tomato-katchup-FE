<script setup>
import { ref } from 'vue'
import QuillEditor from '@/components/common/QuillEditor.vue'

defineProps({
  name: String,
  email: String,
  title: String,
  initialContent: String,
})

const editorContent = ref('')
</script>

<template>
  <div class="border rounded-lg bg-white p-6 mt-6">
    <div class="mb-4 flex items-center gap-2">
      <label class="w-[80px] font-semibold">이름</label>
      <input type="text" :value="name" readonly class="border px-2 py-1 rounded w-full" />
    </div>
    <div class="mb-4 flex items-center gap-2">
      <label class="w-[74px] font-semibold">이메일</label>
      <input type="email" :value="email" readonly class="border px-2 py-1 rounded w-[20%]" />
      <button class="btn-open-popup">
        검색
      </button>
    </div>
    <div class="mb-4 flex items-start gap-2">
      <label class="w-[80px] font-semibold">제목</label>
      <input type="text" :value="title" class="border px-2 py-1 rounded w-full" />
    </div>
    <div class="mb-4 flex items-start gap-2">
      <label class="w-[75px] font-semibold pt-2">내용</label>
      <div class="flex-1">
        <QuillEditor v-model:content="editorContent" />
        <div class="flex justify-end">
          <button class="btn-create">
            전송
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
