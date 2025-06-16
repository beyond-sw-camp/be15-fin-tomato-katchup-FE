<script setup>
import CommonFiltering from '@/components/layout/CommonFiltering.vue'
</script>

<template>
  <div class="w-full min-h-screen bg-background flex font-sans">
    <!-- 사이드바 -->
    <CommonFiltering />

    <!-- 본문 -->
    <div class="flex flex-col flex-1 container bg-white">
      <!-- 제목 + 버튼 -->
      <div class="page-header">
        <div class="page-title">
          고객사 등록
        </div>
        <div class="flex gap-3">
          <button class="btn-delete">삭제</button>
          <button class="btn-create">저장</button>
        </div>
      </div>

      <div class="blue-line"></div>
      <!-- 본문 form -->
      <div class="grid grid-cols-2 gap-10">
        <!-- 왼쪽 -->
        <div class="flex flex-col gap-4">
          <label class="input-form-label">고객사</label>
          <input class="input-form-box" value="ABC 화장품" disabled />

          <label class="input-form-label">매출</label>
          <input class="input-form-box" value="130,000,000" />

          <label class="input-form-label">사원 수</label>
          <input class="input-form-box" value="8" />

          <label class="input-form-label">사업자 번호</label>
          <input class="input-form-box" value="8" />

          <label class="input-form-label">비고</label>
          <input class="input-form-box" />
        </div>

        <!-- 오른쪽 -->
        <div class="flex flex-col gap-4">
          <label class="input-form-label">진행 상태</label>
          <input class="input-form-box" value="진행중" />

          <label class="input-form-label">유선번호</label>
          <input class="input-form-box" />

          <label class="input-form-label">팩스번호</label>
          <input class="input-form-box" />

          <label class="input-form-label">담당자</label>
          <input class="input-form-box" placeholder="담당자를 선택하세요." />

          <label class="input-form-label">주소</label>
          <input class="input-form-box" value="(08390) 서울특별시 동작구 보라매로87길 (신대방동)" disabled />
          <input class="input-form-box" value="3층 강의실 15기" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
