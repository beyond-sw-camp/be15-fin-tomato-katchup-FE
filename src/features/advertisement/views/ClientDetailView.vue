<script setup>
import { reactive, ref, nextTick, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const clientList = [
  {
    id: 5173,
    name: 'ABC 화장품',
    revenue: '130000000',
    employeeCount: '8',
    businessNumber: '123-45-67890',
    note: 'ABC 고객사 비고입니다.',
    status: '진행중',
    phone: '02-1234-5678',
    fax: '02-8765-4321',
    user: [{ id: 1, name: '오유경' }],
    address1: '서울시 강남구 테헤란로',
    address2: '3층',
    employees: [
      {
        name: '김동영',
        position: '재직',
        client: 'ABC 화장품',
        mobile: '010-1234-5678',
        email: 'abc@naver.com',
        department: '마케팅',
        title: '팀장',
        phone: '02-1234-5678',
        note: ''
      }
    ]
  },
  {
    id: 5174,
    name: 'XYZ 미디어',
    revenue: '250000000',
    employeeCount: '5',
    businessNumber: '456-78-12345',
    note: 'XYZ 고객사 메모입니다.',
    status: '시작전',
    phone: '02-9876-5432',
    fax: '02-5432-6789',
    user: [{ id: 2, name: '조현승' }],
    address1: '서울시 마포구 월드컵북로',
    address2: '10층',
    employees: []
  }
]
// 라우터
const route = useRoute()
const router = useRouter()

// 상세조회용 ID
// const clientId = route.params.id

// 상태값
const isEditing = ref(false)

const form = reactive({
  name: '',
  revenue: '',
  employeeCount: '',
  businessNumber: '',
  note: '',
  status: '',
  phone: '',
  fax: '',
  user: [],
  address1: '',
  address2: '',
})

const employeeList = ref([])

const isAddingEmployee = ref(false)
const editIndex = ref(-1)

const newEmployee = reactive({
  name: '',
  position: '재직',
  client: '',
  department: '',
  title: '',
  phone: '',
  mobile: '',
  email: '',
  note: ''
})

// 고객사명이 바뀔 때마다 사원 등록에 반영
watch(() => form.name, (newVal) => {
  newEmployee.client = newVal
})

// 상세조회 API 호출
onMounted(() => {
  fetchClientDetail()
  initUserSelectHandler()
})

const fetchClientDetail = async () => {
  const client = clientList.find(c => c.id === Number(route.params.id))

  if (!client) {
    console.warn('해당 ID의 클라이언트를 찾을 수 없습니다.')
    return
  }

  Object.assign(form, client)
  employeeList.value = client.employees
}

// 저장
const save = () => {
  console.log('수정 저장:', form)
  isEditing.value = false
}

const cancel = () => {
  console.log('수정 취소됨')
  isEditing.value = false
}

// 담당자 검색 로직은 재사용
onMounted(() => {
  if (!window.__userSelectHandlerRegistered) {
    window.handleUserSelect = (selectedItems) => {
      if (window.__userSelectCallback__) {
        window.__userSelectCallback__(selectedItems)
        window.__userSelectCallback__ = null
      }
    }
    window.__userSelectHandlerRegistered = true
  }
})

const initUserSelectHandler = () => {
  if (!window.__userSelectHandlerRegistered) {
    window.handleUserSelect = (selectedItems) => {
      if (window.__userSelectCallback__) {
        window.__userSelectCallback__(selectedItems)
        window.__userSelectCallback__ = null
      }
    }
    window.__userSelectHandlerRegistered = true
  }
}

const openUserSearch = () => {
  const selectedIds = form.user.map((u) => u.id).join(',')

  window.__userSelectCallback__ = (selectedItems) => {
    form.user.splice(0, form.user.length, ...selectedItems)
  }

  window.open(
    `/search-popup?type=user&selected=${selectedIds}`,
    'SearchPopup',
    'width=500,height=600'
  )
}

// 주소 검색
const popupWidth = 500
const popupHeight = 600
const openPostcodeSearch = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      const selectedAddress = data.roadAddress || data.jibunAddress
      form.address1 = selectedAddress
      nextTick(() => document.getElementById('detailAddress')?.focus())
    },
  }).open({
    left: window.screen.width / 2 - popupWidth / 2,
    top: window.screen.height / 2 - popupHeight / 2,
  })
}

