<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import CommonFiltering from '@/components/layout/CommonFiltering.vue'
import { Icon } from '@iconify/vue'

const router = useRouter()

const form = reactive({
  name: 'ABC 화장품',
  revenue: '130,000,000',
  employeeCount: '8',
  businessNumber: '8',
  note: '',
  status: '진행중',
  phone: '',
  fax: '',
  manager: '',
  address1: '(08390) 서울특별시 동작구 보라매로87길 (신대방동)',
  address2: '3층 강의실 15기'
})

// 등록 화면이라 편집 가능 상태로 시작
const isEditing = ref(true)

const save = () => {
  console.log('✅ 저장할 값:', form)
  isEditing.value = false
}

const cancel = () => {
  // TODO: 원본 초기화 로직 (edit -> cancel 전용)
  console.log('❌ 취소됨')
  isEditing.value = false
}
</script>

<template>
  <div class="w-full min-h-screen bg-background flex font-sans">
    <!-- 사이드바 -->
    <CommonFiltering />

    <!-- 본문 -->
    <div class="flex flex-col flex-1 container bg-white">
      <!-- 제목 + 버튼 -->
      <div class="page-header">
        <div class="page-title">고객사 등록</div>
        <div class="flex items-center gap-3">
          <button class="btn-delete" @click="cancel">취소</button>
          <button class="btn-create" @click="save">저장</button>
          <Icon
            icon="material-symbols:lists-rounded"
            width="48"
            height="48"
            class="text-btn-gray cursor-pointer"
            @click="router.push('/management/client')"
          />
        </div>
      </div>

      <!-- 구분선 -->
      <div class="blue-line"></div>

      <!-- 폼 영역 -->
      <div class="grid grid-cols-2 gap-10">
        <!-- 왼쪽 -->
        <div class="flex flex-col gap-4">
          <label class="input-form-label">고객사</label>
          <input class="input-form-box" v-model="form.name" :disabled="!isEditing" />

          <label class="input-form-label">매출</label>
          <input class="input-form-box" v-model="form.revenue" :disabled="!isEditing" />

          <label class="input-form-label">사원 수</label>
          <input class="input-form-box" v-model="form.employeeCount" :disabled="!isEditing" />

          <label class="input-form-label">사업자 번호</label>
          <input class="input-form-box" v-model="form.businessNumber" :disabled="!isEditing" />

          <label class="input-form-label">비고</label>
          <input class="input-form-box" v-model="form.note" :disabled="!isEditing" />
        </div>

        <!-- 오른쪽 -->
        <div class="flex flex-col gap-4">
          <label class="input-form-label">진행 상태</label>
          <input class="input-form-box" v-model="form.status" :disabled="!isEditing" />

          <label class="input-form-label">유선번호</label>
          <input class="input-form-box" v-model="form.phone" :disabled="!isEditing" />

          <label class="input-form-label">팩스번호</label>
          <input class="input-form-box" v-model="form.fax" :disabled="!isEditing" />

          <label class="input-form-label">담당자</label>
          <input class="input-form-box" v-model="form.manager" :disabled="!isEditing" placeholder="담당자를 입력하세요" />

          <label class="input-form-label">주소</label>
          <input class="input-form-box" v-model="form.address1" disabled />
          <input class="input-form-box" v-model="form.address2" :disabled="!isEditing" />
        </div>
      </div>
    </div>
  </div>
</template>
