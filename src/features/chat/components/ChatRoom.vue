<template>
  <div
    class="fixed bottom-10 right-10 w-[480px] h-[700px]
           bg-white rounded-2xl shadow-xl border border-gray-200
           flex flex-col z-50 font-[Pretendard]"
  >
    <!-- 헤더 -->
    <div class="flex justify-between items-center px-6 py-4 border-b border-gray-100">
      <h2 class="text-lg font-semibold text-[--color-click]">
        {{ room?.name }}
      </h2>
      <button @click="exitRoom" class="text-gray-400 hover:text-gray-600 transition">
        <Icon icon="si:close-duotone" class="w-5 h-5" />
      </button>
    </div>

    <!-- 메시지 리스트 -->
    <div class="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-[#f8fafc]">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="[
          'flex flex-col max-w-[80%]',
          msg.sender === 'ME' ? 'self-end items-end' : 'self-start items-start'
        ]"
      >
        <span class="text-xs text-gray-400 mb-1">{{ msg.sender }} · {{ msg.time }}</span>
        <div class="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-800">
          {{ msg.text }}
        </div>
      </div>
    </div>

    <!-- 입력창 -->
    <div class="border-t border-gray-100 px-4 py-3">
      <!-- 첨부파일 미리보기 -->
      <div v-if="attachedFile" class="flex flex-col gap-1 mb-2">
        <div class="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 text-sm text-gray-700">
          <Icon icon="codex:file" class="text-sky-500 w-4 h-4" />
          <span class="truncate max-w-[200px]">{{ attachedFile.name }}</span>
          <button @click="attachedFile = null" class="text-xs text-red-500 hover:underline">삭제</button>
        </div>

        <!-- 업로드 진행률 표시 -->
        <div v-if="isUploading" class="h-2 bg-blue-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-blue-500 transition-all duration-300"
            :style="{ width: uploadProgress + '%' }"
          ></div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- 파일 업로드 버튼 -->
        <button @click="triggerFileUpload" class="text-[--color-btn-sky] text-xl">
          <Icon icon="codex:file" class="w-5 h-5" />
        </button>

        <input
          ref="fileInput"
          type="file"
          class="hidden"
          @change="handleFileChange"
        />

        <!-- 텍스트 입력 -->
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="메시지를 입력하세요"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[--color-request]"
        />

        <button
          @click="sendMessage"
          :disabled="(!newMessage.trim() && !attachedFile) || isUploading"
          class="px-3 py-2 text-sm rounded-full text-white bg-blue-500 hover:brightness-105 disabled:opacity-40"
        >
          전송
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Icon } from '@iconify/vue'

// Props & Emits
const props = defineProps({ room: Object })
const emit = defineEmits(['close'])

// States
const newMessage = ref('')
const messages = ref([])
const fileInput = ref(null)
const attachedFile = ref(null)
const uploadProgress = ref(0)
const isUploading = ref(false)

// 채팅 메시지 불러오기
const fetchMessages = async () => {
  const res = await axios.get(`/api/v1/chats/${props.room.id}/messages`)
  messages.value = res.data.data
}

// 메시지 전송
const sendMessage = () => {
  if (!newMessage.value.trim() && !attachedFile.value) return

  messages.value.push({
    sender: 'ME',
    text: newMessage.value || '(파일 전송됨)',
    time: new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  })

  newMessage.value = ''
  attachedFile.value = null
}

// 파일 선택창 열기
const triggerFileUpload = () => {
  fileInput.value?.click()
}

// 파일 선택 + 업로드 + 진행률 표시
const handleFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  attachedFile.value = file
  isUploading.value = true
  uploadProgress.value = 0

  const formData = new FormData()
  formData.append('file', file)

  try {
    await axios.post('/api/v1/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        uploadProgress.value = percent
      }
    })

    isUploading.value = false
  } catch (err) {
    console.error('파일 업로드 실패', err)
    isUploading.value = false
  }
}

// 채팅방 나가기
const exitRoom = () => {
  emit('close', props.room.id)
}

onMounted(fetchMessages)
</script>
