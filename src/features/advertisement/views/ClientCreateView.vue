<script setup>
import { reactive, ref, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CommonFiltering from '@/components/layout/CommonFiltering.vue';
import { Icon } from '@iconify/vue';

const router = useRouter();

const form = reactive({
  name: '',
  revenue: '',
  employeeCount: '',
  businessNumber: '',
  note: '',
  status: '시작전', // 기본값
  phone: '',
  fax: '',
  user: [],         // 담당자 다중 선택 배열
  address1: '',
  address2: '',
});

const isEditing = ref(true);

// 저장 버튼
const save = () => {
  console.log('저장할 값:', form);
  isEditing.value = false;
};

// 취소 버튼
const cancel = () => {
  console.log('취소됨');
  isEditing.value = false;
};

// 전역 handleUserSelect 등록
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

// 유저 검색 팝업 열기
const openUserSearch = () => {
  const selectedIds = form.user.map((u) => u.id).join(',');

  window.__userSelectCallback__ = (selectedItems) => {
    // 배열 교체 방식 (반응성 유지)
    form.user.splice(0, form.user.length, ...selectedItems);
  };

  window.open(
    `/search-popup?type=user&selected=${selectedIds}`,
    'SearchPopup',
    'width=500,height=600'
  );
};

// 주소 검색
const popupWidth = 500;
const popupHeight = 600;
const openPostcodeSearch = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      const selectedAddress = data.roadAddress || data.jibunAddress;
      form.address1 = selectedAddress;
      nextTick(() => {
        document.getElementById('detailAddress')?.focus();
      });
    },
  }).open({
    left: window.screen.width / 2 - popupWidth / 2,
    top: window.screen.height / 2 - popupHeight / 2,
  });
};
</script>

<template>
  <div class="w-full min-h-screen bg-background flex font-sans">
    <CommonFiltering />
    <div class="flex flex-col flex-1 container bg-white">
      <!-- 상단 헤더 -->
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

      <div class="blue-line"></div>

      <div class="grid grid-cols-2 gap-10">
        <!-- 왼쪽 필드 -->
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

        <!-- 오른쪽 필드 -->
        <div class="flex flex-col gap-4">
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
            <input
              type="text"
              :value="form.user.map((u) => u.name).join(', ')"
              readonly
              class="input-form-box flex-1"
            />
            <button
              type="button"
              class="border bg-gray-300 rounded px-3 py-1 text-sm shadow hover:brightness-95 active:brightness-90 transition"
              @click="openUserSearch"
              v-if="isEditing"
            >
              검색
            </button>
          </div>

          <label class="input-form-label">주소</label>
          <div class="flex gap-2">
            <input
              type="text"
              v-model="form.address1"
              readonly
              class="input-form-box flex-1 bg-gray-100"
            />
            <button
              type="button"
              class="border bg-gray-300 rounded px-3 py-1 text-sm shadow hover:brightness-95 active:brightness-90 transition"
              @click="openPostcodeSearch"
              v-if="isEditing"
            >
              검색
            </button>
          </div>
          <input
            class="input-form-box"
            v-model="form.address2"
            :disabled="!isEditing"
            id="detailAddress"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
