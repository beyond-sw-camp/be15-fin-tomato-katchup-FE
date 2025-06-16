<script setup>
import { ref, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

// 오늘 날짜 yyyy-MM-dd 형식
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
      backgroundColor: '#6366f1'
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
    <div class="flex justify-between p-4">
      <!-- 왼쪽: 캘린더 -->
      <div class="w-2/3 rounded-lg shadow-md bg-white p-4">
        <FullCalendar :options="calendarOptions" />
      </div>

      <!-- 오른쪽: 일정 상세보기 -->
      <div class="w-1/3 ml-6 bg-white shadow-md rounded-2xl p-4 min-h-[300px]">
        <div v-if="selectedDate" class="mb-4 font-bold text-gray-700 text-lg">
          {{ selectedDate }}
        </div>

        <div v-if="filteredEvents.length > 0">
          <div
            v-for="(event, index) in filteredEvents"
            :key="index"
            class="flex items-center justify-between p-3 mb-3 rounded-md bg-gray-100"
          >
            <div class="flex items-start gap-2">
              <div class="w-1 rounded-sm" :style="{ backgroundColor: event.backgroundColor }"></div>
              <div>
                <div class="text-sm font-semibold text-gray-800">
                  {{ event.title }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ event.start.slice(11, 16) }} ~ {{ event.end.slice(11, 16) }}
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 text-gray-500">
              <button class="text-sm hover:text-gray-800">✏️</button>
              <button class="text-sm hover:text-gray-800">❌</button>
            </div>
          </div>
        </div>

        <div v-else class="text-gray-400 text-sm">일정이 없습니다.</div>

        <div class="flex justify-center mt-4">
          <button
            class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
