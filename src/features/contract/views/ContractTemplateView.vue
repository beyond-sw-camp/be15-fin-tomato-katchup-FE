<script setup>
import { ref, computed } from 'vue'
import CommonFiltering from '@/components/layout/CommonFiltering.vue'

// 큰 틀 목록
const bigList = ref([
  { id: 1, name: '계약서' },
  { id: 2, name: '이메일' }
])

// 작은 틀 목록
const smallList = ref([
  { id: 1, name: '특수 계약서', parentId: 1, content: '특수 계약서에 대한 상세내용', createdAt: '2025-06-18', active: false },
  { id: 2, name: '일반 계약서', parentId: 1, content: '일반 계약서 설명', createdAt: '2025-06-17', active: false },
  { id: 3, name: '제안문의 메일', parentId: 2, content: '제안 관련 메일', createdAt: '2025-06-10', active: false },
  { id: 4, name: '일정조정 메일', parentId: 2, content: '일정 조정 메일', createdAt: '2025-06-11', active: false }
])

const selectedBig = ref(bigList.value[0])
const selectedSmall = ref(null)

// 큰 틀에 따른 작은 틀 필터링
const filteredSmallList = computed(() =>
  smallList.value.filter(s => s.parentId === selectedBig.value.id)
)

// 편집 및 삭제 핸들러 (기능은 원하는 대로 확장 가능)
function editItem(item) {
  console.log('수정:', item)
}

function deleteItem(item) {
  console.log('삭제:', item)
}
</script>

<template>
  <div class="w-full">
    <div class="flex gap-6">
      <CommonFiltering />

      <div class="container w-full">
        <!-- 헤더 -->
        <div class="page-header">
          <div class="page-title">템플릿 목록</div>
        </div>
        <div class="blue-line mb-6"></div>

        <!-- 3단 박스 -->
        <div class="flex gap-4">
          <!-- 큰 틀 -->
          <div class="w-1/4 border p-4 rounded shadow">
            <div class="font-bold mb-2 flex justify-between items-center">
              <span>큰 틀</span>
              <button class="text-gray-500 text-sm">＋</button>
            </div>
            <div v-for="item in bigList" :key="item.id" class="group relative mb-2">
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  :value="item"
                  v-model="selectedBig"
                  class="mt-[1px]"
                />
                <input
                  type="text"
                  :value="item.name"
                  readonly
                  class="w-full border rounded px-2 py-1 text-sm cursor-pointer"
                />
                <div class="absolute right-2 top-1 hidden group-hover:flex gap-1">
                  <button @click="editItem(item)" class="text-gray-500">✏️</button>
                  <button @click="deleteItem(item)" class="text-gray-500">❌</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 작은 틀 -->
          <div class="w-1/4 border p-4 rounded shadow">
            <div class="font-bold mb-2 flex justify-between items-center">
              <span>작은 틀</span>
              <button class="text-gray-500 text-sm">＋</button>
            </div>
            <div v-for="item in filteredSmallList" :key="item.id" class="group relative mb-2">
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  :value="item"
                  v-model="selectedSmall"
                  class="mt-[1px]"
                />
                <input
                  type="text"
                  :value="item.name"
                  readonly
                  class="w-full border rounded px-2 py-1 text-sm cursor-pointer"
                />
                <div class="absolute right-2 top-1 hidden group-hover:flex gap-1">
                  <button @click="editItem(item)" class="text-gray-500">✏️</button>
                  <button @click="deleteItem(item)" class="text-gray-500">❌</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 정보 -->
          <div class="w-2/4 border p-4 rounded shadow">
            <div class="font-bold mb-4">정보</div>

            <template v-if="selectedSmall">
              <!-- 이름 / 생성일자 / 사용여부 한 줄 정렬 -->
              <div class="flex items-center gap-4 mb-4">
                <div class="flex items-center gap-2">
                  <label class="font-semibold whitespace-nowrap">이름</label>
                  <input v-model="selectedSmall.name" class="border rounded px-2 py-1 text-sm w-[160px]" />
                </div>
                <div class="flex items-center gap-2">
                  <label class="font-semibold whitespace-nowrap">생성일자</label>
                  <input v-model="selectedSmall.createdAt" type="date" class="border rounded px-2 py-1 text-sm" />
                </div>
                <div class="flex items-center gap-2">
                  <label class="font-semibold whitespace-nowrap">사용여부</label>
                  <input type="checkbox" v-model="selectedSmall.active" />
                </div>
              </div>

              <!-- 내용 -->
              <div>
                <label class="block font-semibold mb-1">내용</label>
                <textarea
                  v-model="selectedSmall.content"
                  class="w-full border rounded px-2 py-1 h-28 text-sm"
                ></textarea>
              </div>
            </template>

            <template v-else>
              <p class="text-gray-400">작은 틀을 선택해주세요.</p>
            </template>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
