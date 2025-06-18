<script setup>
import { ref, computed } from 'vue'
import CommonFiltering from '@/components/layout/CommonFiltering.vue'
import { Icon } from '@iconify/vue';
import SmallTemplateModal from '@/features/contract/components/SmallTemplateModal.vue';


// 큰 틀 목록
const bigList = ref([
  { id: 1, name: '계약서' },
  { id: 2, name: '이메일' },
])

// 작은 틀 목록
const smallList = ref([
  { id: 1, name: '특수 계약서', parentId: 1, content: '특수 계약서에 대한 상세내용', createdAt: '2025-06-18', active: false },
  { id: 2, name: '일반 계약서', parentId: 1, content: '일반 계약서 설명', createdAt: '2025-06-17', active: false },
  { id: 3, name: '제안문의 메일', parentId: 2, content: '제안 관련 메일', createdAt: '2025-06-10', active: false },
  { id: 4, name: '일정조정 메일', parentId: 2, content: '일정 조정 메일', createdAt: '2025-06-11', active: false },
])

const selectedBig = ref(bigList.value[0])
const selectedSmall = ref(null)
const showBigInput = ref(false)
const newBigName = ref('')
const showSmallModal = ref(false)

function handleAddSmall(newItem) {
  smallList.value.push(newItem)
}

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

// 큰 틀 추가
function confirmAddBig() {
  const name = newBigName.value.trim()
  if (!name) return alert('이름을 입력해주세요.')
  if (bigList.value.some(item => item.name === name)) {
    return alert('이미 존재하는 이름입니다.')
  }

  bigList.value.push({
    id: Date.now(),
    name
  })
  newBigName.value = ''
  showBigInput.value = false
}

// 취소
function cancelAddBig() {
  newBigName.value = ''
  showBigInput.value = false
}
</script>

<template>
  <div class="w-full">
    <div class="flex gap-6">
      <CommonFiltering />

      <div class="container">
        <!-- 헤더 -->
        <div class="page-header">
          <div class="page-title">템플릿 목록</div>
        </div>
        <div class="blue-line mb-6"></div>

        <!-- 본문 카드 -->
        <div class="tem-box flex gap-6">
          <!-- 큰 틀 -->
          <div class="w-[300px] border rounded bg-white flex flex-col">
            <!-- 헤더 -->
            <div class="flex items-center justify-between px-4 pt-4 pb-2">
              <h3 class="font-bold text-sm">큰 틀</h3>
              <button class="text-gray-dark text-sm cursor-pointer" @click="showBigInput = true">
                <Icon icon="tdesign:plus" width="24" height="24" />
              </button>
            </div>
            <div class="border-t border-gray-300 mb-2"></div>

            <!-- 리스트 -->
            <div class="overflow-y-auto flex-1 px-4">
              <div
                v-for="item in bigList"
                :key="item.id"
                class="group relative mb-2"
              >
                <div class="flex items-center gap-2">
                  <!-- 체크박스: 입력창 열려있을 때 비활성화 -->
                  <input
                    type="radio"
                    :value="item"
                    v-model="selectedBig"
                    :disabled="showBigInput"
                  />

                  <input
                    type="text"
                    :value="item.name"
                    readonly
                    class="w-full border px-2 py-1 rounded text-sm cursor-pointer"
                  />

                  <!-- 수정 & 삭제 아이콘 -->
                  <div class="absolute right-0 top-1 hidden group-hover:flex gap-1">
                    <button class="cursor-pointer"
                            @click="editItem(item)"
                            :disabled="showBigInput"
                            :class="{ 'opacity-30 pointer-events-none': showBigInput }"
                    >
                      <Icon icon="ei:pencil" class="w-6 h-6" />
                    </button>
                    <button
                      class="cursor-pointer"
                      @click="deleteItem(item)"
                      :disabled="showBigInput"
                      :class="{ 'opacity-30 pointer-events-none': showBigInput }"
                    >
                      <Icon icon="iconoir:cancel" width="20" height="20" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- 입력창 -->
              <div v-if="showBigInput" class="flex items-center gap-2 mb-2">
                <input
                  v-model="newBigName"
                  placeholder="큰 틀을 입력하세요."
                  class="w-full border px-2 py-1 rounded text-sm"
                />
                <button @click="confirmAddBig">
                  <Icon icon="teenyicons:tick-small-outline" class="w-6 h-6" />
                </button>
                <button @click="cancelAddBig">
                  <Icon icon="iconoir:cancel" width="20" height="20" />
                </button>
              </div>
            </div>
          </div>


            <!-- 작은 틀 -->
          <div class="w-[300px] border rounded bg-white flex flex-col">
            <div class="flex items-center justify-between px-4 pt-4 pb-2">
              <h3 class="font-bold text-sm">작은 틀</h3>
              <button class="text-gray-dark text-sm cursor-pointer"
                      @click="showSmallModal = true"
              ><Icon icon="tdesign:plus" width="24" height="24" /></button>
            </div>
            <div class="border-t border-gray-medium mb-2"></div>

            <div class="overflow-y-auto flex-1 px-4">
              <div
                v-for="item in filteredSmallList"
                :key="item.id"
                class="group relative mb-2"
              >
                <div class="flex items-center gap-2">
                  <input type="radio" :value="item" v-model="selectedSmall" />
                  <input
                    type="text"
                    :value="item.name"
                    readonly
                    class="w-full border px-2 py-1 rounded text-sm cursor-pointer"
                  />
                  <div class="absolute right-0 top-1 hidden group-hover:flex gap-1">
                    <button class="cursor-pointer" @click="editItem(item)"><Icon icon="ei:pencil" class="w-6 h-6" /></button>
                    <button class="cursor-pointer" @click="deleteItem(item)"><Icon icon="iconoir:cancel" width="20" height="20" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 정보 -->
          <div class="w-[650px] border rounded bg-white flex flex-col">
            <div class="flex items-center justify-between px-4 pt-4 pb-2">
              <h3 class="font-bold text-sm">정보</h3>
            </div>
            <div class="border-t border-gray-medium mb-2"></div>

            <div class="flex-1 px-4 overflow-y-auto">
              <template v-if="selectedSmall">
                <div class="flex items-center gap-4 mb-4">
                  <div class="flex items-center gap-2">
                    <label class="font-semibold whitespace-nowrap">이름</label>
                    <input v-model="selectedSmall.name" class="border rounded px-2 py-1 text-sm w-[150px]" readonly/>
                  </div>
                  <div class="flex items-center gap-2">
                    <label class="font-semibold whitespace-nowrap">생성일자</label>
                    <input v-model="selectedSmall.createdAt" class="border rounded px-2 py-1 text-sm w-[120px]" readonly/>
                  </div>
                  <div class="flex items-center gap-2">
                    <label class="font-semibold whitespace-nowrap">사용여부</label>
                    <input type="checkbox" v-model="selectedSmall.active" />
                  </div>
                </div>

                <div>
                  <label class="block font-semibold mb-1">내용</label>
                  <textarea
                    v-model="selectedSmall.content"
                    class="w-full border rounded px-2 py-1 text-sm h-24"
                    readonly
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
  </div>
  <SmallTemplateModal
    :selectedBig="selectedBig"
    :show="showSmallModal"
    @submit="handleAddSmall"
    @close="showSmallModal = false"
  />
</template>

