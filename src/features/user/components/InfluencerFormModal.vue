<template>
  <div class="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
    <div class="bg-white rounded-xl p-6 w-[554px] h-[720px] overflow-y-auto font-display">
      <h2 class="text-lg font-semibold mb-6">인플루언서 등록</h2>

      <!-- 유튜브 / 인스타 연동 -->
      <div class="flex flex-col gap-3 mb-6">
        <!-- 유튜브 -->
        <div class="flex items-center justify-between">
          <div class="w-[85%]">
            <label class="text-sm font-medium mb-1 block">유튜브명</label>
            <input
              v-if="initialData"
              type="text"
              class="w-full h-[44px] border border-gray-medium rounded px-3 text-sm"
              v-model="form.youtubeName"
            />
            <div
              v-else
              class="w-full h-[44px] border border-gray-medium rounded px-3 text-sm flex items-center text-gray-medium"
            >
              유튜브 계정을 연동하세요.
            </div>
          </div>
          <div
            class="w-[44px] h-[24px] rounded-full relative ml-2 cursor-pointer"
            :class="youtubeToggle ? 'bg-green-600' : 'bg-gray-light'"
            @click="handleYoutubeToggle"
          >
            <div
              class="absolute top-1 w-[16px] h-[16px] bg-white rounded-full shadow transition-all duration-300"
              :class="youtubeToggle ? 'left-[24px]' : 'left-1'"
            ></div>
          </div>
        </div>

        <!-- 인스타그램 -->
        <div class="flex items-center justify-between">
          <div class="w-[85%]">
            <label class="text-sm font-medium mb-1 block">인스타그램 아이디</label>
            <input
              v-if="initialData"
              type="text"
              class="w-full h-[44px] border border-gray-medium rounded px-3 text-sm"
              v-model="form.instagramId"
            />
            <div
              v-else
              class="w-full h-[44px] border border-gray-medium rounded px-3 text-sm flex items-center text-gray-medium"
            >
              인스타그램 계정을 연동하세요.
            </div>
          </div>
          <div
            class="w-[44px] h-[24px] rounded-full relative ml-2 cursor-pointer"
            :class="instagramToggle ? 'bg-green-600' : 'bg-gray-light'"
            @click="handleInstagramToggle"
          >
            <div
              class="absolute top-1 w-[16px] h-[16px] bg-white rounded-full shadow transition-all duration-300"
              :class="instagramToggle ? 'left-[24px]' : 'left-1'"
            ></div>
          </div>
        </div>
      </div>

      <!-- 드롭다운 영역 -->
      <div class="grid grid-cols-2 gap-x-4 gap-y-4 mb-6">
        <select class="h-[44px] border border-gray-medium rounded px-3 text-sm" v-model="form.gender">
          <option disabled value="">성별을 선택하세요.</option>
          <option>남성</option>
          <option>여성</option>
          <option>기타</option>
        </select>

        <select class="h-[44px] border border-gray-medium rounded px-3 text-sm" v-model="form.manager">
          <option disabled value="">담당자를 선택하세요.</option>
          <option>오유경</option>
          <option>박준서</option>
          <option>박장우</option>
          <option>윤채영</option>
          <option>이승재</option>
          <option>조현승</option>
        </select>

        <select class="h-[44px] border border-gray-medium rounded px-3 text-sm" v-model="form.region">
          <option disabled value="">주요 지역</option>
          <option>국내</option>
          <option>국외</option>
        </select>

        <input
          type="text"
          placeholder="광고 단가를 입력하세요."
          class="h-[44px] border border-gray-medium rounded px-3 text-sm"
          v-model="form.fee"
        />
      </div>

      <!-- 분류 입력 -->
      <div class="w-full min-h-[80px] border border-gray-medium rounded px-3 py-2 text-sm mb-4 flex flex-wrap gap-2 items-start" id="categoryInput">
        <span
          v-for="tag in selectedTags"
          :key="tag"
          class="px-2 py-1 rounded-full cursor-pointer"
          :class="tagStyle(tag)"
          @click="returnTag(tag)"
        >
          # {{ tag }}
        </span>
      </div>

      <!-- 분류 기준 -->
      <div id="categoryTags" class="border border-gray-medium rounded px-3 py-2">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in availableTags"
            :key="tag"
            class="text-sm px-2 py-1 rounded-full cursor-pointer"
            :class="tagStyle(tag)"
            @click="moveTagToSelected(tag)"
          >
            # {{ tag }}
          </span>
        </div>
      </div>

      <!-- 버튼 -->
      <div class="flex justify-end gap-2 mt-6">
        <button @click="$emit('close')" class="bg-[color:var(--color-gray-dark)] text-white px-6 py-2 rounded">
          취소
        </button>
        <button class="bg-[color:var(--color-btn-blue)] text-white px-6 py-2 rounded"
                @click="handleSave">
          저장
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
const props = defineProps({
  initialData: Object
})
const emit = defineEmits(['close', 'save'])
const form = ref({
  youtubeName: '',
  instagramId: '',
  gender: '',
  manager: '',
  region: '',
  fee: ''
})
const handleSave = () => {
  const data = {
    id: props.initialData?.id ?? Date.now(), // 수정이면 기존 id, 아니면 새로 생성
    name: form.value.youtubeName,
    instagram: form.value.instagramId,
    gender: form.value.gender,
    region: form.value.region,
    fee: form.value.fee,
    ownerName: form.value.manager,
    tags: selectedTags.value,
    thumbnail: '/src/assets/icons/logo.png' // 기본 이미지 또는 실제 구현된 이미지
  }

  emit('save', data)
  emit('close')
}

