<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['create', 'cancel'])

const newRoomName = ref('')
const search = ref('')
const selectedNames = ref([])

const users = [
  '박준서',
  '박장우',
  '오유경',
  '이승재',
  '윤채영',
  '조현승'
]

const filteredUsers = computed(() =>
  users.filter(name => name.includes(search.value))
)

const toggleSelection = (name) => {
  if (selectedNames.value.includes(name)) {
    selectedNames.value = selectedNames.value.filter(n => n !== name)
  } else {
    selectedNames.value.push(name)
  }
}

const handleCreate = () => {
  if (!newRoomName.value.trim() || !selectedNames.value.length) return

  emit('create', {
    id: Date.now(),
    name: newRoomName.value,
    lastMessage: '',
    time: '방금 전',
    unreadCount: 0,
    members: selectedNames.value.length
  })

  // 초기화
  newRoomName.value = ''
  selectedNames.value = []
  search.value = ''
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl w-[360px] max-h-[560px] shadow-lg flex flex-col overflow-hidden">
      <!-- 헤더 -->
      <div class="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 class="text-base font-semibold">새 채팅방 만들기</h3>
        <button @click="$emit('cancel')" class="text-gray-400 hover:text-gray-600 text-sm">✕</button>
      </div>

      <!-- 채팅방 이름 입력 -->
      <div class="p-4 pt-2">
        <input
          v-model="newRoomName"
          type="text"
          placeholder="채팅방 이름을 입력하세요"
          class="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md text-sm"
        />

        <!-- 이름 검색 -->
        <input
          v-model="search"
          type="text"
          placeholder="이름 검색"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
      </div>

      <!-- 유저 리스트 -->
      <div class="flex-1 overflow-y-auto px-4 pb-4">
        <div
          v-for="name in filteredUsers"
          :key="name"
          class="flex items-center justify-between py-2 border-b border-gray-100"
        >
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs font-bold">
              {{ name.charAt(0) }}
            </div>
            <span class="text-sm">{{ name }}</span>
          </div>
          <input
            type="checkbox"
            :checked="selectedNames.includes(name)"
            @change="toggleSelection(name)"
          />
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="flex justify-end gap-2 border-t border-gray-200 p-4">
        <button
          class="text-sm px-4 py-2 border border-gray-300 rounded-md"
          @click="$emit('cancel')"
        >
          취소
        </button>
        <button
          class="btn-create bg-[--color-btn-blue]"
          @click="handleCreate"
        >
          생성
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
