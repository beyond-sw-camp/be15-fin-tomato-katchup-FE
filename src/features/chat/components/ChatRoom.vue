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
      <div class="flex items-center gap-2">
        <button @click="triggerFileUpload" class="text-[--color-btn-sky] text-xl">
          <Icon icon="codex:file" class="w-5 h-5" />
        </button>

        <input
          ref="fileInput"
          type="file"
          class="hidden"
          @change="handleFileChange"
        />

        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="메시지를 입력하세요"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[--color-request]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Icon } from '@iconify/vue'

const props = defineProps({ room: Object })
const emit = defineEmits(['close'])

const newMessage = ref('')
const messages = ref([])
const fileInput = ref(null)

const fetchMessages = async () => {
  const res = await axios.get(`/api/v1/chats/${props.room.id}/messages`)
  messages.value = res.data.data
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  messages.value.push({
    sender: 'ME',
    text: newMessage.value,
    time: new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  })
  newMessage.value = ''
}

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    console.log('첨부된 파일:', file)
    // TODO: 파일 업로드 로직 추가
  }
}

const exitRoom = () => {
  emit('close', props.room.id)
}

onMounted(fetchMessages)
</script>

