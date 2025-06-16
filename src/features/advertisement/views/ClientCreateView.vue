<script setup>
import { reactive, ref, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const router = useRouter();

const form = reactive({
  name: '',
  revenue: '',
  employeeCount: '',
  businessNumber: '',
  note: '',
  status: '시작전',
  phone: '',
  fax: '',
  user: [],
  address1: '',
  address2: '',
});

// 사원 관련
const employeeList = ref([]); // 등록된 사원 목록
const isAddingEmployee = ref(false); // 사원 추가 폼 토글
const editIndex = ref(-1); // 수정 중인 index (-1이면 새로 추가)
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
});

// ------------------ 기본 기능 ------------------
const isEditing = ref(true);

const save = () => {
  console.log('저장할 값:', form);
  console.log('등록된 사원들:', employeeList.value);
  isEditing.value = false;
};

const cancel = () => {
  console.log('취소됨');
  isEditing.value = false;
};

// ------------------ 담당자 검색 ------------------
onMounted(() => {
  if (!window.__userSelectHandlerRegistered) {
    window.handleUserSelect = (selectedItems) => {
      if (window.__userSelectCallback__) {
        window.__userSelectCallback__(selectedItems);
        window.__userSelectCallback__ = null;
      }
    };
    window.__userSelectHandlerRegistered = true;
  }
});

const openUserSearch = () => {
  const selectedIds = form.user.map((u) => u.id).join(',');

  window.__userSelectCallback__ = (selectedItems) => {
    form.user.splice(0, form.user.length, ...selectedItems);
  };

  window.open(
    `/search-popup?type=user&selected=${selectedIds}`,
    'SearchPopup',
    'width=500,height=600'
  );
};

// ------------------ 주소 검색 ------------------
const popupWidth = 500;
const popupHeight = 600;
const openPostcodeSearch = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      const selectedAddress = data.roadAddress || data.jibunAddress;
      form.address1 = selectedAddress;
      nextTick(() => document.getElementById('detailAddress')?.focus());
    },
  }).open({
    left: window.screen.width / 2 - popupWidth / 2,
    top: window.screen.height / 2 - popupHeight / 2,
  });
};

// ------------------ 사원 추가 ------------------
const addEmployee = () => {
  if (editIndex.value === -1) {
    // 새로 추가
    employeeList.value.push({ ...newEmployee });
  } else {
    // 수정일 경우 기존 항목 덮어쓰기
    employeeList.value[editIndex.value] = { ...newEmployee };
  }

  // 초기화
  Object.keys(newEmployee).forEach((key) => newEmployee[key] = '');
  newEmployee.position = '재직';
  editIndex.value = -1;
  isAddingEmployee.value = false;
};

const deleteEmployee = (index) => {
  employeeList.value.splice(index, 1);
};
// ------------------ 사원 수정 시작 ------------------
const editEmployee = (index) => {
  // 수정 모드 전환
  Object.assign(newEmployee, employeeList.value[index]); // 기존 값 복사
  editIndex.value = index; // 현재 수정 중인 index 저장
  isAddingEmployee.value = true; // 폼 열기
};


</script>

<template>
  <!-- 상단 고객사 등록 영역 -->
  <div class="container bg-white">
    <!-- 제목 및 버튼 -->
    <div class="page-header">
      <div class="page-title">고객사 등록</div>
      <div class="flex items-center gap-3">
        <button class="btn-delete" v-if="isEditing" @click="cancel">취소</button>
        <button class="btn-create" v-if="isEditing" @click="save">저장</button>
        <button class="btn-edit" v-else @click="isEditing = true">수정</button>
        <Icon icon="material-symbols:lists-rounded" width="48" height="48" class="text-btn-gray cursor-pointer" @click="router.push('/management/client')" />
      </div>
    </div>
    <div class="blue-line"></div>

    <div class="grid grid-cols-2 gap-10">
      <div class="flex flex-col gap-4">
        <!-- 왼쪽 필드 -->
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

      <div class="flex flex-col gap-4">
        <!-- 오른쪽 필드 -->
        <label class="input-form-label">진행 상태</label>
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
        <label class="input-form-label">담당자</label>
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

  <!-- 사원 정보 리스트 영역 -->
  <div class="container bg-white mt-12">
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

  <!-- 사원 추가 폼 -->
  <div class="container bg-white mt-8" v-if="isAddingEmployee">
    <p class="font-bold mb-2">
      {{ editIndex === -1 ? '사원 추가' : '사원 수정' }}
    </p>
    <div class="blue-line mb-4" />
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-2">
        <label class="input-form-label">이름</label>
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
        <input v-model="newEmployee.client" class="input-form-box" />
        <label class="input-form-label">직책</label>
        <input v-model="newEmployee.title" class="input-form-box" />
        <label class="input-form-label">휴대폰번호</label>
        <input v-model="newEmployee.mobile" class="input-form-box" />
        <label class="input-form-label">이메일</label>
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
</template>

