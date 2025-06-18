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
      <label class="w-[60px] font-semibold">이름</label>
      <input type="text" :value="name" readonly class="border px-2 py-1 rounded w-full" />
    </div>
    <div class="mb-4 flex items-center gap-2">
      <label class="w-[60px] font-semibold">이메일</label>
      <input type="email" :value="email" readonly class="border px-2 py-1 rounded w-full" />
      <button class="bg-purple-600 text-white px-6 py-1 rounded text-sm">검색</button>
    </div>
    <div class="mb-4 flex items-center gap-2">
      <label class="w-[60px] font-semibold">제목</label>
      <input type="text" :value="title" class="border px-2 py-1 rounded w-full" />
    </div>
    <div class="mb-4">
      <label class="block font-semibold mb-1">내용</label>
      <QuillEditor v-model:content="editorContent" />
    </div>
  </div>
</template>