// 사원 추가
const addEmployee = () => {
  newEmployee.client = form.name

  if (editIndex.value === -1) {
    employeeList.value.push({ ...newEmployee })
  } else {
    employeeList.value[editIndex.value] = { ...newEmployee }
  }

  Object.keys(newEmployee).forEach((key) => {
    if (key !== 'client') newEmployee[key] = ''
  })
  newEmployee.position = '재직'
  editIndex.value = -1
  isAddingEmployee.value = false
}

const deleteEmployee = (index) => {
  employeeList.value.splice(index, 1)
}

const editEmployee = (index) => {
  Object.assign(newEmployee, employeeList.value[index])
  editIndex.value = index
  isAddingEmployee.value = true
}
</script>

<template>
  <!-- 상단 고객사 등록 영역 -->
  <div class="w-full flex justify-center px-4">
    <div class="container bg-white w-full">
      <!-- 제목 및 버튼 -->
      <div class="page-header">
        <div class="page-title">고객사 조회</div>
        <div class="flex items-center gap-3">
          <button class="btn-delete" v-if="isEditing" @click="cancel">취소</button>
          <button class="btn-create" v-if="isEditing" @click="save">저장</button>
          <button class="btn-edit" v-else @click="isEditing = true">수정</button>
          <Icon icon="material-symbols:lists-rounded" width="48" height="48" class="text-btn-gray cursor-pointer" @click="router.push('/management/client')" />
        </div>
      </div>
      <div class="blue-line"></div>

      <div class="grid grid-cols-2 gap-10">
        <div class="flex flex-col gap-2.5">
          <!-- 왼쪽 필드 -->
          <label class="input-form-label">
            광고업체명 <span class="text-red-500 ml-1">*</span>
          </label>
          <input class="input-form-box" v-model="form.name" :disabled="!isEditing" />
          <label class="input-form-label">매출</label>
          <input class="input-form-box" v-model="form.revenue" :disabled="!isEditing" />
          <label class="input-form-label">사원 수</label>
          <input class="input-form-box" v-model="form.employeeCount" :disabled="!isEditing" />
          <label class="input-form-label">사업자 번호</label>
          <input class="input-form-box" v-model="form.businessNumber" :disabled="!isEditing" />
          <label class="input-form-label">비고</label>
          <textarea
            class="input-form-box resize-y min-h-[80px]"
            v-model="form.note"
            :disabled="!isEditing"
            rows="3"
          />
        </div>

        <div class="flex flex-col gap-2.5">
          <!-- 오른쪽 필드 -->
          <label class="input-form-label">
            진행 상태 <span class="text-red-500 ml-1">*</span>
          </label>
          <select class="input-form-box" v-model="form.status" :disabled="!isEditing">
            <option value="시작전">시작전</option>
            <option value="진행중">진행중</option>
            <option value="종료">종료</option>
            <option value="보류">보류</option>
            <option value="거절">거절</option>
          </select>
          <label class="input-form-label">유선번호</label>
          <input class="input-form-box" v-model="form.phone" :disabled="!isEditing" />
          <label class="input-form-label">팩스번호</label>
          <input class="input-form-box" v-model="form.fax" :disabled="!isEditing" />
          <label class="input-form-label">
            담당자 <span class="text-red-500 ml-1">*</span>
          </label>
          <div class="flex gap-2">
            <input type="text" :value="form.user.map((u) => u.name).join(', ')" readonly class="input-form-box flex-1" />
            <button class="border bg-gray-300 rounded px-3 py-1 text-sm shadow" @click="openUserSearch" v-if="isEditing">검색</button>
          </div>
          <label class="input-form-label">주소</label>
          <div class="flex gap-2">
            <input type="text" v-model="form.address1" readonly class="input-form-box flex-1 bg-gray-100" />
            <button class="border bg-gray-300 rounded px-3 py-1 text-sm shadow" @click="openPostcodeSearch" v-if="isEditing">검색</button>
          </div>
          <input class="input-form-box" v-model="form.address2" :disabled="!isEditing" id="detailAddress" />
        </div>
      </div>
    </div>
  </div>

  <!-- 사원 정보 리스트 영역 -->
  <div class="w-full flex justify-center px-4">
    <div class="container bg-white mt-12 w-full">
      <div class="flex justify-between items-center mb-4">
        <p class="font-bold">사원 정보 ({{ employeeList.length }})</p>
        <button class="btn-create !py-1 !px-4 text-sm" @click="isAddingEmployee = true">추가</button>
      </div>

      <div class="grid grid-cols-2 gap-4" v-if="employeeList.length > 0">
        <div v-for="(employee, index) in employeeList" :key="index" class="border rounded-lg p-4 flex items-center justify-between shadow-sm">
          <div>
            <!-- 사원 목록에서 이름 옆 -->
            <p class="font-semibold">
              {{ employee.name }}
              <span
                class="text-xs font-semibold ml-2 px-2 py-0.5 rounded"
                :class="{
        'bg-[#A2D9FF] text-white': employee.position === '재직',
        'bg-[#FFD000] text-white': employee.position === '휴직',
        'bg-[#FF6D6D] text-white': employee.position === '퇴직',
      }"
              >
      {{ employee.position }}
    </span>
            </p>
            <p class="text-sm text-gray-500">
              {{ employee.mobile }}
              <template v-if="employee.mobile && employee.email"> / </template>
              {{ employee.email }}
            </p>
          </div>
          <div class="flex gap-2">
            <button class="btn-icon">
              <Icon icon="material-symbols:mail-outline" width="20" height="20" />
              MAIL
            </button>
            <button class="btn-icon" @click="editEmployee(index)">
              <Icon icon="lucide:edit" width="20" height="20" />
              수정
            </button>
            <button class="btn-icon" @click="deleteEmployee(index)">
              <Icon icon="gg:trash" width="20" height="20" />
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 사원 추가 폼 -->
  <div class="w-full flex justify-center px-4">
    <div class="container bg-white mt-8" v-if="isAddingEmployee">
      <p class="font-bold mb-2">
        {{ editIndex === -1 ? '사원 추가' : '사원 수정' }}
      </p>
      <div class="blue-line mb-4" />
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <label class="input-form-label">
            이름<span class="text-red-500 ml-1">*</span>
          </label>
          <input v-model="newEmployee.name" class="input-form-box" />
          <label class="input-form-label">상태</label>
          <select v-model="newEmployee.position" class="input-form-box">
            <option value="재직">재직</option>
            <option value="휴직">휴직</option>
            <option value="퇴직">퇴직</option>
          </select>
          <label class="input-form-label">부서</label>
          <input v-model="newEmployee.department" class="input-form-box" />
          <label class="input-form-label">유선번호</label>
          <input v-model="newEmployee.phone" class="input-form-box" />
          <label class="input-form-label">비고</label>
          <textarea v-model="newEmployee.note" class="input-form-box" rows="3" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="input-form-label">고객사</label>
          <input v-model="newEmployee.client" class="input-form-box bg-gray-100" readonly />

          <label class="input-form-label">직책</label>
          <input v-model="newEmployee.title" class="input-form-box" />

          <label class="input-form-label">
            휴대폰번호<span class="text-red-500 ml-1">*</span>
          </label>
          <input v-model="newEmployee.mobile" class="input-form-box" />

          <label class="input-form-label">
            이메일<span class="text-red-500 ml-1">*</span>
          </label>
          <input v-model="newEmployee.email" class="input-form-box" />
        </div>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button class="btn-delete !px-5" @click="isAddingEmployee = false">취소</button>
        <button class="btn-create !px-5" @click="addEmployee">
          {{ editIndex === -1 ? '등록' : '수정 완료' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
