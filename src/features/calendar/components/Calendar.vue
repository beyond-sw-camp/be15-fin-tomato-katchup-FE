<script setup>
import { ref, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const today = new Date().toISOString().split('T')[0]
const selectedDate = ref(today)

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  selectable: true,
  dateClick(info) {
    selectedDate.value = info.dateStr
  },
  events: [
    {
      title: '워크샵',
      start: '2025-06-04T09:00:00',
      end: '2025-06-04T18:00:00',
      backgroundColor: '#facc15'
    },
    {
      title: '휴가',
      start: '2025-06-04T09:00:00',
      end: '2025-06-04T18:00:00',
      backgroundColor: '#a78bfa'
    }
  ]
}

const filteredEvents = computed(() => {
  return calendarOptions.events.filter(event =>
    event.start.startsWith(selectedDate.value)
  )
})
</script>

<template>
  <div class="container">
  <div class="flex p-6 gap-6">
    <!-- 왼쪽: 캘린더 -->
    <div class="w-2/3 bg-white rounded-xl shadow-md p-4">
      <FullCalendar :options="calendarOptions" />
    </div>

    <!-- 오른쪽: 상세 보기 -->
    <div class="w-1/3 bg-white rounded-xl shadow-md p-5 min-h-[400px]">
      <div class="text-gray-800 font-semibold text-base mb-4">
        {{ selectedDate }}
      </div>

      <div v-if="filteredEvents.length > 0">
        <div
          v-for="(event, index) in filteredEvents"
          :key="index"
          class="flex bg-gray-100 rounded-md p-3 mb-3 min-h-[72px]"
        >
          <!-- 왼쪽 색상바 -->
          <div class="flex items-stretch">
            <div
              class="w-1.5 rounded-sm"
              :style="{ backgroundColor: event.backgroundColor, width: '4px', height: '100%' }"
            ></div>
          </div>

          <!-- 중앙: 시간 + 제목 -->
          <div class="flex-1 pl-3 flex flex-col justify-center">
            <span class="text-xs text-gray-500">{{ event.start.slice(11, 16) }}</span>
            <span class="text-sm text-gray-800 font-medium">{{ event.title }}</span>
            <span class="text-xs text-gray-500">{{ event.end.slice(11, 16) }}</span>
          </div>

          <!-- 우측: 아이콘 -->
          <div class="flex items-start gap-2 ml-2">
            <button class="text-orange-500 hover:text-orange-600 text-sm">✏️</button>
            <button class="text-pink-500 hover:text-pink-600 text-sm">❌</button>
          </div>
        </div>


      </div>
      <div v-else class="text-sm text-gray-400">일정이 없습니다.</div>

      <!-- 추가 버튼 -->
      <div class="flex justify-center mt-6">
        <button class="w-8 h-8 rounded-full bg-gray-200 text-xl text-gray-600 hover:bg-gray-300">+</button>
      </div>
    </div>
  </div>
  </div>
</template>