onMounted(() => {
  if (props.initialData) {
    form.value.youtubeName = props.initialData.name || ''
    form.value.instagramId = props.initialData.instagram || ''
    form.value.gender = props.initialData.gender || ''
    form.value.manager = props.initialData.ownerName || ''
    form.value.region = props.initialData.region || ''
    form.value.fee = props.initialData.fee || ''

    selectedTags.value = props.initialData.tags?.slice() || []
    availableTags.value = allTags.filter(tag => !selectedTags.value.includes(tag))
  }
})


const youtubeToggle = ref(false)
const instagramToggle = ref(false)

const youtubeAuthUrl = 'https://example.com/youtube-auth'
const instagramAuthUrl = 'https://example.com/instagram-auth'

const handleYoutubeToggle = () => {
  youtubeToggle.value = !youtubeToggle.value
  if (youtubeToggle.value) {
    window.open(youtubeAuthUrl, '_blank')
  }
}

const handleInstagramToggle = () => {
  instagramToggle.value = !instagramToggle.value
  if (instagramToggle.value) {
    window.open(instagramAuthUrl, '_blank')
  }
}

const allTags = [
  'Entertainment', 'LifeStyle', 'Fashion & Beauty', 'Food',
  'Family & Kids', 'Professional', 'Animation', 'Pet', 'Gaming'
]

const selectedTags = ref([])
const availableTags = ref([...allTags])

const moveTagToSelected = (tag) => {
  availableTags.value = availableTags.value.filter(t => t !== tag)
  selectedTags.value.push(tag)
  scrollToCategory()
}

const returnTag = (tag) => {
  selectedTags.value = selectedTags.value.filter(t => t !== tag)
  availableTags.value.push(tag)
}

const scrollToCategory = () => {
  const el = document.getElementById('categoryInput')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const tagStyle = (tag) => {
  const colorMap = {
    'Entertainment': 'bg-red-200 text-black',
    'LifeStyle': 'bg-yellow-200 text-black',
    'Fashion & Beauty': 'bg-purple-200 text-black',
    'Food': 'bg-amber-200 text-black',
    'Family & Kids': 'bg-blue-200 text-black',
    'Professional': 'bg-gray-400 text-white',
    'Animation': 'bg-pink-200 text-black',
    'Pet': 'bg-green-200 text-black',
    'Gaming': 'bg-lime-200 text-black',
  }
  return colorMap[tag] || 'bg-gray-200 text-black'
}
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css");
@import "tailwindcss";
</style>
