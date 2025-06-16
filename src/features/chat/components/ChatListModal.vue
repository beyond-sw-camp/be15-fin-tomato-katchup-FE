<template>
  <div
    class="fixed bottom-24 right-6 w-[420px] max-h-[600px]
           bg-white rounded-2xl shadow-xl border border-gray-200 z-50 flex flex-col font-[Pretendard]">

    <!-- 헤더 -->
    <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
      <h2 class="text-lg font-bold text-[--color-click]">채팅 리스트</h2>
      <button
        @click="showCreateModal = true"
        class="text-[--color-request] text-2xl hover:brightness-110"
      >+</button>
    </div>

    <!-- 검색 -->
    <div class="px-6 py-3 border-b border-gray-100">
      <input
        v-model="search"
        type="text"
        placeholder="제목, 이름 검색"
        class="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[--color-request]"
      />
    </div>

    <!-- 채팅방 목록 -->
    <ul class="flex-1 overflow-y-auto divide-y divide-gray-100 px-1">
      <li
        v-for="room in filteredRooms"
        :key="room.id"
        class="flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition relative"
      >
        <!-- 채팅방 클릭 영역 -->
        <div class="flex items-center gap-3 cursor-pointer" @click="$emit('open-room', room)">
          <div
            class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm"
          >
            {{ room.name.charAt(0) }}
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-2 font-semibold text-[--color-click] text-sm">
              {{ room.name }}
              <span class="text-gray-400 text-xs flex items-center gap-1">
                👥 {{ room.members ?? '-' }}
              </span>
            </div>
            <p class="text-xs text-gray-500 truncate max-w-[240px]">
              {{ room.lastMessage }}
            </p>
          </div>
        </div>

        <!-- 시간 + 점 버튼 -->
        <div class="flex flex-col items-end gap-1 min-w-[64px]">
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400">{{ room.time }}</span>
            <button
              @click.stop="confirmLeave(room)"
              class="text-gray-400 hover:text-gray-600 text-xl"
            >
              ⋯
            </button>
          </div>
          <span
            v-if="room.unreadCount > 0"
            class="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full"
          >
            {{ room.unreadCount }}
          </span>
        </div>
      </li>
    </ul>

    <!-- 하단 채팅방 생성 버튼 -->
    <div class="p-3 border-t border-gray-100 text-center">
      <button
        class="w-8 h-8 rounded-full bg-[--color-request] text-white text-xl shadow hover:brightness-110 transition"
        @click="showCreateModal = true"
      >+</button>
    </div>

    <!-- 채팅방 생성 모달 -->
    <AddChatRoom
      v-if="showCreateModal"
      @create="addRoom"
      @cancel="showCreateModal = false"
    />

    <!-- 퇴장 확인 모달 -->
    <ConfirmLeaveModal
      v-if="selectedRoomToLeave"
      :room="selectedRoomToLeave"
      @confirm="leaveRoom"
      @cancel="selectedRoomToLeave = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import AddChatRoom from './AddChatRoom.vue'
import ConfirmLeaveModal from './ConfirmLeaveModal.vue'

defineEmits(['open-room'])

const chatRooms = ref([])
const search = ref('')
const showCreateModal = ref(false)
const selectedRoomToLeave = ref(null)

const fetchChatRooms = async () => {
  const res = await axios.get('/api/v1/chats')
  chatRooms.value = res.data.data
}

const addRoom = (newRoom) => {
  chatRooms.value.unshift(newRoom)
  showCreateModal.value = false
}

const confirmLeave = (room) => {
  selectedRoomToLeave.value = room
}

const leaveRoom = () => {
  chatRooms.value = chatRooms.value.filter(
    (room) => room.id !== selectedRoomToLeave.value.id
  )
  selectedRoomToLeave.value = null
}

onMounted(fetchChatRooms)

const filteredRooms = computed(() => {
  if (!search.value) return chatRooms.value
  return chatRooms.value.filter((room) =>
    room.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>
