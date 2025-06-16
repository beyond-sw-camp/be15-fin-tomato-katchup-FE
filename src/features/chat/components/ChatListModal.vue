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
        <!-- 채팅방 클릭 -->
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

    <!-- 채팅방 생성 영역 -->
    <div v-if="showCreateModal" class="absolute top-[60px] left-0 right-0 bg-white shadow p-4 border rounded-xl m-4 z-10">
      <h3 class="text-md font-semibold mb-3">새 채팅방 만들기</h3>
      <input
        v-model="newRoomName"
        type="text"
        placeholder="채팅방 이름을 입력하세요"
        class="w-full mb-3 px-3 py-2 border border-gray-300 rounded text-sm"
      />
      <input
        v-model="memberSearch"
        type="text"
        placeholder="이름 검색"
        class="w-full mb-3 px-3 py-2 border border-gray-300 rounded text-sm"
      />
      <ul class="max-h-40 overflow-y-auto mb-4">
        <li
          v-for="name in filteredNames"
          :key="name"
          class="flex justify-between items-center py-1 px-2 hover:bg-gray-100 rounded"
        >
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white font-bold">
              {{ name.charAt(0) }}
            </div>
            <span class="text-sm">{{ name }}</span>
          </div>
          <input type="checkbox" v-model="selectedMembers" :value="name" />
        </li>
      </ul>
      <div class="flex justify-end gap-2">
        <button class="px-4 py-2 text-sm border rounded" @click="showCreateModal = false">취소</button>
        <button class="px-4 py-2 text-sm bg-[--color-btn-blue] text-white rounded" @click="handleCreate">생성</button>
      </div>
    </div>

    <!-- 퇴장 확인 -->
    <div
      v-if="selectedRoomToLeave"
      class="absolute inset-0 bg-white bg-opacity-90 flex justify-center items-center z-10"
    >
      <div class="bg-white border rounded-xl p-6 shadow-lg text-center">
        <p class="mb-6">
          <strong class="font-semibold">{{ selectedRoomToLeave.name }}</strong>
          채팅방에서 나가시겠습니까?
        </p>
        <div class="flex justify-center gap-3">
          <button
            class="px-4 py-2 text-sm border border-gray-300 rounded"
            @click="selectedRoomToLeave = null"
          >
            취소
          </button>
          <button
            class="px-4 py-2 text-sm border border-gray-300 rounded"
            @click="leaveRoom"
          >
            나가기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

defineEmits(['open-room'])

const chatRooms = ref([])
const search = ref('')
const showCreateModal = ref(false)
const selectedRoomToLeave = ref(null)
const newRoomName = ref('')
const memberSearch = ref('')
const selectedMembers = ref([])

const allMembers = [
  '박준서', '박장우', '오유경', '이승재', '윤채영', '조현승'
]

const filteredNames = computed(() => {
  if (!memberSearch.value) return allMembers
  return allMembers.filter(n => n.includes(memberSearch.value))
})

const fetchChatRooms = async () => {
  const res = await axios.get('/api/v1/chats')
  chatRooms.value = res.data.data
}

const handleCreate = () => {
  if (!newRoomName.value.trim()) return
  chatRooms.value.unshift({
    id: Date.now(),
    name: newRoomName.value,
    members: selectedMembers.value.length,
    lastMessage: '',
    time: '방금 전',
    unreadCount: 0
  })
  newRoomName.value = ''
  selectedMembers.value = []
  memberSearch.value = ''
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
